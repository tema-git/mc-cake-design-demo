'use strict';
(() => {
  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarseQuery = window.matchMedia('(pointer: coarse)');
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const names = { color: { cream: 'Сливочный', blue: 'Кобальтовый', rose: 'Розовый' }, shape: { round: 'круглый', tiered: 'два яруса', mini: 'мини' }, decor: { cherries: 'вишня', bow: 'бант', candles: 'свечи' } };
  const colors = { cream: ['#fff4ca','#ddc28b','#fff9e0','#ead6aa'], blue: ['#9bb1f5','#4064cc','#c3d0ff','#8098df'], rose: ['#f4c2d0','#ca8099','#ffdae2','#dfa1b7'] };
  // One in-memory motion state for pointer, scroll and interaction animations.
  let motionRequested = true;
  const motionEnabled = () => motionRequested && !reducedQuery.matches;
  let motionContext = null;
  const motionToggle = $('#motion-toggle');
  const motionNote = $('#motion-note');
  let serial = 0;
  function cakeSVG(color = 'cream', shape = 'round', decor = 'cherries', hero = false) {
    const id = `cake-${++serial}`;
    const [light,dark,top,pipe] = colors[color];
    const tiers = shape === 'tiered' ? [{y:260,b:370,r:151},{y:144,b:262,r:110}] : shape === 'mini' ? [{y:256,b:361,r:112}] : [{y:174,b:366,r:145}];
    const finalTop=tiers[tiers.length-1];
    function cylinder({y,b,r},idx) {
      const ry = r*.24, left = 240-r, right=240+r;
      let ridges='';
      for(let i=1;i<20;i++){ const x=left+(i/20)*(2*r), pos=(x-240)/r, extra=ry*Math.sqrt(1-pos*pos); ridges+=`<path d="M${x} ${y+extra+12}v${b-y-18}" stroke="${dark}" stroke-width="1.4" opacity=".18"/>`; }
      const creamBeads=Array.from({length:24},(_,i)=>{const angle=(i/24)*Math.PI*2;const x=240+Math.cos(angle)*(r-8),cy=y+Math.sin(angle)*(ry-2);return `<ellipse cx="${x.toFixed(1)}" cy="${cy.toFixed(1)}" rx="11" ry="8" fill="url(#${id}-pipe)" transform="rotate(${(Math.cos(angle)*20).toFixed(1)} ${x.toFixed(1)} ${cy.toFixed(1)})"/>`;}).join('');
      const bottomBeads=Array.from({length:18},(_,i)=>{const t=(i/17)*Math.PI;const x=240+Math.cos(t)*(r-6),cy=b+Math.sin(t)*(ry-4);return `<ellipse cx="${x.toFixed(1)}" cy="${cy.toFixed(1)}" rx="11" ry="8" fill="url(#${id}-pipe)"/>`;}).join('');
      let drapes='';for(let i=0;i<5;i++){const x=left+12+i*(2*r-24)/5,w=(2*r-24)/5;drapes+=`<path d="M${x} ${y+ry+22}q${w/2} 53 ${w} 0M${x} ${y+ry+29}q${w/2} 53 ${w} 0" stroke="${pipe}" stroke-width="6" fill="none" class="cream-pipe"/>`;}
      return `<g class="cake-code-layer cake-code-tier" data-tier="${idx}"><path d="M${left} ${y}v${b-y}c0 ${ry*1.35} ${2*r} ${ry*1.35} ${2*r} 0V${y}" fill="url(#${id}-body)"/>${ridges}<ellipse cx="240" cy="${y}" rx="${r}" ry="${ry}" fill="${top}"/>${drapes}<g class="cake-code-icing">${creamBeads}${bottomBeads}</g></g>`;
    }
    const cy=finalTop.y-15;
    let decoration='';
    const cherryMarkup=`<g class="cake-code-cherries"><path d="M211 ${cy-12}q34-35 26-76M265 ${cy-12}q-12-42-28-76M241 ${cy-31}q13-49 40-59" fill="none" stroke="#667a35" stroke-width="3.6" stroke-linecap="round"/><path d="M237 ${cy-88}q25-5 29 9-21 4-29-9" fill="#789244"/><circle cx="208" cy="${cy-6}" r="23" fill="url(#${id}-cherry)"/><circle cx="266" cy="${cy-8}" r="22" fill="url(#${id}-cherry)"/><circle cx="238" cy="${cy-21}" r="24" fill="url(#${id}-cherry)"/><path d="M195 ${cy-15}q6-8 12-5M253 ${cy-15}q5-7 10-5M225 ${cy-30}q6-7 12-5" fill="none" stroke="#f6b4be" stroke-width="3" stroke-linecap="round" opacity=".8"/></g>`;
    const bowY=shape==='tiered'?276:finalTop.y+67;
    const bowMarkup=`<g class="cake-code-bow"><path d="M240 ${bowY}C172 ${bowY-67} 145 ${bowY+27} 240 ${bowY}C309 ${bowY-67} 335 ${bowY+27} 240 ${bowY}" fill="url(#${id}-ribbon)" stroke="#152ba2" stroke-width="2"/><path d="M235 ${bowY+1}q-41 47-37 113l25-17q-7-48 19-91M245 ${bowY+1}q42 31 40 100l-23-12q5-43-21-85" fill="url(#${id}-ribbon)"/><ellipse cx="240" cy="${bowY}" rx="10" ry="12" fill="#243cbe"/><path d="M181 ${bowY-22}q21-1 49 23M255 ${bowY-1}q24-21 44-20" fill="none" stroke="#8c9cfe" stroke-width="2" opacity=".6"/></g>`;
    const candlesMarkup=`<g class="cake-code-candles">${[-47,0,47].map((dx,i)=>`<g transform="translate(${240+dx},${cy-14+(i%2)*-10})"><rect x="-5" y="-72" width="10" height="74" rx="2" fill="#e8b3c7"/><path d="M-5-60 5-53M-5-43 5-36M-5-26 5-19M-5-9 5-2" stroke="#a82348" stroke-width="3"/><path class="candle-flame" d="M0-80C-15-89-1-105 0-111c12 17 12 23 0 31" fill="#f3a02e"/><path d="M0-84c-7-5 0-14 0-14s6 10 0 14" fill="#fff4c8"/></g>`).join('')}</g>`;
    if(decor==='cherries')decoration=cherryMarkup;
    if(decor==='bow')decoration=bowMarkup;
    if(decor==='candles')decoration=candlesMarkup;
    if(hero)decoration=cherryMarkup+bowMarkup;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 470" aria-hidden="true"><defs><linearGradient id="${id}-body" x1="0" x2="1"><stop stop-color="${dark}"/><stop offset=".22" stop-color="${light}"/><stop offset=".58" stop-color="${top}"/><stop offset="1" stop-color="${dark}"/></linearGradient><radialGradient id="${id}-pipe" cx=".35" cy=".2"><stop stop-color="${top}"/><stop offset=".75" stop-color="${pipe}"/><stop offset="1" stop-color="${dark}"/></radialGradient><radialGradient id="${id}-cherry" cx=".3" cy=".2"><stop stop-color="#d44259"/><stop offset=".6" stop-color="#941332"/><stop offset="1" stop-color="#650c21"/></radialGradient><linearGradient id="${id}-ribbon"><stop stop-color="#122995"/><stop offset=".45" stop-color="#6075eb"/><stop offset=".55" stop-color="#243fc6"/><stop offset="1" stop-color="#15298f"/></linearGradient></defs><ellipse class="cake-code-shadow" cx="240" cy="416" rx="178" ry="22" fill="#102281" opacity=".12"/><g class="cake-code-layer cake-code-plate"><ellipse cx="240" cy="398" rx="199" ry="42" fill="#162c9f"/><ellipse cx="240" cy="390" rx="199" ry="42" fill="#4061e7"/><ellipse cx="240" cy="388" rx="185" ry="35" fill="none" stroke="#8e9ffa" stroke-width="1"/></g>${tiers.map(cylinder).join('')}${decoration}</svg>`;
  }
  $('#hero-code-cake').innerHTML=cakeSVG('cream','round','cherries',true);
  $$('[data-cake]').forEach(el=>{el.innerHTML=cakeSVG(el.dataset.cake,el.dataset.cake==='blue'?'tiered':'mini',el.dataset.cake==='rose'?'bow':'candles');});

  // Every animation here transforms SVG/CSS geometry, never image frames or video.
  const state={color:'cream',shape:'round',decor:'cherries',step:0,finished:false};
  const preview=$('#cake-preview');
  function renderCake(animate=true){
    // Rapid option changes must not leave tweens running on detached SVG nodes.
    const oldPreviewNodes=$$('*',preview);
    if(window.gsap&&oldPreviewNodes.length) gsap.killTweensOf(oldPreviewNodes);
    preview.innerHTML=cakeSVG(state.color,state.shape,state.decor);
    const label=`${names.color[state.color]} / ${names.shape[state.shape]} / ${names.decor[state.decor]}`;
    $('#preview-name').textContent=label;
    preview.setAttribute('aria-label',label);
    if(animate&&motionEnabled()&&window.gsap){
      gsap.fromTo($$('.cake-code-tier',preview),{y:18,scale:.96},{y:0,scale:1,duration:.5,ease:'back.out(1.3)',stagger:.08});
      gsap.fromTo($$('.cake-code-cherries,.cake-code-bow,.cake-code-candles',preview),{y:-24,rotation:-8},{y:0,rotation:0,duration:.65,ease:'back.out(1.3)'});
    }
    $('#builder-status').textContent=`Выбрано: ${label}`;
  }
  function updateOptions(){
    $$('[data-group]').forEach(b=>{const selected=state[b.dataset.group]===b.dataset.value;b.classList.toggle('is-selected',selected);b.setAttribute('aria-pressed',String(selected));});
  }
  function showStep(focus=false){
    $$('[data-step]').forEach(el=>el.hidden=Number(el.dataset.step)!==state.step);
    $$('[data-step-label]').forEach(el=>el.classList.toggle('is-active',Number(el.dataset.stepLabel)===state.step));
    $('#builder-back').hidden=state.step===0;
    const nextText=state.step===0?'К форме':state.step===1?'К деталям':'Получить концепт';
    $('#builder-next').innerHTML=`${nextText}<svg class="arrow" aria-hidden="true"><use href="#arrow"/></svg>`;
    if(focus)$(`[data-step="${state.step}"] button`).focus({preventScroll:true});
  }
  $$('[data-group]').forEach(button=>button.addEventListener('click',()=>{
    if(state.finished)return;
    state[button.dataset.group]=button.dataset.value;updateOptions();renderCake();
  }));
  $('#builder-next').addEventListener('click',()=>{
    if(state.finished)return;
    if(state.step<2){state.step++;showStep(true);return;}
    state.finished=true;$('#builder-fields').hidden=true;$('#builder-result').hidden=false;
    const titles={cream:'Сливочная история',blue:'Смелое признание',rose:'Нежный сценарий'};
    $('#result-title').textContent=titles[state.color];
    $('#result-description').textContent=`${names.color[state.color]} торт. Форма: ${names.shape[state.shape]}. Главная деталь: ${names.decor[state.decor]}. Сохраните эту идею в пожеланиях ниже.`;
    $('#builder-status').textContent='Ваш концепт готов. Можно обсудить идею или собрать ещё один торт.';
    $('#builder-result').focus({preventScroll:true});
    if(motionEnabled()&&window.gsap){gsap.fromTo(preview,{scale:.95},{scale:1,duration:.7,ease:'back.out(1.5)'});gsap.fromTo('.preview-orbit',{rotation:-25},{rotation:155,duration:1.2,ease:'power3.out'});}
  });
  $('#builder-back').addEventListener('click',()=>{if(state.step>0){state.step--;showStep(true);}});
  function resetBuilder(){state.color='cream';state.shape='round';state.decor='cherries';state.step=0;state.finished=false;$('#builder-result').hidden=true;$('#builder-fields').hidden=false;updateOptions();showStep();renderCake();}
  $('#builder-reset').addEventListener('click',()=>{resetBuilder();$('[data-step="0"] button').focus({preventScroll:true});});
  $('#use-concept').addEventListener('click',()=>{$('#cake-wish').value=`Моя идея: ${names.color[state.color].toLowerCase()} торт, форма — ${names.shape[state.shape]}, декор — ${names.decor[state.decor]}.`;});
  $$('.idea-select').forEach(button=>button.addEventListener('click',()=>{resetBuilder();state.color=button.dataset.preset;state.shape=state.color==='blue'?'tiered':state.color==='rose'?'mini':'round';state.decor=state.color==='rose'?'bow':'cherries';updateOptions();renderCake();$('#create').scrollIntoView({behavior:motionEnabled()?'smooth':'auto',block:'start'});}));
  renderCake(false);showStep();

  const form=$('#contact-form');
  function clearErrors(){ $('#form-status').textContent=''; $$('.field-error').forEach(el=>el.textContent='');$$('[aria-invalid]',form).forEach(el=>el.removeAttribute('aria-invalid')); }
  function setError(field,message,target){field.setAttribute('aria-invalid','true');$(target).textContent=message;}
  form.addEventListener('submit',event=>{
    event.preventDefault();clearErrors();let firstError=null;
    const name=$('#customer-name'),phone=$('#customer-phone'),consent=$('#demo-consent');
    if((name.value.match(/\p{L}/gu)||[]).length<2){setError(name,'Напишите имя: не меньше двух букв.','#name-error');firstError=name;}
    const digits=phone.value.replace(/\D/g,'');
    if(!/^\+?[\d\s()\-]+$/.test(phone.value.trim())||digits.length<10||digits.length>15){setError(phone,'Укажите телефон: от 10 до 15 цифр.','#phone-error');firstError=firstError||phone;}
    if(!consent.checked){setError(consent,'Подтвердите, что это демонстрация.','#consent-error');firstError=firstError||consent;}
    if(firstError){$('#form-status').textContent='Проверьте отмеченные поля.';firstError.focus();return;}
    form.reset();clearErrors();form.hidden=true;$('#form-success').hidden=false;$('#form-success').focus({preventScroll:false});
  });
  // Without JavaScript a disabled default submit button prevents a GET with personal data.
  $('.form-submit').disabled=false;
  $('#form-reset').addEventListener('click',()=>{$('#form-success').hidden=true;form.hidden=false;form.reset();clearErrors();$('#customer-name').focus({preventScroll:false});});
  $$('input,textarea',form).forEach(field=>field.addEventListener('input',()=>{field.removeAttribute('aria-invalid');const errorId=field.getAttribute('aria-describedby');if(errorId&&document.getElementById(errorId))document.getElementById(errorId).textContent='';}));

  // Bounded section-local pointer light and individual drawn details; controls stay fixed.
  const pointerCleanups=[];
  function enablePointer(){
    pointerCleanups.splice(0).forEach(fn=>fn());
    if(!motionEnabled()||coarseQuery.matches||!window.gsap)return;
    $$('.scene').forEach(section=>{
      let rect=null,raf=0,point={x:0,y:0};
      const arts=$$('.pointer-art',section);
      const targets=arts.map(art=>art.matches('.intro-cherry,.question-cherry')?$('use',art):art.matches('.contact-decoration,.footer-logo')?art.firstElementChild:art);
      const validTargets=targets.filter(Boolean);
      function apply(){raf=0;if(!motionEnabled())return;section.style.setProperty('--pointer-x',`${(point.x+.5)*100}%`);section.style.setProperty('--pointer-y',`${(point.y+.5)*100}%`);arts.forEach((art,i)=>{if(!targets[i]||art.closest('.cake-photo'))return;const intensity=art.classList.contains('footer-logo')?6:18;const motion={x:point.x*intensity,y:point.y*intensity,duration:.65,ease:'power2.out',overwrite:'auto'};if(!art.classList.contains('layer-halo'))motion.rotation=point.x*(i%2?5:-4);gsap.to(targets[i],motion);});
        if(section.classList.contains('hero')){gsap.to('#hero-code-cake .cake-code-cherries',{x:point.x*20,y:point.y*13,rotation:point.x*8,duration:.7,overwrite:'auto'});gsap.to('#hero-code-cake .cake-code-bow',{x:point.x*8,rotation:point.x*-5,duration:.7,overwrite:'auto'});gsap.to('#hero-code-cake .cake-code-tier',{rotationY:point.x*7,rotationX:point.y*-5,duration:.7,overwrite:'auto'});gsap.to('.hero-orbit',{x:point.x*-15,y:point.y*-10,duration:.7,overwrite:'auto'});}
      }
      const enter=()=>{rect=section.getBoundingClientRect();};
      const move=e=>{if(!rect)enter();point.x=Math.max(-.5,Math.min(.5,(e.clientX-rect.left)/rect.width-.5));point.y=Math.max(-.5,Math.min(.5,(e.clientY-rect.top)/rect.height-.5));if(!raf)raf=requestAnimationFrame(apply);};
      const leave=()=>{point={x:0,y:0};if(!raf)raf=requestAnimationFrame(apply);rect=null;};
      const refresh=()=>{rect=null;};
      section.addEventListener('pointerenter',enter);section.addEventListener('pointermove',move);section.addEventListener('pointerleave',leave);window.addEventListener('resize',refresh,{passive:true});window.addEventListener('scroll',refresh,{passive:true});
      pointerCleanups.push(()=>{section.removeEventListener('pointerenter',enter);section.removeEventListener('pointermove',move);section.removeEventListener('pointerleave',leave);window.removeEventListener('resize',refresh);window.removeEventListener('scroll',refresh);if(raf)cancelAnimationFrame(raf);if(window.gsap&&validTargets.length){gsap.killTweensOf(validTargets);gsap.set(validTargets,{clearProps:'transform'});}section.style.removeProperty('--pointer-x');section.style.removeProperty('--pointer-y');});
    });
  }
  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    function createMotion(){
      motionContext=gsap.context(()=>{
      const mobile=window.matchMedia('(max-width: 760px)').matches;
      gsap.fromTo('#hero-code-cake .cake-code-tier',{y:30,rotation:-5},{y:0,rotation:0,duration:1.2,ease:'power3.out'});
      gsap.fromTo('#hero-code-cake .cake-code-cherries',{y:-80,rotation:10},{y:0,rotation:0,duration:1.35,ease:'back.out(1.3)'});
      gsap.fromTo('#hero-code-cake .cake-code-plate',{scale:.82},{scale:1,duration:1.1,ease:'power3.out'});
      gsap.to('.ribbon-track',{xPercent:-24,ease:'none',scrollTrigger:{trigger:'.ribbon',start:'top bottom',end:'bottom top',scrub:1}});
      gsap.to('.hero-stamp',{rotation:-24,y:mobile?20:65,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.fromTo('.hero-orbit',{rotation:-8},{rotation:30,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.1}});
      gsap.fromTo('.intro-cherry',{x:mobile?-20:-60,rotation:-25},{x:0,rotation:12,ease:'none',scrollTrigger:{trigger:'.intro',start:'top bottom',end:'center center',scrub:1}});
      $$('.idea-card').forEach((card,i)=>{const art=$('.idea-art',card);if($('.cake-photo',card))return;gsap.fromTo(art,{rotation:(i-1)*8,scale:.9,y:mobile?35:75},{rotation:0,scale:1,y:0,ease:'power1.out',scrollTrigger:{trigger:card,start:'top bottom',end:'top 25%',scrub:1}});});
      const assembly=gsap.timeline({scrollTrigger:{trigger:'.atelier',start:'top bottom',end:mobile?'center 45%':'center 38%',scrub:1.1}});
      const offsets={plate:[0,80,-6],bottom:[mobile?-45:-120,55,-12],middle:[mobile?60:180,-20,9],top:[mobile?-60:-150,-100,-10],cream:[mobile?60:150,-160,14],cherries:[mobile?-40:-130,-200,-22]};
      Object.entries(offsets).forEach(([key,[x,y,rotation]],i)=>assembly.fromTo(`[data-layer="${key}"]`,{x,y,rotation},{x:0,y:0,rotation:0,duration:1,ease:'power1.inOut'},i*.025));
      gsap.fromTo('.layer-halo',{rotation:-35,scale:.65},{rotation:0,scale:1,ease:'none',scrollTrigger:{trigger:'.atelier',start:'top bottom',end:'center center',scrub:1.2}});
      $$('.layer-label').forEach((el,i)=>gsap.fromTo(el,{x:i%2?25:-25,y:20},{x:0,y:0,ease:'none',scrollTrigger:{trigger:'.layer-stage',start:'top bottom',end:'center center',scrub:1}}));
      gsap.fromTo('.preview-orbit',{rotation:-70,scale:.8},{rotation:-25,scale:1,ease:'none',scrollTrigger:{trigger:'.composer',start:'top bottom',end:'center center',scrub:1}});
      gsap.fromTo('.question-cherry',{rotation:-30,y:40},{rotation:20,y:0,ease:'none',scrollTrigger:{trigger:'.questions',start:'top bottom',end:'center center',scrub:1}});
      gsap.fromTo('.contact-decoration',{rotation:-35,scale:.7},{rotation:5,scale:1,ease:'none',scrollTrigger:{trigger:'.contacts',start:'top bottom',end:'center center',scrub:1}});
      gsap.fromTo('.footer-logo',{xPercent:-6},{xPercent:0,ease:'none',scrollTrigger:{trigger:'.footer',start:'top bottom',end:'bottom bottom',scrub:1}});
      });
    }
    const transientTargets = '.cake-preview,.cake-code-tier,.cake-code-cherries,.cake-code-bow,.cake-code-candles,.preview-orbit,.hero-orbit';
    function stopMotion(){
      pointerCleanups.splice(0).forEach(fn=>fn());
      if(motionContext){motionContext.revert();motionContext=null;}
      const activeTargets=$$(transientTargets);
      if(activeTargets.length){gsap.killTweensOf(activeTargets);gsap.set(activeTargets,{clearProps:'transform'});}
    }
    function syncMotion(){
      stopMotion();
      const enabled=motionEnabled();
      document.documentElement.dataset.motion=enabled?'on':'off';
      motionToggle.textContent=`Анимация: ${enabled?'вкл.':'выкл.'}`;
      motionToggle.setAttribute('aria-pressed',String(enabled));
      motionToggle.disabled=reducedQuery.matches;
      motionNote.textContent=reducedQuery.matches?'Анимация отключена системной настройкой уменьшения движения.':enabled?'Анимация включена. Её можно отключить.':'Анимация отключена. Все функции сайта доступны.';
      if(enabled){createMotion();enablePointer();}
      ScrollTrigger.refresh();
    }
    motionToggle.addEventListener('click',()=>{motionRequested=!motionRequested;syncMotion();});
    reducedQuery.addEventListener('change',syncMotion);coarseQuery.addEventListener('change',enablePointer);
    syncMotion();
    window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
    document.fonts.ready.then(()=>ScrollTrigger.refresh());
    $$('details').forEach(detail=>detail.addEventListener('toggle',()=>ScrollTrigger.refresh()));
    window.addEventListener('pagehide',stopMotion);
    window.addEventListener('pageshow',event=>{if(event.persisted)syncMotion();});
  } else {
    motionRequested=false;
    document.documentElement.dataset.motion='off';
    motionToggle.textContent='Анимация: выкл.';
    motionToggle.disabled=true;
    motionToggle.setAttribute('aria-pressed','false');
    motionNote.textContent='Анимация недоступна. Остальные функции работают.';
  }
})();
