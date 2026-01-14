# 旅行日记模块 - 开发计划

## 当前状态分析

| 功能模块 | 状态 | 说明 |
|---------|------|------|
| 首页 | ✅ 完成 | Hero banner + 导航卡片 |
| 关于我 | ✅ 完成 | 独立页面，包含旅行理念和社交链接 |
| 旅拍图集 | ✅ 基础完成 | 支持按年份/标签筛选 |
| 旅行规划 | ✅ 基础完成 | 表单 + 跳转旅游指南 |
| 旅行统计 | ✅ 基础完成 | 数据卡片 + 年度图表 + 洲分布 |
| 旅行博客 | ✅ 基础完成 | 列表 + 详情页（含上一篇/下一篇） |

---

## 开发路线图

### 阶段一：模块拆分与组件化 (基础设施)

#### 目录结构

```tree
src/app/diary/
├── DiaryLayout.jsx          # 布局容器
├── pages/
│   ├── DiaryHome.jsx        # 首页入口
│   ├── About.jsx            # 关于我（独立页面）
│   ├── Gallery.jsx          # 旅拍图集（独立页面）
│   ├── Planner.jsx          # 旅行规划（独立页面）
│   ├── Stats.jsx            # 旅行统计（独立页面）
│   ├── BlogList.jsx         # 博客列表
│   └── BlogPost.jsx         # 博客详情页
├── components/
│   ├── PhotoGallery/        # 图集组件
│   │   ├── PhotoGrid.jsx    # 照片网格
│   │   ├── PhotoLightbox.jsx # 灯箱查看器
│   │   └── PhotoFilter.jsx  # 筛选器
│   ├── TravelMap/           # 地图组件
│   │   └── WorldMap.jsx     # 世界地图（标记足迹）
│   ├── StatsCharts/         # 统计图表
│   │   ├── CountryChart.jsx # 国家分布图
│   │   └── TimelineChart.jsx # 旅行时间线
│   └── BlogCard.jsx         # 博客卡片
└── data/
    ├── galleryData.js       # 图集数据
    ├── blogData.js          # 博客数据
    └── statsData.js         # 统计数据
```

#### 任务清单

- [x] 创建开发计划文档
- [x] 创建目录结构
- [x] 拆分 About 页面
- [x] 拆分 Gallery 页面
- [x] 拆分 Planner 页面
- [x] 拆分 Stats 页面
- [x] 拆分 BlogList 页面
- [x] 创建 BlogPost 详情页
- [x] 创建可复用组件
- [x] 创建数据文件
- [x] 更新路由配置

**✅ 阶段一已完成** - 2025-01-13

---

### 阶段二：功能增强

#### 1. 旅拍图集增强

- [x] 图片灯箱查看器（放大/左右切换）
- [x] 按年份/地点/标签筛选
- [x] 图片懒加载优化
- [x] 图片 EXIF 信息显示（拍摄参数）

#### 2. 旅行博客完善

- [x] 博客详情页路由 (`/diary/blog/:id`)
- [x] Markdown 内容支持
- [x] 博客目录/标签云
- [x] 相关文章推荐

#### 3. 旅行统计可视化

- [x] 世界地图标记已访问国家
- [x] 图表展示：年度旅行次数、洲分布
- [x] 照片数量趋势图

#### 4. 旅行规划器

- [x] 连接旅游指南模块数据
- [x] 生成计划后跳转到对应省份详情页
- [x] 计划保存/收藏功能（localStorage）

**✅ 阶段二已完成** - 2025-01-13

---

### 阶段三：高级功能 (可选)

- [x] 全文搜索（博客/图片）
- [x] 图片上传与管理
- [ ] 评论系统（或接入 Disqus/Giscus）
- [ ] PWA 支持（离线访问）
- [ ] 多语言切换（中英文）

---

## 设计规范

### 颜色方案

- 模块主色：紫色系 (`purple-400`, `purple-500`, `purple-600`)
- 背景色：黑色 (`bg-black`, `bg-gray-900`)
- 文字色：白色/灰色 (`text-white`, `text-gray-300`, `text-gray-400`)
- 渐变：`from-purple-500 to-blue-600`, `from-purple-500 to-indigo-600`

### 组件样式

- 毛玻璃效果：`backdrop-blur-lg bg-white/5`
- 边框：`border border-white/10`
- 圆角：`rounded-xl`, `rounded-2xl`, `rounded-full`
- 阴影：`shadow-lg shadow-purple-500/25`
- 过渡：`transition-all duration-300`

---

## 更新日志

- 2025-01-14: **阶段三部分完成** - 全文搜索与图片管理
  - **全文搜索功能**：
    - 新增 `src/app/diary/utils/searchUtils.js` - 搜索工具函数，支持博客和图片的全文检索
    - 新增 `src/app/diary/components/GlobalSearch.jsx` - 全局搜索组件，支持快捷键 (⌘K/Ctrl+K) 和搜索建议
    - 新增 `src/app/diary/pages/SearchResults.jsx` - 搜索结果页面，支持按类型筛选（博客/图集/全部）
  - **图片上传与管理功能**：
    - 新增 `src/app/diary/components/PhotoUpload.jsx` - 图片上传组件，支持拖拽上传、多图选择、元数据编辑
    - 新增 `src/app/diary/pages/PhotoManager.jsx` - 图片管理页面，支持网格/列表视图、批量选择、编辑、删除
    - 支持自定义图片持久化到 SQLite/MySQL/PostgreSQL（通过统一存储接口）
    - 支持编辑图片元数据（标题、地点、年份、标签）
    - **存储优化**：图片管理使用与旅行规划相同的统一存储接口，默认使用 SQLite，可配置切换到 MySQL/PostgreSQL
  - **首页更新**：新增「全文搜索」和「图片管理」导航入口

- 2025-01-13: **问题修复** - Bug 修复与存储功能增强
  - **问题修复**：
    - 修复图片灯箱的关闭/上一张/下一张按钮显示异常（添加 Font Awesome CDN）
    - 修复首页圆形图标显示异常（添加 Font Awesome CDN）
    - 修复关于我页面社交链接图标显示异常（添加 Font Awesome CDN）
  - **存储功能增强**：
    - 新增 `src/app/diary/utils/storageConfig.js` - 存储配置文件，支持多种存储方式切换
    - 新增 `src/app/diary/utils/sqliteAdapter.js` - SQLite 存储适配器（使用 sql.js 在浏览器中运行）
    - 重构 `src/app/diary/utils/storage.js` - 统一存储接口，支持 localStorage（默认）、SQLite、MySQL、PostgreSQL
    - 旅行规划器新增存储设置面板，可在 UI 中切换存储方式
    - 支持配置文件可选启用 MySQL/PostgreSQL（需配置后端 API）
    - SQLite 支持自动持久化到 IndexedDB
  - **配置说明**：
    - 默认使用 localStorage（无需配置）
    - 启用 SQLite：在 `storageConfig.js` 中设置 `sqlite.enabled: true`
    - 启用 MySQL/PostgreSQL：在 `storageConfig.js` 中配置 `apiUrl` 并设置 `enabled: true`

- 2025-01-13: **阶段二完成** - 功能增强
  - 新增组件：`TagCloud`（标签云）、`BlogTOC`（目录导航）、`RelatedPosts`（相关文章推荐）、`PhotoLightbox`（灯箱查看器）、`WorldMap`（世界地图）
  - 旅拍图集增强：灯箱支持 EXIF 信息显示（相机、镜头、光圈、快门、ISO、焦距）
  - 旅行博客增强：详情页支持侧边栏目录导航和相关文章推荐，列表页支持标签筛选
  - 旅行统计增强：新增照片数量趋势图（折线图可视化）
  - 旅行规划器增强：支持计划保存/收藏/删除/加载功能（localStorage 持久化）
  - 新增工具文件 `src/app/diary/utils/storage.js`

- 2025-01-13: **阶段一完成** - 模块拆分与组件化
  - 创建目录结构 `src/app/diary/{pages,data,components}`
  - 拆分出 6 个独立页面：DiaryHome, About, Gallery, Planner, Stats, BlogList, BlogPost
  - 创建数据文件：galleryData.js, blogData.js, statsData.js
  - 更新路由配置，支持 `/diary/*` 下的所有子路由
  - 旅拍图集支持按年份/标签筛选
  - 旅行规划器连接旅游指南模块，支持跳转到对应省份页面
  - 旅行统计新增年度图表和洲分布展示
  - 博客支持详情页，含上一篇/下一篇导航
