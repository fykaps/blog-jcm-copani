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

    // Para páginas que están dentro de secciones con submenús
    if (typeof NAVIGATION_STRUCTURE !== 'undefined') {
        NAVIGATION_STRUCTURE.forEach(section => {
            if (section.submenu) {
                const isInSection = section.submenu.some(item =>
                    window.location.pathname.includes(item.href.replace('.html', ''))
                );

                if (isInSection) {
                    const sectionLink = document.querySelector(`.nav-link[href="${section.href}"]`);
                    if (sectionLink) {
                        sectionLink.classList.add('active');
                    }
                }
            }
        });
    }
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

            // Ocultar menús abiertos al hacer scroll
            document.querySelectorAll('.sub-menu-wrapper').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            });
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
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

// Cerrar menús al hacer clic fuera de ellos
function setupClickOutside() {
    document.addEventListener('click', (e) => {
        const menus = document.querySelectorAll('.sub-menu-wrapper');
        const menuItems = document.querySelectorAll('.menu-item.has-children');

        let clickedInsideMenu = false;

        menus.forEach(menu => {
            if (menu.contains(e.target)) {
                clickedInsideMenu = true;
            }
        });

        menuItems.forEach(item => {
            if (item.contains(e.target)) {
                clickedInsideMenu = true;
            }
        });

        if (!clickedInsideMenu) {
            menus.forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            });

            menuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// Inicializar funcionalidades mejoradas
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    setupHeaderScroll();
    setupClickOutside();

    // Cargar funcionalidades adicionales si existen
    if (typeof loadNews === 'function') loadNews();
    if (typeof loadMenu === 'function') loadMenu();
});