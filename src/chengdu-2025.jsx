
import React, { useState, useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { 
  MapPin, 
  Calendar, 
  Plane, 
  Train, 
  Car, 
  Utensils, 
  Hotel, 
  Mountain, 
  PawPrint,
  Ticket,
  Camera,
  ShoppingBag,
  Coffee
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ChengduTravelGuide = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mapLoaded, setMapLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Apple-style scroll animations
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 200], [1, 0.95]);

  useEffect(() => {
    AMapLoader.load({
      key: 'd17c17f8f712c81a7e4241aff4faa7b0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Marker']
    }).then((AMap) => {
      const map = new AMap.Map('map-container', {
        viewMode: '2D',
        zoom: 11,
        center: [104.06, 30.67],  // 成都中心坐标
        mapStyle: 'amap://styles/whitesmoke'  // 白色主题
      });
      
      // 添加缩放控件
      map.addControl(new AMap.Scale());
      
      // 添加工具条
      map.addControl(new AMap.ToolBar());
      
      // 添加标记点
      const markers = [
        {name: '熊猫基地', position: [104.156, 30.741]},
        {name: '宽窄巷子', position: [104.055, 30.668]},
        {name: '锦里', position: [104.052, 30.645]},
        {name: '都江堰', position: [103.618, 31.003]},
        {name: '青城山', position: [103.536, 30.901]}
      ];
      
      markers.forEach(marker => {
        new AMap.Marker({
          position: marker.position,
          title: marker.name,
          map: map
        });
      });
      
      setMapLoaded(true);
    }).catch(e => {
      console.error('地图加载失败:', e);
    });
  }, []);

  const attractions = [
    {
      name: '成都大熊猫繁育研究基地',
      icon: <PawPrint className="text-green-600" />,
      image: 'https://s.coze.cn/t/c7hyR0qabCQ/'
    },
    {
      name: '宽窄巷子',
      icon: <ShoppingBag className="text-orange-600" />,
      image: 'https://s.coze.cn/t/EXq2gezxp6Q/'
    },
    {
      name: '锦里古街',
      icon: <Coffee className="text-red-600" />,
      image: 'https://s.coze.cn/t/iqhe6GpzoVw/'
    },
    {
      name: '都江堰',
      icon: <Mountain className="text-blue-600" />,
      image: 'https://s.coze.cn/t/6pl1jnr6tPY/'
    },
    {
      name: '青城山',
      icon: <Mountain className="text-purple-600" />,
      image: 'https://s.coze.cn/t/biBRg9nydYI/'
    }
  ];

  const activities = [
    {
      title: '成都世园会系列活动',
      date: '4月26日 - 10月28日',
      description: '东部新区主会场开展"成都主题周"启动演出，以及6场"遇见世园"系列主题活动'
    },
    {
      title: '潮玩三国 烟火锦里',
      date: '5月1 - 5日',
      description: '锦里将以"国风 + 新潮"为主题开展沉浸式文化体验活动'
    },
    {
      title: '成都首届停机坪音乐啤酒节',
      date: '5月1 - 4日',
      description: '在成都东部新区三鱼萌狮文化村举办，有啤酒、音乐、烧烤、篝火等活动'
    },
    {
      title: '熊猫谷第三届高山杜鹃花会',
      date: '持续至5月24日',
      description: '在都江堰熊猫谷举办，举行"大熊猫与杜鹃花保护研究"分享交流会等活动'
    },
    {
      title: '2024成都·蒲江樱桃采摘季',
      date: '持续至5月',
      description: '在蒲江县樱桃山旅游景区，开展有山货节、有氧登山节等丰富活动'
    },
    {
      title: '第十二届穿上旗袍去安仁',
      date: '5月1日 - 5月30日',
      description: '在安仁古镇公馆老街举行，众多旗袍主题活动接踵而至'
    }
  ];

  const performances = [
    {
      title: '苏打绿二十年一刻巡回演唱会 - 成都站',
      date: '5月4、5日',
      location: '凤凰山体育公园综合体育馆'
    },
    {
      title: '印象京剧《薛涛》',
      date: '5月1日',
      location: '新声剧场'
    },
    {
      title: '《春江花月夜》天姿国乐国潮音乐会',
      date: '5月4日19:30',
      location: '成都高新中演大剧院 - 大剧场'
    }
  ];

  return (
    <div className="w-full">
      {/* Header with large typography */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <div className="relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-8xl md:text-9xl font-bold mb-4 tracking-tight"
          >
            成都
            <span className="block text-2xl mt-4 font-normal text-gray-400 tracking-widest">CHENGDU</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-400 mt-6">The City of Gastronomy</p>
        </div>
      </motion.header>

      {/* Content Sections */}
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Bento Grid Layout for Attractions */}
        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <img 
                  src={attraction.image} 
                  alt={attraction.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 rounded-full">
                      {attraction.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{attraction.name}</h3>
                  <p className="text-sm text-gray-400">TOURIST ATTRACTION</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section className="py-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl md:text-7xl font-bold mb-12"
          >
            活动
            <span className="text-xl ml-4 font-normal text-gray-400">ACTIVITIES</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 bg-opacity-50 p-8 rounded-2xl"
              >
                <div className="text-8xl font-bold text-gray-800 mb-4">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
                <div className="flex items-center text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{activity.date}</span>
                </div>
                <p className="text-gray-300">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 z-10" />
            {mapLoaded && (
              <div id="map-container" className="h-[600px] rounded-3xl overflow-hidden" />
            )}
          </div>
        </section>

        {/* Performances Section */}
        <section className="py-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-8xl md:text-9xl font-bold mb-12"
          >
            演出
            <span className="block text-2xl mt-4 font-normal text-gray-400 tracking-widest">PERFORMANCES</span>
          </motion.h2>
          <div className="space-y-6">
            {performances.map((performance, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 bg-opacity-50 p-6 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{performance.title}</h3>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{performance.date}</span>
                  </div>
                </div>
                <div className="mt-2 text-gray-400 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{performance.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-white/10 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>作者: Wang L. Richie | 年份: © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default ChengduTravelGuide;
