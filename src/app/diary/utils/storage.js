/**
 * 统一存储接口
 * 支持：本地 SQLite API（推荐）、sql.js（浏览器端）、MySQL、PostgreSQL
 * 根据 storageConfig.js 中的配置自动选择存储方式
 */

import { storageConfig, StorageType } from './storageConfig.js';
import * as localStorageSQLite from './localStorageSQLite.js';

// ============ 本地 SQLite API 实现 ============

const loadLocalStorageSQLite = () => localStorageSQLite;

// ============ sql.js 实现（浏览器端） ============

let sqliteAdapter = null;

const loadSqliteAdapter = async () => {
  if (!sqliteAdapter) {
    sqliteAdapter = await import('./sqliteAdapter.js');
  }
  return sqliteAdapter;
};

// ============ 辅助函数：判断是否使用 API ============

const useLocalApi = () => storageConfig.type === StorageType.LOCAL_SQLITE;
const useSqlJs = () => storageConfig.type === StorageType.SQLITE;

// ============ 图片管理操作 ============

/**
 * 批量保存图片
 */
export const savePhotos = async (photos) => {
  const type = storageConfig.type;

  if (useLocalApi()) {
    // 本地 SQLite API（推荐）
    return await loadLocalStorageSQLite().savePhotosLocalStorageSQLite(photos);
  }

  if (useSqlJs()) {
    // sql.js（浏览器端）
    return await savePhotosSqlJs(photos);
  }

  // 其他存储类型暂未实现
  throw new Error(`未实现的存储类型: ${type}`);
};

const savePhotosSqlJs = async (photos) => {
  const adapter = await loadSqliteAdapter();
  return await adapter.savePhotosSQLite(photos);
};

/**
 * 获取所有图片
 */
export const getPhotos = async () => {
  const type = storageConfig.type;

  if (useLocalApi()) {
    // 本地 SQLite API
    return await loadLocalStorageSQLite().getPhotosLocalStorageSQLite();
  }

  if (useSqlJs()) {
    // sql.js
    return await getPhotosSqlJs();
  }

  throw new Error(`未实现的存储类型: ${type}`);
};

const getPhotosSqlJs = async () => {
  const adapter = await loadSqliteAdapter();
  return await adapter.getPhotosSQLite();
};

/**
 * 更新图片信息
 */
export const updatePhoto = async (photo) => {
  const type = storageConfig.type;

  if (useLocalApi()) {
    return await loadLocalStorageSQLite().updatePhotoLocalStorageSQLite(photo);
  }

  if (useSqlJs()) {
    return await updatePhotoSqlJs(photo);
  }

  throw new Error(`未实现的存储类型: ${type}`);
};

const updatePhotoSqlJs = async (photo) => {
  const adapter = await loadSqliteAdapter();
  return await adapter.updatePhotoSQLite(photo);
};

/**
 * 删除单张图片
 */
export const deletePhoto = async (id) => {
  const type = storageConfig.type;

  if (useLocalApi()) {
    return await loadLocalStorageSQLite().deletePhotoLocalStorageSQLite(id);
  }

  if (useSqlJs()) {
    return await deletePhotoSqlJs(id);
  }

  throw new Error(`未实现的存储类型: ${type}`);
};

const deletePhotoSqlJs = async (id) => {
  const adapter = await loadSqliteAdapter();
  return await adapter.deletePhotoSQLite(id);
};

/**
 * 批量删除图片
 */
export const deletePhotos = async (ids) => {
  const type = storageConfig.type;

  if (useLocalApi()) {
    return await loadLocalStorageSQLite().deletePhotosLocalStorageSQLite(ids);
  }

  if (useSqlJs()) {
    return await deletePhotosSqlJs(ids);
  }

  throw new Error(`未实现的存储类型: ${type}`);
};

const deletePhotosSqlJs = async (ids) => {
  const adapter = await loadSqliteAdapter();
  return await adapter.deletePhotosSQLite(Array.from(ids));
};

// ============ 数据库统计功能 ============

/**
 * 获取数据库统计信息
 */
export const getDatabaseStats = async () => {
  if (useLocalApi()) {
    return await loadLocalStorageSQLite().getStatsLocalStorageSQLite();
  }

  if (useSqlJs()) {
    const adapter = await loadSqliteAdapter();
    return await adapter.getDatabaseStats();
  }

  return { plans: 0, photos: 0, sizeBytes: 0, sizeKB: '0' };
};

/**
 * 导出数据库文件（仅 sql.js 支持）
 */
export const exportDatabaseFile = async () => {
  if (useLocalApi()) {
    return {
      success: false,
      message: '本地 SQLite API 的数据已存储在 database/travel_photos.db 文件中'
    };
  }

  if (useSqlJs()) {
    const adapter = await loadSqliteAdapter();
    const result = await adapter.exportDatabaseFile();
    return { success: result, message: result ? '导出成功' : '导出失败' };
  }

  return { success: false, message: '当前存储类型不支持导出' };
};

/**
 * 导入数据库文件（仅 sql.js 支持）
 */
export const importDatabaseFile = async (file) => {
  if (useLocalApi()) {
    return {
      success: false,
      message: '本地 SQLite API 不支持导入，请直接复制 database/travel_photos.db 文件'
    };
  }

  if (useSqlJs()) {
    const adapter = await loadSqliteAdapter();
    return await adapter.importDatabaseFile(file);
  }

  return { success: false, message: '当前存储类型不支持导入' };
};

/**
 * 清空所有自定义数据
 */
export const clearAllCustomData = async () => {
  if (useLocalApi()) {
    await loadLocalStorageSQLite().clearAllLocalStorageSQLite();
    return { success: true, message: '数据已清空' };
  }

  if (useSqlJs()) {
    const adapter = await loadSqliteAdapter();
    return await adapter.clearAllCustomData();
  }

  return { success: false, message: '当前存储类型不支持清空操作' };
};

// ============ 旅行计划操作 ============

const PLANS_STORAGE_KEY = 'travel_plans';

/**
 * 保存旅行计划
 */
export const saveTravelPlan = async (plan) => {
  if (useLocalApi()) {
    // 本地 SQLite API（推荐）
    return await loadLocalStorageSQLite().saveTravelPlanLocalStorageSQLite(plan);
  }

  // 回退到 localStorage
  try {
    const existingPlans = JSON.parse(localStorage.getItem(PLANS_STORAGE_KEY) || '[]');

    // 检查是否已存在相同 ID 的计划
    const existingIndex = existingPlans.findIndex(p => p.id === plan.id);
    if (existingIndex >= 0) {
      existingPlans[existingIndex] = plan;
    } else {
      existingPlans.push(plan);
    }

    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(existingPlans));
    return { success: true, data: plan };
  } catch (error) {
    console.error('保存旅行计划失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 获取所有旅行计划
 */
export const getTravelPlans = async () => {
  if (useLocalApi()) {
    // 本地 SQLite API（推荐）
    return await loadLocalStorageSQLite().getTravelPlansLocalStorageSQLite();
  }

  // 回退到 localStorage
  try {
    const plans = JSON.parse(localStorage.getItem(PLANS_STORAGE_KEY) || '[]');
    return plans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('获取旅行计划失败:', error);
    return [];
  }
};

/**
 * 删除旅行计划
 */
export const deleteTravelPlan = async (planId) => {
  if (useLocalApi()) {
    // 本地 SQLite API（推荐）
    return await loadLocalStorageSQLite().deleteTravelPlanLocalStorageSQLite(planId);
  }

  // 回退到 localStorage
  try {
    const existingPlans = JSON.parse(localStorage.getItem(PLANS_STORAGE_KEY) || '[]');
    const filteredPlans = existingPlans.filter(p => p.id !== planId);
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(filteredPlans));
    return { success: true };
  } catch (error) {
    console.error('删除旅行计划失败:', error);
    return { success: false, error: error.message };
  }
};

// ============ 存储管理功能 ============

/**
 * 获取存储配置信息
 */
export const getStorageInfo = () => {
  return {
    currentType: storageConfig.type,
    isAsync: true,
    config: {
      localSqlite: storageConfig.localSqlite,
      sqlite: storageConfig.sqlite,
      mysql: storageConfig.mysql,
      postgresql: storageConfig.postgresql
    }
  };
};

/**
 * 切换存储方式
 */
export const switchStorage = (newType) => {
  if (!Object.values(StorageType).includes(newType)) {
    return {
      success: false,
      message: `不支持的存储类型: ${newType}`
    };
  }

  // 检查是否启用
  const isEnabled = newType === StorageType.LOCAL_SQLITE
    ? storageConfig.localSqlite.enabled
    : newType === StorageType.SQLITE
      ? storageConfig.sqlite.enabled
      : newType === StorageType.MYSQL
        ? storageConfig.mysql.enabled
        : storageConfig.postgresql.enabled;

  if (!isEnabled) {
    return {
      success: false,
      message: `${newType} 未启用`
    };
  }

  storageConfig.type = newType;
  window.dispatchEvent(new Event('storageTypeChanged'));

  return {
    success: true,
    message: `存储方式已切换到 ${newType}`
  };
};

// 默认导出
export default {
  getStorageInfo,
  switchStorage,
  // 图片操作
  savePhotos,
  getPhotos,
  updatePhoto,
  deletePhoto,
  deletePhotos,
  // 旅行计划操作
  saveTravelPlan,
  getTravelPlans,
  deleteTravelPlan,
  // 数据库操作
  exportDatabaseFile,
  importDatabaseFile,
  getDatabaseStats,
  clearAllCustomData
};
