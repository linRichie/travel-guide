import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 照片数量趋势组合图组件
 * 展示各年度拍摄照片数量的柱状图+折线图组合
 */
const PhotoTrendChart = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const chartRef = useRef(null);

  // 数据检查
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-400">暂无数据</div>;
  }

  // 计算最大值（用于Y轴刻度）
  const maxValue = Math.max(...data.map(d => d.count));
  const yAxisMax = Math.ceil(maxValue / 50) * 50;

  // Y轴刻度
  const yAxisSteps = 5;
  const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) =>
    Math.round((yAxisMax / yAxisSteps) * (yAxisSteps - i))
  );

  // 累计总数
  const totalCount = data.reduce((sum, d) => sum + d.count, 0);

  // 图表尺寸配置
  const chartHeight = 224; // h-56 = 14rem = 224px
  const chartPaddingTop = 32; // pt-8 = 2rem = 32px
  const chartPaddingBottom = 48; // pb-0 + mt-3 = 48px
  const totalChartHeight = chartHeight + chartPaddingTop + chartPaddingBottom;

  // 生成折线路径
  const generateLinePath = () => {
    if (data.length === 0) return '';

    const barWidth = 100 / data.length;
    const points = data.map((item, index) => {
      const x = barWidth * index + barWidth / 2;
      const y = 100 - (item.count / yAxisMax) * 100;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  // 生成面积图路径
  const generateAreaPath = () => {
    if (data.length === 0) return '';

    const linePath = generateLinePath();
    return `${linePath} L 100,100 L 0,100 Z`;
  };

  const linePath = generateLinePath();
  const areaPath = generateAreaPath();

  return (
    <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
      {/* 标题区域 */}
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          照片数量趋势
        </h3>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          累计 <span className="text-xl font-bold text-purple-400">{totalCount}</span> 张
        </div>
      </div>

      {/* 图表容器 */}
      <div className="relative" ref={chartRef}>
        {/* Y轴刻度线 */}
        <div className={`absolute left-0 right-0 top-0 bottom-12 pointer-events-none z-10`}>
          {yAxisLabels.slice(0, -1).map((label, index) => (
            <div
              key={index}
              className={`w-full border-t border-dashed ${isDark ? 'border-white/5' : 'border-gray-200'}`}
              style={{
                top: `${(index / (yAxisLabels.length - 1)) * 100}%`,
              }}
            >
              <span className={`absolute -top-3 left-0 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* 柱状图+折线图区域 */}
        <div className="flex items-end justify-between h-56 pt-8 pb-0 px-4 gap-2 md:gap-4 relative">
          {/* 折线图叠加层（SVG） */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ paddingTop: '32px', paddingBottom: '48px' }}
          >
            <defs>
              {/* 紫色面积渐变 */}
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* 面积填充 */}
            <path
              d={areaPath}
              fill="url(#areaGradient)"
            />
            {/* 紫色折线 */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
            />
            {/* 数据点 */}
            {data.map((item, index) => {
              const barWidth = 100 / data.length;
              const x = barWidth * index + barWidth / 2;
              const y = 100 - (item.count / yAxisMax) * 100;
              const isHovered = hoveredIndex === index;

              return (
                <g key={item.year}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? '2' : '1.2'}
                    fill={isDark ? '#1f2937' : '#ffffff'}
                    stroke="#8b5cf6"
                    strokeWidth="0.8"
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* 柱状图 */}
          {data.map((item, index) => {
            const height = (item.count / yAxisMax) * 100;
            const isHovered = hoveredIndex === index;
            const isGrowth = index > 0 && item.count > data[index - 1].count;

            return (
              <div
                key={item.year}
                className="flex-1 flex flex-col items-center group cursor-pointer relative z-20"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 悬停提示 */}
                {isHovered && (
                  <div className={`absolute -top-16 left-1/2 -translate-x-1/2 ${isDark ? 'bg-gray-800 border-white/10' : 'bg-white border-gray-200'} border rounded-lg px-3 py-2 shadow-xl z-30 whitespace-nowrap`}>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.year}年</div>
                    <div className="text-lg font-bold text-purple-400">{item.count}</div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>张照片</div>
                    {/* 箭头 */}
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isDark ? 'bg-gray-800 border-r border-b border-white/10' : 'bg-white border-r border-b border-gray-200'}`}></div>
                  </div>
                )}

                {/* 柱子容器 */}
                <div className="relative w-full h-full flex items-end">
                  {/* 柱子 - 蓝色渐变 */}
                  <motion.div
                    className="w-full rounded-t-lg relative overflow-hidden"
                    initial={{ height: '0%' }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    whileHover={{ height: `${Math.min(height + 3, 100)}%` }}
                  >
                    {/* 蓝色渐变背景 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400"></div>
                    {/* 顶部光效 */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/30"></div>
                  </motion.div>

                  {/* 非悬停时显示的数值 */}
                  {!isHovered && (
                    <motion.span
                      className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium ${
                        isGrowth ? 'text-green-400' : (isDark ? 'text-gray-400' : 'text-gray-500')
                      }`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {item.count}
                    </motion.span>
                  )}
                </div>

                {/* X轴标签 */}
                <div className={`mt-3 text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部统计信息 */}
      <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`flex items-center justify-center gap-6 text-sm flex-wrap ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-600 to-cyan-400"></div>
            <span>照片数量</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-purple-500 rounded-full"></div>
            <div className={`w-2 h-2 rounded-full border-2 border-purple-500 ${isDark ? 'bg-gray-900' : 'bg-white'}`}></div>
            <span>趋势线</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>峰值: {maxValue}张 ({data.find(d => d.count === maxValue)?.year})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoTrendChart;
