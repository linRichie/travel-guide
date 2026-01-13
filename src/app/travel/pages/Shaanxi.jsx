import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Castle, Mountain, Trees, Landmark, MountainSnow, Waves, Factory, Church, Tent, Flag, GalleryHorizontal, Home, CalendarDays } from 'lucide-react';
import AMapLoader from '@amap/amap-jsapi-loader';

const ShaanxiTravelGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  const attractions = [
    { name: '大唐不夜城', address: '雁塔南路498号', icon: <Castle />, category: '城市文化' },
    { name: '法门文化景区', address: '法门镇', icon: <Church />, category: '历史文化' },
    { name: '陕西黄河壶口瀑布', address: '壶口镇延壶路', icon: <Waves />, category: '自然景观' },
    { name: '兴汉胜境', address: '诸汉路', icon: <Landmark />, category: '历史文化' },
    { name: '汉中龙头山', address: '汉通路', icon: <Mountain />, category: '自然景观' },
    { name: '陕西波浪谷', address: '龙洲镇', icon: <GalleryHorizontal />, category: '地质奇观' },
    { name: '华山风景名胜区', address: '集灵路', icon: <MountainSnow />, category: '自然景观' },
    { name: '太白山国家森林公园', address: '汤峪镇', icon: <Trees />, category: '自然景观' },
    { name: '华夏文旅海洋公园', address: '浐灞生态区', icon: <Factory />, category: '主题公园' },
    { name: '郑国渠旅游风景区', address: '王桥镇', icon: <Flag />, category: '历史文化' },
  ];

  const itinerary = [
    { day: 'Day 1', title: '西安文化探索', activities: ['上午: 参观大唐不夜城', '下午: 游览回民街', '晚上: 钟楼夜景'] },
    { day: 'Day 2', title: '自然奇观之旅', activities: ['上午: 前往华山', '下午: 登山观景', '晚上: 山脚住宿'] },
    { day: 'Day 3', title: '历史遗迹巡礼', activities: ['上午: 参观法门寺', '下午: 游览乾陵', '晚上: 返回西安'] },
  ];

  useEffect(() => {
    AMapLoader.load({
      key: 'd17c17f8f712c81a7e4241aff4faa7b0',
      plugins: ['AMap.MarkerClusterer', 'AMap.ToolBar', 'AMap.Scale'],
    }).then((AMap) => {
      mapInstance.current = new AMap.Map(mapContainerRef.current, {
        viewMode: '3D',
        zoom: 7,
        center: [108.948024, 34.263161],
      });
      setIsMapLoaded(true);

      // 添加景点标记
      attractions.forEach(attraction => {
        new AMap.Marker({
          position: getRandomCoordinate([108.948024, 34.263161], 1.5),
          map: mapInstance.current,
          content: `<div style="background: rgba(249, 115, 22, 0.9); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${attraction.name}</div>`,
        });
      });

      // 添加控件
      mapInstance.current.addControl(new AMap.ToolBar());
      mapInstance.current.addControl(new AMap.Scale());
    }).catch(e => {
      console.error('地图加载失败:', e);
    });

    return () => {
      mapInstance.current?.destroy();
    };
  }, []);

  const getRandomCoordinate = (center, radius) => {
    const [lng, lat] = center;
    const randomLng = lng + (Math.random() * radius * 2 - radius);
    const randomLat = lat + (Math.random() * radius * 2 - radius);
    return [randomLng, randomLat];
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* 导航条 */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md p-4 border-b border-orange-500/20">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold"
          >
            <span className="text-orange-500">SHAANXI</span> GUIDE
          </motion.div>
          <div className="hidden md:flex space-x-6">
            {['overview', 'attractions', 'itinerary', 'map'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`${activeSection === item ? 'text-orange-500' : 'text-gray-400'
                  } hover:text-orange-400 transition-colors uppercase text-sm font-medium`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="md:hidden text-gray-400 hover:text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* 主标题区 */}
      <header id="overview" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/70 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full h-full bg-[url('https://s.coze.cn/t/reQ4FqZiA-Y/')] bg-cover bg-center"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-orange-500">陕西</span>旅游指南
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            EXPLORE THE CULTURAL HEART OF CHINA
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-8 rounded-full text-lg transition-all"
          >
            开始探索
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </header>

      {/* 景点统计区 */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 text-center"
            >
              <div className="text-5xl font-bold text-orange-500 mb-2">20+</div>
              <div className="text-gray-400 uppercase text-sm">热门景点</div>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 text-center"
            >
              <div className="text-5xl font-bold text-orange-500 mb-2">5</div>
              <div className="text-gray-400 uppercase text-sm">世界遗产</div>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 text-center"
            >
              <div className="text-5xl font-bold text-orange-500 mb-2">3000+</div>
              <div className="text-gray-400 uppercase text-sm">年历史</div>
            </motion.div>
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-900/50 border border-orange-500/20 rounded-xl p-6 text-center"
            >
              <div className="text-5xl font-bold text-orange-500 mb-2">4</div>
              <div className="text-gray-400 uppercase text-sm">季节美景</div>
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-16 text-center"
          >
            <span className="text-orange-500">陕西</span>必游景点
          </motion.h2>
        </div>
      </section>

      {/* 景点展示区 */}
      <section id="attractions" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-black/50 border border-orange-500/20 rounded-xl overflow-hidden group"
              >
                <div className="h-48 bg-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/api/coze_space/text2image?prompt=陕西景点'+encodeURIComponent(attraction.name)+'&width=600&height=400')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-black">
                      {attraction.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{attraction.name}</h3>
                  <p className="text-gray-400 mb-4 flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    {attraction.address}
                  </p>
                  <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-xs font-medium">
                    {attraction.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 行程规划区 */}
      <section id="itinerary" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-16 text-center"
          >
            <span className="text-orange-500">经典</span>行程方案
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {itinerary.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-start">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-black mr-6">
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{day.day}: {day.title}</h3>
                    <ul className="space-y-3">
                      {day.activities.map((activity, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                          <span className="text-gray-300">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 地图展示区 */}
      <section id="map" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-16 text-center"
          >
            <span className="text-orange-500">景点</span>分布地图
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[600px] rounded-xl overflow-hidden border border-orange-500/20 relative"
          >
            {!isMapLoaded && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="animate-pulse text-orange-500">地图加载中...</div>
              </div>
            )}
            <div ref={mapContainerRef} className="w-full h-full"></div>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 bg-black border-t border-orange-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">SHAANXI TRAVEL GUIDE</h3>
              <p className="text-gray-400">探索陕西的千年文化与自然奇观</p>
            </div>

            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="https://x.com/Jone12suny" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://github.com/linRichie" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 Wang L. Richie. All rights reserved.</p>
            <p className="mt-2">Created by Wang L. Richie</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShaanxiTravelGuide;