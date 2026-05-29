/**
 * projects.js
 * ─────────────────────────────────────
 * Job:      Projects tracker and task board — all interactivity and API calls
 * Connects: Loaded by projects/index.html · calls rebecca-portal-api Worker via fetch
 * Reads:    D1 database via Worker · user interactions
 * Returns:  Dynamic UI updates · data reads/writes
 */

// STORAGE
function sv(k,v){try{localStorage.setItem('pb_'+k,JSON.stringify(v))}catch(e){}}
function ld(k,d){try{var x=localStorage.getItem('pb_'+k);return x?JSON.parse(x):d}catch(e){return d}}
function esc(t){return String(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

// CONSTANTS
var PC={gbb:'#C2738A',wtc:'#6B8CB8',aligned:'#4A7C6F',mustard:'#7A5C7A',portal:'#C4895A',home:'#A89880',personal:'#6B8CB8',vision:'#C4895A',infra:'#A89880'};
var PN={gbb:'GBB',wtc:'WTC',aligned:'Aligned Life',mustard:'Mustard Seed',portal:'Portal',home:'Home',personal:'Personal',vision:'The Vision',infra:'Infra'};
var SL={backlog:'Backlog',todo:'To Do',inprogress:'In Progress',blocked:'Blocked',done:'Done'};
var SC={backlog:'rgba(255,255,255,.1)',todo:'rgba(107,140,184,.22)',inprogress:'rgba(196,137,90,.22)',blocked:'rgba(241,148,138,.22)',done:'rgba(46,125,82,.22)'};
var PR={high:'#F1948A',med:'#C4895A',low:'#4A7C6F'};

// PROJECTS
var PROJECTS={
  gbb:{name:'Get Booked & Branded',color:'#C2738A',status:'building',
    desc:'Marketing consultancy. Background: trained under Sarah Mae Ives · sold her FB Ads program · proven closer. Target: small/mid service businesses. Not limited to local.',
    offer:'GBB Visibility Audit — $297 · research + audit + 45min Zoom debrief + branded PDF',
    goal:'$2,500 month 1 · anything is a win',
    urls:[{label:'Public Site',url:'https://getbookednbranded.pages.dev'},{label:'Prospect Audit',url:'https://getbookednbranded.pages.dev/prospecting-audit-tool.html'},{label:'Calendly',url:'https://calendly.com/rebeccaannexo/meet'}],
    repo:'getbookednbranded'},
  wtc:{name:'We The Church',color:'#6B8CB8',status:'building',
    desc:'Faith community app. Galatians series active. Ongoing — runs parallel to everything. Never paused. Needs Supabase backend + PWA + admin panel.',
    offer:'Community · Bible study · prayer circles · Galatians series',
    goal:'Complete Galatians · launch Supabase backend · PWA installable',
    urls:[{label:'Live App',url:'https://wethechurch.pages.dev'},{label:'Newsletter',url:'https://wethechurch.beehiiv.com'}],
    repo:'wethechurch'},
  aligned:{name:'Aligned Life Co.',color:'#4A7C6F',status:'paused',
    desc:'Faith-first planning system for women. Physical planner + digital + future app. 5.5x8.5" discbound. Three parts, one system. Waiting behind GBB for primary focus.',
    offer:'Physical planner $67 · Digital $27 · Bundle $77+$17/mo · Membership $17/mo',
    goal:'Q2 merge → master PDF · GoHighLevel trial when assets ready',
    urls:[],repo:null},
  mustard:{name:'Mustard Seed Ministries',color:'#7A5C7A',status:'planning',
    desc:'Nonprofit. WA State. AOI filed. Supporting Olivia — first year widowhood. 501c3 pending. Olivia-led vision.',
    offer:'Ministry · reentry support · community · widows',
    goal:'501c3 filing · donation setup · mission statement',
    urls:[],repo:null},
  portal:{name:'My Life Portal',color:'#C4895A',status:'live',
    desc:'Personal OS hub. Hub and spoke architecture. All life sections in one place. Real-time across devices via D1 + Google Sheets.',
    offer:'Personal operating system — Faith · People · Habits · Home · Brain · GBB spoke',
    goal:'Zero Trust setup · Morning Alignment Agent · GBB admin spoke',
    urls:[{label:'Live Portal',url:'https://mylifeportal.pages.dev'},{label:'Projects',url:'https://mylifeportal.pages.dev/projects.html'}],
    repo:'mylifeportal'},
  home:{name:'Home',color:'#A89880',status:'ongoing',
    desc:'Household management — maintenance, errands, dogs, groceries, Seth coordination, home projects.',
    offer:'',goal:'Run the house smoothly',
    urls:[],repo:null},
  personal:{name:'Personal',color:'#6B8CB8',status:'ongoing',
    desc:'Personal health, faith practices, habits, self-care, and individual growth.',
    offer:'',goal:'Show up healthy and grounded',
    urls:[],repo:null},
  vision:{name:'The Vision',color:'#C4895A',status:'planning',
    desc:"Land. Community. Family. Faith. A self-sustaining place where God's work gets done and people are cared for.",
    offer:'',goal:"Own land, build community, do God's work",
    urls:[],repo:null}
};

// DEFAULT TASKS
var DEFAULT_TASKS=[
  // GBB — income first
  {id:'g1',title:'Connect Google Places API key to prospect audit tool',project:'gbb',status:'todo',priority:'high',due:'',time:1,assignee:'rebecca',description:'console.cloud.google.com → enable Places API → get key → paste into prospecting-audit-tool.html. This makes the audit tool pull live data automatically.',checklist:[{text:'Go to console.cloud.google.com',done:false},{text:'Enable Places API',done:false},{text:'Generate API key',done:false},{text:'Paste into audit tool HTML',done:false}],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'g2',title:'Define and document GBB Visibility Audit offer — $297',project:'gbb',status:'inprogress',priority:'high',due:'',time:2,assignee:'rebecca',description:'Productized offer: research a business, run audit, deliver branded PDF snapshot, walk through on 45min Zoom. No domain needed. Calendly already set up.',checklist:[{text:'Write what client gets (deliverables)',done:false},{text:'Write delivery process step by step',done:false},{text:'Create Calendly event for audit call',done:false},{text:'Draft outreach message template',done:false}],comments:[{text:'Offer framework: research → audit tool → Canva PDF → Zoom debrief → next steps CTA',date:'2026-05-05'}],blocker:'',archived:false,created:Date.now()},
  {id:'g3',title:'Build GBB Visibility Snapshot PDF template in Canva',project:'gbb',status:'todo',priority:'high',due:'',time:3,assignee:'rebecca',description:'5-page branded report. Cover · Audit scores · Top 3 recommendations · 90-day action plan · Next steps CTA. Peony #C2738A leads.',checklist:[{text:'Cover page with client name + GBB brand',done:false},{text:'Audit score page (6 categories)',done:false},{text:'Top 3 recommendations page',done:false},{text:'90-day action plan page',done:false},{text:'Next steps + CTA page',done:false}],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'g4',title:'Follow up with Kelly — Graphic Arts Print Shop',project:'gbb',status:'todo',priority:'high',due:'',time:0.5,assignee:'rebecca',description:'Kelly is a long-time friend who has not responded to the welcome link. Follow up personally — phone or text. Keep it warm. She needs: reach · referral · recurring.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'g5',title:'Identify 10 prospect businesses to audit this week',project:'gbb',status:'backlog',priority:'high',due:'',time:2,assignee:'rebecca',description:'Local service businesses — contractors · roofers · home renovation · real estate · coaches · women entrepreneurs. Use prospecting audit tool. Not limited to local.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'g6',title:'Register getbookednbranded.com domain at Cloudflare (~$9-10)',project:'gbb',status:'blocked',priority:'high',due:'',time:0.5,assignee:'rebecca',description:'Can use pages.dev URL in the meantime — no blocker to selling. Domain just makes it cleaner.',checklist:[],comments:[],blocker:'Waiting on Seth for funds',archived:false,created:Date.now()},
  {id:'g7',title:'Build GBB admin portal with Cloudflare Zero Trust',project:'gbb',status:'backlog',priority:'med',due:'',time:8,assignee:'rebecca',description:'Client management · pipeline · revenue · prospect audit · build queue per client. Login button in GBB public site header. Link from portal Business tab.',checklist:[{text:'Create new Cloudflare Pages project',done:false},{text:'Set up Zero Trust policy',done:false},{text:'Build client management view',done:false},{text:'Build pipeline kanban',done:false},{text:'Add Login button to GBB public site header',done:false}],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'g8',title:'Build prospect outreach system — track who was contacted',project:'gbb',status:'backlog',priority:'med',due:'',time:3,assignee:'rebecca',description:'Who you contacted · when · what you sent · what happened · next follow-up date. Lives in GBB admin.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},

  // WTC — always parallel
  {id:'w1',title:'Set up Supabase project for WTC backend',project:'wtc',status:'todo',priority:'high',due:'',time:2,assignee:'rebecca',description:'supabase.com → rebeccaannexo@gmail.com → create project → name it wethechurch → note database URL + anon key.',checklist:[{text:'Create Supabase account at supabase.com',done:false},{text:'Create new project: wethechurch',done:false},{text:'Note project URL and anon key',done:false},{text:'Set up first table: users',done:false}],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'w2',title:'Complete Galatians Chapter 4 — pages + discussion questions',project:'wtc',status:'inprogress',priority:'high',due:'2026-05-11',time:3,assignee:'rebecca',description:'Same format as Chapter 3. Full chapter HTML + study notes + 5 discussion questions.',checklist:[{text:'Write chapter 4 study content',done:false},{text:'Write 5 discussion questions',done:false},{text:'Build HTML page',done:false},{text:'Test and review',done:false}],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'w3',title:'Complete Galatians Chapter 5',project:'wtc',status:'todo',priority:'high',due:'2026-05-18',time:3,assignee:'rebecca',description:'',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'w4',title:'Complete Galatians Chapter 6',project:'wtc',status:'todo',priority:'high',due:'2026-05-25',time:3,assignee:'rebecca',description:'',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'w5',title:'Convert WTC to PWA — manifest.json + service worker',project:'wtc',status:'backlog',priority:'high',due:'',time:4,assignee:'rebecca',description:'Installable on iPhone and Android. Works offline. Push notifications (iOS 16.4+).',checklist:[{text:'Create manifest.json',done:false},{text:'Create service worker',done:false},{text:'Add install prompt',done:false},{text:'Test on iPhone',done:false}],comments:[],blocker:'Supabase setup first',archived:false,created:Date.now()},
  {id:'w6',title:'Build WTC user auth — email + Google via Supabase',project:'wtc',status:'backlog',priority:'high',due:'',time:6,assignee:'rebecca',description:'',checklist:[],comments:[],blocker:'Needs Supabase setup first',archived:false,created:Date.now()},
  {id:'w7',title:'Build WTC admin panel at admin.wethechurch.pages.dev',project:'wtc',status:'backlog',priority:'high',due:'',time:8,assignee:'rebecca',description:'Add/edit studies · chapters · discussion questions · manage community · send push notifications.',checklist:[],comments:[],blocker:'Needs Supabase + auth first',archived:false,created:Date.now()},
  {id:'w8',title:'Connect WTC to portal Faith tab',project:'wtc',status:'backlog',priority:'med',due:'',time:3,assignee:'rebecca',description:'Show current study + upcoming session + prayer count in hub Faith tab.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'w9',title:'Galatians Chapter 3 — COMPLETE',project:'wtc',status:'done',priority:'high',due:'',time:0,assignee:'rebecca',description:'Complete. Live at wethechurch.pages.dev',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},

  // ALIGNED LIFE — paused behind GBB
  {id:'a1',title:'"What God Says About You" section → Workbook Part 1',project:'aligned',status:'backlog',priority:'high',due:'',time:3,assignee:'rebecca',description:'',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'a2',title:'Values / True Aim / Anti-Vision → Life Plan (source: Aligned_Life.odt)',project:'aligned',status:'backlog',priority:'high',due:'',time:2,assignee:'rebecca',description:'',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'a3',title:'Merge Q2 files → master PDF + separate daily pages PDF',project:'aligned',status:'backlog',priority:'high',due:'',time:3,assignee:'rebecca',description:'Digital product structure: one master Q2 PDF + separate loose daily pages PDF. Instruction page directs buyers to Staples for discbound binding at 5.5x8.5" color.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'a4',title:'GoHighLevel 14-day trial — hold until assets ready',project:'aligned',status:'backlog',priority:'high',due:'',time:1,assignee:'rebecca',description:'Do NOT start the trial until content and direction are ready. Trial is the only shot. Set up 3 business emails when trial starts.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'a5',title:'Workbook Part 1 — 10 sections COMPLETE ✓',project:'aligned',status:'done',priority:'high',due:'',time:0,assignee:'rebecca',description:'10 sections: Intro, S1 Faith, S2 Heart, S3 Story, S4 Wounds, S5 Gifts, S6 Wiring, S7 People, S8 Spiritual Gifts, S9 Purpose, S10 Final',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'a6',title:'Life Plan Part 2 — v4 COMPLETE ✓',project:'aligned',status:'done',priority:'high',due:'',time:0,assignee:'rebecca',description:'life_plan_v4.docx — 12 sections including Life Wheel, Life Pillars, Long-Range Vision, Legacy, Goals by Pillar, etc.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'a7',title:'Daily Pages Part 3 — v4 COMPLETE ✓',project:'aligned',status:'done',priority:'high',due:'',time:0,assignee:'rebecca',description:'4 pages/day. P1: Today/Morning. P2: Action & Execution. P3: Notes & Thinking Space. P4: Evening & Reflection.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},

  // MUSTARD SEED
  {id:'m1',title:'Articles of Incorporation filed — WA SOS ✓',project:'mustard',status:'done',priority:'high',due:'',time:0,assignee:'rebecca',description:'Complete. AOI filed with Washington Secretary of State.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'m2',title:'501c3 filing — Washington State',project:'mustard',status:'todo',priority:'high',due:'',time:4,assignee:'rebecca',description:'',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'m3',title:'Set up donation acceptance',project:'mustard',status:'backlog',priority:'high',due:'',time:2,assignee:'rebecca',description:'',checklist:[],comments:[],blocker:'Needs 501c3 first',archived:false,created:Date.now()},
  {id:'m4',title:'Write mission statement + founding documents',project:'mustard',status:'todo',priority:'high',due:'',time:3,assignee:'rebecca',description:'Olivia-led vision. Supporting women in widowhood, reentry, recovery.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},

  // PORTAL
  {id:'p1',title:'Set up Cloudflare Zero Trust on mylifeportal.pages.dev',project:'portal',status:'todo',priority:'high',due:'',time:1,assignee:'rebecca',description:'Google login restricted to rebeccaannexo@gmail.com only. Zero Trust Access policy.',checklist:[{text:'Go to Cloudflare dashboard → Access',done:false},{text:'Create application for mylifeportal.pages.dev',done:false},{text:'Set policy to allow rebeccaannexo@gmail.com',done:false}],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'p2',title:'Get Anthropic API key for brain dump processor',project:'portal',status:'todo',priority:'high',due:'',time:0.5,assignee:'rebecca',description:'~$5 credit · console.anthropic.com · plug into brain dump section in portal',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
  {id:'p3',title:'Connect WTC to portal Faith tab',project:'portal',status:'backlog',priority:'med',due:'',time:3,assignee:'rebecca',description:'Pull current study title + upcoming session date + prayer count into hub Faith tab.',checklist:[],comments:[],blocker:'Needs WTC Supabase backend first',archived:false,created:Date.now()},
  {id:'p4',title:'Build Morning Alignment Agent',project:'portal',status:'backlog',priority:'med',due:'',time:6,assignee:'rebecca',description:'Voice dump → Claude processes → routes to right sections (tasks · reminders · ideas · prayers · parking lot). Needs Anthropic API key.',checklist:[],comments:[],blocker:'Needs Anthropic API key',archived:false,created:Date.now()},
  {id:'p5',title:'Connect Google Calendar to appointments section',project:'portal',status:'backlog',priority:'med',due:'',time:4,assignee:'rebecca',description:'Read calendar events into portal appointments section. Real-time.',checklist:[],comments:[],blocker:'',archived:false,created:Date.now()},
];

// DEFAULT DECISIONS
var DEFAULT_DECISIONS=[
  {id:'d1',project:'portal',title:'Hub and spoke architecture — personal portal is the hub',why:'Personal OS stays personal. Each brand gets its own admin spoke. Data surfaces to hub as summaries. Clean separation between personal life and business.',alts:'Single monolithic app, completely separate apps with no connection',date:'2026-05-05'},
  {id:'d2',project:'portal',title:'Google Sheets as primary database — D1 parked until team needed',why:'D1 adds complexity for current solo scale. Sheets already set up, working. D1 deployed and ready — switch when GBB has team members needing real-time.',alts:'Cloudflare D1 now, Supabase, Firebase',date:'2026-05-05'},
  {id:'d3',project:'gbb',title:'GBB Visibility Audit at $297 — productized one-time deliverable',why:'Fastest path to cash from home. No domain needed. Audit tool already built. Calendly set up. Scales without ongoing time commitment. Each audit is a potential retainer.',alts:'Monthly retainer only, hourly consulting, done-for-you social management',date:'2026-05-05'},
  {id:'d4',project:'gbb',title:'GBB not limited to local clients — remote delivery via Zoom',why:'Rebecca has no car. Remote delivery removes that constraint entirely. Zoom + email + PDF is a complete delivery stack.',alts:'Local only, in-person discovery meetings required',date:'2026-05-05'},
  {id:'d5',project:'wtc',title:'WTC runs parallel to everything — never paused',why:'Ministry is not a business. It does not wait on income milestones. It runs on its own timeline regardless of GBB status.',alts:'Pause WTC until GBB profitable',date:'2026-05-05'},
  {id:'d6',project:'aligned',title:'Aligned Life paused behind GBB — GoHighLevel trial held',why:'GBB is fastest path to revenue with no upfront investment. Aligned Life needs GHL trial — hold until assets and direction are ready so the 14-day trial is used for execution not planning.',alts:'Start GHL trial now, focus on Aligned Life before GBB',date:'2026-05-05'},
  {id:'d7',project:'portal',title:'Priority order: GBB → WTC (parallel) → Aligned Life → Mustard Seed',why:'GBB = fastest revenue, no upfront cost, proven skills. WTC = ministry, never waits. Aligned Life = needs investment. Mustard Seed = needs 501c3 first.',alts:'Equal priority, Aligned Life first (existing product), WTC first',date:'2026-05-05'},
];

// DEFAULT SESSIONS
var DEFAULT_SESSIONS=[
  {id:'s1',date:'2026-05-05',title:'Full portal rebuild — D1 + contact cards + vCard import + project board',body:'Rebuilt People section as full contact card system with 5-tab detail panel (Contact Info · Notes · Prayer · Money · Activity). Added vCard import with bulk support. Switched DB layer to d1Save aliases pointing to Google Sheets. Fixed mobile sidebar (solid background + overlay). Fixed all dropdown colors. Added prominent import banner below contact grid. Built Trello-level project board with card drill-down, checklists, comments, drag-and-drop, session log, decisions, infra.'},
  {id:'s2',date:'2026-05-05',title:'Infrastructure setup — D1 · Worker · Cloudflare Pages · GitHub',body:'Set up Cloudflare D1 database (rebecca-portal, 25 tables deployed). Deployed Cloudflare Worker API at rebecca-portal-api.rebeccaannexo.workers.dev. Set up nvm + Node.js + Wrangler. Connected GitHub repos to Cloudflare Pages auto-deploy. Apps Script Web App deployed at current URL. Added anniversary · website · country columns to people table.'},
  {id:'s3',date:'2026-05-05',title:'Portal features — habits · shopping · daily log · priority linking · Need To',body:'Built Health & Habits with gamification (points · streaks · rewards). Built Shopping with Seth share link (?shared=1). Built daily log bullet journal. Added flip clock + NLT scriptures (111 verses, full year). Added Need To widget with contact linking and activity logging. Added full priority system with task linking, carry forward, points, income double-points. Added At a Glance above Habits Today.'},
];

// INFRA
var INFRA=[
  {name:'My Life Portal',url:'https://mylifeportal.pages.dev',service:'Cloudflare Pages',cost:'Free',status:'active',notes:'Personal OS · GitHub: mylifeportal'},
  {name:'GBB Public Site',url:'https://getbookednbranded.pages.dev',service:'Cloudflare Pages',cost:'Free',status:'active',notes:'GitHub: getbookednbranded'},
  {name:'GBB Prospect Audit Tool',url:'https://getbookednbranded.pages.dev/prospecting-audit-tool.html',service:'Cloudflare Pages',cost:'Free',status:'active',notes:'Needs Google Places API key to pull live data'},
  {name:'We The Church',url:'https://wethechurch.pages.dev',service:'Cloudflare Pages',cost:'Free',status:'active',notes:'GitHub: wethechurch · needs Supabase backend'},
  {name:'Google Sheets Database',url:'https://docs.google.com/spreadsheets/d/1hsUIV99MoU9p8fAoZiX4igf8oxpQmwGXJPF0JFj_eTg',service:'Google Sheets',cost:'Free',status:'active',notes:'lifehub_Rebecca · primary portal database'},
  {name:'Apps Script Web App',url:'https://script.google.com/macros/s/AKfycbynyi3DsQZDwOHZg_Ue0HBdlMJtQ2BN4JeBPRMAW6vBBETAm_TuJNV48602D8snAQVJ/exec',service:'Google Apps Script',cost:'Free',status:'active',notes:'Current deployment · portal read/write API'},
  {name:'D1 Worker API',url:'https://rebecca-portal-api.rebeccaannexo.workers.dev',service:'Cloudflare Workers',cost:'Free',status:'active',notes:'Worker ID: 51a57480 · D1 connected · Current Version: 51a57480'},
  {name:'D1 Database',url:'https://dash.cloudflare.com',service:'Cloudflare D1',cost:'Free',status:'active',notes:'ID: 10cd4914-4514-403c-9a1d-d76fc60399c9 · 25 tables deployed'},
  {name:'GitHub',url:'https://github.com/rebeccaanne-xo',service:'GitHub',cost:'Free',status:'active',notes:'Repos: mylifeportal · getbookednbranded · wethechurch · rebecca-portal-api'},
  {name:'Calendly',url:'https://calendly.com/rebeccaannexo/meet',service:'Calendly',cost:'Free',status:'active',notes:'GBB discovery + audit calls'},
  {name:'Claude.ai',url:'https://claude.ai',service:'Anthropic',cost:'$20/mo',status:'active',notes:'Primary build tool · Sonnet 4.6'},
  {name:'Google Cloud Console',url:'https://console.cloud.google.com',service:'Google Cloud',cost:'Free tier',status:'active',notes:'Places API needed for GBB audit tool'},
  {name:'Supabase (WTC)',url:'https://supabase.com',service:'Supabase',cost:'Free',status:'planning',notes:'Needed for WTC user accounts + backend'},
  {name:'GoHighLevel',url:'https://gohighlevel.com',service:'GoHighLevel',cost:'$97/mo',status:'planning',notes:'14-day trial NOT started · hold until Aligned Life assets ready'},
  {name:'Beehiiv',url:'https://wethechurch.beehiiv.com',service:'Beehiiv',cost:'Free',status:'active',notes:'WTC newsletter'},
];

// STATE
var currentView='projects';
var currentFilter='all';
var currentSort='project';
var draggedId=null;
var activeCardId=null;

var D1_URL = 'https://rebecca-portal-api.rebeccaannexo.workers.dev';
var _tasksCache = null;
var _tasksLoaded = false;

function getTasks(){
  var cached = _tasksCache || JSON.parse(localStorage.getItem('pb_tasks')||'null') || DEFAULT_TASKS;
  return cached.filter(function(t){return !t.archived;});
}
function getAllTasks(){
  return _tasksCache || JSON.parse(localStorage.getItem('pb_tasks')||'null') || DEFAULT_TASKS;
}
function saveTasks(t){
  _tasksCache = t;
  localStorage.setItem('pb_tasks', JSON.stringify(t));
}

// Load tasks from D1 on startup
async function loadTasksFromD1(){
  try {
    var resp = await fetch(D1_URL + '?table=tasks&t=' + Date.now());
    var data = await resp.json();
    if(data.success && data.data && data.data.length > 0){
      var mapped = data.data.map(function(t){
        // Look in cache first, then DEFAULT_TASKS for checklist/comments/description
        var existing = getAllTasks().find(function(x){return String(x.id)===String(t.id);});
        var defaultTask = DEFAULT_TASKS.find(function(x){return String(x.id)===String(t.id);});
        var source = existing || defaultTask || {};
        return {
          id: t.id,
          title: t.text || t.title || source.title || '',
          project: mapSectionToProject(t.section || t.project || 'personal'),
          status: t.status || source.status || 'backlog',
          priority: t.priority || source.priority || 'med',
          priority_flag: t.priority_flag || source.priority_flag || '',
          block: t.block || source.block || '',
          due: t.due_date || t.due || source.due || '',
          time: parseFloat(t.time_estimate || t.time) || source.time || 0,
          assignee: t.assignee || source.assignee || 'rebecca',
          description: t.description || t.notes || source.description || '',
          // Preserve rich data from local sources
          checklist: source.checklist || [],
          comments: source.comments || [],
          blocker: t.blocker || source.blocker || '',
          archived: t.archived === 1 || t.archived === true || false,
          done: t.done === 1 || t.done === true || false,
          created: t.created_at ? new Date(t.created_at).getTime() : (source.created || Date.now())
        };
      });

      // D1 is source of truth — don't merge local tasks
      var combined = mapped;

      saveTasks(combined);
      _tasksLoaded = true;
      render();
      console.log('Loaded ' + mapped.length + ' tasks from D1');
    } else {
      // D1 is empty — seed defaults
      console.log('D1 has no tasks — seeding defaults');
      await seedDefaultTasksToD1();
    }
  } catch(e) {
    console.log('D1 task load failed:', e.message);
  }
}

// Seed default tasks to D1 if it's empty
async function seedDefaultTasksToD1(){
  var tasks = DEFAULT_TASKS;
  for(var i=0; i<tasks.length; i++){
    await syncTaskToD1(tasks[i]);
  }
  saveTasks(tasks);
  render();
  console.log('Seeded ' + tasks.length + ' default tasks to D1');
}

function mapSectionToProject(section){
  if(!section) return 'personal';
  var s = section.toLowerCase();
  var map = {
    gbb:'gbb', biz_tasks:'gbb', business:'gbb', biz:'gbb',
    wtc:'wtc', wtc_tasks:'wtc', mission_wtc:'wtc',
    aligned:'aligned', al_tasks:'aligned', aligned_life:'aligned', mission_aligned:'aligned',
    mustard:'mustard', ms_tasks:'mustard', mustard_seed:'mustard', mission_mustard:'mustard',
    portal:'portal',
    home:'home', hl_tasks:'home', homelife:'home', home_life:'home', household:'home',
    errands:'home', seth:'home', dogs:'home',
    personal:'personal', followup_list:'personal', followup:'personal',
    health:'personal', habits:'personal', faith_personal:'personal',
    vision:'vision', the_vision:'vision'
  };
  var result = map[s] || null;
  if(!result && ['gbb','wtc','aligned','mustard','portal','home','personal','vision'].includes(s)){
    result = s;
  }
  return result || 'personal';
}

// Write task change to D1
async function syncTaskToD1(task) {
  var projectToSection = {
    gbb:'gbb', wtc:'wtc', aligned:'aligned',
    mustard:'mustard', portal:'portal',
    home:'home', personal:'personal', vision:'vision'
  };
  try {
    await fetch(D1_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        action:'upsert',
        table:'tasks',
        data:{
          id: String(task.id),
          text: task.title || '',
          section: projectToSection[task.project] || task.project || 'personal',
          status: task.status || 'backlog',
          done: (task.done||task.status==='done') ? 1 : 0,
          priority: task.priority || 'med',
          priority_flag: task.priority_flag || '',
          block: task.block || '',
          due_date: task.due || '',
          time_estimate: task.time || 0,
          assignee: task.assignee || 'rebecca',
          description: task.description || '',
          blocker: task.blocker || '',
          archived: task.archived ? 1 : 0
        }
      })
    });
  } catch(e) {
    console.log('D1 sync failed:', e.message);
  }
}

// Delete task from D1
async function deleteTaskFromD1(id){
  try {
    await fetch(D1_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'delete', table:'tasks', id:String(id)})
    });
  } catch(e){}
}
function getDecisions(){return ld('decisions',DEFAULT_DECISIONS);}
function getSessions(){return ld('sessions',DEFAULT_SESSIONS);}

// NAVIGATION
var VTITLES={projects:'Projects',today:'Today',kanban:'Kanban Board',list:'All Tasks',decisions:'Decisions Log',sessions:'Session Log',infra:'Infrastructure'};
var TAB_IDS=['projects','kanban','today','decisions','sessions','infra'];

function switchView(id,btn){
  currentView=id;
  document.querySelectorAll('.nav-btn').forEach(function(b){b.classList.remove('active');});
  if(btn) btn.classList.add('active');
  document.querySelectorAll('.view-tab').forEach(function(t){
    var oc = t.getAttribute('onclick') || '';
    if(oc.includes("'"+id+"'")) t.classList.add('active'); else t.classList.remove('active');
  });
  var titleEl = document.getElementById('view-title');
  if(titleEl) titleEl.textContent=VTITLES[id]||id;
  document.querySelectorAll('.view').forEach(function(v){v.classList.remove('active');});
  var el=document.getElementById('view-'+id);
  if(el) el.classList.add('active');
  // Sync rail icons
  document.querySelectorAll('.icon-rail .rail-icon').forEach(function(r){r.classList.remove('active');});
  var viewIconMap={projects:0,today:1,kanban:2,list:3,decisions:4,sessions:5,infra:6};
  var icons=document.querySelectorAll('.icon-rail .rail-icon');
  var idx=viewIconMap[id];
  if(idx!==undefined && icons[idx]) icons[idx].classList.add('active');
  render();
}

function switchViewTab(id){
  switchView(id,null);
  // also highlight sidebar btn
  document.querySelectorAll('.nav-btn').forEach(function(b){
    if(b.onclick&&b.onclick.toString().includes("'"+id+"'")) b.classList.add('active');
  });
}

function render(){
  switch(currentView){
    case 'projects':renderProjects();break;
    case 'today':renderToday();break;
    case 'kanban':renderKanban();break;
    case 'list':renderList();break;
    case 'decisions':renderDecisions();break;
    case 'sessions':renderSessions();break;
    case 'infra':renderInfra();break;
  }
  updateCounts();
}

function setFilter(f,el){
  currentFilter=f;
  document.querySelectorAll('.proj-pill').forEach(function(p){p.classList.remove('active');});
  if(el) el.classList.add('active');
  // Update breadcrumb
  updateBreadcrumb();
  render();
}

function updateBreadcrumb(){
  var crumb = document.getElementById('filter-crumb');
  if(!crumb) return;
  if(currentFilter==='all'){
    crumb.style.display='none';
  } else {
    var proj = PROJECTS[currentFilter];
    var color = proj ? proj.color : '#fff';
    var name = proj ? proj.name : currentFilter;
    crumb.style.display='inline-flex';
    crumb.style.cssText='display:inline-flex;align-items:center;gap:.25rem;font-size:12px;padding:.2rem .6rem .2rem .35rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:999px';
    crumb.innerHTML =
      '<span style="color:rgba(255,255,255,.3);font-size:10px">›</span>'+
      '<span style="color:'+color+';font-weight:600">'+name+'</span>'+
      '<button id="crumb-clear-btn" onclick="clearFilter()" style="background:none;border:none;color:rgba(255,255,255,.3);cursor:pointer;font-size:13px;padding:0 0 0 .15rem;line-height:1">✕</button>';
  }
}

function clearFilter(){
  currentFilter='all';
  document.querySelectorAll('.proj-pill').forEach(function(p){
    p.classList.toggle('active', p.querySelector('.proj-dot') && p.querySelector('.proj-dot').style.background.includes('255,255,255'));
  });
  document.querySelector('.proj-pill').classList.add('active');
  updateBreadcrumb();
  render();
}

function getFiltered(){
  var t=getTasks();
  return currentFilter==='all'?t:t.filter(function(x){return x.project===currentFilter;});
}

// DUE DATE HELPER
function dueInfo(due){
  if(!due) return null;
  var today=new Date();today.setHours(0,0,0,0);
  var d=new Date(due);
  var diff=d-today;
  var text=d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  if(diff<0) return {text:text,cls:'overdue'};
  if(diff<3*24*60*60*1000) return {text:text,cls:'soon'};
  return {text:text,cls:''};
}

// RENDER PROJECTS
function renderProjects(){
  var tasks=getAllTasks();
  var grid=document.getElementById('projects-grid');
  grid.innerHTML='';
  Object.keys(PROJECTS).forEach(function(key){
    var p=PROJECTS[key];
    var pt=tasks.filter(function(t){return t.project===key;});
    var done=pt.filter(function(t){return t.status==='done';}).length;
    var total=pt.length;
    var pct=total>0?Math.round(done/total*100):0;
    var inprog=pt.filter(function(t){return t.status==='inprogress';}).length;
    var blocked=pt.filter(function(t){return t.status==='blocked';}).length;
    var sc={live:'s-live',building:'s-building',paused:'s-paused',planning:'s-planning'}[p.status]||'s-planning';
    var linksHtml=(p.urls||[]).map(function(u){return '<a class="proj-link" href="'+u.url+'" target="_blank" onclick="event.stopPropagation()">'+esc(u.label)+'</a>';}).join('');
    if(p.repo) linksHtml+='<a class="proj-link" href="https://github.com/rebeccaanne-xo/'+p.repo+'" target="_blank" onclick="event.stopPropagation()">GitHub</a>';
    var card=document.createElement('div');
    card.className='proj-card';
    card.onclick=function(){setFilter(key,null);switchView('kanban',null);};
    // Edit button
    card.style.position='relative';
    card.innerHTML=
      '<div class="proj-card-bar" style="background:'+p.color+'"></div>'+
      '<div class="proj-card-top"><div class="proj-name">'+esc(p.name)+'</div><span class="status-badge '+sc+'">'+p.status+'</span></div>'+
      '<div class="proj-desc">'+esc(p.desc)+'</div>'+
      (p.offer?'<div style="font-size:11px;color:rgba(255,255,255,.35);margin-bottom:.6rem;padding:.38rem .6rem;background:rgba(255,255,255,.04);border-radius:6px;border-left:2px solid '+p.color+'">'+esc(p.offer)+'</div>':'')+
      (p.goal?'<div style="font-size:10px;color:rgba(255,255,255,.28);margin-bottom:.6rem">🎯 '+esc(p.goal)+'</div>':'')+
      '<div class="proj-stats">'+
        '<div class="proj-stat"><div class="proj-stat-val">'+total+'</div><div class="proj-stat-label">Tasks</div></div>'+
        '<div class="proj-stat"><div class="proj-stat-val" style="color:var(--amber)">'+inprog+'</div><div class="proj-stat-label">Active</div></div>'+
        '<div class="proj-stat"><div class="proj-stat-val" style="color:#F1948A">'+blocked+'</div><div class="proj-stat-label">Blocked</div></div>'+
      '</div>'+
      '<div class="proj-progress-wrap">'+
        '<div class="proj-progress-label"><span>'+pct+'% complete</span><span>'+done+'/'+total+'</span></div>'+
        '<div class="proj-progress-bar"><div class="proj-progress-fill" style="width:'+pct+'%;background:'+p.color+'"></div></div>'+
      '</div>'+
      '<div class="proj-links">'+linksHtml+'</div>';
    // Add edit button after innerHTML
    var editBtn=document.createElement('button');
    editBtn.textContent='✏️';
    editBtn.title='Edit project';
    editBtn.style.cssText='position:absolute;bottom:.6rem;right:.6rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:5px;padding:2px 6px;cursor:pointer;font-size:10px;z-index:2;opacity:.5;transition:opacity .15s';
    editBtn.onmouseover=function(){this.style.opacity='1'};
    editBtn.onmouseout=function(){this.style.opacity='.5'};
    editBtn.onclick=function(e){e.stopPropagation();openProjEdit(key);};
    card.appendChild(editBtn);
    grid.appendChild(card);
  });
}

// RENDER KANBAN
function renderKanban(){
  // Show back bar when filtered to a specific project
  var backBar = document.getElementById('kanban-back-bar');
  var projLabel = document.getElementById('kanban-proj-label');
  if(backBar){
    if(currentFilter !== 'all'){
      backBar.style.display='flex';
      var proj = PROJECTS[currentFilter];
      if(projLabel && proj) projLabel.textContent = proj.name + ' · ' + getFiltered().filter(function(t){return t.status!=='done';}).length + ' open tasks';
    } else {
      backBar.style.display='none';
    }
  }
  var tasks=getFiltered();
  ['backlog','todo','inprogress','blocked','done'].forEach(function(s){
    var col=document.getElementById('col-'+s);
    col.innerHTML='';
    var ct=tasks.filter(function(t){return t.status===s;});
    document.getElementById('kc-'+s).textContent=ct.length;
    ct.forEach(function(t){col.appendChild(makeCard(t));});
  });
}

function makeCard(task){
  var div=document.createElement('div');
  div.className='task-card';
  div.dataset.id=task.id;
  div.draggable=true;
  div.style.borderLeftColor=PC[task.project]||'transparent';
  var due=dueInfo(task.due);
  var cl=task.checklist||[];
  var clDone=cl.filter(function(c){return c.done;}).length;
  var comments=(task.comments||[]).length;
  var footer='';
  if(cl.length) footer+='<span class="task-footer-item">✅ '+clDone+'/'+cl.length+'</span>';
  if(comments) footer+='<span class="task-footer-item">💬 '+comments+'</span>';
  if(task.time) footer+='<span class="task-footer-item">⏱ '+task.time+'h</span>';
  if(task.blocker) footer+='<span class="task-footer-item" style="color:#F1948A">🔴 blocked</span>';
  var pfBadge = task.priority_flag ? '<span class="task-proj-tag" style="background:rgba(255,255,255,.1);color:#fff;margin-left:auto">P'+task.priority_flag+'</span>' : '';
  div.innerHTML=
    '<div class="task-prio-dot" style="background:'+(PR[task.priority]||'#888')+'"></div>'+
    '<div class="task-card-title">'+esc(task.title)+'</div>'+
    '<div class="task-card-meta">'+
      '<span class="task-proj-tag" style="background:'+(PC[task.project]||'#A89880')+'20;color:'+(PC[task.project]||'#A89880')+'">'+( PN[task.project]||task.project||'General')+'</span>'+
      (due?'<span class="task-due-tag '+due.cls+'">📅 '+due.text+'</span>':'')+
    '</div>'+
    (footer?'<div class="task-card-footer">'+footer+'</div>':'');
  div.addEventListener('click',function(e){if(!e.target.classList.contains('task-prio-dot'))openCard(String(task.id));});
  div.addEventListener('dragstart',function(e){draggedId=task.id;div.classList.add('dragging');e.dataTransfer.effectAllowed='move';});
  div.addEventListener('dragend',function(){div.classList.remove('dragging');});
  return div;
}

function onDragOver(e){e.preventDefault();}
function onDrop(e,status){
  e.preventDefault();
  if(!draggedId) return;
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==draggedId;});
  if(task){
    task.status=status;
    if(status==='done') task.done=true;
    task.updated=Date.now();
    saveTasks(tasks);
    syncTaskToD1(task);
    renderKanban();
    updateCounts();
    showToast('Moved → '+SL[status]+' ✓');
  }
  draggedId=null;
}

// CARD DETAIL
function openCard(id){
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return String(t.id)===String(id);});
  if(!task){console.log('Task not found:',id);return;}
  activeCardId=id;
  var color=PC[task.project]||'#C2738A';
  document.getElementById('cm-color-bar').style.background=color;
  document.getElementById('cm-title').value=task.title||'';
  document.getElementById('cm-proj-label').textContent=(PROJECTS[task.project]||{name:task.project}).name+' · '+SL[task.status||'backlog'];
  document.getElementById('cm-desc').value=task.description||'';
  document.getElementById('cm-status').value=task.status||'backlog';
  document.getElementById('cm-priority').value=task.priority||'med';
  document.getElementById('cm-project').value=task.project||'gbb';
  document.getElementById('cm-due').value=task.due||'';
  document.getElementById('cm-time').value=task.time||'';
  document.getElementById('cm-assignee').value=task.assignee||'rebecca';
  document.getElementById('cm-blocker').value=task.blocker||'';
  var pfEl2=document.getElementById('cm-priority-flag');
  if(pfEl2) pfEl2.value=task.priority_flag||'';
  var blEl2=document.getElementById('cm-block');
  if(blEl2) blEl2.value=task.block||'';
  renderChecklist(task);
  renderComments(task);
  document.getElementById('card-modal').classList.add('open');
}

function saveField(field){
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==activeCardId;});
  if(!task) return;
  var elIds={title:'cm-title',description:'cm-desc',status:'cm-status',priority:'cm-priority',project:'cm-project',due:'cm-due',time:'cm-time',assignee:'cm-assignee',blocker:'cm-blocker',priority_flag:'cm-priority-flag',block:'cm-block'};
  var el=document.getElementById(elIds[field]);
  if(!el) return;
  task[field]=el.value;
  if(field==='time') task[field]=parseFloat(el.value)||0;
  task.updated=Date.now();
  saveTasks(tasks);
  syncTaskToD1(task);
  document.getElementById('cm-proj-label').textContent=(PROJECTS[task.project]||{name:task.project}).name+' · '+SL[task.status||'backlog'];
  if(field==='status'||field==='project') render();
}

function renderChecklist(task){
  var items=task.checklist||[];
  var done=items.filter(function(c){return c.done;}).length;
  var pct=items.length?Math.round(done/items.length*100):0;
  document.getElementById('cm-cl-pct').textContent=pct+'%';
  document.getElementById('cm-cl-bar').style.width=pct+'%';
  var list=document.getElementById('cm-checklist');
  list.innerHTML='';
  items.forEach(function(item,idx){
    var div=document.createElement('div');
    div.className='checklist-item'+(item.done?' cl-done':'');
    var cb=document.createElement('input');cb.type='checkbox';cb.checked=item.done;
    cb.onchange=function(){toggleCl(idx,this.checked);};
    var txt=document.createElement('input');txt.className='cl-text';txt.value=item.text;
    txt.onblur=function(){editCl(idx,this.value);};
    var del=document.createElement('button');del.className='cl-del';del.textContent='✕';
    del.onclick=function(){delCl(idx);};
    div.appendChild(cb);div.appendChild(txt);div.appendChild(del);
    list.appendChild(div);
  });
}

function addClItem(){
  var input=document.getElementById('cm-cl-input');
  var text=input.value.trim();if(!text)return;
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==activeCardId;});
  if(!task)return;if(!task.checklist)task.checklist=[];
  task.checklist.push({text:text,done:false});
  saveTasks(tasks);renderChecklist(task);input.value='';
}

function toggleCl(idx,checked){
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==activeCardId;});
  if(task&&task.checklist&&task.checklist[idx]!==undefined){
    task.checklist[idx].done=checked;saveTasks(tasks);renderChecklist(task);
  }
}

function editCl(idx,text){
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==activeCardId;});
  if(task&&task.checklist&&task.checklist[idx]!==undefined){
    task.checklist[idx].text=text;saveTasks(tasks);
  }
}

function delCl(idx){
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==activeCardId;});
  if(task&&task.checklist){task.checklist.splice(idx,1);saveTasks(tasks);renderChecklist(task);}
}

function renderComments(task){
  var comments=task.comments||[];
  var list=document.getElementById('cm-comments');list.innerHTML='';
  comments.forEach(function(c){
    var div=document.createElement('div');div.className='comment-item';
    div.innerHTML='<div class="comment-meta"><span>Rebecca</span><span>'+esc(c.date)+'</span></div><div class="comment-text">'+esc(c.text)+'</div>';
    list.appendChild(div);
  });
}

function addComment(){
  var input=document.getElementById('cm-comment');
  var text=input.value.trim();if(!text)return;
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==activeCardId;});
  if(!task)return;if(!task.comments)task.comments=[];
  task.comments.push({text:text,date:new Date().toLocaleDateString()});
  saveTasks(tasks);renderComments(task);input.value='';showToast('Comment added ✓');
}

function archiveCard(){
  if(!confirm('Archive this task?'))return;
  var tasks=getAllTasks();
  var task=tasks.find(function(t){return t.id==activeCardId;});
  if(task){task.archived=true;saveTasks(tasks);syncTaskToD1(task);}
  closeCardModal();render();showToast('Archived');
}

function deleteCard(){
  if(!confirm('Delete permanently?'))return;
  var delId = activeCardId;
  saveTasks(getAllTasks().filter(function(t){return t.id!=delId;}));
  deleteTaskFromD1(delId);
  closeCardModal();render();showToast('Deleted');
}

function closeCardModal(){
  var modal = document.getElementById('card-modal');
  if(modal) modal.classList.remove('open');
  activeCardId=null;
  render();
}

// ADD TASK
function openAddTask(){document.getElementById('add-task-modal').classList.add('open');}
function saveNewTask(){
  var title=document.getElementById('at-title').value.trim();
  if(!title){showToast('Enter a title');return;}
  var pfEl = document.getElementById('at-priority-flag');
  var blEl = document.getElementById('at-block');
  var task={
    id:'t'+Date.now(),title,
    project:document.getElementById('at-project').value,
    status:document.getElementById('at-status').value,
    priority:document.getElementById('at-priority').value,
    priority_flag: pfEl ? pfEl.value : '',
    block: blEl ? blEl.value : '',
    due:document.getElementById('at-due').value,
    time:parseFloat(document.getElementById('at-time').value)||0,
    assignee:document.getElementById('at-assignee').value,
    description:document.getElementById('at-desc').value.trim(),
    checklist:[],comments:[],blocker:'',archived:false,created:Date.now()
  };
  var tasks=getAllTasks();tasks.push(task);saveTasks(tasks);
  syncTaskToD1(task);
  closeModal('add-task-modal');
  ['at-title','at-desc','at-due','at-time'].forEach(function(id){document.getElementById(id).value='';});
  render();showToast('Task added ✓');
}

// LIST
function renderList(){
  var tasks=getFiltered();
  var search=document.getElementById('list-search').value.toLowerCase();
  if(search) tasks=tasks.filter(function(t){return (t.title||'').toLowerCase().includes(search)||(t.description||'').toLowerCase().includes(search);});
  tasks=tasks.slice().sort(function(a,b){
    if(currentSort==='priority'){var po={high:0,med:1,low:2};return (po[a.priority]||1)-(po[b.priority]||1);}
    if(currentSort==='due'){return ((a.due||'9999')>(b.due||'9999'))?1:-1;}
    if(currentSort==='status'){var so={inprogress:0,blocked:1,todo:2,backlog:3,done:4};return (so[a.status]||3)-(so[b.status]||3);}
    if(currentSort==='updated'){return (b.updated||b.created||0)-(a.updated||a.created||0);}
    return (a.project||'').localeCompare(b.project||'');
  });
  var tbody=document.getElementById('list-body');tbody.innerHTML='';
  tasks.forEach(function(task){
    var tr=document.createElement('tr');tr.className='list-row';
    tr.onclick=function(){openCard(task.id);};
    var color=PC[task.project]||'#fff';
    var due=dueInfo(task.due);
    tr.innerHTML=
      '<td style="max-width:280px"><div style="font-weight:500">'+esc(task.title)+'</div>'+
      (task.description?'<div style="font-size:10px;color:rgba(255,255,255,.26);margin-top:1px">'+esc(task.description.substring(0,50))+'...</div>':'')+
      (task.blocker?'<div style="font-size:10px;color:#F1948A;margin-top:1px">🔴 '+esc(task.blocker)+'</div>':'')+'</td>'+
      '<td><span style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:999px;background:'+color+'20;color:'+color+'">'+( PN[task.project]||task.project||'General')+'</span></td>'+
      '<td><span style="font-size:10px;font-weight:600;padding:2px 7px;border-radius:999px;background:'+SC[task.status]+';color:#fff">'+SL[task.status]+'</span></td>'+
      '<td><span style="font-size:11px;font-weight:700;color:'+(PR[task.priority]||'#fff')+'">'+task.priority+'</span></td>'+
      '<td>'+(due?'<span class="task-due-tag '+due.cls+'" style="font-size:11px">'+due.text+'</span>':'<span style="color:rgba(255,255,255,.2)">—</span>')+'</td>'+
      '<td style="font-size:11px;color:rgba(255,255,255,.32)">'+(task.time?task.time+'h':'—')+'</td>';
    tbody.appendChild(tr);
  });
}

function setSort(by,btn){
  currentSort=by;
  document.querySelectorAll('.sort-pill').forEach(function(b){b.classList.remove('active');});
  if(btn) btn.classList.add('active');
  renderList();
}

// TODAY
function renderToday(){
  var tasks=getTasks();
  var today=new Date();today.setHours(0,0,0,0);
  var urgent=tasks.filter(function(t){return t.status!=='done'&&t.due&&new Date(t.due)<=today;});
  var inprog=tasks.filter(function(t){return t.status==='inprogress';});
  var high=tasks.filter(function(t){return t.priority==='high'&&t.status!=='done';}).slice(0,6);
  var done=tasks.filter(function(t){return t.status==='done';}).slice(0,5);
  renderTodaySec('today-urgent',urgent,'Nothing overdue 🎉');
  renderTodaySec('today-inprog',inprog,'Nothing in progress');
  renderTodaySec('today-high',high,'No high priority open tasks');
  renderTodaySec('today-done-list',done,'Nothing completed yet');
}

function renderTodaySec(id,tasks,empty){
  var el=document.getElementById(id);if(!el)return;el.innerHTML='';
  if(!tasks.length){el.innerHTML='<div style="font-size:11px;color:rgba(255,255,255,.2);font-style:italic;padding:.35rem 0">'+empty+'</div>';return;}
  tasks.forEach(function(task){
    var div=document.createElement('div');div.className='today-item';
    div.onclick=function(){openCard(task.id);};
    var color=PC[task.project]||'#fff';
    div.innerHTML='<div class="today-item-bar" style="background:'+color+'"></div><div><div class="today-item-title">'+esc(task.title)+'</div><div class="today-item-meta"><span style="color:'+color+'">'+PN[task.project]+'</span><span>'+SL[task.status]+'</span>'+(task.time?'<span>⏱'+task.time+'h</span>':'')+'</div></div>';
    el.appendChild(div);
  });
}

// DECISIONS
function renderDecisions(){
  var list=document.getElementById('decisions-list');list.innerHTML='';
  getDecisions().slice().reverse().forEach(function(d){
    var color=PC[d.project]||'#fff';
    var div=document.createElement('div');div.className='decision-card';
    div.innerHTML='<span class="dec-proj-tag" style="background:'+color+'20;color:'+color+'">'+PN[d.project]+'</span><div class="dec-title">'+esc(d.title)+'</div><div class="dec-why">'+esc(d.why)+'</div>'+(d.alts?'<div class="dec-alts">Alternatives: '+esc(d.alts)+'</div>':'')+'<div class="dec-date">'+esc(d.date)+'</div>';
    list.appendChild(div);
  });
}

function openAddDecision(){document.getElementById('add-decision-modal').classList.add('open');}
function saveDecision(){
  var title=document.getElementById('ad-title').value.trim();if(!title)return;
  var decisions=getDecisions();
  decisions.push({id:'d'+Date.now(),project:document.getElementById('ad-project').value,title,why:document.getElementById('ad-why').value.trim(),alts:document.getElementById('ad-alts').value.trim(),date:new Date().toISOString().split('T')[0]});
  sv('decisions',decisions);closeModal('add-decision-modal');
  ['ad-title','ad-why','ad-alts'].forEach(function(id){document.getElementById(id).value='';});
  renderDecisions();showToast('Decision logged ✓');
}

// SESSIONS
function renderSessions(){
  var list=document.getElementById('sessions-list');list.innerHTML='';
  getSessions().slice().reverse().forEach(function(s){
    var div=document.createElement('div');div.className='session-card';
    div.innerHTML='<div class="ses-date">'+esc(s.date)+'</div><div class="ses-title">'+esc(s.title)+'</div><div class="ses-body">'+esc(s.body)+'</div>';
    list.appendChild(div);
  });
}

function openAddSession(){document.getElementById('add-session-modal').classList.add('open');}
function saveSession(){
  var title=document.getElementById('as-title').value.trim();if(!title)return;
  var sessions=getSessions();
  sessions.push({id:'s'+Date.now(),date:new Date().toLocaleDateString(),title,body:document.getElementById('as-body').value.trim()});
  sv('sessions',sessions);closeModal('add-session-modal');
  ['as-title','as-body'].forEach(function(id){document.getElementById(id).value='';});
  renderSessions();showToast('Session logged ✓');
}

// INFRA
function renderInfra(){
  var grid=document.getElementById('infra-grid');grid.innerHTML='';
  INFRA.forEach(function(item){
    var div=document.createElement('div');div.className='infra-card';
    var sc={active:'i-active',parked:'i-parked',planning:'i-planning'}[item.status]||'i-planning';
    div.innerHTML='<div class="infra-name">'+esc(item.name)+'</div><a class="infra-url" href="'+item.url+'" target="_blank">'+esc(item.url.length>44?item.url.substring(0,44)+'...':item.url)+'</a><div class="infra-detail">'+esc(item.service)+' · '+esc(item.cost)+'</div><div class="infra-detail" style="margin-top:2px">'+esc(item.notes)+'</div><span class="infra-pill '+sc+'">'+item.status+'</span>';
    grid.appendChild(div);
  });
}

// COUNTS
function updateCounts(){
  var tasks=getTasks();
  var today=new Date();today.setHours(0,0,0,0);
  var ncTasks=document.getElementById('nc-tasks');
  if(ncTasks) ncTasks.textContent=tasks.filter(function(t){return t.status!=='done';}).length;
  var ncToday=document.getElementById('nc-today');
  if(ncToday) ncToday.textContent=tasks.filter(function(t){return t.status!=='done'&&t.due&&new Date(t.due)<=today;}).length;
  var allEl=document.getElementById('pf-all');
  if(allEl) allEl.textContent=tasks.filter(function(t){return t.status!=='done';}).length;
  ['gbb','wtc','aligned','mustard','portal','home','personal','vision'].forEach(function(k){
    var el=document.getElementById('pf-'+k);
    if(el) el.textContent=tasks.filter(function(t){return t.project===k&&t.status!=='done';}).length;
  });
}

// MODAL
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.addEventListener('click',function(e){
  if(e.target.classList.contains('modal-overlay'))e.target.classList.remove('open');
  if(e.target.classList.contains('card-modal-overlay')){e.target.classList.remove('open');activeCardId=null;render();}
});

// TIME
setInterval(function(){var el=document.getElementById('time-badge');if(el)el.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});},1000);
document.getElementById('time-badge').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});

// TOAST
function showToast(msg){var t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},2500);}

function toggleNavPanel(){}
function closeNavPanel(){}

// rail icon sync is handled inside switchView directly

// INIT
// PROJECT EDITING
var activeProjKey = null;
var PROJECTS_CUSTOM = {};

function loadProjCustom(){
  try{ PROJECTS_CUSTOM = JSON.parse(localStorage.getItem('projects_custom')||'{}'); }catch(e){ PROJECTS_CUSTOM={}; }
  Object.keys(PROJECTS_CUSTOM).forEach(function(key){
    if(PROJECTS[key]) Object.assign(PROJECTS[key], PROJECTS_CUSTOM[key]);
  });
}

function saveProjCustom(){
  localStorage.setItem('projects_custom', JSON.stringify(PROJECTS_CUSTOM));
}

function openProjEdit(key){
  activeProjKey = key;
  var p = PROJECTS[key] || {};
  var modal = document.getElementById('proj-edit-modal');
  if(!modal) return;
  document.getElementById('pem-title').textContent = p.name || key;
  document.getElementById('pem-name').value = p.name || '';
  document.getElementById('pem-desc').value = p.desc || '';
  document.getElementById('pem-goal').value = p.goal || '';
  document.getElementById('pem-notes').value = p.notes || '';
  document.getElementById('pem-status').value = p.status || 'planning';
  var linksEl = document.getElementById('pem-links');
  linksEl.innerHTML = '';
  (p.urls||[]).forEach(function(u,i){
    var row = document.createElement('div');
    row.className = 'proj-link-row';
    row.innerHTML = '<input class="proj-link-input" placeholder="Label" value="'+(u.label||'')+'" onblur="saveProjLinkField('+i+',\'label\',this.value)"/>' +
      '<input class="proj-link-input" placeholder="https://..." value="'+(u.url||'')+'" onblur="saveProjLinkField('+i+',\'url\',this.value)"/>' +
      '<button onclick="removeProjLink('+i+')" style="background:none;border:none;color:rgba(255,255,255,.3);cursor:pointer;font-size:14px;padding:2px 6px">✕</button>';
    linksEl.appendChild(row);
  });
  modal.classList.add('open');
}

function closeProjEdit(){
  var modal = document.getElementById('proj-edit-modal');
  if(modal) modal.classList.remove('open');
  activeProjKey = null;
  renderProjects();
}

function saveProjField(field, value){
  if(!activeProjKey) return;
  if(!PROJECTS_CUSTOM[activeProjKey]) PROJECTS_CUSTOM[activeProjKey] = {};
  PROJECTS_CUSTOM[activeProjKey][field] = value;
  if(PROJECTS[activeProjKey]) PROJECTS[activeProjKey][field] = value;
  if(field==='name') document.getElementById('pem-title').textContent = value;
  saveProjCustom();
}

function saveProjLinkField(idx, field, value){
  if(!activeProjKey) return;
  if(!PROJECTS_CUSTOM[activeProjKey]) PROJECTS_CUSTOM[activeProjKey]={};
  if(!PROJECTS_CUSTOM[activeProjKey].urls) PROJECTS_CUSTOM[activeProjKey].urls=[];
  if(!PROJECTS_CUSTOM[activeProjKey].urls[idx]) PROJECTS_CUSTOM[activeProjKey].urls[idx]={};
  PROJECTS_CUSTOM[activeProjKey].urls[idx][field]=value;
  if(PROJECTS[activeProjKey]) PROJECTS[activeProjKey].urls=PROJECTS_CUSTOM[activeProjKey].urls;
  saveProjCustom();
}

function addProjLink(){
  if(!activeProjKey) return;
  if(!PROJECTS_CUSTOM[activeProjKey]) PROJECTS_CUSTOM[activeProjKey]={};
  if(!PROJECTS_CUSTOM[activeProjKey].urls) PROJECTS_CUSTOM[activeProjKey].urls=[];
  PROJECTS_CUSTOM[activeProjKey].urls.push({label:'',url:''});
  if(PROJECTS[activeProjKey]) PROJECTS[activeProjKey].urls=PROJECTS_CUSTOM[activeProjKey].urls;
  saveProjCustom();
  openProjEdit(activeProjKey);
}

function removeProjLink(idx){
  if(!activeProjKey) return;
  var urls=(PROJECTS_CUSTOM[activeProjKey]||{}).urls||[];
  urls.splice(idx,1);
  PROJECTS_CUSTOM[activeProjKey].urls=urls;
  if(PROJECTS[activeProjKey]) PROJECTS[activeProjKey].urls=urls;
  saveProjCustom();
  openProjEdit(activeProjKey);
}

function goToProjectKanban(){
  if(!activeProjKey) return;
  var key = activeProjKey;
  closeProjEdit();
  setFilter(key, null);
  switchViewTab('kanban');
}

loadProjCustom();
// Show DEFAULT_TASKS immediately so UI isn't empty
if(!localStorage.getItem('pb_tasks')){
  saveTasks(DEFAULT_TASKS);
}
render();
// Check URL for ?view= parameter
var urlParams = new URLSearchParams(window.location.search);
var startView = urlParams.get('view');
if(startView) switchView(startView, null);
// Then load fresh from D1
loadTasksFromD1();
// Auto-refresh every 60 seconds
setInterval(function(){loadTasksFromD1();}, 60000);
// ESC closes card modal
document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){
    var cardModal = document.getElementById('card-modal');
    if(cardModal && cardModal.classList.contains('open')){
      closeCardModal();
    }
  }
});
