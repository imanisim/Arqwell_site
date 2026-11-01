import {mountFundingWidget,mountFeaturedFunding} from './funding-widget.js';
const cfg=window.ARQWELL_CONFIG||{};
const settings={supabaseUrl:cfg.supabaseUrl||'',supabaseAnonKey:cfg.supabasePublishableKey||'',durationSeconds:85};
if(document.querySelector('#arqwell-funding-home')) mountFundingWidget('#arqwell-funding-home',{...settings,variant:'embed',fundingUrl:'funding.html',maxRows:11});
if(document.querySelector('#arqwell-funding-full')) mountFundingWidget('#arqwell-funding-full',{...settings,variant:'full',fundingUrl:'funding.html',membershipUrl:'register.html?interest=funding',maxRows:11});
if(document.querySelector('#arqwell-featured-funding')) mountFeaturedFunding('#arqwell-featured-funding',settings);
const modal=document.querySelector('#funding-paywall');
if(modal){const close=()=>{modal.hidden=true;document.body.classList.remove('modal-open')};window.addEventListener('arqwell:funding-detail',e=>{const t=modal.querySelector('#paywall-opportunity');if(t)t.textContent=e.detail?.title||'this opportunity';modal.hidden=false;document.body.classList.add('modal-open');modal.querySelector('#paywall-close')?.focus()});modal.querySelector('#paywall-close')?.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close()});}
