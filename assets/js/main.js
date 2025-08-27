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

// Inicializar funcionalidades mejoradas
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();

    // Cargar funcionalidades adicionales si existen
    if (typeof loadNews === 'function') loadNews();
    if (typeof loadMenu === 'function') loadMenu();
});