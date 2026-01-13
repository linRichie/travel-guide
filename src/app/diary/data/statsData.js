/**
 * 旅行统计数据
 */

export const statsData = [
  {
    id: 1,
    icon: 'fa-globe-asia',
    value: '25+',
    label: '访问国家',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 2,
    icon: 'fa-camera',
    value: '1000+',
    label: '拍摄照片',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    icon: 'fa-map-marked-alt',
    value: '50+',
    label: '探索城市',
    color: 'from-green-500 to-emerald-600'
  }
];

// 旅行足迹数据（用于地图标记）
export const travelFootprint = [
  { country: '中国', cities: ['北京', '上海', '成都', '西安', '桂林'], lat: 35.8617, lng: 104.1954 },
  { country: '日本', cities: ['东京', '京都', '大阪'], lat: 36.2048, lng: 138.2529 },
  { country: '法国', cities: ['巴黎', '尼斯', '里昂'], lat: 46.2276, lng: 2.2137 },
  { country: '意大利', cities: ['罗马', '威尼斯', '佛罗伦萨'], lat: 41.8719, lng: 12.5674 },
  { country: '希腊', cities: ['雅典', '圣托里尼'], lat: 39.0742, lng: 21.8243 },
  { country: '冰岛', cities: ['雷克雅未克'], lat: 64.9631, lng: -19.0208 },
  { country: '瑞士', cities: ['苏黎世', '因特拉肯'], lat: 46.8182, lng: 8.2275 }
];

// 年度旅行数据
export const yearlyTrips = [
  { year: '2019', count: 3, countries: 2 },
  { year: '2020', count: 1, countries: 1 },
  { year: '2021', count: 2, countries: 2 },
  { year: '2022', count: 4, countries: 3 },
  { year: '2023', count: 5, countries: 4 },
  { year: '2024', count: 3, countries: 2 }
];

// 洲分布数据
export const continentData = [
  { continent: '亚洲', count: 12, color: '#8b5cf6' },
  { continent: '欧洲', count: 10, color: '#3b82f6' },
  { continent: '北美洲', count: 2, color: '#10b981' },
  { continent: '大洋洲', count: 1, color: '#f59e0b' }
];

// 照片数量趋势数据
export const photoTrendData = [
  { year: '2019', count: 120 },
  { year: '2020', count: 45 },
  { year: '2021', count: 89 },
  { year: '2022', count: 234 },
  { year: '2023', count: 312 },
  { year: '2024', count: 256 }
];
