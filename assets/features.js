/* ARQWELL Feature Studio. A selection always refers to a record in its source table.
   Demo sources: assets/library-seed.js. Live sources: arqwell_feature_catalog RPC.
   No grant eligibility, amounts or private records are exposed via the public catalog. */
(()=>{'use strict';
const cfg=window.ARQWELL_CONFIG||{},live=!!(cfg.supabaseUrl&&cfg.supabasePublishableKey&&window.supabase?.createClient);
const sb=live?(window.ARQWELL_DB||(window.ARQWELL_DB=window.supabase.createClient(cfg.supabaseUrl,cfg.supabasePublishableKey))):null;
const $=s=>document.querySelector(s),slots=['hero','book','podcast','artifact','research','grant'];
const slotNames={hero:'Main spotlight',book:'Featured book',podcast:'Featured podcast',artifact:'Featured artifact',research:'Featured research',grant:'Featured funding'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=s=>{if(/^assets\/[a-zA-Z0-9_./-]+$/.test(s||''))return s;try{let u=new URL(s,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'#'}catch{return '#'}};
const key=x=>`${x.source_type}:${x.source_id}`;
const defaults=Object.fromEntries(slots.map(slot=>[slot,{slot,mode:slot==='book'?'manual':'queue',pinned_source_type:null,pinned_source_id:null,rotation_days:7,anchor_date:'2026-11-01'}]));
const seeded=(window.ARQWELL_DEMO_LIBRARY||[]).map((r,i)=>({source_type:r.item_type,source_id:`sample-${i}`,title:r.title,creator:r.creator,summary:r.description,image_url:r.cover_image,link_url:r.source_url,publication_year:r.publication_year}));
const demoFunding=[{source_type:'grant',source_id:'sample-grant-1',title:'Housing and Resilience Funding',creator:'Funding preview',summary:'Illustrative category only — not an active or verified grant.',image_url:'assets/covers/documentation.svg',link_url:'funding.html'},{source_type:'grant',source_id:'sample-grant-2',title:'AEC Workforce Funding',creator:'Funding preview',summary:'Illustrative category only — not an active or verified grant.',image_url:'assets/covers/documentation.svg',link_url:'funding.html'}];
let state={items:[...seeded,...demoFunding],rules:structuredClone(defaults),queue:[],schedule:[]},admin=false;
state.rules.book.pinned_source_type='book';state.rules.book.pinned_source_id='sample-0';
function demoRead(){try{let s=JSON.parse(localStorage.getItem('arqwell-feature-sources-v1')||'null');if(s){state.rules={...state.rules,...s.rules};state.queue=s.queue||[];state.schedule=s.schedule||[]}}catch{}}
function demoSave(){localStorage.setItem('arqwell-feature-sources-v1',JSON.stringify({rules:state.rules,queue:state.queue,schedule:state.schedule}))}
function candidates(slot){return state.items.filter(r=>slot==='hero'||r.source_type===slot)}
function toDate(t){return new Date(t).getTime()}
function hash(s){let n=2166136261;for(let c of s){n^=c.charCodeAt(0);n=Math.imul(n,16777619)}return n>>>0}
function choose(slot,now=new Date()){
 let pool=candidates(slot);if(!pool.length)return null;
 const time=now.getTime();let current=state.schedule.filter(x=>x.slot===slot&&toDate(x.starts_at)<=time&&toDate(x.ends_at)>time).sort((a,b)=>toDate(b.starts_at)-toDate(a.starts_at))[0];
 if(current){let r=pool.find(x=>key(x)===`${current.source_type}:${current.source_id}`);if(r)return {...r,reason:'SCHEDULED FEATURE'}}
 let r=state.rules[slot]||defaults[slot],period=Math.max(1,Number(r.rotation_days)||7),anchor=toDate((r.anchor_date||'2026-11-01')+'T00:00:00Z');
 let cycle=Math.floor((time-anchor)/(86400000*period));
 if(r.mode==='manual'){let x=pool.find(x=>key(x)===`${r.pinned_source_type}:${r.pinned_source_id}`);if(x)return {...x,reason:'EDITOR’S PICK'}}
 if(r.mode==='random')return {...pool[hash(`${slot}:${cycle}`)%pool.length],reason:'AUTO ROTATION'};
 let q=state.queue.filter(x=>x.slot===slot).sort((a,b)=>a.position-b.position).map(x=>pool.find(r=>key(r)===`${x.source_type}:${x.source_id}`)).filter(Boolean);
 if(!q.length)q=pool;
 return {...q[((cycle%q.length)+q.length)%q.length],reason:'FROM THE QUEUE'};
}
function art(x){return url(x.image_url)||'assets/covers/documentation.svg'}
function draw(){
 let hero=$('#feature-hero-live');if(hero){let x=choose('hero');if(x)hero.innerHTML=`<div class="spotlight-media"><img src="${art(x)}" alt="Featured ${esc(x.source_type)} cover"></div><div class="spotlight-copy"><span class="eyebrow">ARQWELL EDITORIAL / ${esc(x.reason)}</span><div class="spotlight-kicker">FEATURED ${esc(x.source_type.toUpperCase())}</div><h2>${esc(x.title)}</h2><p class="spotlight-creator">${esc(x.creator||'ARQWELL collection')}</p><p>${esc(x.summary)}</p><a class="button button-outline" href="${url(x.link_url)}">Explore selection ↗</a></div>`}
 let rail=$('#feature-rail');if(rail){rail.replaceChildren();for(let slot of slots.slice(1)){let x=choose(slot);if(!x)continue;let el=document.createElement('article');el.className='feature-tile';el.innerHTML=`<a class="feature-tile-art" href="${url(x.link_url)}"><img alt="${esc(x.title)} cover" src="${art(x)}"></a><div class="feature-tile-info"><span class="eyebrow">${esc(slotNames[slot])}</span><h3>${esc(x.title)}</h3><p>${esc(x.creator)}</p><small>${esc(x.reason)}</small></div>`;rail.append(el)}}
 let library=$('#library-dynamic-hero');if(library){let x=choose('hero');if(x)library.innerHTML=`<div class="library-dynamic-img"><img src="${art(x)}" alt="Featured resource cover"></div><div><span class="eyebrow">ARQLIB / ${esc(x.reason)}</span><h2>${esc(x.title)}</h2><p>${esc(x.summary)}</p><a class="button button-outline" href="${url(x.link_url)}">Explore feature ↗</a></div>`}
 let funding=$('#funding-feature-live');if(funding){let x=choose('grant');if(x)funding.innerHTML=`<span class="eyebrow">FEATURED FUNDING / ${esc(x.reason)}</span><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><a class="button button-outline" href="funding.html">See funding membership ↗</a><small>Subscriber-only records are never included in the public feature feed.</small>`}
}
async function getSourceRows(adminMode=false){if(!live)return state.items;const {data,error}=await sb.rpc(adminMode?'arqwell_feature_admin_catalog':'arqwell_feature_catalog');if(error)throw error;return data||[]}
async function loadRemote(){let [catalog,rules,queues,schedules]=await Promise.all([getSourceRows(),sb.from('arqwell_feature_rules').select('*'),sb.from('arqwell_feature_queue').select('*'),sb.from('arqwell_feature_schedule').select('*')]);for(let res of [rules,queues,schedules])if(res.error)throw res.error;state.items=catalog;state.rules={...structuredClone(defaults),...Object.fromEntries((rules.data||[]).map(x=>[x.slot,x]))};state.queue=queues.data||[];state.schedule=schedules.data||[]}
async function isAdmin(){if(!live)return true;const {data:{user}}=await sb.auth.getUser();if(!user)return false;const{data,error}=await sb.rpc('is_arqlib_admin');return !error&&data===true}
async function saveRule(slot){if(!live){demoSave();return}const{error}=await sb.from('arqwell_feature_rules').upsert(state.rules[slot],{onConflict:'slot'});if(error)throw error}
async function saveCollection(table,slot,rows){if(!live){demoSave();return}let del=await sb.from(table).delete().eq('slot',slot);if(del.error)throw del.error;if(rows.length){let ins=await sb.from(table).insert(rows);if(ins.error)throw ins.error}}
function itemOption(x){let o=document.createElement('option');o.value=key(x);o.textContent=`${x.source_type.toUpperCase()} · ${x.title}`;return o}
function getValue(k){let [source_type,...p]=k.split(':');return {source_type,source_id:p.join(':')}}
function showStudio(){let el=$('#feature-studio');if(!el)return;if(live&&!admin){el.innerHTML='<div class="studio-locked"><h2>ARQWELL administrator sign-in required</h2><p>Only authorized editors can change scheduled features.</p><a class="button button-outline" href="signin.html">Sign in ↗</a></div>';return}
const slot=$('#studio-slot'),mode=$('#studio-mode'),item=$('#studio-item'),rotation=$('#studio-rotation'),queue=$('#studio-queue'),schedules=$('#schedule-list'),status=$('#studio-save-status');
const notice=t=>{status.textContent=t};
const remoteSync=async f=>{try{await f();notice(live?'Saved to Supabase.':'Saved in this browser (preview only).');draw();refresh()}catch(e){notice('Could not save: '+e.message)}};
const refresh=()=>{let s=slot.value,r=state.rules[s];mode.value=r.mode;rotation.value=r.rotation_days||7;let options=candidates(s);item.replaceChildren(...options.map(itemOption));let pinned=`${r.pinned_source_type}:${r.pinned_source_id}`;if(options.some(x=>key(x)===pinned))item.value=pinned;$('#studio-selection').textContent=choose(s)?.title||'No eligible published records';renderQueue();renderSchedules();$('#scheduled-item').replaceChildren(...options.map(itemOption))};
const renderQueue=()=>{let s=slot.value,ordered=state.queue.filter(q=>q.slot===s).sort((a,b)=>a.position-b.position).map(q=>candidates(s).find(x=>key(x)===`${q.source_type}:${q.source_id}`)).filter(Boolean);let rest=candidates(s).filter(x=>!ordered.some(y=>key(y)===key(x))),full=[...ordered,...rest];queue.replaceChildren(...full.map((x,i)=>{let line=document.createElement('div');line.className='queue-line';let t=document.createElement('span');t.textContent=`${i+1}. ${x.source_type} · ${x.title}`;let up=document.createElement('button');up.type='button';up.textContent='↑ Move up';up.disabled=i===0;up.addEventListener('click',()=>{[full[i-1],full[i]]=[full[i],full[i-1]];const rows=full.map((v,j)=>({slot:s,...getValue(key(v)),position:j+1}));remoteSync(async()=>{await saveCollection('arqwell_feature_queue',s,rows);state.queue=state.queue.filter(q=>q.slot!==s).concat(rows)})});line.append(t,up);return line}))};
const renderSchedules=()=>{let ss=state.schedule.filter(x=>x.slot===slot.value).sort((a,b)=>toDate(a.starts_at)-toDate(b.starts_at));schedules.replaceChildren(...ss.map(x=>{let row=document.createElement('div');row.className='schedule-line';let title=document.createElement('div');let r=state.items.find(r=>key(r)===`${x.source_type}:${x.source_id}`);let b=document.createElement('b');b.textContent=r?.title||'Removed source item';let small=document.createElement('small');small.textContent=`${x.starts_at.slice(0,10)} to ${new Date(toDate(x.ends_at)-1000).toISOString().slice(0,10)}`;title.append(b,small);let rm=document.createElement('button');rm.type='button';rm.textContent='Remove';rm.addEventListener('click',()=>remoteSync(async()=>{if(live){let q=await sb.from('arqwell_feature_schedule').delete().eq('id',x.id);if(q.error)throw q.error}state.schedule=state.schedule.filter(y=>y!==x);if(!live)demoSave()}));row.append(title,rm);return row}))};
slot.addEventListener('change',refresh);
mode.addEventListener('change',()=>remoteSync(async()=>{state.rules[slot.value]={...state.rules[slot.value],mode:mode.value};await saveRule(slot.value)}));
item.addEventListener('change',()=>remoteSync(async()=>{let v=getValue(item.value);state.rules[slot.value]={...state.rules[slot.value],...{pinned_source_type:v.source_type,pinned_source_id:v.source_id}};await saveRule(slot.value)}));
rotation.addEventListener('change',()=>remoteSync(async()=>{state.rules[slot.value]={...state.rules[slot.value],rotation_days:Math.max(1,parseInt(rotation.value)||7)};await saveRule(slot.value)}));
$('#schedule-form').addEventListener('submit',e=>{e.preventDefault();let source=$('#scheduled-item').value,start=$('#scheduled-start').value,end=$('#scheduled-end').value;if(!source||!start||!end||end<start){notice('Choose a resource and a valid date range.');return}let row={slot:slot.value,...getValue(source),starts_at:new Date(start+'T00:00:00').toISOString(),ends_at:new Date(new Date(end+'T00:00:00').getTime()+86400000).toISOString()};remoteSync(async()=>{if(live){let q=await sb.from('arqwell_feature_schedule').insert(row).select('*').single();if(q.error)throw q.error;state.schedule.push(q.data)}else{state.schedule.push({...row,id:'preview-'+Date.now()});demoSave()}})});
$('#studio-search').addEventListener('input',e=>{let q=e.target.value.toLowerCase();for(let o of item.options)o.hidden=!o.text.toLowerCase().includes(q)});
$('#studio-status').textContent=live?'LIVE · Choose records from the connected source databases':'DEMO · Sources are from the library sample collection. Connect Supabase for database selections.';
refresh();}
async function init(){if(live){try{await loadRemote()}catch(e){console.warn('Feature data unavailable',e);document.querySelector('#studio-status')?.replaceChildren(document.createTextNode('Database migrations are not installed: '+e.message))}}else demoRead();draw();if(document.body.dataset.page==='feature-studio'){admin=await isAdmin();if(live&&admin){try{state.items=await getSourceRows(true)}catch(e){console.error(e)}}showStudio()}}
window.ARQWELL_FEATURES={choose,init};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
