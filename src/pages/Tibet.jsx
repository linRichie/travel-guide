import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

// 注册Chart.js组件
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

/**
 * 西藏318自驾游15天攻略组件
 * 基于原 西藏15 天行程-Genspark-Create.html 转换而来
 */
const TibetTravel = () => {
    // 温度图表数据
    const temperatureData = {
        labels: ['拉萨', '林芝', '波密', '八宿', '理塘', '康定', '成都'],
        datasets: [
            {
                label: '白天温度 (°C)',
                data: [22, 20, 18, 15, 12, 18, 24],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: true,
                tension: 0.4,
            },
            {
                label: '夜间温度 (°C)',
                data: [8, 6, 4, 2, -2, 5, 15],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const temperatureOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: '九月份沿线城市温度对比',
                font: { size: 16 }
            },
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '温度 (°C)'
                }
            }
        }
    };

    // 预算图表数据
    const budgetData = {
        labels: ['油费', '住宿费', '餐饮费', '门票费', '过路费', '其他费用'],
        datasets: [{
            data: [4000, 2700, 1500, 800, 500, 1500],
            backgroundColor: [
                '#3b82f6',
                '#10b981',
                '#8b5cf6',
                '#f59e0b',
                '#ef4444',
                '#6b7280'
            ],
            borderWidth: 0
        }]
    };

    const budgetOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: '总预算：11,000元/人',
                font: { size: 16 }
            },
            legend: {
                position: 'bottom'
            }
        }
    };

    // 行程数据
    const itineraryDays = [
        {
            day: 'D1',
            title: '抵达成都',
            subtitle: '',
            accom: '成都市区',
            temp: '18-25°C',
            altitude: '',
            spots: ['熊猫基地', '锦里古街'],
            food: ['火锅', '串串香'],
            tips: '建议早上参观熊猫基地，下午游览市区，适应后天进藏的节奏',
            tipType: 'info'
        },
        {
            day: 'D2',
            title: '成都 → 康定',
            subtitle: '300公里，3小时',
            accom: '康定（海拔2560米）',
            temp: '12-20°C',
            altitude: '',
            spots: ['木格措风景区'],
            tips: '开始适应高原，注意多喝水，避免剧烈运动',
            tipType: 'info'
        },
        {
            day: 'D3',
            title: '康定 → 新都桥 → 雅江',
            subtitle: '220公里，4小时',
            accom: '雅江（海拔2530米）',
            temp: '8-18°C',
            altitude: '折多山（4962米）',
            spots: ['新都桥"摄影天堂"'],
            tips: '翻越折多山，注意高反，准备氧气瓶',
            tipType: 'warning'
        },
        {
            day: 'D4-6',
            title: '雅江 → 理塘 → 稻城亚丁 → 巴塘',
            subtitle: '',
            subDays: [
                { title: '第4天：雅江→理塘', desc: '海拔4014米，世界高城，住宿：理塘县' },
                { title: '第5天：理塘→稻城', desc: '稻城亚丁三神山，住宿：稻城县' },
                { title: '第6天：稻城→巴塘', desc: '进入西藏界，住宿：巴塘县' }
            ]
        },
        {
            day: 'D7-10',
            title: '巴塘 → 芒康 → 左贡 → 邦达 → 八宿',
            subtitle: '',
            subDays: [
                { title: '第7天：巴塘→芒康', desc: '正式进入西藏，检查边防证' },
                { title: '第8天：芒康→左贡', desc: '澜沧江大峡谷' },
                { title: '第9天：左贡→邦达', desc: '邦达机场，海拔4300米' },
                { title: '第10天：邦达→八宿', desc: '怒江72道拐，然乌湖' }
            ]
        },
        {
            day: 'D11-13',
            title: '八宿 → 波密 → 林芝',
            subtitle: '',
            subDays: [
                { title: '第11天：八宿→波密', desc: '米堆冰川（中国最美冰川），住宿：波密县' },
                { title: '第12天：波密→鲁朗', desc: '鲁朗林海，石锅鸡，住宿：鲁朗镇' },
                { title: '第13天：鲁朗→林芝', desc: '南迦巴瓦峰，巴松错，住宿：林芝市' }
            ]
        },
        {
            day: 'D14-15',
            title: '林芝 → 拉萨 → 返程',
            subtitle: '',
            subDays: [
                { title: '第14天：林芝→拉萨', desc: '经米拉山口到达圣城拉萨，参观布达拉宫（需预约），住宿：拉萨市' },
                { title: '第15天：拉萨→返程', desc: '大昭寺、八廓街购物，羊卓雍错一日游（可选），飞机或火车返回' }
            ]
        }
    ];

    // 必备物品清单
    const essentials = {
        documents: {
            icon: 'fa-id-card',
            color: 'blue',
            title: '证件类',
            items: ['身份证（必须）', '驾驶证（必须）', '行驶证（必须）', '边防证（部分景区）', '银行卡', '现金3000-5000元']
        },
        medicine: {
            icon: 'fa-pills',
            color: 'red',
            title: '药品类',
            items: ['红景天（提前7天服用）', '高原安胶囊', '布洛芬（头痛药）', '感冒药', '肠胃药', '葡萄糖口服液', '氧气瓶 5-10罐']
        },
        electronics: {
            icon: 'fa-mobile-alt',
            color: 'purple',
            title: '电子设备',
            items: ['手机 + 充电器', '车载充电器', '移动电源', '相机 + 备用电池', '行车记录仪', '手电筒']
        },
        vehicle: {
            icon: 'fa-car',
            color: 'green',
            title: '车辆用品',
            items: ['备胎（检查气压）', '工具箱', '拖车绳', '搭火线', '机油（1桶）', '防冻玻璃水']
        },
        daily: {
            icon: 'fa-soap',
            color: 'orange',
            title: '生活用品',
            items: ['洗漱用品', '护肤品（保湿）', '防晒霜SPF50+', '唇膏', '湿巾', '保温水杯']
        },
        food: {
            icon: 'fa-apple-alt',
            color: 'yellow',
            title: '食品类',
            items: ['方便面 5-8包', '面包', '八宝粥', '压缩饼干', '巧克力', '牛肉干']
        }
    };

    // 穿搭建议
    const clothingTips = [
        {
            layer: '内层（贴身层）',
            color: 'blue',
            items: '速干内衣、美丽诺羊毛内衣',
            function: '功能：吸湿排汗，保持身体干燥'
        },
        {
            layer: '中层（保暖层）',
            color: 'green',
            items: '抓绒衣、薄羽绒服、毛衣',
            function: '功能：保温锁热，调节体温'
        },
        {
            layer: '外层（防护层）',
            color: 'purple',
            items: '冲锋衣、防风外套',
            function: '功能：防风防雨，抵御恶劣天气'
        }
    ];

    // 获取颜色类名
    const getColorClasses = (color) => {
        const colors = {
            blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', subtext: 'text-blue-700', gradient: 'from-blue-50 to-blue-100' },
            red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', subtext: 'text-red-700', gradient: 'from-red-50 to-red-100' },
            purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', subtext: 'text-purple-700', gradient: 'from-purple-50 to-purple-100' },
            green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', subtext: 'text-green-700', gradient: 'from-green-50 to-green-100' },
            orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', subtext: 'text-orange-700', gradient: 'from-orange-50 to-orange-100' },
            yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', subtext: 'text-yellow-700', gradient: 'from-yellow-50 to-yellow-100' },
        };
        return colors[color] || colors.blue;
    };

    // 获取提示框样式
    const getTipBoxClass = (tipType) => {
        switch (tipType) {
            case 'warning':
                return 'bg-red-50 border-red-400 text-red-700';
            case 'info':
                return 'bg-blue-50 border-blue-400 text-blue-700';
            default:
                return 'bg-yellow-50 border-yellow-400 text-yellow-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <i className="fas fa-mountain text-yellow-300 mr-4"></i>
                        西藏318自驾游15天攻略手册
                    </h1>
                    <p className="text-xl mb-6">九月份出行专用 · 成都到拉萨完整指南</p>
                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-lg">
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                            <i className="fas fa-route mr-2"></i>
                            <span>总里程：2142公里</span>
                        </div>
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                            <i className="fas fa-calendar-alt mr-2"></i>
                            <span>最佳时间：9月</span>
                        </div>
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                            <i className="fas fa-thermometer-half mr-2"></i>
                            <span>温度：10-22°C</span>
                        </div>
                        <div className="flex items-center bg-white/10 px-4 py-2 rounded-lg">
                            <i className="fas fa-wallet mr-2"></i>
                            <span>预算：1-1.5万</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* 行程概览 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-map-marked-alt text-purple-600 mr-3"></i>
                        行程概览
                    </h2>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <i className="fas fa-flag-checkered text-blue-600 text-3xl mb-2"></i>
                                <h3 className="font-semibold text-gray-800">起点</h3>
                                <p className="text-gray-600">成都（海拔500米）</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <i className="fas fa-mountain text-green-600 text-3xl mb-2"></i>
                                <h3 className="font-semibold text-gray-800">最高海拔</h3>
                                <p className="text-gray-600">折多山（4962米）</p>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <i className="fas fa-flag text-red-600 text-3xl mb-2"></i>
                                <h3 className="font-semibold text-gray-800">终点</h3>
                                <p className="text-gray-600">拉萨（3658米）</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 详细行程安排 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-calendar-check text-purple-600 mr-3"></i>
                        详细行程安排
                    </h2>

                    <div className="space-y-6">
                        {itineraryDays.map((day, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-start space-x-4">
                                    <div className={`rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0 ${
                                        day.day === 'D1' ? 'bg-purple-600' :
                                        day.day === 'D2' || day.day === 'D3' ? 'bg-purple-600' :
                                        day.day === 'D4-6' ? 'bg-green-600' :
                                        day.day === 'D7-10' ? 'bg-blue-600' :
                                        day.day === 'D11-13' ? 'bg-teal-600' :
                                        'bg-red-600'
                                    } text-white`}>
                                        {day.day}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {day.title}
                                            {day.subtitle && <span className="text-gray-500 font-normal ml-2">· {day.subtitle}</span>}
                                        </h3>

                                        {day.subDays ? (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {day.subDays.map((subDay, idx) => (
                                                    <div key={idx} className="p-3 bg-gray-50 rounded">
                                                        <h4 className="font-semibold text-gray-800">{subDay.title}</h4>
                                                        <p className="text-sm text-gray-600">{subDay.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    {day.accom && (
                                                        <p className="text-gray-600 mb-2">
                                                            <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                                                            住宿：{day.accom}
                                                        </p>
                                                    )}
                                                    {day.temp && (
                                                        <p className="text-gray-600 mb-2">
                                                            <i className="fas fa-thermometer-half text-blue-500 mr-2"></i>
                                                            温度：{day.temp}
                                                        </p>
                                                    )}
                                                    {day.altitude && (
                                                        <p className="text-gray-600 mb-2">
                                                            <i className="fas fa-mountain text-purple-500 mr-2"></i>
                                                            最高点：{day.altitude}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    {day.spots && (
                                                        <p className="text-gray-600 mb-2">
                                                            <i className="fas fa-camera text-green-500 mr-2"></i>
                                                            景点：{day.spots.join('、')}
                                                        </p>
                                                    )}
                                                    {day.food && (
                                                        <p className="text-gray-600">
                                                            <i className="fas fa-utensils text-orange-500 mr-2"></i>
                                                            美食：{day.food.join('、')}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {day.tips && (
                                            <div className={`mt-3 p-3 rounded border-l-4 ${getTipBoxClass(day.tipType)}`}>
                                                <p className="text-sm">
                                                    <i className={`fas ${day.tipType === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'} mr-2`}></i>
                                                    {day.tips}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 天气与穿搭指南 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-cloud-sun text-purple-600 mr-3"></i>
                        九月份天气与穿搭指南
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 天气图表 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                <i className="fas fa-thermometer-half text-blue-500 mr-2"></i>
                                九月份天气概况
                            </h3>
                            <div className="h-80 mb-4">
                                <Line data={temperatureData} options={temperatureOptions} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-3 bg-blue-50 rounded">
                                    <i className="fas fa-sun text-yellow-500 text-2xl mb-2"></i>
                                    <p className="font-semibold">白天温度</p>
                                    <p className="text-blue-600">18-24°C</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded">
                                    <i className="fas fa-moon text-purple-500 text-2xl mb-2"></i>
                                    <p className="font-semibold">夜间温度</p>
                                    <p className="text-purple-600">0-8°C</p>
                                </div>
                            </div>
                        </div>

                        {/* 穿搭建议 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                <i className="fas fa-tshirt text-green-500 mr-2"></i>
                                分层穿搭建议
                            </h3>
                            <div className="space-y-4">
                                {clothingTips.map((item, idx) => {
                                    const classes = getColorClasses(item.color);
                                    return (
                                        <div key={idx} className={`p-4 bg-gradient-to-r ${classes.gradient} rounded-lg`}>
                                            <h4 className={`font-semibold ${classes.text} mb-2`}>{item.layer}</h4>
                                            <p className={`text-sm ${classes.subtext}`}>{item.items}</p>
                                            <p className={`text-xs ${classes.subtext} opacity-75`}>{item.function}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 预算分析 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-calculator text-purple-600 mr-3"></i>
                        预算分析
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 预算饼图 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">预算分布（人均）</h3>
                            <div className="h-80">
                                <Pie data={budgetData} options={budgetOptions} />
                            </div>
                        </div>

                        {/* 详细预算 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">详细费用明细</h3>
                            <div className="space-y-3">
                                {[
                                    { name: '油费', icon: 'fa-gas-pump', color: 'blue', amount: 4000 },
                                    { name: '住宿费', icon: 'fa-bed', color: 'green', amount: 2700 },
                                    { name: '餐饮费', icon: 'fa-utensils', color: 'purple', amount: 1500 },
                                    { name: '门票费', icon: 'fa-ticket-alt', color: 'orange', amount: 800 },
                                    { name: '过路费', icon: 'fa-road', color: 'red', amount: 500 },
                                    { name: '其他费用', icon: 'fa-shopping-bag', color: 'gray', amount: 1500 },
                                ].map((item) => {
                                    const colorClasses = {
                                        blue: 'bg-blue-50 text-blue-600',
                                        green: 'bg-green-50 text-green-600',
                                        purple: 'bg-purple-50 text-purple-600',
                                        orange: 'bg-orange-50 text-orange-600',
                                        red: 'bg-red-50 text-red-600',
                                        gray: 'bg-gray-50 text-gray-600',
                                    };
                                    return (
                                        <div key={item.name} className={`flex justify-between items-center p-3 ${colorClasses[item.color]} rounded`}>
                                            <div className="flex items-center">
                                                <i className={`fas ${item.icon} mr-2`}></i>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            <span className="font-bold">{item.amount.toLocaleString()}元</span>
                                        </div>
                                    );
                                })}
                                <div className="border-t-2 border-gray-200 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">总计</span>
                                        <span className="text-2xl font-bold text-purple-600">11,000元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 必备物品清单 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-suitcase text-purple-600 mr-3"></i>
                        必备物品清单
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(essentials).map(([key, category]) => {
                            const classes = getColorClasses(category.color);
                            return (
                                <div key={key} className="bg-white rounded-lg shadow-lg p-6">
                                    <h3 className={`text-lg font-semibold ${classes.text} mb-4 flex items-center`}>
                                        <i className={`fas ${category.icon} mr-2`}></i>
                                        {category.title}
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {category.items.map((item, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 重要旅行提示 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-lightbulb text-purple-600 mr-3"></i>
                        重要旅行提示
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 高原反应防护 */}
                        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                                <i className="fas fa-heart text-red-500 mr-2"></i>
                                高原反应防护
                            </h3>
                            <ul className="space-y-2 text-sm text-red-700">
                                <li>• 提前7-15天服用红景天胶囊</li>
                                <li>• 初入高原前两天避免洗澡洗头</li>
                                <li>• 多喝水，每天至少2-3升</li>
                                <li>• 避免剧烈运动和情绪激动</li>
                                <li>• 出现严重高反立即就医</li>
                                <li>• 随身携带氧气瓶备用</li>
                            </ul>
                        </div>

                        {/* 驾驶安全 */}
                        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                                <i className="fas fa-car text-blue-500 mr-2"></i>
                                驾驶安全
                            </h3>
                            <ul className="space-y-2 text-sm text-blue-700">
                                <li>• 严格控制车速，注意限速标志</li>
                                <li>• 避免夜间行车，天黑前到达目的地</li>
                                <li>• 遇到塌方等险情不要强行通过</li>
                                <li>• 保持车距，弯道减速鸣笛</li>
                                <li>• 及时加油，不要等油箱见底</li>
                                <li>• 随时关注天气变化</li>
                            </ul>
                        </div>

                        {/* 文化礼仪 */}
                        <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                                <i className="fas fa-hands-helping text-green-500 mr-2"></i>
                                文化礼仪
                            </h3>
                            <ul className="space-y-2 text-sm text-green-700">
                                <li>• 尊重当地宗教信仰和风俗习惯</li>
                                <li>• 参观寺庙时脱帽，不要大声喧哗</li>
                                <li>• 不要随意拍摄藏民，征得同意后再拍</li>
                                <li>• 看到转经的藏民要让路</li>
                                <li>• 不要触摸和指向佛像</li>
                                <li>• 学会简单的藏语问候</li>
                            </ul>
                        </div>

                        {/* 应急处理 */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                                <i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
                                应急处理
                            </h3>
                            <ul className="space-y-2 text-sm text-yellow-700">
                                <li>• 保存重要电话：110、120、119</li>
                                <li>• 车辆故障联系保险公司救援</li>
                                <li>• 迷路时不要慌张，原地等待或求助</li>
                                <li>• 高反严重时立即吸氧并前往医院</li>
                                <li>• 遇到极端天气找安全地方避险</li>
                                <li>• 保持手机有电，定期报平安</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 应急联系方式 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-phone text-purple-600 mr-3"></i>
                        应急联系方式
                    </h2>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                                <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                                    <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                                    紧急求助
                                </h3>
                                <ul className="space-y-1 text-sm">
                                    <li className="flex justify-between"><span>报警电话：</span><strong>110</strong></li>
                                    <li className="flex justify-between"><span>医疗急救：</span><strong>120</strong></li>
                                    <li className="flex justify-between"><span>火警电话：</span><strong>119</strong></li>
                                    <li className="flex justify-between"><span>交通事故：</span><strong>122</strong></li>
                                </ul>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                                    <i className="fas fa-hospital text-blue-500 mr-2"></i>
                                    重要医院
                                </h3>
                                <ul className="space-y-1 text-sm">
                                    <li className="flex justify-between"><span>康定医院：</span><strong>0836-2822287</strong></li>
                                    <li className="flex justify-between"><span>理塘医院：</span><strong>0836-5321120</strong></li>
                                    <li className="flex justify-between"><span>林芝医院：</span><strong>0894-5822200</strong></li>
                                    <li className="flex justify-between"><span>拉萨医院：</span><strong>0891-6371462</strong></li>
                                </ul>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                                    <i className="fas fa-tools text-green-500 mr-2"></i>
                                    道路救援
                                </h3>
                                <ul className="space-y-1 text-sm">
                                    <li className="flex justify-between"><span>中国人保：</span><strong>95518</strong></li>
                                    <li className="flex justify-between"><span>平安保险：</span><strong>95511</strong></li>
                                    <li className="flex justify-between"><span>太平洋保险：</span><strong>95500</strong></li>
                                    <li className="flex justify-between"><span>中国人寿：</span><strong>95519</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 结语 */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">祝您旅途愉快！</h2>
                        <p className="text-lg mb-4">318川藏线被誉为"中国最美景观大道"</p>
                        <p className="text-base opacity-90">愿您在这条神奇的道路上，收获最美的风景和最难忘的回忆</p>
                        <div className="mt-6 flex justify-center items-center space-x-4">
                            <i className="fas fa-mountain text-yellow-300 text-2xl"></i>
                            <span className="text-lg">一路平安 · 扎西德勒</span>
                            <i className="fas fa-mountain text-yellow-300 text-2xl"></i>
                        </div>
                    </div>
                </section>
            </div>

            {/* 页脚 */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-400 mb-4">
                        <Link to="/" className="hover:text-white transition-colors">
                            <i className="fas fa-arrow-left mr-2"></i>返回首页
                        </Link>
                    </p>
                    <div className="flex justify-center space-x-4 mb-4">
                        <a href="https://x.com/Jone12suny" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://github.com/linRichie" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                    <p className="text-gray-500 text-sm">© 2025 Richie. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default TibetTravel;
