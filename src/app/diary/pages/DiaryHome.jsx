import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * 个人旅行日记组件
 * 与旅游指南保持一致的暗色风格
 * 包含：首页、关于我、旅拍图集、旅行规划、旅行统计、旅行博客
 */
const DiaryHome = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 导航菜单配置
    const navItems = [
        { id: 'home', label: '首页', icon: 'fa-home' },
        { id: 'about', label: '关于我', icon: 'fa-user' },
        { id: 'gallery', label: '旅拍图集', icon: 'fa-images' },
        { id: 'plan', label: '旅行规划', icon: 'fa-map-marked-alt' },
        { id: 'stats', label: '旅行统计', icon: 'fa-chart-bar' },
        { id: 'blog', label: '旅行博客', icon: 'fa-blog' },
    ];

    // 旅拍图集数据
    const galleryItems = [
        { id: 1, title: '巴黎铁塔', location: '法国巴黎，2024年', img: 'https://picsum.photos/600/400' },
        { id: 2, title: '京都寺庙', location: '日本京都，2023年', img: 'https://picsum.photos/601/400' },
        { id: 3, title: '威尼斯水城', location: '意大利威尼斯，2023年', img: 'https://picsum.photos/602/400' },
        { id: 4, title: '圣托里尼', location: '希腊，2023年', img: 'https://picsum.photos/603/400' },
        { id: 5, title: '冰岛极光', location: '冰岛，2022年', img: 'https://picsum.photos/604/400' },
        { id: 6, title: '瑞士阿尔卑斯', location: '瑞士，2022年', img: 'https://picsum.photos/605/400' },
    ];

    // 旅行统计数据
    const statsData = [
        { id: 1, icon: 'fa-globe-asia', value: '25+', label: '访问国家', color: 'from-purple-500 to-indigo-600' },
        { id: 2, icon: 'fa-camera', value: '1000+', label: '拍摄照片', color: 'from-blue-500 to-cyan-600' },
        { id: 3, icon: 'fa-map-marked-alt', value: '50+', label: '探索城市', color: 'from-green-500 to-emerald-600' },
    ];

    // 旅行博客数据
    const blogPosts = [
        {
            id: 1,
            title: '巴黎艺术之旅',
            date: '2024年3月',
            content: '漫步在巴黎的街头，感受艺术的魅力，探索卢浮宫的珍宝...'
        },
        {
            id: 2,
            title: '京都文化探索',
            date: '2023年12月',
            content: '在京都的寺庙中寻找内心的平静，体验传统茶道文化...'
        },
        {
            id: 3,
            title: '威尼斯水城之旅',
            date: '2023年8月',
            content: '乘坐贡多拉，穿梭在威尼斯的水道中，感受浪漫与神秘...'
        },
        {
            id: 4,
            title: '冰岛极光追逐',
            date: '2022年11月',
            content: '在世界的尽头追寻欧若拉的裙摆，体验大自然的奇迹...'
        },
    ];

    // 渲染当前活动区块
    const renderActiveSection = () => {
        switch (activeSection) {
            case 'home':
                return (
                    <motion.section
                        className="relative h-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://picsum.photos/1920/1080"
                            alt="旅行封面"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <motion.h1
                                    className="text-5xl md:text-7xl font-bold mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    探索<span className="text-purple-400">世界</span>的脚步
                                </motion.h1>
                                <motion.p
                                    className="text-xl md:text-2xl mb-8 text-gray-200"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    记录每一段旅程，分享每一份感动
                                </motion.p>
                                <motion.div
                                    className="flex justify-center gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <button
                                        onClick={() => setActiveSection('gallery')}
                                        className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors hover:scale-105 transform shadow-lg shadow-purple-500/25"
                                    >
                                        浏览图集
                                    </button>
                                    <button
                                        onClick={() => setActiveSection('plan')}
                                        className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition-colors hover:scale-105 transform"
                                    >
                                        开始规划
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.section>
                );

            case 'about':
                return (
                    <section className="min-h-screen py-20 bg-black">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">关于我</h2>
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        你好！我是一名热爱旅行的摄影师和旅行者。在过去几年里，我走过了20多个国家，
                                        用镜头记录下了世界各地的美好瞬间。我相信旅行不仅是一种探索，更是一种生活态度。
                                    </p>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        每一次旅行都是一次新的发现，每一次按下快门都是对美好瞬间的永恒定格。
                                        通过这个网站，我希望与大家分享我的旅行经历和摄影作品。
                                    </p>
                                    <div className="flex space-x-4 pt-4">
                                        <a href="https://x.com/Jone12suny" target="_blank" rel="noopener noreferrer"
                                           className="text-gray-400 hover:text-purple-400 transition-colors">
                                            <i className="fab fa-twitter text-2xl"></i>
                                        </a>
                                        <a href="https://github.com/linRichie" target="_blank" rel="noopener noreferrer"
                                           className="text-gray-400 hover:text-purple-400 transition-colors">
                                            <i className="fab fa-github text-2xl"></i>
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                                            <i className="fab fa-instagram text-2xl"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="relative">
                                    <img
                                        src="https://picsum.photos/600/400"
                                        alt="个人照片"
                                        className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case 'gallery':
                return (
                    <section className="min-h-screen py-20 bg-black">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">旅拍图集</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {galleryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="group bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="overflow-hidden">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                                            <p className="text-gray-400">{item.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );

            case 'plan':
                return (
                    <section className="min-h-screen py-20 bg-gradient-to-br from-gray-900 to-purple-900/30">
                        <div className="max-w-3xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">旅行规划</h2>
                            <div className="bg-gray-900/80 border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">目的地</label>
                                        <input
                                            type="text"
                                            placeholder="你想去哪里？"
                                            className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">出发日期</label>
                                            <input
                                                type="date"
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 mb-2 font-medium">旅行天数</label>
                                            <input
                                                type="number"
                                                placeholder="天数"
                                                className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">预算范围</label>
                                        <select className="w-full px-4 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                                            <option>经济型 (5000以下)</option>
                                            <option>舒适型 (5000-10000)</option>
                                            <option>豪华型 (10000以上)</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] transform font-medium shadow-lg shadow-purple-500/25"
                                    >
                                        <i className="fas fa-magic mr-2"></i>
                                        生成旅行计划
                                    </button>
                                </form>
                                <p className="text-center text-gray-500 text-sm mt-6">
                                    <i className="fas fa-info-circle mr-1"></i>
                                    AI 智能规划功能即将推出
                                </p>
                            </div>
                        </div>
                    </section>
                );

            case 'stats':
                return (
                    <section className="min-h-screen py-20 bg-black">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">旅行统计</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                {statsData.map((stat) => (
                                    <div
                                        key={stat.id}
                                        className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2`}
                                    >
                                        <i className={`fas ${stat.icon} text-5xl mb-4 opacity-90`}></i>
                                        <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                                        <p className="text-lg opacity-90">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-900/50 border border-white/10 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">旅行足迹地图</h3>
                                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/5 rounded-xl p-8 text-center">
                                    <i className="fas fa-map-marked-alt text-6xl text-purple-400 mb-4"></i>
                                    <p className="text-gray-400">地图功能即将上线，敬请期待...</p>
                                </div>
                            </div>
                        </div>
                    </section>
                );

            case 'blog':
                return (
                    <section className="min-h-screen py-20 bg-black">
                        <div className="max-w-4xl mx-auto px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">旅行博客</h2>
                            <div className="relative">
                                {/* 时间线 */}
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                                <div className="space-y-8">
                                    {blogPosts.map((post, index) => (
                                        <div
                                            key={post.id}
                                            className="relative pl-12"
                                        >
                                            {/* 时间线圆点 */}
                                            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                                index % 3 === 0 ? 'bg-purple-500' : index % 3 === 1 ? 'bg-blue-500' : 'bg-green-500'
                                            }`}>
                                                <i className="fas fa-feather-alt text-white text-sm"></i>
                                            </div>
                                            <div className="bg-gray-900/50 border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                                                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                                                <p className="text-gray-500 mb-3">
                                                    <i className="far fa-calendar-alt mr-1"></i>{post.date}
                                                </p>
                                                <p className="text-gray-400">{post.content}</p>
                                                <button className="mt-4 text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                                    阅读更多 <i className="fas fa-arrow-right ml-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-black font-sans">
            {/* 内部导航栏 - 日记页面的区块切换，与旅游指南保持一致 */}
            <nav className="bg-black/90 backdrop-blur-lg z-40 border-b border-white/10 sticky top-0">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="hidden md:flex space-x-1 bg-white/5 rounded-full p-1 border border-white/10">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center font-medium text-sm ${
                                        activeSection === item.id
                                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <i className={`fas ${item.icon} mr-2`}></i>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        {/* 移动端菜单按钮 */}
                        <button
                            className="md:hidden text-gray-400"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* 移动端菜单 */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed top-16 right-0 bottom-0 w-64 bg-black/95 backdrop-blur-lg border-l border-white/10 z-50 p-4">
                    <div className="space-y-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setMobileMenuOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                    activeSection === item.id
                                        ? 'bg-purple-500 text-white'
                                        : 'text-gray-400 hover:bg-white/5'
                                }`}
                            >
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 主内容区域 */}
            <main>
                {renderActiveSection()}
            </main>

            {/* 页脚 - 与旅游指南保持一致的暗色风格 */}
            <footer className="border-t border-white/10 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4">
                    {/* 返回旅游指南按钮 */}
                    <div className="flex justify-center mb-8">
                        <Link
                            to="/travel"
                            className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25"
                        >
                            <i className="fas fa-map-marked-alt mr-2"></i>
                            返回旅游指南
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-white">联系方式</h3>
                            <p className="text-gray-500">
                                <i className="fas fa-envelope mr-2"></i>email@example.com<br/>
                                <i className="fas fa-phone mr-2"></i>+86 123 4567 8900
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-white">关注我</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                                    <i className="fab fa-weixin text-2xl"></i>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                                    <i className="fab fa-weibo text-2xl"></i>
                                </a>
                                <a href="https://x.com/Jone12suny" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-500 hover:text-purple-400 transition-colors">
                                    <i className="fab fa-twitter text-2xl"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-white">订阅更新</h3>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="输入邮箱地址"
                                    className="px-4 py-2 rounded-l-lg w-full bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500"
                                />
                                <button className="bg-purple-500 px-4 py-2 rounded-r-lg hover:bg-purple-600 transition-colors">
                                    订阅
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-center text-gray-500">
                        <p>&copy; 2025 我的旅行日记. All rights reserved.</p>
                        <p className="mt-2 text-sm">
                            作者: Richie |
                            <a href="https://x.com/Jone12suny" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-purple-400">
                                Twitter
                            </a> |
                            <a href="https://github.com/linRichie" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-purple-400">
                                GitHub
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DiaryHome;
