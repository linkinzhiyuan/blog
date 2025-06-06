import time
import os
import warnings
from pathlib import Path

# 完全禁用警告
warnings.filterwarnings('ignore')
os.environ['PYTHONWARNINGS'] = 'ignore'

import urllib3
urllib3.disable_warnings()

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support.ui import Select
import logging

# 尝试导入 chromedriver-py
try:
  import chromedriver_py
  CHROMEDRIVER_PATH = chromedriver_py.binary_path
  print(f"✅ 使用本地 ChromeDriver: {CHROMEDRIVER_PATH}")
except ImportError:
  CHROMEDRIVER_PATH = None
  print("⚠️ chromedriver-py 未安装，将尝试使用系统 ChromeDriver")

# 配置简洁的日志
logging.basicConfig(
  level=logging.WARNING,
  format='%(message)s'
)

# 禁用第三方库日志
for logger_name in ['selenium', 'urllib3', 'WDM']:
  logging.getLogger(logger_name).setLevel(logging.CRITICAL)

class LitsoftAutomation:
  def __init__(self, download_path=None, headless=False):
      """
      Litsoft系统专用自动化类

      Args:
          download_path: 下载文件保存路径
          headless: 是否无头模式运行
      """
      home_dir = Path.home()

      if download_path is None:
          self.download_path = str(home_dir / "Downloads" / "litsoft_downloads")
      else:
          self.download_path = download_path

      self.headless = headless
      self.driver = None
      self.wait = None

      # 创建下载目录
      try:
          os.makedirs(self.download_path, exist_ok=True)
          print(f"📁 下载目录: {self.download_path}")
      except PermissionError:
          self.download_path = os.path.join(os.getcwd(), "litsoft_downloads")
          os.makedirs(self.download_path, exist_ok=True)
          print(f"📁 下载目录: {self.download_path}")

  def setup_driver(self):
      """设置浏览器驱动"""
      try:
          print("🔧 启动浏览器...")

          chrome_options = Options()

          # 下载设置
          prefs = {
              "download.default_directory": self.download_path,
              "download.prompt_for_download": False,
              "download.directory_upgrade": True,
              "safebrowsing.enabled": True,
              "profile.default_content_setting_values.automatic_downloads": 1
          }
          chrome_options.add_experimental_option("prefs", prefs)

          # 浏览器选项
          chrome_options.add_argument("--no-sandbox")
          chrome_options.add_argument("--disable-dev-shm-usage")
          chrome_options.add_argument("--disable-blink-features=AutomationControlled")
          chrome_options.add_argument("--disable-web-security")
          chrome_options.add_argument("--allow-running-insecure-content")
          chrome_options.add_argument("--disable-logging")
          chrome_options.add_argument("--log-level=3")
          chrome_options.add_argument("--silent")
          chrome_options.add_experimental_option("excludeSwitches", ["enable-automation", "enable-logging"])
          chrome_options.add_experimental_option('useAutomationExtension', False)

          if self.headless:
              chrome_options.add_argument("--headless")

          # 使用本地 ChromeDriver
          if CHROMEDRIVER_PATH:
              service = Service(CHROMEDRIVER_PATH)
              self.driver = webdriver.Chrome(service=service, options=chrome_options)
          else:
              self.driver = webdriver.Chrome(options=chrome_options)

          # 隐藏自动化特征
          self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

          # 设置等待
          self.wait = WebDriverWait(self.driver, 15)

          # 最大化窗口
          self.driver.maximize_window()

          print("✅ 浏览器启动成功")
          return True

      except Exception as e:
          print(f"❌ 浏览器启动失败: {e}")
          return False

  def open_website(self, url):
      """打开网站"""
      try:
          print(f"🌐 访问Litsoft系统...")
          self.driver.get(url)
          self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
          print("✅ 页面加载完成")
          return True
      except Exception as e:
          print(f"❌ 页面加载失败: {e}")
          return False

  def wait_for_manual_login(self, login_success_indicator):
      """等待用户手动登录"""
      print("\n" + "="*60)
      print("🔐 请在浏览器中完成登录")
      print("登录成功后程序会自动继续...")
      print("="*60 + "\n")

      indicator_type, indicator_value = login_success_indicator
      check_count = 0

      while True:
          try:
              # 检查登录成功标识 - 查找 user-name 类
              if indicator_type == "class":
                  self.driver.find_element(By.CLASS_NAME, indicator_value)
              elif indicator_type == "id":
                  self.driver.find_element(By.ID, indicator_value)
              elif indicator_type == "xpath":
                  self.driver.find_element(By.XPATH, indicator_value)
              elif indicator_type == "text":
                  self.driver.find_element(By.XPATH, f"//*[contains(text(), '{indicator_value}')]")
              elif indicator_type == "url_contains":
                  if indicator_value not in self.driver.current_url:
                      raise NoSuchElementException("URL不匹配")

              print("✅ 登录成功！开始自动化操作...")
              break

          except NoSuchElementException:
              check_count += 1
              if check_count % 15 == 0:  # 每30秒提示一次
                  elapsed = check_count * 2
                  print(f"⏳ 等待登录... ({elapsed}秒)")
              time.sleep(2)

  def navigate_to_target_page(self, target_url):
      """导航到目标页面"""
      try:
          print("🔄 跳转到文件管理页面...")
          current_url = self.driver.current_url

          # 如果当前URL和目标URL不同，或者不包含目标路径，则跳转
          if target_url not in current_url or "#/file-manage/home" not in current_url:
              self.driver.get(target_url)
              time.sleep(3)

              # 等待页面加载完成
              self.wait.until(lambda driver: driver.execute_script("return document.readyState") == "complete")
              print("✅ 成功跳转到文件管理页面")
          else:
              print("✅ 已在目标页面")

          return True

      except Exception as e:
          print(f"❌ 跳转到目标页面失败: {e}")
          return False

  def set_page_size_to_100(self):
      """设置每页显示100条记录"""
      try:
          print("🔢 设置每页显示100条记录...")

          # 等待页面加载完成
          time.sleep(3)

          # 查找 lit-pagination 下的 el-pagination__sizes
          try:
              # 先找到 lit-pagination 容器
              pagination_container = self.wait.until(
                  EC.presence_of_element_located((By.CLASS_NAME, "lit-pagination"))
              )

              # 在容器内查找 el-pagination__sizes
              sizes_element = pagination_container.find_element(By.CLASS_NAME, "el-pagination__sizes")

              # 滚动到元素位置
              self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", sizes_element)
              time.sleep(0.5)

              # 点击分页大小选择器
              sizes_element.click()
              time.sleep(1)

              print("✅ 已点击分页大小选择器")

              # 查找并点击 100条/页 选项
              success = self._select_100_option()

              if success:
                  print("✅ 成功设置为100条/页")
                  time.sleep(3)  # 等待页面重新加载
                  return True
              else:
                  print("⚠️ 未找到100条/页选项，使用默认设置")
                  return False

          except TimeoutException:
              print("⚠️ 未找到 lit-pagination 容器")
              return False
          except NoSuchElementException:
              print("⚠️ 未找到 el-pagination__sizes 元素")
              return False

      except Exception as e:
          print(f"⚠️ 设置分页大小失败: {e}")
          return False

  def _select_100_option(self):
      """选择100条/页选项"""
      try:
          # 等待下拉选项出现
          time.sleep(1)

          # Element UI 和 Litsoft 系统的选项选择器
          selectors_to_try = [
              # Element UI 标准选择器
              "//li[contains(@class, 'el-select-dropdown__item') and contains(text(), '100')]",
              "//li[contains(@class, 'el-option') and contains(text(), '100')]",
              # 包含100的各种文本格式
              "//li[contains(text(), '100条/页')]",
              "//li[contains(text(), '100 条/页')]",
              "//li[text()='100条/页']",
              "//li[text()='100']",
              "//span[contains(text(), '100条/页')]",
              "//div[contains(text(), '100条/页')]",
              # 通用选择器
              "//*[contains(@class, 'dropdown') and contains(text(), '100')]",
              "//*[contains(@class, 'option') and contains(text(), '100')]",
              "//*[contains(@class, 'item') and contains(text(), '100')]"
          ]

          for selector in selectors_to_try:
              try:
                  # 等待选项出现并可点击
                  option = WebDriverWait(self.driver, 3).until(
                      EC.element_to_be_clickable((By.XPATH, selector))
                  )

                  # 滚动到选项
                  self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", option)
                  time.sleep(0.3)

                  # 点击选项
                  try:
                      option.click()
                  except:
                      self.driver.execute_script("arguments[0].click();", option)

                  print(f"✅ 成功选择100条/页选项")
                  return True

              except (TimeoutException, NoSuchElementException):
                  continue

          print("⚠️ 未找到100条/页选项")
          return False

      except Exception as e:
          print(f"⚠️ 选择100条/页选项失败: {e}")
          return False

  def select_all_checkboxes(self):
      """选中table > thead中的第一个复选框（全选）"""
      try:
          print("☑️ 查找table > thead中的第一个复选框...")
          time.sleep(1)

          # 专门查找 table > thead 中的第一个复选框的选择器
          selectors_to_try = [
              # CSS选择器 - 最精确的table > thead第一个复选框
              "table > thead > tr > th .el-checkbox__inner",
              "table > thead th:first-child input[type='checkbox']",
              "table > thead > tr > th:first-child input[type='checkbox']",
              "table > thead tr th:first-of-type input[type='checkbox']",

              # XPath选择器 - table > thead中的第一个复选框
              "//table//thead//input[@type='checkbox'][1]",
              "//table//thead//th[1]//input[@type='checkbox']",
              "//table//thead//tr//th[1]//input[@type='checkbox']",
              "//table//thead//input[@type='checkbox'][position()=1]",

              # Element UI特定的选择器
              "table > thead .el-checkbox__original:first-of-type",
              "table > thead th:first-child .el-checkbox__original",
              "//table//thead//th[1]//input[contains(@class, 'el-checkbox__original')]",
              "//table//thead//input[contains(@class, 'el-checkbox__original')][1]",

              # 更宽泛的thead选择器
              "thead input[type='checkbox']:first-of-type",
              "thead th:first-child input[type='checkbox']",
              "//thead//input[@type='checkbox'][1]",
              "//thead//th[1]//input[@type='checkbox']",

              # 备用选择器
              "table thead input[type='checkbox']:first-child",
              "//table//thead//input[@type='checkbox' and position()=1]"
          ]

          checkbox_found = False

          for i, selector in enumerate(selectors_to_try):
              try:
                  print(f"🔍 尝试选择器 {i+1}: {selector}")

                  if selector.startswith("//"):
                      # XPath选择器
                      checkbox = WebDriverWait(self.driver, 3).until(
                          EC.presence_of_element_located((By.XPATH, selector))
                      )
                  else:
                      # CSS选择器
                      checkbox = WebDriverWait(self.driver, 3).until(
                          EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                      )

                  # 检查复选框是否可见和可用
                  if checkbox.is_displayed() and checkbox.is_enabled():
                      print(f"✅ 找到thead中的第一个复选框，位置: {checkbox.location}")

                      # 滚动到复选框
                      self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", checkbox)
                      time.sleep(0.5)

                      # 检查是否已选中
                      if not checkbox.is_selected():
                          try:
                              # 尝试直接点击
                              checkbox.click()
                              print("✅ 直接点击thead复选框成功")
                          except Exception as click_error:
                              print(f"⚠️ 直接点击失败: {click_error}")
                              # 如果直接点击失败，使用JavaScript点击
                              self.driver.execute_script("arguments[0].click();", checkbox)
                              print("✅ JavaScript点击thead复选框成功")

                          time.sleep(1)  # 等待全选生效
                          checkbox_found = True
                          break
                      else:
                          print("✅ thead复选框已经选中")
                          checkbox_found = True
                          break
                  else:
                      print(f"⚠️ 复选框不可见或不可用")

              except (TimeoutException, NoSuchElementException) as e:
                  print(f"⚠️ 选择器 {i+1} 未找到元素")
                  continue
              except Exception as e:
                  print(f"⚠️ 选择器 {i+1} 出现异常: {e}")
                  continue

          if not checkbox_found:
              print("⚠️ 未找到table > thead中的复选框，尝试查找其他复选框...")
              return self._select_individual_checkboxes()

          return checkbox_found

      except Exception as e:
          print(f"❌ 选择复选框失败: {e}")
          return False

  def _select_individual_checkboxes(self):
      """选中所有单独的复选框（备用方案）"""
      try:
          print("🔍 查找并选中所有复选框...")

          # 查找所有复选框
          checkboxes = self.driver.find_elements(By.CLASS_NAME, "el-checkbox__original")

          if not checkboxes:
              # 如果没找到，尝试其他选择器
              checkboxes = self.driver.find_elements(By.XPATH, "//input[@type='checkbox' and not(@disabled)]")

          if not checkboxes:
              print("⚠️ 未找到任何复选框")
              return False

          selected_count = 0
          for checkbox in checkboxes:
              try:
                  if checkbox.is_displayed() and checkbox.is_enabled() and not checkbox.is_selected():
                      self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", checkbox)
                      time.sleep(0.1)

                      try:
                          checkbox.click()
                      except:
                          self.driver.execute_script("arguments[0].click();", checkbox)

                      selected_count += 1
                      time.sleep(0.05)
              except:
                  continue

          print(f"✅ 已选中 {selected_count}/{len(checkboxes)} 个复选框")
          return selected_count > 0

      except Exception as e:
          print(f"❌ 选择单独复选框失败: {e}")
          return False

  def click_export_button(self):
      """点击导出按钮"""
      try:
          print("📥 点击导出按钮...")

          # 查找包含"导出"文本的按钮
          selectors_to_try = [
              # 精确文本匹配
              "//button[text()='导出']",
              "//a[text()='导出']",
              "//span[text()='导出']",
              # 包含文本匹配
              "//button[contains(text(), '导出')]",
              "//a[contains(text(), '导出')]",
              "//span[contains(text(), '导出')]",
              "//*[contains(text(), '导出')]",
              # Element UI 按钮
              "//button[contains(@class, 'el-button') and contains(text(), '导出')]",
              # 通用按钮选择器
              "//*[@role='button' and contains(text(), '导出')]"
          ]

          for selector in selectors_to_try:
              try:
                  button = self.wait.until(EC.element_to_be_clickable((By.XPATH, selector)))

                  # 滚动到按钮
                  self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", button)
                  time.sleep(0.5)

                  # 点击按钮
                  try:
                      button.click()
                  except:
                      self.driver.execute_script("arguments[0].click();", button)

                  print("✅ 已点击导出按钮")
                  return True

              except (TimeoutException, NoSuchElementException):
                  continue

          print("❌ 未找到导出按钮")
          return False

      except Exception as e:
          print(f"❌ 点击导出按钮失败: {e}")
          return False

  def wait_for_download_complete(self, timeout=120):
      """等待下载完成"""
      print(f"⏳ 等待下载完成...")
      start_time = time.time()
      initial_files = set(os.listdir(self.download_path))

      # 等待下载开始
      download_started = False
      for _ in range(50):  # 最多等待10秒
          current_files = set(os.listdir(self.download_path))
          downloading_files = [f for f in current_files if f.endswith(('.crdownload', '.tmp', '.part'))]
          new_files = current_files - initial_files

          if downloading_files or new_files:
              download_started = True
              break
          time.sleep(0.2)

      if not download_started:
          print("⚠️ 未检测到下载开始")
          return False

      # 等待下载完成
      dots = 0
      while time.time() - start_time < timeout:
          current_files = set(os.listdir(self.download_path))
          downloading_files = [f for f in current_files if f.endswith(('.crdownload', '.tmp', '.part'))]

          if not downloading_files:
              new_files = current_files - initial_files
              completed_files = [f for f in new_files if not f.endswith(('.crdownload', '.tmp', '.part'))]
              if completed_files:
                  print(f"\n✅ 下载完成: {completed_files[0]}")
              else:
                  print(f"\n✅ 下载完成")
              return True

          # 显示进度点
          dots = (dots + 1) % 4
          print(f"\r⏳ 下载中{'.' * dots}{' ' * (3-dots)}", end='', flush=True)
          time.sleep(1)

      print(f"\n⚠️ 下载超时")
      return False

  def click_next_page(self):
      """点击下一页"""
      try:
          print("➡️ 查找下一页按钮...")

          # 查找 btn-next 类的下一页按钮
          selectors_to_try = [
              # 精确的类名匹配
              "//button[contains(@class, 'btn-next')]",
              "//a[contains(@class, 'btn-next')]",
              "//*[contains(@class, 'btn-next')]",
              # Element UI 分页器的下一页
              "//button[contains(@class, 'el-pager') and contains(@class, 'btn-next')]",
              "//li[contains(@class, 'btn-next')]",
              # 通用的下一页按钮
              "//button[contains(text(), '下一页')]",
              "//a[contains(text(), '下一页')]",
              "//*[contains(text(), '下一页')]",
              # 箭头符号
              "//button[contains(text(), '>')]",
              "//*[contains(@class, 'next') and not(contains(@class, 'disabled'))]"
          ]

          for selector in selectors_to_try:
              try:
                  button = self.wait.until(EC.presence_of_element_located((By.XPATH, selector)))

                  # 检查按钮状态
                  if (button.get_attribute("disabled") or
                      "disabled" in (button.get_attribute("class") or "") or
                      not button.is_enabled()):
                      continue

                  # 滚动到按钮
                  self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", button)
                  time.sleep(0.5)

                  # 点击下一页
                  try:
                      button.click()
                  except:
                      self.driver.execute_script("arguments[0].click();", button)

                  print("✅ 翻到下一页")
                  time.sleep(3)  # 等待页面加载
                  return True

              except (TimeoutException, NoSuchElementException):
                  continue

          print("🏁 没有找到可用的下一页按钮")
          return False

      except Exception as e:
          print(f"❌ 翻页失败: {e}")
          return False

  def run_automation(self):
      """运行Litsoft系统自动化流程"""
      try:
          print("🤖 Litsoft系统自动化下载工具")
          print("="*60)

          # 固定配置
          config = {
              'login_url': 'https://pvt-info.litsoft.com.cn/hr-grs-system?systemCode=HR_GRS_SYSTEM',
              'target_url': 'https://pvt-info.litsoft.com.cn/hr-grs-system?systemCode=HR_GRS_SYSTEM#/file-manage/home',
              'login_success_indicator': ('class', 'user-name'),
              'download_timeout': 120,
              'max_pages': 50
          }

          # 启动浏览器
          if not self.setup_driver():
              return False

          # 打开登录页面
          if not self.open_website(config['login_url']):
              return False

          # 等待登录
          self.wait_for_manual_login(config['login_success_indicator'])

          # 跳转到文件管理页面
          if not self.navigate_to_target_page(config['target_url']):
              return False

          # 设置每页显示100条记录
          self.set_page_size_to_100()

          # 开始批量处理
          page_count = 0
          total_downloads = 0

          print("\n🚀 开始批量下载...")
          print("="*60)

          while True:
              page_count += 1
              print(f"\n📄 处理第 {page_count} 页")
              print("-" * 30)

              time.sleep(2)  # 等待页面稳定

              # 选择所有项目（点击table > thead中的第一个复选框）
              if self.select_all_checkboxes():
                  # 导出
                  if self.click_export_button():
                      if self.wait_for_download_complete(config['download_timeout']):
                          total_downloads += 1
                      else:
                          print("⚠️ 下载可能未完成")
                  else:
                      print("❌ 导出失败")
              else:
                  print("⚠️ 没有可选择的项目")

              # 下一页
              if not self.click_next_page():
                  break

              # 安全限制
              if page_count >= config['max_pages']:
                  print(f"⚠️ 达到页数限制 ({config['max_pages']})")
                  break

          # 完成统计
          print("\n" + "="*60)
          print("🎉 Litsoft系统下载任务完成！")
          print(f"📊 处理页数: {page_count}")
          print(f"📥 成功下载: {total_downloads}")
          print(f"📁 文件位置: {self.download_path}")
          print("="*60)

          return True

      except KeyboardInterrupt:
          print("\n\n⏹️ 用户中断操作")
          return False
      except Exception as e:
          print(f"\n❌ 程序异常: {e}")
          return False
      finally:
          print("\n按回车键关闭浏览器...")
          input()
          self.close()

  def close(self):
      """关闭浏览器"""
      if self.driver:
          self.driver.quit()
          print("🔒 浏览器已关闭")

def main():
  print("🤖 Litsoft系统专用自动化下载工具 v2.1")
  print("🎯 目标系统: pvt-info.litsoft.com.cn")
  print("✨ 优化: 专门查找table > thead中的第一个复选框")
  print("🔄 流程: 登录 → 跳转 → 设置100条/页 → 全选 → 导出 → 翻页")
  print("="*60)

  # 启动自动化
  automation = LitsoftAutomation(headless=False)
  automation.run_automation()

if __name__ == "__main__":
  main()