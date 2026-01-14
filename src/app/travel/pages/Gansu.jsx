import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AMapLoader from '@amap/amap-jsapi-loader';
import { ChevronRight, MapPin, Calendar, Clock, Compass, Mountain, Landmark, Castle } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const GansuTravel = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mapRef = useRef(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 景点数据
  const attractions = [
    { name: '兰州官滩沟风景区', address: '和平镇金川大道', lat: 36.0415, lng: 103.8399 },
    { name: '兰州兴隆山风景区', address: '城关镇兴隆山村1号', lat: 35.9521, lng: 104.1143 },
    { name: '兰州黄河风情线大景区', address: '南滨河东路与小西湖东街交叉口东320米', lat: 36.0612, lng: 103.8238 },
    { name: '甘肃省博物馆', address: '西津西路3号', lat: 36.0489, lng: 103.7596 },
    { name: '西部恐龙园度假区', address: '凤凰山路1555号', lat: 36.0934, lng: 103.7241 }
  ];

  // 行程安排
  const itinerary = [
    { day: 'Day 1', time: '09:00', activity: '抵达兰州', description: 'Check in at hotel' },
    { day: 'Day 1', time: '10:30', activity: '甘肃省博物馆', description: 'Explore cultural relics' },
    { day: 'Day 1', time: '14:00', activity: '黄河风情线', description: 'Riverside sightseeing' },
    { day: 'Day 2', time: '08:00', activity: '兴隆山风景区', description: 'Hiking and nature' },
    { day: 'Day 2', time: '15:00', activity: '官滩沟风景区', description: 'Scenic valley tour' }
  ];

  // 初始化地图
  useEffect(() => {
    AMapLoader.load({
      key: 'd17c17f8f712c81a7e4241aff4faa7b0',
      plugins: ['AMap.Scale', 'AMap.ToolBar']
    }).then(AMap => {
      const map = new AMap.Map(mapRef.current, {
        zoom: 12,
        center: [103.8343, 36.0610]
      });

      // 添加景点标记
      attractions.forEach(attraction => {
        new AMap.Marker({
          position: new AMap.LngLat(attraction.lng, attraction.lat),
          title: attraction.name,
          map: map
        });
      });

      setIsMapLoaded(true);
    }).catch(e => {
      console.error('地图加载失败:', e);
    });
  }, []);

  // 滚动动画处理
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'attractions', 'itinerary', 'map'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element?.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'} font-sans overflow-x-hidden`}>
      {/* 导航 */}
      <nav className={`sticky top-0 z-50 ${isDark ? 'bg-black/80 border-orange-500/20' : 'bg-white/80 border-orange-500/30'} backdrop-blur-md p-4 border-b`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            GANSU GUIDE
          </div>
          <div className="hidden md:flex space-x-8">
            {['overview', 'attractions', 'itinerary', 'map'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`${
                  activeSection === item ? 'text-orange-500' : isDark ? 'text-gray-400' : 'text-gray-600'
                } hover:text-orange-400 transition-colors uppercase text-sm tracking-wider`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 py-16">
        {/* 概览部分 */}
        <section id="overview" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                EXPLORE GANSU
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
                甘肃位于中国西北部，是古丝绸之路的重要通道，拥有丰富的历史文化遗产和壮丽的自然景观。
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-700/10 border border-orange-500/20 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-orange-500">20+</div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>热门景点</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-700/10 border border-orange-500/20 p-6 rounded-xl">
                  <div className="text-4xl font-bold text-orange-500">5</div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>世界遗产</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-2xl blur-xl"></div>
              <img 
                src="https://s.coze.cn/t/TeE7o3tT5XE/"
                alt="Gansu Landscape"
                className="w-full h-auto rounded-2xl border border-orange-500/30"
              />
            </div>
          </motion.div>
        </section>

        {/* 热门景点 */}
        <section id="attractions" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-12">
              <div className="w-12 h-0.5 bg-orange-500 mr-4"></div>
              <h2 className="text-4xl font-bold">热门景点</h2>
              <div className="flex-1 h-0.5 bg-gray-800 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} border rounded-xl overflow-hidden group`}
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={`https://s.coze.cn/t/TgT_H_F7pOc/`}
                      alt={attraction.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <MapPin className="text-orange-500 mr-2" size={18} />
                      <h3 className="text-xl font-bold">{attraction.name}</h3>
                    </div>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{attraction.address}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-orange-500/80">SCENIC SPOT</span>
                      <ChevronRight className="text-orange-500" size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 行程安排 */}
        <section id="itinerary" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-12">
              <div className="w-12 h-0.5 bg-orange-500 mr-4"></div>
              <h2 className="text-4xl font-bold">推荐行程</h2>
              <div className={`flex-1 h-0.5 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} ml-4`}></div>
            </div>

            <div className="relative">
              <div className="absolute left-5 h-full w-0.5 bg-gradient-to-b from-orange-500 to-transparent md:left-1/2 md:-ml-1"></div>

              {itinerary.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`mb-8 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} order-1 md:order-none`}>
                    <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} border rounded-xl p-6`}>
                      <div className="flex items-center mb-2">
                        <Calendar className="text-orange-500 mr-2" size={18} />
                        <span className="font-bold">{item.day}</span>
                        <Clock className="text-orange-500 ml-4 mr-2" size={18} />
                        <span>{item.time}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.activity}</h3>
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{item.description}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white z-10 mx-auto mb-4 md:mb-0 md:mx-0">
                    {index % 2 === 0 ? (
                      <Mountain size={20} />
                    ) : (
                      <Landmark size={20} />
                    )}
                  </div>
                  <div className="flex-1 order-2 md:order-none"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 地图部分 */}
        <section id="map" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-12">
              <div className="w-12 h-0.5 bg-orange-500 mr-4"></div>
              <h2 className="text-4xl font-bold">景点地图</h2>
              <div className={`flex-1 h-0.5 ${isDark ? 'bg-gray-800' : 'bg-gray-200'} ml-4`}></div>
            </div>

            <div className={`${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} border rounded-xl overflow-hidden`}>
              <div ref={mapRef} className="w-full h-96"></div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2">甘肃景点分布</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>点击地图标记查看景点详情</p>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                    <Compass className="mr-2" size={18} />
                    查看路线
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* 页脚 */}
      <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t py-12`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
                GANSU TRAVEL
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>探索丝绸之路的千年传奇</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://x.com/Jone12suny" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                Twitter/X
              </a>
              <a href="https://github.com/linRichie" className={`transition-colors ${isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}>
                GitHub
              </a>
            </div>
          </div>
          <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} mt-8 pt-8 text-center md:text-left`}>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Created by <a href="#" className="text-orange-500 hover:underline">Wang L. Richie</a>
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              © Wang L. Richie 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GansuTravel;
