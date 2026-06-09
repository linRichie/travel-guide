# 旅游指南应用 (Travel Guide App)

一个基于 React + Vite 构建的现代化旅游指南应用，包含全国各省份旅游目的地展示和个人旅行日记功能。

## 🌟 项目特色

- **双模块设计**：旅游指南 + 旅行日记，满足不同需求场景
- **丰富目的地**：覆盖全国 12 个热门省份和城市
- **可视化展示**：集成高德地图、Chart.js、ECharts 等图表库
- **暗色主题**：统一的黑色背景 UI 设计，视觉效果优雅
- **响应式布局**：完美适配移动端、平板和桌面设备

## 🛠 技术栈

### 前端框架

- **React 19** - 核心框架
- **Vite 6** - 构建工具，极速热更新
- **React Router DOM v7** - 路由管理

### UI 与动画

- **TailwindCSS** - 样式框架
- **Framer Motion** - 流畅动画效果
- **Lucide React** - 现代化图标库

### 数据可视化

- **Chart.js + react-chartjs-2** - 旅行统计图表
- **ECharts + echarts-for-react** - 复杂数据可视化
- **Recharts** - 轻量级图表组件

### 地图集成

- **高德地图** (@amap/amap-jsapi-loader) - 国内旅行路线展示
- **Google Maps** (@react-google-maps/api) - 国际旅行参考

### 状态管理与后端

- **React Context API** - 主题状态管理
- **SQLite** (better-sqlite3 + sql.js) - 数据存储
- **Express** - 后端服务支持

## 📂 项目架构

```
src/
├── App.jsx                    # 主路由配置
├── main.jsx                   # 应用入口
├── styles/
│   └── index.css              # 全局样式文件
├── components/                # 公共组件
│   └── ThemeToggle.jsx        # 主题切换组件
├── app/
│   ├── AppLayout.jsx          # 顶层布局（模块切换导航）
│   ├── travel/                # 旅游指南模块
│   │   ├── TravelLayout.jsx   # 省份导航布局
│   │   └── pages/             # 各省份详情页
│   │       ├── TravelHomePage.jsx   # 探索中国首页
│   │       ├── Chengdu.jsx         # 成都详情页
│   │       ├── Guangxi.jsx         # 广西详情页
│   │       ├── Qinghai.jsx         # 青海详情页
│   │       ├── Jiangxi.jsx         # 江西详情页
│   │       ├── Fujian.jsx          # 福建详情页
│   │       ├── Shaanxi.jsx         # 陕西详情页
│   │       ├── Anhui.jsx           # 安徽详情页
│   │       ├── Xinjiang.jsx        # 新疆详情页
│   │       ├── Tibet.jsx           # 西藏详情页
│   │       ├── Sichuan.jsx         # 四川详情页
│   │       └── Gansu.jsx           # 甘肃详情页
│   └── diary/                 # 旅行日记模块
│       ├── DiaryLayout.jsx    # 日记布局
│       ├── pages/             # 日记页面
│       │   ├── DiaryHome.jsx  # 日记首页
│       │   ├── Gallery.jsx    # 旅拍图集
│       │   ├── BlogList.jsx   # 博客列表
│       │   ├── BlogPost.jsx   # 博客详情
│       │   ├── About.jsx       # 关于我
│       │   ├── Planner.jsx    # 旅行规划
│       │   ├── PhotoManager.jsx # 照片管理
│       │   └── SearchResults.jsx # 搜索结果
│       └── components/        # 日记组件
│           ├── AMapFootprint.jsx     # 高德足迹
│           ├── PlanCard.jsx          # 行程卡片
│           ├── PlanCharts.jsx        # 行程图表
│           ├── BudgetPieChart.jsx    # 预算饼图
│           ├── DestinationBarChart.jsx # 目的地图表
│           ├── DaysBarChart.jsx      # 天数统计
│           ├── MonthBarChart.jsx     # 月度趋势
│           ├── PhotoTrendChart.jsx   # 照片趋势
│           ├── TagCloud.jsx          # 标签云
│           ├── RelatedPosts.jsx      # 相关文章
│           ├── BlogTOC.jsx           # 目录导航
│           ├── PhotoLightbox.jsx     # 照灯箱
│           ├── PhotoUpload.jsx       # 照片上传
│           └── GlobalSearch.jsx     # 全局搜索
├── contexts/                  # React Context
│   └── ThemeContext.jsx       # 主题上下文
└── public/
    └── plans/                # 旅行计划文档
        ├── dalian_may2025.md
        └── 三地热门景点信息-48ff71c091.md
```

## 🗺️ 已覆盖地区

### 旅游指南模块

| 地区 | 路由 | 特色功能 |
|------|------|----------|
| **探索中国** | `/travel` | 热门目的地网格展示 |
| **四川** | `/travel/sichuan` | 川菜文化与自然风光 |
| **成都** | `/travel/chengdu` | 美食之都，文化名城 |
| **广西** | `/travel/guangxi` | 山水甲天下，桂林山水 |
| **青海** | `/travel/qinghai` | 青海湖，藏族文化 |
| **江西** | `/travel/jiangxi` | 庐山，景德镇陶瓷 |
| **福建** | `/travel/fujian` | 武夷山，闽南文化 |
| **陕西** | `/travel/shaanxi` | 兵马俑，古都长安 |
| **安徽** | `/travel/anhui` | 黄山，徽派建筑 |
| **新疆** | `/travel/xinjiang` | 丝路明珠，西域风情 |
| **西藏** | `/travel/tibet` | 318国道，藏传佛教 |
| **甘肃** | `/travel/gansu` | 丝路古道，敦煌莫高窟 |

### 旅行日记模块

- **首页** (`/diary`) - 统计概览和快速入口
- **旅拍图集** (`/diary/gallery`) - 个人照片收藏
- **旅行博客** (`/diary/blog`) - 旅行心得分享
- **旅行规划** (`/diary/planner`) - 行程计划管理
- **照片管理** (`/diary/photos`) - 图片库管理
- **搜索功能** (`/diary/search`) - 全局内容检索

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 环境变量配置

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，填入你的高德地图 API Key
```

> 高德地图 Key 申请地址：https://console.amap.com/dev/key/app

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 <http://localhost:5173> 查看应用

### 启动完整版（含后端）

```bash
npm run dev:all
```

这将同时启动前端和后端服务

### 生产构建

```bash
npm run build
npm run preview
```

## 🎨 功能特性

### 旅游指南模块

- **目的地详情**：每个省份包含多条精选路线
- **地图集成**：高德地图展示旅行路线
- **行程卡片**：可折叠展开的详细行程
- **实用贴士**：旅行建议和注意事项
- **响应式设计**：适配各种设备屏幕

### 旅行日记模块

- **数据可视化**：
  - 月度旅行趋势图
  - 目的地分布统计
  - 预算占比分析
  - 照片数量统计
- **照片管理**：
  - 图片灯箱查看
  - 批量上传功能
  - 标签分类管理
- **博客系统**：
  - Markdown 支持
  - 目录导航
  - 相关文章推荐
  - 标签云展示

### 通用功能

- **主题切换**：支持深色/浅色模式
- **全局搜索**：快速查找目的地和文章
- **响应式导航**：移动端友好的菜单
- **平滑动画**：Framer Motion 驱动

## 🏗️ 开发指南

### 添加新省份页面

1. 在 `src/app/travel/pages/` 创建新组件（如 `Yunnan.jsx`）
2. 在 `src/App.jsx` 中添加路由：

```jsx
import YunnanTravel from './app/travel/pages/Yunnan';
// ...
<Route path="yunnan" element={<YunnanTravel />} />
```

3. 在 `src/app/travel/TravelLayout.jsx` 的导航中添加链接

### 添加新图表组件

1. 在 `src/app/diary/components/` 创建组件
2. 使用 Chart.js 或 ECharts 实现
3. 在 `TravelCenter.jsx` 中调用

### 添加博客文章

1. 在 `/diary/pages/BlogList.jsx` 中添加文章链接
2. 创建对应的 `BlogPost.jsx` 组件
3. 更新相关推荐逻辑

## 🎯 设计系统

### 颜色方案

- **主色调（旅游）**：橙色系 (#f97316, #ea580c)
- **辅助色（日记）**：紫色系 (#a855f7, #9333ea)
- **背景色**：黑色 (#000000)
- **文字色**：白色 (#ffffff)

### UI 组件

- **毛玻璃效果**：`backdrop-blur-lg + bg-white/5`
- **圆角设计**：大量使用 `rounded-xl`、`rounded-2xl`
- **间距系统**：基于 Tailwind 的间距类
- **阴影系统**：`shadow-lg`、`shadow-xl`

## 📄 开发说明

### 代码规范

- 所有注释必须使用中文编写（技术专有名词除外）
- 遵循 React Hooks 规范
- 使用函数组件和 TypeScript 风格类型

### Git 提交规范

使用 Conventional Commits 格式：

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式化
refactor: 重构
test: 测试
chore: 构建工具或依赖管理
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目！

### 贡献方式

1. Fork 项目
2. 创建功能分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

### 开发准则

- 保持代码简洁（KISS 原则）
- 添加必要的注释
- 确保响应式设计
- 编写可维护的代码

## 📝 更新日志

### 最近更新

- **2026-06-09**：
  - 优化项目配置，移除 Twitter 信息
  - 添加环境变量配置，支持密钥管理
  - 配置 GitHub Actions 自动部署

### 历史版本

- **2025-12-09**：重构项目文档和 README

## 📄 许可证

MIT License

## 👨‍💻 作者

Richie
GitHub: @linRichie

## 🚀 部署指南

### GitHub Pages 自动部署

项目配置了 GitHub Actions，当推送代码到 `main` 分支时会自动构建和部署。

**首次设置步骤：**

1. 将仓库设为 **Public**（Settings → General → 拉到最底部）
2. 进入 **Settings → Pages**
   - Source 选择 "GitHub Actions"
3. 进入 **Settings → Secrets and variables → Actions**
   - 添加 Secret: `VITE_AMAP_KEY` = 你的高德地图 Key
4. 推送代码到 `main` 分支，或手动触发 workflow

**部署后访问：**
- 默认地址：https://linRichie.github.io/travel-guide
- 自定义域名（如 travel.moniter.top）：
  - 在仓库 Settings → Pages 中配置自定义域名
  - DNS 添加 CNAME 记录指向 `linRichie.github.io`

### 本地生产构建

```bash
npm run build
npm run preview
# 访问 http://localhost:4173
```
