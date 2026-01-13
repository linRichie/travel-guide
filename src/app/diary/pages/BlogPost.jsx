import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogById, blogPosts } from '../data/blogData';

/**
 * 博客详情页面
 * 展示完整的博客文章内容
 */
const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = getBlogById(id);

  // 如果文章不存在，返回 404
  if (!post) {
    return (
      <section className="min-h-screen py-20 bg-black flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-file-alt text-6xl text-gray-700 mb-4"></i>
          <h2 className="text-2xl text-white mb-4">文章未找到</h2>
          <Link
            to="/diary/blog"
            className="text-purple-400 hover:text-purple-300"
          >
            返回博客列表
          </Link>
        </div>
      </section>
    );
  }

  // 获取上一篇和下一篇
  const currentIndex = blogPosts.findIndex(p => p.id === Number(id));
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // 简单的 Markdown 渲染（实际项目建议使用 react-markdown）
  const renderContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-white mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-300 ml-6">{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-gray-300 leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <article className="min-h-screen py-20 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        {/* 返回按钮 */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          返回
        </motion.button>

        {/* 文章头部 */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 标题 */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          {/* 元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-gray-500">
            <span className="flex items-center">
              <i className="far fa-calendar-alt mr-2"></i>
              {post.date}
            </span>
            <span className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {post.location}
            </span>
          </div>
        </motion.header>

        {/* 封面图片 */}
        <motion.div
          className="mb-12 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full object-cover"
          />
        </motion.div>

        {/* 文章内容 */}
        <motion.div
          className="prose prose-invert prose-lg max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {renderContent(post.content)}
        </motion.div>

        {/* 文章底部 */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* 上一篇/下一篇导航 */}
          <div className="grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/diary/blog/${prevPost.id}`}
                className="bg-gray-900/50 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all group"
              >
                <div className="text-gray-500 text-sm mb-2">
                  <i className="fas fa-arrow-left mr-1"></i>上一篇
                </div>
                <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                  {prevPost.title}
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            {nextPost ? (
              <Link
                to={`/diary/blog/${nextPost.id}`}
                className="bg-gray-900/50 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all group text-right"
              >
                <div className="text-gray-500 text-sm mb-2">
                  下一篇<i className="fas fa-arrow-right ml-1"></i>
                </div>
                <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                  {nextPost.title}
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* 返回列表按钮 */}
          <div className="mt-8 text-center">
            <Link
              to="/diary/blog"
              className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <i className="fas fa-list mr-2"></i>
              查看所有文章
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
};

export default BlogPost;
