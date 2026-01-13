import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * 博客文章目录（Table of Contents）组件
 * 从 Markdown 内容中自动提取标题生成目录
 */
const BlogTOC = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // 解析 Markdown 内容中的标题
    const lines = content.split('\n');
    const extractedHeadings = [];

    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        extractedHeadings.push({
          id: `heading-${index}`,
          text: line.slice(3).trim(),
          level: 2
        });
      } else if (line.startsWith('### ')) {
        extractedHeadings.push({
          id: `heading-${index}`,
          text: line.slice(4).trim(),
          level: 3
        });
      }
    });

    setHeadings(extractedHeadings);

    // 为页面中的标题元素添加 ID
    extractedHeadings.forEach(heading => {
      const elements = document.querySelectorAll('h2, h3');
      elements.forEach(el => {
        if (el.textContent === heading.text) {
          el.id = heading.id;
        }
      });
    });
  }, [content]);

  useEffect(() => {
    // 监听滚动，高亮当前可见的标题
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // 顶部导航栏高度
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="sticky top-24 bg-gray-900/50 border border-white/10 rounded-2xl p-6 max-h-[calc(100vh-120px)] overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center">
        <i className="fas fa-list mr-2 text-purple-400"></i>
        目录
      </h3>
      <nav className="space-y-2">
        {headings.map((heading, index) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`block py-2 px-3 rounded-lg text-sm transition-all ${
              activeId === heading.id
                ? 'bg-purple-500/20 text-purple-300 font-medium border-l-2 border-purple-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            } ${heading.level === 3 ? 'ml-4' : ''}`}
            style={{
              transitionDelay: `${index * 0.05}s`
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </motion.div>
  );
};

export default BlogTOC;
