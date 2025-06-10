import requests
import json
import time
from urllib.parse import parse_qs, urlparse, quote
from pathlib import Path

def save_to_json(data, filename='file_types.json'):
    """
    保存数据到JSON文件

    Args:
        data: 要保存的数据
        filename: JSON文件名，默认为'file_types.json'

    Returns:
        bool: 保存是否成功
    """
    try:
        # 确保输出目录存在
        output_dir = Path('output')
        output_dir.mkdir(exist_ok=True)

        # 构建完整的文件路径
        file_path = output_dir / filename

        # 保存数据到JSON文件
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"✅ 数据已成功保存到: {file_path}")
        return True

    except Exception as e:
        print(f"❌ 保存数据时出错: {str(e)}")
        return False
def parse_curl_to_api_call():
    """解析curl命令并创建API调用函数"""

    # 从curl命令中提取的信息
    url = 'https://cloud.italent.cn/api/v2/UI/ExportAttach'

    # 请求参数（从URL中提取）
    params = {
        'app': 'TenantBase',
        'metaObjName': 'TenantBase.EmployeeInformation',
        'viewName': 'TenantBase.SingleObjectListView.InServiceEmployeeInformationList',
        'tenantID': '110088',
        'userID': '128514306',
        'btnCode_sa': 'extxiazaozhaop',
        'btnMetaObjectName_sa': 'TenantBase.EmployeeInformation',
        'ticket_sa': 'undefined',
        'time': str(int(time.time() * 1000)),  # 当前时间戳
        'shadow_context': '{"appModel":"italent","uppid":""}',
        '_qsrcapp': 'tenantbase',
        'quark_s': 'd3907e0163f7fd9f7715ecfc4e4d5651bfe0a628d72d13afc288ffa9b415a819'
    }

    # 请求头 - 移除中文字符，使用URL编码
    headers = {
        'Accept': 'application/json, application/xml, text/play, text/html, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json; charset=utf-8',
        'Pragma': 'no-cache',
        'Referer': 'https://cloud.italent.cn/TenantBase?_qsrcapp=tenantbase&_qrt=html&quark_s=32fd05a204f01683939f9da3c83019d5424fd8a2a70a27862e69f9794f0b2d9c',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'X-Sourced-By': 'ajax',
        'fal': quote('下载附件'),  # URL编码中文
        'fan': 'extxiazaozhaop',
        'fapp': 'TenantBase',
        'fpl': quote('在职员工'),  # URL编码中文
        'fpn': 'TenantBase.InServiceEmployeeNavView',
        'ftc': '11b9461f-4026-464d-94f4-3072d4791a49',
        'fver': '4.11.8',
        'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'tenant_id': '110088',
        'user_id': '128514306'
    }

    # Cookies
    cookies = {
        'xxxx': 'xxx'
    }

    return url, params, headers, cookies

def call_export_api(url, params, headers, cookies):
    """调用导出API"""
    try:
        print("🚀 调用导出API...")
        print(f"URL: {url}")
        print(f"参数数量: {len(params)}")

        # 创建session以保持cookies
        session = requests.Session()
        session.cookies.update(cookies)

        response = session.get(
            url,
            params=params,
            headers=headers,
            timeout=30,
            verify=False  # 忽略SSL验证
        )

        print(f"状态码: {response.status_code}")
        print(f"响应头Content-Type: {response.headers.get('content-type', 'unknown')}")

        if response.status_code == 200:
            # 尝试解析JSON
            try:
                json_data = response.json()
                print("✅ 成功获取JSON响应:")
                print(json.dumps(json_data, indent=2, ensure_ascii=False))
                return json_data
            except json.JSONDecodeError:
                # 如果不是JSON，可能是文件下载
                print("✅ 响应不是JSON，可能是文件下载")
                print(f"内容类型: {response.headers.get('content-type', 'unknown')}")
                print(f"内容长度: {len(response.content)} 字节")

                # 检查响应内容的前100个字符
                try:
                    content_preview = response.text[:200]
                    print(f"内容预览: {content_preview}")
                except:
                    print("无法预览文本内容")

                return {
                    "content_type": response.headers.get('content-type'),
                    "content_length": len(response.content),
                    "content_preview": response.text[:200] if response.text else "binary content",
                    "headers": dict(response.headers)
                }
        else:
            print(f"❌ API调用失败: {response.status_code}")
            print(f"错误内容: {response.text[:500]}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"❌ 请求异常: {e}")
        return None

# 创建一个简化版本的API调用函数
def create_api_caller():
    """创建API调用器"""
    print("📋 创建italent API调用器")
    print("="*50)

    url, params, headers, cookies = parse_curl_to_api_call()

    print("🔧 API配置:")
    print(f"  URL: {url}")
    print(f"  参数: {len(params)} 个")
    print(f"  请求头: {len(headers)} 个")
    print(f"  Cookies: {len(cookies)} 个")

    return url, params, headers, cookies

# 测试API调用
# print("🤖 italent API调用获取在职人员的附件类型接口")
# print("="*50)
#
# url, params, headers, cookies = create_api_caller()
#
# print("\n🚀 开始调用API...")
# fileTypeLists = call_export_api(url, params, headers, cookies)
# print("\n🚀 调用结束，附件类型列表结果是：", fileTypeLists)
# # [{'text': '毕业证书', 'value': 'extbyz_110088_1670906579'}, {'text': '附件', 'value': 'b98f6f3d-416b-4797-b713-f865c9f22075~Attachment'}, {'text': '技能证书上传-工信部认证', 'value': 'extjinengzhengshushangchuangongxinbu_110088_448227983'}, {'text': '技能证书上传-技术语言类', 'value': 'extjinengzhengshushangchuanjishuyuyanlei_110088_1031639707'}, {'text': '技能证书上传-其他', 'value': 'extjinengzhengshushangchuanqita_110088_1339354384'}, {'text': '技能证书上传-职称类/管理类', 'value': 'extjinengzhengshushangchuanzhichengguanli_110088_246535035'}, {'text': '离职证明上传', 'value': 'extlizhizhengmingshangchua_110088_2061983820'}, {'text': '身份证上传', 'value': 'extshenfenzhengshangchuan_110088_54688042'}, {'text': '体检报告上传', 'value': 'exttijianbaogaoshangchuan_110088_232654566'}, {'text': '学位证书', 'value': 'extxwzs_110088_865720833'}, {'text': '银行卡上传', 'value': 'extyinhangkashangchuan_110088_53428451'}, {'text': '照片', 'value': 'IDPhoto'}, {'text': '照片缩略图', 'value': 'SmallIDPhoto'}]

def main():
    """主函数：调用API并保存结果"""
    print("🤖 italent API调用获取在职人员的附件类型接口")
    print("="*50)

    # 创建API调用器
    url, params, headers, cookies = create_api_caller()

    # 调用API
    print("\n🚀 开始调用API...")
    file_type_lists = call_export_api(url, params, headers, cookies)

    if file_type_lists:
        # 保存结果到JSON文件
        save_success = save_to_json(file_type_lists)

        if save_success:
            print("\n📝 结果概要:")
            print(f"- 数据已保存到: output/file_types.json")
            print(f"- 数据类型: {type(file_type_lists).__name__}")
            if isinstance(file_type_lists, dict):
                print(f"- 字段数量: {len(file_type_lists)}")
            elif isinstance(file_type_lists, list):
                print(f"- 项目数量: {len(file_type_lists)}")
    else:
        print("\n❌ API调用失败，没有数据可保存")

if __name__ == "__main__":
    main()
