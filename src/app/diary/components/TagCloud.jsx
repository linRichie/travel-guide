import React from 'react';
import { motion } from 'framer-motion';

/**
 * 标签云组件
 * 显示所有文章标签，支持筛选
 */
const TagCloud = ({ tags, activeTag, onTagClick, title = '标签云' }) => {
  // 按标签使用频率排序（如果提供了 count 数据）
  const sortedTags = tags.sort((a, b) => (b.count || 0) - (a.count || 0));

  return (
    <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <i className="fas fa-tags mr-2 text-purple-400"></i>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {sortedTags.map((tag, index) => {
          const tagValue = typeof tag === 'string' ? tag : tag.name;
          const tagCount = typeof tag === 'string' ? 0 : (tag.count || 0);

          return (
            <motion.button
              key={tagValue}
              onClick={() => onTagClick && onTagClick(tagValue)}
              className={`px-3 py-2 rounded-full text-sm transition-all ${
                activeTag === tagValue
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: activeTag === tagValue ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tagValue}
              {tagCount > 0 && (
                <span className="ml-1 opacity-60">({tagCount})</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TagCloud;
