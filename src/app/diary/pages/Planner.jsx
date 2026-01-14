import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  saveTravelPlan,
  getTravelPlans,
  deleteTravelPlan,
  getStorageInfo,
  switchStorage
} from '../utils/storage';
import { StorageType } from '../utils/storageConfig';

/**
 * 旅行规划页面
 * 智能生成旅行计划，支持保存/收藏功能
 * 支持多种存储方式：SQLite、MySQL、PostgreSQL
 */
const Planner = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    days: '',
    budget: 'comfortable'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [showStorageSettings, setShowStorageSettings] = useState(false);
  const [notification, setNotification] = useState(null);
  const [storageInfo, setStorageInfo] = useState(getStorageInfo());

  // 可用的旅游目的地（来自旅游指南模块）
  const destinations = [
    { name: '成都', value: 'chengdu' },
    { name: '广西', value: 'guangxi' },
    { name: '青海', value: 'qinghai' },
    { name: '江西', value: 'jiangxi' },
    { name: '福建', value: 'fujian' },
    { name: '甘肃', value: 'gansu' },
    { name: '陕西', value: 'shaanxi' },
    { name: '安徽', value: 'anhui' },
    { name: '新疆', value: 'xinjiang' },
    { name: '西藏', value: 'tibet' },
    { name: '四川', value: 'sichuan' }
  ];

  // 预算选项
  const budgetOptions = [
    { value: 'economy', label: '经济型', desc: '5000以下', icon: 'fa-piggy-bank' },
    { value: 'comfortable', label: '舒适型', desc: '5000-10000', icon: 'fa-wallet' },
    { value: 'luxury', label: '豪华型', desc: '10000以上', icon: 'fa-gem' }
  ];

  // 加载已保存的计划
  useEffect(() => {
    loadSavedPlans();
  }, []);

  const loadSavedPlans = async () => {
    const plans = await getTravelPlans();
    setSavedPlans(plans);
  };

  // 存储方式选项
  const storageOptions = [
    {
      value: StorageType.SQLITE,
      label: 'SQLite',
      desc: '浏览器端 SQLite 数据库',
      icon: 'fa-database',
      enabled: storageInfo.config.sqlite
    },
    {
      value: StorageType.MYSQL,
      label: 'MySQL',
      desc: '需要配置后端 API',
      icon: 'fa-server',
      enabled: storageInfo.config.mysql
    },
    {
      value: StorageType.POSTGRESQL,
      label: 'PostgreSQL',
      desc: '需要配置后端 API',
      icon: 'fa-server',
      enabled: storageInfo.config.postgresql
    }
  ];

  const handleStorageSwitch = async (newType) => {
    const result = switchStorage(newType);
    if (result.success) {
      showNotification(result.message, 'success');
      setStorageInfo(getStorageInfo());
      await loadSavedPlans(); // 重新加载计划
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSavePlan = async () => {
    if (!formData.destination || !formData.startDate || !formData.days) {
      showNotification('请先填写完整的旅行信息', 'error');
      return;
    }

    await saveTravelPlan(formData);
    await loadSavedPlans();
    showNotification('计划已保存！');
    setShowSavedPlans(true);
  };

  const handleDeletePlan = async (id) => {
    await deleteTravelPlan(id);
    await loadSavedPlans();
    showNotification('计划已删除', 'info');
  };

  const handleLoadPlan = (plan) => {
    setFormData({
      destination: plan.destination,
      startDate: plan.startDate,
      days: plan.days,
      budget: plan.budget
    });
    setShowSavedPlans(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // 保存当前计划
    await saveTravelPlan(formData);
    await loadSavedPlans();

    // 模拟 AI 生成过程
    setTimeout(() => {
      setIsGenerating(false);

      // 检查是否有对应的旅游指南页面
      const matchedDestination = destinations.find(
        d => d.name === formData.destination || formData.destination.includes(d.name)
      );

      if (matchedDestination) {
        // 跳转到对应的旅游指南页面
        navigate(`/travel/${matchedDestination.value}`);
      } else {
        // 跳转到旅游指南首页
        navigate('/travel');
      }
    }, 2000);
  };

  const getBudgetLabel = (budget) => {
    return budgetOptions.find(opt => opt.value === budget)?.label || budget;
  };

  return (
    <section className={`min-h-screen py-20 transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900/20' : 'bg-gradient-to-br from-gray-50 via-white to-purple-50'}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            旅行<span className="text-purple-400">规划</span>
          </h2>
          <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            告诉我们你的旅行想法，AI 为你生成专属行程
          </p>
        </motion.div>

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
              <i className={`fas ${
                notification.type === 'error' ? 'fa-exclamation-circle' :
                notification.type === 'info' ? 'fa-info-circle' :
                'fa-check-circle'
              } mr-2`}></i>
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 已保存的计划面板 */}
        <AnimatePresence>
          {showSavedPlans && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSavedPlans(false)}
            >
              <motion.div
                className={`${isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-hidden transition-colors duration-300`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <i className="fas fa-bookmark mr-2 text-purple-400"></i>
                    已保存的计划
                  </h3>
                  <button
                    onClick={() => setShowSavedPlans(false)}
                    className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[60vh]">
                  {savedPlans.length > 0 ? (
                    savedPlans.map(plan => (
                      <div
                        key={plan.id}
                        className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} rounded-xl p-4 flex items-center justify-between transition-colors duration-300`}
                      >
                        <div className="flex-1">
                          <div className={`font-medium transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{plan.destination}</div>
                          <div className={`text-sm transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                            {plan.startDate} · {plan.days}天 · {getBudgetLabel(plan.budget)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLoadPlan(plan)}
                            className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
                            title="加载此计划"
                          >
                            <i className="fas fa-redo"></i>
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="删除此计划"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <i className="fas fa-folder-open text-4xl mb-3"></i>
                      <p>还没有保存的计划</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 规划表单 */}
        <motion.div
          className="bg-gray-900/80 border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 目的地 */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                <i className="fas fa-map-marker-alt mr-2 text-purple-400"></i>目的地
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="你想去哪里？（如：成都、西藏、新疆...）"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                required
              />
              {/* 热门目的地快捷选择 */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-gray-500 text-sm">热门：</span>
                {destinations.slice(0, 5).map(dest => (
                  <button
                    key={dest.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, destination: dest.name }))}
                    className="text-sm px-3 py-1 bg-gray-800 text-gray-400 rounded-full hover:bg-purple-500/20 hover:text-purple-300 transition-colors"
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 出发日期和天数 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  <i className="fas fa-calendar-alt mr-2 text-purple-400"></i>出发日期
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  <i className="fas fa-clock mr-2 text-purple-400"></i>旅行天数
                </label>
                <input
                  type="number"
                  name="days"
                  value={formData.days}
                  onChange={handleInputChange}
                  placeholder="天数"
                  min="1"
                  max="30"
                  className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* 预算范围 */}
            <div>
              <label className="block text-gray-300 mb-3 font-medium">
                <i className="fas fa-wallet mr-2 text-purple-400"></i>预算范围
              </label>
              <div className="grid grid-cols-3 gap-4">
                {budgetOptions.map(option => (
                  <label
                    key={option.value}
                    className={`cursor-pointer border rounded-xl p-4 text-center transition-all ${
                      formData.budget === option.value
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 bg-black/30 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={option.value}
                      checked={formData.budget === option.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <i className={`fas ${option.icon} text-purple-400`}></i>
                    </div>
                    <div className="text-white font-medium text-sm">{option.label}</div>
                    <div className="text-gray-500 text-xs mt-1">{option.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                onClick={handleSavePlan}
                className="bg-gray-800 text-white py-4 rounded-xl hover:bg-gray-700 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-bookmark mr-2"></i>
                保存计划
              </motion.button>
              <motion.button
                type="submit"
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] transform font-medium shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    正在生成...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-magic mr-2"></i>
                    生成行程
                  </span>
                )}
              </motion.button>
            </div>

            {/* 查看已保存计划 */}
            {savedPlans.length > 0 && (
              <motion.button
                type="button"
                onClick={() => setShowSavedPlans(true)}
                className="w-full text-center text-gray-500 hover:text-purple-400 transition-colors text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <i className="fas fa-folder-open mr-1"></i>
                查看已保存的计划 ({savedPlans.length})
              </motion.button>
            )}
          </form>

          {/* 提示信息 */}
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-start">
            <i className="fas fa-lightbulb text-purple-400 mr-3 mt-1"></i>
            <p className="text-gray-400 text-sm">
              如果目的地与我们的旅游指南匹配，将直接跳转到详细页面查看更多信息。
              生成的计划会自动保存到本地。
            </p>
          </div>
        </motion.div>

        {/* 功能特性 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: 'fa-robot', title: 'AI 智能规划', desc: '根据你的需求自动生成最优路线' },
            { icon: 'fa-bookmark', title: '计划保存', desc: '保存你的旅行计划，随时查看管理' },
            { icon: 'fa-map-signs', title: '详细攻略', desc: '提供景点、美食、住宿等全面信息' }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-white/10 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${feature.icon} text-purple-400`}></i>
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* 存储设置按钮 */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowStorageSettings(true)}
            className="text-gray-500 hover:text-purple-400 transition-colors text-sm flex items-center justify-center mx-auto gap-2"
          >
            <i className="fas fa-cog"></i>
            存储设置
            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">
              {storageInfo.currentType === 'sqlite' ? 'SQLite' :
               storageInfo.currentType === 'mysql' ? 'MySQL' : 'PostgreSQL'}
            </span>
          </button>
        </motion.div>
      </div>

      {/* 存储设置面板 */}
      <AnimatePresence>
        {showStorageSettings && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStorageSettings(false)}
          >
            <motion.div
              className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  <i className="fas fa-database mr-2 text-purple-400"></i>
                  存储设置
                </h3>
                <button
                  onClick={() => setShowStorageSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="space-y-3">
                {storageOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => option.enabled && handleStorageSwitch(option.value)}
                    disabled={!option.enabled}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      storageInfo.currentType === option.value
                        ? 'border-purple-500 bg-purple-500/20'
                        : option.enabled
                        ? 'border-white/10 bg-gray-800/50 hover:border-white/20'
                        : 'border-white/5 bg-gray-800/30 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        storageInfo.currentType === option.value
                          ? 'bg-purple-500'
                          : 'bg-gray-700'
                      }`}>
                        <i className={`fas ${option.icon} text-white`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{option.label}</span>
                          {storageInfo.currentType === option.value && (
                            <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded">
                              当前
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{option.desc}</p>
                      </div>
                      {!option.enabled && (
                        <i className="fas fa-lock text-gray-600"></i>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-gray-400 text-sm">
                  <i className="fas fa-info-circle mr-2 text-blue-400"></i>
                  要启用 SQLite/MySQL/PostgreSQL，请在 <code className="text-purple-400">src/app/diary/utils/storageConfig.js</code> 中配置。
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Planner;
