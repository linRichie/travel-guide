import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  Building, 
  Waves, 
  Coffee,
  MapPin,
  Landmark
} from 'lucide-react';

const destinations = [
  {
    title: "四川省",
    description: "探索大熊猫故乡，体验川菜与人文风情",
    icon: Mountain,
    to: "/sichuan",
    imageUrl: "https://images.unsplash.com/photo-1505438157249-00e1b44ee34f",
    className: "col-span-2 row-span-2"
  },
  {
    title: "广西壮族自治区",
    description: "桂林山水甲天下",
    icon: Waves,
    to: "/guangxi",
    imageUrl: "https://images.unsplash.com/photo-1537210249814-b9a10a161ae4",
    className: "col-span-1 row-span-1"
  },
  {
    title: "成都市",
    description: "休闲天堂，美食之都",
    icon: Coffee,
    to: "/chengdu",
    imageUrl: "https://images.unsplash.com/photo-1540126034813-121bf29033d2?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "col-span-1 row-span-1"
  },
  {
    title: "青海省",
    description: "青藏高原的神秘与壮美",
    icon: Mountain,
    to: "/qinghai",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    className: "col-span-1 row-span-1"
  },
  {
    title: "江西省",
    description: "红色旅游与自然风光",
    icon: Building,
    to: "/jiangxi",
    imageUrl: "https://images.unsplash.com/photo-1470004914212-05527e49370b",
    className: "col-span-1 row-span-1"
  },
  {
    title: "福建省",
    description: "海上丝绸之路的起点",
    icon: MapPin,
    to: "/fujian",
    imageUrl: "https://images.unsplash.com/photo-1558005530-a7958896ec60",
    className: "col-span-1 row-span-1"
  },
  {
    title: "甘肃省",
    description: "丝绸之路上的历史与文化",
    icon: Building,
    to: "/gansu",
    imageUrl: "https://images.unsplash.com/photo-1566138884190-2dc2e9b2c704",
    className: "col-span-1 row-span-1"
  },
  {
    title: "陕西省",
    description: "千年古都，文明摇篮",
    icon: Landmark,
    to: "/shaanxi",
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d",
    className: "col-span-1 row-span-1"
  },
  {
    title: "安徽省",
    description: "黄山云海，徽派建筑",
    icon: Mountain,
    to: "/anhui",
    imageUrl: "https://images.unsplash.com/photo-1470004914212-05527e49370b",
    className: "col-span-1 row-span-1"
  },
  {
    title: "新疆维吾尔自治区",
    description: "丝绸之路上的明珠，壮美自然风光",
    icon: Mountain,
    to: "/xinjiang",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
    className: "col-span-1 row-span-1"
  },
];

const HomePage = () => {
  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1551101509-94c08c6a52f7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            {/* 
            https://images.unsplash.com/photo-1545569341-9eb8b30979d9
            */}
            <source
              src="https://videos.pexels.com/videos/aerial-view-of-a-city-1889482"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            探索<span className="text-orange-500">中国</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            从壮丽山川到繁华都市，发现最精彩的旅行目的地
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div 
            className="animate-bounce cursor-pointer"
            onClick={scrollToDestinations}
            role="button"
            aria-label="Scroll to destinations"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations" className="container mx-auto px-4 py-20">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          热门<span className="text-orange-500">目的地</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.title}
              className={`relative overflow-hidden rounded-2xl ${destination.className}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={destination.to} className="block h-full">
                <div className="absolute inset-0">
                  <img
                    src={destination.imageUrl}
                    alt={destination.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-all duration-300 hover:bg-black/60" />
                </div>
                
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <div className="flex items-center mb-2">
                    {React.createElement(destination.icon, { className: "w-6 h-6 mr-2" })}
                    <h3 className="text-2xl font-bold">{destination.title}</h3>
                  </div>
                  <p className="text-gray-300">{destination.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
