const D1 = 'https://rebecca-portal-api.rebeccaannexo.workers.dev';

async function run(){
  console.log('Fetching tasks...');
  const resp = await fetch(D1 + '?table=tasks&t=' + Date.now());
  const data = await resp.json();
  const tasks = data.data || [];
  console.log('Found ' + tasks.length + ' tasks');

  const updates = [
    {id:'t1', priority_flag:'1'},
    {id:'t2', priority_flag:'1'},
    {id:'t3', priority_flag:'1'},
    {id:'g8', priority_flag:'1'},
    {id:'t4', priority_flag:'2'},
    {id:'t5', priority_flag:'2'},
    {id:'t6', priority_flag:'2'},
    {id:'t7', priority_flag:'2'},
  ];

  for(const u of updates){
    const task = tasks.find(t => t.id === u.id);
    if(!task){ console.log('Not found:', u.id); continue; }
    const r = await fetch(D1, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({action:'upsert', table:'tasks', data:{
        ...task,
        priority_flag: u.priority_flag
      }})
    });
    const j = await r.json();
    console.log('✓', u.id, task.text?.slice(0,30), '→ P'+u.priority_flag, j.action||j.error||'');
  }

  localStorage.removeItem('biz_tasks');
  console.log('✅ Done — reloading...');
  setTimeout(()=>location.reload(), 800);
}

run().catch(console.error);
