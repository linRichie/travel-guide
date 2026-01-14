import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 旅行日记首页
 * Hero banner + 导航卡片
 */
const DiaryHome = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navCards = [
    {
      id: 'about',
      title: '关于我',
      description: '了解我的旅行故事',
      icon: 'fa-user',
      color: 'from-purple-500 to-indigo-600',
      to: '/diary/about'
    },
    {
      id: 'gallery',
      title: '旅拍图集',
      description: `精选旅行摄影作品`,
      icon: 'fa-images',
      color: 'from-blue-500 to-cyan-600',
      to: '/diary/gallery'
    },
    {
      id: 'planner',
      title: '旅行规划',
      description: 'AI 智能生成行程',
      icon: 'fa-map-marked-alt',
      color: 'from-green-500 to-emerald-600',
      to: '/diary/planner'
    },
    {
      id: 'plans',
      title: '旅行规划库',
      description: '查看和管理计划',
      icon: 'fa-suitcase',
      color: 'from-cyan-500 to-blue-600',
      to: '/diary/plans'
    },
    {
      id: 'stats',
      title: '旅行统计',
      description: '数据可视化展示',
      icon: 'fa-chart-bar',
      color: 'from-orange-500 to-red-600',
      to: '/diary/stats'
    },
    {
      id: 'blog',
      title: '旅行博客',
      description: '旅途故事与感悟',
      icon: 'fa-blog',
      color: 'from-pink-500 to-rose-600',
      to: '/diary/blog'
    },
    {
      id: 'search',
      title: '全文搜索',
      description: '搜索博客和图片',
      icon: 'fa-search',
      color: 'from-violet-500 to-purple-600',
      to: '/diary/search'
    },
    {
      id: 'photos',
      title: '图片管理',
      description: '上传和管理照片',
      icon: 'fa-camera',
      color: 'from-teal-500 to-emerald-600',
      to: '/diary/photos'
    }
  ];

  return (
    <section className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* 背景图片 */}
        <img
          src="https://picsum.photos/1920/1080"
          alt="旅行封面"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero 内容 */}
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            探索<span className="text-purple-400">世界</span>的脚步
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-12 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            记录每一段旅程，分享每一份感动
          </motion.p>

          {/* 导航卡片 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {navCards.map((card, index) => (
              <Link key={card.id} to={card.to}>
                <motion.div
                  className={`backdrop-blur-sm border rounded-xl p-6 transition-all hover:scale-105 hover:shadow-xl ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:shadow-purple-500/20'
                      : 'bg-white/80 border-gray-200 hover:bg-white hover:shadow-purple-500/30'
                  }`}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <i className={`fas ${card.icon} text-white`}></i>
                  </div>
                  <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{card.description}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* 滚动提示 */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="animate-bounce text-white/50">
            <i className="fas fa-chevron-down text-2xl"></i>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiaryHome;
