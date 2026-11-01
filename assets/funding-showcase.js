(()=>{'use strict';
const mount=document.querySelector('#funding-parallax-list');if(!mount)return;
const cfg=window.ARQWELL_CONFIG||{};
const connected=Boolean(cfg.supabaseUrl&&cfg.supabasePublishableKey&&window.supabase?.createClient);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const photo=s=>/^assets\/media\/funding-[a-z-]+\.svg$/.test(s||'')?s:'assets/media/funding-resilience.svg';
const overlay=document.querySelector('#funding-paywall'),close=document.querySelector('#paywall-close');
function openPaywall(rec){document.querySelector('#paywall-opportunity').textContent=rec.title;overlay.hidden=false;document.body.classList.add('modal-open');close.focus()}
function closePaywall(){overlay.hidden=true;document.body.classList.remove('modal-open')}
close?.addEventListener('click',closePaywall);overlay?.addEventListener('click',e=>{if(e.target===overlay)closePaywall()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)closePaywall()});
function render(rows){mount.replaceChildren();const selected=(rows||[]).slice(0,4);if(!selected.length){mount.innerHTML='<div class="container funding-empty"><h3>No featured opportunities are published yet.</h3><p>ARQWELL editors will select records from the funding database.</p></div>';return}
  for(let i=0;i<selected.length;i++){
    const r=selected[i],article=document.createElement('article');article.className='funding-parallax-chapter';article.id='opportunity-'+(i+1);
    article.innerHTML=`<div class="funding-parallax-scene"><div class="funding-parallax-art"><img src="${photo(r.image_url)}" alt="" loading="lazy" decoding="async"></div><div class="funding-parallax-tint"></div><div class="container funding-parallax-content"><div class="funding-story-card"><div class="story-counter"><span>THE FUNDING EDIT / ${String(i+1).padStart(2,'0')}—${String(selected.length).padStart(2,'0')}</span><span class="story-dot" aria-hidden="true"></span></div><div class="eyebrow">${esc(r.category||'FUNDING OPPORTUNITY')}</div><h3>${esc(r.title)}</h3><p>${esc(r.public_excerpt||'Curated funding opportunity preview.')}</p><button class="button button-primary funding-unlock" type="button"><span aria-hidden="true">↗</span> View funding details <span aria-hidden="true">↗</span></button><span class="funding-demo-label">${esc(r.curation_note||(connected?'Curated funding opportunity':'Illustrative record · Not a live grant'))}</span></div></div></div>`;
    article.querySelector('button').addEventListener('click',()=>openPaywall(r));mount.append(article)
  }
  const chapters=[...mount.querySelectorAll('.funding-parallax-chapter')];
  const rail=document.querySelector('#funding-progress');rail.replaceChildren(...chapters.map((ch,i)=>{const b=document.createElement('a');b.href='#'+ch.id;b.textContent=String(i+1).padStart(2,'0');b.setAttribute('aria-label','Jump to featured opportunity '+(i+1));return b}));
  const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){chapters.forEach((ch,i)=>{const is=ch===e.target;rail.children[i].classList.toggle('active',is);ch.classList.toggle('seen',is)})}}},{rootMargin:'-32% 0px -32% 0px',threshold:0});chapters.forEach(ch=>observer.observe(ch));
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let queued=false;function scroll(){queued=false;const vh=window.innerHeight;for(const ch of chapters){let rect=ch.getBoundingClientRect();if(rect.bottom<0||rect.top>vh)continue;const y=(rect.top+rect.height*.5-vh*.5)/vh;ch.style.setProperty('--parallax-shift',`${Math.max(-70,Math.min(70,-y*64)).toFixed(1)}px`)}}
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scroll)}},{passive:true});window.addEventListener('resize',scroll);scroll();
}
async function init(){if(!connected){render(window.ARQWELL_FUNDING_TEASERS||[]);return}try{const sb=window.ARQWELL_DB||(window.ARQWELL_DB=window.supabase.createClient(cfg.supabaseUrl,cfg.supabasePublishableKey));const {data,error}=await sb.rpc('arqwell_public_funding_showcase');if(error)throw error;render(data||[]);document.querySelector('#showcase-source').textContent='Curated from ARQWELL funding records'}catch(err){console.error(err);render([]);document.querySelector('#showcase-source').textContent='Live database preview unavailable. Check the funding showcase SQL migration.'}}
init();})();