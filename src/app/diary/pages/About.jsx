import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 关于我页面
 * 展示个人介绍、旅行理念、社交链接
 */
const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧：文字内容 */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={`leading-relaxed text-lg transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              你好！我是一名热爱旅行的摄影师和旅行者。在过去几年里，我走过了20多个国家，
              用镜头记录下了世界各地的美好瞬间。我相信旅行不仅是一种探索，更是一种生活态度。
            </p>
            <p className={`leading-relaxed text-lg transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              每一次旅行都是一次新的发现，每一次按下快门都是对美好瞬间的永恒定格。
              通过这个网站，我希望与大家分享我的旅行经历和摄影作品。
            </p>

            {/* 旅行理念 */}
            <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 transition-colors duration-300`}>
              <h3 className="text-xl font-semibold text-purple-400 mb-4">
                <i className="fas fa-heart mr-2"></i>旅行理念
              </h3>
              <ul className={`space-y-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-start">
                  <i className="fas fa-check text-purple-500 mr-3 mt-1"></i>
                  <span>慢旅行，深度体验当地文化</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-purple-500 mr-3 mt-1"></i>
                  <span>用镜头记录真实的世界</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-purple-500 mr-3 mt-1"></i>
                  <span>保护环境，负责任地旅行</span>
                </li>
              </ul>
            </div>

            {/* 社交链接 */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://x.com/Jone12suny"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 ${isDark ? 'bg-gray-900/50 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'} border rounded-full flex items-center justify-center hover:text-purple-400 hover:border-purple-500/50 transition-all transition-colors duration-300`}
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://github.com/linRichie"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 ${isDark ? 'bg-gray-900/50 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'} border rounded-full flex items-center justify-center hover:text-purple-400 hover:border-purple-500/50 transition-all transition-colors duration-300`}
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="#"
                className={`w-12 h-12 ${isDark ? 'bg-gray-900/50 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'} border rounded-full flex items-center justify-center hover:text-pink-400 hover:border-pink-500/50 transition-all transition-colors duration-300`}
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className={`w-12 h-12 ${isDark ? 'bg-gray-900/50 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'} border rounded-full flex items-center justify-center hover:text-red-400 hover:border-red-500/50 transition-all transition-colors duration-300`}
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </motion.div>

          {/* 右侧：照片 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <img
                src="https://picsum.photos/600/500"
                alt="个人照片"
                className="rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300 w-full"
              />
              {/* 装饰元素 */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl -z-10 opacity-50 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full -z-10 opacity-50 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
