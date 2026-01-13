/**
 * SQLite 存储适配器
 * 使用 sql.js 在浏览器中运行 SQLite 数据库
 */

import { storageConfig } from './storageConfig.js';

// SQLite 实例
let db = null;
let SQL = null;

/**
 * 初始化 SQLite 数据库
 */
export const initSQLite = async () => {
  if (db) return db;

  try {
    // 动态加载 sql.js（使用 npm 包）
    const initSqlJs = await import('sql.js');
    SQL = await initSqlJs.default({
      // 使用本地 wasm 文件（由 sql.js npm 包提供）
      locateFile: file => `/node_modules/sql.js/dist/${file}`
    });

    // 创建数据库
    db = new SQL.Database();

    // 创建表
    createTables();

    // 尝试从 IndexedDB 加载数据
    await loadFromIndexedDB();

    return db;
  } catch (error) {
    console.error('SQLite 初始化失败:', error);
    return null;
  }
};

/**
 * 创建数据表
 */
const createTables = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS travel_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination TEXT NOT NULL,
      start_date TEXT NOT NULL,
      days INTEGER NOT NULL,
      budget TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS plan_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_id INTEGER NOT NULL,
      day_number INTEGER NOT NULL,
      activities TEXT,
      FOREIGN KEY (plan_id) REFERENCES travel_plans(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_plans_created ON travel_plans(created_at DESC);
  `;

  db.exec(sql);
};

/**
 * 保存到 IndexedDB（持久化 SQLite 数据库）
 */
const saveToIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TravelPlansDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const dbInstance = request.result;
      const transaction = dbInstance.transaction(['sqlite_db'], 'readwrite');
      const store = transaction.objectStore('sqlite_db');

      // 导出数据库为二进制数组
      const data = db.export();
      store.put({ id: 'main', data: data }, 'sqlite_db');

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = event.target.result;
      if (!dbInstance.objectStoreNames.contains('sqlite_db')) {
        dbInstance.createObjectStore('sqlite_db');
      }
    };
  });
};

/**
 * 从 IndexedDB 加载数据
 */
const loadFromIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TravelPlansDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const dbInstance = request.result;
      const transaction = dbInstance.transaction(['sqlite_db'], 'readonly');
      const store = transaction.objectStore('sqlite_db');
      const getRequest = store.get('main');

      getRequest.onsuccess = () => {
        if (getRequest.result && getRequest.result.data) {
          // 从保存的数据加载数据库
          const newDb = new SQL.Database(getRequest.result.data);
          db.close();
          db = newDb;
        }
        resolve();
      };

      transaction.onerror = () => reject(transaction.error);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = event.target.result;
      if (!dbInstance.objectStoreNames.contains('sqlite_db')) {
        dbInstance.createObjectStore('sqlite_db');
      }
    };
  });
};

/**
 * 保存旅行计划
 */
export const saveTravelPlanSQLite = async (plan) => {
  if (!db) await initSQLite();

  const stmt = db.prepare(`
    INSERT INTO travel_plans (destination, start_date, days, budget, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  stmt.run([plan.destination, plan.startDate, plan.days, plan.budget, now]);
  stmt.free();

  // 自动保存到 IndexedDB
  if (storageConfig.sqlite.autoSave) {
    await saveToIndexedDB();
  }

  // 获取插入的 ID
  const result = db.exec('SELECT last_insert_rowid() as id');
  return { ...plan, id: result[0].values[0][0], createdAt: now };
};

/**
 * 获取所有旅行计划
 */
export const getTravelPlansSQLite = async () => {
  if (!db) await initSQLite();

  const results = db.exec(`
    SELECT id, destination, start_date, days, budget, created_at
    FROM travel_plans
    ORDER BY created_at DESC
  `);

  if (results.length === 0) return [];

  return results[0].values.map(row => ({
    id: row[0],
    destination: row[1],
    startDate: row[2],
    days: row[3],
    budget: row[4],
    createdAt: row[5]
  }));
};

/**
 * 删除旅行计划
 */
export const deleteTravelPlanSQLite = async (id) => {
  if (!db) await initSQLite();

  const stmt = db.prepare('DELETE FROM travel_plans WHERE id = ?');
  stmt.run([id]);
  stmt.free();

  if (storageConfig.sqlite.autoSave) {
    await saveToIndexedDB();
  }
};

/**
 * 关闭数据库连接
 */
export const closeSQLite = () => {
  if (db) {
    db.close();
    db = null;
  }
};

/**
 * 导出数据库为 SQL 文件
 */
export const exportSQLiteAsSQL = () => {
  if (!db) return null;

  const results = db.exec(`
    SELECT * FROM travel_plans
    ORDER BY created_at DESC
  `);

  let sql = '-- Travel Plans Export\n-- Generated: ' + new Date().toISOString() + '\n\n';

  if (results.length > 0) {
    results[0].values.forEach(row => {
      sql += `INSERT INTO travel_plans (id, destination, start_date, days, budget, created_at) `;
      sql += `VALUES (${row[0]}, '${row[1]}', '${row[2]}', ${row[3]}, '${row[4]}', '${row[5]}');\n`;
    });
  }

  return sql;
};
