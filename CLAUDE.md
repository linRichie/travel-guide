# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

基于 React + Vite 的旅游指南应用，包含两大核心模块：

- **旅游指南** (`/travel`)：中国各省份旅游目的地展示
- **旅行日记** (`/diary`)：个人旅行记录、图集、博客和统计

## 开发命令

```bash
npm run dev      # 启动 Vite 开发服务器 (http://localhost:5173)
npm run build    # 生产构建
npm run lint     # ESLint 检查
npm run preview  # 预览生产构建
npm run dev:all  # 同时启动前端和后端服务
```

## 技术栈

- **框架**：React 19 + Vite 6
- **路由**：react-router-dom v7
- **样式**：TailwindCSS (CDN)
- **动画**：framer-motion
- **地图**：高德地图 (@amap/amap-jsapi-loader)
- **图表**：Chart.js、Recharts、ECharts
- **图标**：lucide-react、Font Awesome (CDN)

## 环境变量配置

项目使用环境变量管理敏感配置：

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `VITE_AMAP_KEY` | 高德地图 API Key | 是 |

配置方式：
1. 复制 `.env.example` 为 `.env`
2. 填写你的高德地图 Key
3. 生产环境：在 GitHub仓库 Settings → Secrets 中添加 `VITE_AMAP_KEY`

```bash
cp .env.example .env
```

## 架构要点

### 路由结构

- 路由集中在 `src/App.jsx` 配置
- 两层嵌套布局：`AppLayout` → `TravelLayout/DiaryLayout` → 页面组件
- 路由路径：`/travel/{province}` 和 `/diary/{page}`

### 主题系统

- `ThemeContext` (`src/contexts/ThemeContext.jsx`) 管理暗黑/明亮模式
- 状态存储在 localStorage，默认 `dark`
- 切换时修改 `document.documentElement` 的 class

### 设计规范

- **暗色主题**：全局黑色背景 (`bg-black`)
- **强调色**：
  - 旅游模块：橙色系 (`text-orange-500`)
  - 日记模块：紫色系 (`text-purple-500`)
- **毛玻璃**：`backdrop-blur-lg` + `bg-white/5`
- **圆角**：`rounded-xl`、`rounded-2xl`

## 添加新省份页面

1. 在 `src/app/travel/pages/` 创建组件
2. 在 `src/App.jsx` 导入并添加路由
3. 在 `src/app/travel/TravelLayout.jsx` 的 `provinces` 数组添加导航项

## 省份页面结构

参考 `Chengdu.jsx`：

- 高德地图集成（使用 `src/config/env.js` 中的 `AMAP_KEY`）
- 多条行程路线（可折叠展开）
- 实用贴士

## GitHub Actions 部署

项目配置了 GitHub Pages 自动部署：

- 触发条件：`main` 分支推送或手动触发
- 部署地址：https://linRichie.github.io/travel-guide（或自定义域名 travel.moniter.top）
- 敏感配置：通过仓库 Secrets 管理 `VITE_AMAP_KEY`

### 首次设置步骤

1. 将仓库设为 public
2. Settings → Pages → Source 选择 "GitHub Actions"
3. Settings → Secrets → Actions 添加 `VITE_AMAP_KEY`
4. 推送代码到 main 分支触发部署

## 注意事项

- **图片**：Unsplash、Pexels
- **代码注释**：必须使用中文
- **页脚信息**：Richie, GitHub @linRichie
