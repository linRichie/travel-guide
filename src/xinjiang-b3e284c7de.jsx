import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Mountain,
  MapPin,
  Utensils,
  Music,
  Hotel,
  Car,
  Sun,
  Moon,
  Compass,
  Calendar,
  Thermometer,
  FileText,
  ShoppingCart
} from 'lucide-react';
import AMapLoader from '@amap/amap-jsapi-loader';

const XinjiangTravel = () => {
  const mapContainerRef = useRef(null);
  const mapSDK = useRef();
  const mapInstance = useRef();

  useEffect(() => {
    AMapLoader.load({
      key: 'd17c17f8f712c81a7e4241aff4faa7b0',
      plugins: ['AMap.Scale', 'AMap.Marker']
    }).then(AMap => {
      mapSDK.current = AMap;
      const map = new AMap.Map(mapContainerRef.current, {
        viewMode: '3D',
        zoom: 5,
        center: [87.6168, 43.8256]
      });
      mapInstance.current = map;

      // 添加标记点
      const markers = [
        { position: [87.6168, 43.8256], title: '乌鲁木齐' },
        { position: [88.1314, 47.8486], title: '喀纳斯' },
        { position: [87.4874, 47.7319], title: '禾木' },
        { position: [85.6141, 44.3025], title: '赛里木湖' },
        { position: [83.2587, 43.4815], title: '那拉提草原' }
      ];

      markers.forEach(marker => {
        new AMap.Marker({
          position: marker.position,
          title: marker.title,
          map: map
        });
      });
    }).catch(e => {
      console.error(e);
    });

    return () => {
      mapInstance.current?.destroy();
    };
  }, []);

  const itinerary = [
    {
      day: 1,
      title: "深圳 - 乌鲁木齐",
      activities: [
        "上午：乘坐飞机抵达乌鲁木齐地窝堡国际机场",
        "下午：参观新疆国际大巴扎",
        "晚上：体验新疆夜生活"
      ],
      music: "《青春舞曲》",
      icon: <Plane />
    },
    {
      day: 2,
      title: "乌鲁木齐 - 天山天池 - 富蕴",
      activities: [
        "上午：游览天山天池",
        "下午：驱车前往富蕴",
        "晚上：入住富蕴县城酒店"
      ],
      music: "《我们新疆好地方》",
      icon: <Mountain />
    },
    {
      day: 3,
      title: "富蕴 - 可可托海 - 五彩滩 - 布尔津",
      activities: [
        "上午：游览可可托海",
        "下午：前往五彩滩",
        "晚上：入住布尔津县城酒店"
      ],
      music: "《可可托海的牧羊人》",
      icon: <Compass />
    },
    {
      day: 4,
      title: "布尔津 - 喀纳斯",
      activities: [
        "上午：游览喀纳斯湖",
        "下午：喀纳斯湖边漫步",
        "晚上：入住喀纳斯景区"
      ],
      music: "《喀纳斯的月光》",
      icon: <MapPin />
    },
    {
      day: 5,
      title: "喀纳斯 - 禾木",
      activities: [
        "上午：喀纳斯景区活动",
        "下午：前往禾木村",
        "晚上：入住禾木村"
      ],
      music: "《故乡的原风景》",
      icon: <Hotel />
    },
    {
      day: 6,
      title: "禾木 - 乌尔禾魔鬼城 - 乌尔禾",
      activities: [
        "上午：在禾木村自由活动",
        "下午：前往世界魔鬼城",
        "晚上：返回乌尔禾"
      ],
      music: "《风的季节》",
      icon: <Compass />
    },
    {
      day: 7,
      title: "乌尔禾 - 奎屯 - 赛里木湖",
      activities: [
        "上午：前往奎屯市",
        "下午：前往赛里木湖",
        "晚上：入住赛里木湖附近"
      ],
      music: "《贝加尔湖畔》",
      icon: <Mountain />
    },
    {
      day: 8,
      title: "赛里木湖 - 伊宁",
      activities: [
        "上午：赛里木湖周边活动",
        "下午：前往伊宁市",
        "晚上：体验当地夜生活"
      ],
      music: "《伊犁河的月夜》",
      icon: <MapPin />
    },
    {
      day: 9,
      title: "伊宁 - 那拉提草原",
      activities: [
        "全天：游览那拉提草原",
        "晚上：入住草原蒙古包"
      ],
      music: "《草原之夜》",
      icon: <Hotel />
    },
    {
      day: 10,
      title: "那拉提 - 独库公路 - 乌鲁木齐",
      activities: [
        "全天：沿独库公路返回",
        "晚上：抵达乌鲁木齐"
      ],
      music: "《天路》",
      icon: <Car />
    },
    {
      day: 11,
      title: "乌鲁木齐 - 深圳",
      activities: [
        "上午：乌鲁木齐自由活动",
        "下午/晚上：返回深圳"
      ],
      music: "《旅行的意义》",
      icon: <Plane />
    }
  ];

  const foods = [
    { name: "烤羊肉串", description: "新疆最具代表性的民族风味小吃" },
    { name: "大盘鸡", description: "新疆菜的代表之一，搭配皮带面" },
    { name: "手抓饭", description: "新疆传统美食，米饭饱满香气浓郁" },
    { name: "椒麻鸡", description: "麻、辣、鲜、香完美结合" },
    { name: "新疆炒米粉", description: "米粉吸收丰富调料和香气" },
    { name: "馕包肉", description: "馕酥脆，肉鲜嫩，味道独特" },
    { name: "新疆烤包子", description: "外皮酥脆，内馅多汁" }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      {/* 主视觉区 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B35] to-[#FF9F1C]"
          >
            丝路·光影
          </motion.h1>
          <p className="text-[#FF6B35] text-xl tracking-widest">SHENZHEN TO XINJIANG · 11-DAY ODYSSEY</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50"></div>
      </section>

      {/* 核心数据展示 */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#FF6B35]/10 to-transparent p-8 rounded-3xl border border-[#FF6B35]/30"
        >
          <div className="text-[#FF6B35] text-6xl font-bold">11</div>
          <p className="mt-2 text-xl">穿越天数<br /><span className="text-sm opacity-75">DAYS JOURNEY</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#FF6B35]/10 to-transparent p-8 rounded-3xl border border-[#FF6B35]/30"
        >
          <div className="text-[#FF6B35] text-6xl font-bold">8</div>
          <p className="mt-2 text-xl">世界级景点<br /><span className="text-sm opacity-75">UNESCO SITES</span></p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#FF6B35]/10 to-transparent p-8 rounded-3xl border border-[#FF6B35]/30"
        >
          <div className="text-[#FF6B35] text-6xl font-bold">2300</div>
          <p className="mt-2 text-xl">总里程数(km)<br /><span className="text-sm opacity-75">TOTAL MILEAGE</span></p>
        </motion.div>
      </section>

      {/* 行程时间线 */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold mb-12 border-l-4 border-[#FF6B35] pl-4"
        >
          每日行程
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-[#FF6B35] to-transparent"></div>

          {itinerary.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16 flex items-center justify-between"
            >
              {index % 2 === 0 ? (
                <>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="text-[#FF6B35] text-2xl font-bold">DAY {day.day}</div>
                    <h3 className="text-xl my-2">{day.title}</h3>
                    <p className="text-sm opacity-75">{day.activities[0]?.split('：')[1]}</p>
                  </div>
                  <div className="w-1/12 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.5)]"></div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="text-sm opacity-90 leading-relaxed">
                      {day.activities.map((activity, i) => (
                        <p key={i} className="mb-2">
                          <span className="inline-block w-2 h-2 bg-[#FF6B35] rounded-full mr-2"></span>
                          {activity}
                        </p>
                      ))}
                      <p className="flex items-center mt-4 text-[#FF6B35]">
                        <Music className="mr-2" /> 开车音乐推荐: {day.music}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-5/12 pr-8">
                    <div className="text-sm opacity-90 leading-relaxed">
                      {day.activities.map((activity, i) => (
                        <p key={i} className="mb-2">
                          <span className="inline-block w-2 h-2 bg-[#FF6B35] rounded-full mr-2"></span>
                          {activity}
                        </p>
                      ))}
                      <p className="flex items-center mt-4 text-[#FF6B35]">
                        <Music className="mr-2" /> 开车音乐推荐: {day.music}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/12 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.5)]"></div>
                  </div>
                  <div className="w-5/12 pl-8 text-left">
                    <div className="text-[#FF6B35] text-2xl font-bold">DAY {day.day}</div>
                    <h3 className="text-xl my-2">{day.title}</h3>
                    <p className="text-sm opacity-75">{day.activities[0]?.split('：')[1]}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 动态地图 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-12 border-l-4 border-[#FF6B35] pl-4"
          >
            行程轨迹
          </motion.h2>
          <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden">
            <div ref={mapContainerRef} className="w-full h-full"></div>
          </div>
        </div>
      </section>

      {/* 美食图鉴 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-12 border-l-4 border-[#FF6B35] pl-4"
          >
            特色美食
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {foods.map((food, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
              >
                <div className="text-[#FF6B35] text-2xl mb-2">
                  <Utensils />
                </div>
                <h3 className="text-xl font-bold mb-2">{food.name}</h3>
                <p className="text-gray-400">{food.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 实用贴士 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-12 border-l-4 border-[#FF6B35] pl-4"
          >
            实用贴士
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-8 rounded-xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Thermometer className="mr-2 text-[#FF6B35]" />
                天气特点
              </h3>
              <p className="text-gray-400 mb-4">
                10月的新疆气温逐渐降低，昼夜温差大，白天可能比较温暖，但早晚气温较低，山区气温更低。
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <Sun className="text-yellow-400 mr-2" />
                  <span>白天: 15-25°C</span>
                </div>
                <div className="flex items-center">
                  <Moon className="text-blue-400 mr-2" />
                  <span>夜晚: 5-10°C</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 p-8 rounded-xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="mr-2 text-[#FF6B35]" />
                旅行注意事项
              </h3>
              <div className="space-y-4 text-gray-400">
                <p className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#FF6B35] rounded-full mt-2 mr-2"></span>
                  新疆各地安检严格，随身携带身份证
                </p>
                <p className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#FF6B35] rounded-full mt-2 mr-2"></span>
                  新疆气候干燥，紫外线强，需做好防晒
                </p>
                <p className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#FF6B35] rounded-full mt-2 mr-2"></span>
                  尊重当地的风俗习惯和宗教信仰
                </p>
                <p className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#FF6B35] rounded-full mt-2 mr-2"></span>
                  部分山区信号不稳定，提前下载离线地图
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://x.com/Jone12suny"
              className="hover:text-[#FF6B35] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/linRichie"
              className="hover:text-[#FF6B35] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <div className="text-gray-500">
            <p>Created by <a href="#" className="text-[#FF6B35] hover:underline">Wang L. Richie</a></p>
            <p className="mt-2">© 2025 Wang L. Richie</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default XinjiangTravel;