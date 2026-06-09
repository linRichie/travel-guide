import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 预算分布环形图组件
 * 使用 SVG + framer-motion 实现动画效果
 */
const BudgetPieChart = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 默认数据
  const chartData = data.length > 0 ? data : [
    { name: '经济型', value: 25, color: '#22c55e' },
    { name: '舒适型', value: 45, color: '#8b5cf6' },
    { name: '豪华型', value: 30, color: '#f59e0b' }
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const radius = 80;
  const innerRadius = 55;
  const circumference = 2 * Math.PI * radius;

  // 计算每个扇形的路径
  const calculatePath = (startPercent, endPercent) => {
    const startAngle = (startPercent / 100) * 360 - 90;
    const endAngle = (endPercent / 100) * 360 - 90;

    const start = polarToCartesian(0, 0, radius, endAngle);
    const end = polarToCartesian(0, 0, radius, startAngle);
    const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  let currentPercent = 0;

  return (
    <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
      {/* 标题 */}
      <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        预算分布
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* 环形图 */}
        <div className="relative">
          <svg width="200" height="200" viewBox="-100 -100 200 200" className="transform -rotate-90">
            {chartData.map((item, index) => {
              const startPercent = currentPercent;
              const endPercent = currentPercent + (item.value / total) * 100;
              currentPercent = endPercent;

              const isHovered = hoveredIndex === index;
              const scale = isHovered ? 1.05 : 1;

              return (
                <g key={item.name}>
                  {/* 扇形 */}
                  <motion.path
                    d={calculatePath(startPercent, endPercent)}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="40"
                    strokeLinecap="butt"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      scale
                    }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    style={{ transformOrigin: 'center' }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  />
                  {/* 悬停时显示的连接线 */}
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pointer-events-none"
                    >
                      <circle
                        r={radius + 25}
                        fill="none"
                        stroke={item.color}
                        strokeWidth="1"
                        strokeOpacity="0.3"
                      />
                    </motion.g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* 中心文字 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{total}</span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>总计划</span>
          </div>
        </div>

        {/* 图例 */}
        <div className="flex flex-col gap-3">
          {chartData.map((item, index) => {
            const percent = ((item.value / total) * 100).toFixed(0);
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={item.name}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                  isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'
                } ${isHovered ? (isDark ? 'bg-white/10' : 'bg-gray-200') : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {/* 颜色点 */}
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                {/* 标签 */}
                <span className={`min-w-[3rem] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                {/* 进度条 */}
                <div className={`w-20 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                {/* 百分比 */}
                <span className="text-sm font-bold text-purple-400 min-w-[3rem] text-right">{percent}%</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetPieChart;
