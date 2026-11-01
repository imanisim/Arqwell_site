(()=>{'use strict';
const settings=window.ARQWELL_HERO_MEDIA||{};
const params=new URLSearchParams(window.location.search),preview=params.get('preview')==='1';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const allowedSrc=s=>typeof s==='string' && (/^assets\/[a-z0-9_./-]+$/i.test(s)) ? s : '';
for(const el of document.querySelectorAll('[data-hero-media]')){
  const page=el.dataset.heroMedia;
  const cfg=settings[page];if(!cfg)continue;
  const picture=el.querySelector('.hero-photo'),video=el.querySelector('.hero-video');
  if(!picture||!video)continue;
  picture.alt=cfg.alt||'Architecture';picture.src=allowedSrc(cfg.image);
  const vsrc=allowedSrc(cfg.video);video.poster=allowedSrc(cfg.poster)||picture.src;
  if(vsrc){const source=video.querySelector('source');source.src=vsrc;video.load()}
  const mode=preview?(sessionStorage.getItem('arqwell-hero-'+page)||cfg.type):cfg.type;
  function display(mode){const showVideo=mode==='video'&&!!vsrc&&!reduced;
    picture.hidden=showVideo;video.hidden=!showVideo;
    if(showVideo){video.play().catch(()=>{picture.hidden=false;video.hidden=true})}else video.pause();
    el.querySelectorAll('[data-media-choice]').forEach(b=>{const active=b.dataset.mediaChoice===mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  }
  if(preview){el.classList.add('is-preview');let tools=document.createElement('div');tools.className='hero-media-tools';tools.innerHTML='<span>Hero media preview</span><button type="button" data-media-choice="image">Image</button><button type="button" data-media-choice="video">Video</button><label>Try your file <input type="file" accept="image/png,image/jpeg,image/webp,video/mp4,video/webm" aria-label="Choose a temporary photo or video"></label><small>Local preview only</small>';
    el.append(tools);tools.querySelectorAll('[data-media-choice]').forEach(b=>b.addEventListener('click',()=>{sessionStorage.setItem('arqwell-hero-'+page,b.dataset.mediaChoice);display(b.dataset.mediaChoice)}));
    let tempUrl=null;tools.querySelector('input').addEventListener('change',e=>{const f=e.target.files?.[0];if(!f)return;const isVideo=/^video\/(mp4|webm)$/.test(f.type),isImage=/^image\/(png|jpeg|webp)$/.test(f.type);if((!isVideo&&!isImage)||f.size>25000000){alert('Choose a JPG, PNG, WebP, MP4 or WebM file up to 25 MB for this preview.');return}if(tempUrl)URL.revokeObjectURL(tempUrl);tempUrl=URL.createObjectURL(f);if(isVideo){video.querySelector('source').src=tempUrl;video.load();display('video')}else{picture.src=tempUrl;display('image')}})
  }
  display(mode);
}
})();