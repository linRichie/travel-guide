import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

/**
 * 旅行日记模块布局组件
 */
const DiaryLayout = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* 页面标题 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center">
            <i className="fas fa-book mr-3"></i>
            旅行日记
          </h1>
          <p className="text-lg mt-2 opacity-90">记录每一段旅程，分享每一份感动</p>
        </div>
      </div>

      {/* 内容区域 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DiaryLayout;
