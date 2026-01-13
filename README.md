# 旅游指南项目

## 项目概述

这是一个基于 React 和 Vite 构建的旅游指南项目，提供全国多个省份和城市的旅游信息展示，以及详细的旅行计划参考。

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 6
- **路由管理**: React Router DOM
- **动画库**: Framer Motion
- **图标库**: Lucide React
- **地图集成**: 高德地图 (@amap/amap-jsapi-loader) 和 Google Maps (@react-google-maps/api)
- **图表库**: Recharts、Chart.js + react-chartjs-2

## 项目结构

```
travel-guide/
├── public/
│   └── plans/              # 旅行计划 Markdown 文件
│       ├── dalian_may2025.md           # 大连 4 日游计划
│       └── 三地热门景点信息-48ff71c091.md  # 甘肃/陕西/安徽景点信息
├── src/
│   ├── components/         # 可复用组件
│   │   └── HomePage.jsx    # 首页组件
│   ├── assets/             # 静态资源
│   ├── *.jsx               # 各省份旅游组件
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # 应用入口
│   └── index.css           # 全局样式
├── vite.config.js          # Vite 配置
└── package.json            # 项目依赖
```

## 已覆盖地区

| 地区 | 组件文件 | 路由 |
|------|----------|------|
| 四川 | `sichuan-3786ef4bc9.jsx` | `/sichuan` |
| 成都 | `chengdu-2025.jsx`, `chengdu-8f35e580a2.jsx` | `/chengdu` |
| 广西 | `guangxi-6eaa24a187.jsx` | `/guangxi` |
| 安徽 | `anhui-2eab75bf4f.jsx` | `/anhui` |
| 福建 | `fujian-333bd5840b.jsx` | `/fujian` |
| 甘肃 | `gansu-5d9e8995f6.jsx` | `/gansu` |
| 江西 | `jiangxi-1d0784d258.jsx` | `/jiangxi` |
| 陕西 | `shanxi-4b17b6a527.jsx` | `/shaanxi` |
| 青海 | `qinghai-79f5365273.jsx` | `/qinghai` |
| 新疆 | `xinjiang-b3e284c7de.jsx` | `/xinjiang` |
| **西藏** | `TibetTravel.jsx` | `/tibet` |
| **旅行日记** | `PersonalTravelDiary.jsx` | `/diary` |

### 新增组件说明

#### 西藏318自驾游 (`TibetTravel.jsx`)
- 成都出发，15天完整行程攻略
- 九月份出行专用指南
- 包含：详细行程安排、天气与穿搭指南、预算分析、必备物品清单、旅行提示
- 使用 Chart.js 绘制温度和预算图表

#### 个人旅行日记 (`PersonalTravelDiary.jsx`)
- 个人旅行网站展示
- 包含：首页、关于我、旅拍图集、旅行规划、旅行统计、旅行博客
- 多区块切换，响应式设计

## 旅行计划

位于 `public/plans/` 目录，包含详细的旅行行程规划：

- **大连 4 日悠游计划** (`dalian_may2025.md`)
  - 深圳出发，高铁 + 自驾
  - i 人专属行程，避开人潮
  - 五一假期定制 (2025.05.01 - 2025.05.04)

- **三地热门景点信息** (`三地热门景点信息-48ff71c091.md`)
  - 甘肃：兰州及周边 23 个景点
  - 陕西：西安及周边 18 个景点
  - 安徽：黄山及周边 18 个景点

## 核心功能

- 首页展示热门旅游目的地
- 响应式设计，适配移动端和桌面端
- 平滑滚动和动画效果
- 暗色主题 UI 设计
- 地图集成，展示旅行路线

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 历史记录

### 2025-05-13
- 合并 `archive/travel/` 目录内容
- 新增 `TibetTravel.jsx` - 西藏318自驾游15天攻略组件
- 新增 `PersonalTravelDiary.jsx` - 个人旅行日记组件
- 安装 Chart.js 和 react-chartjs-2 依赖
- 更新 App.jsx 添加路由和导航

### 2025-05-08
- 合并 `travel_plans/` 目录内容
- 新增 `public/plans/` 目录存放旅行计划 Markdown 文件
- 更新项目文档，添加已覆盖地区和旅行计划说明
