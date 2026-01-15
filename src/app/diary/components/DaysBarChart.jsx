import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 旅行天数分布柱状图组件
 * 展示不同天数范围的旅行次数
 */
const DaysBarChart = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 默认数据
  const chartData = data.length > 0 ? data : [
    { name: '1-3天', value: 4, icon: '⚡', desc: '短途游' },
    { name: '4-7天', value: 8, icon: '🌟', desc: '周边游' },
    { name: '8-14天', value: 6, icon: '✈️', desc: '长途游' },
    { name: '15天以上', value: 2, icon: '🌍', desc: '深度游' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue / 2) * 2 || 10;

  // 紫色系渐变
  const barGradients = [
    'from-purple-500 to-indigo-500',
    'from-indigo-500 to-blue-500',
    'from-blue-500 to-cyan-500',
    'from-cyan-500 to-teal-500'
  ];

  return (
    <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
      {/* 标题 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          旅行天数分布
        </h3>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          最常见: <span className="font-bold text-purple-400">
            {chartData.find(d => d.value === maxValue)?.name || '-'}
          </span>
        </div>
      </div>

      {/* 图表 */}
      <div className="relative">
        {/* Y轴刻度线 */}
        <div className="absolute left-0 right-0 top-0 bottom-16 pointer-events-none">
          {Array.from({ length: Math.min(yAxisMax, 5) + 1 }).map((_, index) => {
            const value = Math.round((yAxisMax / 5) * (5 - index));
            if (value === 0 && index < 5) return null;
            const topPos = (index / 5) * 100;
            return (
              <div
                key={index}
                className={`w-full border-t border-dashed ${isDark ? 'border-white/5' : 'border-gray-200'}`}
                style={{ top: `${topPos}%` }}
              >
                <span className={`absolute -top-2.5 left-0 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        {/* 柱状图区域 */}
        <div className="flex items-end justify-between h-40 pt-8 pb-0 px-4 gap-4 md:gap-8">
          {chartData.map((item, index) => {
            const height = Math.min((item.value / yAxisMax) * 85, 100); // 留出顶部空间
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.name}
                className="flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 悬停提示 */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`absolute -top-14 left-1/2 -translate-x-1/2 ${isDark ? 'bg-gray-800 border-white/10' : 'bg-white border-gray-200'} border rounded-xl px-3 py-2 shadow-xl z-10 whitespace-nowrap`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <span>{item.icon}</span>}
                      <div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.name}</div>
                        <div className="text-lg font-bold text-purple-400">{item.value}次</div>
                      </div>
                    </div>
                    {/* 箭头 */}
                    <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${isDark ? 'bg-gray-800 border-r border-b border-white/10' : 'bg-white border-r border-b border-gray-200'}`}></div>
                  </motion.div>
                )}

                {/* 柱子容器 */}
                <div className="relative w-full h-48 flex items-end">
                  {/* 柱子 */}
                  <motion.div
                    className={`w-full rounded-t-xl bg-gradient-to-t ${barGradients[index % barGradients.length]} relative overflow-hidden`}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    whileHover={{ height: `${Math.min(height + 5, 100)}%` }}
                  >
                    {/* 顶部光效 */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/30"></div>
                    {/* 内部渐变装饰 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                  </motion.div>

                  {/* 非悬停时显示数值 */}
                  {!isHovered && item.value > 0 && (
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className={`text-lg font-bold ${
                        item.value === maxValue ? 'text-purple-400' : (isDark ? 'text-gray-400' : 'text-gray-500')
                      }`}>
                        {item.value}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>次</span>
                    </motion.div>
                  )}
                </div>

                {/* X轴标签 */}
                <div className="mt-3 flex flex-col items-center">
                  {item.icon && <span className="text-xl mb-1">{item.icon}</span>}
                  <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.name}</div>
                  <div className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部统计 */}
      <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`flex items-center justify-center gap-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <span>总计 {chartData.reduce((sum, d) => sum + d.value, 0)} 次旅行</span>
          <span>·</span>
          <span>平均 {Math.round(chartData.reduce((sum, d) => {
            const avgDays = d.name.includes('1-3') ? 2 : d.name.includes('4-7') ? 5.5 : d.name.includes('8-14') ? 11 : 15;
            return sum + avgDays * d.value;
          }, 0) / chartData.reduce((sum, d) => sum + d.value, 0))} 天/次</span>
        </div>
      </div>
    </div>
  );
};

export default DaysBarChart;
