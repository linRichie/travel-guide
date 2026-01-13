import React from 'react';
import { motion } from 'framer-motion';
import { statsData, travelFootprint, yearlyTrips, continentData } from '../data/statsData';

/**
 * 旅行统计页面
 * 展示旅行数据可视化，包括足迹地图、年度统计等
 */
const Stats = () => {
  return (
    <section className="min-h-screen py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          旅行<span className="text-purple-400">统计</span>
        </motion.h2>
        <motion.p
          className="text-center text-gray-400 mb-12"
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
          className="bg-gray-900/50 border border-white/10 rounded-2xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <i className="fas fa-globe-asia mr-2 text-purple-400"></i>
            旅行足迹
          </h3>
          {/* 足迹列表 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {travelFootprint.map((country, index) => (
              <motion.div
                key={country.country}
                className="bg-gray-800/50 rounded-xl p-4 text-center hover:bg-gray-800 transition-colors"
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
                <div className="text-white text-sm font-medium">{country.country}</div>
                <div className="text-gray-500 text-xs mt-1">{country.cities.length} 城市</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 年度旅行统计 */}
        <motion.div
          className="bg-gray-900/50 border border-white/10 rounded-2xl shadow-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
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
                <div className="text-xs text-gray-500 mb-2">{trip.count}次</div>
                <div
                  className="w-8 md:w-12 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all hover:from-purple-500 hover:to-blue-400"
                  style={{ height: `${trip.count * 40 + 20}px` }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">{trip.year}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 洲分布统计 */}
        <motion.div
          className="bg-gray-900/50 border border-white/10 rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <i className="fas fa-pie-chart mr-2 text-purple-400"></i>
            洲分布统计
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {continentData.map((continent, index) => (
              <motion.div
                key={continent.continent}
                className="relative bg-gray-800/50 rounded-xl p-6 overflow-hidden"
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
                  <div className="text-3xl font-bold text-white mb-1">{continent.count}</div>
                  <div className="text-gray-400">{continent.continent}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 已访问城市列表 */}
        <motion.div
          className="mt-12 bg-gray-900/30 border border-white/5 rounded-2xl p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">
            <i className="fas fa-city mr-2 text-purple-400"></i>
            已访问城市 ({travelFootprint.reduce((acc, c) => acc + c.cities.length, 0)} 个)
          </h3>
          <div className="flex flex-wrap gap-2">
            {travelFootprint.map(country =>
              country.cities.map(city => (
                <span
                  key={`${country.country}-${city}`}
                  className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm"
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
