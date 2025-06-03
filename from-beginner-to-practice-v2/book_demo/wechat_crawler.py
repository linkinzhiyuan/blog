import time
import json
import random
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from datetime import datetime
import pandas as pd
import logging


class WeChatCrawler:
    def __init__(self):
        # 设置日志
        self._setup_logging()

        # 初始化浏览器
        self.driver = self._setup_driver()

        # 初始化等待器
        self.wait = WebDriverWait(self.driver, 10)

        # 存储token和cookie
        self.token = None
        self.cookies = None

    def _setup_logging(self):
        """配置日志"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('wechat_crawler.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def _setup_driver(self):
        """设置Chrome浏览器"""
        options = webdriver.ChromeOptions()
        # options.add_argument('--headless')  # 无头模式，取消注释则不显示浏览器窗口
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=1920,1080')
        return webdriver.Chrome(options=options)

    def login(self):
        """登录微信公众平台"""
        self.logger.info("开始登录流程...")
        try:
            self.driver.get('https://mp.weixin.qq.com/')
            input("请扫描二维码登录后，按回车继续...")

            # 获取token和cookie
            self.token = self._get_token()
            self.cookies = self._get_cookies()

            self.logger.info("登录成功")
            return True
        except Exception as e:
            self.logger.error(f"登录失败: {str(e)}")
            return False

    def _get_token(self):
        """获取token"""
        url = self.driver.current_url
        token = url.split('token=')[[1]] #（ __1).split('&')[0]
        return token

    def _get_cookies(self):
        """获取cookies"""
        return {cookie['name']: cookie['value'] for cookie in self.driver.get_cookies()}

    def search_official_account(self, account_name):
        """搜索并进入公众号"""
        try:
            # 点击搜索框
            search_btn = self.wait.until(
                EC.presence_of_element_located((By.CLASS_NAME, "weui-desktop-search__input"))
            )
            search_btn.clear()
            search_btn.send_keys(account_name)

            # 等待搜索结果
            time.sleep(2)

            # 点击第一个搜索结果
            first_result = self.wait.until(
                EC.presence_of_element_located((By.CLASS_NAME, "weui-desktop-mass-gallery__title"))
            )
            first_result.click()

            self.logger.info(f"成功进入公众号: {account_name}")
            return True
        except Exception as e:
            self.logger.error(f"搜索公众号失败: {str(e)}")
            return False

    def get_articles(self, num_articles=10):
        """获取文章列表"""
        articles = []
        try:
            while len(articles) < num_articles:
                # 等待文章列表加载
                time.sleep(2)

                # 获取当前页面的文章
                article_items = self.driver.find_elements(By.CLASS_NAME, "weui-desktop-mass-gallery__item")

                for item in article_items:
                    if len(articles) >= num_articles:
                        break

                    article = {
                        'title': item.find_element(By.CLASS_NAME, "weui-desktop-mass-gallery__title").text,
                        'link': item.find_element(By.TAG_NAME, "a").get_attribute("href"),
                        'date': item.find_element(By.CLASS_NAME, "weui-desktop-mass-gallery__date").text
                    }
                    articles.append(article)

                # 滚动到底部加载更多
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(1)

            self.logger.info(f"成功获取{len(articles)}篇文章")
            return articles
        except Exception as e:
            self.logger.error(f"获取文章列表失败: {str(e)}")
            return articles

    def get_article_detail(self, article_url):
        """获取文章详细信息"""
        try:
            # 打开文章
            self.driver.get(article_url)
            time.sleep(2)

            # 获取文章信息
            article_detail = {
                'title': self.driver.find_element(By.CLASS_NAME, "rich_media_title").text,
                'author': self.driver.find_element(By.CLASS_NAME, "rich_media_meta_nickname").text,
                'publish_time': self.driver.find_element(By.CLASS_NAME, "rich_media_meta_text").text,
                'content': self.driver.find_element(By.CLASS_NAME, "rich_media_content").text
            }

            # 获取阅读量、点赞数等信息
            self._get_article_stats(article_detail)

            # 获取评论
            article_detail['comments'] = self._get_comments()

            self.logger.info(f"成功获取文章详情: {article_detail['title']}")
            return article_detail
        except Exception as e:
            self.logger.error(f"获取文章详情失败: {str(e)}")
            return None

    def _get_article_stats(self, article_detail):
        """获取文章统计数据"""
        try:
            # 等待统计数据加载
            time.sleep(2)

            # 获取阅读量
            read_num = self.driver.find_element(By.CLASS_NAME, "read_num").text
            article_detail['read_num'] = read_num

            # 获取点赞数
            like_num = self.driver.find_element(By.CLASS_NAME, "like_num").text
            article_detail['like_num'] = like_num

        except Exception as e:
            self.logger.error(f"获取文章统计数据失败: {str(e)}")
            article_detail['read_num'] = '未知'
            article_detail['like_num'] = '未知'

    def _get_comments(self):
        """获取文章评论"""
        comments = []
        try:
            # 等待评论加载
            time.sleep(2)

            # 获取评论列表
            comment_items = self.driver.find_elements(By.CLASS_NAME, "discuss_item")

            for item in comment_items:
                comment = {
                    'user': item.find_element(By.CLASS_NAME, "nickname").text,
                    'content': item.find_element(By.CLASS_NAME, "discuss_message").text,
                    'time': item.find_element(By.CLASS_NAME, "discuss_time").text,
                    'like_num': item.find_element(By.CLASS_NAME, "discuss_like_num").text
                }
                comments.append(comment)

            self.logger.info(f"成功获取{len(comments)}条评论")
            return comments
        except Exception as e:
            self.logger.error(f"获取评论失败: {str(e)}")
            return comments

    def save_to_file(self, data, filename):
        """保存数据到文件"""
        try:
            # 保存为JSON
            with open(f"{filename}.json", 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            # 保存为CSV
            df = pd.DataFrame(data)
            df.to_csv(f"{filename}.csv", encoding='utf-8-sig', index=False)

            self.logger.info(f"数据已保存到文件: {filename}")
        except Exception as e:
            self.logger.error(f"保存数据失败: {str(e)}")

    def close(self):
        """关闭浏览器"""
        self.driver.quit()
        self.logger.info("爬虫已关闭")


def main():
    # 创建爬虫实例
    crawler = WeChatCrawler()

    try:
        # 登录
        if not crawler.login():
            return

        # 搜索公众号
        account_name = input("请输入要爬取的公众号名称：")
        if not crawler.search_official_account(account_name):
            return

        # 获取文章列表
        num_articles = int(input("请输入要爬取的文章数量："))
        articles = crawler.get_articles(num_articles)

        # 获取每篇文章的详细信息
        article_details = []
        for article in articles:
            detail = crawler.get_article_detail(article['link'])
            if detail:
                article_details.append(detail)
            time.sleep(random.uniform(1, 3))  # 随机延时

        # 保存数据
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"wechat_articles_{account_name}_{timestamp}"
        crawler.save_to_file(article_details, filename)

    finally:
        crawler.close()


if __name__ == "__main__":
    main()
