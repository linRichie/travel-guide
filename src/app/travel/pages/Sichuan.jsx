
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
      title: '经典环线 - 成都出发',
      days: [
        {
          day: 'Day 1',
          title: '成都 → 都江堰 → 青城山',
          activities: [
            { time: '08:00', desc: '成都出发' },
            { time: '10:00', desc: '游览都江堰水利工程' },
            { time: '14:00', desc: '前往青城山' },
            { time: '15:00', desc: '游览青城山前山景区' },
            { time: '18:00', desc: '入住青城山脚下酒店' }
          ]
        },
        {
          day: 'Day 2',
          title: '青城山 → 阿坝 → 九寨沟',
          activities: [
            { time: '07:00', desc: '早餐后出发' },
            { time: '12:00', desc: '途经阿坝，午餐' },
            { time: '16:00', desc: '抵达九寨沟' },
            { time: '17:00', desc: '办理入住，休息调整' },
            { time: '19:00', desc: '欣赏九寨千古情演出' }
          ]
        },
        {
          day: 'Day 3',
          title: '九寨沟景区一日游',
          activities: [
            { time: '07:00', desc: '早餐' },
            { time: '08:00', desc: '进入景区' },
            { time: '09:00', desc: '游览树正沟' },
            { time: '12:00', desc: '景区内午餐' },
            { time: '13:30', desc: '游览日则沟' },
            { time: '16:00', desc: '游览则查洼沟' },
            { time: '18:00', desc: '返回酒店' }
          ]
        },
        {
          day: 'Day 4',
          title: '九寨沟 → 黄龙 → 茂县',
          activities: [
            { time: '07:00', desc: '早餐后出发' },
            { time: '10:00', desc: '抵达黄龙景区' },
            { time: '14:00', desc: '前往茂县' },
            { time: '17:00', desc: '抵达茂县古城' },
            { time: '18:00', desc: '晚餐品尝羌族美食' }
          ]
        },
        {
          day: 'Day 5',
          title: '茂县 → 都江堰 → 成都',
          activities: [
            { time: '08:00', desc: '茂县出发' },
            { time: '12:00', desc: '途经都江堰午餐' },
            { time: '15:00', desc: '返回成都' },
            { time: '16:30', desc: '抵达成都' }
          ]
        }
      ]
    },
    plan2: {
      title: '草原花海 - 红原线',
      days: [
        {
          day: 'Day 1',
          title: '成都 → 松潘 → 若尔盖',
          activities: [
            { time: '07:00', desc: '成都出发' },
            { time: '12:00', desc: '松潘古城午餐' },
            { time: '15:00', desc: '前往若尔盖' },
            { time: '17:00', desc: '抵达若尔盖草原' },
            { time: '18:00', desc: '入住草原特色酒店' }
          ]
        },
        {
          day: 'Day 2',
          title: '若尔盖 → 花湖 → 黄河第一湾',
          activities: [
            { time: '08:00', desc: '早餐后出发' },
            { time: '09:30', desc: '游览花湖景区' },
            { time: '13:00', desc: '前往黄河第一湾' },
            { time: '15:00', desc: '观赏黄河九曲' },
            { time: '17:00', desc: '返回住宿点' }
          ]
        },
        {
          day: 'Day 3',
          title: '若尔盖 → 红原 → 俄么塘花海',
          activities: [
            { time: '08:00', desc: '前往红原' },
            { time: '10:00', desc: '抵达红原' },
            { time: '11:00', desc: '游览月亮湾' },
            { time: '14:00', desc: '前往俄么塘花海' },
            { time: '15:00', desc: '花海摄影' },
            { time: '18:00', desc: '返回红原' }
          ]
        },
        {
          day: 'Day 4',
          title: '红原 → 阿坝 → 成都',
          activities: [
            { time: '08:00', desc: '红原出发' },
            { time: '10:00', desc: '途经阿坝' },
            { time: '12:00', desc: '阿坝午餐' },
            { time: '13:00', desc: '返回成都' },
            { time: '18:00', desc: '抵达成都' }
          ]
        }
      ]
    },
    plan3: {
      title: '佛教文化 - 色达线',
      days: [
        {
          day: 'Day 1',
          title: '成都 → 丹巴',
          activities: [
            { time: '07:00', desc: '成都出发' },
            { time: '12:00', desc: '途经雅安午餐' },
            { time: '16:00', desc: '抵达丹巴' },
            { time: '17:00', desc: '游览甲居藏寨' }
          ]
        },
        {
          day: 'Day 2',
          title: '丹巴 → 色达',
          activities: [
            { time: '08:00', desc: '丹巴出发' },
            { time: '12:00', desc: '途中午餐' },
            { time: '15:00', desc: '抵达色达' },
            { time: '16:00', desc: '参观五明佛学院' }
          ]
        },
        {
          day: 'Day 3',
          title: '色达一日游',
          activities: [
            { time: '07:00', desc: '观看晨课' },
            { time: '09:00', desc: '游览佛学院' },
            { time: '12:00', desc: '午餐' },
            { time: '14:00', desc: '探访修行者' },
            { time: '17:00', desc: '观看辩经' }
          ]
        },
        {
          day: 'Day 4',
          title: '色达 → 阿坝 → 成都',
          activities: [
            { time: '08:00', desc: '色达出发' },
            { time: '12:00', desc: '途经阿坝午餐' },
            { time: '13:00', desc: '返回成都' },
            { time: '19:00', desc: '抵达成都' }
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
                <div className="relative h-48">
                  <img 
                    src={spot.image} 
                    alt={spot.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" /> {/* 半透明遮罩 */}
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-5xl text-orange-500">
                      {spot.icon}
                    </div>
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
            <p>作者: Wang L. Richie | 年份: © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SichuanTravel;
