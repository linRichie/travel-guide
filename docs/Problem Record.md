# 存在的问题

## 已修复 ✅

1. ✅ 点击查看图片，关闭按钮，上一张按钮，下一张按钮显示异常
   - **原因**：`index.html` 中缺少 Font Awesome CDN 引用
   - **修复**：在 `index.html` 中添加 Font Awesome 6.5.1 CDN 链接

2. ✅ （旅行日志）首页，【关于我】【旅拍图集】等的圆形图片显示异常
   - **原因**：`index.html` 中缺少 Font Awesome CDN 引用
   - **修复**：同上

3. ✅ （旅行日志）-> (关于我) 的社交链接图标显示异常
   - **原因**：`index.html` 中缺少 Font Awesome CDN 引用
   - **修复**：同上

4. ✅ 旅行规划，建议保存在本地的 SQLite 或本地的 MySQL（默认设置为 SQLite，配置文件设置为可选 MySQL，PgSQL）
   - **实现**：
     - 创建 `src/app/diary/utils/storageConfig.js` - 存储配置文件
     - 创建 `src/app/diary/utils/sqliteAdapter.js` - SQLite 适配器（使用 sql.js）
     - 重构 `src/app/diary/utils/storage.js` - 统一存储接口
     - 旅行规划器页面新增存储设置面板
   - **配置方式**：在 `storageConfig.js` 中修改 `type` 和对应存储的 `enabled` 配置

## 无问题

- 当前没有其他待修复问题
