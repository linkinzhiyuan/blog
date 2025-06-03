#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
微信公众号文章抓取工具
注意：此程序仅供学习参考，实际使用请遵守相关法律法规
"""

import requests
import time
import json
import re
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from urllib.parse import urlencode
import logging
from dataclasses import dataclass
from typing import List, Dict, Optional
import sqlite3
import os

@dataclass
class Article:
    """文章数据结构"""
    title: str
    url: str
    author: str
    publish_time: str
    content: str
    read_count: int = 0
    like_count: int = 0
    comment_count: int = 0
    comments: List[Dict] = None

class WeChatScraper:
    """微信公众号抓取器"""
    
    def __init__(self, save_to_db: bool = True):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        
        # 设置日志
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
        self.logger = logging.getLogger(__name__)
        
        # 初始化数据库
        if save_to_db:
            self.init_database()
    
    def init_database(self):
        """初始化SQLite数据库"""
        self.conn = sqlite3.connect('wechat_articles.db')
        cursor = self.conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                account_name TEXT,
                title TEXT,
                url TEXT UNIQUE,
                author TEXT,
                publish_time TEXT,
                content TEXT,
                read_count INTEGER DEFAULT 0,
                like_count INTEGER DEFAULT 0,
                comment_count INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                article_url TEXT,
                user_name TEXT,
                content TEXT,
                like_count INTEGER DEFAULT 0,
                publish_time TEXT,
                FOREIGN KEY (article_url) REFERENCES articles (url)
            )
        ''')
        
        self.conn.commit()
    
    def search_account(self, account_name: str) -> Optional[Dict]:
        """
        搜索公众号信息
        注意：实际实现需要通过合法渠道获取
        """
        self.logger.info(f"搜索公众号: {account_name}")
        
        # 这里应该是通过微信公众号搜索API或其他合法方式获取
        # 由于技术限制，这里返回模拟数据
        return {
            'name': account_name,
            'account_id': f'fake_id_{account_name}',
            'description': f'{account_name}的公众号',
            'avatar': 'https://example.com/avatar.jpg'
        }
    
    def get_article_list(self, account_id: str, start_date: str, end_date: str) -> List[Dict]:
        """
        获取公众号文章列表
        
        Args:
            account_id: 公众号ID
            start_date: 开始日期 (YYYY-MM-DD)
            end_date: 结束日期 (YYYY-MM-DD)
        """
        self.logger.info(f"获取文章列表: {account_id}, {start_date} 到 {end_date}")
        
        articles = []
        
        # 实际实现中，这里需要调用相应的API或使用其他合法方式
        # 以下是模拟数据生成逻辑
        start = datetime.strptime(start_date, '%Y-%m-%d')
        end = datetime.strptime(end_date, '%Y-%m-%d')
        current = start
        
        while current <= end:
            # 模拟每天可能有的文章
            if current.weekday() < 5:  # 工作日更可能有文章
                article_data = {
                    'title': f'测试文章标题 - {current.strftime("%Y年%m月%d日")}',
                    'url': f'https://mp.weixin.qq.com/s/fake_article_{current.strftime("%Y%m%d")}',
                    'publish_time': current.strftime('%Y-%m-%d %H:%M:%S'),
                    'author': account_id,
                    'digest': '这是文章摘要...'
                }
                articles.append(article_data)
            
            current += timedelta(days=1)
            time.sleep(0.1)  # 避免请求过快
        
        self.logger.info(f"找到 {len(articles)} 篇文章")
        return articles
    
    def get_article_content(self, article_url: str) -> Article:
        """
        获取文章详细内容
        
        Args:
            article_url: 文章URL
        """
        self.logger.info(f"获取文章内容: {article_url}")
        
        try:
            # 添加延时避免被封
            time.sleep(1)
            
            response = self.session.get(article_url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # 解析文章内容 (需要根据实际页面结构调整)
            title = self._extract_title(soup)
            author = self._extract_author(soup)
            publish_time = self._extract_publish_time(soup)
            content = self._extract_content(soup)
            read_count = self._extract_read_count(soup)
            like_count = self._extract_like_count(soup)
            
            # 获取评论
            comments = self.get_article_comments(article_url)
            
            article = Article(
                title=title,
                url=article_url,
                author=author,
                publish_time=publish_time,
                content=content,
                read_count=read_count,
                like_count=like_count,
                comment_count=len(comments),
                comments=comments
            )
            
            return article
            
        except Exception as e:
            self.logger.error(f"获取文章内容失败: {e}")
            return None
    
    def get_article_comments(self, article_url: str) -> List[Dict]:
        """获取文章评论"""
        self.logger.info("获取文章评论")
        
        comments = []
        
        try:
            # 实际实现需要调用微信的评论API
            # 这里返回模拟数据
            for i in range(5):  # 模拟5条评论
                comment = {
                    'user_name': f'用户{i+1}',
                    'content': f'这是第{i+1}条评论内容...',
                    'like_count': i * 2,
                    'publish_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                }
                comments.append(comment)
                
        except Exception as e:
            self.logger.error(f"获取评论失败: {e}")
        
        return comments
    
    def _extract_title(self, soup: BeautifulSoup) -> str:
        """提取文章标题"""
        title_elem = soup.find('h1', class_='rich_media_title')
        return title_elem.get_text().strip() if title_elem else '未知标题'
    
    def _extract_author(self, soup: BeautifulSoup) -> str:
        """提取作者"""
        author_elem = soup.find('a', class_='rich_media_meta_link')
        return author_elem.get_text().strip() if author_elem else '未知作者'
    
    def _extract_publish_time(self, soup: BeautifulSoup) -> str:
        """提取发布时间"""
        time_elem = soup.find('em', id='publish_time')
        return time_elem.get_text().strip() if time_elem else ''
    
    def _extract_content(self, soup: BeautifulSoup) -> str:
        """提取文章正文"""
        content_elem = soup.find('div', class_='rich_media_content')
        return content_elem.get_text().strip() if content_elem else ''
    
    def _extract_read_count(self, soup: BeautifulSoup) -> int:
        """提取阅读数"""
        # 实际的阅读数可能需要通过JavaScript获取
        return 0
    
    def _extract_like_count(self, soup: BeautifulSoup) -> int:
        """提取点赞数"""
        # 实际的点赞数可能需要通过JavaScript获取
        return 0
    
    def save_article(self, account_name: str, article: Article):
        """保存文章到数据库"""
        if not hasattr(self, 'conn'):
            return
            
        cursor = self.conn.cursor()
        
        try:
            cursor.execute('''
                INSERT OR REPLACE INTO articles 
                (account_name, title, url, author, publish_time, content, read_count, like_count, comment_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                account_name, article.title, article.url, article.author,
                article.publish_time, article.content, article.read_count,
                article.like_count, article.comment_count
            ))
            
            # 保存评论
            if article.comments:
                for comment in article.comments:
                    cursor.execute('''
                        INSERT INTO comments (article_url, user_name, content, like_count, publish_time)
                        VALUES (?, ?, ?, ?, ?)
                    ''', (
                        article.url, comment['user_name'], comment['content'],
                        comment['like_count'], comment['publish_time']
                    ))
            
            self.conn.commit()
            self.logger.info(f"文章已保存: {article.title}")
            
        except Exception as e:
            self.logger.error(f"保存文章失败: {e}")
    
    def scrape_account(self, account_name: str, start_date: str, end_date: str) -> List[Article]:
        """
        抓取公众号文章
        
        Args:
            account_name: 公众号名称
            start_date: 开始日期 (YYYY-MM-DD)
            end_date: 结束日期 (YYYY-MM-DD)
        
        Returns:
            List[Article]: 文章列表
        """
        self.logger.info(f"开始抓取公众号: {account_name}")
        
        # 1. 搜索公众号
        account_info = self.search_account(account_name)
        if not account_info:
            self.logger.error(f"未找到公众号: {account_name}")
            return []
        
        # 2. 获取文章列表
        article_list = self.get_article_list(
            account_info['account_id'], 
            start_date, 
            end_date
        )
        
        articles = []
        
        # 3. 获取每篇文章的详细内容
        for i, article_info in enumerate(article_list):
            self.logger.info(f"处理文章 {i+1}/{len(article_list)}: {article_info['title']}")
            
            article = self.get_article_content(article_info['url'])
            if article:
                articles.append(article)
                self.save_article(account_name, article)
            
            # 添加延时避免被封
            time.sleep(2)
        
        self.logger.info(f"抓取完成，共获取 {len(articles)} 篇文章")
        return articles
    
    def export_to_json(self, articles: List[Article], filename: str):
        """导出文章到JSON文件"""
        data = []
        for article in articles:
            article_dict = {
                'title': article.title,
                'url': article.url,
                'author': article.author,
                'publish_time': article.publish_time,
                'content': article.content,
                'read_count': article.read_count,
                'like_count': article.like_count,
                'comment_count': article.comment_count,
                'comments': article.comments or []
            }
            data.append(article_dict)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        self.logger.info(f"数据已导出到: {filename}")
    
    def close(self):
        """关闭数据库连接"""
        if hasattr(self, 'conn'):
            self.conn.close()

def main():
    """主函数示例"""
    scraper = WeChatScraper()
    
    try:
        # 配置抓取参数
        account_name = "测试公众号"  # 公众号名称
        start_date = "2024-01-01"   # 开始日期
        end_date = "2024-01-31"     # 结束日期
        
        # 开始抓取
        articles = scraper.scrape_account(account_name, start_date, end_date)
        
        # 导出数据
        if articles:
            scraper.export_to_json(articles, f"{account_name}_articles.json")
            print(f"成功抓取 {len(articles)} 篇文章")
        else:
            print("未获取到任何文章")
            
    except KeyboardInterrupt:
        print("\n用户取消操作")
    except Exception as e:
        print(f"程序执行出错: {e}")
    finally:
        scraper.close()

if __name__ == "__main__":
    main()
