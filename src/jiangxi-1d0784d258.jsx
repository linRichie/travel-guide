import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AMapLoader from '@amap/amap-jsapi-loader';
import { 
  CalendarDays,
  MapPin,
  Utensils,
  Hotel,
  Mountain,
  Train,
  Car,
  Flag,
  Sun,
  Moon,
  Compass,
  Camera,
  ShoppingCart,
  Gift
} from 'lucide-react';

const TravelPlans = () => {
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const AMap = await AMapLoader.load({
          key: 'd17c17f8f712c81a7e4241aff4faa7b0',
          plugins: ['AMap.Scale']
        });
        
        mapInstance.current = new AMap.Map(mapContainerRef.current, {
          viewMode: '3D',
          zoom: 7,
          center: [115.857, 28.683]
        });
        
        // 添加江西主要景点标记
        const markers = [
          { position: [115.857, 28.683], title: '南昌' },
          { position: [115.983, 29.705], title: '庐山' },
          { position: [117.861, 29.248], title: '婺源' },
          { position: [117.178, 29.268], title: '景德镇' },
          { position: [114.125, 26.562], title: '井冈山' },
          { position: [118.035, 28.436], title: '三清山' },
          { position: [114.933, 27.117], title: '龙虎山' },
          { position: [114.125, 27.633], title: '武功山' }
        ];
        
        markers.forEach(marker => {
          new AMap.Marker({
            position: marker.position,
            title: marker.title,
            map: mapInstance.current
          });
        });
      } catch (error) {
        console.error('地图加载失败:', error);
      }
    };

    initMap();

    return () => {
      mapInstance.current?.destroy();
    };
  }, []);

  const plans = [
    {
      id: 1,
      title: "南昌 - 庐山 - 婺源 - 景德镇",
      days: [
        {
          day: 1,
          activities: [
            { time: "上午", desc: "抵达南昌", icon: <Flag size={16} /> },
            { time: "下午", desc: "游览南昌八一起义纪念馆和滕王阁", icon: <Camera size={16} /> },
            { time: "晚上", desc: "品尝南昌炒粉、瓦罐汤等特色美食", icon: <Utensils size={16} /> }
          ]
        },
        {
          day: 2,
          activities: [
            { time: "全天", desc: "驱车前往九江庐山，游览三叠泉、五老峰", icon: <Mountain size={16} /> },
            { time: "晚上", desc: "品尝庐山云雾茶，入住庐山脚下酒店", icon: <Hotel size={16} /> }
          ]
        },
        {
          day: 3,
          activities: [
            { time: "全天", desc: "前往婺源，游览篁岭、江湾等古村落", icon: <Compass size={16} /> },
            { time: "晚上", desc: "体验晒秋民俗活动，入住婺源县城", icon: <Hotel size={16} /> }
          ]
        },
        {
          day: 4,
          activities: [
            { time: "上午", desc: "前往景德镇，参观古窑民俗博览区", icon: <Camera size={16} /> },
            { time: "下午", desc: "亲手体验陶瓷制作，返回南昌准备返程", icon: <Train size={16} /> }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "南昌 - 井冈山 - 三清山",
      days: [
        {
          day: 1,
          activities: [
            { time: "下午", desc: "抵达南昌，游览滕王阁", icon: <Camera size={16} /> },
            { time: "晚上", desc: "品尝当地特色小吃", icon: <Utensils size={16} /> }
          ]
        },
        {
          day: 2,
          activities: [
            { time: "上午", desc: "前往井冈山，参观革命博物馆", icon: <Camera size={16} /> },
            { time: "下午", desc: "游览井冈山风景区", icon: <Mountain size={16} /> },
            { time: "晚上", desc: "返回南昌品尝正宗江西菜", icon: <Utensils size={16} /> }
          ]
        },
        {
          day: 3,
          activities: [
            { time: "全天", desc: "游览庐山风景区，乘坐缆车上山", icon: <Mountain size={16} /> },
            { time: "晚上", desc: "品尝庐山特色美食", icon: <Utensils size={16} /> }
          ]
        },
        {
          day: 4,
          activities: [
            { time: "上午", desc: "游览三清山奇峰异石", icon: <Mountain size={16} /> },
            { time: "下午", desc: "返回南昌自由活动", icon: <ShoppingCart size={16} /> }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "赣州 - 龙虎山 - 武功山",
      days: [
        {
          day: 1,
          activities: [
            { time: "下午", desc: "驱车前往赣州，游览老城区", icon: <Compass size={16} /> },
            { time: "晚上", desc: "宋城欣赏夜景", icon: <Moon size={16} /> }
          ]
        },
        {
          day: 2,
          activities: [
            { time: "全天", desc: "游览龙虎山丹霞地貌和道教文化", icon: <Mountain size={16} /> },
            { time: "晚上", desc: "入住龙虎山附近酒店", icon: <Hotel size={16} /> }
          ]
        },
        {
          day: 3,
          activities: [
            { time: "全天", desc: "武功山徒步登山", icon: <Mountain size={16} /> },
            { time: "晚上", desc: "山上露营", icon: <Moon size={16} /> }
          ]
        },
        {
          day: 4,
          activities: [
            { time: "清晨", desc: "观看日出", icon: <Sun size={16} /> },
            { time: "下午", desc: "下山返回赣州", icon: <Car size={16} /> }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "上饶 - 三清山 - 婺源",
      days: [
        {
          day: 1,
          activities: [
            { time: "下午", desc: "高铁前往上饶，游览市区景点", icon: <Train size={16} /> },
            { time: "晚上", desc: "品尝当地美食", icon: <Utensils size={16} /> }
          ]
        },
        {
          day: 2,
          activities: [
            { time: "全天", desc: "游览三清山奇峰怪石", icon: <Mountain size={16} /> },
            { time: "晚上", desc: "入住三清山附近酒店", icon: <Hotel size={16} /> }
          ]
        },
        {
          day: 3,
          activities: [
            { time: "全天", desc: "游览婺源古村落和田园风光", icon: <Compass size={16} /> },
            { time: "晚上", desc: "入住婺源县城", icon: <Hotel size={16} /> }
          ]
        },
        {
          day: 4,
          activities: [
            { time: "上午", desc: "自由活动购买特产", icon: <ShoppingCart size={16} /> },
            { time: "下午", desc: "返回上饶结束旅程", icon: <Train size={16} /> }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "南昌 - 滕王阁 - 八一广场 - 瑶湖",
      days: [
        {
          day: 1,
          activities: [
            { time: "全天", desc: "游览滕王阁和八一广场", icon: <Camera size={16} /> },
            { time: "晚上", desc: "广场附近品尝美食", icon: <Utensils size={16} /> }
          ]
        },
        {
          day: 2,
          activities: [
            { time: "全天", desc: "瑶湖体验水上活动", icon: <Compass size={16} /> },
            { time: "晚上", desc: "农家乐用餐", icon: <Utensils size={16} /> }
          ]
        },
        {
          day: 3,
          activities: [
            { time: "全天", desc: "市区自由活动", icon: <ShoppingCart size={16} /> }
          ]
        },
        {
          day: 4,
          activities: [
            { time: "上午", desc: "准备返程", icon: <Train size={16} /> }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 头部区域 */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <div className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-orange-500">Jiangxi</span> Travel
          </div>
          <div className="text-xl md:text-2xl mb-8">
            <CalendarDays className="inline mr-2" />
            五一假期 · 4天3晚 · 深圳出发
          </div>
        </motion.div>

        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 w-full h-full opacity-20"
        />
      </header>

      {/* 行程方案区域 */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-orange-500">5</span> Custom Itineraries
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 mr-4">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                </div>

                <div className="space-y-4">
                  {plan.days.map(day => (
                    <div key={day.day} className="border-l-2 border-orange-500 pl-4">
                      <div className="font-bold text-orange-500 mb-2">Day {day.day}</div>
                      <div className="space-y-2">
                        {day.activities.map((activity, i) => (
                          <div key={i} className="flex items-start">
                            <div className="text-orange-500 mr-2 mt-0.5">
                              {activity.icon}
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">{activity.time}</div>
                              <div>{activity.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 页脚区域 */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold mb-2">Jiangxi Travel</div>
              <div className="text-gray-400">© 2025 All Rights Reserved</div>
            </div>

            <div className="flex space-x-6">
              <a 
                href="https://x.com/Jone12suny" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                Twitter/X
              </a>
              <a 
                href="https://github.com/linRichie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>Created by <a href="https://space.coze.cn" className="text-orange-500 hover:underline">coze space</a></p>
            <p>页面内容均由 AI 生成，仅供参考</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TravelPlans;