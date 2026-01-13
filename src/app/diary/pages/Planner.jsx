import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * 旅行规划页面
 * 智能生成旅行计划，连接旅游指南模块
 */
const Planner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    days: '',
    budget: 'comfortable'
  });
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);

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

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-purple-900/20">
      <div className="max-w-3xl mx-auto px-4">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            旅行<span className="text-purple-400">规划</span>
          </h2>
          <p className="text-gray-400">
            告诉我们你的旅行想法，AI 为你生成专属行程
          </p>
        </motion.div>

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
              <label className="block text-gray-300 mb-2 font-medium">
                <i className="fas fa-wallet mr-2 text-purple-400"></i>预算范围
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'economy', label: '经济型', desc: '5000以下' },
                  { value: 'comfortable', label: '舒适型', desc: '5000-10000' },
                  { value: 'luxury', label: '豪华型', desc: '10000以上' }
                ].map(option => (
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
                    <div className="text-white font-medium">{option.label}</div>
                    <div className="text-gray-500 text-sm mt-1">{option.desc}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* 提交按钮 */}
            <motion.button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] transform font-medium shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  正在生成计划...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <i className="fas fa-magic mr-2"></i>
                  生成旅行计划
                </span>
              )}
            </motion.button>
          </form>

          {/* 提示信息 */}
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-start">
            <i className="fas fa-lightbulb text-purple-400 mr-3 mt-1"></i>
            <p className="text-gray-400 text-sm">
              如果目的地与我们的旅游指南匹配，将直接跳转到详细页面查看更多信息。
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
            { icon: 'fa-map-signs', title: '详细攻略', desc: '提供景点、美食、住宿等全面信息' },
            { icon: 'fa-sync-alt', title: '灵活调整', desc: '随时修改计划，适应你的变化' }
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
      </div>
    </section>
  );
};

export default Planner;
