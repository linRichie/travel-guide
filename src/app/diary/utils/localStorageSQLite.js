/**
 * 本地 SQLite API 适配器
 * 通过本地后端服务器 (http://localhost:3001) 与 SQLite 文件交互
 * 使用 better-sqlite3 进行可靠的本地存储
 */

const API_BASE = 'http://localhost:3001/api';

/**
 * 发送 API 请求
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API 请求失败 ${endpoint}:`, error);
    throw error;
  }
}

/**
 * 初始化本地 SQLite 存储
 * 检查后端服务器是否可用
 */
export const initLocalStorageSQLite = async () => {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) {
      throw new Error('后端服务不可用');
    }
    const data = await response.json();
    console.log('本地 SQLite 后端已连接:', data.database);
    return true;
  } catch (error) {
    console.error('无法连接到本地 SQLite 后端:', error);
    console.log('请先启动后端服务: npm run server');
    return false;
  }
};

/**
 * 保存图片到本地 SQLite
 */
export const savePhotosLocalStorageSQLite = async (photos) => {
  console.log('本地 SQLite: 保存', photos.length, '张图片');

  const result = await apiRequest('/photos', {
    method: 'POST',
    body: JSON.stringify(photos)
  });

  console.log('本地 SQLite: 保存成功, ID:', result.data.map(p => p.id));
  return result.data;
};

/**
 * 获取所有图片
 */
export const getPhotosLocalStorageSQLite = async () => {
  const result = await apiRequest('/photos');
  console.log('本地 SQLite: 获取到', result.data.length, '张图片');
  return result.data;
};

/**
 * 获取单张图片
 */
export const getPhotoByIdLocalStorageSQLite = async (id) => {
  const result = await apiRequest(`/photos/${id}`);
  return result.data;
};

/**
 * 更新图片
 */
export const updatePhotoLocalStorageSQLite = async (photo) => {
  await apiRequest(`/photos/${photo.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: photo.title,
      location: photo.location,
      date: photo.date,
      tags: photo.tags,
      exif: photo.exif
    })
  });
  console.log('本地 SQLite: 更新图片 ID', photo.id);
};

/**
 * 删除图片
 */
export const deletePhotoLocalStorageSQLite = async (id) => {
  await apiRequest(`/photos/${id}`, { method: 'DELETE' });
  console.log('本地 SQLite: 删除图片 ID', id);
};

/**
 * 批量删除图片
 */
export const deletePhotosLocalStorageSQLite = async (ids) => {
  await apiRequest('/photos', {
    method: 'DELETE',
    body: JSON.stringify({ ids: Array.from(ids) })
  });
  console.log('本地 SQLite: 批量删除', ids.size, '张图片');
};

/**
 * 获取数据库统计
 */
export const getStatsLocalStorageSQLite = async () => {
  const result = await apiRequest('/stats');
  return result.data;
};

/**
 * 清空所有数据
 */
export const clearAllLocalStorageSQLite = async () => {
  await apiRequest('/photos/all', { method: 'DELETE' });
  console.log('本地 SQLite: 已清空所有数据');
};

// ============ 旅行计划操作 ============

/**
 * 保存旅行计划到本地 SQLite
 */
export const saveTravelPlanLocalStorageSQLite = async (plan) => {
  console.log('本地 SQLite: 保存旅行计划', plan.destination);

  const result = await apiRequest('/plans', {
    method: 'POST',
    body: JSON.stringify(plan)
  });

  console.log('本地 SQLite: 旅行计划保存成功, ID:', plan.id);
  return result.data;
};

/**
 * 获取所有旅行计划
 */
export const getTravelPlansLocalStorageSQLite = async () => {
  const result = await apiRequest('/plans');
  console.log('本地 SQLite: 获取到', result.data.length, '个旅行计划');
  return result.data;
};

/**
 * 删除旅行计划
 */
export const deleteTravelPlanLocalStorageSQLite = async (planId) => {
  await apiRequest(`/plans/${planId}`, { method: 'DELETE' });
  console.log('本地 SQLite: 删除旅行计划 ID', planId);
};
