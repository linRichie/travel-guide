import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * 应用布局组件
 * 包含全局导航栏，用于切换不同模块
 */
const AppLayout = () => {
  const location = useLocation();

  // 判断当前模块
  const isTravelModule = location.pathname.startsWith('/travel');
  const isDiaryModule = location.pathname.startsWith('/diary');

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 顶部导航栏 - 模块切换 */}
      <nav className="w-full bg-black/90 backdrop-blur-lg z-50 border-b border-white/10 sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/travel" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                <span className="text-orange-500">旅行</span>指南
              </span>
            </Link>

            {/* 模块导航 - 更明显的切换按钮 */}
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
              <Link
                to="/travel"
                className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center font-medium ${
                  isTravelModule
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-gray-400 hover:text-white'
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
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className="fas fa-book mr-2"></i>
                旅行日记
              </Link>
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
