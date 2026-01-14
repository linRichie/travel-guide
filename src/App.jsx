import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 布局组件
import AppLayout from './app/AppLayout';
import TravelLayout from './app/travel/TravelLayout';
import DiaryLayout from './app/diary/DiaryLayout';

// 旅游模块页面
import TravelHomePage from './app/travel/pages/TravelHomePage';
import GuangxiTravel from './app/travel/pages/Guangxi';
import ChengduTravel from './app/travel/pages/Chengdu';
import QinghaiTravel from './app/travel/pages/Qinghai';
import JiangxiTravel from './app/travel/pages/Jiangxi';
import FujianTravel from './app/travel/pages/Fujian';
import GansuTravel from './app/travel/pages/Gansu';
import ShaanxiTravel from './app/travel/pages/Shaanxi';
import AnhuiTravel from './app/travel/pages/Anhui';
import XinjiangTravel from './app/travel/pages/Xinjiang';
import TibetTravel from './app/travel/pages/Tibet';
import SichuanTravel from './app/travel/pages/Sichuan';

// 日记模块页面
import DiaryHome from './app/diary/pages/DiaryHome';
import About from './app/diary/pages/About';
import Gallery from './app/diary/pages/Gallery';
import Planner from './app/diary/pages/Planner';
import Stats from './app/diary/pages/Stats';
import BlogList from './app/diary/pages/BlogList';
import BlogPost from './app/diary/pages/BlogPost';
import SearchResults from './app/diary/pages/SearchResults';
import PhotoManager from './app/diary/pages/PhotoManager';

/**
 * 主应用组件 - 路由配置
 * 实现了 app 目录结构，包含两个主要模块：
 * - /travel: 旅游指南模块（探索中国 + 各省份）
 * - /diary: 旅行日记模块（首页、关于、图集、规划、统计、博客）
 */
function App() {
  return (
    <Routes>
      {/* 根路径重定向到旅游模块 */}
      <Route path="/" element={<Navigate to="/travel" replace />} />

      {/* 应用布局 */}
      <Route path="/" element={<AppLayout />}>
        {/* 旅游模块 */}
        <Route path="travel/*" element={<TravelLayout />}>
          <Route index element={<TravelHomePage />} />
          <Route path="guangxi" element={<GuangxiTravel />} />
          <Route path="chengdu" element={<ChengduTravel />} />
          <Route path="qinghai" element={<QinghaiTravel />} />
          <Route path="jiangxi" element={<JiangxiTravel />} />
          <Route path="fujian" element={<FujianTravel />} />
          <Route path="gansu" element={<GansuTravel />} />
          <Route path="shaanxi" element={<ShaanxiTravel />} />
          <Route path="anhui" element={<AnhuiTravel />} />
          <Route path="xinjiang" element={<XinjiangTravel />} />
          <Route path="tibet" element={<TibetTravel />} />
          <Route path="sichuan" element={<SichuanTravel />} />
        </Route>

        {/* 日记模块 */}
        <Route path="diary/*" element={<DiaryLayout />}>
          <Route index element={<DiaryHome />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="planner" element={<Planner />} />
          <Route path="stats" element={<Stats />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="photos" element={<PhotoManager />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
