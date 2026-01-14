/**
 * 统一存储接口
 * 支持：SQLite（默认）、MySQL、PostgreSQL
 * 根据 storageConfig.js 中的配置自动选择存储方式
 */

import { storageConfig, StorageType } from './storageConfig.js';

// ============ SQLite 实现（异步） ============

let sqliteAdapter = null;

const loadSQLiteAdapter = async () => {
  if (!sqliteAdapter) {
    sqliteAdapter = await import('./sqliteAdapter.js');
  }
  return sqliteAdapter;
};

// ============ 旅行计划操作 ============

/**
 * 保存旅行计划
 * 根据配置自动选择存储方式
 */
export const saveTravelPlan = async (plan) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await saveTravelPlanSQLite(plan);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await saveTravelPlanAPI(plan, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await saveTravelPlanAPI(plan, StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const saveTravelPlanSQLite = async (plan) => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.saveTravelPlanSQLite(plan);
};

const saveTravelPlanAPI = async (plan, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/plans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plan)
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }

  return await response.json();
};

/**
 * 获取所有旅行计划
 */
export const getTravelPlans = async () => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await getTravelPlansSQLite();

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await getTravelPlansAPI(StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await getTravelPlansAPI(StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const getTravelPlansSQLite = async () => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.getTravelPlansSQLite();
};

const getTravelPlansAPI = async (type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/plans`);
  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }

  return await response.json();
};

/**
 * 删除旅行计划
 */
export const deleteTravelPlan = async (id) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await deleteTravelPlanSQLite(id);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await deleteTravelPlanAPI(id, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await deleteTravelPlanAPI(id, StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const deleteTravelPlanSQLite = async (id) => {
  const adapter = await loadSQLiteAdapter();
  await adapter.deleteTravelPlanSQLite(id);
};

const deleteTravelPlanAPI = async (id, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/plans/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }
};

/**
 * 获取单个旅行计划
 */
export const getTravelPlan = async (id) => {
  const plans = await getTravelPlans();
  return plans.find(plan => plan.id === id);
};

// ============ 图片管理操作 ============

/**
 * 保存单张图片
 * 根据配置自动选择存储方式
 */
export const savePhoto = async (photo) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await savePhotoSQLite(photo);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await savePhotoAPI(photo, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await savePhotoAPI(photo, StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const savePhotoSQLite = async (photo) => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.savePhotoSQLite(photo);
};

const savePhotoAPI = async (photo, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo)
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }

  return await response.json();
};

/**
 * 批量保存图片
 */
export const savePhotos = async (photos) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await savePhotosSQLite(photos);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await savePhotosAPI(photos, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await savePhotosAPI(photos, StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const savePhotosSQLite = async (photos) => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.savePhotosSQLite(photos);
};

const savePhotosAPI = async (photos, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/photos/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ photos })
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }

  return await response.json();
};

/**
 * 获取所有自定义图片
 */
export const getPhotos = async () => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await getPhotosSQLite();

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await getPhotosAPI(StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await getPhotosAPI(StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const getPhotosSQLite = async () => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.getPhotosSQLite();
};

const getPhotosAPI = async (type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/photos`);
  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }

  return await response.json();
};

/**
 * 更新图片信息
 */
export const updatePhoto = async (photo) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await updatePhotoSQLite(photo);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await updatePhotoAPI(photo, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await updatePhotoAPI(photo, StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const updatePhotoSQLite = async (photo) => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.updatePhotoSQLite(photo);
};

const updatePhotoAPI = async (photo, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/photos/${photo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(photo)
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }

  return await response.json();
};

/**
 * 删除单张图片
 */
export const deletePhoto = async (id) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await deletePhotoSQLite(id);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await deletePhotoAPI(id, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await deletePhotoAPI(id, StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const deletePhotoSQLite = async (id) => {
  const adapter = await loadSQLiteAdapter();
  await adapter.deletePhotoSQLite(id);
};

const deletePhotoAPI = async (id, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/photos/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }
};

/**
 * 批量删除图片
 */
export const deletePhotos = async (ids) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        throw new Error('SQLite 未启用');
      }
      return await deletePhotosSQLite(ids);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        throw new Error('MySQL 未启用');
      }
      return await deletePhotosAPI(ids, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        throw new Error('PostgreSQL 未启用');
      }
      return await deletePhotosAPI(ids, StorageType.POSTGRESQL);

    default:
      throw new Error(`未知的存储类型: ${type}`);
  }
};

const deletePhotosSQLite = async (ids) => {
  const adapter = await loadSQLiteAdapter();
  await adapter.deletePhotosSQLite(Array.from(ids));
};

const deletePhotosAPI = async (ids, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  const response = await fetch(`${config.apiUrl}/photos/batch`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: Array.from(ids) })
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }
};

// ============ 数据库导出/导入功能（仅 SQLite） ============

/**
 * 导出数据库文件
 * 只有 SQLite 存储支持导出为文件
 */
export const exportDatabaseFile = async () => {
  if (storageConfig.type !== StorageType.SQLITE) {
    return {
      success: false,
      message: '只有 SQLite 模式支持导出数据库文件'
    };
  }

  try {
    const adapter = await loadSQLiteAdapter();
    const result = adapter.exportDatabaseFile();
    return { success: result, message: result ? '导出成功' : '导出失败' };
  } catch (error) {
    console.error('导出数据库失败:', error);
    return { success: false, message: `导出失败: ${error.message}` };
  }
};

/**
 * 导入数据库文件
 * 只有 SQLite 存储支持导入
 */
export const importDatabaseFile = async (file) => {
  if (storageConfig.type !== StorageType.SQLITE) {
    return {
      success: false,
      message: '只有 SQLite 模式支持导入数据库文件'
    };
  }

  try {
    const adapter = await loadSQLiteAdapter();
    const result = await adapter.importDatabaseFile(file);
    return result;
  } catch (error) {
    console.error('导入数据库失败:', error);
    return { success: false, message: `导入失败: ${error.message}` };
  }
};

/**
 * 获取数据库统计信息
 */
export const getDatabaseStats = async () => {
  if (storageConfig.type !== StorageType.SQLITE) {
    return { plans: 0, photos: 0, sizeBytes: 0, sizeKB: '0' };
  }

  try {
    const adapter = await loadSQLiteAdapter();
    return await adapter.getDatabaseStats();
  } catch (error) {
    console.error('获取数据库统计失败:', error);
    return { plans: 0, photos: 0, sizeBytes: 0, sizeKB: '0' };
  }
};

/**
 * 清空所有自定义数据
 */
export const clearAllCustomData = async () => {
  if (storageConfig.type === StorageType.SQLITE) {
    try {
      const adapter = await loadSQLiteAdapter();
      return await adapter.clearAllCustomData();
    } catch (error) {
      return { success: false, message: `清空失败: ${error.message}` };
    }
  } else {
    // API 模式需要通过 API 清空
    const config = storageConfig.type === StorageType.MYSQL
      ? storageConfig.mysql
      : storageConfig.postgresql;

    try {
      const response = await fetch(`${config.apiUrl}/clear`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      return { success: true, message: '数据已清空' };
    } catch (error) {
      return { success: false, message: `清空失败: ${error.message}` };
    }
  }
};

// ============ 存储管理功能 ============

/**
 * 导出存储配置信息
 */
export const getStorageInfo = () => {
  return {
    currentType: storageConfig.type,
    isAsync: true, // 所有存储方式都是异步的
    config: {
      sqlite: storageConfig.sqlite.enabled,
      mysql: storageConfig.mysql.enabled,
      postgresql: storageConfig.postgresql.enabled
    }
  };
};

/**
 * 切换存储方式
 * @param {string} newType - 新的存储类型
 * @returns {Object} { success, message }
 */
export const switchStorage = (newType) => {
  if (!Object.values(StorageType).includes(newType)) {
    return {
      success: false,
      message: `不支持的存储类型: ${newType}`
    };
  }

  // 检查目标存储是否启用
  const isEnabled = newType === StorageType.SQLITE
    ? storageConfig.sqlite.enabled
    : newType === StorageType.MYSQL
      ? storageConfig.mysql.enabled
      : storageConfig.postgresql.enabled;

  if (!isEnabled) {
    return {
      success: false,
      message: `${newType} 未启用，请先在配置中启用`
    };
  }

  storageConfig.type = newType;

  // 触发切换事件
  window.dispatchEvent(new Event('storageTypeChanged'));

  return {
    success: true,
    message: `存储方式已切换到 ${newType}，请刷新页面生效`
  };
};

// 默认导出
export default {
  saveTravelPlan,
  getTravelPlans,
  deleteTravelPlan,
  getTravelPlan,
  getStorageInfo,
  switchStorage,
  savePhoto,
  savePhotos,
  getPhotos,
  updatePhoto,
  deletePhoto,
  deletePhotos,
  exportDatabaseFile,
  importDatabaseFile,
  getDatabaseStats,
  clearAllCustomData
};
