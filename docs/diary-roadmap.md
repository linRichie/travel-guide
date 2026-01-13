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

- [ ] 图片灯箱查看器（放大/左右切换）
- [ ] 按年份/地点/标签筛选
- [ ] 图片懒加载优化
- [ ] 图片 EXIF 信息显示（拍摄时间、地点）

#### 2. 旅行博客完善

- [ ] 博客详情页路由 (`/diary/blog/:id`)
- [ ] Markdown 内容支持
- [ ] 博客目录/标签云
- [ ] 相关文章推荐

#### 3. 旅行统计可视化

- [ ] 世界地图标记已访问国家
- [ ] 图表展示：年度旅行次数、洲分布
- [ ] 照片数量趋势图

#### 4. 旅行规划器

- [ ] 连接旅游指南模块数据
- [ ] 生成计划后跳转到对应省份详情页
- [ ] 计划保存/收藏功能（localStorage）

---

### 阶段三：高级功能 (可选)

- [ ] 全文搜索（博客/图片）
- [ ] 图片上传与管理
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

- 2025-01-13: **阶段一完成** - 模块拆分与组件化
  - 创建目录结构 `src/app/diary/{pages,data,components}`
  - 拆分出 6 个独立页面：DiaryHome, About, Gallery, Planner, Stats, BlogList, BlogPost
  - 创建数据文件：galleryData.js, blogData.js, statsData.js
  - 更新路由配置，支持 `/diary/*` 下的所有子路由
  - 旅拍图集支持按年份/标签筛选
  - 旅行规划器连接旅游指南模块，支持跳转到对应省份页面
  - 旅行统计新增年度图表和洲分布展示
  - 博客支持详情页，含上一篇/下一篇导航
