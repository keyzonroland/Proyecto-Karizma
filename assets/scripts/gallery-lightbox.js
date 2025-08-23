(function(){
  // Soporta tanto cuadrícula (.photo-gallery) como carrusel (.gallery-carousel)
  var root = document.querySelector('.photo-gallery') || document.querySelector('.gallery-carousel') || null;
  if(!root) return;

  var images = Array.prototype.slice.call(root.querySelectorAll('.photo-gallery__img'));
  var lb = document.getElementById('photoLightbox');
  var imgEl = document.getElementById('photoLightboxImg');
  var capEl = document.getElementById('photoLightboxCaption');
  var lastFocus = null;
  var index = -1;
  var startX = 0, startY = 0, tracking = false, swiped = false;
  var SWIPE_THRESHOLD = 40; // px

  function getCaption(node){
    if(!node) return '';
    var dc = node.getAttribute('data-caption');
    if(dc && dc.trim()) return dc.trim();
    return node.getAttribute('alt') || '';
  }

  function getSrc(node){
    if(!node) return '';
    return node.getAttribute('data-fullsrc') || node.getAttribute('src') || '';
  }

  function render(){
    var node = images[index];
    if(!node) return;
    var src = getSrc(node);
    var caption = getCaption(node);
    imgEl.src = src;
    imgEl.alt = caption;
    capEl.textContent = caption;
    preloadNeighbors();
  }

  function preloadNeighbors(){
    if(images.length < 2) return;
    var nextIdx = (index + 1) % images.length;
    var prevIdx = (index - 1 + images.length) % images.length;
    [nextIdx, prevIdx].forEach(function(i){
      var n = images[i];
      var s = getSrc(n);
      if(!s) return;
      var im = new Image();
      im.decoding = 'async';
      im.loading = 'eager';
      im.src = s;
    });
  }

  function openAt(i){
    index = i;
    lastFocus = document.activeElement;
    render();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function(){
      lb.classList.add('open');
      imgEl.focus({preventScroll:true});
    });
  }

  function close(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function(){ lb.hidden = true; imgEl.src = ''; }, 150);
    if(lastFocus && lastFocus.focus) lastFocus.focus();
    index = -1;
  }

  function next(){
    if(images.length < 1) return;
    index = (index + 1) % images.length;
    render();
  }
  function prev(){
    if(images.length < 1) return;
    index = (index - 1 + images.length) % images.length;
    render();
  }

  // Gestos: Pointer/Touch Swipe
  function onPointerDown(e){
    if(lb.hidden) return;
    tracking = true;
    swiped = false;
    startX = (e.touches ? e.touches[0].clientX : e.clientX) || 0;
    startY = (e.touches ? e.touches[0].clientY : e.clientY) || 0;
  }

  function onPointerMove(e){
    if(!tracking) return;
    var x = (e.touches ? e.touches[0].clientX : e.clientX) || 0;
    var y = (e.touches ? e.touches[0].clientY : e.clientY) || 0;
    var dx = x - startX;
    var dy = y - startY;
    if(Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8){
      // Desactivar el scroll vertical mientras se hace swipe horizontal
      if(e.cancelable) e.preventDefault();
    }
    if(!swiped && Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)){
      swiped = true;
      if(dx < 0) next(); else prev();
    }
  }

  function onPointerUp(){
    tracking = false;
    swiped = false;
  }

  // Click en miniaturas
  root.addEventListener('click', function(e){
    var t = e.target;
    if(!(t && t.classList && t.classList.contains('photo-gallery__img'))) return;
    e.preventDefault();
    var i = images.indexOf(t);
    if(i >= 0) openAt(i);
  }, false);

  // Overlay / Close
  lb.addEventListener('click', function(e){
    if(e.target.hasAttribute('data-close')) close();
    if(e.target.hasAttribute('data-next')) next();
    if(e.target.hasAttribute('data-prev')) prev();
  });

  // Listeners para swipe (Pointer Events si existen, si no Touch)
  var opts = { passive: false };
  if('onpointerdown' in window){
    lb.addEventListener('pointerdown', onPointerDown, opts);
    lb.addEventListener('pointermove', onPointerMove, opts);
    lb.addEventListener('pointerup', onPointerUp, opts);
    lb.addEventListener('pointercancel', onPointerUp, opts);
  } else {
    lb.addEventListener('touchstart', onPointerDown, opts);
    lb.addEventListener('touchmove', onPointerMove, opts);
    lb.addEventListener('touchend', onPointerUp, opts);
    lb.addEventListener('touchcancel', onPointerUp, opts);
  }

  // Teclado
  document.addEventListener('keydown', function(e){
    if(lb.hidden) return;
    if(e.key === 'Escape') return close();
    if(e.key === 'ArrowRight') return next();
    if(e.key === 'ArrowLeft') return prev();
  });
})();
