import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import GlobalSearch from '../components/GlobalSearch';
import { globalSearch, highlightKeywords } from '../utils/searchUtils';

/**
 * 搜索结果页面
 * 显示博客和图集的搜索结果
 */
const SearchResults = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  const [results, setResults] = useState({ blogs: [], gallery: [], total: 0 });
  const [activeTab, setActiveTab] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  // 执行搜索
  useEffect(() => {
    if (query) {
      setIsSearching(true);
      // 模拟异步搜索体验
      setTimeout(() => {
        const searchResults = globalSearch(query);
        setResults(searchResults);
        setIsSearching(false);
      }, 300);
    }
  }, [query]);

  // 过滤结果
  const filteredBlogs = activeTab === 'all' || activeTab === 'blogs' ? results.blogs : [];
  const filteredGallery = activeTab === 'all' || activeTab === 'gallery' ? results.gallery : [];

  return (
    <section className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* 搜索头部 */}
      <div className={`pt-12 pb-8 px-4 ${isDark ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-white border-b border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/diary')}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              搜索结果
            </h1>
          </div>

          {/* 搜索框 */}
          <GlobalSearch variant="inline" />

          {/* 搜索统计 */}
          {!isSearching && query && (
            <div className="mt-6">
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                找到 <span className="text-purple-400 font-semibold">{results.total}</span> 个与
                <span className="text-purple-400 font-semibold"> "{query}" </span>
                相关的结果
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 搜索中状态 */}
      {isSearching && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-purple-400 mb-4"></i>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>搜索中...</p>
          </div>
        </div>
      )}

      {/* 无结果状态 */}
      {!isSearching && query && results.total === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
            isDark ? 'bg-white/5' : 'bg-gray-200'
          }`}>
            <i className="fas fa-search text-4xl text-gray-500"></i>
          </div>
          <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            未找到相关结果
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            试试其他关键词或查看热门内容
          </p>
          <div className="flex gap-4">
            <Link
              to="/diary/blog"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              浏览博客
            </Link>
            <Link
              to="/diary/gallery"
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isDark
                  ? 'bg-white/5 text-white hover:bg-white/10'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              浏览图集
            </Link>
          </div>
        </div>
      )}

      {/* 搜索结果 */}
      {!isSearching && results.total > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* 标签筛选 */}
          <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-purple-500 text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              全部 ({results.total})
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'blogs'
                  ? 'bg-purple-500 text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              博客 ({results.blogs.length})
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-purple-500 text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              图集 ({results.gallery.length})
            </button>
          </div>

          {/* 博客结果 */}
          {filteredBlogs.length > 0 && (
            <div className="mb-10">
              <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <i className="fas fa-blog text-purple-400"></i>
                博客文章
              </h2>
              <div className="space-y-4">
                {filteredBlogs.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={`/diary/blog/${post.id}`}
                      className={`block rounded-xl p-6 transition-all hover:scale-[1.02] ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <div className="flex gap-6">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {highlightKeywords(post.title, query).replace(/<mark[^>]*>/g, '<span class="bg-purple-500/30 text-purple-300 px-1 rounded">').replace(/<\/mark>/g, '</span>')}</h3>
                          <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <i className="fas fa-calendar-alt"></i>
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="fas fa-map-marker-alt"></i>
                              {post.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 图集结果 */}
          {filteredGallery.length > 0 && (
            <div>
              <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <i className="fas fa-images text-blue-400"></i>
                旅拍图集
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to="/diary/gallery"
                      className={`block rounded-xl overflow-hidden transition-all hover:scale-[1.02] group ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                          : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-sm font-semibold">
                              查看详情
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            {item.location}
                          </span>
                          <span>{item.date}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className={`px-2 py-1 text-xs rounded-full ${
                                query.includes(tag)
                                  ? 'bg-purple-500/30 text-purple-300'
                                  : isDark
                                    ? 'bg-white/10 text-gray-400'
                                    : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
