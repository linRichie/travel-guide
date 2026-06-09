import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { getBlogById, blogPosts } from '../data/blogData';
import BlogTOC from '../components/BlogTOC';
import RelatedPosts from '../components/RelatedPosts';

/**
 * 博客详情页面
 * 展示完整的博客文章内容，含目录导航和相关推荐
 */
const BlogPost = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { id } = useParams();
  const navigate = useNavigate();
  const post = getBlogById(id);

  // 如果文章不存在，返回 404
  if (!post) {
    return (
      <section className={`min-h-screen py-20 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <i className={`fas fa-file-alt text-6xl mb-4 transition-colors duration-300 ${isDark ? 'text-gray-700' : 'text-gray-400'}`}></i>
          <h2 className={`text-2xl mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>文章未找到</h2>
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
        return <h1 key={index} className={`text-3xl font-bold mt-8 mb-4 scroll-mt-24 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className={`text-2xl font-bold mt-6 mb-3 scroll-mt-24 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className={`text-xl font-bold mt-4 mb-2 scroll-mt-24 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className={`ml-6 list-disc transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className={`leading-relaxed mb-4 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{line}</p>;
    });
  };

  // 滚动到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return (
    <article className={`min-h-screen py-20 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主内容区 */}
          <div className="lg:col-span-3">
            {/* 返回按钮 */}
            <motion.button
              onClick={() => navigate(-1)}
              className={`flex items-center mb-8 transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
              <h1 className={`text-3xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {post.title}
              </h1>

              {/* 元信息 */}
              <div className={`flex flex-wrap items-center gap-4 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
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
              className={`mt-16 pt-8 border-t transition-colors duration-300 ${isDark ? 'border-white/10' : 'border-gray-200'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* 上一篇/下一篇导航 */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {prevPost ? (
                  <Link
                    to={`/diary/blog/${prevPost.id}`}
                    className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 hover:border-purple-500/30 transition-all group`}
                  >
                    <div className={`text-sm mb-2 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      <i className="fas fa-arrow-left mr-1"></i>上一篇
                    </div>
                    <div className={`font-medium group-hover:text-purple-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {prevPost.title}
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
                {nextPost ? (
                  <Link
                    to={`/diary/blog/${nextPost.id}`}
                    className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-xl p-6 hover:border-purple-500/30 transition-all group text-right`}
                  >
                    <div className={`text-sm mb-2 transition-colors duration-300 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      下一篇<i className="fas fa-arrow-right ml-1"></i>
                    </div>
                    <div className={`font-medium group-hover:text-purple-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {nextPost.title}
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              {/* 返回列表按钮 */}
              <div className="text-center">
                <Link
                  to="/diary/blog"
                  className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <i className="fas fa-list mr-2"></i>
                  查看所有文章
                </Link>
              </div>
            </motion.div>

            {/* 相关文章推荐 */}
            <div className="mt-12">
              <RelatedPosts currentPost={post} allPosts={blogPosts} />
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className="lg:col-span-1">
            <BlogTOC content={post.content} />
          </aside>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
