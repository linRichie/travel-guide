import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Plane, 
  Train, 
  Car, 
  Sun, 
  Moon, 
  Camera, 
  Utensils, 
  ShoppingBag,
  Calendar,
  Clock,
  Compass,
  Hotel,
  Mountain,
  Waves,
  Coffee,
  Ticket,
  Map
} from 'lucide-react';

const FujianTravel = () => {
  const [activeTrip, setActiveTrip] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);

  const trips = [
    {
      title: "厦门深度游",
      days: [
        {
          title: "深圳 - 厦门",
          activities: [
            { 
              time: "交通", 
              icon: <Train />,
              description: "高铁约3-4小时/飞机约1小时/自驾约7小时" 
            },
            { 
              time: "上午", 
              icon: <Hotel />,
              description: "抵达厦门，酒店入住" 
            },
            { 
              time: "中午", 
              icon: <Utensils />,
              description: "品尝厦门特色美食：海蛎煎、沙茶面" 
            },
            { 
              time: "下午", 
              icon: <Compass />,
              description: "游览厦门大学、芙蓉隧道、南普陀寺" 
            },
            { 
              time: "晚上", 
              icon: <Moon />,
              description: "猫街、沙坡尾、白城沙滩日落" 
            }
          ]
        },
        {
          title: "鼓浪屿一日游",
          activities: [
            { 
              time: "上午", 
              icon: <MapPin />,
              description: "乘船前往鼓浪屿，游览菽庄花园、钢琴博物馆" 
            },
            { 
              time: "中午", 
              icon: <Coffee />,
              description: "品尝张三疯奶茶、赵小姐的店" 
            },
            { 
              time: "下午", 
              icon: <Compass />,
              description: "游览日光岩、皓月园" 
            },
            { 
              time: "晚上", 
              icon: <Utensils />,
              description: "鼓浪屿晚餐后返回厦门" 
            }
          ]
        },
        {
          title: "厦门市区游",
          activities: [
            { 
              time: "上午", 
              icon: <Mountain />,
              description: "钟鼓索道俯瞰厦门全景" 
            },
            { 
              time: "中午", 
              icon: <Utensils />,
              description: "中山路特色小吃" 
            },
            { 
              time: "下午", 
              icon: <ShoppingBag />,
              description: "八市海鲜市场" 
            },
            { 
              time: "晚上", 
              icon: <Moon />,
              description: "市区夜市自由活动" 
            }
          ]
        },
        {
          title: "环岛路骑行 - 返程",
          activities: [
            { 
              time: "上午", 
              icon: <Sun />,
              description: "黄厝日出，环岛路骑行" 
            },
            { 
              time: "中午", 
              icon: <Coffee />,
              description: "曾厝垵文艺小渔村午餐" 
            },
            { 
              time: "下午", 
              icon: <Train />,
              description: "返回深圳" 
            }
          ]
        }
      ]
    },
    {
      title: "武夷山茶文化之旅",
      days: [
        {
          title: "深圳 - 武夷山",
          activities: [
            { 
              time: "交通", 
              icon: <Train />,
              description: "高铁约6-7小时/飞机+转车" 
            },
            { 
              time: "上午", 
              icon: <Hotel />,
              description: "抵达武夷山，酒店入住" 
            },
            { 
              time: "中午", 
              icon: <Utensils />,
              description: "品尝岚谷熏鹅、朱子孝母饼" 
            },
            { 
              time: "下午", 
              icon: <Compass />,
              description: "武夷宫茶艺表演" 
            },
            { 
              time: "晚上", 
              icon: <Ticket />,
              description: "观看《印象大红袍》演出" 
            }
          ]
        },
        {
          title: "九曲溪竹筏漂流 - 天游峰",
          activities: [
            { 
              time: "上午", 
              icon: <Waves />,
              description: "九曲溪竹筏漂流" 
            },
            { 
              time: "中午", 
              icon: <Utensils />,
              description: "景区附近午餐" 
            },
            { 
              time: "下午", 
              icon: <Mountain />,
              description: "登天游峰俯瞰全景" 
            }
          ]
        },
        {
          title: "下梅村体验游",
          activities: [
            { 
              time: "上午", 
              icon: <MapPin />,
              description: "下梅村农活体验、农家菜" 
            },
            { 
              time: "下午", 
              icon: <Compass />,
              description: "了解茶道历史" 
            }
          ]
        },
        {
          title: "返程",
          activities: [
            { 
              time: "上午", 
              icon: <ShoppingBag />,
              description: "购买茶叶特产" 
            },
            { 
              time: "下午", 
              icon: <Train />,
              description: "返回深圳" 
            }
          ]
        }
      ]
    },
    {
      title: "福州 - 平潭岛休闲游",
      days: [
        {
          title: "深圳 - 福州",
          activities: [
            { 
              time: "交通", 
              icon: <Train />,
              description: "高铁约4-5小时/飞机约1小时" 
            },
            { 
              time: "上午", 
              icon: <Hotel />,
              description: "抵达福州，酒店入住" 
            },
            { 
              time: "中午", 
              icon: <Utensils />,
              description: "品尝鱼丸、肉燕、鼎边糊" 
            },
            { 
              time: "下午", 
              icon: <Compass />,
              description: "游览西禅寺、三坊七巷" 
            },
            { 
              time: "晚上", 
              icon: <Moon />,
              description: "烟台山公园夜景" 
            }
          ]
        },
        {
          title: "福州 - 平潭岛",
          activities: [
            { 
              time: "交通", 
              icon: <Car />,
              description: "乘车约2小时" 
            },
            { 
              time: "上午", 
              icon: <Waves />,
              description: "龙凤头沙滩" 
            },
            { 
              time: "下午", 
              icon: <MapPin />,
              description: "北港村、东海仙境" 
            },
            { 
              time: "晚上", 
              icon: <Utensils />,
              description: "海鲜大餐" 
            }
          ]
        },
        {
          title: "平潭岛奇景游",
          activities: [
            { 
              time: "上午", 
              icon: <Compass />,
              description: "猴研岛、海坛古城" 
            },
            { 
              time: "下午", 
              icon: <Waves />,
              description: "坛南湾、石牌洋" 
            }
          ]
        },
        {
          title: "返程",
          activities: [
            { 
              time: "上午", 
              icon: <ShoppingBag />,
              description: "购买特产" 
            },
            { 
              time: "下午", 
              icon: <Train />,
              description: "返回深圳" 
            }
          ]
        }
      ]
    },
    {
      title: "泉州历史文化游",
      days: [
        {
          title: "深圳 - 泉州",
          activities: [
            { 
              time: "交通", 
              icon: <Train />,
              description: "高铁约5-6小时/飞机+转车" 
            },
            { 
              time: "上午", 
              icon: <Hotel />,
              description: "抵达泉州，酒店入住" 
            },
            { 
              time: "中午", 
              icon: <Utensils />,
              description: "品尝肉粽、面线糊、土笋冻" 
            },
            { 
              time: "下午", 
              icon: <Compass />,
              description: "游览西街、开元寺" 
            },
            { 
              time: "晚上", 
              icon: <Moon />,
              description: "府文庙、清净寺" 
            }
          ]
        },
        {
          title: "泉州周边游",
          activities: [
            { 
              time: "上午", 
              icon: <MapPin />,
              description: "惠安崇武古城" 
            },
            { 
              time: "下午", 
              icon: <Mountain />,
              description: "清源山" 
            }
          ]
        },
        {
          title: "泉州民俗体验游",
          activities: [
            { 
              time: "上午", 
              icon: <Ticket />,
              description: "泉州南音艺苑" 
            },
            { 
              time: "下午", 
              icon: <Ticket />,
              description: "泉州木偶剧团" 
            }
          ]
        },
        {
          title: "返程",
          activities: [
            { 
              time: "上午", 
              icon: <ShoppingBag />,
              description: "购买德化陶瓷" 
            },
            { 
              time: "下午", 
              icon: <Train />,
              description: "返回深圳" 
            }
          ]
        }
      ]
    },
    {
      title: "太姥山 - 霞浦滩涂摄影游",
      days: [
        {
          title: "深圳 - 福鼎",
          activities: [
            { 
              time: "交通", 
              icon: <Train />,
              description: "高铁约6-7小时/飞机+转车" 
            },
            { 
              time: "上午", 
              icon: <Hotel />,
              description: "抵达福鼎，酒店入住" 
            },
            { 
              time: "下午", 
              icon: <Mountain />,
              description: "太姥山岳景区" 
            }
          ]
        },
        {
          title: "太姥山深度游",
          activities: [
            { 
              time: "上午", 
              icon: <Waves />,
              description: "九鲤溪瀑景区" 
            },
            { 
              time: "下午", 
              icon: <Waves />,
              description: "晴川海滨" 
            }
          ]
        },
        {
          title: "福鼎 - 霞浦",
          activities: [
            { 
              time: "交通", 
              icon: <Car />,
              description: "乘车约1小时" 
            },
            { 
              time: "上午", 
              icon: <Camera />,
              description: "小皓沙滩摄影" 
            },
            { 
              time: "下午", 
              icon: <Camera />,
              description: "东壁村日落" 
            }
          ]
        },
        {
          title: "返程",
          activities: [
            { 
              time: "上午", 
              icon: <ShoppingBag />,
              description: "购买海产品" 
            },
            { 
              time: "下午", 
              icon: <Train />,
              description: "返回深圳" 
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 调整滚动检测的阈值，考虑主导航栏的高度
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* 导航栏 - 调整定位和样式 */}
      <motion.nav
        className={`sticky top-[64px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-orange-500">FJ</span>TRAVEL
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {trips?.map((trip, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTrip(index)}
                className={`relative text-lg font-medium ${
                  activeTrip === index ? 'text-orange-500' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {trip?.title}
                {activeTrip === index && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <button className="md:hidden text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* 主标题 - 调整顶部间距 */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden mt-[64px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-full h-full bg-gray-900 opacity-30"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
        
        <div className="relative z-20 text-center px-6">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-orange-500">福建</span>五一<span className="text-orange-500">4天</span>游
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            5套精心设计的行程方案，从厦门到武夷山，体验福建的多元魅力
          </motion.p>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-4 bg-orange-500 text-black font-bold rounded-full text-lg hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              查看行程方案
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-0 right-0 flex justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </header>

      {/* 行程内容 */}
      <div className="container mx-auto px-6 py-20" ref={containerRef}>
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            <span className="text-orange-500">5</span>套精选行程方案
          </h2>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto">
            从海滨城市到茶山古镇，体验福建的多元文化与自然风光
          </p>
        </motion.div>

        {/* 移动端行程选择 */}
        <div className="md:hidden mb-12">
          <select 
            className="w-full bg-gray-900 border border-gray-800 text-white p-4 rounded-lg"
            value={activeTrip}
            onChange={(e) => setActiveTrip(parseInt(e?.target?.value))}
          >
            {trips?.map((trip, index) => (
              <option key={index} value={index}>{trip?.title}</option>
            ))}
          </select>
        </div>

        {/* 行程详情 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrip}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mb-32"
          >
            <div className="flex items-center mb-8">
              <motion.div 
                className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mr-6"
                whileHover={{ rotate: 15 }}
              >
                <MapPin className="text-orange-500" size={28} />
              </motion.div>
              <h3 className="text-3xl md:text-5xl font-bold">
                {trips?.[activeTrip]?.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {trips?.[activeTrip]?.days?.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIndex * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
                    <h4 className="text-xl font-bold mb-2">
                      <span className="text-orange-500">Day {dayIndex + 1}</span> - {day?.title}
                    </h4>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-6">
                      {day?.activities?.map((activity, activityIndex) => (
                        <motion.li 
                          key={activityIndex}
                          className="flex items-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 * activityIndex }}
                        >
                          <div className="bg-orange-500/10 p-2 rounded-lg mr-4">
                            {React.cloneElement(activity?.icon, { className: "text-orange-500", size: 20 })}
                          </div>
                          <div>
                            <div className="text-orange-500 font-medium">{activity?.time}</div>
                            <div className="text-gray-300">{activity?.description}</div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 其他行程提示 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            还有<span className="text-orange-500">4</span>套精彩行程等你探索
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {trips?.map((trip, index) => (
              index !== activeTrip && (
                <motion.button
                  key={index}
                  onClick={() => setActiveTrip(index)}
                  className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {trip?.title}
                </motion.button>
              )
            ))}
          </div>
        </motion.div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">福建五一4天游</h4>
              <p className="text-gray-400">
                5套精心设计的行程方案，体验福建的多元魅力
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">作者信息</h4>
              <p className="text-gray-400 mb-2">Wang L. Richie</p>
              <div className="flex space-x-4">
                <a href="https://x.com/Jone12suny" className="text-orange-500 hover:text-orange-400" target="_blank" rel="noopener noreferrer">
                  Twitter/X
                </a>
                <a href="https://github.com/linRichie" className="text-orange-500 hover:text-orange-400" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
            
            <div>
              {/* <h4 className="text-xl font-bold mb-4">版权信息</h4> */}
              <p className="text-gray-400">© 2025 All Rights Reserved</p>
              <p className="text-gray-400 mt-2">
                created by <a href="#" className="text-orange-500 hover:underline">Wang L. Richie </a> 
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FujianTravel;
