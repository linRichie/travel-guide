import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 图片灯箱查看器
 * 支持全屏查看、左右切换、键盘操作、EXIF信息显示
 */
const PhotoLightbox = ({ images, currentIndex, onClose, onNext, onPrevious }) => {
  const [showExif, setShowExif] = useState(false);

  // 键盘事件处理
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrevious();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'i' || e.key === 'I') setShowExif(prev => !prev);
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 禁止背景滚动
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 关闭按钮 */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-times"></i>
        </motion.button>

        {/* 图片计数器 */}
        <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* EXIF 信息切换按钮 */}
        {currentImage.exif && (
          <motion.button
            onClick={() => setShowExif(!showExif)}
            className={`absolute top-16 right-4 z-10 px-4 py-2 backdrop-blur-sm rounded-full text-sm transition-all ${
              showExif
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-info-circle mr-1"></i>
            EXIF
          </motion.button>
        )}

        {/* 上一张按钮 */}
        {currentIndex > 0 && (
          <motion.button
            onClick={onPrevious}
            className="absolute left-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-chevron-left"></i>
          </motion.button>
        )}

        {/* 下一张按钮 */}
        {currentIndex < images.length - 1 && (
          <motion.button
            onClick={onNext}
            className="absolute right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-chevron-right"></i>
          </motion.button>
        )}

        {/* 图片容器 */}
        <motion.div
          key={currentIndex}
          className={`relative ${showExif && currentImage.exif ? 'max-w-4xl' : 'max-w-7xl'} max-h-[85vh] px-4`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={currentImage.img}
            alt={currentImage.title}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />

          {/* 图片信息 */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white">{currentImage.title}</h3>
            <p className="text-gray-400 mt-1">
              <i className="fas fa-map-marker-alt mr-1 text-purple-400"></i>
              {currentImage.location}
              <span className="mx-2">·</span>
              <i className="far fa-calendar-alt mr-1 text-purple-400"></i>
              {currentImage.date}
            </p>
            {currentImage.tags && (
              <div className="flex justify-center gap-2 mt-3">
                {currentImage.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* EXIF 信息面板 */}
          <AnimatePresence>
            {showExif && currentImage.exif && (
              <motion.div
                className="mt-6 bg-gray-900/80 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center">
                  <i className="fas fa-camera mr-2"></i>
                  拍摄参数
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-gray-500 text-xs mb-1">
                      <i className="fas fa-camera mr-1"></i>相机
                    </div>
                    <div className="text-white font-medium">{currentImage.exif.camera}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-gray-500 text-xs mb-1">
                      <i className="fas fa-circle-dot mr-1"></i>镜头
                    </div>
                    <div className="text-white font-medium">{currentImage.exif.lens}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-gray-500 text-xs mb-1">
                      <i className="fas fa-expand mr-1"></i>焦距
                    </div>
                    <div className="text-white font-medium">{currentImage.exif.focal}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-gray-500 text-xs mb-1">
                      <i className="fas fa-aperture mr-1"></i>光圈
                    </div>
                    <div className="text-white font-medium">{currentImage.exif.aperture}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-gray-500 text-xs mb-1">
                      <i className="fas fa-stopwatch mr-1"></i>快门
                    </div>
                    <div className="text-white font-medium">{currentImage.exif.shutter}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-gray-500 text-xs mb-1">
                      <i className="fas fa-sun mr-1"></i>ISO
                    </div>
                    <div className="text-white font-medium">{currentImage.exif.iso}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 缩略图导航 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => index !== currentIndex && (index < currentIndex ? onPrevious() : onNext())}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-purple-500 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={image.img}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PhotoLightbox;
