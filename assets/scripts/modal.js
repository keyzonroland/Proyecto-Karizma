// Modal para información de integrantes
console.log('*** MODAL.JS CARGADO ***');

class MemberModal {
    constructor() {
        this.memberData = {
            juan: {
                name: "Juan González",
                role: "Tecladista y Director",
                image: "./assets/images/juan.jpg",
                description: "Director musical y tecladista principal de Grupo Karizma. Con más de 20 años de experiencia en la industria musical, Juan es el cerebro creativo detrás de los arreglos y la dirección artística de la banda. Su pasión por la música tropical y su habilidad para fusionar diferentes géneros han sido fundamentales en el éxito del grupo."
            },
            alexander: {
                name: "Alexander Vargas",
                role: "Voz",
                image: "./assets/images/alexander.jpg",
                description: "Vocalista principal de Grupo Karizma, conocido por su potente voz y animación excepcional. Alexander aporta energía y conexión con el público, siendo la cara visible del grupo en muchas presentaciones. Su versatilidad vocal le permite interpretar desde baladas románticas hasta los temas más bailables."
            },
            carlos: {
                name: "Carlos Ibáñez (KEYZON)",
                role: "Huiro, animaciones y percusiones electrónicas",
                image: "./assets/images/keyzon.jpg",
                description: "Especialista en percusiones electrónicas y animación. Carlos es el encargado de darle todo el Karizma a las presentaciones del grupo. Su dominio del huiro y las percusiones digitales crea la base rítmica que hace bailar a cientos de personas en cada presentación."
            },
            cristian: {
                name: "Cristian Martínez",
                role: "Batería y Percusión Latina",
                image: "./assets/images/cholito.jpg",
                description: "Baterista y percusionista latino del grupo. Cholito aporta el corazón rítmico de Karizma con su dominio de la batería tradicional y las percusiones latinas. Su estilo único fusiona técnicas clásicas con ritmos tropicales, creando el sonido característico que identifica al grupo."
            },
            fabian: {
                name: "Fabián Orellana",
                role: "Bajo",
                image: "./assets/images/fabian.jpg",
                description: "Bajista de Grupo Karizma, responsable de la base armónica y rítmica de la banda. Fabián combina técnica y groove, creando líneas de bajo que sostienen y enriquecen cada canción. Su experiencia en diferentes géneros musicales aporta versatilidad y profundidad al sonido del grupo."
            },
            jose: {
                name: "José Luis Vega",
                role: "Guitarra",
                image: "./assets/images/cotelo.jpg",
                description: "Guitarrista principal de Karizma, encargado de los solos y arreglos guitarrísticos que caracterizan el sonido del grupo. José Luis combina técnica clásica con el feeling tropical, creando melodías memorables que complementan perfectamente las voces y la base rítmica."
            },
            violeta: {
                name: "Violeta Valdés",
                role: "Staff",
                image: "./assets/images/violeta.jpg",
                description: "Miembro del equipo de staff de Grupo Karizma, encargada de la coordinación y apoyo logístico que permite que cada presentación sea un éxito. Violeta es parte fundamental del equipo que trabaja detrás de escena para que la magia de Karizma llegue al público."
            }
        };
        
        this.init();
    }
    
    init() {
        // Verificar que los elementos del modal existan
        this.modal = document.getElementById('memberModal');
        if (!this.modal) {
            console.error('Modal no encontrado');
            return;
        }
        
        this.overlay = this.modal.querySelector('.member-modal__overlay');
        this.closeBtn = this.modal.querySelector('.member-modal__close');
        this.memberImage = document.getElementById('memberModalImage');
        this.memberName = document.getElementById('memberModalName');
        this.memberRole = document.getElementById('memberModalRole');
        this.memberDescription = document.getElementById('memberModalDescription');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Event listeners para los integrantes
        const memberElements = document.querySelectorAll('.gallery-section__member[data-member]');
        console.log('Integrantes encontrados:', memberElements.length);
        
        memberElements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const memberId = element.dataset.member;
                console.log('Click en integrante:', memberId);
                this.showMember(memberId);
            });
            
            // Agregar cursor pointer
            element.style.cursor = 'pointer';
            element.style.transition = 'all 0.3s ease';
        });
        
        // Event listeners para cerrar modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeModal());
        }
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('member-modal--active')) {
                this.closeModal();
            }
        });
    }
    
    showMember(memberId) {
        const member = this.memberData[memberId];
        if (!member) {
            console.error('Integrante no encontrado:', memberId);
            return;
        }
        
        console.log('Mostrando integrante:', member.name);
        
        // Actualizar contenido del modal
        if (this.memberImage) {
            this.memberImage.src = member.image;
            this.memberImage.alt = member.name;
            console.log('Imagen asignada:', member.image);
        }
        if (this.memberName) {
            this.memberName.textContent = member.name;
            console.log('Nombre asignado:', member.name);
        }
        if (this.memberRole) {
            this.memberRole.textContent = member.role;
            console.log('Rol asignado:', member.role);
        }
        if (this.memberDescription) {
            this.memberDescription.textContent = member.description;
            console.log('Descripción asignada:', member.description);
        }
        
        // Mostrar modal
        this.modal.classList.add('member-modal--active');
        document.body.style.overflow = 'hidden';
        console.log('Modal mostrado con clase:', this.modal.className);
    }
    
    closeModal() {
        this.modal.classList.remove('member-modal--active');
        document.body.style.overflow = '';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando modal...');
    new MemberModal();
});

// También inicializar si el DOM ya está cargado
if (document.readyState !== 'loading') {
    console.log('DOM ya está cargado, inicializando modal...');
    new MemberModal();
}
