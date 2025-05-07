import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AMapLoader from '@amap/amap-jsapi-loader';
import { ChevronRight, MapPin, Calendar, Sun, Moon, Plane, Train, Ship, Bus, Utensils, Hotel, Camera } from 'lucide-react';

const GuangxiTravel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);  // 用于存储标记点实例
  const carMarkerRef = useRef(null);

  // 定义所有方案的景点数据
  const planMarkers = {
    0: [ // 方案一：桂林-阳朔-龙脊-北海-涠洲岛
      { name: '桂林两江国际机场', position: [110.039317, 25.218618] },
      { name: '象鼻山', position: [110.264105, 25.268153] },
      { name: '正阳步行街', position: [110.290824, 25.273694] },
      { name: '两江四湖', position: [110.286428, 25.270851] },
      { name: '漓江', position: [110.290194, 25.273566] },
      { name: '银子岩', position: [110.444359, 24.919786] },
      { name: '阳朔西街', position: [110.496593, 24.778651] },
      { name: '遇龙河', position: [110.422688, 24.778259] },
      { name: '十里画廊', position: [110.469687, 24.813446] },
      { name: '龙脊梯田', position: [110.143566, 25.775148] },
      { name: '北海银滩', position: [109.119254, 21.473343] },
      { name: '涠洲岛', position: [109.113277, 21.037800] }
    ],
    1: [ // 方案二：南宁-德天瀑布-北海
      { name: '南宁吴圩国际机场', position: [108.171125, 22.608415] },
      { name: '青秀山', position: [108.386796, 22.787001] },
      { name: '德天瀑布', position: [106.644554, 22.704771] },
      { name: '通灵大峡谷', position: [106.938238, 24.611939] },
      { name: '北海银滩', position: [109.119254, 21.473343] },
      { name: '北海老街', position: [109.107185, 21.481116] }
    ],
    2: [ // 方案三：桂林-黄姚古镇-梧州-南宁
      { name: '桂林两江国际机场', position: [110.039317, 25.218618] },
      { name: '象鼻山', position: [110.264105, 25.268153] },
      { name: '黄姚古镇', position: [111.276527, 24.421111] },
      { name: '梧州骑楼城', position: [111.305473, 23.485038] },
      { name: '南宁青秀山', position: [108.386796, 22.787001] },
      { name: '南宁民歌湖', position: [108.393168, 22.816226] }
    ]
  };

  // 初始化地图
  useEffect(() => {
    AMapLoader.load({
      key: 'd17c17f8f712c81a7e4241aff4faa7b0',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.MoveAnimation'], // 添加 MoveAnimation 插件
    }).then((AMap) => {
      mapInstance.current = new AMap.Map(mapContainerRef.current, {
        viewMode: '3D',
        zoom: 7,
        center: [108.320004, 22.82402],
      });

      // 添加控件
      mapInstance.current.addControl(new AMap.Scale());
      mapInstance.current.addControl(new AMap.ToolBar());

      // 初始显示方案一的标记点
      updateMarkers(0);
    }).catch(e => {
      console.error('地图加载失败:', e);
    });

    return () => {
      mapInstance.current?.destroy();
    };
  }, []);

  // 添加移动的汽车标记
  const addMovingCar = (path) => {
    if (carMarkerRef.current) {
      carMarkerRef.current.setMap(null);
    }

    // 使用高德地图官方提供的汽车图标
    const carMarker = new window.AMap.Marker({
      map: mapInstance.current,
      position: path[0],
      icon: new window.AMap.Icon({
        // 使用官方提供的汽车图标
        image: 'https://webapi.amap.com/images/car.png',  // 更换为官方汽车图标
        size: new window.AMap.Size(32, 32),               // 图标大小
        imageSize: new window.AMap.Size(32, 32)           // 图片大小
      }),
      offset: new window.AMap.Pixel(-16, -16),            // 偏移量调整为图标大小的一半
      autoRotation: true
    });

    carMarkerRef.current = carMarker;

    // 创建动画路径
    const lineArr = path.map(p => [p.lng, p.lat]);
  
    // 开始动画
    const startAnimation = () => {
      carMarker.moveAlong(lineArr, {
        duration: 10000,
        autoRotation: true,
        done: () => {
          setTimeout(() => {
            carMarker.setPosition(path[0]);
            startAnimation();
          }, 1000);
        }
      });
    };

    startAnimation();
  };

  // 计算两点之间的距离
  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.lng - point1.lng, 2) + 
      Math.pow(point2.lat - point1.lat, 2)
    );
  };

  // 更新标记点和路线的函数
  const updateMarkers = (tabIndex) => {
    // 清除现有标记点和路线
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    const markers = planMarkers[tabIndex];
    const path = markers.map(marker => 
      new window.AMap.LngLat(marker.position[0], marker.position[1])
    );

    // 添加路线
    const polyline = new window.AMap.Polyline({
      path: path,
      strokeColor: "#28a745",
      strokeWeight: 4,
      strokeOpacity: 0.8,
      showDir: true,
      dirColor: '#28a745',
      strokeStyle: 'solid',
      lineJoin: 'round',
      lineCap: 'round'
    });
    polyline.setMap(mapInstance.current);
    markersRef.current.push(polyline);

    // 添加标记点
    markers.forEach((marker, index) => {
      let icon;
      if (index === 0) {
        // 起点使用红旗图标
        icon = new window.AMap.Icon({
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          size: new window.AMap.Size(25, 34),
          imageSize: new window.AMap.Size(25, 34)
        });
      }

      const newMarker = new window.AMap.Marker({
        position: new window.AMap.LngLat(marker.position[0], marker.position[1]),
        icon: icon,
        title: marker.name
      });

      const text = new window.AMap.Text({
        text: marker.name,
        position: new window.AMap.LngLat(marker.position[0], marker.position[1]),
        style: {
          'background-color': 'transparent',
          'border-width': 0,
          'font-size': '12px',
          'font-weight': 'bold',
          'color': '#fff',
          'text-shadow': '1px 1px 2px rgba(0,0,0,0.8)',
          'padding': '4px 8px'
        },
        offset: new window.AMap.Pixel(0, -35)
      });

      newMarker.setMap(mapInstance.current);
      text.setMap(mapInstance.current);
      markersRef.current.push(newMarker);
      markersRef.current.push(text);
    });

    // 添加移动的汽车
    addMovingCar(path);

    // 自动调整视野以包含所有标记点和路线
    mapInstance.current.setFitView();
  };

  // 监听标签页切换
  useEffect(() => {
    if (mapInstance.current) {
      updateMarkers(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 0, title: '方案一', subtitle: '桂林-阳朔-龙脊-北海-涠洲岛' },
    { id: 1, title: '方案二', subtitle: '南宁-德天瀑布-北海' },
    { id: 2, title: '方案三', subtitle: '桂林-黄姚古镇-梧州-南宁' }
  ];

  const itineraries = [
    // 方案一
    [
      {
        day: 1,
        title: '抵达桂林',
        activities: [
          { time: '上午', icon: <Plane />, content: '抵达桂林两江国际机场，乘坐机场大巴或出租车前往市区酒店办理入住手续，稍作休息。' },
          { time: '下午', icon: <MapPin />, content: '前往桂林的标志性景点象鼻山，山形酷似大象汲水，拍照特别出片。之后漫步正阳步行街和东西巷，感受桂林的市井生活。' },
          { time: '晚上', icon: <Moon />, content: '夜游两江四湖，灯光下的日月双塔美轮美奂，仿佛置身于梦幻画卷之中。' }
        ]
      },
      {
        day: 2,
        title: '漓江 - 阳朔',
        activities: [
          { time: '上午', icon: <Ship />, content: '乘坐竹筏游览漓江精华段，欣赏"九马画山"和"黄布倒影"等绝美山水画卷。' },
          { time: '下午', icon: <MapPin />, content: '抵达阳朔后，探秘银子岩溶洞，里面的钟乳石奇观让人仿佛置身于地下宫殿。' },
          { time: '晚上', icon: <Utensils />, content: '逛阳朔西街，感受热闹的异国风情，还可以观看《印象·刘三姐》实景演出，场面十分震撼。' }
        ]
      },
      {
        day: 3,
        title: '阳朔',
        activities: [
          { time: '上午', icon: <Ship />, content: '在遇龙河体验竹筏漂流，水清如镜，两岸稻田与喀斯特山峰相映成趣。' },
          { time: '下午', icon: <Bus />, content: '骑行十里画廊，沿途的田园风光、荷花池塘美不胜收。' }
        ]
      },
      {
        day: 4,
        title: '龙脊梯田',
        activities: [
          { time: '上午', icon: <Bus />, content: '乘车前往龙脊梯田景区，欣赏壮丽的梯田风光。可以选择徒步登山或者乘坐缆车。' },
          { time: '下午', icon: <MapPin />, content: '在梯田周边的少数民族村落游览，体验当地的民俗风情，品尝特色美食如竹筒饭等。' },
          { time: '晚上', icon: <Hotel />, content: '入住梯田附近的民宿，欣赏梯田的夜景。' }
        ]
      },
      {
        day: 5,
        title: '北海',
        activities: [
          { time: '上午', icon: <Train />, content: '从桂林乘坐动车前往北海，到达后前往酒店办理入住，稍作休息。' },
          { time: '下午', icon: <MapPin />, content: '前往北海银滩，这里沙细白、水温净、浪柔软，是中国南方最理想的滨海旅游度假胜地之一。可以在沙滩上漫步、晒太阳、玩沙等。' },
          { time: '晚上', icon: <Utensils />, content: '逛北海老街，品尝各种海鲜美食，感受老街的历史韵味。' }
        ]
      },
      {
        day: 6,
        title: '涠洲岛',
        activities: [
          { time: '上午', icon: <Ship />, content: '乘船登上涠洲岛，前往酒店办理入住。之后前往五彩滩看日出，五彩斑斓的沙滩在阳光的照耀下非常美丽。' },
          { time: '下午', icon: <MapPin />, content: '参观天主教堂，了解岛上的历史文化。然后前往滴水丹屏，欣赏日落美景。' },
          { time: '晚上', icon: <Utensils />, content: '在岛上的海鲜市场购买新鲜的海鲜，到餐馆加工后品尝。' }
        ]
      },
      {
        day: 7,
        title: '涠洲岛 - 返程',
        activities: [
          { time: '上午', icon: <MapPin />, content: '前往鳄鱼山地质公园，探索涠洲岛的奇妙地貌，这里的火山岩、珊瑚礁等自然景观让人流连忘返。' },
          { time: '下午', icon: <Plane />, content: '乘船返回北海市区，根据返程时间前往机场或火车站，结束愉快的旅程。' }
        ]
      }
    ],
    // 方案二
    [
      {
        day: 1,
        title: '抵达南宁',
        activities: [
          { time: '上午', icon: <Plane />, content: '抵达南宁吴圩国际机场，乘坐机场大巴或出租车前往市区酒店办理入住手续，稍作休息。' },
          { time: '下午', icon: <MapPin />, content: '前往青秀山，这座被誉为"南宁绿肺"的森林公园，不仅空气清新，还能俯瞰整个南宁市区的美景。' },
          { time: '晚上', icon: <Utensils />, content: '去琅西夜市逛逛，品尝地道的南宁小吃，如老友粉、酸嘢等，感受这座城市的夜生活魅力。' }
        ]
      },
      {
        day: 2,
        title: '德天瀑布 - 明仕田园',
        activities: [
          { time: '上午', icon: <Bus />, content: '早餐后，驱车前往壮观的德天瀑布。这里的水流磅礴，气势恢宏，是摄影爱好者的天堂。可以购买景区观光车以节省体力，在瀑布山顶的玻璃栈道和稻香咖啡屋拍照打卡。' },
          { time: '下午', icon: <MapPin />, content: '前往明仕田园，体验宁静的田园风光。租一辆电瓶车，在田间地头畅游，感受大自然的宁静与和谐。' },
          { time: '晚上', icon: <Hotel />, content: '入住明仕田园附近的民宿，欣赏田园夜景。' }
        ]
      },
      {
        day: 3,
        title: '通灵大峡谷 - 北海',
        activities: [
          { time: '上午', icon: <MapPin />, content: '探访神秘的通灵大峡谷，这里的大自然鬼斧神工，188米高的瀑布从断崖飞泻，沿途古树参天、藤蔓交织，还有侏罗纪时期的桫椤群落。' },
          { time: '下午', icon: <Bus />, content: '驱车前往北海，到达后前往酒店办理入住，稍作休息。然后可以漫步在海边，感受海风拂面的惬意。' },
          { time: '晚上', icon: <Utensils />, content: '在北海市区的餐馆品尝海鲜美食。' }
        ]
      },
      {
        day: 4,
        title: '北海',
        activities: [
          { time: '上午', icon: <MapPin />, content: '前往北海银滩，尽情享受沙滩和海浪。可以参与一些水上活动，如冲浪、潜水等。' },
          { time: '下午', icon: <MapPin />, content: '参观北海海底世界，了解各种海洋生物。' },
          { time: '晚上', icon: <Utensils />, content: '再次前往北海老街，购买一些特色纪念品。' }
        ]
      },
      {
        day: 5,
        title: '涠洲岛',
        activities: [
          { time: '上午', icon: <Ship />, content: '乘船登上涠洲岛，前往酒店办理入住。之后前往贝壳沙滩玩耍，感受沙滩的细腻与柔软。' },
          { time: '下午', icon: <MapPin />, content: '前往石螺口海滩，这里的海水清澈，是看日落的好地方。' },
          { time: '晚上', icon: <Utensils />, content: '在岛上的海鲜市场购买新鲜的海鲜，到餐馆加工后品尝。' }
        ]
      },
      {
        day: 6,
        title: '涠洲岛',
        activities: [
          { time: '上午', icon: <Sun />, content: '前往五彩滩看日出，之后可以去仙人掌相框等景点拍照打卡。' },
          { time: '下午', icon: <Bus />, content: '租一辆电瓶车环岛骑行，欣赏岛上的各处美景，如滴水丹屏、天主教堂等。' },
          { time: '晚上', icon: <Utensils />, content: '在岛上的餐厅享用晚餐，欣赏海岛夜景。' }
        ]
      },
      {
        day: 7,
        title: '涠洲岛 - 返程',
        activities: [
          { time: '上午', icon: <MapPin />, content: '在岛上自由活动，可以选择去海边散步、捡贝壳等。' },
          { time: '下午', icon: <Plane />, content: '乘船返回北海市区，根据返程时间前往机场或火车站，结束愉快的旅程。' }
        ]
      }
    ],
    // 方案三
    [
      {
        day: 1,
        title: '抵达桂林',
        activities: [
          { time: '上午', icon: <Plane />, content: '抵达桂林两江国际机场，乘坐机场大巴或出租车前往市区酒店办理入住手续，稍作休息。' },
          { time: '下午', icon: <MapPin />, content: '前往象山公园，近距离观赏桂林的标志性景观——象鼻山。随后，可以漫步正阳步行街和东西巷，感受桂林的市井生活。' },
          { time: '晚上', icon: <Moon />, content: '夜游两江四湖，欣赏桂林的夜景。' }
        ]
      },
      {
        day: 2,
        title: '桂林 - 黄姚古镇',
        activities: [
          { time: '上午', icon: <Bus />, content: '乘车前往黄姚古镇，这座发祥于宋朝年间的千年古镇，仍保留着古朴的生活气息，古镇的建筑和街道仍保存完整。可以漫步在青石板路上，欣赏古老的建筑和田园风光。' },
          { time: '下午', icon: <MapPin />, content: '参观古镇内的庙宇、宗祠、亭台阁楼等明清古代建筑，以及广西省工委旧址、古戏台、安乐寺等著名景点。' },
          { time: '晚上', icon: <Hotel />, content: '入住古镇内的民宿，品尝当地的特色美食，如豆豉宴等。' }
        ]
      },
      {
        day: 3,
        title: '黄姚古镇 - 贺州',
        activities: [
          { time: '上午', icon: <Camera />, content: '在黄姚古镇自由活动，拍照留念，感受古镇的宁静与悠闲。' },
          { time: '下午', icon: <Bus />, content: '乘车前往贺州，到达后前往酒店办理入住手续。之后可以去贺州的姑婆山景区游玩，这里的生态环境极好，树木繁多，空气质量高。' },
          { time: '晚上', icon: <Utensils />, content: '在贺州市区的餐馆品尝当地美食。' }
        ]
      },
      {
        day: 4,
        title: '贺州 - 梧州',
        activities: [
          { time: '上午', icon: <Train />, content: '从贺州乘坐动车前往梧州，到达后前往酒店办理入住。之后前往梧州龙母庙，这是一座历史悠久的庙宇，依山傍水，香火旺盛。' },
          { time: '下午', icon: <MapPin />, content: '游览骑楼城，这是梧州的特色建筑，具有浓郁的岭南风情。可以在这里购买一些特色纪念品，品尝梧州的特色小吃，如龟苓膏、纸包鸡等。' },
          { time: '晚上', icon: <Utensils />, content: '在骑楼城附近的餐馆享用晚餐，欣赏夜景。' }
        ]
      },
      {
        day: 5,
        title: '梧州 - 南宁',
        activities: [
          { time: '上午', icon: <Train />, content: '从梧州乘坐动车前往南宁，到达后前往酒店办理入住。之后前往广西民族博物馆，了解广西的民族文化和历史。' },
          { time: '下午', icon: <MapPin />, content: '前往南湖公园散步，欣赏湖景和城市风光。' },
          { time: '晚上', icon: <Utensils />, content: '去南宁的夜市品尝各种美食，如老友粉、卷筒粉等。' }
        ]
      },
      {
        day: 6,
        title: '南宁',
        activities: [
          { time: '上午', icon: <MapPin />, content: '前往青秀山，登顶龙象塔，俯瞰邕江与城市天际线，欣赏雨林大观中的千年苏铁与珍稀植物。' },
          { time: '下午', icon: <MapPin />, content: '在青秀山周边的餐馆享用午餐后，前往南宁动物园，观赏各种动物。' },
          { time: '晚上', icon: <Utensils />, content: '在南宁市区的商场或夜市购物，购买一些特产。' }
        ]
      },
      {
        day: 7,
        title: '南宁 - 返程',
        activities: [
          { time: '上午', icon: <MapPin />, content: '在南宁市区自由活动，可以去商场购物或者品尝美食。' },
          { time: '下午', icon: <Plane />, content: '根据返程时间前往机场或火车站，结束愉快的旅程。' }
        ]
      }
    ]
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20"> {/* 添加 pt-20 为主导航栏留出空间 */}
      {/* 导航栏 */}
      <motion.nav
        className={`sticky top-20 left-0 right-0 z-10 py-4 px-6 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-orange-500">GUANGXI</span> TRAVEL
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`relative py-2 px-1 text-sm font-medium transition-colors ${
                  activeTab === index ? 'text-orange-500' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {tab.title}
                {activeTab === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    layoutId="underline"
                  />
                )}
              </motion.button>
            ))}
          </div>
          <button className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* 主内容 */}
      <main className="pt-24 pb-16">
        {/* 标题部分 */}
        <section className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-orange-500">广西</span>7日游
              <span className="block text-2xl md:text-3xl text-gray-400 mt-2">GUANGXI 7-DAY ITINERARY</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              探索中国南方的喀斯特地貌、田园风光和滨海风情。三套精心设计的行程方案，满足不同旅行偏好。
            </p>
          </motion.div>
        </section>

        {/* 方案选择 - 移动端 */}
        <div className="md:hidden container mx-auto px-6 mb-8">
          <div className="flex overflow-x-auto pb-2 space-x-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeTab === index ? 'bg-orange-500 text-black' : 'bg-gray-800 text-white'}`}
                whileHover={{ scale: 1.05 }}
              >
                {tab.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 行程内容 */}
        <section className="container mx-auto px-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <span className="text-orange-500 mr-2">方案 {activeTab + 1}</span>
              <span className="text-xl text-gray-400">{tabs[activeTab]?.subtitle}</span>
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {itineraries[activeTab]?.map((dayPlan) => (
                <motion.div
                  key={dayPlan.day}
                  className="bg-gray-900 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 mr-4">
                        <span className="text-xl font-bold">{dayPlan.day}</span>
                      </div>
                      <h3 className="text-2xl font-bold">{dayPlan.title}</h3>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {dayPlan.activities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="p-6 flex"
                        whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.05)' }}
                      >
                        <div className="mr-4">
                          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                            {activity.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="text-orange-500 font-medium">{activity.time}</span>
                            <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
                          </div>
                          <p className="text-gray-300">{activity.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 地图展示 */}
        <section className="container mx-auto px-6 mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-orange-500">行程</span>地图
              <span className="block text-xl text-gray-400 mt-2">ITINERARY MAP</span>
            </h2>
            <div className="bg-gray-900 rounded-xl overflow-hidden h-[600px] border border-gray-800">
              <div ref={mapContainerRef} className="w-full h-full"></div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Wang L. Richie</h3>
              <div className="flex space-x-4">
                <a href="https://x.com/Jone12suny" className="text-gray-400 hover:text-orange-500 transition-colors" target="_blank" rel="noopener noreferrer">
                  Twitter/X
                </a>
                <a href="https://github.com/linRichie" className="text-gray-400 hover:text-orange-500 transition-colors" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              <div>© 2025 All Rights Reserved</div>
              <div className="mt-2">
                <span>created by </span>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors" target="_blank" rel="noopener noreferrer">
                Wang L. Richie
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuangxiTravel;
