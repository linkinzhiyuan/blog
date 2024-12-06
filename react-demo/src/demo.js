
// 模拟处理大量部门 月份数据情况，使用时间复杂为O(n)遍历出适合echart图表的数据
function generateTestData() {
  const departments = Array.from({ length: 20000 }, (_, i) => `部门${i + 1}`);
  const months = [];
  const data = [];
  
  // 生成16个月的数据，从2023年1月到2024年4月
  for (let year = 2023; year <= 2024; year++) {
    const monthEnd = 12;
    for (let month = year === 2023 ? 1 : 1; month <= monthEnd; month++) {
      months.push({
        year,
        month,
        quarter: Math.ceil(month / 3)
      });
    }
  }

  // 为每个部门生成每个月的数据
  departments.forEach(dept => {
    months.forEach(({ year, month, quarter }) => {
      // 生成随机值，范围在100到1000之间
      const value = Math.floor(Math.random() * 900) + 100;
      data.push({
        year,
        month: `${month}月`,
        quarter: `第${quarter}季度`,
        dept,
        value
      });
    });
  });

  return data;
}

// 生成测试数据
const testData = generateTestData();

// 数据转换函数
function transformData(data, groupByQuarter = false) {
  console.time('Transformation Time');
  const result = { keys: [], series: [] };
  const deptMap = {};
  const timeKeySet = new Set();

  data.forEach(item => {
    const timeKey = groupByQuarter 
      ? `${item.year}年${item.quarter}`
      : `${item.year}年${item.month}`;

    if (!timeKeySet.has(timeKey)) {
      timeKeySet.add(timeKey);
      result.keys.push(timeKey);
    }
    
    if (!deptMap[item.dept]) {
      deptMap[item.dept] = { 
        name: item.dept, 
        data: new Map()
      };
      result.series.push(deptMap[item.dept]);
    }
    
    if (groupByQuarter) {
      const currentValue = deptMap[item.dept].data.get(timeKey) || 0;
      deptMap[item.dept].data.set(timeKey, currentValue + item.value);
    } else {
      deptMap[item.dept].data.set(timeKey, item.value);
    }
  });

  result.series = result.series.map(series => ({
    name: series.name,
    data: result.keys.map(key => series.data.get(key) || 0)
  }));

  console.timeEnd('Transformation Time');
  return result;
}

// 测试数据统计
console.log('数据总量:', testData.length);
console.log('样例数据:', testData.slice(0, 3));

// 按月份转换
console.log('\n按月份转换:');
const monthlyResult = transformData(testData, false);
console.log('月份数量:', monthlyResult.keys.length);
console.log('部门数量:', monthlyResult.series.length);
console.log('第一个部门的前3个月数据:', {
  dept: monthlyResult.series[0].name,
  months: monthlyResult.keys.slice(0, 3),
  values: monthlyResult.series[0].data.slice(0, 3)
});
// console.log('所有数据:', monthlyResult)

// 按季度转换
console.log('\n按季度转换:');
const quarterlyResult = transformData(testData, true);
console.log('季度数量:', quarterlyResult.keys.length);
console.log('部门数量:', quarterlyResult.series.length);
console.log('第一个部门的季度数据:', {
  dept: quarterlyResult.series[0].name,
  quarters: quarterlyResult.keys,
  values: quarterlyResult.series[0].data
});
