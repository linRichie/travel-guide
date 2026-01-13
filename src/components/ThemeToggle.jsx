import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

/**
 * 主题切换按钮组件
 * 支持暗黑/明亮模式切换，带平滑动画效果
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
        isDark
          ? 'bg-gray-700 border-gray-600'
          : 'bg-yellow-100 border-yellow-300'
      } border-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
    >
      {/* 滑块 */}
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center"
        animate={{ left: isDark ? '4px' : 'calc(100% - 24px)' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {/* 太阳图标（明亮模式） */}
        <motion.svg
          className="w-4 h-4 text-yellow-500 absolute"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: isDark ? 0 : 1, rotate: isDark ? -90 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>

        {/* 月亮图标（暗黑模式） */}
        <motion.svg
          className="w-4 h-4 text-blue-300 absolute"
          initial={{ scale: 0, rotate: 90 }}
          animate={{ scale: isDark ? 1 : 0, rotate: isDark ? 0 : 90 }}
          transition={{ duration: 0.2 }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </motion.div>

      {/* 背景装饰 - 星星（暗黑模式） */}
      {isDark && (
        <>
          <motion.span
            className="absolute w-1 h-1 bg-yellow-200 rounded-full top-2 left-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="absolute w-0.5 h-0.5 bg-yellow-200 rounded-full top-4 left-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}

      {/* 背景装饰 - 云朵（明亮模式） */}
      {!isDark && (
        <motion.span
          className="absolute w-2 h-1 bg-white/60 rounded-full top-2 left-2"
          initial={{ x: 0, opacity: 0.5 }}
          animate={{ x: [0, 2, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

/**
 * 简单版主题切换按钮（使用 Font Awesome 图标）
 */
export const ThemeToggleSimple = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        isDark
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
          : 'bg-gray-200 text-yellow-600 hover:bg-gray-300'
      } ${className}`}
      aria-label={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
    >
      <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
    </button>
  );
};

export default ThemeToggle;
