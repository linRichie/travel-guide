import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { statsData, travelFootprint, yearlyTrips, continentData, photoTrendData } from '../data/statsData';
import WorldMap from '../components/WorldMap';

/**
 * 旅行统计页面
 * 展示旅行数据可视化，包括足迹地图、年度统计等
 */
const Stats = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`min-h-screen py-20 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          旅行<span className="text-purple-400">统计</span>
        </motion.h2>
        <motion.p
          className={`text-center mb-12 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          数据记录每一次探索
        </motion.p>

        {/* 核心数据卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <i className={`fas ${stat.icon} text-5xl mb-4 opacity-90`}></i>
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* 旅行足迹地图 */}
        <motion.div
          className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-8 mb-12 transition-colors duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-globe-asia mr-2 text-purple-400"></i>
            旅行足迹
          </h3>

          {/* 世界地图 */}
          <div className="mb-8">
            <WorldMap visitedCountries={travelFootprint} />
          </div>

          {/* 足迹列表 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {travelFootprint.map((country, index) => (
              <motion.div
                key={country.country}
                className={`${isDark ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-100 hover:bg-gray-200'} rounded-xl p-4 text-center transition-colors duration-300`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <div className="text-2xl mb-2">
                  {country.country === '中国' && '🇨🇳'}
                  {country.country === '日本' && '🇯🇵'}
                  {country.country === '法国' && '🇫🇷'}
                  {country.country === '意大利' && '🇮🇹'}
                  {country.country === '希腊' && '🇬🇷'}
                  {country.country === '冰岛' && '🇮🇸'}
                  {country.country === '瑞士' && '🇨🇭'}
                </div>
                <div className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{country.country}</div>
                <div className={`text-xs mt-1 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{country.cities.length} 城市</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 年度旅行统计 */}
        <motion.div
          className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-8 mb-12 transition-colors duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-chart-line mr-2 text-purple-400"></i>
            年度旅行记录
          </h3>
          <div className="flex items-end justify-between h-48 px-4">
            {yearlyTrips.map((trip, index) => (
              <motion.div
                key={trip.year}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className={`text-xs mb-2 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{trip.count}次</div>
                <div
                  className="w-8 md:w-12 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all hover:from-purple-500 hover:to-blue-400"
                  style={{ height: `${trip.count * 40 + 20}px` }}
                ></div>
                <div className={`text-xs mt-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{trip.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 洲分布统计 */}
        <motion.div
          className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-8 mb-12 transition-colors duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-pie-chart mr-2 text-purple-400"></i>
            洲分布统计
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {continentData.map((continent, index) => (
              <motion.div
                key={continent.continent}
                className={`relative ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} rounded-xl p-6 overflow-hidden transition-colors duration-300`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {/* 进度条背景 */}
                <div
                  className="absolute top-0 left-0 w-full opacity-20"
                  style={{
                    height: `${(continent.count / 12) * 100}%`,
                    backgroundColor: continent.color
                  }}
                ></div>
                {/* 内容 */}
                <div className="relative z-10">
                  <div className={`text-3xl font-bold mb-1 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{continent.count}</div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>{continent.continent}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 照片数量趋势 */}
        <motion.div
          className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-8 mb-12 transition-colors duration-300`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-camera mr-2 text-purple-400"></i>
            照片数量趋势
          </h3>
          {/* 折线图 */}
          <div className="relative h-64">
            {/* Y轴刻度 */}
            <div className={`absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              <span>350</span>
              <span>262</span>
              <span>175</span>
              <span>87</span>
              <span>0</span>
            </div>
            {/* 图表区域 */}
            <svg
              className="absolute left-12 right-0 top-0 bottom-8"
              viewBox="0 0 400 200"
              preserveAspectRatio="none"
            >
              {/* 网格线 */}
              {[...Array(5)].map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 50}
                  x2="400"
                  y2={i * 50}
                  stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                  strokeWidth="1"
                />
              ))}
              {/* 渐变填充 */}
              <defs>
                <linearGradient id="photoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                </linearGradient>
              </defs>
              {/* 填充区域 */}
              <path
                d={`M0,${200 - (photoTrendData[0].count / 350) * 200} ${
                  photoTrendData.map((d, i) => `L${(i / (photoTrendData.length - 1)) * 400},${200 - (d.count / 350) * 200}`).join(' ')
                } L400,200 L0,200 Z`}
                fill="url(#photoGradient)"
              />
              {/* 折线 */}
              <motion.path
                d={`M0,${200 - (photoTrendData[0].count / 350) * 200} ${
                  photoTrendData.map((d, i) => `L${(i / (photoTrendData.length - 1)) * 400},${200 - (d.count / 350) * 200}`).join(' ')
                }`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                strokeLinecap="round"
              />
              {/* 数据点 */}
              {photoTrendData.map((d, i) => (
                <g key={d.year}>
                  <motion.circle
                    cx={(i / (photoTrendData.length - 1)) * 400}
                    cy={200 - (d.count / 350) * 200}
                    r="4"
                    fill="#8b5cf6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  />
                  {/* 数值标签 */}
                  <motion.text
                    x={(i / (photoTrendData.length - 1)) * 400}
                    y={200 - (d.count / 350) * 200 - 10}
                    textAnchor="middle"
                    fill="#8b5cf6"
                    fontSize="10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    {d.count}
                  </motion.text>
                </g>
              ))}
            </svg>
            {/* X轴标签 */}
            <div className={`absolute left-12 right-0 bottom-0 flex justify-between text-xs transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              {photoTrendData.map(d => (
                <span key={d.year}>{d.year}</span>
              ))}
            </div>
          </div>
          {/* 总计 */}
          <div className="text-center mt-6">
            <span className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>累计拍摄 </span>
            <span className="text-2xl font-bold text-purple-400">
              {photoTrendData.reduce((acc, d) => acc + d.count, 0)}
            </span>
            <span className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}> 张照片</span>
          </div>
        </motion.div>

        {/* 已访问城市列表 */}
        <motion.div
          className={`mt-12 ${isDark ? 'bg-gray-900/30 border-white/5' : 'bg-gray-100 border-gray-200'} border rounded-2xl p-8 transition-colors duration-300`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-city mr-2 text-purple-400"></i>
            已访问城市 ({travelFootprint.reduce((acc, c) => acc + c.cities.length, 0)} 个)
          </h3>
          <div className="flex flex-wrap gap-2">
            {travelFootprint.map(country =>
              country.cities.map(city => (
                <span
                  key={`${country.country}-${city}`}
                  className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${isDark ? 'bg-gray-800/50 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'}`}
                >
                  {city}
                </span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
