const https = require('https');
const fs = require('fs');
const path = require('path');

class ItalentDataFetcher {
  constructor() {
    this.allBizData = []; // 专门存储 biz_data
    this.currentPage = 0;
    this.pageSize = 1000;
    this.totalRecords = 0;
    this.totalPages = 0;
  }

  // 创建请求选项
  createRequestOptions() {
    return {
      hostname: 'cloud.italent.cn',
      path: '/api/v2/UI/TableList?viewName=TenantBase.SingleObjectListView.InServiceEmployeeInformationList&metaObjName=TenantBase.EmployeeInformation&r_from=EmpInfo&navType=2&app=TenantBase&PaaS-SourceApp=TenantBase&PaaS-CurrentView=TenantBase.InServiceEmployeeNavView&shadow_context=%7BappModel%3A%22italent%22%2Cuppid%3A%22%22%7D&_qsrcapp=tenantbase&quark_s=f526f7fcc1d44a52c0863c4956244df267cfbd48b296de876aae5bed4733c880',
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json; charset=utf-8',
        'Cookie': 'iTalent-tenantId=110088; 00000000-0000-0000-0000-000000000000.widgetState=false; isItalentLogin=; Tita_PC=GqFux106k_U0g_e2S9N3llwlaVe6fKAgxIhVYGjHIljhREWF2A-PKpg4D0WNIxHs; ssn_Tita_PC=GqFux106k_U0g_e2S9N3llwlaVe6fKAgxIhVYGjHIljhREWF2A-PKpg4D0WNIxHs; italentLoginSync=1749198151584; key-128514306=true',
        'Origin': 'https://www.italent.cn',
        'Pragma': 'no-cache',
        'Referer': 'https://www.italent.cn/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        // 'X-Sourced-By': 'ajax',
        // 'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        // 'sec-ch-ua-mobile': '?0',
        // 'sec-ch-ua-platform': '"macOS"'
      }
    };
  }

  // 创建请求体数据
  createPostData(page = 0) {
    return JSON.stringify({
      "table_data": {
        "advance": {
          "cmp_render": {
            "viewPath": "PureTable",
            "status": "enable"
          }
        },
        "tableChangeReason": "tableIndexChange",
        "hasCheckColumn": true,
        "ext_data": {
          "ListViewLabel": "在职员工列表"
        },
        "isEnableGlobleCheck": false,
        "hasRowHandler": true,
        "paging": {
          "total": this.totalRecords,
          "capacity": this.pageSize,
          "page": page,
          "capacityList": [15, 30, 60, 100]
        },
        "isAvatars": true,
        "viewName": "TenantBase.SingleObjectListView.InServiceEmployeeInformationList",
        "operateColumWidth": 140,
        "extendsParam": "",
        "isSyncRowHandler": false,
        "isFrozenOperationColumnHandler": false,
        "isCustomListViewExisted": true,
        "getTreeNodeUrl": null,
        "sort_fields": [{
          "sort_column": "OrderCode",
          "sort_dir": "asc"
        }],
        "description": "在职员工列表，以员工基本信息为主对象",
        "metaObjName": "TenantBase.EmployeeInformation",
        "isCustomListView": true,
        "navViewIsCustom": false,
        "navViewName": "TenantBase.InServiceEmployeeNavView",
        "navViewVersion": "20190805135007764"
      },
      "search_data": {
        "metaObjName": "TenantBase.EmployeeInformation",
        "searchView": "TenantBase.InServiceEmployeeSearchView",
        "items": [
          {
            "name": "TenantBase.EmployeeInformation.ApprovalStatus",
            "text": "生效",
            "value": "4",
            "num": "10",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          },
          {
            "name": "TenantBase.EmployeeInformation.StdIsDeleted",
            "text": "是",
            "value": "1",
            "num": "11",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          },
          {
            "name": "\\59ea2c79-d1c7-44dc-b188-a25ecfdebde0~TenantBase.EmploymentRecord.EmployeeStatus",
            "text": "试用, 正式",
            "value": "2,3",
            "num": "12",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          },
          {
            "name": "\\59ea2c79-d1c7-44dc-b188-a25ecfdebde0~TenantBase.EmploymentRecord.EmployType",
            "text": "内部员工, 实习生",
            "value": "0,2",
            "num": "13",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          },
          {
            "name": "TenantBase.EmploymentRecord.StdIsDeleted",
            "text": "是",
            "value": "1",
            "num": "14",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          },
          {
            "name": "TenantBase.EmploymentRecord.IsCurrentRecord",
            "text": "是",
            "value": "1",
            "num": "15",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          },
          {
            "name": "TenantBase.EmploymentRecord.ServiceType",
            "text": "主职",
            "value": "0",
            "num": "16",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          },
          {
            "name": "TenantBase.EmploymentRecord.ApprovalStatus",
            "text": "生效",
            "value": "4",
            "num": "17",
            "metaObjName": "",
            "metaFieldRelationIDPath": "",
            "queryAreaSubNodes": false
          }
        ],
        "searchFormFilterJson": null
      }
    });
  }

  // 发起单次请求
  async fetchPage(page) {
    return new Promise((resolve, reject) => {
      const options = this.createRequestOptions();
      const postData = this.createPostData(page);
      
      options.headers['Content-Length'] = Buffer.byteLength(postData);

      const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error(`解析JSON响应时出错: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`请求出错: ${error.message}`));
      });

      req.write(postData);
      req.end();
    });
  }

  // 从响应中获取分页信息
  getPagingInfo(responseData) {
    // 尝试从多个可能的位置获取分页信息
    let pagingInfo = null;
    
    // 方法1: 从 cmp_data.paging 获取
    if (responseData.cmp_data && responseData.cmp_data.paging) {
      pagingInfo = responseData.cmp_data.paging;
    }
    // 方法2: 从 cmp_data.table_data.paging 获取
    else if (responseData.cmp_data && responseData.cmp_data.table_data && responseData.cmp_data.table_data.paging) {
      pagingInfo = responseData.cmp_data.table_data.paging;
    }
    // 方法3: 如果没有找到分页信息，根据 biz_data 长度推断
    else if (responseData.biz_data && Array.isArray(responseData.biz_data)) {
      // 如果没有明确的分页信息，假设当前页就是所有数据
      pagingInfo = {
        total: responseData.biz_data.length,
        capacity: this.pageSize,
        page: 0
      };
    }
    
    return pagingInfo;
  }

  // 提取并汇总 biz_data
  extractBizData(responseData, pageNumber) {
    const bizDataList = [];
    
    // 检查根级别的 biz_data 数组
    if (responseData.biz_data && Array.isArray(responseData.biz_data)) {
      responseData.biz_data.forEach((item, index) => {
        // 添加页面和索引信息，便于追踪数据来源
        const bizDataWithMeta = {
          ...item,
          _meta: {
            page: pageNumber,
            index: index,
            extracted_at: new Date().toISOString(),
            cmp_id: responseData.cmp_id || 'unknown'
          }
        };
        bizDataList.push(bizDataWithMeta);
      });
    }
    
    return bizDataList;
  }

  // 延迟函数，避免请求过于频繁
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 获取所有 biz_data
  async fetchAllBizData() {
    console.log('开始获取所有 biz_data...');
    
    try {
      // 首先获取第一页数据，确定总记录数
      console.log(`正在获取第 ${this.currentPage + 1} 页数据...`);
      const firstPageData = await this.fetchPage(this.currentPage);
      
      console.log('第一页响应结构:', {
        cmp_id: firstPageData.cmp_id,
        cmp_type: firstPageData.cmp_type,
        has_cmp_data: !!firstPageData.cmp_data,
        has_biz_data: !!firstPageData.biz_data,
        biz_data_length: firstPageData.biz_data ? firstPageData.biz_data.length : 0
      });

      // 获取分页信息
      const pagingInfo = this.getPagingInfo(firstPageData);
      
      if (pagingInfo) {
        this.totalRecords = pagingInfo.total;
        this.pageSize = pagingInfo.capacity || this.pageSize;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        
        console.log(`总记录数: ${this.totalRecords}`);
        console.log(`每页记录数: ${this.pageSize}`);
        console.log(`总页数: ${this.totalPages}`);
      } else {
        // 如果没有分页信息，假设只有一页
        console.log('未找到分页信息，假设只有一页数据');
        this.totalRecords = firstPageData.biz_data ? firstPageData.biz_data.length : 0;
        this.totalPages = 1;
      }

      // 提取第一页的 biz_data
      const firstPageBizData = this.extractBizData(firstPageData, this.currentPage);
      if (firstPageBizData.length > 0) {
        this.allBizData.push(...firstPageBizData);
        console.log(`第 ${this.currentPage + 1} 页获取成功，提取到 ${firstPageBizData.length} 条 biz_data`);
      } else {
        console.log(`第 ${this.currentPage + 1} 页没有 biz_data`);
      }

      // 如果只有一页数据，直接返回
      if (this.totalPages <= 1) {
        console.log('只有一页数据，获取完成');
        return this.allBizData;
      }

      // 循环获取剩余页面数据
      for (let page = 1; page < this.totalPages; page++) {
        try {
          console.log(`正在获取第 ${page + 1} 页数据...`);
          
          // 添加延迟，避免请求过于频繁
          await this.delay(500);
          
          const pageData = await this.fetchPage(page);
          
          // 提取当前页的 biz_data
          const pageBizData = this.extractBizData(pageData, page);
          if (pageBizData.length > 0) {
            this.allBizData.push(...pageBizData);
            console.log(`第 ${page + 1} 页获取成功，提取到 ${pageBizData.length} 条 biz_data`);
          } else {
            console.log(`第 ${page + 1} 页没有 biz_data`);
          }

          // 显示进度
          const progress = ((page + 1) / this.totalPages * 100).toFixed(1);
          console.log(`进度: ${progress}% (${page + 1}/${this.totalPages})，累计获取 ${this.allBizData.length} 条 biz_data`);
          
        } catch (error) {
          console.error(`获取第 ${page + 1} 页数据时出错:`, error.message);
          // 继续处理下一页，不中断整个流程
        }
      }

      console.log(`biz_data 获取完成！总共获取到 ${this.allBizData.length} 条记录`);
      return this.allBizData;

    } catch (error) {
      console.error('获取 biz_data 时出错:', error.message);
      throw error;
    }
  }

  // 分析 biz_data 结构
  analyzeBizDataStructure() {
    if (this.allBizData.length === 0) {
      return null;
    }

    const sample = this.allBizData[0];
    const fields = Object.keys(sample).filter(key => key !== '_meta');
    
    const analysis = {
      total_records: this.allBizData.length,
      sample_fields: fields,
      field_analysis: {}
    };

    // 分析每个字段的数据类型和示例值
    fields.forEach(field => {
      const values = this.allBizData.map(item => item[field]).filter(v => v !== null && v !== undefined && v !== '');
      const uniqueValues = [...new Set(values)];
      
      analysis.field_analysis[field] = {
        type: typeof sample[field],
        has_data_count: values.length,
        unique_values_count: uniqueValues.length,
        sample_values: uniqueValues.slice(0, 5), // 只显示前5个示例值
        null_count: this.allBizData.length - values.length
      };
    });

    return analysis;
  }

  // 保存 biz_data 到文件
  async saveBizDataToFile(data, filename = null) {
    if (!filename) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      filename = `italent_biz_data_${timestamp}.json`;
    }
    
    const filepath = path.join(__dirname, filename);
    
    // 分析数据结构
    const analysis = this.analyzeBizDataStructure();
    
    const saveData = {
      metadata: {
        total_records: this.totalRecords,
        total_pages: this.totalPages,
        page_size: this.pageSize,
        biz_data_count: this.allBizData.length,
        fetch_time: new Date().toISOString(),
        data_analysis: analysis
      },
      biz_data: data
    };

    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, JSON.stringify(saveData, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`biz_data 已成功保存到文件: ${filename}`);
          console.log(`文件路径: ${filepath}`);
          console.log(`文件大小: ${(fs.statSync(filepath).size / 1024 / 1024).toFixed(2)} MB`);
          
          // 显示数据分析结果
          if (analysis) {
            console.log('\n=== biz_data 结构分析 ===');
            console.log(`总记录数: ${analysis.total_records}`);
            console.log(`字段数量: ${analysis.sample_fields.length}`);
            console.log('主要字段:', analysis.sample_fields.slice(0, 10).join(', '));
            if (analysis.sample_fields.length > 10) {
              console.log(`... 还有 ${analysis.sample_fields.length - 10} 个字段`);
            }
          }
          
          resolve(filepath);
        }
      });
    });
  }

  // 额外保存纯净的 biz_data（不包含 _meta 信息）
  async saveCleanBizData(filename = null) {
    if (!filename) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      filename = `italent_clean_biz_data_${timestamp}.json`;
    }
    
    // 移除 _meta 字段
    const cleanData = this.allBizData.map(item => {
      const { _meta, ...cleanItem } = item;
      return cleanItem;
    });
    
    const filepath = path.join(__dirname, filename);
    
    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, JSON.stringify(cleanData, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`纯净 biz_data 已保存到文件: ${filename}`);
          resolve(filepath);
        }
      });
    });
  }

  // 保存原始响应数据（用于调试）
  async saveRawResponse(responseData, page) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `raw_response_page_${page}_${timestamp}.json`;
    const filepath = path.join(__dirname, filename);
    
    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, JSON.stringify(responseData, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`原始响应数据已保存: ${filename}`);
          resolve(filepath);
        }
      });
    });
  }
}

// 主函数
async function main() {
  const fetcher = new ItalentDataFetcher();
  
  try {
    // 获取所有 biz_data
    const allBizData = await fetcher.fetchAllBizData();
    
    if (allBizData.length === 0) {
      console.log('警告: 没有获取到任何 biz_data，请检查API响应结构');
      // 保存第一页的原始响应用于调试
      const firstPageData = await fetcher.fetchPage(0);
      await fetcher.saveRawResponse(firstPageData, 0);
      return;
    }
    
    // 保存完整的 biz_data（包含元数据）
    await fetcher.saveBizDataToFile(allBizData);
    
    // 保存纯净的 biz_data（不包含元数据）
    await fetcher.saveCleanBizData();
    
    console.log('\n任务完成！');
    console.log(`成功获取并保存了 ${allBizData.length} 条 biz_data 记录`);
    
  } catch (error) {
    console.error('任务执行失败:', error.message);
    
    // 即使出错，也尝试保存已获取的数据
    if (fetcher.allBizData.length > 0) {
      console.log(`尝试保存已获取的 ${fetcher.allBizData.length} 条 biz_data...`);
      try {
        await fetcher.saveBizDataToFile(fetcher.allBizData, `italent_partial_biz_data_${Date.now()}.json`);
      } catch (saveError) {
        console.error('保存部分数据失败:', saveError.message);
      }
    }
  }
}

// 运行主函数
main();
