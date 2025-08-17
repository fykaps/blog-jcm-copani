/**
 * Funcionalidades principales mejoradas - Versión Ecommerce
 */

// Navegación activa mejorada
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .footer-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
            // Si es un enlace del header, también activar el correspondiente en el footer
            if (link.classList.contains('nav-link')) {
                const correspondingFooterLink = document.querySelector(`.footer-link[href="${linkPage}"]`);
                if (correspondingFooterLink) {
                    correspondingFooterLink.classList.add('active');
                }
            }
        }
    });
}

// Control del header al hacer scroll - Versión mejorada
function setupHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;
    const headerHeight = header.offsetHeight;

    // Añadir padding al body para compensar el header fijo
    document.body.style.paddingTop = `${headerHeight}px`;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Añadir clase scrolled al body para estilos adicionales
        if (currentScroll > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }

        // Determinar dirección del scroll con umbral
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scroll hacia abajo - ocultar header
            header.style.transform = `translateY(-${headerHeight}px)`;
        } else if (currentScroll < lastScroll || currentScroll <= scrollThreshold) {
            // Scroll hacia arriba o en parte superior - mostrar header
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Inicializar funcionalidades mejoradas
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    setupHeaderScroll();

    // Cargar funcionalidades adicionales si existen
    if (typeof loadNews === 'function') loadNews();
    if (typeof loadMenu === 'function') loadMenu();
});