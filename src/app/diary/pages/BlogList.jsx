import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';

/**
 * 旅行博客列表页面
 * 时间线样式展示所有博客文章
 */
const BlogList = () => {
  return (
    <section className="min-h-screen py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        {/* 页面标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            旅行<span className="text-purple-400">博客</span>
          </h2>
          <p className="text-gray-400">记录旅途中的故事与感悟</p>
        </motion.div>

        {/* 博客时间线 */}
        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500"></div>

          <div className="space-y-8">
            {blogPosts.map((post, index) => (
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
                  <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group">
                    {/* 标题图片 */}
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* 标题和日期 */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 mb-3 flex items-center">
                      <i className="far fa-calendar-alt mr-1"></i>
                      {post.date}
                      <span className="mx-2">·</span>
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {post.location}
                    </p>

                    {/* 摘要 */}
                    <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>

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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
