import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import PlanCard from '../components/PlanCard';
import { getTravelPlans, deleteTravelPlan } from '../utils/storage';

/**
 * 旅行规划展示页面
 * 卡片式展示所有保存的旅行计划，支持排序和筛选
 */
const TravelPlans = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  // 状态管理
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // 排序和筛选状态
  const [sortBy, setSortBy] = useState('created'); // created, date, days, destination
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
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
      console.log('加载旅行计划:', data.length, '个');
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
  }, [plans, sortBy, sortOrder, filterDestination, filterBudget]);

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
    upcoming: plans.filter(p => p.startDate && new Date(p.startDate) >= new Date().setHours(0,0,0,0)).length,
    totalDays: plans.reduce((sum, p) => sum + (p.days || 0), 0)
  };

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
                  旅行<span className="text-purple-400">规划库</span>
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  管理你的所有旅行计划
                </p>
              </div>
            </div>

            <Link
              to="/diary/planner"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              新建计划
            </Link>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-3 gap-4">
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
        </div>
      </div>

      {/* 筛选和排序工具栏 */}
      {plans.length > 0 && (
        <div className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'} ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* 排序按钮组 */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>排序：</span>
                <div className={`flex rounded-lg overflow-hidden ${isDark ? 'bg-white/5' : 'bg-white border border-gray-200'}`}>
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
                        : 'bg-white border border-gray-200 text-gray-900 focus:border-purple-500'
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
                      : 'bg-white border border-gray-200 text-gray-900 focus:border-purple-500'
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
        </div>
      )}

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

      {/* 计划卡片网格 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>加载中...</p>
          </div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-center py-20">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {plans.length === 0 ? '还没有旅行计划' : '没有符合条件的计划'}
            </h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {plans.length === 0 ? '创建你的第一个旅行计划吧！' : '试试调整筛选条件'}
            </p>
            {plans.length === 0 && (
              <Link
                to="/diary/planner"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                创建计划
              </Link>
            )}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PlanCard
                    plan={plan}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TravelPlans;
