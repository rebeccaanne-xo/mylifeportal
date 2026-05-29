/**
 * seed-missing-tasks.js
 * ─────────────────────────────────────
 * Job:      One-time D1 database seed script — run manually via wrangler or node
 * Connects: Writes to rebecca-portal-api D1 database
 * Reads:    Hardcoded seed data below
 * Returns:  Inserted rows in D1
 */

const D1 = 'https://rebecca-portal-api.rebeccaannexo.workers.dev';

async function save(t){
  const r = await fetch(D1,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'upsert',table:'tasks',data:t})});
  const j = await r.json();
  console.log('✓',t.id,t.text.slice(0,40),j.action||j.error||'');
}

async function run(){
  console.log('Adding missing tasks...');

  const tasks = [
    // GBB
    {id:'gbb_m1',text:'Build GBB admin portal — Cloudflare Pages + Zero Trust',section:'gbb',status:'todo',priority:'high',priority_flag:'1',done:0,description:'Separate Cloudflare Pages repo. Zero Trust protected. Client pipeline, prospect audit tool, visibility audit delivery.'},
    {id:'gbb_m2',text:'Wire Google Places API to prospect audit tool',section:'gbb',status:'todo',priority:'high',priority_flag:'1',done:0,description:'Type business name → auto-pulls Google Business Profile data, rating, reviews, photos, hours.'},
    {id:'gbb_m3',text:'Build GBB prospecting automation + call list CRM',section:'gbb',status:'backlog',priority:'med',priority_flag:'',done:0,description:'AI scores prospects, generates call list, tracks contact status, auto-drafts follow-ups.'},
    {id:'gbb_m4',text:'Follow up with Kelly — Graphic Arts Print Shop',section:'gbb',status:'todo',priority:'high',priority_flag:'1',done:0,description:'Has not responded. Follow up on welcome landing page and GBB offer.'},
    {id:'gbb_m5',text:'Build GBB Visibility Snapshot PDF template',section:'gbb',status:'todo',priority:'med',priority_flag:'2',done:0,description:'Canva template for the $297 audit deliverable.'},

    // Portal
    {id:'por_m1',text:'Build project card editing — name, description, goal, links',section:'portal',status:'todo',priority:'high',priority_flag:'1',done:0,description:'Click project card to open edit panel. Edit name, description, goal, status, color, URLs, connect to other projects.'},
    {id:'por_m2',text:'Build AI morning briefing — Cloudflare cron Worker',section:'portal',status:'backlog',priority:'high',priority_flag:'',done:0,description:'Cron at 7am, 9:30am, 5pm. Reads D1, calls Anthropic, sends push notification with scripture + focus + check-in.'},
    {id:'por_m3',text:'PWA manifest + service worker — make portal installable',section:'portal',status:'backlog',priority:'med',priority_flag:'',done:0,description:'Enables push notifications, home screen install, offline support.'},
    {id:'por_m4',text:'AI chat widget — personal assistant inside portal',section:'portal',status:'backlog',priority:'med',priority_flag:'',done:0,description:'Knows all your D1 data. Conversational. Suggests, acts on approval. Keeps version history of changes.'},
    {id:'por_m5',text:'Push notifications — 7am scripture, 9:30am focus, 5pm check-in',section:'portal',status:'backlog',priority:'med',priority_flag:'',done:0,description:'Three daily notifications tied to morning briefing Worker.'},
    {id:'por_m6',text:'App Store submission — iOS + Android',section:'portal',status:'backlog',priority:'low',priority_flag:'',done:0,description:'PWA wrapper for App Store. TestFlight first, then production.'},
    {id:'por_m7',text:'Version history — log all AI and manual data changes',section:'portal',status:'backlog',priority:'low',priority_flag:'',done:0,description:'Every change logged with timestamp, source (AI or manual), reversible.'},

    // Vision
    {id:'vis_m1',text:'Build media platform — own Patreon alternative',section:'vision',status:'backlog',priority:'med',priority_flag:'',done:0,description:'Own domain, video hosting, live streaming, community, subscriptions. All brands flow through it. No algorithm.'},
    {id:'vis_m2',text:'Live streaming capability — own RTMP server',section:'vision',status:'backlog',priority:'low',priority_flag:'',done:0,description:'Self-hosted Owncast or similar. Stream to own platform first, syndicate to YouTube/etc.'},
    {id:'vis_m3',text:'Run open source LLM locally — replace Anthropic API long term',section:'vision',status:'backlog',priority:'low',priority_flag:'',done:0,description:'Ollama + Llama 3 or Mistral on own server. $0 per call once running. Private — data never leaves.'},
    {id:'vis_m4',text:'Physical server purchase — Phase 1 self-hosting',section:'vision',status:'backlog',priority:'low',priority_flag:'',done:0,description:'Intel NUC or mini PC ~$500. Self-host Gitea, n8n, Nextcloud. Own the stack.'},

    // Home
    {id:'hom_m1',text:'Set up budgeting system — Seth + Rebecca income tracking',section:'home',status:'backlog',priority:'high',priority_flag:'',done:0,description:'Seth Uber Black 1099 + Rebecca LLC. Shared expenses, bills, savings goals. Visibility on both sides.'},

    // Anthropic key unlock
    {id:'inf_m1',text:'Get Anthropic API key — $5 credit at console.anthropic.com',section:'portal',status:'todo',priority:'high',priority_flag:'1',done:0,description:'Unlocks: morning briefing, brain dump AI, prospect research AI, AI chat widget. Everything AI is blocked without this.'},
    {id:'inf_m2',text:'Get Google API keys — Places + Calendar',section:'portal',status:'todo',priority:'high',priority_flag:'1',done:0,description:'console.cloud.google.com → enable Places API + Calendar API → create key → restrict to portal domain.'},
  ];

  for(const t of tasks) await save(t);
  
  localStorage.removeItem('pb_tasks');
  console.log('✅ Missing tasks added — reloading...');
  setTimeout(()=>location.reload(), 800);
}

run().catch(console.error);
