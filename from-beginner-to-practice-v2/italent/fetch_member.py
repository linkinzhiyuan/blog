
import requests
import json
import time
from tqdm import tqdm

def fetch_employee_data():
    url = 'https://cloud.italent.cn/api/v2/UI/TableList'

    headers = {
        'Accept': 'application/json, application/xml, text/play, text/html, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Content-Type': 'application/json; charset=utf-8',
        'Origin': 'https://www.italent.cn',
        'Referer': 'https://www.italent.cn/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'Cookie': 'xxx'
    }

    params = {
        'viewName': 'TenantBase.SingleObjectListView.InServiceEmployeeInformationList',
        'metaObjName': 'TenantBase.EmployeeInformation',
        'r_from': 'EmpInfo',
        'navType': '2',
        'app': 'TenantBase',
        'PaaS-SourceApp': 'TenantBase',
        'PaaS-CurrentView': 'TenantBase.InServiceEmployeeNavView',
        'shadow_context': '{appModel:"italent",uppid:""}',
        '_qsrcapp': 'tenantbase',
        'quark_s': 'f526f7fcc1d44a52c0863c4956244df267cfbd48b296de876aae5bed4733c880'
    }

    # 基础请求数据
    base_data = {
        "table_data": {
            "advance": {"cmp_render": {"viewPath": "PureTable", "status": "enable"}},
            "tableChangeReason": "tableIndexChange",
            "hasCheckColumn": True,
            "ext_data": {"ListViewLabel": "在职员工列表"},
            "isEnableGlobleCheck": False,
            "hasRowHandler": True,
            "paging": {
                "capacity": 500,  # 每页数量
                "page": 0,        # 页码
                "capacityList": [15, 30, 60, 100]
            },
            "isAvatars": True,
            "viewName": "TenantBase.SingleObjectListView.InServiceEmployeeInformationList",
            "operateColumWidth": 140,
            "sort_fields": [{"sort_column": "OrderCode", "sort_dir": "asc"}],
            "metaObjName": "TenantBase.EmployeeInformation"
        },
        "search_data": {
            "metaObjName": "TenantBase.EmployeeInformation",
            "searchView": "TenantBase.InServiceEmployeeSearchView",
            "items": [
                {"name": "TenantBase.EmployeeInformation.ApprovalStatus", "text": "生效", "value": "4", "num": "10"},
                {"name": "TenantBase.EmployeeInformation.StdIsDeleted", "text": "是", "value": "1", "num": "11"},
                {"name": "\\59ea2c79-d1c7-44dc-b188-a25ecfdebde0~TenantBase.EmploymentRecord.EmployeeStatus", "text": "试用, 正式", "value": "2,3", "num": "12"},
                {"name": "\\59ea2c79-d1c7-44dc-b188-a25ecfdebde0~TenantBase.EmploymentRecord.EmployType", "text": "内部员工, 实习生", "value": "0,2", "num": "13"},
                {"name": "TenantBase.EmploymentRecord.StdIsDeleted", "text": "是", "value": "1", "num": "14"},
                {"name": "TenantBase.EmploymentRecord.IsCurrentRecord", "text": "是", "value": "1", "num": "15"},
                {"name": "TenantBase.EmploymentRecord.ServiceType", "text": "主职", "value": "0", "num": "16"},
                {"name": "TenantBase.EmploymentRecord.ApprovalStatus", "text": "生效", "value": "4", "num": "17"}
            ]
        }
    }

    all_rows = []
    page = 0
    total = None

    try:
        while True:
            # 更新页码
            base_data['table_data']['paging']['page'] = page

            # 发送请求
            response = requests.post(url, headers=headers, params=params, json=base_data)
            response.raise_for_status()  # 检查请求是否成功

            data = response.json()

            # 获取总数（第一次请求时）
            if total is None:
                total = data['cmp_data']['paging']['total']
                print(f"总记录数: {total}")
                pbar = tqdm(total=total, desc="获取数据进度")

            # 获取当前页的数据
            current_rows = data['rows']
            rows_count = len(current_rows)

            if rows_count == 0:
                break

            all_rows.extend(current_rows)
            pbar.update(rows_count)

            # 检查是否获取完所有数据
            if len(all_rows) >= total:
                break

            page += 1
            time.sleep(5)  # 添加适当的延迟，避免请求过快

    except Exception as e:
        print(f"发生错误: {str(e)}")

    finally:
        if 'pbar' in locals():
            pbar.close()

    # 保存数据到文件
    if all_rows:
        output_file = 'output/employee_data.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_rows, f, ensure_ascii=False, indent=2)
        print(f"\n数据已保存到 {output_file}")
        print(f"总共获取到 {len(all_rows)} 条记录")

if __name__ == "__main__":
    fetch_employee_data()
