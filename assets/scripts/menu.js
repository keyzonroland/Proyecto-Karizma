/**
 * Menú Hamburguesa para Dispositivos Móviles
 * Controla la apertura/cierre del menú de navegación en móviles
 */

class MobileMenu {
  constructor() {
    this.init();
  }

  init() {
    // Elementos del DOM
    this.toggleButton = document.querySelector('.nav__toggle');
    this.mobileMenu = document.querySelector('.nav__mobile-menu');
    this.overlay = document.querySelector('.nav__overlay');
    this.closeButton = document.querySelector('.nav__mobile-close');
    this.mobileLinks = document.querySelectorAll('.nav__mobile-link');
    this.body = document.body;

    // Verificar que los elementos existen
    if (!this.toggleButton || !this.mobileMenu || !this.overlay) {
      console.warn('Elementos del menú móvil no encontrados');
      return;
    }

    this.bindEvents();
  }

  bindEvents() {
    // Abrir menú
    this.toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openMenu();
    });

    // Cerrar menú - botón cerrar
    if (this.closeButton) {
      this.closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeMenu();
      });
    }

    // Cerrar menú - overlay
    this.overlay.addEventListener('click', () => {
      this.closeMenu();
    });

    // Cerrar menú - tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen()) {
        this.closeMenu();
      }
    });

    // Cerrar menú al hacer clic en enlaces (excepto el de próximos eventos)
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Si el enlace tiene href="#" (próximos eventos), no cerrar el menú
        if (link.getAttribute('href') === '#') {
          e.preventDefault();
          this.handleEventsClick();
          return;
        }
        
        // Para otros enlaces, cerrar el menú después de un pequeño delay
        setTimeout(() => {
          this.closeMenu();
        }, 150);
      });
    });

    // Cerrar menú en cambio de orientación o redimensión
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.isMenuOpen()) {
        this.closeMenu();
      }
    });

    // Prevenir scroll del body cuando el menú está abierto
    this.preventBodyScroll();
  }

  openMenu() {
    this.toggleButton.classList.add('active');
    this.mobileMenu.classList.add('active');
    this.overlay.classList.add('active');
    this.body.classList.add('menu-open');
    
    // Actualizar aria-expanded
    this.toggleButton.setAttribute('aria-expanded', 'true');
    
    // Focus en el primer enlace para accesibilidad
    setTimeout(() => {
      const firstLink = this.mobileMenu.querySelector('.nav__mobile-link');
      if (firstLink) firstLink.focus();
    }, 300);
  }

  closeMenu() {
    this.toggleButton.classList.remove('active');
    this.mobileMenu.classList.remove('active');
    this.overlay.classList.remove('active');
    this.body.classList.remove('menu-open');
    
    // Actualizar aria-expanded
    this.toggleButton.setAttribute('aria-expanded', 'false');
    
    // Devolver focus al botón hamburguesa
    this.toggleButton.focus();
  }

  isMenuOpen() {
    return this.mobileMenu.classList.contains('active');
  }

  handleEventsClick() {
    // Aquí puedes agregar lógica para mostrar eventos
    // Por ejemplo, abrir un modal o desplegar una lista
    console.log('Mostrando próximos eventos...');
    
    // Ejemplo: mostrar alert con eventos (reemplazar con modal real)
    const eventos = [
      'Lampa 11/07/2025',
      'Lampa 12/07/2025', 
      'Braseros de colina 19/07/2025',
      'Evento privado 26/07/2025',
      'Aniversario Indomables de Colina 02/08/2025'
    ];
    
    alert('Próximos Eventos:\n\n' + eventos.join('\n'));
  }

  preventBodyScroll() {
    // Prevenir scroll en iOS cuando el menú está abierto
    this.mobileMenu.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    });

    this.overlay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });
  }
}

// Inicializar el menú cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
});

// También exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileMenu;
}
