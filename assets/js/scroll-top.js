/**
 * Funcionalidades de scroll mejoradas
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
    }, {
        threshold: 0.1
    });

    // Observar el footer
    const footer = document.getElementById('main-footer');
    if (footer) observer.observe(footer);

    // Mostrar/ocultar con scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
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