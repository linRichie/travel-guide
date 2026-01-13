import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { blogPosts, getAllBlogTags } from '../data/blogData';
import TagCloud from '../components/TagCloud';

/**
 * 旅行博客列表页面
 * 时间线样式展示所有博客文章，支持标签筛选
 */
const BlogList = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedTag, setSelectedTag] = useState('全部');

  // 获取所有标签及其使用次数
  const allTags = useMemo(() => {
    const tags = getAllBlogTags();
    const tagCounts = {};

    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return tags.map(tag => ({
      name: tag,
      count: tagCounts[tag] || 0
    }));
  }, []);

  // 筛选后的博客列表
  const filteredPosts = useMemo(() => {
    if (selectedTag === '全部') {
      return blogPosts;
    }
    return blogPosts.filter(post =>
      post.tags.includes(selectedTag)
    );
  }, [selectedTag]);

  return (
    <section className={`min-h-screen py-20 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {/* 页面标题 */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                旅行<span className="text-purple-400">博客</span>
              </h2>
              <p className={`transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedTag === '全部'
                  ? `记录旅途中的故事与感悟 · 共 ${blogPosts.length} 篇`
                  : `标签「${selectedTag}」的文章 · 共 ${filteredPosts.length} 篇`
                }
              </p>
            </motion.div>

            {/* 博客时间线 */}
            <div className="relative">
              {/* 时间线 */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"></div>

              <div className="space-y-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="relative pl-12"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* 时间线圆点 */}
                      <div
                        className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                          index % 3 === 0 ? 'bg-purple-500' : index % 3 === 1 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                      >
                        <i className="fas fa-feather-alt text-white text-sm"></i>
                      </div>

                      {/* 博客卡片 */}
                      <Link to={`/diary/blog/${post.id}`}>
                        <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group`}>
                          {/* 标题图片 */}
                          <div className="mb-4 overflow-hidden rounded-lg">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* 标题和日期 */}
                          <h3 className={`text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {post.title}
                          </h3>
                          <p className={`mb-3 flex items-center transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                            <i className="far fa-calendar-alt mr-1"></i>
                            {post.date}
                            <span className="mx-2">·</span>
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            {post.location}
                          </p>

                          {/* 摘要 */}
                          <p className={`mb-4 line-clamp-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{post.excerpt}</p>

                          {/* 标签 */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* 阅读更多 */}
                          <span className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors">
                            阅读更多 <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="text-center py-20 pl-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <i className={`fas fa-file-alt text-6xl mb-4 transition-colors duration-300 ${isDark ? 'text-gray-700' : 'text-gray-400'}`}></i>
                    <p className={`text-lg transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>没有找到相关文章</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className="lg:col-span-1">
            <TagCloud
              tags={['全部', ...allTags]}
              activeTag={selectedTag}
              onTagClick={setSelectedTag}
              title="文章标签"
            />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
