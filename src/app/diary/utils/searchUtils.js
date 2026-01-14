/**
 * 全文搜索工具函数
 * 支持博客和图片的全文检索
 */

import { blogPosts } from '../data/blogData';
import { galleryItems } from '../data/galleryData';

/**
 * 分词函数 - 将文本分解为可搜索的词项
 * @param {string} text - 待分词文本
 * @returns {string[]} 词项数组
 */
const tokenize = (text) => {
  if (!text) return [];
  // 移除特殊字符，保留中文、英文、数字
  const cleanText = text.toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9\s]/gi, ' ');
  // 按空格分词
  return cleanText.split(/\s+/).filter(token => token.length > 0);
};

/**
 * 计算搜索相关性分数
 * @param {Object} item - 搜索项
 * @param {string[]} queryTokens - 搜索词项
 * @param {string[]} fields - 要搜索的字段
 * @returns {number} 相关性分数
 */
const calculateScore = (item, queryTokens, fields) => {
  let score = 0;

  fields.forEach(field => {
    const fieldValue = item[field];
    if (!fieldValue) return;

    const fieldTokens = tokenize(String(fieldValue));

    queryTokens.forEach(queryToken => {
      // 完全匹配加分最高
      if (fieldTokens.includes(queryToken)) {
        score += 10;
      }

      // 部分匹配（模糊搜索）
      fieldTokens.forEach(fieldToken => {
        if (fieldToken.includes(queryToken) || queryToken.includes(fieldToken)) {
          score += 3;
        }
      });
    });
  });

  return score;
};

/**
 * 搜索博客文章
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的博客文章（含分数）
 */
export const searchBlogs = (query) => {
  if (!query || query.trim().length === 0) return [];

  const queryTokens = tokenize(query);

  const results = blogPosts.map(post => {
    const score = calculateScore(post, queryTokens, ['title', 'excerpt', 'content', 'tags', 'location']);
    return { ...post, score, type: 'blog' };
  });

  // 过滤零分结果并按分数排序
  return results
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
};

/**
 * 搜索图片/图集
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的图片（含分数）
 */
export const searchGallery = (query) => {
  if (!query || query.trim().length === 0) return [];

  const queryTokens = tokenize(query);

  const results = galleryItems.map(item => {
    const score = calculateScore(item, queryTokens, ['title', 'location', 'tags', 'date']);
    return { ...item, score, type: 'gallery' };
  });

  // 过滤零分结果并按分数排序
  return results
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
};

/**
 * 全局搜索 - 同时搜索博客和图片
 * @param {string} query - 搜索关键词
 * @param {Object} options - 搜索选项
 * @param {boolean} options.includeBlogs - 是否包含博客
 * @param {boolean} options.includeGallery - 是否包含图集
 * @returns {Object} { blogs, gallery, total }
 */
export const globalSearch = (query, options = {}) => {
  const {
    includeBlogs = true,
    includeGallery = true
  } = options;

  const results = {
    blogs: includeBlogs ? searchBlogs(query) : [],
    gallery: includeGallery ? searchGallery(query) : [],
    total: 0
  };

  results.total = results.blogs.length + results.gallery.length;

  return results;
};

/**
 * 高亮搜索关键词
 * @param {string} text - 原文本
 * @param {string} query - 搜索关键词
 * @returns {string} 带高亮标记的HTML
 */
export const highlightKeywords = (text, query) => {
  if (!text || !query) return text;

  const queryTokens = tokenize(query);
  let result = text;

  queryTokens.forEach(token => {
    const regex = new RegExp(`(${token})`, 'gi');
    result = result.replace(regex, '<mark class="bg-purple-500/50 text-white rounded px-0.5">$1</mark>');
  });

  return result;
};

/**
 * 获取搜索建议
 * @param {string} query - 当前输入
 * @param {number} limit - 返回数量限制
 * @returns {Array} 建议列表
 */
export const getSearchSuggestions = (query, limit = 5) => {
  if (!query || query.trim().length < 2) return [];

  const suggestions = new Set();

  // 从博客标题和标签获取建议
  blogPosts.forEach(post => {
    if (post.title.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(post.title);
    }
    post.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag);
      }
    });
    if (post.location && post.location.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(post.location);
    }
  });

  // 从图集获取建议
  galleryItems.forEach(item => {
    if (item.title.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(item.title);
    }
    item.tags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(tag);
      }
    });
    if (item.location && item.location.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(item.location);
    }
  });

  return Array.from(suggestions).slice(0, limit);
};
