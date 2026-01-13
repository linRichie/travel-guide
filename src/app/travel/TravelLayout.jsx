import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * 旅游模块布局组件
 * 包含省份导航和子路由出口
 */
const TravelLayout = () => {
  const location = useLocation();
  const isTravelHome = location.pathname === '/travel' || location.pathname === '/travel/';

  // 省份导航配置
  const provinces = [
    { name: '首页', path: '/travel', icon: 'fa-home' },
    { name: '广西', path: '/travel/guangxi', icon: 'fa-water' },
    { name: '成都', path: '/travel/chengdu', icon: 'fa-coffee' },
    { name: '青海', path: '/travel/qinghai', icon: 'fa-mountain' },
    { name: '江西', path: '/travel/jiangxi', icon: 'fa-landmark' },
    { name: '福建', path: '/travel/fujian', icon: 'fa-map-marker-alt' },
    { name: '甘肃', path: '/travel/gansu', icon: 'fa-place-of-worship' },
    { name: '陕西', path: '/travel/shaanxi', icon: 'fa-monument' },
    { name: '安徽', path: '/travel/anhui', icon: 'fa-mountain' },
    { name: '新疆', path: '/travel/xinjiang', icon: 'fa-mountain' },
    { name: '西藏', path: '/travel/tibet', icon: 'fa-snowflake' },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* 省份导航 */}
      <nav className="w-full bg-black/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto py-3 scrollbar-hide">
            {provinces.map((province) => (
              <Link
                key={province.path}
                to={province.path}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 flex items-center ${
                  location.pathname === province.path ||
                  (province.path !== '/travel' && location.pathname.startsWith(province.path))
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`fas ${province.icon} mr-2 text-sm`}></i>
                {province.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* 内容区域 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default TravelLayout;
