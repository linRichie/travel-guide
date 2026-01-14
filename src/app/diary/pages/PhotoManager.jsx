import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import PhotoUpload from '../components/PhotoUpload';
import {
  savePhotos,
  getPhotos,
  updatePhoto,
  deletePhoto as deletePhotoStorage,
  deletePhotos as deletePhotosStorage,
  getStorageInfo,
  switchStorage,
  exportDatabaseFile,
  importDatabaseFile,
  getDatabaseStats,
  clearAllCustomData
} from '../utils/storage';
import { StorageType } from '../utils/storageConfig';

/**
 * 图片管理页面
 * 支持上传、编辑、删除、批量管理照片
 * 使用统一存储接口：SQLite（默认）/MySQL/PostgreSQL
 * 所有图片数据均来自数据库，无内置图片数据
 */
const PhotoManager = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  // 从数据库加载的图片
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 视图模式
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  // 搜索状态
  const [searchQuery, setSearchQuery] = useState('');

  // 选择模式
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // 编辑弹窗
  const [editModal, setEditModal] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);

  // 存储设置
  const [showStorageSettings, setShowStorageSettings] = useState(false);
  const [storageInfo, setStorageInfo] = useState(getStorageInfo());

  // 通知
  const [notification, setNotification] = useState(null);

  // 数据库统计
  const [dbStats, setDbStats] = useState(null);

  // 文件输入引用
  const fileInputRef = useRef(null);

  // 显示通知
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // 从数据库加载图片
  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPhotos();
      console.log('loadPhotos: 从数据库加载', data.length, '张图片');
      setPhotos(data);
    } catch (error) {
      console.error('加载图片失败:', error);
      showNotification('加载图片失败', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // 加载数据库统计
  const loadDbStats = useCallback(async () => {
    if (storageInfo.currentType === 'local_sqlite' || storageInfo.currentType === 'sqlite') {
      try {
        const stats = await getDatabaseStats();
        setDbStats(stats);
      } catch (error) {
        console.error('获取数据库统计失败:', error);
      }
    }
  }, [storageInfo.currentType]);

  // 初始加载
  useEffect(() => {
    loadPhotos();
    loadDbStats();
  }, [loadPhotos, loadDbStats]);

  // 监听存储类型变化重新加载
  useEffect(() => {
    const handleStorageChange = () => {
      setStorageInfo(getStorageInfo());
      loadPhotos();
      loadDbStats();
    };

    window.addEventListener('storageTypeChanged', handleStorageChange);
    return () => window.removeEventListener('storageTypeChanged', handleStorageChange);
  }, [loadPhotos, loadDbStats]);

  // 处理上传完成
  const handleUploadComplete = async (uploadedPhotos) => {
    try {
      await savePhotos(uploadedPhotos);
      await loadPhotos();
      await loadDbStats();
      showNotification(`成功上传 ${uploadedPhotos.length} 张图片`);
    } catch (error) {
      console.error('上传失败:', error);
      showNotification('上传失败', 'error');
    }
  };

  // 导出数据库
  const handleExportDatabase = async () => {
    try {
      const result = await exportDatabaseFile();
      if (result.success) {
        showNotification('数据库导出成功');
      } else {
        showNotification(result.message || '导出失败', 'error');
      }
    } catch (error) {
      console.error('导出失败:', error);
      showNotification('导出失败', 'error');
    }
  };

  // 导入数据库
  const handleImportDatabase = async (file) => {
    if (!file) return;

    try {
      const result = await importDatabaseFile(file);
      if (result.success) {
        await loadPhotos();
        await loadDbStats();
        showNotification('数据库导入成功，请刷新页面');
      } else {
        showNotification(result.message || '导入失败', 'error');
      }
    } catch (error) {
      console.error('导入失败:', error);
      showNotification('导入失败', 'error');
    }
  };

  // 清空数据
  const handleClearData = async () => {
    if (!confirm('确定要清空所有图片吗？此操作不可恢复！')) return;

    try {
      const result = await clearAllCustomData();
      if (result.success) {
        await loadPhotos();
        await loadDbStats();
        showNotification('数据已清空');
      } else {
        showNotification(result.message || '清空失败', 'error');
      }
    } catch (error) {
      console.error('清空失败:', error);
      showNotification('清空失败', 'error');
    }
  };

  // 删除照片
  const deletePhotoHandler = async (id) => {
    if (!confirm('确定要删除这张照片吗？')) return;

    try {
      await deletePhotoStorage(id);
      await loadPhotos();
      await loadDbStats();
      showNotification('图片已删除');
      if (editModal?.id === id) {
        setEditModal(null);
      }
    } catch (error) {
      console.error('删除失败:', error);
      showNotification('删除失败', 'error');
    }
  };

  // 批量删除
  const deleteSelected = async () => {
    if (!confirm(`确定要删除选中的 ${selectedIds.size} 张照片吗？`)) return;

    try {
      await deletePhotosStorage(selectedIds);
      await loadPhotos();
      await loadDbStats();
      setSelectedIds(new Set());
      setSelectionMode(false);
      showNotification(`已删除 ${selectedIds.size} 张图片`);
    } catch (error) {
      console.error('批量删除失败:', error);
      showNotification('删除失败', 'error');
    }
  };

  // 编辑照片
  const openEditModal = (photo) => {
    setEditingPhoto({ ...photo });
    setEditModal(photo.id);
  };

  // 保存编辑
  const saveEdit = async () => {
    if (!editingPhoto) return;

    try {
      await updatePhoto(editingPhoto);
      await loadPhotos();
      setEditModal(null);
      setEditingPhoto(null);
      showNotification('图片信息已更新');
    } catch (error) {
      console.error('保存失败:', error);
      showNotification('保存失败', 'error');
    }
  };

  // 选择/取消选择
  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    const allIds = photos.map(p => p.id);

    if (allIds.every(id => selectedIds.has(id))) {
      // 取消全选
      setSelectedIds(new Set());
    } else {
      // 全选
      setSelectedIds(new Set(allIds));
    }
  };

  // 切换存储方式
  const handleStorageSwitch = (newType) => {
    const result = switchStorage(newType);
    if (result.success) {
      showNotification(result.message, 'success');
      setStorageInfo(getStorageInfo());
      // 触发重新加载
      window.dispatchEvent(new Event('storageTypeChanged'));
    }
  };

  // 存储方式选项
  const storageOptions = [
    {
      value: StorageType.LOCAL_SQLITE,
      label: '本地 SQLite',
      desc: '本地文件 SQLite（推荐）',
      icon: 'fa-hdd',
      enabled: storageInfo.config.localSqlite.enabled
    },
    {
      value: StorageType.SQLITE,
      label: 'SQLite',
      desc: '浏览器端 SQLite 数据库',
      icon: 'fa-database',
      enabled: storageInfo.config.sqlite.enabled
    },
    {
      value: StorageType.MYSQL,
      label: 'MySQL',
      desc: '需要配置后端 API',
      icon: 'fa-server',
      enabled: storageInfo.config.mysql.enabled
    },
    {
      value: StorageType.POSTGRESQL,
      label: 'PostgreSQL',
      desc: '需要配置后端 API',
      icon: 'fa-server',
      enabled: storageInfo.config.postgresql.enabled
    }
  ];

  // 搜索过滤后的照片
  const filteredPhotos = photos.filter(photo => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        photo.title?.toLowerCase().includes(query) ||
        photo.location?.toLowerCase().includes(query) ||
        photo.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // 统计
  const stats = {
    total: photos.length
  };

  return (
    <section className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* 页面头部 */}
      <div className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'} ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/diary')}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  图片管理
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  共 {stats.total} 张图片
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                    isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {storageInfo.currentType === 'local_sqlite' ? '本地 SQLite' :
                     storageInfo.currentType === 'sqlite' ? 'SQLite' :
                     storageInfo.currentType === 'mysql' ? 'MySQL' :
                     storageInfo.currentType === 'postgresql' ? 'PostgreSQL' : '本地存储'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* 存储设置按钮 */}
              <button
                onClick={() => setShowStorageSettings(!showStorageSettings)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                title="存储设置"
              >
                <i className="fas fa-cog"></i>
              </button>

              {/* 选择模式开关 */}
              <button
                onClick={() => {
                  setSelectionMode(!selectionMode);
                  setSelectedIds(new Set());
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectionMode
                    ? 'bg-purple-500 text-white'
                    : isDark
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <i className="fas fa-check-square mr-2"></i>
                {selectionMode ? '退出选择' : '批量管理'}
              </button>

              {/* 视图切换 */}
              <div className={`flex rounded-lg overflow-hidden ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-purple-500 text-white'
                      : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-purple-500 text-white'
                      : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          {/* 存储设置面板 */}
          {showStorageSettings && (
            <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <i className="fas fa-database text-purple-400"></i>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>存储方式</span>
                </div>
                {dbStats && (storageInfo.currentType === 'local_sqlite' || storageInfo.currentType === 'sqlite') && (
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {dbStats.photos} 张图片 · {dbStats.sizeKB} KB
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {storageOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => option.enabled && handleStorageSwitch(option.value)}
                    disabled={!option.enabled}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      storageInfo.currentType === option.value
                        ? 'bg-purple-500 text-white'
                        : option.enabled
                          ? isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-gray-200'
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <i className={`fas ${option.icon}`}></i>
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* SQLite 专属操作 */}
              {(storageInfo.currentType === 'local_sqlite' || storageInfo.currentType === 'sqlite') && (
                <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    数据库操作
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleExportDatabase}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark
                          ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      <i className="fas fa-download mr-2"></i>
                      导出数据库
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      <i className="fas fa-upload mr-2"></i>
                      导入数据库
                    </button>
                    <button
                      onClick={handleClearData}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      <i className="fas fa-trash mr-2"></i>
                      清空数据
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".db,.sqlite,.sqlite3"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImportDatabase(file);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* 工具栏 */}
          <div className="flex flex-wrap items-center gap-4">
            {/* 搜索 */}
            <div className={`flex-1 min-w-[200px] flex items-center gap-3 px-4 py-2 rounded-lg ${
              isDark ? 'bg-white/5' : 'bg-gray-100'
            }`}>
              <i className="fas fa-search text-gray-500"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索标题、地点、标签..."
                className={`flex-1 bg-transparent outline-none ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
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
            <i className={`fas ${
              notification.type === 'error' ? 'fa-exclamation-circle' :
              notification.type === 'info' ? 'fa-info-circle' :
              'fa-check-circle'
            } mr-2`}></i>
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 批量操作栏 */}
      <AnimatePresence>
        {selectionMode && selectedIds.size > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-purple-500"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <span className="text-white">
                已选择 <span className="font-semibold">{selectedIds.size}</span> 张图片
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSelectAll}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                >
                  全选
                </button>
                <button
                  onClick={deleteSelected}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <i className="fas fa-trash mr-2"></i>
                  删除
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 上传区域 */}
        <div className="mb-10">
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-cloud-upload-alt text-purple-400"></i>
            上传新图片
          </h2>
          <PhotoUpload onUploadComplete={handleUploadComplete} />
        </div>

        {/* 图片列表 */}
        <div>
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <i className="fas fa-images text-blue-400"></i>
            图片库
          </h2>

          {isLoading ? (
            <div className="text-center py-20">
              <i className="fas fa-spinner fa-spin text-4xl text-purple-400 mb-4"></i>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>加载中...</p>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-folder-open text-6xl text-gray-600 mb-4"></i>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>暂无图片</p>
            </div>
          ) : viewMode === 'grid' ? (
            /* 网格视图 */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredPhotos.map(photo => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative group rounded-xl overflow-hidden ${
                    isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* 图片 */}
                  <div className="relative aspect-[4/3]">
                    <img
                      src={photo.img}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />

                    {/* 悬停遮罩 */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 flex items-center justify-center gap-3">
                        <button
                          onClick={() => openEditModal(photo)}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                          title="编辑"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <Link
                          to="/diary/gallery"
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                          title="查看"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <button
                          onClick={() => deletePhotoHandler(photo.id)}
                          className="w-10 h-10 rounded-full bg-red-500/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                          title="删除"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    {/* 选择模式 */}
                    {selectionMode && (
                      <div className="absolute top-2 left-2">
                        <button
                          onClick={() => toggleSelect(photo.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            selectedIds.has(photo.id)
                              ? 'bg-purple-500 text-white'
                              : 'bg-black/50 text-white'
                          }`}
                        >
                          {selectedIds.has(photo.id) && <i className="fas fa-check text-sm"></i>}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 信息 */}
                  <div className="p-3">
                    <h3 className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {photo.title}
                    </h3>
                    <p className={`text-xs text-gray-500 truncate`}>
                      {photo.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* 列表视图 */
            <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`flex items-center gap-4 p-4 transition-colors hover:bg-white/5 ${
                    index !== filteredPhotos.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  {/* 选择框 */}
                  {selectionMode && (
                    <button
                      onClick={() => toggleSelect(photo.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedIds.has(photo.id)
                          ? 'bg-purple-500 border-purple-500 text-white'
                          : isDark
                            ? 'border-white/20'
                            : 'border-gray-300'
                      }`}
                    >
                      {selectedIds.has(photo.id) && <i className="fas fa-check text-xs"></i>}
                    </button>
                  )}

                  {/* 缩略图 */}
                  <img
                    src={photo.img}
                    alt={photo.title}
                    className="w-20 h-16 object-cover rounded-lg"
                  />

                  {/* 信息 */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {photo.title}
                    </h3>
                    <p className={`text-sm text-gray-500`}>
                      {photo.location} · {photo.date}
                    </p>
                  </div>

                  {/* 标签 */}
                  <div className="hidden md:flex flex-wrap gap-2">
                    {photo.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full ${
                          isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 操作 */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(photo)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark
                          ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => deletePhotoHandler(photo.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark
                          ? 'hover:bg-red-500/20 text-gray-400 hover:text-red-400'
                          : 'hover:bg-red-50 text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 编辑弹窗 */}
      <AnimatePresence>
        {editModal && editingPhoto && (
          <>
            {/* 遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setEditModal(null)}
            />

            {/* 弹窗 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div
                className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${
                  isDark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'
                }`}
                onClick={e => e.stopPropagation()}
              >
                {/* 头部 */}
                <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    编辑图片信息
                  </h2>
                  <button
                    onClick={() => setEditModal(null)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                {/* 内容 */}
                <div className="p-6 space-y-4">
                  {/* 预览 */}
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={editingPhoto.img}
                      alt={editingPhoto.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 标题 */}
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      标题
                    </label>
                    <input
                      type="text"
                      value={editingPhoto.title || ''}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
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
                        地点
                      </label>
                      <input
                        type="text"
                        value={editingPhoto.location || ''}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                            : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        年份
                      </label>
                      <input
                        type="text"
                        value={editingPhoto.date || ''}
                        onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
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
                      {(editingPhoto.tags || []).map(tag => (
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
                            onClick={() => {
                              setEditingPhoto({
                                ...editingPhoto,
                                tags: editingPhoto.tags.filter(t => t !== tag)
                              });
                            }}
                            className="hover:text-red-400"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="输入标签后按回车..."
                      className={`w-full px-4 py-2 rounded-lg outline-none transition-colors ${
                        isDark
                          ? 'bg-white/5 border border-white/10 text-white focus:border-purple-500'
                          : 'bg-gray-100 border border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          setEditingPhoto({
                            ...editingPhoto,
                            tags: [...(editingPhoto.tags || []), e.target.value.trim()]
                          });
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* 底部按钮 */}
                <div className={`flex items-center gap-3 px-6 py-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <button
                    onClick={saveEdit}
                    className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    保存更改
                  </button>
                  <button
                    onClick={() => setEditModal(null)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    取消
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoManager;
