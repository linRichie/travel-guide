import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * 旅行日记模块布局组件
 * 与旅游指南保持一致的暗色风格
 */
const DiaryLayout = () => {
  return (
    <div className="flex flex-col flex-1 bg-black">
      {/* 内容区域 */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DiaryLayout;
