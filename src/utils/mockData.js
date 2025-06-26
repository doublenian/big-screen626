// 模拟数据
export const mockData = {
  // 租赁统计数据
  rentalStats: {
    yearlyIncome: 19873235.08,
    occupancyRate: 87.85,
    averageRent: 5400
  },
  
  // 各门店出租率
  storeRates: [
    { name: '安家01', rate: 30, color: '#00ff88' },
    { name: '安家02', rate: 90, color: '#4dc9ff' },
    { name: '安家03', rate: 15, color: '#1a73e8' },
    { name: '安家04', rate: 9, color: '#0d47a1' }
  ],
  
  // 顶部数据卡片
  topCards: [
    { title: '租客合计', value: 739135, icon: 'user' },
    { title: '在建在管项目', value: 29, icon: 'building' },
    { title: '在建在管房间', value: 36418, icon: 'room' }
  ],
  
  // 第二行数据卡片
  bottomCards: [
    { title: '物业合计(亿)', value: 345, icon: 'property' },
    { title: '在房项目', value: 18, icon: 'project' },
    { title: '在建房间', value: 13103, icon: 'construction' }
  ],
  
  // 年龄分布数据
  ageDistribution: [
    { age: '18-25', male: 80, female: 75 },
    { age: '26-35', male: 120, female: 110 },
    { age: '36-45', male: 95, female: 85 },
    { age: '46-55', male: 60, female: 65 },
    { age: '55+', male: 30, female: 35 }
  ],
  
  // 学历分布数据
  educationData: [
    { level: '高中', count: 45 },
    { level: '专科', count: 85 },
    { level: '本科', count: 120 },
    { level: '硕士', count: 65 },
    { level: '博士', count: 15 }
  ],
  
  // 类型分布
  typeDistribution: [
    { name: '青年公寓', value: 45 },
    { name: '家庭公寓', value: 35 },
    { name: '商务公寓', value: 20 }
  ],
  
  // 性别比例
  genderRatio: {
    male: 55,
    female: 45
  }
};

// 数字格式化函数
export const formatNumber = (num) => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿';
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
};

// 获取当前时间
export const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekday = weekdays[now.getDay()];
  
  return `${year}-${month}-${day} ${weekday} ${hours}:${minutes}:${seconds}`;
}; 