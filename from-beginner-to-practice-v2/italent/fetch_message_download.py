import requests
import json
import time
from pathlib import Path
from typing import List, Dict
import math
from urllib.parse import quote
from datetime import datetime

def create_logger(mode: str):
    """创建日志记录器"""
    # 创建日志目录
    log_dir = Path('logs')
    log_dir.mkdir(exist_ok=True)

    # 根据模式选择固定的日志文件名
    log_file = log_dir / f'{mode}_download.log'

    # 生成本次执行的唯一标识
    execution_id = datetime.now().strftime('%Y%m%d_%H%M%S')

    def log_message(message: str):
        """记录日志"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_line = f"[{timestamp}][{execution_id}] {message}\n"
        print(message)
        with open(log_file, 'a', encoding='utf-8') as f:
            f.write(log_line)

    # 写入执行开始标记
    separator = "="*50
    log_message(f"\n{separator}")
    log_message(f"开始新的执行 (ID: {execution_id})")
    log_message(f"执行模式: {mode}")
    log_message(separator)

    return log_message, execution_id

def load_json_file(filename: str) -> dict:
    """加载JSON文件"""
    try:
        with open(Path('output') / filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"❌ 读取文件 {filename} 失败: {str(e)}")
        return None

def chunk_list(lst: List, chunk_size: int) -> List[List]:
    """将列表分割成指定大小的块"""
    return [lst[i:i + chunk_size] for i in range(0, len(lst), chunk_size)]

def simulate_download_attachments(is_log=True):
    """模拟下载附件的函数"""
    # 创建日志记录器
    log_message, execution_id = create_logger('simulate')
    # 加载必要的数据
    file_types = load_json_file('file_types.json')
    employee_data = load_json_file('employee_data.json')

    if not file_types or not employee_data:
        log_message("❌ 无法加载必要的数据文件")
        return

    # 提取员工IDs
    employee_ids = [emp['cmp_id'] for emp in employee_data]
    id_chunks = chunk_list(employee_ids, 500)

    # 模拟返回结果
    success_response = {
        "code": "200",
        "sync": False,
        "message": "正在下载，成功后会发送系统通知",
        "warn": "",
        "tipType": "normalTip",
        "url": None
    }

    # 统计信息
    stats = {
        'total_requests': 0,
        'successful_requests': 0,
        'file_types_processed': 0
    }

    log_message("🚀 开始模拟批量下载附件...")

    # 第一层循环：遍历文件类型
    for file_type in file_types:
        stats['file_types_processed'] += 1
        log_message(f"\n🔄 处理文件类型: {file_type['text']} ({file_type['value']})")

        # 第二层循环：遍历ID组
        for chunk_index, id_chunk in enumerate(id_chunks):
            stats['total_requests'] += 1

            log_message(f"\n📦 处理第 {chunk_index + 1}/{len(id_chunks)} 组ID (共 {len(id_chunk)} 个ID)")
            log_message(f"📄 当前批次首个ID: {id_chunk[0]}")
            log_message(f"📄 当前批次末个ID: {id_chunk[-1]}")

            # 模拟成功的API调用
            stats['successful_requests'] += 1
            log_message(f"✅ 模拟调用成功: {success_response['message']}")

            # 第二层循环间隔20秒
            if chunk_index < len(id_chunks) - 1:
                log_message("⏳ 等待1s后处理下一组ID...")
                time.sleep(1)

        # 第一层循环间隔5分钟
        if file_type != file_types[-1]:
            log_message("\n⏳ 等待20s后处理下一个文件类型...")
            time.sleep(3)

     # 在结束时添加执行结束标记
    log_message("\n" + "="*50)
    log_message(f"执行完成 (ID: {execution_id})")
    log_message("="*50 + "\n")

    return stats

def download_attachments(is_log=True):
    """下载附件的主函数"""
    # 创建日志记录器
    log_message, execution_id = create_logger('real')

    # 加载必要的数据
    file_types = load_json_file('file_types.json')
    employee_data = load_json_file('employee_data.json')

    if not file_types or not employee_data:
        log_message("❌ 无法加载必要的数据文件")
        return

    # 统计信息
    stats = {
        'total_requests': 0,
        'successful_requests': 0,
        'file_types_processed': 0
    }

    # 提取员工IDs
    employee_ids = [emp['cmp_id'] for emp in employee_data]
    log_message(f"📊 总员工数: {len(employee_ids)}")

    # 基础URL和请求头
    base_url = 'https://cloud.italent.cn/api/v2/UI/ExportAttach'

    headers = {
        'Accept': 'application/json, application/xml, text/play, text/html, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json; charset=utf-8',
        'Origin': 'https://cloud.italent.cn',
        'Pragma': 'no-cache',
        'Referer': 'https://cloud.italent.cn/TenantBase',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'X-Sourced-By': 'ajax',
        'fal': quote('下载附件'),
        'fan': 'extxiazaozhaop',
        'fapp': 'TenantBase',
        'fpl': quote('在职员工'),
        'fpn': 'TenantBase.InServiceEmployeeNavView',
        'ftc': 'f8d39b50-9ab8-4b5c-8592-7f832fc624c1',
        'fver': '4.11.8',
        'tenant_id': '110088',
        'user_id': '128514306'
    }

    cookies = {
        'xxx': 'xxxx'
    }

    # 将员工ID分组，每组最多500个
    id_chunks = chunk_list(employee_ids, 500)
    log_message(f"📦 ID分组数: {len(id_chunks)}")

    log_message("🚀 开始批量下载附件...")

    # 第一层循环：遍历文件类型
    for file_type in file_types:
        stats['file_types_processed'] += 1
        log_message(f"\n🔄 处理文件类型: {file_type['text']} ({file_type['value']})")

        params = {
            'app': 'TenantBase',
            'metaObjName': 'TenantBase.EmployeeInformation',
            'viewName': 'TenantBase.SingleObjectListView.InServiceEmployeeInformationList',
            'exportName': 'extxiazaozhaop',
            'attachColumnName': file_type['value'],
            'attachColumnText': quote(file_type['text']),
            'btnCode_sa': 'extxiazaozhaop',
            'btnMetaObjectName_sa': 'TenantBase.EmployeeInformation',
            'shadow_context': '{"appModel":"italent","uppid":""}',
            '_qsrcapp': 'tenantbase',
            'quark_s': 'a3e6ee79f17ee8e934bc786453c23ae15fe196bee59bac15bb82c6b1b953e337'
        }

        # 第二层循环：遍历ID组
        for chunk_index, id_chunk in enumerate(id_chunks):
            stats['total_requests'] += 1
            log_message(f"\n📦 处理第 {chunk_index + 1}/{len(id_chunks)} 组ID (共 {len(id_chunk)} 个ID)")
            log_message(f"📄 当前批次首个ID: {id_chunk[0]}")
            log_message(f"📄 当前批次末个ID: {id_chunk[-1]}")

            # 准备请求数据
            data = {
                "SearchCondition": {
                    "table_data": {
                        "advance": {"cmp_render": {"viewPath": "PureTable", "status": "enable"}},
                        "tableChangeReason": "tableCapacityChange",
                        "hasCheckColumn": True,
                        "ext_data": {"ListViewLabel": "在职员工列表"},
                        "paging": {"capacity": 500, "page": 0},
                        "viewName": "TenantBase.SingleObjectListView.InServiceEmployeeInformationList",
                        "metaObjName": "TenantBase.EmployeeInformation"
                    },
                    "search_data": {
                        "metaObjName": "TenantBase.EmployeeInformation",
                        "searchView": "TenantBase.InServiceEmployeeSearchView",
                        "items": []
                    }
                },
                "IDS": ",".join(id_chunk)
            }

            try:
                response = requests.post(
                    base_url,
                    params=params,
                    headers=headers,
                    cookies=cookies,
                    json=data,
                    timeout=30
                )

                if response.status_code == 200:
                    result = response.json()
                    if result.get('code') == '200':
                        stats['successful_requests'] += 1
                        log_message(f"✅ 成功触发下载: {result.get('message', '')}")
                    else:
                        log_message(f"❌ 请求失败: {result}")
                else:
                    log_message(f"❌ HTTP错误: {response.status_code}")

            except Exception as e:
                log_message(f"❌ 请求异常: {str(e)}")

            # 第二层循环间隔
            if chunk_index < len(id_chunks) - 1:
                log_message("⏳ 等待10秒后处理下一组ID...")
                time.sleep(10)

        # 第一层循环间隔
        if file_type != file_types[-1]:
            log_message("\n⏳ 等待20s后处理下一个文件类型...")
            time.sleep(20)

    # 在结束时添加执行结束标记
    log_message("\n" + "="*50)
    log_message(f"执行完成 (ID: {execution_id})")
    log_message("="*50 + "\n")

    return stats


def main(mode='real'):
    """主函数，可选择运行模式"""
    if mode == 'simulate':
        print("🔄 运行模拟模式...")
        stats = simulate_download_attachments()
        print("\n✅ 模拟下载任务已全部完成!")
        return stats
    else:
        print("🔄 运行实际下载模式...")
        download_attachments()
        print("\n✅ 实际下载任务已全部完成!")

if __name__ == "__main__":
    # 可以通过修改mode参数来切换模式
    # mode='simulate' 运行模拟模式
    # mode='real' 运行实际下载模式
    main(mode='simulate')
