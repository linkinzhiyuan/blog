import requests
import sys
import webbrowser
from bs4 import BeautifulSoup

# 检查是否提供了搜索词
if len(sys.argv) < 2:
    print('请输入搜索词。例如: python script.py 搜索词')
    sys.exit()

# 构建搜索URL
search_term = ' '.join(sys.argv[1:])
url = f'https://www.google.com/search?q={search_term}'

print(f'Googling for {search_term}...')

# 添加 User-Agent 头，模拟浏览器访问
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

try:
    # 发送请求
    res = requests.get(url, headers=headers)
    res.raise_for_status()

    # 解析页面
    soup = BeautifulSoup(res.text, 'html.parser')

    # 更新选择器以匹配 Google 搜索结果
    # 现代 Google 搜索结果的链接通常在 <div class="g"> 中
    link_elems = soup.select('div.g a')

    if not link_elems:
        print('未找到搜索结果')
        sys.exit()

    # 打开前5个链接（或更少，如果结果少于5个）
    num_open = min(5, len(link_elems))

    for i in range(num_open):
        href = link_elems[i].get('href')
        if href and href.startswith('http'):
            print(f'Opening: {href}')
            webbrowser.open(href)

except requests.RequestException as e:
    print(f'发生错误: {e}')
