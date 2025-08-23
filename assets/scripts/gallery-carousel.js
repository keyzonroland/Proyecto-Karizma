(function(){
  let index = 0;
  let track, slides, viewport, prevBtn, nextBtn;
  let autoTimer;

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function setIndex(i){
    if (!slides || !slides.length) return;
    const max = slides.length - 1;
    if (i < 0) index = max; else if (i > max) index = 0; else index = i;
    const offset = -index * viewport.clientWidth;
    track.style.transform = `translateX(${offset}px)`;
    preload(index-1); preload(index+1);
  }

  function next(){ setIndex(index+1); resetAuto(); }
  function prev(){ setIndex(index-1); resetAuto(); }

  function startAuto(){ stopAuto(); autoTimer = setInterval(()=> setIndex(index+1), 5000); }
  function stopAuto(){ if (autoTimer) clearInterval(autoTimer); }
  function resetAuto(){ stopAuto(); startAuto(); }

  function preload(i){
    if (!slides) return;
    const max = slides.length - 1;
    if (i < 0) i = max; if (i > max) i = 0;
    const img = qs('img', slides[i]);
    if (img && img.loading === 'lazy') img.decoding = 'async';
  }

  function onResize(){ setIndex(index); }

  function init(){
    const root = qs('.gallery-carousel');
    if (!root) return;
    viewport = qs('.gallery-carousel__viewport', root);
    track = qs('.gallery-carousel__track', root);
    slides = qsa('.gallery-carousel__slide', root);
    prevBtn = qs('.gallery-carousel__btn--prev', root);
    nextBtn = qs('.gallery-carousel__btn--next', root);
    if (!viewport || !track || !slides.length) return;

    // ancho fijo por slide
    const ro = new ResizeObserver(()=> setIndex(index));
    ro.observe(viewport);

    // eventos
    prevBtn && prevBtn.addEventListener('click', prev);
    nextBtn && nextBtn.addEventListener('click', next);

    let startX=0, dx=0; const threshold=40;
    viewport.addEventListener('pointerdown', e=>{ startX=e.clientX; dx=0; stopAuto(); viewport.setPointerCapture(e.pointerId); });
    viewport.addEventListener('pointermove', e=>{ if(startX){ dx=e.clientX-startX; }});
    viewport.addEventListener('pointerup', e=>{
      if(Math.abs(dx)>threshold){ dx<0? next(): prev(); } else { startAuto(); }
      startX=0; dx=0;
    });

    root.addEventListener('mouseenter', stopAuto);
    root.addEventListener('mouseleave', startAuto);
    document.addEventListener('keydown', (e)=>{
      if (e.key==='ArrowLeft') prev();
      if (e.key==='ArrowRight') next();
    });

    setIndex(0);
    startAuto();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
