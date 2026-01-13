const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/sql-wasm-BvDhVnUR.js","assets/index-erUc0sB-.js","assets/index-DaAaFiGX.css"])))=>i.map(i=>d[i]);
import{_ as T}from"./index-erUc0sB-.js";let s=null,d=null;const i=async()=>{if(s)return s;try{return d=await(await T(()=>import("./sql-wasm-BvDhVnUR.js").then(t=>t.s),__vite__mapDeps([0,1,2]))).default({locateFile:t=>`/node_modules/sql.js/dist/${t}`}),s=new d.Database,u(),await _(),s}catch(e){return console.error("SQLite 初始化失败:",e),null}},u=()=>{s.exec(`
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

    CREATE INDEX IF NOT EXISTS idx_plans_created ON travel_plans(created_at DESC);
  `)},c=()=>new Promise((e,t)=>{const a=indexedDB.open("TravelPlansDB",1);a.onerror=()=>t(a.error),a.onsuccess=()=>{const n=a.result.transaction(["sqlite_db"],"readwrite"),l=n.objectStore("sqlite_db"),o=s.export();l.put({id:"main",data:o},"sqlite_db"),n.oncomplete=()=>e(),n.onerror=()=>t(n.error)},a.onupgradeneeded=r=>{const n=r.target.result;n.objectStoreNames.contains("sqlite_db")||n.createObjectStore("sqlite_db")}}),_=()=>new Promise((e,t)=>{const a=indexedDB.open("TravelPlansDB",1);a.onerror=()=>t(a.error),a.onsuccess=()=>{const n=a.result.transaction(["sqlite_db"],"readonly"),o=n.objectStore("sqlite_db").get("main");o.onsuccess=()=>{if(o.result&&o.result.data){const E=new d.Database(o.result.data);s.close(),s=E}e()},n.onerror=()=>t(n.error)},a.onupgradeneeded=r=>{const n=r.target.result;n.objectStoreNames.contains("sqlite_db")||n.createObjectStore("sqlite_db")}}),N=async e=>{s||await i();const t=s.prepare(`
    INSERT INTO travel_plans (destination, start_date, days, budget, created_at)
    VALUES (?, ?, ?, ?, ?)
  `),a=new Date().toISOString();t.run([e.destination,e.startDate,e.days,e.budget,a]),t.free(),await c();const r=s.exec("SELECT last_insert_rowid() as id");return{...e,id:r[0].values[0][0],createdAt:a}},b=async()=>{s||await i();const e=s.exec(`
    SELECT id, destination, start_date, days, budget, created_at
    FROM travel_plans
    ORDER BY created_at DESC
  `);return e.length===0?[]:e[0].values.map(t=>({id:t[0],destination:t[1],startDate:t[2],days:t[3],budget:t[4],createdAt:t[5]}))},L=async e=>{s||await i();const t=s.prepare("DELETE FROM travel_plans WHERE id = ?");t.run([e]),t.free(),await c()},I=()=>{s&&(s.close(),s=null)},R=()=>{if(!s)return null;const e=s.exec(`
    SELECT * FROM travel_plans
    ORDER BY created_at DESC
  `);let t=`-- Travel Plans Export
-- Generated: `+new Date().toISOString()+`

`;return e.length>0&&e[0].values.forEach(a=>{t+="INSERT INTO travel_plans (id, destination, start_date, days, budget, created_at) ",t+=`VALUES (${a[0]}, '${a[1]}', '${a[2]}', ${a[3]}, '${a[4]}', '${a[5]}');
`}),t};export{I as closeSQLite,L as deleteTravelPlanSQLite,R as exportSQLiteAsSQL,b as getTravelPlansSQLite,i as initSQLite,N as saveTravelPlanSQLite};
