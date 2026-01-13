import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { galleryItems, getAllTags, getAllYears } from '../data/galleryData';
import PhotoLightbox from '../components/PhotoLightbox';

/**
 * 旅拍图集页面
 * 支持按年份/标签筛选图片、灯箱查看
 */
const Gallery = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedYear, setSelectedYear] = useState('全部');
  const [selectedTag, setSelectedTag] = useState('全部');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 获取可用的年份和标签
  const years = ['全部', ...getAllYears()];
  const tags = ['全部', ...getAllTags()];

  // 筛选后的图片列表
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const yearMatch = selectedYear === '全部' || item.date === selectedYear;
      const tagMatch = selectedTag === '全部' || item.tags.includes(selectedTag);
      return yearMatch && tagMatch;
    });
  }, [selectedYear, selectedTag]);

  // 打开灯箱
  const openLightbox = useCallback((index) => {
    // 获取该图片在原始数组中的索引
    const originalIndex = galleryItems.findIndex(item => item.id === filteredItems[index].id);
    setCurrentImageIndex(originalIndex);
    setLightboxOpen(true);
  }, [filteredItems]);

  // 灯箱导航
  const goToNext = useCallback(() => {
    setCurrentImageIndex(prev => (prev + 1) % galleryItems.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex(prev => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, []);

  return (
    <section className={`min-h-screen py-20 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          旅拍<span className="text-purple-400">图集</span>
        </motion.h2>
        <motion.p
          className={`text-center mb-12 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          记录旅途中的美好瞬间 · 共 {galleryItems.length} 张精选
        </motion.p>

        {/* 筛选器 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* 年份筛选 */}
          <div className={`flex items-center ${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-full px-4 py-2 transition-colors duration-300`}>
            <span className={`mr-3 text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <i className="fas fa-calendar-alt mr-1"></i>年份
            </span>
            <div className="flex space-x-1">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedYear === year
                      ? 'bg-purple-500 text-white'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* 标签筛选 */}
          <div className={`flex items-center ${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-full px-4 py-2 transition-colors duration-300`}>
            <span className={`mr-3 text-sm transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <i className="fas fa-tags mr-1"></i>标签
            </span>
            <div className="flex space-x-1 flex-wrap">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedTag === tag
                      ? 'bg-purple-500 text-white'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 图片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`group ${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* 图片 */}
              <div
                className="relative overflow-hidden aspect-[4/3] cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full">
                    <i className="fas fa-expand mr-2"></i>点击查看
                  </span>
                </div>
              </div>

              {/* 信息卡片 */}
              <div className="p-4">
                <h3 className={`font-bold text-lg mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm mb-3 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <i className="fas fa-map-marker-alt mr-1 text-purple-400"></i>
                  {item.location} · {item.date}
                </p>
                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className={`fas fa-camera text-6xl mb-4 transition-colors duration-300 ${isDark ? 'text-gray-700' : 'text-gray-400'}`}></i>
            <p className={`text-lg transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>没有找到相关图片</p>
          </motion.div>
        )}
      </div>

      {/* 灯箱 */}
      {lightboxOpen && (
        <PhotoLightbox
          images={galleryItems}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={goToNext}
          onPrevious={goToPrevious}
        />
      )}
    </section>
  );
};

export default Gallery;
