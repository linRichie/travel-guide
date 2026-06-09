import React, { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { AMAP_KEY } from '../../../config/env';

/**
 * 旅行足迹高德地图组件
 * 使用高德地图 API 显示已访问国家的标记
 */
const AMapFootprint = ({ visitedCountries }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // 高德地图 Key

  // 国家坐标（经纬度）
  const countryCoords = {
    '中国': { lng: 116.4074, lat: 39.9042, zoom: 4 },
    '日本': { lng: 139.6917, lat: 35.6895, zoom: 5 },
    '法国': { lng: 2.3522, lat: 48.8566, zoom: 5 },
    '意大利': { lng: 12.4964, lat: 41.9028, zoom: 5 },
    '希腊': { lng: 23.7275, lat: 37.9838, zoom: 6 },
    '冰岛': { lng: -21.9426, lat: 64.1466, zoom: 6 },
    '瑞士': { lng: 8.5417, lat: 47.3769, zoom: 6 }
  };

  // 初始化地图
  useEffect(() => {
    AMapLoader.load({
      key: AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.ControlBar']
    }).then((AMap) => {
      if (!mapRef.current) return;

      try {
        // 创建地图实例
        const map = new AMap.Map(mapRef.current, {
          zoom: 3,
          center: [105, 35], // 中国中心
          viewMode: '2D',
          pitch: 0,
          rotation: 0,
          showLabel: true,
          mapStyle: 'amap://styles/darkblue', // 暗色主题
          features: ['bg', 'road', 'building'],
          scrollWheel: true
        });

        mapInstanceRef.current = map;
        setIsLoaded(true);

        // 添加标记
        visitedCountries.forEach((country, index) => {
          const coords = countryCoords[country.country];
          if (coords) {
            const marker = new AMap.Marker({
              position: [coords.lng, coords.lat],
              title: country.country,
              content: `
                <div class="custom-marker">
                  <div class="marker-icon">📍</div>
                  <div class="marker-tooltip">${country.country}</div>
                </div>
              `
            });
            marker.setMap(map);
          }
        });

        // 添加多边形连接线（可选）
        const path = visitedCountries
          .map(c => countryCoords[c.country])
          .filter(c => c)
          .map(c => [c.lng, c.lat]);

        if (path.length > 1) {
          const polyline = new AMap.Polyline({
            path: path,
            borderColor: '#8b5cf6',
            borderWeight: 2,
            strokeColor: '#8b5cf6',
            strokeOpacity: 0.5,
            lineJoin: 'round'
          });
          polyline.setMap(map);
        }
      } catch (err) {
        console.error('地图初始化失败:', err);
        setError('地图加载失败');
      }
    }).catch((err) => {
      console.error('高德地图加载失败:', err);
      setError('地图API加载失败');
    });

    // 清理函数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [visitedCountries]);

  // 自定义标记样式
  useEffect(() => {
    if (!isLoaded) return;

    const style = document.createElement('style');
    style.textContent = `
      .custom-marker {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .marker-icon {
        font-size: 24px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      }
      .marker-tooltip {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(139, 92, 246, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isLoaded]);

  if (error) {
    return (
      <div className="relative w-full aspect-[2/1] bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>地图加载失败</p>
          <p className="text-sm mt-1">请检查网络连接</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[2/1] bg-gray-900 rounded-xl overflow-hidden">
      {/* 地图容器 */}
      <div ref={mapRef} className="w-full h-full"></div>

      {/* 加载状态 */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-gray-400 text-sm">地图加载中...</p>
          </div>
        </div>
      )}

      {/* 图例 */}
      <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-300 text-sm">已访问国家</span>
        </div>
      </div>
    </div>
  );
};

export default AMapFootprint;
