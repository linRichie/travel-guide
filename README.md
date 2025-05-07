# React + Vite 成都旅游指南项目

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 项目概述

这是一个基于React和Vite构建的成都旅游指南项目，采用现代化前端技术栈。

## 技术栈

- 前端框架：React 19
- 构建工具：Vite
- 路由：React Router DOM
- 动画库：Framer Motion
- UI组件：Lucide React
- 地图集成：高德地图(@amap/amap-jsapi-loader)和Google Maps(@react-google-maps/api)
- 图表：Recharts

## 项目结构

```
travel-guide/
├── public/            # 静态资源
├── src/
│   ├── components/    # 组件目录
│   ├── assets/        # 图片资源
│   ├── App.jsx        # 主应用组件
│   ├── main.jsx       # 入口文件
│   └── index.css      # 全局样式
├── vite.config.js     # Vite配置
└── package.json       # 项目依赖
```

## 核心功能

- 首页展示热门旅游目的地
- 响应式设计，适配移动端
- 平滑滚动和动画效果
- 暗色主题UI设计

## 开发说明

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 待改进点

- 建议将Tailwind CDN改为本地安装
- 建议将外链图片放入public目录
- 可考虑添加更多省份的详细页面

