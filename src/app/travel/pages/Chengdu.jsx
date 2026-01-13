import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AMapLoader from '@amap/amap-jsapi-loader';
import {
  CalendarDays,
  MapPin,
  Utensils,
  Mountain,
  BookOpen,
  ShoppingBag,
  Coffee,
  Train,
  Bus,
  Footprints,
  Camera,
  Beer,
  Bike,
  Sun,
  Moon,
  CloudSun,
  Leaf,
  Gift,
  Ticket,
  Compass,
  Home,
  Star,
  Heart,
  ChevronDown,
  ChevronUp,
  Twitter,
  Github
} from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';


const ChengduTravelGuide = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('history');
  const [expandedDays, setExpandedDays] = useState([true, true, true, true]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapLoadingError, setMapLoadingError] = useState(null);
  const mapContainerRef = useRef(null);
  const mapSDK = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);  // 添加标记点引用数组

  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveTab(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    let isMounted = true;  // 添加组件挂载状态标志
    
    
    // 确保DOM已完全加载
    const initMap = () => {
      if (!isMapLoaded && !mapLoadingError && mapContainerRef.current) {
        AMapLoader.load({
          key: 'd17c17f8f712c81a7e4241aff4faa7b0',
          version: '2.0',  // 明确指定版本
          plugins: ['AMap.Marker', 'AMap.InfoWindow', 'AMap.ControlBar']
        }).then(AMap => {
          // 检查组件是否仍然挂载
          if (!isMounted) return;
          
          mapSDK.current = AMap;
          // 确保容器已经渲染并设置了明确的尺寸
          if (mapContainerRef.current) {
            try {
              // 确保地图容器有明确的尺寸
              mapContainerRef.current.style.height = '500px';
              mapContainerRef.current.style.width = '100%';
              
              const map = new AMap.Map(mapContainerRef.current, {
                viewMode: '3D',
                zoom: 11,
                center: [104.0668, 30.5728],
                mapStyle: 'amap://styles/whitesmoke',
                resizeEnable: true  // 允许自动调整大小
              });
              mapInstance.current = map;

              // 添加控件
              const controlBar = new AMap.ControlBar({
                position: {
                  right: '10px',
                  top: '10px'
                },
                showZoomBar: true,
                showControlButton: true
              });
              map.addControl(controlBar);

              // 添加标记点
              const markers = [
                { position: [104.059, 30.67], title: '宽窄巷子' },
                { position: [104.055, 30.658], title: '人民公园' },
                { position: [104.046, 30.663], title: '青羊宫' },
                { position: [104.032, 30.668], title: '杜甫草堂' },
                { position: [104.048, 30.642], title: '锦里古街' },
                { position: [104.039, 30.742], title: '熊猫基地' },
                { position: [104.189, 30.409], title: '三星堆' },
                { position: [103.606, 30.994], title: '青城山' },
                { position: [103.627, 31.003], title: '都江堰' },
                { position: [103.552, 30.901], title: '街子古镇' }
              ];

              // 清除之前的标记
              markersRef.current.forEach(marker => {
                if (marker) marker.setMap(null);
              });
              markersRef.current = [];

              // 添加新标记
              markers.forEach(marker => {
                const newMarker = new AMap.Marker({
                  position: new AMap.LngLat(marker.position[0], marker.position[1]),
                  title: marker.title,
                  map: map
                });
                markersRef.current.push(newMarker);
              });
              
              // 强制刷新地图大小
              setTimeout(() => {
                if (map && isMounted) {
                  map.resize();
                }
              }, 300);
              
              if (isMounted) {
                setIsMapLoaded(true);
              }
            } catch (error) {
              console.error('地图实例化失败:', error);
              if (isMounted) {
                setMapLoadingError('地图实例化失败，请刷新页面重试');
              }
            }
          } else {
            console.error('地图容器未找到');
            if (isMounted) {
              setMapLoadingError('地图容器未找到，请刷新页面重试');
            }
          }
        }).catch(e => {
          console.error('地图加载失败:', e);
          if (isMounted) {
            setMapLoadingError('地图加载失败，请刷新页面重试');
          }
        });
      }
    };
    
    // 延迟初始化地图，确保DOM已完全加载
    setTimeout(initMap, 1000);
    
    return () => {
      mapInstance.current?.destroy();
      isMounted = false;  // 标记组件已卸载
    };
  }, []);

  const toggleDay = (index) => {
    const newExpandedDays = [...expandedDays];
    newExpandedDays[index] = !newExpandedDays[index];
    setExpandedDays(newExpandedDays);
  };

  const historyItinerary = [
    {
      day: 1,
      title: "老成都文化巡礼",
      activities: [
        {
          time: "上午",
          items: [
            {
              name: "宽窄巷子",
              duration: "2小时",
              price: "免费",
              description: "建议顺序：宽巷子→窄巷子→井巷子，体验清末民初建筑与成都慢生活，可打卡「三联韬奋书店」和「熊猫邮局」。",
              icon: <Home size={20} className="text-[#4A3728]" />
            },
            {
              name: "人民公园·鹤鸣茶社",
              duration: "1小时",
              price: "茶费￥20-50",
              description: "喝盖碗茶、听评书、体验成都人'摆龙门阵'的市井文化。",
              icon: <Coffee size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "下午",
          items: [
            {
              name: "青羊宫",
              duration: "1.5小时",
              price: "￥10",
              description: "道教圣地，感受千年道观清幽氛围。",
              icon: <BookOpen size={20} className="text-[#4A3728]" />
            },
            {
              name: "杜甫草堂",
              duration: "2小时",
              price: "￥50",
              description: "漫步竹林茅舍，了解诗圣杜甫的创作生涯。",
              icon: <BookOpen size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "晚上",
          items: [
            {
              name: "锦里古街+武侯祠",
              duration: "夜游锦里2小时",
              price: "武侯祠￥50",
              description: "武侯祠红墙竹影拍照，锦里品尝三大炮、糖油果子等小吃（人均￥30）。",
              icon: <Utensils size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ],
      transport: "全程步行+打车（宽窄巷子到人民公园步行15分钟，其他景点间打车约￥15-20）。"
    },
    {
      day: 2,
      title: "古蜀文明与国宝探秘",
      activities: [
        {
          time: "上午",
          items: [
            {
              name: "成都大熊猫繁育研究基地",
              duration: "3小时",
              price: "￥55",
              description: "7:30开园，直奔月亮产房看熊猫幼崽，建议乘坐景区电瓶车（￥10）。",
              icon: <Mountain size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "下午",
          items: [
            {
              name: "三星堆博物馆",
              duration: "3小时",
              price: "￥72",
              description: "乘景区直通车（宽窄巷子出发，往返￥65）探秘青铜神树、纵目面具，建议租讲解器（￥20）。",
              icon: <Compass size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "晚上",
          items: [
            {
              name: "川西坝子火锅",
              duration: "",
              price: "人均￥100",
              description: "本地人常去的老牌火锅，推荐红汤锅底配鲜毛肚。",
              icon: <Utensils size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ],
      transport: "小贴士：三星堆需提前预约，穿舒适鞋；回程可顺路参观「金沙遗址」（￥70）替代。"
    },
    {
      day: 3,
      title: "世界遗产·青城山问道",
      activities: [
        {
          time: "全天",
          items: [
            {
              name: "青城前山+都江堰",
              duration: "",
              price: "联票￥150",
              description: "上午登青城山（道教发源地，徒步约4小时），下午游览都江堰（鱼嘴、飞沙堰、宝瓶口），建议跟一日游团（￥300含交通+导览）。",
              icon: <Mountain size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ],
      transport: "夜宿：都江堰南桥附近民宿，欣赏蓝眼泪夜景。"
    },
    {
      day: 4,
      title: "川西秘境·自然疗愈",
      activities: [
        {
          time: "上午",
          items: [
            {
              name: "青城后山",
              duration: "4小时",
              price: "￥20",
              description: "徒步五龙沟→龙隐峡栈道，感受瀑布与原始森林。",
              icon: <Footprints size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "下午",
          items: [
            {
              name: "街子古镇",
              duration: "2小时",
              price: "免费",
              description: "品汤麻饼、体验川西林盘文化。",
              icon: <Home size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ],
      transport: "返程：高铁青城山站→成都（￥10，30分钟）。"
    }
  ];

  const foodItinerary = [
    {
      day: 1,
      title: "舌尖上的成都",
      activities: [
        {
          time: "早餐",
          items: [
            {
              name: "西月城谭豆花",
              duration: "",
              price: "甜水面+冰醉豆花，￥15",
              description: "",
              icon: <Utensils size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "上午",
          items: [
            {
              name: "文殊院",
              duration: "",
              price: "免费",
              description: "",
              icon: <BookOpen size={20} className="text-[#4A3728]" />
            },
            {
              name: "香园禅意素餐",
              duration: "",
              price: "￥50",
              description: "",
              icon: <Utensils size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "下午",
          items: [
            {
              name: "建设路小吃街",
              duration: "",
              price: "锅巴土豆、傅记排骨，人均￥40",
              description: "",
              icon: <Utensils size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "晚上",
          items: [
            {
              name: "蜀风雅韵川剧变脸",
              duration: "",
              price: "VIP票￥280含盖碗茶",
              description: "",
              icon: <Ticket size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ]
    },
    {
      day: 2,
      title: "烟火气与潮流碰撞",
      activities: [
        {
          time: "上午",
          items: [
            {
              name: "东郊记忆",
              duration: "",
              price: "",
              description: "工业风拍照",
              icon: <Camera size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "下午",
          items: [
            {
              name: "Cosmo成都",
              duration: "",
              price: "",
              description: "潮牌购物",
              icon: <ShoppingBag size={20} className="text-[#4A3728]" />
            },
            {
              name: "太古里方所书店",
              duration: "",
              price: "",
              description: "",
              icon: <BookOpen size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "晚上",
          items: [
            {
              name: "九眼桥酒吧街",
              duration: "",
              price: "",
              description: "推荐「贰麻酒馆」",
              icon: <Beer size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ]
    },
    {
      day: 3,
      title: "近郊田园体验",
      activities: [
        {
          time: "全天",
          items: [
            {
              name: "崇州道明竹艺村",
              duration: "",
              price: "非遗竹编体验￥50",
              description: "",
              icon: <Leaf size={20} className="text-[#4A3728]" />
            },
            {
              name: "桤木河湿地骑行",
              duration: "",
              price: "",
              description: "",
              icon: <Bike size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ]
    },
    {
      day: 4,
      title: "养生收尾",
      activities: [
        {
          time: "上午",
          items: [
            {
              name: "浣花溪公园",
              duration: "",
              price: "免费",
              description: "诗意园林",
              icon: <Sun size={20} className="text-[#4A3728]" />
            }
          ]
        },
        {
          time: "下午",
          items: [
            {
              name: "铁像寺水街",
              duration: "",
              price: "围炉煮茶￥80",
              description: "",
              icon: <Coffee size={20} className="text-[#4A3728]" />
            }
          ]
        }
      ]
    }
  ];

  const tips = [
    {
      title: "交通",
      content: "地铁用「天府通APP」，景区直通车搜「成都景区直通车」小程序。"
    },
    {
      title: "避坑",
      content: "锦里/宽窄巷子纪念品溢价高，建议在「熊猫基地」买官方周边。"
    },
    {
      title: "最佳季节",
      content: "3-4月（赏花）、9-11月（秋色），夏季建议避峰出行。"
    }
  ];

  const customizations = [
    {
      type: "历史爱好者",
      suggestion: "增加「金沙遗址」和「永陵博物馆」，替换第二天行程。"
    },
    {
      type: "美食狂热者",
      suggestion: "增加「魁星楼街」（饕林餐厅）、「玉林路小酒馆」。"
    },
    {
      type: "自然爱好者",
      suggestion: "将青城后山改为「西岭雪山」（冬季滑雪）或「峨眉山一日游」。"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-[#F5F5F5] text-[#333333]'}`}>
      {/* 导航栏 */}
      <nav className={`sticky top-0 z-50 shadow-sm p-4 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-[#333333]'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Mountain size={32} className="text-[#2A5C42] mr-2" />
            <h1 className="text-4xl font-bold text-[#2A5C42]">Chengdu 4 Days</h1>
          </motion.div>
          <div className="flex space-x-4">
            <MapPin size={24} className="text-[#4A3728]" />
            <CalendarDays size={24} className="text-[#4A3728]" />
            <Utensils size={24} className="text-[#4A3728]" />
          </div>
        </div>
      </nav>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8">
        {/* 核心数据看板 */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-[#2A5C42]/10 to-transparent rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#2A5C42]/10 flex items-center justify-center mb-6 md:mb-0 md:mr-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                className="text-[#2A5C42] text-8xl font-bold"
              >
                4
              </motion.div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-6xl font-bold text-[#2A5C42] mb-2">Days</h2>
              <p className="text-2xl text-[#666666]">in Chengdu</p>
              <p className="mt-4 text-lg text-[#4A3728]">历史人文与自然奇观的完美融合</p>
            </div>
          </div>
        </motion.section>

        {/* 线路选择 */}
        <section className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'history' ? 'bg-[#2A5C42] text-white' : 'bg-white text-[#4A3728] hover:bg-gray-50'}`}
              >
                历史人文与自然奇观
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'food' ? 'bg-[#2A5C42] text-white' : 'bg-white text-[#4A3728] hover:bg-gray-50'}`}
              >
                美食与慢生活
              </button>
            </div>
          </div>

          {/* 地图 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            // transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-lg"
            // className="mb-12 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div 
              ref={mapContainerRef} 
              className="h-[500px] w-full relative"
              style={{ height: '500px', width: '100%' }}  // 添加内联样式确保尺寸
            >
              {!isMapLoaded && !mapLoadingError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2A5C42] mb-2"></div>
                    <p className="text-[#4A3728]">地图加载中...</p>
                  </div>
                </div>
              )}
              {/* {mapLoadingError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center text-red-500 p-4">
                    <p>{mapLoadingError}</p>
                    <button 
                      onClick={() => {
                        setMapLoadingError(null);
                        setIsMapLoaded(false);
                      }}
                      className="mt-2 px-4 py-2 bg-[#2A5C42] text-white rounded-md hover:bg-[#1e4431] transition-colors"
                    >
                      重试
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </motion.div>

          {/* 行程详情 */}
          <div className="space-y-8">
            {(activeTab === 'history' ? historyItinerary : foodItinerary).map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div
                  className="flex justify-between items-center p-6 cursor-pointer"
                  onClick={() => toggleDay(index)}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#2A5C42]">Day {day.day}: {day.title}</h3>
                    <p className="text-[#4A3728] mt-1">{day.activities.length} 个活动</p>
                  </div>
                  {expandedDays[index] ? (
                    <ChevronUp size={24} className="text-[#4A3728]" />
                  ) : (
                    <ChevronDown size={24} className="text-[#4A3728]" />
                  )}
                </div>

                <AnimatePresence>
                  {expandedDays[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      {day.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="mb-6">
                          <h4 className="text-lg font-semibold text-[#4A3728] mb-3">{activity.time}</h4>
                          <div className="space-y-4">
                            {activity.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="pl-6 border-l-2 border-[#2A5C42]/20">
                                <div className="flex items-start">
                                  <div className="mr-4 mt-1">
                                    {item.icon}
                                  </div>
                                  <div>
                                    <div className="flex flex-wrap items-baseline">
                                      <h5 className="text-lg font-medium text-[#4A5C42] mr-2">{item.name}</h5>
                                      {item.duration && (
                                        <span className="text-sm text-gray-500 mr-2">{item.duration}</span>
                                      )}
                                      {item.price && (
                                        <span className="text-sm font-medium text-[#2A5C42]">{item.price}</span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <p className="mt-1 text-gray-600">{item.description}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      {day.transport && (
                        <div className="bg-[#F5F5F5] p-4 rounded-lg">
                          <div className="flex items-start">
                            <Train size={20} className="text-[#4A3728] mr-3 mt-1" />
                            <p className="text-gray-600">{day.transport}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 个性化建议 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#2A5C42] mb-6">个性化行程调整建议</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customizations.map((custom, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-semibold text-[#4A3728] mb-2">{custom.type}</h3>
                <p className="text-gray-600">{custom.suggestion}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 实用贴士 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#2A5C42] mb-6">实用贴士</h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-[#4A3728] mb-1">{tip.title}</h3>
                  <p className="text-gray-600">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      {/* 页脚 */}
      <footer className={`${isDark ? 'bg-[#2A5C42]' : 'bg-[#1e4431]'} text-white py-12`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Wang L. Richie</h3>
              <p className="text-sm opacity-80">成都旅行指南</p>
            </div>
            <div className="flex space-x-4 mb-6 md:mb-0">
              <a href="https://x.com/Jone12suny" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Twitter size={24} />
              </a>
              <a href="https://github.com/linRichie" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Github size={24} />
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-80">© 2025 Wang L. Richie</p>
              {/* <p className="text-xs opacity-60 mt-1">页面内容均由 AI 生成，仅供参考</p> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChengduTravelGuide;
