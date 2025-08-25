/**
 * COMPONENTES REUTILIZABLES - SISTEMA DE NAVEGACIÓN CON SUBMENÚS
 * Menús y submenús responsivos estilo ecommerce profesional
 */

// Constantes para iconos SVG CORREGIDOS
const MENU_ICON = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
const CHEVRON_DOWN = `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>`;
const CHEVRON_RIGHT = `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;

const SOCIAL_ICONS = {
    facebook: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.12.14 4.53 1.57 4.66 4.66.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.14 3.12-1.57 4.53-4.66 4.66-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.12-.14-4.53-1.57-4.66-4.66-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85.14-3.12 1.57-4.53 4.66-4.66 1.27-.06 1.65-.07 4.85-.07zm0-1.8c-3.23 0-3.63.01-4.91.07-3.66.17-5.58 2.1-5.75 5.75-.06 1.28-.07 1.68-.07 4.91s.01 3.63.07 4.91c.17 3.66 2.1 5.58 5.75 5.75 1.28.06 1.68.07 4.91.07s3.63-.01 4.91-.07c3.66-.17 5.58-2.1 5.75-5.75.06-1.28.07-1.68.07-4.91s-.01-3.63-.07-4.91c-.17-3.66-2.1-5.58-5.75-5.75-1.28-.06-1.68-.07-4.91-.07zm0 3.31c-2.63 0-4.77 2.14-4.77 4.77s2.14 4.77 4.77 4.77 4.77-2.14 4.77-4.77-2.14-4.77-4.77-4.77zm0 7.87c-1.71 0-3.1-1.39-3.1-3.1s1.39-3.1 3.1-3.1 3.1 1.39 3.1 3.1-1.39 3.1-3.1 3.1zm6.31-7.9c-.61 0-1.11.5-1.11 1.11s.5 1.11 1.11 1.11 1.11-.5 1.11-1.11-.5-1.11-1.11-1.11z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
};

// Estructura de navegación completa con submenús
const NAVIGATION_STRUCTURE = [
    {
        title: "Inicio",
        href: "index.html",
        description: "Página principal con últimas noticias y destacados"
    },
    {
        title: "Institucional",
        href: "about.html",
        description: "Información sobre nuestra institución",
    },
    {
        title: "Noticias",
        href: "news.html",
        description: "Comunicados oficiales y avisos importantes",
        badge: "Nuevo"
    },
    {
        title: "Eventos",
        href: "event.html",
        description: "Actividades y celebraciones escolares"
    },
    {
        title: "Vida Escolar",
        href: "#",
        description: "Actividades y organización diaria",
        submenu: [
            {
                title: "Horario de clases",
                href: "schedule.html"
            },
            {
                title: "Menú escolar",
                href: "menu.html",
                description: "Alimentación y nutrición"
            },
            // {
            //     title: "Calendario académico",
            //     href: "calendar.html"
            // }
        ]
    },
    {
        title: "Tienda Escolar",
        href: "shopping.html",
        description: "Uniformes y útiles escolares",
        featured: true
    },
    {
        title: "Galerías",
        href: "gallery.html",
        description: "Fotos y videos institucionales"
    },
    {
        title: "Contacto",
        href: "contact.html",
        description: "Formulario de contacto, dirección y teléfonos",
        cta: true
    }
];

// Variables globales para el estado del menú
let isMobileMenuOpen = false;
let currentSubmenu = null;

/**
 * Cargar Header con Sistema de Navegación con Submenús
 */
function loadHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    header.innerHTML = `
        <div class="container header-container">
            <div class="logo">
                <img src="assets/img/logo.png" alt="Logo del colegio" class="logo-img">
                <h1 class="logo-title">Blog Escolar</h1>
            </div>
            
            <nav class="nav-menu" aria-label="Navegación principal">
                ${generateNavigationHTML()}
            </nav>
            
            <button class="menu-toggle" aria-label="Menú" aria-expanded="false">
                ${MENU_ICON}
            </button>
            
            <!-- Menú móvil -->
            <div id="mobile-menu" class="mobile-menu">
                <div class="mobile-menu-header">
                    <h3>Menú</h3>
                    <button class="mobile-menu-close" aria-label="Cerrar menú">${CLOSE_ICON}</button>
                </div>
                <div class="mobile-menu-content">
                    ${generateMobileNavigationHTML()}
                </div>
            </div>
        </div>
    `;

    setupNavigationInteractions();
    setupWindowResizeHandler();
}

/**
 * Configurar el handler para cambios de tamaño de ventana
 */
function setupWindowResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resetMenuOnResize();
        }, 250);
    });
}

/**
 * Restablecer el menú al cambiar el tamaño de la ventana
 */
function resetMenuOnResize() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const isMobileView = window.innerWidth < 1025;

    if (!isMobileView) {
        // Si estamos en vista desktop, cerrar menú móvil
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = MENU_ICON;
        isMobileMenuOpen = false;

        // Cerrar todos los submenús móviles
        document.querySelectorAll('.mobile-menu-item').forEach(item => {
            item.classList.remove('submenu-open');
        });

        document.querySelectorAll('.mobile-submenu-toggle').forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });

        currentSubmenu = null;
    } else if (isMobileView && isMobileMenuOpen) {
        // Si estamos en vista móvil y el menú estaba abierto, mantenerlo abierto
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Generar HTML para navegación desktop
 */
function generateNavigationHTML() {
    return `
        <ul class="main-menu">
            ${NAVIGATION_STRUCTURE.map(item => `
                <li class="menu-item ${item.submenu ? 'has-children' : ''} ${item.featured ? 'featured' : ''} ${item.cta ? 'cta' : ''}">
                    <a href="${item.href}" class="nav-link">
                        ${item.title}
                        ${item.submenu ? CHEVRON_DOWN : ''}
                        ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
                    </a>
                    ${item.submenu ? generateSubmenuHTML(item) : ''}
                </li>
            `).join('')}
        </ul>
    `;
}

/**
 * Generar HTML para submenús
 */
function generateSubmenuHTML(item) {
    return `
        <div class="sub-menu-wrapper">
            <ul class="sub-menu">
                ${item.submenu.map(subItem => `
                    <li class="menu-item">
                        <a href="${subItem.href}">
                            ${subItem.title}
                            ${subItem.description ? `<span class="menu-description">${subItem.description}</span>` : ''}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

/**
 * Generar HTML para navegación móvil
 */
function generateMobileNavigationHTML() {
    return `
        <ul class="mobile-main-menu">
            ${NAVIGATION_STRUCTURE.map(item => `
                <li class="mobile-menu-item ${item.submenu ? 'has-children' : ''}">
                    <div class="mobile-menu-link">
                        <a href="${item.href}">${item.title}</a>
                        ${item.submenu ? `<button class="mobile-submenu-toggle" aria-expanded="false">${CHEVRON_RIGHT}</button>` : ''}
                    </div>
                    ${item.submenu ? generateMobileSubmenuHTML(item) : ''}
                </li>
            `).join('')}
        </ul>
    `;
}

/**
 * Generar HTML para submenús móviles
 */
function generateMobileSubmenuHTML(item) {
    return `
        <div class="mobile-sub-menu">
            <div class="mobile-sub-menu-header">
                <button class="mobile-sub-menu-back" aria-label="Volver">
                    ${CHEVRON_RIGHT}
                </button>
                <h5>${item.title}</h5>
            </div>
            <ul>
                ${item.submenu.map(subItem => `
                    <li>
                        <a href="${subItem.href}">
                            ${subItem.title}
                            ${subItem.description ? `<span class="menu-description">${subItem.description}</span>` : ''}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

/**
 * Configurar interacciones de navegación
 */
function setupNavigationInteractions() {
    // Desktop hover interactions
    const menuItems = document.querySelectorAll('.menu-item.has-children');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });
    });

    // Mobile menu interactions
    const mobileToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.querySelector('.mobile-menu-close');
    const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileToggle.innerHTML = isExpanded ? MENU_ICON : CLOSE_ICON;
            isMobileMenuOpen = mobileMenu.classList.contains('active');

            // Si se está cerrando el menú, cerrar también los submenús
            if (!isMobileMenuOpen) {
                closeAllMobileSubmenus();
            }
        });
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.innerHTML = MENU_ICON;
            isMobileMenuOpen = false;

            // Cerrar todos los submenús al cerrar el menú principal
            closeAllMobileSubmenus();
        });
    }

    // Mobile submenu interactions
    mobileSubmenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const menuItem = toggle.closest('.mobile-menu-item');
            menuItem.classList.add('submenu-open');
            toggle.setAttribute('aria-expanded', 'true');
            currentSubmenu = menuItem;
        });
    });

    // Mobile submenu back buttons
    const mobileSubmenuBacks = document.querySelectorAll('.mobile-sub-menu-back');
    mobileSubmenuBacks.forEach(back => {
        back.addEventListener('click', () => {
            const submenu = back.closest('.mobile-sub-menu');
            const menuItem = submenu.closest('.mobile-menu-item');

            menuItem.classList.remove('submenu-open');
            const toggle = menuItem.querySelector('.mobile-submenu-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
            currentSubmenu = null;
        });
    });

    // Cerrar menú al hacer clic en enlaces (móviles)
    document.querySelectorAll('.mobile-main-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.innerHTML = MENU_ICON;
            isMobileMenuOpen = false;

            // Cerrar todos los submenús
            closeAllMobileSubmenus();
        });
    });
}

/**
 * Cerrar todos los submenús móviles
 */
function closeAllMobileSubmenus() {
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.classList.remove('submenu-open');
    });

    document.querySelectorAll('.mobile-submenu-toggle').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
    });

    currentSubmenu = null;
}

/**
 * Cargar Footer con Redes Sociales y QR
 */
function loadFooter() {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div class="footer-container">
                <div class="footer-column">
                    <h3 class="footer-title">Sobre nosotros</h3>
                    <p class="footer-description">El blog oficial de la institución educativa, donde compartimos noticias, eventos y logros de nuestra comunidad.</p>
                    
                    <div class="qr-container">
                        <img src="assets/img/qr-code.png" alt="Código QR del sitio" class="qr-code">
                        <p class="qr-text">Escanea para visitarnos desde tu móvil</p>
                    </div>
                </div>
                
                <div class="footer-column">
                    <h3 class="footer-title">Enlaces rápidos</h3>
                    <ul class="footer-links">
                        <li><a href="index.html" class="footer-link">Inicio</a></li>
                        <li><a href="noticias.html" class="footer-link">Noticias</a></li>
                        <li><a href="eventos.html" class="footer-link">Eventos</a></li>
                        <li><a href="menu.html" class="footer-link">Menú</a></li>
                        <li><a href="horario.html" class="footer-link">Horario</a></li>
                        <li><a href="galerias.html" class="footer-link">Galerías</a></li>
                        <li><a href="contacto.html" class="footer-link">Contacto</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h3 class="footer-title">Contacto</h3>
                    <ul class="footer-contact">
                        <li class="contact-item">
                            <svg viewBox="0 0 24 24" width="16" height="16" class="contact-icon">
                                <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            Calle Principal 123, Ciudad
                        </li>
                        <li class="contact-item">
                            <svg viewBox="0 0 24 24" width="16" height="16" class="contact-icon">
                                <path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                            </svg>
                            (123) 456-7890
                        </li>
                        <li class="contact-item">
                            <svg viewBox="0 极 0 24 24" width="16" height="16" class="contact-icon">
                                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            contacto@colegio.edu
                        </li>
                    </ul>
                    
                    <div class="social-media">
                        <h4 class="social-title">Síguenos en redes</h4>
                        <div class="social-icons">
                            <a href="https://facebook.com" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                ${SOCIAL_ICONS.facebook}
                            </a>
                            <a href="https://twitter.com" class="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                ${SOCIAL_ICONS.twitter}
                            </a>
                            <a href="https://instagram.com" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                ${SOCIAL_ICONS.instagram}
                            </a>
                            <a href="https://youtube.com" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                ${SOCIAL_ICONS.youtube}
                            </a>
                            <a href="https://wa.me/1234567890" class="social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                                ${SOCIAL_ICONS.whatsapp}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p class="copyright">&copy; ${new Date().getFullYear()} Blog Escolar. Todos los derechos reservados.</p>
            </div>
        </div>
    `;
}

/**
 * Establecer el elemento de menú activo según la página actual
 */
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .footer-link, .mobile-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');

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
 * Inicializar todos los componentes
 */
function initComponents() {
    loadHeader();
    loadFooter();
    setActiveMenu();
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initComponents);