# 旅行规划可视化展示页面 - 任务清单

## 项目概述

创建一个旅行规划可视化展示页面，用于展示所有保存的旅行计划，采用卡片式布局，支持排序和快速加载功能。

## 设计规范

### 颜色方案
```javascript
{
  // 主色（紫色系）
  primary: 'purple-500',     // 主操作按钮、高亮
  primaryLight: 'purple-400', // 悬停状态
  primaryDark: 'purple-600',  // 按下状态

  // 背景色（暗色主题）
  bgMain: 'black',           // 主背景
  bgSecondary: 'gray-900',   // 次级背景
  bgCard: 'white/5',         // 卡片背景（毛玻璃）
  bgCardHover: 'white/10',   // 卡片悬停

  // 文字色
  textMain: 'white',         // 主要文字
  textMuted: 'gray-400',     // 次要文字
  textFaint: 'gray-500'      // 辅助文字
}
```

### 组件样式
```javascript
// 卡片样式
card: {
  base: 'backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl',
  hover: 'hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300',
  shadow: 'shadow-lg shadow-purple-500/10'
}

// 按钮样式
button: {
  primary: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity',
  secondary: 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white rounded-xl font-medium transition-all'
}
```

---

## 开发任务清单

### 阶段一：基础结构搭建

- [ ] **1.1 创建页面组件**
  - 文件：`src/app/diary/pages/TravelPlans.jsx`
  - 功能：旅行规划列表主页面
  - 状态：plans（计划列表）, loading（加载状态）, sortBy（排序方式）, filterBy（筛选条件）

- [ ] **1.2 创建卡片组件**
  - 文件：`src/app/diary/components/PlanCard.jsx`
  - 功能：单个旅行计划卡片
  - 显示：目的地、日期、天数、预算、操作按钮

- [ ] **1.3 更新路由配置**
  - 文件：`src/App.jsx`
  - 添加路由：`/diary/plans` → `TravelPlans`

### 阶段二：数据获取与状态管理

- [ ] **2.1 实现数据加载**
  - 从 SQLite 数据库加载所有旅行计划
  - 使用 `getTravelPlans()` 函数
  - 添加加载状态和错误处理

- [ ] **2.2 实现排序功能**
  - 按目的地名称排序
  - 按出发日期排序
  - 按旅行天数排序
  - 按创建时间排序

- [ ] **2.3 实现筛选功能**
  - 按目的地筛选
  - 按预算级别筛选
  - 按天数范围筛选

### 阶段三：UI 组件实现

- [ ] **3.1 顶部工具栏**
  - 标题：`旅行规划库`
  - 统计信息：共 X 个计划
  - 新建按钮：跳转到 `/diary/planner`
  - 排序/筛选下拉菜单

- [ ] **3.2 卡片网格布局**
  - 响应式网格：`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - 卡片间距：`gap-6`
  - 空状态提示：无计划时显示

- [ ] **3.3 计划卡片设计**
  ```
  ┌─────────────────────────────────┐
  │ 📍 成都         [编辑] [删除]    │
  │ ─────────────────────────────── │
  │ 📅 2025-06-01     🕐 5天        │
  │ 💰 舒适型        ⭐ 收藏         │
  │ ─────────────────────────────── │
  │ [加载此计划]  [开始生成]        │
  └─────────────────────────────────┘
  ```

- [ ] **3.4 快速操作按钮**
  - 加载计划：将计划数据填入表单
  - 编辑模式：跳转到规划页面
  - 删除确认：弹窗确认后删除

### 阶段四：交互优化

- [ ] **4.1 悬停效果**
  - 卡片悬停：轻微放大、边框高亮
  - 按钮悬停：颜色变化、阴影增强

- [ ] **4.2 动画效果**
  - 页面加载：淡入动画
  - 卡片出现：交错淡入
  - 删除操作：收缩淡出

- [ ] **4.3 响应式适配**
  - 移动端：单列布局
  - 平板：双列布局
  - 桌面：三列布局

### 阶段五：高级功能（可选）

- [ ] **5.1 搜索功能**
  - 按目的地名称搜索
  - 实时搜索建议

- [ ] **5.2 统计图表**
  - 目的地分布图
  - 月份分布图
  - 预算占比图

- [ ] **5.3 导出功能**
  - 导出为 JSON
  - 导出为 PDF

---

## 文件结构

```
src/app/diary/
├── pages/
│   └── TravelPlans.jsx          # 主页面（新建）
├── components/
│   ├── PlanCard.jsx              # 计划卡片（新建）
│   └── PlanFilters.jsx           # 筛选组件（新建）
└── utils/
    └── storage.js                # 已有，无需修改
```

---

## 数据流

```
┌─────────────────────────────────────────────────────────┐
│                    TravelPlans 页面                      │
├─────────────────────────────────────────────────────────┤
│  useEffect → getTravelPlans() → setPlans()              │
│                                                          │
│  plans → filter() → sort() → filteredPlans              │
│                                                          │
│  filteredPlans → map() → <PlanCard />                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     PlanCard 组件                        │
├─────────────────────────────────────────────────────────┤
│  显示：destination, startDate, days, budget             │
│  操作：onLoad, onEdit, onDelete                          │
└─────────────────────────────────────────────────────────┘
```

---

## 实施顺序

1. **第一步**：创建 `PlanCard.jsx` 组件
2. **第二步**：创建 `TravelPlans.jsx` 主页面
3. **第三步**：添加路由配置
4. **第四步**：实现排序和筛选功能
5. **第五步**：优化动画和交互效果
6. **第六步**：测试响应式布局

---

## 验收标准

- [ ] 页面能正确加载所有保存的旅行计划
- [ ] 卡片显示完整信息（目的地、日期、天数、预算）
- [ ] 支持按多种方式排序
- [ ] 点击"加载计划"能正确跳转到规划页面
- [ ] 删除功能正常工作
- [ ] 暗色主题样式与现有页面一致
- [ ] 响应式布局在移动端正常显示
