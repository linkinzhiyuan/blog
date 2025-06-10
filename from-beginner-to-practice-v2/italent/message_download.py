import requests
import json
from bs4 import BeautifulSoup
from pathlib import Path
import time
from urllib.parse import urlparse, unquote
import re
from datetime import datetime

class MessageDownloader:
    def __init__(self):
        self.base_url = 'https://www.italent.cn/api/v1/110088/191648109/messages/Get'
        self.download_dir = Path('downloads')
        self.download_dir.mkdir(exist_ok=True)

        # 创建日志目录
        self.log_dir = Path('logs')
        self.log_dir.mkdir(exist_ok=True)
        self.log_file = self.log_dir / f'download_log_{datetime.now().strftime("%Y%m%d_%H%M%S")}.txt'

    def log_message(self, message: str):
        """记录日志"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_line = f"[{timestamp}] {message}\n"
        print(message)
        with open(self.log_file, 'a', encoding='utf-8') as f:
            f.write(log_line)

    def get_messages(self):
        """获取消息列表"""
        params = {
            'app_id': 'f090a700-0041-4676-9f7e-471bcdebbfe6',
            'app_type': 'f090a700-0041-4676-9f7e-471bcdebbfe6',
            'page_num': 1,
            'page_size': 20,
            'status': 2,
            '__t': int(time.time() * 1000),
            '_qsrcapp': 'Italent',
            'quark_s': 'ac5506e6e6cc103395a21e32bc74f4f38850379758f9559e14bdb14ae31fed28'
        }

        headers = {
            'Accept': 'application/json, application/xml, text/play, text/html, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'undefined',
            'Pragma': 'no-cache',
            'Referer': 'https://www.italent.cn/191648109/ItalentIframeHome',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
            'X-Sourced-By': 'ajax',
            'tenant_id': '110088',
            'user_id': '191648109'
        }

        cookies = {
            'iTalent-tenantId': '110088',
            'isItalentLogin': '',
            'italentLoginSync': '1749198151584',
            'loginBackgroundIndex': '1',
            'Tita_PC': 'GqFux106k_XVPRPDR8y3f9p1auBysykndROLSeUtslgapKpfEl2Kd5pqyQ1x0igw',
            'ssn_Tita_PC': 'GqFux106k_XVPRPDR8y3f9p1auBysykndROLSeUtslgapKpfEl2Kd5pqyQ1x0igw',
            'key-191648109': 'false',
        }

        try:
            response = requests.get(
                self.base_url,
                params=params,
                headers=headers,
                cookies=cookies,
                timeout=30
            )

            if response.status_code == 200:
                return response.json()
            else:
                self.log_message(f"❌ HTTP错误: {response.status_code}")
                return None

        except Exception as e:
            self.log_message(f"❌ 请求异常: {str(e)}")
            return None

    def extract_download_links(self, content):
        """从HTML内容中提取下载链接和文件名"""
        soup = BeautifulSoup(content, 'html.parser')

        # 提取文件名（从关键字中提取）
        filename = None
        keyword_spans = soup.find_all('span', class_='__template_keyword')
        for span in keyword_spans:
            if '《' in span.text and '》' in span.text:
                filename = span.text.strip('《》')
                break

        # 提取下载链接
        download_link = None
        a_tag = soup.find('a', attrs={'data-auto-sign': 'true'})
        if a_tag and 'href' in a_tag.attrs:
            download_link = a_tag['href']

        return filename, download_link

    def download_file(self, url, filename):
        """下载文件"""
        try:
            response = requests.get(url, stream=True, timeout=30)
            if response.status_code == 200:
                # 清理文件名中的非法字符
                safe_filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
                safe_filename = f"{safe_filename}.pdf"
                file_path = self.download_dir / safe_filename

                # 下载文件
                total_size = int(response.headers.get('content-length', 0))
                block_size = 1024  # 1 KB

                self.log_message(f"📥 开始下载: {safe_filename}")

                with open(file_path, 'wb') as f:
                    for data in response.iter_content(block_size):
                        f.write(data)

                self.log_message(f"✅ 下载完成: {safe_filename}")
                return True
            else:
                self.log_message(f"❌ 下载失败 ({response.status_code}): {filename}")
                return False

        except Exception as e:
            self.log_message(f"❌ 下载异常: {str(e)}")
            return False

    def process_messages(self):
        """处理所有消息"""
        self.log_message("🚀 开始处理消息...")

        # 获取消息列表
        response_data = self.get_messages()
        if not response_data or response_data.get('Code') != 1:
            self.log_message("❌ 获取消息失败")
            return

        messages = response_data.get('Data', {}).get('messags', [])
        if not messages:
            self.log_message("ℹ️ 没有找到任何消息")
            return

        self.log_message(f"📝 找到 {len(messages)} 条消息")

        # 处理每条消息
        for idx, message in enumerate(messages, 1):
            content = message.get('content', '')
            if not content:
                continue

            self.log_message(f"\n处理第 {idx}/{len(messages)} 条消息")

            # 提取下载链接和文件名
            filename, download_link = self.extract_download_links(content)

            if filename and download_link:
                self.log_message(f"📄 文件名: {filename}")
                self.log_message(f"🔗 下载链接: {download_link}")

                # 下载文件
                self.download_file(download_link, filename)
            else:
                self.log_message("⚠️ 无法提取文件信息")

            # 添加延时，避免请求过于频繁
            if idx < len(messages):
                time.sleep(2)

        self.log_message("\n✅ 所有消息处理完成!")
        self.log_message(f"📁 文件保存在: {self.download_dir}")
        self.log_message(f"📝 日志文件: {self.log_file}")

def main():
    downloader = MessageDownloader()
    downloader.process_messages()

if __name__ == "__main__":
    main()
