import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 旅行规划统计图表组件
 * 展示目的地分布、月份分布、预算占比等统计数据
 */
const PlanCharts = ({ plans }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 图表颜色方案
  const colors = {
    purple: '#a855f7',
    indigo: '#6366f1',
    blue: '#3b82f6',
    green: '#22c55e',
    amber: '#f59e0b',
    pink: '#ec4899',
    cyan: '#06b6d4'
  };

  const barColors = [colors.purple, colors.indigo, colors.blue, colors.green, colors.amber];
  const pieColors = [colors.purple, colors.green, colors.amber];

  // 处理数据：目的地分布
  const getDestinationData = () => {
    const destinationCount = {};
    plans.forEach(plan => {
      const dest = plan.destination || '未指定';
      destinationCount[dest] = (destinationCount[dest] || 0) + 1;
    });

    return Object.entries(destinationCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // 只显示前8个
  };

  // 处理数据：月份分布
  const getMonthData = () => {
    const monthCount = {};
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

    plans.forEach(plan => {
      if (plan.startDate) {
        const month = new Date(plan.startDate).getMonth();
        const monthName = monthNames[month];
        monthCount[monthName] = (monthCount[monthName] || 0) + 1;
      }
    });

    return monthNames.map(month => ({
      name: month,
      value: monthCount[month] || 0
    }));
  };

  // 处理数据：预算分布
  const getBudgetData = () => {
    const budgetLabels = {
      economy: '经济型',
      comfortable: '舒适型',
      luxury: '豪华型'
    };

    const budgetCount = { economy: 0, comfortable: 0, luxury: 0 };
    plans.forEach(plan => {
      if (plan.budget && budgetCount.hasOwnProperty(plan.budget)) {
        budgetCount[plan.budget]++;
      }
    });

    return Object.entries(budgetCount).map(([key, value]) => ({
      name: budgetLabels[key],
      value
    }));
  };

  // 处理数据：旅行天数分布
  const getDaysData = () => {
    const daysRanges = {
      '1-3天': 0,
      '4-7天': 0,
      '8-14天': 0,
      '15天以上': 0
    };

    plans.forEach(plan => {
      const days = plan.days || 0;
      if (days <= 3) daysRanges['1-3天']++;
      else if (days <= 7) daysRanges['4-7天']++;
      else if (days <= 14) daysRanges['8-14天']++;
      else daysRanges['15天以上']++;
    });

    return Object.entries(daysRanges).map(([name, value]) => ({ name, value }));
  };

  // 统计摘要
  const getSummary = () => {
    if (plans.length === 0) return null;

    const destinations = getDestinationData();
    const months = getMonthData();
    const peakMonth = months.reduce((max, m) => m.value > max.value ? m : max, { name: '-', value: 0 });

    const totalDays = plans.reduce((sum, p) => sum + (p.days || 0), 0);
    const avgDays = Math.round(totalDays / plans.length);

    return {
      totalPlans: plans.length,
      topDestination: destinations[0]?.name || '-',
      peakMonth: peakMonth.name,
      avgDays
    };
  };

  const destinationData = getDestinationData();
  const monthData = getMonthData();
  const budgetData = getBudgetData();
  const daysData = getDaysData();
  const summary = getSummary();

  // 自定义 Tooltip 样式
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`backdrop-blur-lg ${isDark ? 'bg-gray-900/90 border border-white/10' : 'bg-white border border-gray-200'} rounded-lg px-3 py-2 shadow-lg`}>
          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</p>
          <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            数量: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // 没有数据时的空状态
  if (plans.length === 0) {
    return (
      <div className={`text-center py-12 ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'} border rounded-2xl`}>
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>添加旅行计划后查看统计图表</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 统计摘要卡片 */}
      {summary && (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
          <div className="text-center">
            <p className={`text-3xl font-bold text-purple-400`}>{summary.totalPlans}</p>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>总计划数</p>
          </div>
          <div className="text-center">
            <p className={`text-3xl font-bold text-blue-400`}>{summary.topDestination}</p>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>热门目的地</p>
          </div>
          <div className="text-center">
            <p className={`text-3xl font-bold text-green-400`}>{summary.peakMonth}</p>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>出行高峰月</p>
          </div>
          <div className="text-center">
            <p className={`text-3xl font-bold text-amber-400`}>{summary.avgDays}</p>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>平均天数</p>
          </div>
        </div>
      )}

      {/* 图表网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 目的地分布 - 横向柱状图 */}
        <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📍 目的地分布
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={destinationData} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <XAxis type="number" stroke={isDark ? '#666' : '#999'} />
              <YAxis dataKey="name" type="category" width={50} stroke={isDark ? '#666' : '#999'} fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {destinationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 预算分布 - 饼图 */}
        <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            💰 预算分布
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 月份分布 - 柱状图 */}
        <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6 md:col-span-2`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📅 月份分布
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} vertical={false} />
              <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={11} />
              <YAxis stroke={isDark ? '#666' : '#999'} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={colors.purple} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 天数分布 - 柱状图 */}
        <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6 md:col-span-2`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🕐 旅行天数分布
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={daysData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} vertical={false} />
              <XAxis dataKey="name" stroke={isDark ? '#666' : '#999'} fontSize={12} />
              <YAxis stroke={isDark ? '#666' : '#999'} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={colors.indigo} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlanCharts;
