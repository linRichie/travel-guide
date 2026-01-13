import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * 旅行日记模块布局组件
 * 包含内部导航栏，用于切换不同功能页面
 */
const DiaryLayout = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 导航配置
  const navItems = [
    { id: 'home', label: '首页', path: '/diary', icon: 'fa-home' },
    { id: 'about', label: '关于我', path: '/diary/about', icon: 'fa-user' },
    { id: 'gallery', label: '旅拍图集', path: '/diary/gallery', icon: 'fa-images' },
    { id: 'planner', label: '旅行规划', path: '/diary/planner', icon: 'fa-map-marked-alt' },
    { id: 'stats', label: '旅行统计', path: '/diary/stats', icon: 'fa-chart-bar' },
    { id: 'blog', label: '旅行博客', path: '/diary/blog', icon: 'fa-blog' }
  ];

  return (
    <div className={`flex flex-col flex-1 transition-colors duration-300 ${
      isDark ? 'bg-black' : 'bg-gray-50'
    }`}>
      {/* 内部导航栏 */}
      <nav className={`backdrop-blur-lg z-40 border-b sticky top-0 transition-colors duration-300 ${
        isDark
          ? 'bg-black/90 border-white/10'
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Logo */}
            <Link to="/diary" className="flex items-center mr-8">
              <span className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <span className="text-purple-500">旅行</span>日记
              </span>
            </Link>

            {/* 桌面端导航 */}
            <div className={`hidden md:flex rounded-full p-1 border flex-1 transition-colors duration-300 ${
              isDark
                ? 'bg-white/5 border-white/10'
                : 'bg-gray-100 border-gray-200'
            }`}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path ||
                  (item.path !== '/diary' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center font-medium text-sm ${
                      isActive
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                        : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <i className={`fas ${item.icon} mr-2`}></i>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* 移动端菜单按钮 */}
            <button className={`md:hidden ml-auto transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* 子路由出口 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DiaryLayout;
