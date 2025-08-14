(function(){
  // Configuración: usa un namespace único para tu dominio/proyecto
  var NAMESPACE = 'karizma-cl';
  var KEY = 'home';
  var el = document.getElementById('visitCount');
  if(!el) return;

  function setText(n){ el.textContent = new Intl.NumberFormat('es-CL').format(n); }

  // Fallback sin red usando localStorage (por si falla la API o no hay conexión)
  function bumpLocal(){
    try {
      var k = 'vc_'+NAMESPACE+'_'+KEY;
      var v = parseInt(localStorage.getItem(k) || '0', 10) + 1;
      localStorage.setItem(k, String(v));
      setText(v);
    } catch(e){ setText('?'); }
  }

  // Intentar usar CountAPI (gratuita)
  var url = 'https://api.countapi.xyz/hit/'+encodeURIComponent(NAMESPACE)+'/'+encodeURIComponent(KEY);
  // Evitar bloquear render
  if('requestIdleCallback' in window){
    requestIdleCallback(fetchCount);
  } else {
    setTimeout(fetchCount, 0);
  }

  function fetchCount(){
    fetch(url, { mode: 'cors', cache: 'no-store' })
      .then(function(r){ return r.json(); })
      .then(function(data){
        if(data && typeof data.value === 'number'){
          setText(data.value);
          try{
            localStorage.setItem('vc_'+NAMESPACE+'_'+KEY, String(data.value));
          }catch(_){/* ignore */}
        } else {
          bumpLocal();
        }
      })
      .catch(function(){ bumpLocal(); });
  }
})();
