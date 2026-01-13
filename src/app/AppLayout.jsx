import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * 应用布局组件
 * 包含全局导航栏，用于切换不同模块
 */
const AppLayout = () => {
  const location = useLocation();

  // 判断当前在哪个模块
  const isInModule = location.pathname.startsWith('/travel') || location.pathname.startsWith('/diary');

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 顶部导航栏 - 模块切换 */}
      <nav className="w-full bg-black/80 backdrop-blur-lg z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">
                <span className="text-orange-500">旅行</span>指南
              </span>
            </Link>

            {/* 模块导航 */}
            <div className="flex space-x-1">
              <Link
                to="/travel"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname.startsWith('/travel')
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className="fas fa-map-marked-alt mr-2"></i>
                旅游指南
              </Link>
              <Link
                to="/diary"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname.startsWith('/diary')
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
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
