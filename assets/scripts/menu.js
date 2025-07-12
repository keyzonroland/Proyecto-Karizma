// Menú hamburguesa para móviles
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

if (navToggle && navList) {
  navToggle.addEventListener('click', function () {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('nav__list--open');
  });
  
  // Cerrar menú al hacer clic en enlaces de navegación
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Cerrar el menú móvil
      navToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('nav__list--open');
    });
  });
}
