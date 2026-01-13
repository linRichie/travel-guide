import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Mountain, Camera, Utensils, Hotel, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const QinghaiTravel = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeDay, setActiveDay] = useState(1);
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const days = [
    {
      day: 1,
      title: "抵达西宁",
      highlights: [
        { time: "14:00", activity: "抵达西宁曹家堡机场", icon: <MapPin size={20} /> },
        { time: "15:30", activity: "入住酒店休息", icon: <Hotel size={20} /> },
        { time: "18:00", activity: "品尝当地美食", icon: <Utensils size={20} /> }
      ]
    },
    {
      day: 2,
      title: "青海湖一日游",
      highlights: [
        { time: "08:00", activity: "出发前往青海湖", icon: <ArrowRight size={20} /> },
        { time: "10:30", activity: "抵达青海湖二郎剑景区", icon: <Mountain size={20} /> },
        { time: "12:00", activity: "湖边午餐", icon: <Utensils size={20} /> },
        { time: "14:00", activity: "环湖骑行体验", icon: <Camera size={20} /> }
      ]
    },
    {
      day: 3,
      title: "茶卡盐湖",
      highlights: [
        { time: "07:30", activity: "前往茶卡盐湖", icon: <ArrowRight size={20} /> },
        { time: "10:00", activity: "天空之镜拍摄", icon: <Camera size={20} /> },
        { time: "12:30", activity: "盐湖特色午餐", icon: <Utensils size={20} /> },
        { time: "15:00", activity: "自由活动时间", icon: <Clock size={20} /> }
      ]
    },
    {
      day: 4,
      title: "祁连山脉",
      highlights: [
        { time: "08:00", activity: "前往祁连县", icon: <ArrowRight size={20} /> },
        { time: "11:00", activity: "卓尔山景区游览", icon: <Mountain size={20} /> },
        { time: "13:00", activity: "当地农家午餐", icon: <Utensils size={20} /> },
        { time: "15:00", activity: "自由摄影时间", icon: <Camera size={20} /> }
      ]
    },
    {
      day: 5,
      title: "门源油菜花",
      highlights: [
        { time: "07:00", activity: "前往门源", icon: <ArrowRight size={20} /> },
        { time: "09:30", activity: "油菜花海游览", icon: <Camera size={20} /> },
        { time: "12:00", activity: "午餐休息", icon: <Utensils size={20} /> },
        { time: "14:00", activity: "返回西宁", icon: <ArrowRight size={20} /> }
      ]
    },
    {
      day: 6,
      title: "塔尔寺文化",
      highlights: [
        { time: "09:00", activity: "参观塔尔寺", icon: <Mountain size={20} /> },
        { time: "12:00", activity: "素食午餐", icon: <Utensils size={20} /> },
        { time: "14:00", activity: "自由购物时间", icon: <Clock size={20} /> }
      ]
    },
    {
      day: 7,
      title: "返程",
      highlights: [
        { time: "08:00", activity: "酒店早餐", icon: <Utensils size={20} /> },
        { time: "10:00", activity: "前往机场", icon: <ArrowRight size={20} /> },
        { time: "12:00", activity: "航班返回", icon: <MapPin size={20} /> }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.getBoundingClientRect().top;
      const scrollPosition = window.scrollY - containerTop;

      const dayHeight = window.innerHeight * 0.8;
      const newActiveDay = Math.min(
        Math.max(1, Math.floor(scrollPosition / dayHeight) + 1),
        7
      );

      if (newActiveDay !== activeDay) {
        setActiveDay(newActiveDay);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeDay]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-orange-500">
            青海7日
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            MAY 2025 · 7 DAYS · 5 DESTINATIONS
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-16"
          >
            <ArrowRight className="w-12 h-12 mx-auto text-orange-500 rotate-90" />
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>
          <img 
            src="https://s.coze.cn/t/JXrbJGvuLY8/" 
            alt="Qinghai Landscape"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </div>

      {/* Timeline Section */}
      <div ref={containerRef} className="relative">
        {/* Left Side Day Indicators */}
        <div className="hidden md:block fixed left-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col space-y-8">
            {days.map((day) => (
              <button
                key={day.day}
                onClick={() => {
                  const element = document.getElementById(`day-${day.day}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative group"
              >
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${activeDay === day.day ? 'bg-orange-500 scale-125' : (isDark ? 'bg-gray-600' : 'bg-gray-400')}`}></div>
                <div className={`absolute left-8 top-1/2 transform -translate-y-1/2 text-left transition-all duration-300 ${activeDay === day.day ? 'opacity-100 scale-100 text-orange-500' : (isDark ? 'opacity-0 scale-90 text-gray-400' : 'opacity-0 scale-90 text-gray-500')}`}>
                  <span className="text-xl font-bold">DAY {day.day}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="relative z-10">
          {days.map((day) => (
            <section 
              key={day.day}
              id={`day-${day.day}`}
              className="min-h-screen py-20 px-4 md:px-20 flex flex-col justify-center relative"
            >
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-12"
                >
                  <div className="text-orange-500 text-sm mb-2">DAY {day.day}</div>
                  <h2 className="text-5xl md:text-7xl font-bold">{day.title}</h2>
                </motion.div>

                <div className="relative">
                  {/* Vertical Line */}
                  <div className={`absolute left-5 top-0 bottom-0 w-0.5 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`}></div>

                  {day.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex items-start mb-12 group"
                    >
                      {/* Time Dot */}
                      <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center mr-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className="text-orange-500">
                          {highlight.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="text-orange-500 text-lg mb-1">{highlight.time}</div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3">{highlight.activity}</h3>
                        <p className={`max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden opacity-20 z-0">
                <img 
                  src="https://s.coze.cn/t/h3vBoNIjfMs/" 
                  alt={`Day ${day.day} Background`}
                  className="w-full h-full object-cover"
                />
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <section className={`min-h-screen py-20 px-4 md:px-20 bg-gradient-to-b flex flex-col justify-center ${isDark ? 'from-black to-gray-900' : 'from-gray-50 to-gray-100'}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-orange-500">7</span> DAYS · <span className="text-orange-500">5</span> DESTINATIONS
            </h2>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Experience the breathtaking landscapes and rich culture of Qinghai in this carefully curated 7-day itinerary.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Mountain size={40} />, title: "Natural Wonders", value: "4+", desc: "Scenic spots" },
              { icon: <Camera size={40} />, title: "Photo Ops", value: "20+", desc: "Instagrammable locations" },
              { icon: <Utensils size={40} />, title: "Local Cuisine", value: "15+", desc: "Authentic meals" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 text-center ${isDark ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}
              >
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-orange-500 mb-6 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <div className="text-5xl font-bold text-orange-500 mb-2">{item.value}</div>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 md:px-20 border-t ${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">青海7日游</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>May 2025 Travel Itinerary</p>
            </div>

            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="https://x.com/Jone12suny" target="_blank" rel="noopener noreferrer" className={isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'} className="transition-colors">
                <span className="text-sm">Twitter/X</span>
              </a>
              <a href="https://github.com/linRichie" target="_blank" rel="noopener noreferrer" className={isDark ? 'text-gray-400 hover:text-orange-500' : 'text-gray-600 hover:text-orange-500'} className="transition-colors">
                <span className="text-sm">GitHub</span>
              </a>
            </div>

            <div className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-sm`}>
              <p>© 2025 Wang L. Richie. All rights reserved.</p>
              <p className="mt-1">Created by <a href="#" className="text-orange-500 hover:underline">Wang L. Richie</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QinghaiTravel;