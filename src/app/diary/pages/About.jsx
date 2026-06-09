import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 关于我页面
 * 展示项目介绍、旅行足迹、作者信息和社交链接
 */
const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 覆盖的省份列表
  const provinces = [
    { name: '四川', icon: 'fa-mountain', path: '/travel/sichuan' },
    { name: '成都', icon: 'fa-utensils', path: '/travel/chengdu' },
    { name: '广西', icon: 'fa-water', path: '/travel/guangxi' },
    { name: '青海', icon: 'fa-mountain', path: '/travel/qinghai' },
    { name: '江西', icon: 'fa-landmark', path: '/travel/jiangxi' },
    { name: '福建', icon: 'fa-map-marker-alt', path: '/travel/fujian' },
    { name: '甘肃', icon: 'fa-place-of-worship', path: '/travel/gansu' },
    { name: '陕西', icon: 'fa-monument', path: '/travel/shaanxi' },
    { name: '安徽', icon: 'fa-mountain', path: '/travel/anhui' },
    { name: '新疆', icon: 'fa-mountain', path: '/travel/xinjiang' },
    { name: '西藏', icon: 'fa-snowflake', path: '/travel/tibet' }
  ];

  // 旅行理念
  const philosophies = [
    { title: '深度探索', desc: '不只是打卡，而是真正理解每一片土地的故事', icon: 'fa-compass' },
    { title: '用镜头记录', desc: '用相机捕捉旅途中的每一个感动瞬间', icon: 'fa-camera' },
    { title: '持续分享', desc: '将旅行经验整理成攻略，帮助更多人上路', icon: 'fa-share-alt' }
  ];

  // 技术栈
  const techStack = [
    'React 19', 'Vite', 'React Router v7', 'TailwindCSS',
    'Framer Motion', 'ECharts', '高德地图'
  ];

  return (
    <motion.section
      className={`min-h-screen py-20 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          关于<span className="text-purple-400">我</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 左侧：文字内容 */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* 项目介绍 */}
            <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-colors duration-300`}>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                <i className="fas fa-globe mr-2"></i>这个项目
              </h3>
              <p className={`leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                这是一个专注于中国旅游的指南应用，涵盖 11 个省份和地区的详细旅行攻略。
                从四川的川西秘境到西藏的318国道，从成都的美食文化到新疆的丝路风情，
                每一份攻略都经过精心整理。
              </p>
              <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                除了旅游指南，项目还包含旅行日记模块，记录旅途中的点点滴滴，
                包括旅拍图集、旅行博客、规划库和数据分析等功能。
              </p>
            </div>

            {/* 旅行理念 */}
            <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-colors duration-300`}>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                <i className="fas fa-heart mr-2"></i>旅行理念
              </h3>
              <div className="space-y-4">
                {philosophies.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-10 h-10 ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                      <i className={`fas ${item.icon} text-purple-400`}></i>
                    </div>
                    <div>
                      <h4 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 技术栈 */}
            <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-colors duration-300`}>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                <i className="fas fa-code mr-2"></i>技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 社交链接 */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://github.com/linRichie"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 ${isDark ? 'bg-gray-900/50 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'} border rounded-full flex items-center justify-center hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300`}
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="#"
                className={`w-12 h-12 ${isDark ? 'bg-gray-900/50 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'} border rounded-full flex items-center justify-center hover:text-pink-400 hover:border-pink-500/50 transition-all duration-300`}
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className={`w-12 h-12 ${isDark ? 'bg-gray-900/50 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'} border rounded-full flex items-center justify-center hover:text-red-400 hover:border-red-500/50 transition-all duration-300`}
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </motion.div>

          {/* 右侧：旅行足迹 */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* 省份卡片 */}
            <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-colors duration-300`}>
              <h3 className="text-xl font-semibold text-purple-400 mb-6">
                <i className="fas fa-map-marked-alt mr-2"></i>已覆盖地区
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {provinces.map((province, index) => (
                  <Link
                    key={index}
                    to={province.path}
                    className={`p-3 rounded-lg text-center transition-all duration-300 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10'
                        : 'bg-gray-50 hover:bg-gray-100 hover:shadow-lg hover:shadow-purple-500/10'
                    }`}
                  >
                    <i className={`fas ${province.icon} text-purple-400 mb-2`}></i>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{province.name}</p>
                  </Link>
                ))}
              </div>
              <p className={`text-center mt-4 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                共覆盖 11 个省份和地区
              </p>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center transition-colors duration-300`}>
                <div className="text-4xl font-bold text-purple-400 mb-2">11</div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>覆盖省份</p>
              </div>
              <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center transition-colors duration-300`}>
                <div className="text-4xl font-bold text-purple-400 mb-2">2</div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>核心模块</p>
              </div>
              <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center transition-colors duration-300`}>
                <div className="text-4xl font-bold text-purple-400 mb-2">7</div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>日记功能</p>
              </div>
              <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center transition-colors duration-300`}>
                <div className="text-4xl font-bold text-purple-400 mb-2">3</div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>图表库</p>
              </div>
            </div>

            {/* 作者信息 */}
            <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-colors duration-300`}>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                <i className="fas fa-user mr-2"></i>关于作者
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-white">R</span>
                </div>
                <div>
                  <h4 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Wang L. Richie</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>旅行爱好者 / 开发者</p>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                热爱旅行、摄影和编程。希望通过技术让旅行规划变得更简单有趣。
              </p>
            </div>

            {/* 快速链接 */}
            <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-colors duration-300`}>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                <i className="fas fa-link mr-2"></i>快速链接
              </h3>
              <div className="space-y-2">
                <Link
                  to="/travel"
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                    isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <i className="fas fa-map-marked-alt text-orange-500 mr-3"></i>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>探索中国</span>
                </Link>
                <Link
                  to="/diary/plans"
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                    isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <i className="fas fa-suitcase text-purple-500 mr-3"></i>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>旅行中心</span>
                </Link>
                <Link
                  to="/diary/gallery"
                  className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                    isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <i className="fas fa-images text-blue-500 mr-3"></i>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>旅拍图集</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;