
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Compass, Mountain, Trees, Flag, Calendar, Plane, Hotel, Utensils, MapPin, ArrowRight } from 'lucide-react';
import AMapLoader from '@amap/amap-jsapi-loader';

const SichuanTravel = () => {
  const [activeTab, setActiveTab] = useState('april');
  const [activePlan, setActivePlan] = useState('plan1');
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  // 初始化地图
  useEffect(() => {
    AMapLoader.load({
      key: 'd17c17f8f712c81a7e4241aff4faa7b0',
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
    }).then((AMap) => {
      mapInstance.current = new AMap.Map(mapContainerRef.current, {
        viewMode: '3D',
        zoom: 7,
        center: [103.834305, 30.845762], // 四川中心位置
      });
      
      // 添加景点标记
      const markers = [
        { name: '九寨沟', position: [103.917, 33.174] },
        { name: '黄龙', position: [103.817, 32.733] },
        { name: '峨眉山', position: [103.336, 29.551] },
        { name: '都江堰', position: [103.627, 31.003] },
        { name: '青城山', position: [103.6, 30.9] },
        { name: '乐山大佛', position: [103.773, 29.545] },
        { name: '稻城亚丁', position: [100.297, 28.437] },
        { name: '西岭雪山', position: [103.2, 30.9] },
        { name: '蜀南竹海', position: [104.9, 28.7] },
        { name: '阆中古城', position: [105.967, 31.558] },
      ];

      markers.forEach(marker => {
        new AMap.Marker({
          position: new AMap.LngLat(marker.position[0], marker.position[1]),
          title: marker.name,
          map: mapInstance.current,
        });
      });
    }).catch(e => {
      console.error('地图加载失败:', e);
    });

    return () => {
      mapInstance.current?.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const monthData = {
    april: [
      { 
        name: '四川宋瓷博物馆', 
        icon: <MapPin size={20} />, 
        location: '遂宁市', 
        rating: '4A',
        image: 'https://img95.699pic.com/photo/50136/5292.jpg_wh860.jpg'
      },
      { 
        name: '剑门关', 
        icon: <Flag size={20} />, 
        location: '广元市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50175/6669.jpg'
      },
      { 
        name: '稻城亚丁', 
        icon: <Mountain size={20} />, 
        location: '甘孜州', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50161/0948.jpg'
      },
      { 
        name: '唐家河', 
        icon: <Trees size={20} />, 
        location: '广元市', 
        rating: '4A',
        image: 'https://s.coze.cn/t/tangjiahe.jpg'
      },
      { 
        name: '蜀南竹海', 
        icon: <Trees size={20} />, 
        location: '宜宾市', 
        rating: '4A',
        image: 'https://img95.699pic.com/photo/50136/5292.jpg'
      },
      { 
        name: '都江堰', 
        icon: <Compass size={20} />, 
        location: '成都市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/1234.jpg'
      },
      { 
        name: '北川羌城旅游区', 
        icon: <MapPin size={20} />, 
        location: '绵阳市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50136/5292.jpg'
      },
      { 
        name: '西岭雪山', 
        icon: <Mountain size={20} />, 
        location: '成都市', 
        rating: '4A',
        image: 'https://img95.699pic.com/photo/50105/5276.jpg'
      },
      { 
        name: '青城山', 
        icon: <Mountain size={20} />, 
        location: '成都市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/8888.jpg'
      },
      { 
        name: '九寨沟', 
        icon: <Compass size={20} />, 
        location: '阿坝州', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/9999.jpg'
      }
    ],
    may: [
      { 
        name: '九寨沟', 
        icon: <Compass size={20} />, 
        location: '阿坝州', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/9999.jpg'
      },
      { 
        name: '峨眉山', 
        icon: <Mountain size={20} />, 
        location: '乐山市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50123/5331.jpg'
      },
      { 
        name: '都江堰', 
        icon: <Compass size={20} />, 
        location: '成都市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/1234.jpg'
      },
      { 
        name: '青城山', 
        icon: <Mountain size={20} />, 
        location: '成都市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/8888.jpg'
      },
      { 
        name: '乐山大佛', 
        icon: <MapPin size={20} />, 
        location: '乐山市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50123/5330.jpg'
      }
    ],
    june: [
      { 
        name: '红原俄么塘花海', 
        icon: <Trees size={20} />, 
        location: '阿坝州', 
        rating: '4A',
        image: 'https://img95.699pic.com/photo/50046/5555.jpg'
      },
      { 
        name: '蜀南竹海', 
        icon: <Trees size={20} />, 
        location: '宜宾市', 
        rating: '4A',
        image: 'https://img95.699pic.com/photo/50136/5292.jpg'
      },
      { 
        name: '青城山', 
        icon: <Mountain size={20} />, 
        location: '成都市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/8888.jpg'
      },
      { 
        name: '阆中古城', 
        icon: <MapPin size={20} />, 
        location: '南充市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50123/5332.jpg'
      },
      { 
        name: '九寨沟', 
        icon: <Compass size={20} />, 
        location: '阿坝州', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/9999.jpg'
      },
      { 
        name: '乐山大佛', 
        icon: <MapPin size={20} />, 
        location: '乐山市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50123/5330.jpg'
      },
      { 
        name: '峨眉山', 
        icon: <Mountain size={20} />, 
        location: '乐山市', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50123/5331.jpg'
      },
      { 
        name: '稻城亚丁', 
        icon: <Mountain size={20} />, 
        location: '甘孜州', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50161/0948.jpg'
      },
      { 
        name: '若尔盖草原', 
        icon: <Trees size={20} />, 
        location: '阿坝州', 
        rating: '4A',
        image: 'https://img95.699pic.com/photo/50046/3333.jpg'
      },
      { 
        name: '黄龙景区', 
        icon: <Compass size={20} />, 
        location: '阿坝州', 
        rating: '5A',
        image: 'https://img95.699pic.com/photo/50046/2222.jpg'
      }
    ]
  };

  const travelPlans = {
    plan1: {
      title: "成都 - 九寨沟 - 黄龙 - 峨眉山",
      days: [
        { 
          day: "第一天", 
          title: "成都市区游", 
          activities: [
            { time: "上午", desc: "抵达成都，入住酒店后，漫步成都街头，品尝地道的四川小吃" },
            { time: "下午", desc: "游览宽窄巷子，感受老成都文化的缩影" },
            { time: "晚上", desc: "在锦里古街体验四川的夜生活，欣赏传统表演" }
          ] 
        },
        { 
          day: "第二天", 
          title: "成都 - 九寨沟", 
          activities: [
            { time: "上午", desc: "从成都出发，前往九寨沟，沿途欣赏川西高原的壮丽风光" },
            { time: "下午", desc: "抵达九寨沟后，入住酒店，稍作休息" },
            { time: "晚上", desc: "在九寨沟景区附近品尝当地特色美食" }
          ] 
        },
        { 
          day: "第三天", 
          title: "九寨沟深度游", 
          activities: [
            { time: "全天", desc: "乘观光车直达长海，徒步穿越树正群海、犀牛海，打卡诺日朗瀑布" }
          ] 
        },
        { 
          day: "第四天", 
          title: "九寨沟 - 黄龙", 
          activities: [
            { time: "上午", desc: "从九寨沟出发，前往黄龙景区" },
            { time: "下午", desc: "游览黄龙景区，徒步穿越钙化池群" },
            { time: "晚上", desc: "返回成都，入住酒店" }
          ] 
        },
        { 
          day: "第五天", 
          title: "成都 - 峨眉山", 
          activities: [
            { time: "上午", desc: "从成都出发，前往峨眉山" },
            { time: "下午", desc: "抵达峨眉山后，乘坐观光车前往雷洞坪，然后徒步登上金顶" },
            { time: "晚上", desc: "在峨眉山脚下的小镇逛逛，品尝当地的特色小吃" }
          ] 
        },
        { 
          day: "第六天", 
          title: "峨眉山 - 成都", 
          activities: [
            { time: "上午", desc: "在峨眉山继续游览，参观报国寺等景点" },
            { time: "下午", desc: "返回成都，自由活动" }
          ] 
        },
        { 
          day: "第七天", 
          title: "成都返程", 
          activities: [
            { time: "上午", desc: "自由活动，根据返程时间前往机场或车站" }
          ] 
        }
      ]
    },
    plan2: {
      title: "成都 - 都江堰 - 青城山 - 乐山大佛 - 稻城亚丁",
      days: [
        { 
          day: "第一天", 
          title: "成都市区游", 
          activities: [
            { time: "上午", desc: "抵达成都，入住酒店后，前往宽窄巷子" },
            { time: "下午", desc: "前往武侯祠，感受三国文化的魅力" },
            { time: "晚上", desc: "在成都品尝正宗的四川火锅" }
          ] 
        },
        { 
          day: "第二天", 
          title: "成都 - 都江堰 - 青城山", 
          activities: [
            { time: "上午", desc: "从成都出发，前往都江堰，游览这个古代水利工程的杰作" },
            { time: "下午", desc: "前往青城山，感受道教的清幽与宁静" },
            { time: "晚上", desc: "返回成都，自由活动" }
          ] 
        },
        { 
          day: "第三天", 
          title: "成都 - 乐山大佛", 
          activities: [
            { time: "上午", desc: "从成都出发，前往乐山大佛" },
            { time: "下午", desc: "乘坐游船游览三江，欣赏沿途的风景" },
            { time: "晚上", desc: "入住乐山市区酒店" }
          ] 
        },
        { 
          day: "第四天", 
          title: "乐山 - 稻城亚丁", 
          activities: [
            { time: "上午", desc: "从乐山出发，前往稻城亚丁" },
            { time: "下午", desc: "抵达稻城亚丁后，入住酒店，稍作休息" },
            { time: "晚上", desc: "在稻城亚丁景区附近品尝当地特色美食" }
          ] 
        },
        { 
          day: "第五天", 
          title: "稻城亚丁深度游", 
          activities: [
            { time: "全天", desc: "深入稻城亚丁景区，游览牛奶海、五色海等景点" }
          ] 
        },
        { 
          day: "第六天", 
          title: "稻城亚丁 - 成都", 
          activities: [
            { time: "上午", desc: "从稻城亚丁出发，返回成都" },
            { time: "下午", desc: "抵达成都后，自由活动" }
          ] 
        },
        { 
          day: "第七天", 
          title: "成都返程", 
          activities: [
            { time: "上午", desc: "自由活动，根据返程时间前往机场或车站" }
          ] 
        }
      ]
    },
    plan3: {
      title: "成都 - 西岭雪山 - 蜀南竹海 - 阆中古城",
      days: [
        { 
          day: "第一天", 
          title: "成都市区游", 
          activities: [
            { time: "上午", desc: "抵达成都，入住酒店后，前往人民公园" },
            { time: "下午", desc: "前往宽窄巷子，打卡本地人私藏的美食店铺" },
            { time: "晚上", desc: "前往九眼桥，欣赏锦江两岸灯光璀璨的夜景" }
          ] 
        },
        { 
          day: "第二天", 
          title: "成都 - 西岭雪山", 
          activities: [
            { time: "上午", desc: "从成都出发，前往西岭雪山" },
            { time: "下午", desc: "在西岭雪山游玩，欣赏雪山、森林、瀑布等自然景观" },
            { time: "晚上", desc: "在西岭雪山景区附近住宿" }
          ] 
        },
        { 
          day: "第三天", 
          title: "西岭雪山 - 蜀南竹海", 
          activities: [
            { time: "上午", desc: "从西岭雪山出发，前往蜀南竹海" },
            { time: "下午", desc: "游览蜀南竹海，漫步于竹海小径" },
            { time: "晚上", desc: "在蜀南竹海景区附近住宿" }
          ] 
        },
        { 
          day: "第四天", 
          title: "蜀南竹海 - 阆中古城", 
          activities: [
            { time: "上午", desc: "从蜀南竹海出发，前往阆中古城" },
            { time: "下午", desc: "游览阆中古城，参观滕王阁、观音寺等景点" },
            { time: "晚上", desc: "在阆中古城品尝当地特色美食" }
          ] 
        },
        { 
          day: "第五天", 
          title: "阆中古城", 
          activities: [
            { time: "全天", desc: "继续在阆中古城游玩" }
          ] 
        },
        { 
          day: "第六天", 
          title: "阆中古城 - 成都", 
          activities: [
            { time: "上午", desc: "从阆中古城出发，返回成都" },
            { time: "下午", desc: "抵达成都后，前往锦里古街" }
          ] 
        },
        { 
          day: "第七天", 
          title: "成都返程", 
          activities: [
            { time: "上午", desc: "自由活动，根据返程时间前往机场或车站" }
          ] 
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <Map className="text-orange-500" size={24} />
            <span className="text-xl font-bold">Sichuan Travel</span>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('spots')}
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Scenic Spots
            </button>
            <button 
              onClick={() => scrollToSection('plans')}
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Travel Plans
            </button>
            <button 
              onClick={() => scrollToSection('map')}
              className="text-gray-300 hover:text-orange-500 transition-colors"
            >
              Interactive Map
            </button>
          </div>
          
          <button className="md:hidden text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://s.coze.cn/t/NPaKZQtiUOQ/')] bg-cover bg-center opacity-30"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              四川
            </span>
            <br />
            Travel Guide
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            探索四川4-6月最佳旅游景点与行程规划
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
            onClick={() => scrollToSection('spots')}
          >
            Explore Now
          </motion.button>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* 景点推荐 */}
      <section id="spots" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                精选景点
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              四川4-6月最适合游玩的景点推荐
            </p>
          </motion.div>
          
          {/* 月份切换标签 */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setActiveTab('april')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'april' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Calendar className="inline mr-2" size={16} />
                四月 April
              </button>
              <button
                onClick={() => setActiveTab('may')}
                className={`px-6 py-3 text-sm font-medium ${activeTab === 'may' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Calendar className="inline mr-2" size={16} />
                五月 May
              </button>
              <button
                onClick={() => setActiveTab('june')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'june' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Calendar className="inline mr-2" size={16} />
                六月 June
              </button>
            </div>
          </div>
          
          {/* 景点卡片 */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {monthData[activeTab]?.map((spot, index) => (
              <motion.div
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.2)" }}
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-all"
              >
                <div className="h-48 bg-gradient-to-r from-orange-500/20 to-orange-600/20 flex items-center justify-center">
                  <div className="text-5xl text-orange-500 opacity-30">
                    {spot.icon}
                    <a href={spot.image} target="_blank" rel="noopener noreferrer"></a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold">{spot.name}</h3>
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {spot.rating}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 flex items-center">
                    <MapPin className="mr-2" size={16} />
                    {spot.location}
                  </p>
                  <div className="flex justify-between items-center">
                    <button className="text-orange-500 hover:text-orange-400 font-medium flex items-center">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 行程规划 */}
      <section id="plans" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                行程方案
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              为您精心设计的三种一周四川旅游行程
            </p>
          </motion.div>
          
          {/* 方案选择 */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setActivePlan('plan1')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activePlan === 'plan1' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Plane className="inline mr-2" size={16} />
                方案一
              </button>
              <button
                onClick={() => setActivePlan('plan2')}
                className={`px-6 py-3 text-sm font-medium ${activePlan === 'plan2' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Compass className="inline mr-2" size={16} />
                方案二
              </button>
              <button
                onClick={() => setActivePlan('plan3')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activePlan === 'plan3' ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Mountain className="inline mr-2" size={16} />
                方案三
              </button>
            </div>
          </div>
          
          {/* 行程详情 */}
          <motion.div
            key={activePlan}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-xl p-8 border border-gray-800"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold">{travelPlans[activePlan]?.title}</h3>
              <div className="flex space-x-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载行程
                </button>
              </div>
            </div>
            
            <div className="space-y-8">
              {travelPlans[activePlan]?.days?.map((day, index) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                      {index + 1}
                    </div>
                    <h4 className="text-2xl font-bold">{day.day}：{day.title}</h4>
                  </div>
                  
                  <div className="space-y-4 pl-14">
                    {day.activities?.map((activity, i) => (
                      <div key={i} className="flex">
                        <div className="text-orange-500 font-medium w-20 flex-shrink-0">{activity.time}</div>
                        <div className="text-gray-300">{activity.desc}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 交互地图 */}
      <section id="map" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                景点地图
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              四川主要旅游景点分布与地理位置
            </p>
          </motion.div>
          
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            className="h-[600px] rounded-xl overflow-hidden border border-gray-800 shadow-xl"
          >
            <div ref={mapContainerRef} className="w-full h-full"></div>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Map className="text-orange-500" size={24} />
                <span className="text-xl font-bold">Sichuan Travel</span>
              </div>
              <p className="text-gray-500 mt-2">探索四川之美</p>
            </div>
            
            <div className="flex space-x-8">
              <div>
                <h4 className="text-gray-300 font-medium mb-4">快速链接</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">首页</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">景点</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">行程</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">地图</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-gray-300 font-medium mb-4">联系我们</h4>
                <ul className="space-y-2">
                  <li className="text-gray-500">Email: info@sichuantravel.com</li>
                  <li className="text-gray-500">Phone: +86 28 1234 5678</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2024 Sichuan Travel. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className="text-orange-500 hover:underline">created by Wang L. Richie </a> 
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SichuanTravel;
