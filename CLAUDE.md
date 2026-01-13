# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 React + Vite 的旅游指南应用，包含两大核心模块：

- **旅游指南** (`/travel`)：中国各省份旅游目的地展示（广西、成都、青海、江西、福建、甘肃、陕西、安徽、新疆、西藏等）
- **旅行日记** (`/diary`)：个人旅行记录和图集展示

## 开发命令

```bash
npm run dev      # 启动 Vite 开发服务器
npm run build    # 生产构建（输出到 dist/）
npm run lint     # ESLint 代码检查
npm run preview  # 预览生产构建
```

## 技术栈

- **构建工具**：Vite 6.x + React 19
- **路由**：react-router-dom v7
- **样式**：TailwindCSS (CDN)
- **动画**：framer-motion
- **地图**：高德地图 (@amap/amap-jsapi-loader)
- **图标**：lucide-react、Font Awesome

## 项目架构

### 目录结构

```tree
src/
├── App.jsx                    # 主路由配置
├── main.jsx                   # 应用入口
├── styles/
│   └── index.css              # 全局样式（Tailwind + 自定义）
├── app/
│   ├── AppLayout.jsx          # 顶层布局（模块切换导航）
│   ├── travel/                # 旅游指南模块
│   │   ├── TravelLayout.jsx   # 省份导航布局
│   │   └── pages/
│   │       ├── TravelHomePage.jsx   # 探索中国首页
│   │       ├── Chengdu.jsx          # 成都详情页
│   │       ├── Guangxi.jsx          # 广西详情页
│   │       └── ...                  # 其他省份页面
│   └── diary/                 # 旅行日记模块
│       ├── DiaryLayout.jsx    # 日记布局
│       └── pages/
│           └── DiaryHome.jsx  # 日记首页（含图集、博客、统计等）
```

### 路由结构

- `/` → 重定向到 `/travel`
- `/travel` → 探索中国首页（目的地网格）
- `/travel/{province}` → 各省份详情页（如 `/travel/chengdu`）
- `/diary` → 旅行日记首页

### 设计风格

- **暗色主题**：全局黑色背景 (`bg-black`)
- **强调色**：
  - 旅游模块：橙色系 (`text-orange-500`, `bg-orange-500`)
  - 日记模块：紫色系 (`text-purple-400`, `bg-purple-500`)
- **毛玻璃效果**：`backdrop-blur-lg` + `bg-white/5`
- **圆角设计**：大量使用 `rounded-xl`、`rounded-2xl`

## 添加新省份页面

1. 在 `src/app/travel/pages/` 创建新组件（如 `Yunnan.jsx`）
2. 在 `src/App.jsx` 中导入并添加路由：

   ```jsx
   import YunnanTravel from './app/travel/pages/Yunnan';
   // ...
   <Route path="yunnan" element={<YunnanTravel />} />
   ```

3. 在 `src/app/travel/TravelLayout.jsx` 的 `provinces` 数组中添加导航项

## 省份页面组件结构

参考 `Chengdu.jsx`，典型结构包含：

- 多条行程路线（历史人文、美食等）
- 高德地图集成（使用 `@amap/amap-jsapi-loader`）
- 行程卡片（可折叠展开）
- 实用贴士和个性化建议

## 注意事项

- **高德地图 Key**：`d17c17f8f712c81a7e4241aff4faa7b0`（已内置）
- **图片资源**：使用 Unsplash、Pexels 或 PicSum
- **Font Awesome**：通过 CDN 引入，使用 `fas/fa-*` 类名
- **响应式**：使用 Tailwind 的 `md:`、`lg:` 断点
- **代码注释**：所有注释必须使用中文编写（技术专有名词除外）

## 开发提示

- 省份导航在 `TravelLayout.jsx` 中配置
- 页脚作者信息统一为：Richie, Twitter @Jone12suny, GitHub @linRichie
- 新增页面应保持与现有页面一致的暗色风格和组件结构
