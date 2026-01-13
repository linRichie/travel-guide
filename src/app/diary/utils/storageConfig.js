/**
 * 旅行规划器存储配置
 * 支持多种存储方式：localStorage（默认）、SQLite、MySQL、PostgreSQL
 */

/**
 * 存储类型枚举
 */
export const StorageType = {
  LOCAL_STORAGE: 'localStorage',    // 浏览器本地存储（默认，无需配置）
  SQLITE: 'sqlite',                 // SQLite WebAssembly（sql.js）
  MYSQL: 'mysql',                   // MySQL（需要后端服务）
  POSTGRESQL: 'postgresql'          // PostgreSQL（需要后端服务）
};

/**
 * 存储配置
 * 修改此文件以切换存储方式
 */
export const storageConfig = {
  // 当前使用的存储类型
  type: StorageType.SQLITE,

  // SQLite 配置（使用 sql.js，浏览器端运行）
  sqlite: {
    enabled: true,                   // 是否启用 SQLite
    dbName: 'travel_plans.db',       // 数据库文件名
    autoSave: true                   // 是否自动保存到 IndexedDB
  },

  // MySQL 配置（需要后端 API）
  mysql: {
    enabled: false,                  // 是否启用 MySQL
    apiUrl: '/api/mysql',            // 后端 API 地址
    tableName: 'travel_plans'        // 表名
  },

  // PostgreSQL 配置（需要后端 API）
  postgresql: {
    enabled: false,                  // 是否启用 PostgreSQL
    apiUrl: '/api/postgres',         // 后端 API 地址
    tableName: 'travel_plans'        // 表名
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
 * 注意：SQLite 需要先加载 sql.js 库，MySQL/PgSQL 需要配置后端 API
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
 * SQLite/MySQL/PostgreSQL 需要异步，localStorage 不需要
 */
export const isAsyncStorage = () => {
  const type = storageConfig.type;
  return type === StorageType.SQLITE ||
         type === StorageType.MYSQL ||
         type === StorageType.POSTGRESQL;
};

/**
 * 初始化存储（用于 SQLite/MySQL/PostgreSQL）
 */
export const initializeStorage = async () => {
  const type = storageConfig.type;

  switch (type) {
    case StorageType.SQLITE:
      if (!storageConfig.sqlite.enabled) {
        console.warn('SQLite 未启用，请在 storageConfig.js 中配置');
        return false;
      }
      // 动态加载 sql.js（npm 包已安装）
      try {
        const initSqlJs = await import('sql.js');
        const SQL = await initSqlJs.default({
          // 使用本地 wasm 文件（由 sql.js npm 包提供）
          locateFile: file => `/node_modules/sql.js/dist/${file}`
        });
        return SQL;
      } catch (error) {
        console.error('加载 sql.js 失败:', error);
        return null;
      }

    case StorageType.MYSQL:
    case StorageType.POSTGRESQL:
      console.warn(`${type} 需要配置后端 API 服务`);
      return null;

    default:
      return null;
  }
};
