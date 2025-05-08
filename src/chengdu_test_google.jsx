import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  MapPin,
  Utensils,
  Mountain,
  BookOpen,
  ShoppingBag,
  Coffee,
  Train,
  // Bus, // Assuming Bus icon might not be used directly, can be added if needed
  Footprints,
  Camera,
  Beer,
  Bike,
  Sun,
  // Moon, // Assuming Moon icon might not be used directly
  // CloudSun, // Assuming CloudSun icon might not be used directly
  Leaf,
  // Gift, // Assuming Gift icon might not be used directly
  Ticket,
  Compass,
  Home,
  // Star, // Assuming Star icon might not be used directly
  // Heart, // Assuming Heart icon might not be used directly
  ChevronDown,
  ChevronUp,
  Twitter,
  Github
} from 'lucide-react';

// Helper function to load the Google Maps script
const loadGoogleMapsScript = (apiKey, callback) => {
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker`;
    script.id = 'googleMapsScript';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
    script.onerror = () => {
      if (callback) callback(new Error('Google Maps script failed to load.'));
    }
  } else {
    if (callback) callback(); // Script already loaded
  }
};


const ChengduTravelGuide = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [expandedDays, setExpandedDays] = useState([true, true, true, true]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapLoadingError, setMapLoadingError] = useState(null);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); // To keep track of Google Maps markers

  // Your Google Maps API Key - REPLACE THIS!
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCkfFoS6PBi27v9gprvEQ8qbWG2-TMWgCo';

  useEffect(() => {
    let isMounted = true; // Flag to check if component is still mounted

    if (GOOGLE_MAPS_API_KEY === 'AIzaSyCkfFoS6PBi27v9gprvEQ8qbWG2-TMWgCo') {
        console.warn("Please replace 'AIzaSyCkfFoS6PBi27v9gprvEQ8qbWG2-TMWgCo' with your actual Google Maps API key.");
        if (isMounted) {
            setMapLoadingError('请提供有效的 Google Maps API 密钥。');
        }
        return;
    }

    loadGoogleMapsScript(GOOGLE_MAPS_API_KEY, (error) => {
      if (!isMounted) return; // Don't do anything if component unmounted

      if (error) {
        console.error('Google Maps script loading error:', error);
        setMapLoadingError('地图脚本加载失败，请检查 API 密钥和网络连接。');
        return;
      }

      if (window.google && window.google.maps && mapContainerRef.current) {
        try {
          const map = new window.google.maps.Map(mapContainerRef.current, {
            center: { lat: 30.5728, lng: 104.0668 }, // Chengdu coordinates
            zoom: 11,
            mapId: 'CHENGDU_TRAVEL_MAP' // Optional: for cloud-based map styling
          });
          mapInstance.current = map;

          // Define marker locations (same as before)
          const locations = [
            { position: { lat: 30.67, lng: 104.059 }, title: '宽窄巷子' },
            { position: { lat: 30.658, lng: 104.055 }, title: '人民公园' },
            { position: { lat: 30.663, lng: 104.046 }, title: '青羊宫' },
            { position: { lat: 30.668, lng: 104.032 }, title: '杜甫草堂' },
            { position: { lat: 30.642, lng: 104.048 }, title: '锦里古街' },
            { position: { lat: 30.742, lng: 104.039 }, title: '熊猫基地' },
            { position: { lat: 30.409, lng: 104.189 }, title: '三星堆' }, // Note: Samshungdui is quite far, map might need to zoom out or be recentered to see it.
            { position: { lat: 30.994, lng: 103.606 }, title: '青城山' },
            { position: { lat: 31.003, lng: 103.627 }, title: '都江堰' },
            { position: { lat: 30.901, lng: 103.552 }, title: '街子古镇' }
          ];

          // Clear previous markers
          markersRef.current.forEach(marker => marker.setMap(null));
          markersRef.current = [];

          // Add new markers
          locations.forEach(loc => {
            const marker = new window.google.maps.Marker({
              position: loc.position,
              map: map,
              title: loc.title,
              // AdvancedMarkerElement is preferred for newer Google Maps versions
              // but google.maps.Marker is more universally compatible without extra library setup
            });
            markersRef.current.push(marker);
          });
          
          if (isMounted) {
            setIsMapLoaded(true);
            setMapLoadingError(null); // Clear any previous errors
          }

        } catch (e) {
          console.error('Google Maps instantiation failed:', e);
          if (isMounted) {
            setMapLoadingError('地图实例化失败，请刷新页面重试。');
          }
        }
      } else if (isMounted) {
        // This case might happen if the script is loaded but google.maps is not yet available
        // or if mapContainerRef.current is null
        setMapLoadingError('地图初始化组件失败，请稍后重试。');
      }
    });

    return () => {
      isMounted = false; // Mark component as unmounted
      // Google Maps API doesn't have a direct 'destroy' method for the map instance in the same way AMap does.
      // Removing the script or nullifying references is usually sufficient.
      // Markers are removed by setting their map to null.
      markersRef.current.forEach(marker => {
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(null);
        }
      });
      markersRef.current = [];
      mapInstance.current = null; 
      // Optionally, remove the script if it's the last map instance using it,
      // but this can be complex to manage if other components also use Google Maps.
      // For simplicity, we'll leave the script loaded.
    };
  // Rerun effect if API key changes or if user retries on error.
  }, [mapLoadingError]); // Intentionally not including GOOGLE_MAPS_API_KEY in deps to avoid re-runs if it's a constant.
                         // However, if it could change dynamically and you want the map to reload, add it.
                         // Added mapLoadingError to allow retry.

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
              icon: <Mountain size={20} className="text-[#4A3728]" /> // Using Mountain as a placeholder for Panda
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
      title: "交通 (Jiāotōng - Transportation)",
      content: "地铁用「天府通APP」，景区直通车搜「成都景区直通车」小程序。 (Dìtiě yòng `Tiānfǔ Tōng APP`, jǐngqū zhítōngchē sōu `Chéngdū Jǐngqū Zhítōngchē` xiǎochéngxù.) - Use 'Tianfu Tong APP' for the subway, search for 'Chengdu Scenic Spot Through Train' applet for direct buses to scenic spots."
    },
    {
      title: "避坑 (Bìkēng - Avoid Pitfalls)",
      content: "锦里/宽窄巷子纪念品溢价高，建议在「熊猫基地」买官方周边。 (Jǐnlǐ/Kuānzhǎi Xiàngzi jìniànpǐn yìjià gāo, jiànyì zài `Xióngmāo Jīdì` mǎi guānfāng zhōubiān.) - Souvenirs in Jinli/Kuanzhai Alley are overpriced; it's recommended to buy official merchandise at the 'Panda Base'."
    },
    {
      title: "最佳季节 (Zuìjiā Jìjié - Best Season)",
      content: "3-4月（赏花）、9-11月（秋色），夏季建议避峰出行。 (3-4 yuè (shǎnghuā), 9-11 yuè (qiūsè), xiàjì jiànyì bìfēng chūxíng.) - March-April (flower viewing), September-November (autumn colors); it's advisable to avoid peak travel during summer."
    }
  ];

  const customizations = [
    {
      type: "历史爱好者 (Lìshǐ Àihàozhě - History Enthusiast)",
      suggestion: "增加「金沙遗址」和「永陵博物馆」，替换第二天行程。 (Zēngjiā `Jīnshā Yízhǐ` hé `Yǒnglíng Bówùguǎn`, tìhuàn dì'èr tiān xíngchéng.) - Add 'Jinsha Site Museum' and 'Yongling Museum', replacing the itinerary for the second day."
    },
    {
      type: "美食狂热者 (Měishí Kuángrèzhě - Food Enthusiast)",
      suggestion: "增加「魁星楼街」（饕林餐厅）、「玉林路小酒馆」。 (Zēngjiā `Kuíxīnglóu Jiē` (Tāolín Cāntīng), `Yùlín Lù Xiǎo Jiǔguǎn`.) - Add 'Kuixinglou Street' (Taolin Restaurant), 'Yulin Road Little Pub'."
    },
    {
      type: "自然爱好者 (Zìrán Àihàozhě - Nature Lover)",
      suggestion: "将青城后山改为「西岭雪山」（冬季滑雪）或「峨眉山一日游」。 (Jiāng Qīngchéng Hòushān gǎiwéi `Xīlǐng Xuěshān` (dōngjì huáxuě) huò `Éméishān Yīrìyóu`.) - Change Qingcheng Houshan to 'Xiling Snow Mountain' (skiing in winter) or an 'Emeishan One-Day Tour'."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333333]">
      {/* 导航栏 (Navigation Bar) */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm p-4">
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

      {/* 主内容区 (Main Content Area) */}
      <main className="container mx-auto px-4 py-8">
        {/* 核心数据看板 (Core Data Dashboard) */}
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
              <p className="mt-4 text-lg text-[#4A3728]">历史人文与自然奇观的完美融合 (Lìshǐ rénwén yǔ zìrán qíguān de wánměi rónghé - Perfect fusion of history, culture, and natural wonders)</p>
            </div>
          </div>
        </motion.section>

        {/* 线路选择 (Route Selection) */}
        <section className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'history' ? 'bg-[#2A5C42] text-white' : 'bg-white text-[#4A3728] hover:bg-gray-50'}`}
              >
                历史人文与自然奇观 (History, Culture & Nature)
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'food' ? 'bg-[#2A5C42] text-white' : 'bg-white text-[#4A3728] hover:bg-gray-50'}`}
              >
                美食与慢生活 (Food & Slow Life)
              </button>
            </div>
          </div>

          {/* 地图 (Map) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div ref={mapContainerRef} className="h-[500px] w-full relative">
              {!isMapLoaded && !mapLoadingError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2A5C42] mb-2"></div>
                    <p className="text-[#4A3728]">地图加载中... (Map loading...)</p>
                  </div>
                </div>
              )}
              {mapLoadingError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-center text-red-500 p-4">
                    <p>{mapLoadingError}</p>
                    {GOOGLE_MAPS_API_KEY !== 'AIzaSyCkfFoS6PBi27v9gprvEQ8qbWG2-TMWgCo' && // Only show retry if key is not the placeholder
                        <button
                            onClick={() => {
                                setMapLoadingError(null); // Clear error to allow re-triggering useEffect
                                setIsMapLoaded(false); // Reset map loaded state
                            }}
                            className="mt-2 px-4 py-2 bg-[#2A5C42] text-white rounded-md hover:bg-[#1e4431] transition-colors"
                        >
                            重试 (Retry)
                        </button>
                    }
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* 行程详情 (Itinerary Details) */}
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
                    <p className="text-[#4A3728] mt-1">{day.activities.length} 个活动 (activities)</p>
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
                                      <h5 className="text-lg font-medium text-[#4A3728] mr-2">{item.name}</h5>
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

        {/* 个性化建议 (Personalized Suggestions) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#2A5C42] mb-6">个性化行程调整建议 (Personalized Itinerary Adjustment Suggestions)</h2>
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

        {/* 实用贴士 (Practical Tips) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-[#2A5C42] mb-6">实用贴士 (Practical Tips)</h2>
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

      {/* 页脚 (Footer) */}
      <footer className="bg-[#2A5C42] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Wang L. Richie</h3>
              <p className="text-sm opacity-80">成都旅行指南 (Chengdu Travel Guide)</p>
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
              {/* <p className="text-xs opacity-60 mt-1">页面内容均由 AI 生成，仅供参考 (Page content is AI-generated, for reference only)</p> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChengduTravelGuide;
