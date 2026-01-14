import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 旅行计划卡片组件
 * 显示单个旅行计划的关键信息
 */
const PlanCard = ({ plan, onEdit, onDelete }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // 预算级别标签
  const budgetLabels = {
    comfortable: { label: '舒适型', color: 'bg-green-500/20 text-green-400' },
    economy: { label: '经济型', color: 'bg-blue-500/20 text-blue-400' },
    luxury: { label: '豪华型', color: 'bg-amber-500/20 text-amber-400' }
  };

  const budgetInfo = budgetLabels[plan.budget] || budgetLabels.comfortable;

  // 格式化日期
  const formatDate = (dateStr) => {
    if (!dateStr) return '待定日期';
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // 计算距离出发的天数
  const getDaysUntil = () => {
    if (!plan.startDate) return null;
    const startDate = new Date(plan.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = startDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntil();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer group`}
    >
      {/* 头部：目的地和操作按钮 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'} group-hover:scale-110 transition-transform duration-300`}>
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {plan.destination}
            </h3>
            {daysUntil !== null && daysUntil >= 0 && (
              <p className={`text-sm ${daysUntil <= 7 ? 'text-orange-400' : daysUntil <= 30 ? 'text-yellow-400' : 'text-gray-400'}`}>
                {daysUntil === 0 ? '今天出发！' : daysUntil === 1 ? '明天出发' : `${daysUntil}天后出发`}
              </p>
            )}
            {daysUntil !== null && daysUntil < 0 && (
              <p className="text-sm text-gray-500">已过期</p>
            )}
          </div>
        </div>

        {/* 操作按钮组 */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(plan); }}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
            title="编辑"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(plan); }}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-red-500/20 text-gray-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-500 hover:text-red-500'}`}
            title="删除"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 分隔线 */}
      <div className={`border-t ${isDark ? 'border-white/10' : 'border-gray-200'} my-4`}></div>

      {/* 信息网格 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 出发日期 */}
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>出发日期</p>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {formatDate(plan.startDate)}
            </p>
          </div>
        </div>

        {/* 旅行天数 */}
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>旅行天数</p>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {plan.days} 天
            </p>
          </div>
        </div>
      </div>

      {/* 预算标签 */}
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${budgetInfo.color}`}>
          {budgetInfo.label}
        </span>
      </div>

      {/* 底部操作按钮 */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(plan)}
          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity text-sm"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            编辑计划
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default PlanCard;
