import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  Mountain,
  Landmark,
  MapPin,
  CalendarDays,
  Clock,
  Twitter,
  Github,
  Map
} from 'lucide-react';

const AnhuiTravelGuide = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);
  const mapSDK = useRef(null);
  const mapInstance = useRef(null);

  const attractions = [
    {
      name: "黄山风景区",
      address: "汤口镇汤泉路1号",
      highlight: "中国十大名山之一",
      description: "以奇松、怪石、云海、温泉、冬雪五绝著称，有'天下第一奇山'之称。",
      time: "2-3天",
      bestSeason: "春秋季"
    },
    {
      name: "九华山风景区",
      address: "九华镇九华街",
      highlight: "佛教四大名山",
      description: "中国佛教四大名山之一，素有'东南第一山'之称。",
      time: "1-2天",
      bestSeason: "全年"
    },
    {
      name: "宏村",
      address: "宏村镇",
      highlight: "水墨画里的乡村",
      description: "世界文化遗产，被誉为'中国画里的乡村'。",
      time: "1天",
      bestSeason: "春秋季"
    },
    {
      name: "巢湖国家重点风景名胜区",
      address: "006县道与024县道交叉口西南240米",
      highlight: "中国五大淡水湖之一",
      description: "中国五大淡水湖之一，湖光山色相映成趣。",
      time: "1天",
      bestSeason: "春夏"
    }
  ];

  const itinerary = [
    {
      day: "Day 1",
      title: "黄山风景区",
      time: "全天",
      activities: [
        "上午：云谷寺乘缆车上山",
        "下午：游览始信峰、狮子峰",
        "晚上：入住山顶酒店"
      ]
    },
    {
      day: "Day 2",
      title: "黄山风景区",
      time: "全天",
      activities: [
        "清晨：光明顶观日出",
        "上午：游览西海大峡谷",
        "下午：下山前往宏村"
      ]
    },
    {
      day: "Day 3",
      title: "宏村",
      time: "全天",
      activities: [
        "上午：游览南湖、月沼",
        "下午：参观承志堂等古民居",
        "晚上：返回市区"
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    AMapLoader.load({
      key: 'd17c17f8f712c81a7e4241aff4faa7b0',
      plugins: ['AMap.Marker', 'AMap.InfoWindow']
    }).then(AMap => {
      mapSDK.current = AMap;
      const map = new AMap.Map(mapContainerRef.current, {
        viewMode: '2D',
        zoom: 8,
        center: [117.28, 31.86]
      });
      mapInstance.current = map;

      attractions.forEach(attraction => {
        const marker = new AMap.Marker({
          position: [117 + Math.random() * 2, 30 + Math.random() * 2],
          title: attraction.name
        });
        marker.setMap(map);
      });

      setIsMapLoaded(true);
    }).catch(e => {
      console.error(e);
    });

    return () => {
      mapInstance.current?.destroy();
    };
  }, []);

  const scrollToSection = (index) => {
    const section = document.querySelectorAll('.section')[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center section">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1470004914212-05527e49370b"
            alt="Huangshan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 z-10 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-orange-500">
            ANHUI
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">安徽旅游指南</h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12">
            探索中国东部的自然奇观与文化瑰宝
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-all"
            onClick={() => scrollToSection(1)}
          >
            开始探索
          </motion.button>
        </motion.div>
      </section>

      {/* Attractions Section */}
      <section className="py-20 section">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            景点<span className="text-orange-500">推荐</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {attractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-6 backdrop-blur-lg"
              >
                <h3 className="text-2xl font-bold mb-2">{attraction.name}</h3>
                <p className="text-orange-500 mb-4">{attraction.highlight}</p>
                <p className="text-gray-400 mb-4">{attraction.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {attraction.time}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    {attraction.bestSeason}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="py-20 bg-white/5 section">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            行程<span className="text-orange-500">规划</span>
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {itinerary.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mr-6">
                    <div className="text-xl font-bold">{index + 1}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{day.day} · {day.title}</h3>
                    <div className="pl-6 border-l-2 border-orange-500/30">
                      {day.activities.map((activity, i) => (
                        <div key={i} className="mb-3 last:mb-0">
                          <div className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 mr-4"></div>
                            <p className="text-gray-400">{activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 section">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            景点<span className="text-orange-500">地图</span>
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/3"
            >
              <div className="bg-black border border-white/10 rounded-xl overflow-hidden h-[500px] relative">
                {!isMapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="animate-pulse text-orange-500">
                      <Map size={48} />
                    </div>
                  </div>
                )}
                <div ref={mapContainerRef} className="w-full h-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex space-x-6 mb-8">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <Github size={24} />
              </a>
            </div>
            
            <div className="text-white/50 text-sm">
              <p>© 2025 Wang L. Richie. All rights reserved.</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-white/40 text-xs">
            <p>created by <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Wang L. Richie </a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnhuiTravelGuide;
