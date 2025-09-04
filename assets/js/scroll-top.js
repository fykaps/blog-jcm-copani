/**
 * Funcionalidades de scroll mejoradas para el nuevo diseño
 */

// Mostrar/ocultar botón de subir con animación
function setupScrollTopButton() {
    const scrollTopBtn = document.getElementById('scroll-top');

    if (!scrollTopBtn) return;

    // Configurar IntersectionObserver para animar el botón
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el footer es visible, mover el botón arriba del footer
                scrollTopBtn.style.bottom = 'calc(var(--space-6) + 100px)';
            } else {
                // Posición normal
                scrollTopBtn.style.bottom = 'var(--space-6)';
            }
        });
    }, { threshold: 0.1 });

    // Observar el footer
    const footer = document.getElementById('main-footer');
    if (footer) observer.observe(footer);

    // Mostrar/ocultar con scroll
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Mostrar/ocultar botón basado en la posición de scroll
        if (currentScroll > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Detectar dirección del scroll
        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            // Scroll hacia abajo
            scrollTopBtn.classList.add('scrolling-down');
            scrollTopBtn.classList.remove('scrolling-up');
        } else if (currentScroll < lastScrollTop) {
            // Scroll hacia arriba
            scrollTopBtn.classList.add('scrolling-up');
            scrollTopBtn.classList.remove('scrolling-down');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Scroll suave al hacer click
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mejorar accesibilidad
    scrollTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Inicializar funcionalidades de scroll mejoradas
document.addEventListener('DOMContentLoaded', setupScrollTopButton);