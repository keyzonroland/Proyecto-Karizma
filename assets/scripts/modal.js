// Modal para información de integrantes
class MemberModal {
    constructor() {
        this.modal = document.getElementById('memberModal');
        this.overlay = this.modal.querySelector('.member-modal__overlay');
        this.closeBtn = this.modal.querySelector('.member-modal__close');
        this.memberImage = document.getElementById('memberModalImage');
        this.memberName = document.getElementById('memberModalName');
        this.memberRole = document.getElementById('memberModalRole');
        this.memberDescription = document.getElementById('memberModalDescription');
        
        // Información de cada integrante
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
                description: "Vocalista principal de Grupo Karizma, conocido por su potente voz y animacion excepcional. Alexander aporta energía y conexión con el público, siendo la cara visible del grupo en muchas presentaciones. Su versatilidad vocal le permite interpretar desde baladas románticas hasta los temas más bailables."
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
        // Agregar event listeners a cada integrante
        const members = document.querySelectorAll('.gallery-section__member[data-member]');
        members.forEach(member => {
            member.addEventListener('click', () => {
                const memberKey = member.getAttribute('data-member');
                this.openModal(memberKey);
            });
            
            // Agregar cursor pointer para indicar que es clickeable
            member.style.cursor = 'pointer';
        });
        
        // Event listeners para cerrar el modal
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.overlay.addEventListener('click', () => this.closeModal());
        
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('member-modal--active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(memberKey) {
        const member = this.memberData[memberKey];
        if (!member) return;
        
        // Actualizar contenido del modal
        this.memberImage.src = member.image;
        this.memberImage.alt = member.name;
        this.memberName.textContent = member.name;
        this.memberRole.textContent = member.role;
        this.memberDescription.textContent = member.description;
        
        // Mostrar modal
        this.modal.classList.add('member-modal--active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
    
    closeModal() {
        this.modal.classList.remove('member-modal--active');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
}

// Inicializar modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new MemberModal();
});
