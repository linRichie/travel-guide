import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 月份分布柱状图组件
 * 展示全年各月旅行次数
 */
const MonthBarChart = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 默认数据（12个月）
  const defaultData = [
    { month: '1月', value: 1 },
    { month: '2月', value: 2 },
    { month: '3月', value: 3 },
    { month: '4月', value: 2 },
    { month: '5月', value: 4 },
    { month: '6月', value: 3 },
    { month: '7月', value: 5 },
    { month: '8月', value: 4 },
    { month: '9月', value: 3 },
    { month: '10月', value: 4 },
    { month: '11月', value: 2 },
    { month: '12月', value: 3 }
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const maxValue = Math.max(...chartData.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue / 2) * 2 || 6;

  // 季节标识
  const seasons = [
    { start: 0, end: 2, name: '春', color: 'text-green-400' },
    { start: 3, end: 5, name: '夏', color: 'text-orange-400' },
    { start: 6, end: 8, name: '秋', color: 'text-amber-400' },
    { start: 9, end: 11, name: '冬', color: 'text-blue-400' }
  ];

  return (
    <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
      {/* 标题 */}
      <div className="mb-6">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          月份分布
        </h3>
      </div>

      {/* 图表 */}
      <div className="relative">
        {/* Y轴刻度线 */}
        <div className="absolute left-0 right-0 top-0 bottom-8 pointer-events-none">
          {Array.from({ length: yAxisMax + 1 }).map((_, index) => {
            const value = yAxisMax - index;
            if (value === 0) return null;
            return (
              <div
                key={index}
                className={`w-full border-t border-dashed ${isDark ? 'border-white/5' : 'border-gray-200'}`}
                style={{ top: `${(index / yAxisMax) * 100}%` }}
              >
                <span className={`absolute -top-2.5 left-0 text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        {/* 柱状图区域 */}
        <div className="flex items-end justify-between h-48 pt-6 pb-0 px-2 gap-1">
          {chartData.map((item, index) => {
            const height = (item.value / yAxisMax) * 100;
            const isHovered = hoveredIndex === index;
            const season = seasons.find(s => index >= s.start && index <= s.end);

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center group cursor-pointer relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 悬停提示 */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 ${isDark ? 'bg-gray-800 border-white/10' : 'bg-white border-gray-200'} border rounded-lg px-2 py-1.5 shadow-xl z-10 whitespace-nowrap`}
                  >
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.month}</div>
                    <div className="text-sm font-bold text-purple-400">{item.value}次</div>
                  </motion.div>
                )}

                {/* 柱子容器 */}
                <div className="relative w-full h-full flex items-end">
                  {/* 柱子 */}
                  <motion.div
                    className={`w-full rounded-t-md bg-gradient-to-t ${
                      item.value === maxValue
                        ? 'from-purple-600 to-purple-400'
                        : 'from-purple-500/60 to-purple-400/40'
                    } relative overflow-hidden`}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.6, delay: index * 0.03, ease: 'easeOut' }}
                    whileHover={{ height: `${Math.min(height + 5, 100)}%` }}
                  >
                    {/* 顶部光效 */}
                    {item.value > 0 && (
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/40"></div>
                    )}
                  </motion.div>

                  {/* 非悬停时显示数值 */}
                  {!isHovered && item.value > 0 && (
                    <motion.span
                      className={`absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-medium ${
                        item.value === maxValue ? 'text-purple-400' : (isDark ? 'text-gray-500' : 'text-gray-400')
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.03 }}
                    >
                      {item.value}
                    </motion.span>
                  )}
                </div>

                {/* X轴标签 */}
                <div className={`h-8 flex items-center justify-center text-xs font-medium ${
                  season ? season.color : (isDark ? 'text-gray-500' : 'text-gray-400')
                }`}>
                  {item.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 季节图例 */}
      <div className={`flex items-center justify-center gap-6 mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        {seasons.map(season => (
          <div key={season.name} className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <div className={`w-2 h-2 rounded-full ${season.color.replace('text', 'bg')}`}></div>
            <span>春</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthBarChart;
