/**
 * daily.js
 * ─────────────────────────────────────
 * Job:      Daily log and morning routine tracker — all interactivity and API calls
 * Connects: Loaded by daily/index.html · calls rebecca-portal-api Worker via fetch
 * Reads:    D1 database via Worker · user interactions
 * Returns:  Dynamic UI updates · data reads/writes
 */

var DB_URL='https://script.google.com/macros/s/AKfycbynyi3DsQZDwOHZg_Ue0HBdlMJtQ2BN4JeBPRMAW6vBBETAm_TuJNV48602D8snAQVJ/exec';
function sv(k,v){try{localStorage.setItem('log_'+k,JSON.stringify(v))}catch(e){}}
function ld(k,d){try{var x=localStorage.getItem('log_'+k);return x?JSON.parse(x):d}catch(e){return d}}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

var TODAY=new Date().toDateString();
var selectedSym='•';
var selectedType='task';
var selectedTags=[];
var currentFilter='all';

var SYM_COLORS={
  task:'var(--peony)',event:'var(--amber)',note:'rgba(255,255,255,.5)',
  priority:'#F1E56B',prayer:'var(--faith)',idea:'var(--sage)',migrated:'rgba(255,255,255,.3)'
};

var TAG_COLORS={
  home:'var(--amber)',business:'var(--peony)',faith:'var(--faith)',
  people:'var(--teal)',mission:'var(--sage)',health:'#82C4B5'
};

// ══ INIT ══
function init(){
  var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var d=new Date();
  document.getElementById('today-badge').textContent=days[d.getDay()]+' · '+months[d.getMonth()]+' '+d.getDate();
  renderLog();
  updateStats();
}

// ══ SYMBOL PICKER ══
function selectSym(btn){
  document.querySelectorAll('.sym-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedSym=btn.dataset.sym;
  selectedType=btn.dataset.type;
}

function toggleTag(btn,tag){
  btn.classList.toggle('on');
  if(selectedTags.includes(tag)){
    selectedTags=selectedTags.filter(t=>t!==tag);
  }else{
    selectedTags.push(tag);
  }
}

function handleEntryKey(e){
  if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();addEntry();}
}

// ══ ADD ENTRY ══
function addEntry(){
  var input=document.getElementById('entry-input');
  var text=input.value.trim();
  if(!text)return;

  var now=new Date();
  var entry={
    id:Date.now(),
    date:TODAY,
    dateDisplay:now.toLocaleDateString(),
    time:now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}),
    symbol:selectedSym,
    type:selectedType,
    text:text,
    tags:[...selectedTags],
    done:false,
    migrated:false
  };

  var entries=ld('entries',[]);
  entries.unshift(entry);
  sv('entries',entries);

  // Write to Sheets
  dbWrite({
    action:'saveDailyLog',
    id:entry.id,
    date:entry.dateDisplay,
    time:entry.time,
    symbol:entry.symbol,
    type:entry.type,
    text:entry.text,
    tags:entry.tags.join(','),
    linkedSection:entry.tags[0]||''
  });

  // Feed other portal sections
  feedPortal(entry);

  input.value='';
  renderLog();
  updateStats();
  if(entry.type==='task'||entry.type==='priority'){
    showToast('Logged + added to Project Board ✓');
  } else {
    showToast('Logged ✓');
  }
}

// ══ FEED OTHER SECTIONS ══
var D1_URL = 'https://rebecca-portal-api.rebeccaannexo.workers.dev';

function feedPortal(entry){
  if(entry.type==='task'||entry.type==='priority'){
    // Map tag to project section
    var tagToSection = {
      business:'gbb', home:'home', faith:'personal',
      people:'personal', health:'personal', mission:'wtc'
    };
    var section = tagToSection[entry.tags&&entry.tags[0]] || 'personal';
    var taskId = 'log'+entry.id;
    // Save to D1 tasks
    fetch(D1_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        action:'upsert',
        table:'tasks',
        data:{
          id: taskId,
          text: entry.text,
          section: section,
          done: 0,
          priority: entry.type==='priority' ? 'high' : 'med',
          priority_flag: entry.type==='priority' ? '1' : '',
          status: 'backlog'
        }
      })
    }).catch(function(){});
    // Also update localStorage cache
    var tasks = JSON.parse(localStorage.getItem(section+'_tasks')||localStorage.getItem(section)||'[]');
    tasks.push({id:taskId, text:entry.text, done:false, priority:entry.type==='priority'?'high':'med'});
    localStorage.setItem(section, JSON.stringify(tasks));
  }
  if(entry.type==='prayer'){
    var prayers=JSON.parse(localStorage.getItem('faith_praying')||'[]');
    prayers.unshift({id:entry.id,text:entry.text,person:entry.text,date:entry.dateDisplay});
    localStorage.setItem('faith_praying',JSON.stringify(prayers));
  }
  if(entry.type==='idea'){
    var brainDumps=JSON.parse(localStorage.getItem('brain_dumps')||'[]');
    brainDumps.unshift({id:entry.id,text:entry.text,cat:'idea',date:entry.dateDisplay,source:'daily_log'});
    localStorage.setItem('brain_dumps',JSON.stringify(brainDumps));
  }
}

// ══ RENDER LOG ══

function symbolToType(sym){
  var map={'•':'task','○':'event','—':'note','*':'priority','†':'prayer','!':'idea'};
  return map[sym]||'note';
}
function formatDateDisplay(dateStr){
  if(!dateStr) return '';
  var d = new Date(dateStr);
  if(isNaN(d)) return dateStr;
  var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
}

function renderLog(){
  // Merge both storage keys — home widget uses daily_log_entries, full log uses entries
  var entries = ld('entries',[]);
  var homeEntries = ld('daily_log_entries',[]);
  // Convert home entries to full log format and merge
  homeEntries.forEach(function(he){
    if(!entries.find(function(e){return String(e.id)===String(he.id);})){
      entries.push({
        id: he.id,
        text: he.text,
        symbol: he.symbol||'•',
        type: symbolToType(he.symbol||'•'),
        tag: he.tag||'',
        tags: he.tag ? [he.tag] : [],
        date: he.date||TODAY,
        dateDisplay: formatDateDisplay(he.date||TODAY),
        time: he.time||'',
        done: false,
        migrated: false,
        source: 'home'
      });
    }
  });
  // Sort newest first
  entries.sort(function(a,b){
    var da = new Date(a.date||TODAY);
    var db = new Date(b.date||TODAY);
    if(db-da !== 0) return db-da;
    return String(b.id).localeCompare(String(a.id));
  });
  // Save merged back
  sv('entries', entries);
  var container=document.getElementById('log-container');
  var empty=document.getElementById('log-empty');

  // Filter
  var filtered=entries;
  if(currentFilter==='today')filtered=entries.filter(e=>e.date===TODAY);
  else if(currentFilter!=='all')filtered=entries.filter(e=>e.type===currentFilter);

  if(!filtered.length){empty.style.display='block';container.innerHTML='';return;}
  empty.style.display='none';

  // Group by date
  var groups={};
  filtered.forEach(function(e){
    var key=e.date||TODAY;
    if(!groups[key])groups[key]=[];
    groups[key].push(e);
  });

  container.innerHTML='';
  Object.keys(groups).forEach(function(date){
    var groupEntries=groups[date];
    var today=date===TODAY;
    var label=today?'Today — '+groupEntries[0].dateDisplay:groupEntries[0].dateDisplay;

    var divider=document.createElement('div');
    divider.className='date-divider';
    divider.innerHTML=`<div class="date-line"></div><div class="date-label">${label}</div><div class="date-count">${groupEntries.length}</div><div class="date-line"></div>`;
    container.appendChild(divider);

    var entriesDiv=document.createElement('div');
    entriesDiv.className='log-entries';
    groupEntries.forEach(function(e){
      entriesDiv.appendChild(makeEntryEl(e));
    });
    container.appendChild(entriesDiv);
  });
}

function makeEntryEl(entry){
  var div=document.createElement('div');
  div.className='log-entry type-'+entry.type+(entry.done?' done':'')+(entry.migrated?' type-migrated':'');
  div.dataset.id=entry.id;

  var symColor=SYM_COLORS[entry.type]||'rgba(255,255,255,.5)';
  var sym=entry.migrated?'›':(entry.done?'×':entry.symbol);
  var symStyle=entry.done?'color:#82C4B5':('color:'+symColor);

  var tagsHtml=entry.tags&&entry.tags.length?entry.tags.map(t=>`<span class="entry-tag" style="background:${TAG_COLORS[t]||'rgba(255,255,255,.1)'}20;color:${TAG_COLORS[t]||'rgba(255,255,255,.4)'}">${t}</span>`).join(''):'';

  div.innerHTML=`
    <div class="entry-sym" style="${symStyle}">${sym}</div>
    <div class="entry-content">
      <div class="entry-text" contenteditable="true" onblur="editEntry(${entry.id},this.textContent)">${esc(entry.text)}</div>
      <div class="entry-meta">
        <span class="entry-time">${entry.time||''}</span>
        ${tagsHtml}
      </div>
    </div>
    <div class="entry-actions">
      ${(entry.type==='task'||entry.type==='priority')&&!entry.done?`<button class="act-btn done-btn" onclick="markDone(${entry.id})" title="Mark done">×</button>`:''}
      ${entry.type==='event'?`<button class="act-btn" onclick="addEntryToSchedule(${entry.id})" title="Add to schedule" style="color:var(--amber)">📅</button>`:''}
      <button class="act-btn migrate-btn" onclick="toggleMigrateMenu(${entry.id},this)" title="Migrate to section">›</button>
      <button class="act-btn del-btn" onclick="deleteEntry(${entry.id})" title="Delete">✕</button>
    </div>
    <div class="migrate-menu" id="mm-${entry.id}">
      <button class="migrate-opt" onclick="migrateEntry(${entry.id},'biz_tasks')">→ Business task</button>
      <button class="migrate-opt" onclick="migrateEntry(${entry.id},'hl_tasks')">→ Home task</button>
      <button class="migrate-opt" onclick="migrateEntry(${entry.id},'al_tasks')">→ Aligned Life</button>
      <button class="migrate-opt" onclick="migrateEntry(${entry.id},'faith_praying')">→ Prayer list</button>
      <button class="migrate-opt" onclick="migrateEntry(${entry.id},'brain_dumps')">→ Brain dump</button>
      <button class="migrate-opt" onclick="migrateEntry(${entry.id},'followup_list')">→ Follow up</button>
    </div>
  `;
  return div;
}


function addEntryToSchedule(id){
  var entries=ld('entries',[]);
  var e=entries.find(x=>x.id==id);
  if(!e) return;
  var time = prompt('What time is this event?', e.time||'');
  if(time===null) return;
  var appts = ld('appts',[]);
  appts.push({
    id: Date.now(),
    title: e.text,
    time: time,
    date: e.date||TODAY,
    blockId: 'b1'
  });
  sv('appts', appts);
  showToast('Added to schedule ✓');
}

function editEntry(id,text){
  var entries=ld('entries',[]);
  var e=entries.find(x=>x.id==id);
  if(e){e.text=text;sv('entries',entries);}
}

function markDone(id){
  var entries=ld('entries',[]);
  var e=entries.find(x=>x.id==id);
  if(e){e.done=true;sv('entries',entries);}
  renderLog();updateStats();
  showToast('Done ✓');
}

function deleteEntry(id){
  sv('entries',ld('entries',[]).filter(e=>e.id!=id));
  renderLog();updateStats();
}

function toggleMigrateMenu(id,btn){
  var menu=document.getElementById('mm-'+id);
  if(menu){menu.classList.toggle('open');}
}

function migrateEntry(id,targetKey){
  var entries=ld('entries',[]);
  var e=entries.find(x=>x.id==id);
  if(!e)return;

  e.migrated=true;e.migratedTo=targetKey;sv('entries',entries);

  // Add to target section in portal localStorage
  var targets=JSON.parse(localStorage.getItem('p_'+targetKey)||'[]');
  targets.unshift({id:Date.now(),text:e.text,done:false,date:e.dateDisplay,cat:e.type});
  localStorage.setItem('p_'+targetKey,JSON.stringify(targets));

  // Write migration to Sheets
  dbWrite({action:'updateDailyLog',id:e.id,migrated:true,migratedTo:targetKey,approved:true});

  var menu=document.getElementById('mm-'+e.id);
  if(menu)menu.classList.remove('open');
  renderLog();
  showToast('Migrated to '+targetKey.replace('_',' ')+' ✓');
}

function filterLog(btn,filter){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter=filter;
  renderLog();
}

function updateStats(){
  var entries=ld('entries',[]);
  var todayEntries=entries.filter(e=>e.date===TODAY);
  var tasks=entries.filter(e=>(e.type==='task'||e.type==='priority')&&!e.migrated);
  var done=tasks.filter(e=>e.done);
  document.getElementById('stat-today').textContent=todayEntries.length;
  document.getElementById('stat-tasks').textContent=tasks.length;
  document.getElementById('stat-done').textContent=done.length;
  document.getElementById('stat-total').textContent=entries.length;
}

async function dbWrite(data){
  try{
    await fetch(DB_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  }catch(e){console.log('DB write error:',e);}
}

function showToast(msg){
  var t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2000);
}

// Close migrate menus on click outside
document.addEventListener('click',function(e){
  if(!e.target.classList.contains('migrate-btn')){
    document.querySelectorAll('.migrate-menu.open').forEach(m=>m.classList.remove('open'));
  }
});

init();
