import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 目的地分布横向柱状图组件
 * 使用 CSS 动画实现平滑效果
 */
const DestinationBarChart = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 默认数据
  const chartData = data.length > 0 ? data : [
    { name: '中国', value: 8, flag: '🇨🇳' },
    { name: '日本', value: 4, flag: '🇯🇵' },
    { name: '法国', value: 3, flag: '🇫🇷' },
    { name: '意大利', value: 2, flag: '🇮🇹' },
    { name: '泰国', value: 2, flag: '🇹🇭' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  // 紫色渐变色数组
  const barColors = [
    'from-purple-500 to-purple-400',
    'from-indigo-500 to-indigo-400',
    'from-blue-500 to-blue-400',
    'from-cyan-500 to-cyan-400',
    'from-teal-500 to-teal-400'
  ];

  return (
    <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
      {/* 标题 */}
      <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        目的地分布
      </h3>

      {/* 图表 */}
      <div className="space-y-4">
        {chartData.map((item, index) => {
          const width = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={item.name}
              className={`relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
              } ${isHovered ? (isDark ? 'bg-white/10' : 'bg-gray-100') : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              {/* 排名 */}
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                index < 3 ? 'bg-purple-500/20 text-purple-400' : (isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500')
              }`}>
                {index + 1}
              </span>

              {/* 目的地名称 */}
              <div className="w-20 flex items-center gap-2">
                {item.flag && <span className="text-lg">{item.flag}</span>}
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
              </div>

              {/* 柱状图容器 */}
              <div className="flex-1 h-8 relative">
                {/* 背景槽 */}
                <div className={`absolute inset-0 rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  {/* 进度条 */}
                  <motion.div
                    className={`h-full bg-gradient-to-r ${barColors[index % barColors.length]} rounded-lg relative overflow-hidden`}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
                  >
                    {/* 光效动画 */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* 数值 */}
              <motion.span
                className="w-12 text-right text-sm font-bold text-purple-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.08 }}
              >
                {item.value}次
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* 底部统计 */}
      <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`flex items-center justify-center gap-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <span>总计 {chartData.reduce((sum, d) => sum + d.value, 0)} 次旅行</span>
          <span>·</span>
          <span>覆盖 {chartData.length} 个目的地</span>
        </div>
      </div>
    </div>
  );
};

export default DestinationBarChart;
