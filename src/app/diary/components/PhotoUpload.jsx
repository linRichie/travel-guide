import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 图片上传组件
 * 支持拖拽上传、多图选择、预览、元数据编辑
 */
const PhotoUpload = ({ onUploadComplete, existingPhotos = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  // 当前编辑的照片元数据
  const [photoMetadata, setPhotoMetadata] = useState({});

  /**
   * 处理文件选择
   */
  const handleFiles = useCallback((files) => {
    const validFiles = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0) return;

    setSelectedFiles(prev => [...prev, ...validFiles]);

    // 生成预览
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => [...prev, {
          id: Math.random().toString(36).substr(2, 9),
          file,
          url: e.target.result,
          name: file.name
        }]);

        // 初始化元数据
        setPhotoMetadata(prev => ({
          ...prev,
          [file.name]: {
            title: file.name.replace(/\.[^/.]+$/, ''), // 移除扩展名
            location: '',
            date: new Date().getFullYear().toString(),
            tags: [],
            exif: null
          }
        }));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  /**
   * 文件输入框变化
   */
  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  /**
   * 拖拽相关事件
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  /**
   * 移除预览
   */
  const removePreview = (id) => {
    setPreviews(prev => {
      const preview = prev.find(p => p.id === id);
      if (preview) {
        setPhotoMetadata(prevMeta => {
          const newMeta = { ...prevMeta };
          delete newMeta[preview.name];
          return newMeta;
        });
      }
      return prev.filter(p => p.id !== id);
    });
  };

  /**
   * 更新照片元数据
   */
  const updateMetadata = (fileName, field, value) => {
    setPhotoMetadata(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        [field]: value
      }
    }));
  };

  /**
   * 添加标签
   */
  const addTag = (fileName, tag) => {
    if (!tag.trim()) return;
    setPhotoMetadata(prev => {
      const currentTags = prev[fileName]?.tags || [];
      if (currentTags.includes(tag)) return prev;
      return {
        ...prev,
        [fileName]: {
          ...prev[fileName],
          tags: [...currentTags, tag.trim()]
        }
      };
    });
  };

  /**
   * 移除标签
   */
  const removeTag = (fileName, tag) => {
    setPhotoMetadata(prev => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        tags: prev[fileName].tags.filter(t => t !== tag)
      }
    }));
  };

  /**
   * 模拟上传过程
   */
  const simulateUpload = async (preview) => {
    const progressSteps = [0, 20, 40, 60, 80, 100];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(prev => ({
        ...prev,
        [preview.id]: step
      }));
    }
  };

  /**
   * 执行上传
   */
  const handleUpload = async () => {
    if (previews.length === 0) return;

    setIsUploading(true);

    // 并发上传所有图片
    await Promise.all(previews.map(simulateUpload));

    // 准备上传结果
    const uploadedPhotos = previews.map(preview => ({
      id: Date.now() + parseInt(preview.id),
      ...photoMetadata[preview.name],
      img: preview.url // 实际项目中应该是服务器返回的URL
    }));

    setIsUploading(false);

    // 重置状态
    setSelectedFiles([]);
    setPreviews([]);
    setUploadProgress({});

    // 回调
    if (onUploadComplete) {
      onUploadComplete(uploadedPhotos);
    }
  };

  return (
    <div>
      {/* 上传区域 */}
      {previews.length === 0 && (
        <div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-purple-500 bg-purple-500/10'
              : isDark
                ? 'border-white/20 hover:border-white/40 bg-white/5'
                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isDark ? 'bg-white/10' : 'bg-gray-200'
          }`}>
            <i className="fas fa-cloud-upload-alt text-4xl text-purple-400"></i>
          </div>

          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            拖拽图片到这里上传
          </h3>

          <p className={isDark ? 'text-gray-400 mb-6' : 'text-gray-600 mb-6'}>
            或者点击选择文件
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <i className="fas fa-image"></i>
              支持 JPG, PNG, GIF, WebP
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-file"></i>
              最大 10MB
            </span>
          </div>
        </div>
      )}

      {/* 预览区域 */}
      {previews.length > 0 && (
        <div className="space-y-6">
          {/* 预览列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previews.map(preview => {
              const metadata = photoMetadata[preview.name] || {};
              const progress = uploadProgress[preview.id] || 0;

              return (
                <motion.div
                  key={preview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl overflow-hidden ${
                    isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* 图片预览 */}
                  <div className="relative aspect-video">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="w-full h-full object-cover"
                    />

                    {/* 上传进度 */}
                    {isUploading && progress > 0 && progress < 100 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeOpacity="0.25"
                              />
                              <path
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#a855f7"
                                strokeWidth="3"
                                strokeDasharray={`${progress}, 100`}
                              />
                            </svg>
                          </div>
                          <span className="text-white text-sm">{progress}%</span>
                        </div>
                      </div>
                    )}

                    {/* 删除按钮 */}
                    {!isUploading && (
                      <button
                        onClick={() => removePreview(preview.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>

                  {/* 元数据编辑 */}
                  {!isUploading && (
                    <div className="p-4 space-y-4">
                      {/* 标题 */}
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          标题
                        </label>
                        <input
                          type="text"
                          value={metadata.title || ''}
                          onChange={(e) => updateMetadata(preview.name, 'title', e.target.value)}
                          placeholder="输入图片标题"
                          className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                            isDark
                              ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                              : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                          }`}
                        />
                      </div>

                      {/* 地点和日期 */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            拍摄地点
                          </label>
                          <input
                            type="text"
                            value={metadata.location || ''}
                            onChange={(e) => updateMetadata(preview.name, 'location', e.target.value)}
                            placeholder="如：法国巴黎"
                            className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                              isDark
                                ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                                : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            拍摄年份
                          </label>
                          <input
                            type="text"
                            value={metadata.date || ''}
                            onChange={(e) => updateMetadata(preview.name, 'date', e.target.value)}
                            placeholder="如：2024年"
                            className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                              isDark
                                ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                                : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                            }`}
                          />
                        </div>
                      </div>

                      {/* 标签 */}
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          标签
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(metadata.tags || []).map(tag => (
                            <span
                              key={tag}
                              className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                                isDark
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(preview.name, tag)}
                                className="hover:text-red-400"
                              >
                                <i className="fas fa-times text-xs"></i>
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="添加标签..."
                            className={`flex-1 px-4 py-2 rounded-lg outline-none transition-colors ${
                              isDark
                                ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                                : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                            }`}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTag(preview.name, e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                        {/* 快捷标签 */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['城市', '自然', '人文', '美食'].map(tag => (
                            <button
                              key={tag}
                              onClick={() => addTag(preview.name, tag)}
                              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                                isDark
                                  ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              +{tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* 添加更多按钮 */}
          {!isUploading && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-full py-4 rounded-xl border-2 border-dashed transition-colors ${
                isDark
                  ? 'border-white/20 hover:border-white/40 text-gray-400 hover:text-white'
                  : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-plus mr-2"></i>
              添加更多图片
            </button>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  上传中...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-upload"></i>
                  上传 {previews.length} 张图片
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setSelectedFiles([]);
                setPreviews([]);
                setUploadProgress({});
                setPhotoMetadata({});
              }}
              disabled={isUploading}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white disabled:opacity-50'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'
              }`}
            >
              清空
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
