import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';

// 页面组件 - 从 pages 目录导入
import ChengduTravel from './pages/Chengdu';
import GuangxiTravel from './pages/Guangxi';
import QinghaiTravel from './pages/Qinghai';
import JiangxiTravel from './pages/Jiangxi';
import FujianTravel from './pages/Fujian';
import GansuTravel from './pages/Gansu';
import ShaanxiTravel from './pages/Shaanxi';
import AnhuiTravel from './pages/Anhui';
import XinjiangTravel from './pages/Xinjiang';
import TibetTravel from './pages/Tibet';
import TravelDiary from './pages/TravelDiary';

// 导航链接组件
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-6 py-3 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </Link>
  );
};

// 主应用组件
function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 导航菜单 - 首页不显示 */}
      {!isHomePage && (
        <nav className="w-full bg-black/50 backdrop-blur-lg z-50 border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-center space-x-2 overflow-x-auto">
              <NavLink to="/">首页</NavLink>
              <NavLink to="/guangxi">广西</NavLink>
              <NavLink to="/chengdu">成都</NavLink>
              <NavLink to="/qinghai">青海</NavLink>
              <NavLink to="/jiangxi">江西</NavLink>
              <NavLink to="/fujian">福建</NavLink>
              <NavLink to="/gansu">甘肃</NavLink>
              <NavLink to="/shaanxi">陕西</NavLink>
              <NavLink to="/anhui">安徽</NavLink>
              <NavLink to="/xinjiang">新疆</NavLink>
              <NavLink to="/tibet">西藏</NavLink>
              <NavLink to="/diary">旅行日记</NavLink>
            </div>
          </div>
        </nav>
      )}

      {/* 主内容区域 */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guangxi" element={<GuangxiTravel />} />
          <Route path="/chengdu" element={<ChengduTravel />} />
          <Route path="/qinghai" element={<QinghaiTravel />} />
          <Route path="/jiangxi" element={<JiangxiTravel />} />
          <Route path="/fujian" element={<FujianTravel />} />
          <Route path="/gansu" element={<GansuTravel />} />
          <Route path="/shaanxi" element={<ShaanxiTravel />} />
          <Route path="/anhui" element={<AnhuiTravel />} />
          <Route path="/xinjiang" element={<XinjiangTravel />} />
          <Route path="/tibet" element={<TibetTravel />} />
          <Route path="/diary" element={<TravelDiary />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
