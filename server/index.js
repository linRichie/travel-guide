/**
 * 本地 SQLite 后端服务器
 * 使用 better-sqlite3 提供图片和旅行计划存储 API
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 数据库文件路径
const DB_DIR = path.join(__dirname, '../database');
const DB_PATH = path.join(DB_DIR, 'travel_photos.db');

// 确保数据库目录存在
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// 初始化数据库连接
let db;

function initDatabase() {
  db = new Database(DB_PATH);

  // 启用外键约束
  db.pragma('foreign_keys = ON');

  // 创建 photos 表
  db.exec(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      location TEXT,
      photo_date TEXT,
      img_url TEXT NOT NULL,
      tags TEXT,
      exif_data TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // 创建 plans 表（旅行计划）
  db.exec(`
    CREATE TABLE IF NOT EXISTS plans (
      id TEXT PRIMARY KEY,
      destination TEXT NOT NULL,
      start_date TEXT,
      days INTEGER,
      budget TEXT,
      itinerary TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // 创建索引
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_photos_created ON photos(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_photos_location ON photos(location);
    CREATE INDEX IF NOT EXISTS idx_plans_created ON plans(created_at DESC);
  `);

  console.log('数据库初始化完成:', DB_PATH);
}

// 获取所有图片
app.get('/api/photos', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, title, location, photo_date, img_url, tags, exif_data, created_at
      FROM photos
      ORDER BY created_at DESC
    `);
    const photos = stmt.all();

    // 解析 JSON 字段
    const result = photos.map(p => ({
      ...p,
      tags: p.tags ? JSON.parse(p.tags) : [],
      exif: p.exif_data ? JSON.parse(p.exif_data) : null,
      date: p.photo_date,
      img: p.img_url
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('获取图片失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取单张图片
app.get('/api/photos/:id', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, title, location, photo_date, img_url, tags, exif_data, created_at
      FROM photos
      WHERE id = ?
    `);
    const photo = stmt.get(req.params.id);

    if (!photo) {
      return res.status(404).json({ success: false, error: '图片不存在' });
    }

    const result = {
      ...photo,
      tags: photo.tags ? JSON.parse(photo.tags) : [],
      exif: photo.exif_data ? JSON.parse(photo.exif_data) : null,
      date: photo.photo_date,
      img: photo.img_url
    };

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('获取图片失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 保存图片
app.post('/api/photos', (req, res) => {
  try {
    const photos = req.body;
    if (!Array.isArray(photos)) {
      return res.status(400).json({ success: false, error: '参数必须是数组' });
    }

    const insert = db.prepare(`
      INSERT INTO photos (title, location, photo_date, img_url, tags, exif_data)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((photos) => {
      const results = [];
      for (const photo of photos) {
        const info = insert.run(
          photo.title,
          photo.location || '',
          photo.date || '',
          photo.img,
          JSON.stringify(photo.tags || []),
          JSON.stringify(photo.exif || null)
        );
        results.push({
          id: info.lastInsertRowid,
          ...photo,
          isCustom: true,
          createdAt: new Date().toISOString()
        });
      }
      return results;
    });

    const savedPhotos = insertMany(photos);
    console.log(`保存了 ${savedPhotos.length} 张图片`);

    res.json({ success: true, data: savedPhotos });
  } catch (error) {
    console.error('保存图片失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 更新图片
app.put('/api/photos/:id', (req, res) => {
  try {
    const { title, location, date, tags, exif } = req.body;

    const stmt = db.prepare(`
      UPDATE photos
      SET title = ?, location = ?, photo_date = ?, tags = ?, exif_data = ?
      WHERE id = ?
    `);

    const result = stmt.run(
      title,
      location || '',
      date || '',
      JSON.stringify(tags || []),
      JSON.stringify(exif || null),
      req.params.id
    );

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: '图片不存在' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('更新图片失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 删除图片
app.delete('/api/photos/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM photos WHERE id = ?');
    const result = stmt.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: '图片不存在' });
    }

    console.log(`删除了图片 ID: ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('删除图片失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 批量删除图片
app.delete('/api/photos', (req, res) => {
  try {
    const ids = req.body.ids;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ success: false, error: '参数必须是 ids 数组' });
    }

    const stmt = db.prepare(`DELETE FROM photos WHERE id IN (${ids.map(() => '?').join(',')})`);
    const result = stmt.run(...ids);

    console.log(`批量删除了 ${result.changes} 张图片`);
    res.json({ success: true, deleted: result.changes });
  } catch (error) {
    console.error('批量删除失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ 旅行计划 API 端点 ============

// 获取所有旅行计划
app.get('/api/plans', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, destination, start_date, days, budget, itinerary, created_at
      FROM plans
      ORDER BY created_at DESC
    `);
    const plans = stmt.all();

    // 解析 JSON 字段
    const result = plans.map(p => ({
      ...p,
      itinerary: p.itinerary ? JSON.parse(p.itinerary) : null,
      startDate: p.start_date,
      createdAt: p.created_at
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('获取旅行计划失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取单个旅行计划
app.get('/api/plans/:id', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, destination, start_date, days, budget, itinerary, created_at
      FROM plans
      WHERE id = ?
    `);
    const plan = stmt.get(req.params.id);

    if (!plan) {
      return res.status(404).json({ success: false, error: '旅行计划不存在' });
    }

    const result = {
      ...plan,
      itinerary: plan.itinerary ? JSON.parse(plan.itinerary) : null,
      startDate: plan.start_date,
      createdAt: plan.created_at
    };

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('获取旅行计划失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 保存旅行计划
app.post('/api/plans', (req, res) => {
  try {
    const plan = req.body;
    if (!plan.id || !plan.destination) {
      return res.status(400).json({ success: false, error: '缺少必要参数: id, destination' });
    }

    const stmt = db.prepare(`
      INSERT OR REPLACE INTO plans (id, destination, start_date, days, budget, itinerary)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      plan.id,
      plan.destination,
      plan.startDate || '',
      plan.days || 0,
      plan.budget || 'comfortable',
      JSON.stringify(plan.itinerary || null)
    );

    console.log(`保存了旅行计划: ${plan.destination} (${plan.id})`);

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error('保存旅行计划失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 删除旅行计划
app.delete('/api/plans/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM plans WHERE id = ?');
    const result = stmt.run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: '旅行计划不存在' });
    }

    console.log(`删除了旅行计划 ID: ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('删除旅行计划失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 获取数据库统计
app.get('/api/stats', (req, res) => {
  try {
    const photoCount = db.prepare('SELECT COUNT(*) as count FROM photos').get().count;
    const planCount = db.prepare('SELECT COUNT(*) as count FROM plans').get().count;
    const dbSize = fs.statSync(DB_PATH).size;

    res.json({
      success: true,
      data: {
        photos: photoCount,
        plans: planCount,
        sizeKB: Math.round(dbSize / 1024)
      }
    });
  } catch (error) {
    console.error('获取统计失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 清空所有数据
app.delete('/api/photos/all', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM photos');
    const result = stmt.run();

    console.log(`清空了 ${result.changes} 张图片`);
    res.json({ success: true, deleted: result.changes });
  } catch (error) {
    console.error('清空数据失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', database: DB_PATH });
});

// 启动服务器
initDatabase();

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`数据库文件: ${DB_PATH}`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭服务器...');
  if (db) {
    db.close();
    console.log('数据库连接已关闭');
  }
  process.exit(0);
});
