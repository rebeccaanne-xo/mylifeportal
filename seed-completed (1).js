const D1 = 'https://rebecca-portal-api.rebeccaannexo.workers.dev';

async function run(){
  const completed = [
    // Aligned Life
    'Daily Pages Part 3 — v4 COMPLETE',
    'Life Plan Part 2 — v4 COMPLETE',
    'Workbook Part 1 — 10 sections COMPLETE',
    // Mustard Seed
    'Articles of Incorporation filed — WA SOS',
    // Portal
    'Set up D1 database',
    'Build personal portal — mylifeportal.pages.dev',
    'Set up Cloudflare Pages + GitHub repos',
    'Build project board — projects.html',
    'Build daily log',
    'Build schedule system with recurring items',
    'Build bills tracking',
    'Build people + contacts tab',
    'Build faith + prayer journal',
    'Build habits tracker',
    'Connect D1 as single source of truth',
  ];

  const resp = await fetch(D1+'?table=tasks&t='+Date.now());
  const data = await resp.json();
  const tasks = data.data || [];

  let updated = 0;
  for(const t of tasks){
    const text = (t.text||'').toLowerCase();
    const match = completed.find(c => text.includes(c.toLowerCase().slice(0,20)));
    if(match && t.done !== 1){
      const r = await fetch(D1,{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'upsert',table:'tasks',data:{...t,done:1,status:'done'}})});
      const j = await r.json();
      console.log('✓ marked done:', t.text?.slice(0,40), j.action||'');
      updated++;
    }
  }
  console.log('✅ Marked',updated,'tasks done');
  localStorage.removeItem('pb_tasks');
  setTimeout(()=>location.reload(),800);
}
run().catch(console.error);
