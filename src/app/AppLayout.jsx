import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggleSimple } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

/**
 * 应用布局组件
 * 包含全局导航栏，用于切换不同模块
 */
const AppLayout = () => {
  const location = useLocation();
  const { theme } = useTheme();

  // 判断当前模块
  const isTravelModule = location.pathname.startsWith('/travel');
  const isDiaryModule = location.pathname.startsWith('/diary');
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* 顶部导航栏 - 模块切换 */}
      <nav className={`w-full backdrop-blur-lg z-50 border-b sticky top-0 transition-colors duration-300 ${
        isDark
          ? 'bg-black/90 border-white/10'
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/travel" className="flex items-center space-x-2 group">
              <span className={`text-2xl font-bold transition-colors group-hover:text-orange-400 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="text-orange-500">旅行</span>指南
              </span>
            </Link>

            {/* 右侧区域：模块导航 + 主题切换 */}
            <div className="flex items-center gap-4">
              {/* 模块导航 - 更明显的切换按钮 */}
              <div className={`flex items-center rounded-full p-1 border transition-colors duration-300 ${
                isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-gray-100 border-gray-200'
              }`}>
                <Link
                  to="/travel"
                  className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center font-medium ${
                    isTravelModule
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <i className="fas fa-map-marked-alt mr-2"></i>
                  旅游指南
                </Link>
                <Link
                  to="/diary"
                  className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center font-medium ${
                    isDiaryModule
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                      : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <i className="fas fa-book mr-2"></i>
                  旅行日记
                </Link>
              </div>

              {/* 主题切换按钮 */}
              <ThemeToggleSimple />
            </div>
          </div>
        </div>
      </nav>

      {/* 子路由出口 */}
      <Outlet />
    </div>
  );
};

export default AppLayout;
