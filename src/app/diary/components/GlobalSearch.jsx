import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { getSearchSuggestions } from '../utils/searchUtils';

/**
 * 全局搜索组件
 * 支持搜索建议和跳转到搜索结果页
 */
const GlobalSearch = ({ variant = 'header' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // 快捷键支持 (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
        if (!isOpen) {
          setTimeout(() => inputRef.current?.focus(), 0);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 获取搜索建议
  useEffect(() => {
    if (query.trim().length >= 2) {
      setSuggestions(getSearchSuggestions(query, 8));
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [query]);

  // 键盘导航
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      setQuery(suggestions[selectedIndex]);
      handleSearch(suggestions[selectedIndex]);
    }
  };

  // 执行搜索
  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      navigate(`/diary/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setQuery('');
      setSuggestions([]);
    }
  };

  // 选择建议
  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  // Header 版本的紧凑搜索栏
  if (variant === 'header') {
    return (
      <div className="relative" ref={searchRef}>
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isDark
              ? 'bg-white/5 hover:bg-white/10 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <i className="fas fa-search"></i>
          <span className="text-sm">搜索...</span>
          <kbd className={`ml-auto text-xs px-2 py-0.5 rounded ${
            isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500'
          }`}>⌘K</kbd>
        </button>

        {/* 搜索弹窗 */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* 遮罩 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />

              {/* 搜索框 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
              >
                <div className={`mx-4 rounded-2xl shadow-2xl overflow-hidden ${
                  isDark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'
                }`}>
                  {/* 输入框 */}
                  <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10">
                    <i className="fas fa-search text-purple-400 text-lg"></i>
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="搜索博客、图片、标签..."
                      className={`flex-1 bg-transparent outline-none text-lg ${
                        isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                      }`}
                      autoFocus
                    />
                    {query && (
                      <button
                        onClick={() => setQuery('')}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                        }`}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                    <kbd className={`text-xs px-2 py-1 rounded ${
                      isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}>ESC</kbd>
                  </div>

                  {/* 搜索建议 */}
                  {suggestions.length > 0 && (
                    <div className="max-h-80 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => selectSuggestion(suggestion)}
                          className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${
                            index === selectedIndex
                              ? 'bg-purple-500/20'
                              : isDark
                                ? 'hover:bg-white/5'
                                : 'hover:bg-gray-50'
                          }`}
                        >
                          <i className={`fas fa-search text-gray-500`}></i>
                          <span className={isDark ? 'text-white' : 'text-gray-900'}>
                            {suggestion}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 快捷提示 */}
                  {suggestions.length === 0 && query.trim().length >= 2 && (
                    <div className="px-6 py-8 text-center">
                      <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        按下 <kbd className="px-2 py-1 rounded bg-white/10">Enter</kbd> 搜索 "{query}"
                      </p>
                    </div>
                  )}

                  {/* 底部提示 */}
                  {suggestions.length === 0 && query.trim().length < 2 && (
                    <div className="px-6 py-4 border-t border-white/10">
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                          <kbd className="px-2 py-1 rounded bg-white/10">↑↓</kbd> 导航
                        </span>
                        <span className="flex items-center gap-2">
                          <kbd className="px-2 py-1 rounded bg-white/10">↵</kbd> 选择
                        </span>
                        <span className="flex items-center gap-2">
                          <kbd className="px-2 py-1 rounded bg-white/10">ESC</kbd> 关闭
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // 页面内嵌版本
  return (
    <div className={`w-full max-w-2xl mx-auto`} ref={searchRef}>
      <div className={`relative rounded-2xl overflow-hidden ${
        isDark
          ? 'bg-white/5 border border-white/10'
          : 'bg-white border border-gray-200 shadow-lg'
      }`}>
        <div className="flex items-center gap-4 px-6 py-4">
          <i className="fas fa-search text-purple-400 text-lg"></i>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索博客、图片、标签..."
            className={`flex-1 bg-transparent outline-none text-lg ${
              isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
          <button
            onClick={() => handleSearch()}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            搜索
          </button>
        </div>

        {/* 搜索建议下拉 */}
        {suggestions.length > 0 && query && (
          <div className={`border-t border-white/10 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className={`w-full flex items-center gap-4 px-6 py-3 transition-colors text-left ${
                  index === selectedIndex
                    ? 'bg-purple-500/20'
                    : isDark
                      ? 'hover:bg-white/5'
                      : 'hover:bg-gray-100'
                }`}
              >
                <i className="fas fa-search text-gray-500"></i>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>
                  {suggestion}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 热门搜索标签 */}
      <div className="mt-6">
        <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          热门搜索
        </p>
        <div className="flex flex-wrap gap-2">
          {['巴黎', '京都', '极光', '博物馆', '水城'].map(tag => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                isDark
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
