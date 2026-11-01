import {mountFundingWidget,mountFeaturedFunding} from './funding-widget.js';
const cfg=window.ARQWELL_CONFIG||{};
const base={supabaseUrl:cfg.supabaseUrl||'',supabaseAnonKey:cfg.supabasePublishableKey||'',durationSeconds:85};
async function start(){
 let tier2=false,accessToken=null;
 if(window.supabase?.createClient&&base.supabaseUrl&&base.supabaseAnonKey){
  try{const sb=window.supabase.createClient(base.supabaseUrl,base.supabaseAnonKey);const {data:{user}}=await sb.auth.getUser();if(user){
   const {data:{session}}=await sb.auth.getSession();accessToken=session?.access_token||null;
   const {data:sub}=await sb.from('arqwell_subscriptions').select('tier,status,current_period_end').eq('user_id',user.id).maybeSingle();
   tier2=!!sub&&['tier_2','tier2','funding_paid'].includes(sub.tier)&&['active','trialing'].includes(sub.status)&&(!sub.current_period_end||new Date(sub.current_period_end)>new Date());
  }}catch(e){console.warn('Funding access remains free pending authorization',e)}}
 const settings={...base,accessToken,tier2};
 if(document.querySelector('#arqwell-funding-home'))mountFundingWidget('#arqwell-funding-home',{...settings,variant:'embed',fundingUrl:'funding.html'});
 if(document.querySelector('#arqwell-funding-full'))mountFundingWidget('#arqwell-funding-full',{...settings,variant:'full',fundingUrl:'funding.html',membershipUrl:'register.html?interest=funding'});
 if(document.querySelector('#arqwell-featured-funding'))mountFeaturedFunding('#arqwell-featured-funding',settings);
}
start();
const modal=document.querySelector('#funding-paywall');
if(modal){const close=()=>{modal.hidden=true;document.body.classList.remove('modal-open')};window.addEventListener('arqwell:funding-detail',e=>{const t=modal.querySelector('#paywall-opportunity');if(t)t.textContent=e.detail?.title||'this opportunity';modal.hidden=false;document.body.classList.add('modal-open');modal.querySelector('#paywall-close')?.focus()});modal.querySelector('#paywall-close')?.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()})}
