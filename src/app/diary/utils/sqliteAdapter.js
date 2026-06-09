/**
 * SQLite 存储适配器
 * 使用 sql.js 在浏览器中运行 SQLite 数据库
 */

import { storageConfig } from './storageConfig.js';

// SQLite 实例
let db = null;
let SQL = null;

// IndexedDB 连接缓存（避免频繁打开连接导致数据竞争）
let idbInstance = null;
let idbInitPromise = null;

/**
 * 获取 IndexedDB 实例（单例模式）
 */
const getIndexedDB = () => {
  if (idbInstance) {
    return Promise.resolve(idbInstance);
  }

  if (idbInitPromise) {
    return idbInitPromise;
  }

  idbInitPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open('TravelPlansDB', 1);

    request.onerror = () => {
      console.error('IndexedDB 打开失败:', request.error);
      idbInitPromise = null;
      reject(request.error);
    };

    request.onsuccess = () => {
      idbInstance = request.result;
      console.log('IndexedDB 实例已缓存');
      resolve(idbInstance);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = event.target.result;
      if (!dbInstance.objectStoreNames.contains('sqlite_db')) {
        dbInstance.createObjectStore('sqlite_db');
      }
    };
  });

  return idbInitPromise;
};

/**
 * 初始化 SQLite 数据库
 */
export const initSQLite = async () => {
  if (db) {
    console.log('SQLite: 返回已存在的数据库实例');
    return db;
  }

  try {
    console.log('SQLite: 开始初始化...');

    // 动态加载 sql.js（使用 npm 包）
    const initSqlJs = await import('sql.js');
    SQL = await initSqlJs.default({
      // 使用本地 wasm 文件（由 sql.js npm 包提供）
      locateFile: file => `/node_modules/sql.js/dist/${file}`
    });

    console.log('SQLite: sql.js 加载完成');

    // 先尝试从 IndexedDB 加载数据库
    const loadedDb = await loadFromIndexedDB();

    if (loadedDb) {
      // 使用加载的数据库
      db = loadedDb;
      console.log('SQLite: 数据库从 IndexedDB 加载成功');

      // 验证 photos 表是否有数据
      try {
        const checkResult = db.exec('SELECT COUNT(*) as count FROM photos');
        const count = checkResult[0]?.values[0]?.[0] || 0;
        console.log('SQLite: photos 表记录数 =', count);
      } catch (e) {
        console.log('SQLite: photos 表查询失败，可能需要创建表');
      }
    } else {
      // 创建新数据库
      db = new SQL.Database();
      console.log('SQLite: 新数据库创建成功');
    }

    // 确保表存在（新数据库或已加载的数据库都需要检查）
    try {
      createTables();
      console.log('SQLite: 表结构检查完成');
    } catch (error) {
      console.error('SQLite: 创建表失败:', error);
    }

    return db;
  } catch (error) {
    console.error('SQLite 初始化失败:', error);
    return null;
  }
};

/**
 * 强制重新加载数据库（用于刷新后确保获取最新数据）
 */
export const reloadDatabase = async () => {
  console.log('SQLite: 强制重新加载数据库...');
  // 重置数据库实例
  if (db) {
    try {
      db.close();
    } catch (e) {
      console.error('SQLite: 关闭数据库失败:', e);
    }
    db = null;
  }
  return await initSQLite();
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

    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      location TEXT,
      photo_date TEXT,
      img_url TEXT NOT NULL,
      tags TEXT,
      exif_data TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_plans_created ON travel_plans(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_photos_created ON photos(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_photos_location ON photos(location);
  `;

  db.exec(sql);
};

/**
 * 保存到 IndexedDB（持久化 SQLite 数据库）
 */
const saveToIndexedDB = () => {
  return getIndexedDB().then((dbInstance) => {
    return new Promise((resolve, reject) => {
      const transaction = dbInstance.transaction(['sqlite_db'], 'readwrite');
      const store = transaction.objectStore('sqlite_db');

      try {
        // 验证数据：在导出前检查 photos 表
        const verifyResult = db.exec('SELECT COUNT(*) FROM photos');
        const photoCount = verifyResult[0]?.values[0]?.[0] || 0;
        console.log('保存前验证: photos 表有', photoCount, '条记录');

        // 导出数据库为二进制数组
        const data = db.export();
        store.put({ id: 'main', data: data, timestamp: Date.now() }, 'sqlite_db');
        console.log('SQLite 数据库已保存到 IndexedDB, 大小:', data.length, '字节');
      } catch (error) {
        console.error('导出数据库失败:', error);
        transaction.abort();
        reject(error);
        return;
      }

      transaction.oncomplete = () => {
        console.log('IndexedDB 保存完成');
        resolve();
      };

      transaction.onerror = () => {
        console.error('IndexedDB 保存失败:', transaction.error);
        reject(transaction.error);
      };
    });
  });
};

/**
 * 从 IndexedDB 加载数据
 * @returns {Promise<SQL.Database|null>} 返回加载的数据库实例，如果没有则返回 null
 */
const loadFromIndexedDB = () => {
  return getIndexedDB().then((dbInstance) => {
    return new Promise((resolve) => {
      const transaction = dbInstance.transaction(['sqlite_db'], 'readonly');
      const store = transaction.objectStore('sqlite_db');
      const getRequest = store.get('main');

      getRequest.onsuccess = () => {
        if (getRequest.result && getRequest.result.data) {
          try {
            // 从保存的数据加载数据库
            const loadedDb = new SQL.Database(getRequest.result.data);
            console.log('从 IndexedDB 加载 SQLite 数据库成功, 数据大小:', getRequest.result.data.length, '字节');

            // 验证加载的数据
            try {
              const verifyResult = loadedDb.exec('SELECT COUNT(*) FROM photos');
              const photoCount = verifyResult[0]?.values[0]?.[0] || 0;
              console.log('加载后验证: photos 表有', photoCount, '条记录');
            } catch (e) {
              console.log('加载后验证: photos 表不存在或查询失败', e);
            }

            resolve(loadedDb);
          } catch (error) {
            console.error('加载数据库失败:', error);
            resolve(null);
          }
        } else {
          console.log('IndexedDB 中没有保存的数据库');
          resolve(null);
        }
      };

      getRequest.onerror = () => {
        console.error('读取 IndexedDB 失败:', getRequest.error);
        resolve(null);
      };

      transaction.onerror = () => {
        console.error('IndexedDB 事务失败:', transaction.error);
        resolve(null);
      };
    });
  }).catch((error) => {
    console.error('获取 IndexedDB 实例失败:', error);
    return Promise.resolve(null);
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

// ============ 图片管理操作 ============

/**
 * 保存图片
 */
export const savePhotoSQLite = async (photo) => {
  if (!db) await initSQLite();

  const stmt = db.prepare(`
    INSERT INTO photos (title, location, photo_date, img_url, tags, exif_data, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  stmt.run([
    photo.title,
    photo.location || '',
    photo.date || '',
    photo.img,
    JSON.stringify(photo.tags || []),
    JSON.stringify(photo.exif || null),
    now
  ]);
  stmt.free();

  // 自动保存到 IndexedDB
  if (storageConfig.sqlite.autoSave) {
    await saveToIndexedDB();
  }

  // 获取插入的 ID
  const result = db.exec('SELECT last_insert_rowid() as id');
  return { ...photo, id: result[0].values[0][0], isCustom: true, createdAt: now };
};

/**
 * 批量保存图片
 */
export const savePhotosSQLite = async (photos) => {
  console.log('SQLite savePhotosSQLite: 开始保存', photos.length, '张图片');
  if (!db) await initSQLite();

  const savedPhotos = [];
  const now = new Date().toISOString();

  // 使用事务确保数据完整性
  db.exec('BEGIN TRANSACTION');

  try {
    for (const photo of photos) {
      const stmt = db.prepare(`
        INSERT INTO photos (title, location, photo_date, img_url, tags, exif_data, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run([
        photo.title,
        photo.location || '',
        photo.date || '',
        photo.img,
        JSON.stringify(photo.tags || []),
        JSON.stringify(photo.exif || null),
        now
      ]);
      stmt.free();

      const result = db.exec('SELECT last_insert_rowid() as id');
      savedPhotos.push({ ...photo, id: result[0].values[0][0], isCustom: true, createdAt: now });
    }

    // 提交事务
    db.exec('COMMIT');
    console.log('SQLite savePhotosSQLite: 成功插入', savedPhotos.length, '条记录');
  } catch (error) {
    // 回滚事务
    try {
      db.exec('ROLLBACK');
    } catch (e) {
      // 忽略回滚错误
    }
    console.error('SQLite savePhotosSQLite: 保存失败，已回滚', error);
    throw error;
  }

  // 自动保存到 IndexedDB
  if (storageConfig.sqlite.autoSave) {
    console.log('SQLite savePhotosSQLite: 开始保存到 IndexedDB...');
    await saveToIndexedDB();
    console.log('SQLite savePhotosSQLite: IndexedDB 保存完成');
  }

  return savedPhotos;
};

/**
 * 获取所有自定义图片
 */
export const getPhotosSQLite = async () => {
  console.log('SQLite getPhotosSQLite: 开始获取图片...');
  if (!db) {
    console.log('SQLite getPhotosSQLite: 数据库未初始化，开始初始化...');
    await initSQLite();
  }

  if (!db) {
    console.error('SQLite getPhotosSQLite: 数据库初始化失败');
    return [];
  }

  try {
    const results = db.exec(`
      SELECT id, title, location, photo_date, img_url, tags, exif_data, created_at
      FROM photos
      ORDER BY created_at DESC
    `);

    if (results.length === 0) {
      console.log('SQLite getPhotosSQLite: 没有找到图片记录');
      return [];
    }

    const photos = results[0].values.map(row => ({
      id: row[0],
      title: row[1],
      location: row[2],
      date: row[3],
      img: row[4],
      tags: JSON.parse(row[5] || '[]'),
      exif: JSON.parse(row[6] || 'null'),
      isCustom: true,
      createdAt: row[7]
    }));

    console.log('SQLite getPhotosSQLite: 成功获取', photos.length, '张图片');
    return photos;
  } catch (error) {
    console.error('SQLite getPhotosSQLite: 查询失败', error);
    return [];
  }
};

/**
 * 获取单张图片
 */
export const getPhotoSQLite = async (id) => {
  if (!db) await initSQLite();

  const stmt = db.prepare(`
    SELECT id, title, location, photo_date, img_url, tags, exif_data, created_at
    FROM photos
    WHERE id = ?
  `);

  const result = stmt.get([id]);
  stmt.free();

  if (!result) return null;

  return {
    id: result[0],
    title: result[1],
    location: result[2],
    date: result[3],
    img: result[4],
    tags: JSON.parse(result[5] || '[]'),
    exif: JSON.parse(result[6] || 'null'),
    isCustom: true,
    createdAt: result[7]
  };
};

/**
 * 更新图片
 */
export const updatePhotoSQLite = async (photo) => {
  if (!db) await initSQLite();

  const stmt = db.prepare(`
    UPDATE photos
    SET title = ?, location = ?, photo_date = ?, tags = ?, updated_at = ?
    WHERE id = ?
  `);

  const now = new Date().toISOString();
  stmt.run([
    photo.title,
    photo.location || '',
    photo.date || '',
    JSON.stringify(photo.tags || []),
    now,
    photo.id
  ]);
  stmt.free();

  // 自动保存到 IndexedDB
  if (storageConfig.sqlite.autoSave) {
    await saveToIndexedDB();
  }

  return photo;
};

/**
 * 删除图片
 */
export const deletePhotoSQLite = async (id) => {
  if (!db) await initSQLite();

  const stmt = db.prepare('DELETE FROM photos WHERE id = ?');
  stmt.run([id]);
  stmt.free();

  if (storageConfig.sqlite.autoSave) {
    await saveToIndexedDB();
  }
};

/**
 * 批量删除图片
 */
export const deletePhotosSQLite = async (ids) => {
  if (!db) await initSQLite();

  for (const id of ids) {
    const stmt = db.prepare('DELETE FROM photos WHERE id = ?');
    stmt.run([id]);
    stmt.free();
  }

  if (storageConfig.sqlite.autoSave) {
    await saveToIndexedDB();
  }
};

// ============ 数据库导出/导入功能 ============

/**
 * 导出数据库为 SQLite 文件（供用户下载）
 * 这是浏览器环境中保存数据库的唯一方式
 */
export const exportDatabaseFile = () => {
  if (!db) {
    console.error('数据库未初始化');
    return null;
  }

  try {
    // 导出数据库为二进制数组
    const data = db.export();

    // 创建 Blob 对象
    const blob = new Blob([data], { type: 'application/x-sqlite3' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travel_diary_${new Date().toISOString().slice(0, 10)}.db`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('数据库文件已导出');
    return true;
  } catch (error) {
    console.error('导出数据库文件失败:', error);
    return false;
  }
};

/**
 * 导入数据库文件
 * @param {File} file - 用户选择的 SQLite 数据库文件
 */
export const importDatabaseFile = async (file) => {
  if (!file) return { success: false, message: '未选择文件' };

  try {
    // 读取文件内容
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // 验证是否是有效的 SQLite 文件
    if (uint8Array.length < 16 ||
        String.fromCharCode(uint8Array[0], uint8Array[1], uint8Array[2], uint8Array[3]) !== 'SQLite') {
      return { success: false, message: '无效的 SQLite 文件' };
    }

    // 关闭当前数据库
    if (db) {
      db.close();
      db = null;
    }

    // 创建新的数据库实例
    const importedDb = new SQL.Database(uint8Array);
    db = importedDb;

    // 确保表存在
    createTables();

    // 保存到 IndexedDB
    await saveToIndexedDB();

    console.log('数据库文件导入成功');
    return { success: true, message: '数据库导入成功' };
  } catch (error) {
    console.error('导入数据库文件失败:', error);
    return { success: false, message: `导入失败: ${error.message}` };
  }
};

/**
 * 获取数据库统计信息
 */
export const getDatabaseStats = async () => {
  if (!db) await initSQLite();

  try {
    // 查询各种表的记录数
    const plansCount = db.exec('SELECT COUNT(*) FROM travel_plans');
    const photosCount = db.exec('SELECT COUNT(*) FROM photos');

    const stats = {
      plans: plansCount.length > 0 ? plansCount[0].values[0][0] : 0,
      photos: photosCount.length > 0 ? photosCount[0].values[0][0] : 0
    };

    // 获取数据库大小（导出后计算）
    const data = db.export();
    stats.sizeBytes = data.length;
    stats.sizeKB = (data.length / 1024).toFixed(2);

    return stats;
  } catch (error) {
    console.error('获取数据库统计失败:', error);
    return { plans: 0, photos: 0, sizeBytes: 0, sizeKB: '0' };
  }
};

/**
 * 清空所有自定义数据
 */
export const clearAllCustomData = async () => {
  if (!db) await initSQLite();

  try {
    db.exec('DELETE FROM photos WHERE 1=1');
    db.exec('DELETE FROM travel_plans WHERE 1=1');
    db.exec('DELETE FROM plan_details WHERE 1=1');

    await saveToIndexedDB();
    console.log('所有自定义数据已清空');
    return { success: true, message: '数据已清空' };
  } catch (error) {
    console.error('清空数据失败:', error);
    return { success: false, message: `清空失败: ${error.message}` };
  }
};
