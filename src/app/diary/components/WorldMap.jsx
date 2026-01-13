import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * 世界地图足迹组件
 * 显示已访问国家的地理位置标记
 */
const WorldMap = ({ visitedCountries }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // 国家坐标（百分比）
  const countryPositions = {
    '中国': { x: 78, y: 38, flag: '🇨🇳' },
    '日本': { x: 85, y: 36, flag: '🇯🇵' },
    '法国': { x: 48, y: 30, flag: '🇫🇷' },
    '意大利': { x: 51, y: 35, flag: '🇮🇹' },
    '希腊': { x: 56, y: 38, flag: '🇬🇷' },
    '冰岛': { x: 40, y: 18, flag: '🇮🇸' },
    '瑞士': { x: 50, y: 32, flag: '🇨🇭' }
  };

  // 获取已访问的国家数据
  const markers = visitedCountries.map(country => ({
    ...country,
    position: countryPositions[country.country]
  })).filter(c => c.position);

  return (
    <div className="relative w-full aspect-[2/1] bg-gray-900/50 rounded-xl overflow-hidden">
      {/* 简化的世界地图背景 */}
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 简化的大陆轮廓 */}
        <g fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="0.3">
          {/* 北美洲 */}
          <path d="M5,8 L25,8 L28,15 L25,25 L15,28 L8,22 L5,15 Z" />
          {/* 南美洲 */}
          <path d="M18,30 L25,30 L28,35 L25,48 L20,45 L18,35 Z" />
          {/* 欧洲 */}
          <path d="M42,12 L55,12 L58,18 L55,25 L45,25 L42,18 Z" />
          {/* 非洲 */}
          <path d="M45,28 L58,28 L60,40 L55,48 L48,45 L45,35 Z" />
          {/* 亚洲 */}
          <path d="M58,10 L90,10 L92,25 L88,35 L70,38 L58,30 Z" />
          {/* 大洋洲 */}
          <path d="M75,40 L90,40 L92,48 L85,48 L78,45 Z" />
        </g>

        {/* 网格线 */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.1">
          {[...Array(10)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="50" />
          ))}
          {[...Array(5)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} />
          ))}
        </g>

        {/* 标记点 */}
        {markers.map((marker, index) => (
          <g key={marker.country}>
            {/* 脉冲效果圆圈 */}
            <circle
              cx={marker.position.x}
              cy={marker.position.y}
              r="2"
              fill="rgba(139, 92, 246, 0.3)"
            >
              <animate
                attributeName="r"
                values="1;3;1"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 标记点 */}
            <motion.circle
              cx={marker.position.x}
              cy={marker.position.y}
              r="1"
              fill="#8b5cf6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCountry(marker)}
              onMouseLeave={() => setHoveredCountry(null)}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />

            {/* 国家标签 */}
            <text
              x={marker.position.x}
              y={marker.position.y - 2.5}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="1.5"
            >
              {marker.flag}
            </text>
          </g>
        ))}
      </svg>

      {/* 悬浮信息卡片 */}
      {hoveredCountry && (
        <motion.div
          className="absolute bg-gray-800/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-xl pointer-events-none"
          style={{
            left: `${hoveredCountry.position.x}%`,
            top: `${hoveredCountry.position.y - 15}%`,
            transform: 'translate(-50%, -100%)'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{hoveredCountry.position.flag}</span>
            <div>
              <div className="text-white font-medium">{hoveredCountry.country}</div>
              <div className="text-gray-400 text-xs">{hoveredCountry.cities.length} 个城市</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 图例 */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        <span className="text-gray-400 text-sm">已访问</span>
      </div>
    </div>
  );
};

export default WorldMap;
