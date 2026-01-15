const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/sql-wasm-B3llmCNf.js","assets/index-CHidDTLO.js","assets/index-DaAaFiGX.css"])))=>i.map(i=>d[i]);
import{_,s as d}from"./index-CHidDTLO.js";let s=null,g=null,L=null,E=null;const p=()=>L?Promise.resolve(L):E||(E=new Promise((e,o)=>{const t=indexedDB.open("TravelPlansDB",1);t.onerror=()=>{console.error("IndexedDB 打开失败:",t.error),E=null,o(t.error)},t.onsuccess=()=>{L=t.result,console.log("IndexedDB 实例已缓存"),e(L)},t.onupgradeneeded=a=>{const r=a.target.result;r.objectStoreNames.contains("sqlite_db")||r.createObjectStore("sqlite_db")}}),E),n=async()=>{var e,o;if(s)return console.log("SQLite: 返回已存在的数据库实例"),s;try{console.log("SQLite: 开始初始化..."),g=await(await _(()=>import("./sql-wasm-B3llmCNf.js").then(r=>r.s),__vite__mapDeps([0,1,2]))).default({locateFile:r=>`/node_modules/sql.js/dist/${r}`}),console.log("SQLite: sql.js 加载完成");const a=await f();if(a){s=a,console.log("SQLite: 数据库从 IndexedDB 加载成功");try{const i=((o=(e=s.exec("SELECT COUNT(*) as count FROM photos")[0])==null?void 0:e.values[0])==null?void 0:o[0])||0;console.log("SQLite: photos 表记录数 =",i)}catch{console.log("SQLite: photos 表查询失败，可能需要创建表")}}else s=new g.Database,console.log("SQLite: 新数据库创建成功");try{h(),console.log("SQLite: 表结构检查完成")}catch(r){console.error("SQLite: 创建表失败:",r)}return s}catch(t){return console.error("SQLite 初始化失败:",t),null}},O=async()=>{if(console.log("SQLite: 强制重新加载数据库..."),s){try{s.close()}catch(e){console.error("SQLite: 关闭数据库失败:",e)}s=null}return await n()},h=()=>{s.exec(`
    CREATE TABLE IF NOT EXISTS travel_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      destination TEXT NOT NULL,
      start_date TEXT NOT NULL,
      days INTEGER NOT NULL,
      budget TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS plan_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_id INTEGER NOT NULL,
      day_number INTEGER NOT NULL,
      activities TEXT,
      FOREIGN KEY (plan_id) REFERENCES travel_plans(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      location TEXT,
      photo_date TEXT,
      img_url TEXT NOT NULL,
      tags TEXT,
      exif_data TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_plans_created ON travel_plans(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_photos_created ON photos(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_photos_location ON photos(location);
  `)},l=()=>p().then(e=>new Promise((o,t)=>{var i,u;const a=e.transaction(["sqlite_db"],"readwrite"),r=a.objectStore("sqlite_db");try{const S=((u=(i=s.exec("SELECT COUNT(*) FROM photos")[0])==null?void 0:i.values[0])==null?void 0:u[0])||0;console.log("保存前验证: photos 表有",S,"条记录");const T=s.export();r.put({id:"main",data:T,timestamp:Date.now()},"sqlite_db"),console.log("SQLite 数据库已保存到 IndexedDB, 大小:",T.length,"字节")}catch(c){console.error("导出数据库失败:",c),a.abort(),t(c);return}a.oncomplete=()=>{console.log("IndexedDB 保存完成"),o()},a.onerror=()=>{console.error("IndexedDB 保存失败:",a.error),t(a.error)}})),f=()=>p().then(e=>new Promise(o=>{const t=e.transaction(["sqlite_db"],"readonly"),r=t.objectStore("sqlite_db").get("main");r.onsuccess=()=>{var i,u;if(r.result&&r.result.data)try{const c=new g.Database(r.result.data);console.log("从 IndexedDB 加载 SQLite 数据库成功, 数据大小:",r.result.data.length,"字节");try{const T=((u=(i=c.exec("SELECT COUNT(*) FROM photos")[0])==null?void 0:i.values[0])==null?void 0:u[0])||0;console.log("加载后验证: photos 表有",T,"条记录")}catch(S){console.log("加载后验证: photos 表不存在或查询失败",S)}o(c)}catch(c){console.error("加载数据库失败:",c),o(null)}else console.log("IndexedDB 中没有保存的数据库"),o(null)},r.onerror=()=>{console.error("读取 IndexedDB 失败:",r.error),o(null)},t.onerror=()=>{console.error("IndexedDB 事务失败:",t.error),o(null)}})).catch(e=>(console.error("获取 IndexedDB 实例失败:",e),Promise.resolve(null))),R=async e=>{s||await n();const o=s.prepare(`
    INSERT INTO travel_plans (destination, start_date, days, budget, created_at)
    VALUES (?, ?, ?, ?, ?)
  `),t=new Date().toISOString();o.run([e.destination,e.startDate,e.days,e.budget,t]),o.free(),d.sqlite.autoSave&&await l();const a=s.exec("SELECT last_insert_rowid() as id");return{...e,id:a[0].values[0][0],createdAt:t}},I=async()=>{s||await n();const e=s.exec(`
    SELECT id, destination, start_date, days, budget, created_at
    FROM travel_plans
    ORDER BY created_at DESC
  `);return e.length===0?[]:e[0].values.map(o=>({id:o[0],destination:o[1],startDate:o[2],days:o[3],budget:o[4],createdAt:o[5]}))},D=async e=>{s||await n();const o=s.prepare("DELETE FROM travel_plans WHERE id = ?");o.run([e]),o.free(),d.sqlite.autoSave&&await l()},m=()=>{s&&(s.close(),s=null)},x=()=>{if(!s)return null;const e=s.exec(`
    SELECT * FROM travel_plans
    ORDER BY created_at DESC
  `);let o=`-- Travel Plans Export
-- Generated: `+new Date().toISOString()+`

`;return e.length>0&&e[0].values.forEach(t=>{o+="INSERT INTO travel_plans (id, destination, start_date, days, budget, created_at) ",o+=`VALUES (${t[0]}, '${t[1]}', '${t[2]}', ${t[3]}, '${t[4]}', '${t[5]}');
`}),o},y=async e=>{s||await n();const o=s.prepare(`
    INSERT INTO photos (title, location, photo_date, img_url, tags, exif_data, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),t=new Date().toISOString();o.run([e.title,e.location||"",e.date||"",e.img,JSON.stringify(e.tags||[]),JSON.stringify(e.exif||null),t]),o.free(),d.sqlite.autoSave&&await l();const a=s.exec("SELECT last_insert_rowid() as id");return{...e,id:a[0].values[0][0],isCustom:!0,createdAt:t}},Q=async e=>{console.log("SQLite savePhotosSQLite: 开始保存",e.length,"张图片"),s||await n();const o=[],t=new Date().toISOString();s.exec("BEGIN TRANSACTION");try{for(const a of e){const r=s.prepare(`
        INSERT INTO photos (title, location, photo_date, img_url, tags, exif_data, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);r.run([a.title,a.location||"",a.date||"",a.img,JSON.stringify(a.tags||[]),JSON.stringify(a.exif||null),t]),r.free();const i=s.exec("SELECT last_insert_rowid() as id");o.push({...a,id:i[0].values[0][0],isCustom:!0,createdAt:t})}s.exec("COMMIT"),console.log("SQLite savePhotosSQLite: 成功插入",o.length,"条记录")}catch(a){try{s.exec("ROLLBACK")}catch{}throw console.error("SQLite savePhotosSQLite: 保存失败，已回滚",a),a}return d.sqlite.autoSave&&(console.log("SQLite savePhotosSQLite: 开始保存到 IndexedDB..."),await l(),console.log("SQLite savePhotosSQLite: IndexedDB 保存完成")),o},v=async()=>{if(console.log("SQLite getPhotosSQLite: 开始获取图片..."),s||(console.log("SQLite getPhotosSQLite: 数据库未初始化，开始初始化..."),await n()),!s)return console.error("SQLite getPhotosSQLite: 数据库初始化失败"),[];try{const e=s.exec(`
      SELECT id, title, location, photo_date, img_url, tags, exif_data, created_at
      FROM photos
      ORDER BY created_at DESC
    `);if(e.length===0)return console.log("SQLite getPhotosSQLite: 没有找到图片记录"),[];const o=e[0].values.map(t=>({id:t[0],title:t[1],location:t[2],date:t[3],img:t[4],tags:JSON.parse(t[5]||"[]"),exif:JSON.parse(t[6]||"null"),isCustom:!0,createdAt:t[7]}));return console.log("SQLite getPhotosSQLite: 成功获取",o.length,"张图片"),o}catch(e){return console.error("SQLite getPhotosSQLite: 查询失败",e),[]}},C=async e=>{s||await n();const o=s.prepare(`
    SELECT id, title, location, photo_date, img_url, tags, exif_data, created_at
    FROM photos
    WHERE id = ?
  `),t=o.get([e]);return o.free(),t?{id:t[0],title:t[1],location:t[2],date:t[3],img:t[4],tags:JSON.parse(t[5]||"[]"),exif:JSON.parse(t[6]||"null"),isCustom:!0,createdAt:t[7]}:null},b=async e=>{s||await n();const o=s.prepare(`
    UPDATE photos
    SET title = ?, location = ?, photo_date = ?, tags = ?, updated_at = ?
    WHERE id = ?
  `),t=new Date().toISOString();return o.run([e.title,e.location||"",e.date||"",JSON.stringify(e.tags||[]),t,e.id]),o.free(),d.sqlite.autoSave&&await l(),e},A=async e=>{s||await n();const o=s.prepare("DELETE FROM photos WHERE id = ?");o.run([e]),o.free(),d.sqlite.autoSave&&await l()},P=async e=>{s||await n();for(const o of e){const t=s.prepare("DELETE FROM photos WHERE id = ?");t.run([o]),t.free()}d.sqlite.autoSave&&await l()},w=()=>{if(!s)return console.error("数据库未初始化"),null;try{const e=s.export(),o=new Blob([e],{type:"application/x-sqlite3"}),t=URL.createObjectURL(o),a=document.createElement("a");return a.href=t,a.download=`travel_diary_${new Date().toISOString().slice(0,10)}.db`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(t),console.log("数据库文件已导出"),!0}catch(e){return console.error("导出数据库文件失败:",e),!1}},B=async e=>{if(!e)return{success:!1,message:"未选择文件"};try{const o=await e.arrayBuffer(),t=new Uint8Array(o);return t.length<16||String.fromCharCode(t[0],t[1],t[2],t[3])!=="SQLite"?{success:!1,message:"无效的 SQLite 文件"}:(s&&(s.close(),s=null),s=new g.Database(t),h(),await l(),console.log("数据库文件导入成功"),{success:!0,message:"数据库导入成功"})}catch(o){return console.error("导入数据库文件失败:",o),{success:!1,message:`导入失败: ${o.message}`}}},F=async()=>{s||await n();try{const e=s.exec("SELECT COUNT(*) FROM travel_plans"),o=s.exec("SELECT COUNT(*) FROM photos"),t={plans:e.length>0?e[0].values[0][0]:0,photos:o.length>0?o[0].values[0][0]:0},a=s.export();return t.sizeBytes=a.length,t.sizeKB=(a.length/1024).toFixed(2),t}catch(e){return console.error("获取数据库统计失败:",e),{plans:0,photos:0,sizeBytes:0,sizeKB:"0"}}},U=async()=>{s||await n();try{return s.exec("DELETE FROM photos WHERE 1=1"),s.exec("DELETE FROM travel_plans WHERE 1=1"),s.exec("DELETE FROM plan_details WHERE 1=1"),await l(),console.log("所有自定义数据已清空"),{success:!0,message:"数据已清空"}}catch(e){return console.error("清空数据失败:",e),{success:!1,message:`清空失败: ${e.message}`}}};export{U as clearAllCustomData,m as closeSQLite,A as deletePhotoSQLite,P as deletePhotosSQLite,D as deleteTravelPlanSQLite,w as exportDatabaseFile,x as exportSQLiteAsSQL,F as getDatabaseStats,C as getPhotoSQLite,v as getPhotosSQLite,I as getTravelPlansSQLite,B as importDatabaseFile,n as initSQLite,O as reloadDatabase,y as savePhotoSQLite,Q as savePhotosSQLite,R as saveTravelPlanSQLite,b as updatePhotoSQLite};
