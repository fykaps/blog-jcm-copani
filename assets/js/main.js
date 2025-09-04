/**
 * Funcionalidades principales - Gestión de Navegación Mejorada
 */

// Navegación activa mejorada para menús complejos
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .footer-link, .mobile-menu a');

    // Primero, remover todas las clases activas
    navLinks.forEach(link => link.classList.remove('active'));

    // Encontrar y activar el enlace correspondiente
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');

            // Si es un enlace de submenú, también activar el item padre
            const parentMenuItem = link.closest('.menu-item');
            if (parentMenuItem) {
                const parentLink = parentMenuItem.querySelector('.nav-link');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }

            // Si es un enlace del footer, también activar el correspondiente en el header
            if (link.classList.contains('footer-link')) {
                const correspondingNavLink = document.querySelector(`.nav-link[href="${linkPage}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        }
    });
}

/**
 * Funcionalidades avanzadas para la sección Hero
 */

// Inicializar partículas de fondo
function initHeroParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Tamaño aleatorio
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        // Animación con delay aleatorio
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
    }
}

// Animación de contador de estadísticas
function animateStats() {
    const statElements = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const target = parseInt(statElement.getAttribute('data-count'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps

                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    statElement.textContent = Math.floor(current);
                }, 16);

                observer.unobserve(statElement);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(stat => observer.observe(stat));
}

// Efecto parallax para la imagen de fondo
function initParallaxEffect() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
}

// Inicializar todas las funcionalidades del hero
function initHero() {
    initHeroParticles();
    animateStats();
    initParallaxEffect();
}

// Inicializar funcionalidades mejoradas
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    initHero();

    // Cargar funcionalidades adicionales si existen
    if (typeof loadNews === 'function') loadNews();
    if (typeof loadMenu === 'function') loadMenu();
});