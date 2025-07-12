// Carrusel de hits en la sección hero
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero__carousel-slide');
const dots = document.querySelectorAll('.hero__carousel-dot');
const totalSlides = slides.length;
let autoSlideInterval;

// Función para mostrar una slide específica
function showSlide(index) {
    // Remover clase active de todas las slides y dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Asegurarse de que el índice esté en el rango válido
    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Mostrar la slide actual
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    
    // Mover el track del carrusel
    const track = document.querySelector('.hero__carousel-track');
    if (track) {
        track.style.transform = `translateX(-${currentSlideIndex * 20}%)`;
    }
}

// Función para ir a la siguiente slide
function nextSlide() {
    showSlide(currentSlideIndex + 1);
    resetAutoSlide();
}

// Función para ir a la slide anterior
function prevSlide() {
    showSlide(currentSlideIndex - 1);
    resetAutoSlide();
}

// Función para ir a una slide específica
function currentSlide(index) {
    showSlide(index - 1); // -1 porque el parámetro viene desde 1
    resetAutoSlide();
}

// Función para iniciar el auto-slide
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Cambia cada 5 segundos
}

// Función para resetear el auto-slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Función para pausar el auto-slide
function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Función para reanudar el auto-slide
function resumeAutoSlide() {
    startAutoSlide();
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el carrusel existe en la página
    const carousel = document.querySelector('.hero__carousel');
    if (carousel) {
        // Mostrar la primera slide
        showSlide(0);
        
        // Iniciar auto-slide
        startAutoSlide();
        
        // Pausar auto-slide cuando el mouse esté sobre el carrusel
        carousel.addEventListener('mouseenter', pauseAutoSlide);
        carousel.addEventListener('mouseleave', resumeAutoSlide);
        
        // Agregar soporte para touch/swipe en dispositivos móviles
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            pauseAutoSlide();
        });
        
        carousel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', () => {
            const difference = startX - endX;
            const threshold = 50; // Mínimo deslizamiento para cambiar slide
            
            if (Math.abs(difference) > threshold) {
                if (difference > 0) {
                    nextSlide(); // Deslizar hacia la izquierda - siguiente
                } else {
                    prevSlide(); // Deslizar hacia la derecha - anterior
                }
            }
            resumeAutoSlide();
        });
        
        // Agregar soporte para teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }
});

// Hacer las funciones globales para que puedan ser llamadas desde el HTML
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.currentSlide = currentSlide;
