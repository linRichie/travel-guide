/**
 * 本地存储工具 - 统一接口
 * 支持 localStorage（默认）、SQLite、MySQL、PostgreSQL
 * 根据 storageConfig.js 中的配置自动选择存储方式
 */

import { storageConfig, StorageType, isAsyncStorage } from './storageConfig.js';

// ============ localStorage 实现（同步） ============

const saveTravelPlanLocalStorage = (plan) => {
  const plans = getTravelPlansLocalStorage();
  const newPlan = {
    ...plan,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  plans.unshift(newPlan);
  localStorage.setItem('travelPlans', JSON.stringify(plans));
  return newPlan;
};

const getTravelPlansLocalStorage = () => {
  try {
    const plans = localStorage.getItem('travelPlans');
    return plans ? JSON.parse(plans) : [];
  } catch {
    return [];
  }
};

const deleteTravelPlanLocalStorage = (id) => {
  const plans = getTravelPlansLocalStorage();
  const filtered = plans.filter(plan => plan.id !== id);
  localStorage.setItem('travelPlans', JSON.stringify(filtered));
};

const getTravelPlanLocalStorage = (id) => {
  const plans = getTravelPlansLocalStorage();
  return plans.find(plan => plan.id === id);
};

// ============ SQLite 实现（异步） ============

let sqliteAdapter = null;

const loadSQLiteAdapter = async () => {
  if (!sqliteAdapter) {
    sqliteAdapter = await import('./sqliteAdapter.js');
  }
  return sqliteAdapter;
};

const saveTravelPlanSQLite = async (plan) => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.saveTravelPlanSQLite(plan);
};

const getTravelPlansSQLite = async () => {
  const adapter = await loadSQLiteAdapter();
  return await adapter.getTravelPlansSQLite();
};

const deleteTravelPlanSQLite = async (id) => {
  const adapter = await loadSQLiteAdapter();
  await adapter.deleteTravelPlanSQLite(id);
};

// ============ MySQL/PostgreSQL 实现（异步，需要后端） ============

const saveTravelPlanAPI = async (plan, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  try {
    const response = await fetch(`${config.apiUrl}/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    });

    if (!response.ok) throw new Error(`API 请求失败: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`${type} 保存失败:`, error);
    // 降级到 localStorage
    return saveTravelPlanLocalStorage(plan);
  }
};

const getTravelPlansAPI = async (type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  try {
    const response = await fetch(`${config.apiUrl}/plans`);
    if (!response.ok) throw new Error(`API 请求失败: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`${type} 获取失败:`, error);
    // 降级到 localStorage
    return getTravelPlansLocalStorage();
  }
};

const deleteTravelPlanAPI = async (id, type) => {
  const config = type === StorageType.MYSQL ? storageConfig.mysql : storageConfig.postgresql;

  try {
    const response = await fetch(`${config.apiUrl}/plans/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`API 请求失败: ${response.status}`);
  } catch (error) {
    console.error(`${type} 删除失败:`, error);
    // 降级到 localStorage
    deleteTravelPlanLocalStorage(id);
  }
};

// ============ 统一导出接口 ============

/**
 * 保存旅行计划
 * 根据配置自动选择存储方式
 */
export const saveTravelPlan = async (plan) => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        console.warn('SQLite 未启用，使用 localStorage');
        return saveTravelPlanLocalStorage(plan);
      }
      return await saveTravelPlanSQLite(plan);

    case StorageType.MYSQL:
      if (!storageConfig.mysql.enabled) {
        console.warn('MySQL 未启用，使用 localStorage');
        return saveTravelPlanLocalStorage(plan);
      }
      return await saveTravelPlanAPI(plan, StorageType.MYSQL);

    case StorageType.POSTGRESQL:
      if (!storageConfig.postgresql.enabled) {
        console.warn('PostgreSQL 未启用，使用 localStorage');
        return saveTravelPlanLocalStorage(plan);
      }
      return await saveTravelPlanAPI(plan, StorageType.POSTGRESQL);

    case StorageType.LOCAL_STORAGE:
    default:
      return saveTravelPlanLocalStorage(plan);
  }
};

/**
 * 获取所有旅行计划
 */
export const getTravelPlans = async () => {
  const type = storageConfig.type;

  // 如果是异步存储，使用异步方法
  if (isAsyncStorage()) {
    switch (type) {
      case StorageType.SQLITE:
        if (!storageConfig.sqlite.enabled) {
          return getTravelPlansLocalStorage();
        }
        return await getTravelPlansSQLite();

      case StorageType.MYSQL:
        if (!storageConfig.mysql.enabled) {
          return getTravelPlansLocalStorage();
        }
        return await getTravelPlansAPI(StorageType.MYSQL);

      case StorageType.POSTGRESQL:
        if (!storageConfig.postgresql.enabled) {
          return getTravelPlansLocalStorage();
        }
        return await getTravelPlansAPI(StorageType.POSTGRESQL);
    }
  }

  // 同步存储（localStorage）
  return getTravelPlansLocalStorage();
};

// 同步版本（用于兼容现有代码）
export const getTravelPlansSync = () => {
  return getTravelPlansLocalStorage();
};

/**
 * 删除旅行计划
 */
export const deleteTravelPlan = async (id) => {
  const type = storageConfig.type;

  if (isAsyncStorage()) {
    switch (type) {
      case StorageType.SQLITE:
        if (!storageConfig.sqlite.enabled) {
          deleteTravelPlanLocalStorage(id);
          return;
        }
        return await deleteTravelPlanSQLite(id);

      case StorageType.MYSQL:
        if (!storageConfig.mysql.enabled) {
          deleteTravelPlanLocalStorage(id);
          return;
        }
        return await deleteTravelPlanAPI(id, StorageType.MYSQL);

      case StorageType.POSTGRESQL:
        if (!storageConfig.postgresql.enabled) {
          deleteTravelPlanLocalStorage(id);
          return;
        }
        return await deleteTravelPlanAPI(id, StorageType.POSTGRESQL);
    }
  }

  deleteTravelPlanLocalStorage(id);
};

// 同步版本（用于兼容现有代码）
export const deleteTravelPlanSync = (id) => {
  deleteTravelPlanLocalStorage(id);
};

/**
 * 获取单个旅行计划
 */
export const getTravelPlan = async (id) => {
  const plans = await getTravelPlans();
  return plans.find(plan => plan.id === id);
};

// 同步版本（用于兼容现有代码）
export const getTravelPlanSync = (id) => {
  return getTravelPlanLocalStorage(id);
};

/**
 * 导出存储配置信息
 */
export const getStorageInfo = () => {
  return {
    currentType: storageConfig.type,
    isAsync: isAsyncStorage(),
    config: {
      sqlite: storageConfig.sqlite.enabled,
      mysql: storageConfig.mysql.enabled,
      postgresql: storageConfig.postgresql.enabled
    }
  };
};

/**
 * 切换存储方式（需要重新加载页面）
 * @param {string} newType - 新的存储类型
 */
export const switchStorage = (newType) => {
  storageConfig.type = newType;
  localStorage.setItem('storageType', newType);

  // 如果切换到 SQLite，初始化数据库
  if (newType === StorageType.SQLITE && storageConfig.sqlite.enabled) {
    import('./sqliteAdapter.js').then(adapter => adapter.initSQLite());
  }

  return {
    success: true,
    message: `存储方式已切换到 ${newType}，请刷新页面生效`
  };
};

// 从 localStorage 恢复存储类型设置
const savedStorageType = localStorage.getItem('storageType');
if (savedStorageType && Object.values(StorageType).includes(savedStorageType)) {
  storageConfig.type = savedStorageType;
}

// 默认导出
export default {
  saveTravelPlan,
  getTravelPlans,
  getTravelPlansSync,
  deleteTravelPlan,
  deleteTravelPlanSync,
  getTravelPlan,
  getTravelPlanSync,
  getStorageInfo,
  switchStorage
};
