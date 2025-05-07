
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import SichuanTravel from './sichuan-3786ef4bc9';
import ChengduTravelGuide from './chengdu-2025';
import GuangxiTravel from './guangxi-6eaa24a187';
import QinghaiTravel from './qinghai-79f5365273';
import JiangxiTravel from './jiangxi-1d0784d258';
import FujianTravel from './fujian-333bd5840b';
import GansuTravel from './gansu-5d9e8995f6';
import ShaanxiTravel from './shanxi-4b17b6a527';
import AnhuiTravel from './anhui-2eab75bf4f';
import XinjiangTravel from './xinjiang-b3e284c7de';


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

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation Menu - Hide on homepage */}
      {!isHomePage && (
        <nav className="w-full bg-black/50 backdrop-blur-lg z-50 border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-center space-x-2 overflow-x-auto">
              <NavLink to="/">首页</NavLink>
              <NavLink to="/sichuan">四川</NavLink>
              <NavLink to="/guangxi">广西</NavLink>
              <NavLink to="/chengdu">成都</NavLink>
              <NavLink to="/qinghai">青海</NavLink>
              <NavLink to="/jiangxi">江西</NavLink>
              <NavLink to="/fujian">福建</NavLink>
              <NavLink to="/gansu">甘肃</NavLink>
              <NavLink to="/shaanxi">陕西</NavLink>
              <NavLink to="/anhui">安徽</NavLink>
              <NavLink to="/xinjiang">新疆</NavLink>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sichuan" element={<SichuanTravel />} />
          <Route path="/guangxi" element={<GuangxiTravel />} />
          <Route path="/chengdu" element={<ChengduTravelGuide />} />
          <Route path="/qinghai" element={<QinghaiTravel />} />
          <Route path="/jiangxi" element={<JiangxiTravel />} />
          <Route path="/fujian" element={<FujianTravel />} />
          <Route path="/gansu" element={<GansuTravel />} />
          <Route path="/shaanxi" element={<ShaanxiTravel />} />
          <Route path="/anhui" element={<AnhuiTravel />} />
          <Route path="/xinjiang" element={<XinjiangTravel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
