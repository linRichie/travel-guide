import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import PlanCard from '../components/PlanCard';
import BudgetPieChart from '../components/BudgetPieChart';
import DestinationBarChart from '../components/DestinationBarChart';
import MonthBarChart from '../components/MonthBarChart';
import DaysBarChart from '../components/DaysBarChart';
import AMapFootprint from '../components/AMapFootprint';
import PhotoTrendChart from '../components/PhotoTrendChart';
import { statsData, travelFootprint, yearlyTrips, continentData, photoTrendData } from '../data/statsData';
import { getTravelPlans, deleteTravelPlan } from '../utils/storage';

/**
 * 旅行中心页面
 * 整合旅行计划管理和旅行统计展示
 * 三个标签页：我的计划 | 统计图表 | 旅行足迹
 */
const TravelCenter = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  // 当前标签页：plans | charts | footprint
  const [activeTab, setActiveTab] = useState('plans');

  // 状态管理
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 搜索状态
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 排序和筛选状态
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterDestination, setFilterDestination] = useState('all');
  const [filterBudget, setFilterBudget] = useState('all');

  // 显示通知
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // 加载旅行计划
  const loadPlans = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTravelPlans();
      setPlans(data);
    } catch (error) {
      console.error('加载计划失败:', error);
      showNotification('加载计划失败', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // 初始加载
  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  // 应用排序和筛选
  useEffect(() => {
    let result = [...plans];

    // 应用搜索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => {
        const destination = (p.destination || '').toLowerCase();
        const startDate = p.startDate || '';
        return destination.includes(query) || startDate.includes(query);
      });
    }

    // 应用筛选
    if (filterDestination !== 'all') {
      result = result.filter(p => p.destination === filterDestination);
    }
    if (filterBudget !== 'all') {
      result = result.filter(p => p.budget === filterBudget);
    }

    // 应用排序
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.startDate || 0) - new Date(b.startDate || 0);
          break;
        case 'days':
          comparison = (a.days || 0) - (b.days || 0);
          break;
        case 'destination':
          comparison = (a.destination || '').localeCompare(b.destination || '');
          break;
        case 'created':
        default:
          comparison = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredPlans(result);
  }, [plans, sortBy, sortOrder, filterDestination, filterBudget, searchQuery]);

  // 更新搜索建议
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const suggestions = plans
        .filter(p => (p.destination || '').toLowerCase().includes(query))
        .map(p => p.destination)
        .filter(Boolean);
      setSearchSuggestions([...new Set(suggestions)].slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, plans]);

  // 获取所有唯一的目的地
  const destinations = ['all', ...Array.from(new Set(plans.map(p => p.destination).filter(Boolean)))];

  // 删除计划
  const handleDelete = async (plan) => {
    if (!confirm(`确定要删除「${plan.destination}」的旅行计划吗？`)) return;

    try {
      await deleteTravelPlan(plan.id);
      await loadPlans();
      showNotification('计划已删除', 'info');
    } catch (error) {
      console.error('删除失败:', error);
      showNotification('删除失败', 'error');
    }
  };

  // 编辑计划
  const handleEdit = (plan) => {
    navigate('/diary/planner', { state: { editPlan: plan } });
  };

  // 切换排序
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // 统计信息
  const stats = {
    total: plans.length,
    upcoming: plans.filter(p => p.startDate && new Date(p.startDate) >= new Date().setHours(0, 0, 0, 0)).length,
    totalDays: plans.reduce((sum, p) => sum + (p.days || 0), 0)
  };

  // 标签页配置
  const tabs = [
    { id: 'plans', label: '我的计划', icon: 'fa-suitcase' },
    { id: 'charts', label: '统计图表', icon: 'fa-chart-bar' },
    { id: 'footprint', label: '旅行足迹', icon: 'fa-globe-asia' }
  ];

  return (
    <section className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* 页面头部 */}
      <div className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'} ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link
                to="/diary"
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  旅行<span className="text-purple-400">中心</span>
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  计划你的下一次冒险
                </p>
              </div>
            </div>

            {activeTab === 'plans' && (
              <Link
                to="/diary/planner"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                新建计划
              </Link>
            )}
          </div>

          {/* 标签页导航 */}
          <div className={`flex rounded-xl p-1 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 通知提示 */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center ${
              notification.type === 'error'
                ? 'bg-red-500 text-white'
                : notification.type === 'info'
                ? 'bg-blue-500 text-white'
                : 'bg-green-500 text-white'
            }`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {notification.type === 'error' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* 我的计划视图 */}
          {activeTab === 'plans' && (
            <motion.div
              key="plans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* 统计卡片 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`backdrop-blur-lg ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-4 text-center`}>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>全部计划</p>
                </div>
                <div className={`backdrop-blur-lg ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-4 text-center`}>
                  <p className={`text-2xl font-bold text-green-400`}>{stats.upcoming}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>即将出发</p>
                </div>
                <div className={`backdrop-blur-lg ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-4 text-center`}>
                  <p className={`text-2xl font-bold text-purple-400`}>{stats.totalDays}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>总天数</p>
                </div>
              </div>

              {/* 搜索框 */}
              {plans.length > 0 && (
                <div className="mb-6 relative">
                  <div className="relative max-w-md">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => searchQuery && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      placeholder="搜索目的地或日期..."
                      className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none transition-all ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                          : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
                      }`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* 搜索建议下拉 */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`absolute top-full left-0 mt-2 w-full max-w-md rounded-xl shadow-xl overflow-hidden z-10 ${
                        isDark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'
                      }`}
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSuggestions(false);
                          }}
                          className={`w-full text-left px-4 py-3 transition-colors ${
                            isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {suggestion}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* 筛选和排序工具栏 */}
              {plans.length > 0 && (
                <div className={`mb-6 p-4 rounded-xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'} border`}>
                  <div className="flex flex-wrap items-center gap-4">
                    {/* 排序按钮组 */}
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>排序：</span>
                      <div className={`flex rounded-lg overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                        {[
                          { key: 'created', label: '创建时间' },
                          { key: 'date', label: '出发日期' },
                          { key: 'days', label: '天数' },
                          { key: 'destination', label: '目的地' }
                        ].map(option => (
                          <button
                            key={option.key}
                            onClick={() => toggleSort(option.key)}
                            className={`px-3 py-1.5 text-sm transition-colors ${
                              sortBy === option.key
                                ? 'bg-purple-500 text-white'
                                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {option.label}
                            {sortBy === option.key && (
                              <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 目的地筛选 */}
                    {destinations.length > 1 && (
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>目的地：</span>
                        <select
                          value={filterDestination}
                          onChange={(e) => setFilterDestination(e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-sm outline-none transition-colors ${
                            isDark
                              ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                              : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                          }`}
                        >
                          {destinations.map(d => (
                            <option key={d} value={d}>{d === 'all' ? '全部' : d}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* 预算筛选 */}
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>预算：</span>
                      <select
                        value={filterBudget}
                        onChange={(e) => setFilterBudget(e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm outline-none transition-colors ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                            : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                        }`}
                      >
                        <option value="all">全部</option>
                        <option value="economy">经济型</option>
                        <option value="comfortable">舒适型</option>
                        <option value="luxury">豪华型</option>
                      </select>
                    </div>

                    {/* 结果计数 */}
                    <div className={`ml-auto text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      显示 {filteredPlans.length} 个计划
                    </div>
                  </div>
                </div>
              )}

              {/* 计划卡片网格 */}
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>加载中...</p>
                </div>
              ) : plans.length === 0 ? (
                <div className="text-center py-20">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    还没有旅行计划
                  </h3>
                  <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    创建你的第一个旅行计划吧！
                  </p>
                  <Link
                    to="/diary/planner"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    创建计划
                  </Link>
                </div>
              ) : filteredPlans.length === 0 ? (
                <div className="text-center py-20">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    没有找到匹配的计划
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    试试调整搜索关键词或筛选条件
                  </p>
                </div>
              ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <PlanCard plan={plan} onEdit={handleEdit} onDelete={handleDelete} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* 统计图表视图 */}
          {activeTab === 'charts' && (
            <motion.div
              key="charts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-6">
                {/* 统计摘要卡片 */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6`}>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">{plans.length}</p>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>总计划数</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">
                      {plans.length > 0 ? [...new Set(plans.map(p => p.destination))].length : 0}
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>目的地数</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">
                      {plans.length > 0 ? Math.round(plans.reduce((sum, p) => sum + (p.days || 0), 0) / plans.length) : 0}
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>平均天数</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">
                      {plans.reduce((sum, p) => sum + (p.days || 0), 0)}
                    </p>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>总天数</p>
                  </div>
                </div>

                {/* 图表网格 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DestinationBarChart data={
                    [...new Set(plans.map(p => p.destination))].map(dest => ({
                      name: dest,
                      value: plans.filter(p => p.destination === dest).length
                    })).sort((a, b) => b.value - a.value).slice(0, 5)
                  } />
                  <BudgetPieChart data={
                    ['economy', 'comfortable', 'luxury'].map(type => ({
                      name: type === 'economy' ? '经济型' : type === 'comfortable' ? '舒适型' : '豪华型',
                      value: plans.filter(p => p.budget === type).length || 0,
                      color: type === 'economy' ? '#22c55e' : type === 'comfortable' ? '#8b5cf6' : '#f59e0b'
                    })).filter(d => d.value > 0)
                  } />
                </div>

                <MonthBarChart />
                <DaysBarChart />
              </div>
            </motion.div>
          )}

          {/* 旅行足迹视图 */}
          {activeTab === 'footprint' && (
            <motion.div
              key="footprint"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* 核心数据卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsData.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <i className={`fas ${stat.icon} text-4xl mb-3 opacity-90`}></i>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="text-base opacity-90">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* 旅行足迹地图 - 高德地图 */}
              <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
                <h3 className={`text-xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <svg className="w-5 h-5 text-purple-400 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2a2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2.5 2.5 0 012.489 2.122 2.5 2.5 0 012.122 2.489A2.5 2.5 0 0016.5 13H17a2.5 2.5 0 002.5-2.5V8a2.5 2.5 0 00-2.448-2.5A2.5 2.5 0 0013 5.565V5a2 2 0 012-2h.945" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c-1.5 0-3-.4-4-1-4 1-1 4-4 4 9" />
                  </svg>
                  旅行记录地图
                </h3>

                {/* 高德地图 */}
                <AMapFootprint visitedCountries={travelFootprint} />

                {/* 足迹列表 */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
                  {travelFootprint.map((country, index) => (
                    <motion.div
                      key={country.country}
                      className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} rounded-xl p-4 text-center transition-colors duration-300 cursor-pointer hover:${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <div className="text-2xl mb-2">
                        {country.country === '中国' && '🇨🇳'}
                        {country.country === '日本' && '🇯🇵'}
                        {country.country === '法国' && '🇫🇷'}
                        {country.country === '意大利' && '🇮🇹'}
                        {country.country === '希腊' && '🇬🇷'}
                        {country.country === '冰岛' && '🇮🇸'}
                        {country.country === '瑞士' && '🇨🇭'}
                      </div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{country.country}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{country.cities.length} 城市</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 年度旅行统计 */}
              <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
                <h3 className={`text-xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <svg className="w-5 h-5 text-purple-400 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  年度旅行记录
                </h3>
                <div className="flex items-end justify-between h-48 px-4">
                  {yearlyTrips.map((trip, index) => {
                    const maxCount = Math.max(...yearlyTrips.map(t => t.count));
                    const heightPercent = (trip.count / maxCount) * 100;

                    return (
                      <motion.div
                        key={trip.year}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className={`text-xs mb-3 font-medium ${trip.count === maxCount ? 'text-purple-400' : isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                          {trip.count}次
                        </div>
                        <div className="w-12 md:w-16 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all hover:from-purple-500 hover:to-blue-400 shadow-lg shadow-purple-500/20"
                             style={{ height: `${heightPercent * 0.8}px` }}>
                        </div>
                        <div className={`text-xs mt-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{trip.year}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* 洲分布统计 */}
              <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
                <h3 className={`text-xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <svg className="w-5 h-5 text-purple-400 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A2.5 2.5 0 0113 5.5v1a2.5 2.5 0 01-4.899 2.122A2.5 2.5 0 0112 10.565V13a2 2 0 012 2v1a2 2 0 104 0V5.945a2.5 2.5 0 01-2.122 2.489A2.5 2.5 0 0110.5 8H17a2.5 2.5 0 002.5-2.5V8a2.5 2.5 0 01-2.122-2.489A2.5 2.5 0 0013 5.565V5a2 2 0 012-2h.945" />
                  </svg>
                  洲分布统计
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {continentData.map((continent, index) => (
                    <motion.div
                      key={continent.continent}
                      className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ color: continent.color }}>
                        {continent.count}
                      </div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>{continent.continent}</div>
                      <div className={`mt-2 h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(continent.count / 12) * 100}%`,
                            backgroundColor: continent.color
                          }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 照片数量趋势 - 直方图 */}
              <PhotoTrendChart data={photoTrendData} />

              {/* 已访问城市列表 */}
              <div className={`mt-8 ${isDark ? 'bg-gray-900/30 border-white/5' : 'bg-gray-100 border-gray-200'} border rounded-2xl p-6`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <i className="fas fa-city mr-2 text-purple-400"></i>
                  已访问城市 ({travelFootprint.reduce((acc, c) => acc + c.cities.length, 0)} 个)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {travelFootprint.map(country =>
                    country.cities.map(city => (
                      <span
                        key={`${country.country}-${city}`}
                        className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${isDark ? 'bg-gray-800/50 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'}`}
                      >
                        {city}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TravelCenter;
