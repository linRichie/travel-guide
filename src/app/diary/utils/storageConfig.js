/**
 * 旅行规划器存储配置
 * 支持多种存储方式：本地 SQLite API（推荐）、sql.js（浏览器端）
 */

/**
 * 存储类型枚举
 */
export const StorageType = {
  LOCAL_SQLITE: 'local_sqlite',       // 本地 SQLite API（通过 Node.js 后端，推荐）
  SQLITE: 'sqlite',                   // SQLite WebAssembly（sql.js，浏览器端）
  MYSQL: 'mysql',                     // MySQL（需要后端服务）
  POSTGRESQL: 'postgresql'            // PostgreSQL（需要后端服务）
};

/**
 * 存储配置
 * 修改此文件以切换存储方式
 */
export const storageConfig = {
  // 当前使用的存储类型（默认本地 SQLite API）
  type: StorageType.LOCAL_SQLITE,

  // 本地 SQLite API 配置（推荐，数据持久化到本地文件）
  localSqlite: {
    enabled: true,
    apiUrl: 'http://localhost:3001/api',
    description: '本地 SQLite 文件，数据持久化可靠'
  },

  // sql.js 配置（浏览器端，存储到 IndexedDB）
  sqlite: {
    enabled: false,
    dbName: 'travel_plans.db',
    autoSave: true
  },

  // MySQL 配置（需要后端 API）
  mysql: {
    enabled: false,
    apiUrl: '/api/mysql',
    description: '需要配置后端 API'
  },

  // PostgreSQL 配置（需要后端 API）
  postgresql: {
    enabled: false,
    apiUrl: '/api/postgres',
    description: '需要配置后端 API'
  }
};

/**
 * 获取当前存储类型
 */
export const getCurrentStorageType = () => {
  return storageConfig.type;
};

/**
 * 设置存储类型
 */
export const setStorageType = (type) => {
  if (Object.values(StorageType).includes(type)) {
    storageConfig.type = type;
    return true;
  }
  console.error(`不支持的存储类型: ${type}`);
  return false;
};

/**
 * 检查存储是否需要异步操作
 */
export const isAsyncStorage = () => {
  const type = storageConfig.type;
  return type === StorageType.LOCAL_SQLITE ||
         type === StorageType.SQLITE ||
         type === StorageType.MYSQL ||
         type === StorageType.POSTGRESQL;
};

/**
 * 获取存储信息
 */
export const getStorageInfo = () => {
  const type = storageConfig.type;

  return {
    currentType: type,
    config: {
      localSqlite: storageConfig.localSqlite,
      sqlite: storageConfig.sqlite,
      mysql: storageConfig.mysql,
      postgresql: storageConfig.postgresql
    }
  };
};
