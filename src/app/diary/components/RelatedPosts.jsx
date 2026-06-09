import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * 相关文章推荐组件
 * 基于标签和位置推荐相关文章
 */
const RelatedPosts = ({ currentPost, allPosts, maxCount = 3 }) => {
  // 计算文章相关性分数
  const calculateRelevance = (post) => {
    let score = 0;

    // 相同标签加分
    const commonTags = post.tags.filter(tag =>
      currentPost.tags.includes(tag)
    );
    score += commonTags.length * 10;

    // 相同位置加分
    if (post.location === currentPost.location) {
      score += 5;
    }

    return score;
  };

  // 获取相关文章（排除当前文章）
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => ({
      ...post,
      relevance: calculateRelevance(post)
    }))
    .filter(post => post.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxCount);

  // 如果没有相关文章，显示最新的文章
  const displayPosts = relatedPosts.length > 0
    ? relatedPosts
    : allPosts
        .filter(post => post.id !== currentPost.id)
        .slice(0, maxCount);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="bg-gray-900/50 border border-white/10 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <i className="fas fa-book-open mr-2 text-purple-400"></i>
        相关推荐
      </h3>
      <div className="space-y-4">
        {displayPosts.map((post, index) => (
          <Link
            key={post.id}
            to={`/diary/blog/${post.id}`}
            className="block group"
          >
            <motion.div
              className="flex gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-all"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {/* 缩略图 */}
              <div className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-1 group-hover:text-purple-400 transition-colors line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-gray-500 text-sm line-clamp-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                  <span>
                    <i className="far fa-calendar-alt mr-1"></i>
                    {post.date}
                  </span>
                  <span>
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    {post.location}
                  </span>
                </div>
              </div>

              {/* 箭头图标 */}
              <div className="flex-shrink-0 flex items-center text-gray-600 group-hover:text-purple-400 transition-colors">
                <i className="fas fa-chevron-right"></i>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedPosts;
