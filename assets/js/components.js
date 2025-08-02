<<<<<<< HEAD
/**
 * COMPONENTES REUTILIZABLES DEL BLOG ESCOLAR
 * 
 * Este archivo contiene todos los componentes reutilizables del blog:
 * - Header con menú hamburguesa responsive
 * - Footer con redes sociales
 * - Funciones auxiliares
 */

// Constantes para iconos SVG
const MENU_ICON = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
const SOCIAL_ICONS = {
    facebook: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.12.14 4.53 1.57 4.66 4.66.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.14 3.12-1.57 4.53-4.66 4.66-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.12-.14-4.53-1.57-4.66-4.66-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85.14-3.12 1.57-4.53 4.66-4.66 1.27-.06 1.65-.07 4.85-.07zm0-1.8c-3.23 0-3.63.01-4.91.07-3.66.17-5.58 2.1-5.75 5.75-.06 1.28-.07 1.68-.07 4.91s.01 3.63.07 4.91c.17 3.66 2.1 5.58 5.75 5.75 1.28.06 1.68.07 4.91.07s3.63-.01 4.91-.07c3.66-.17 5.58-2.1 5.75-5.75.06-1.28.07-1.68.07-4.91s-.01-3.63-.07-4.91c-.17-3.66-2.1-5.58-5.75-5.75-1.28-.06-1.68-.07-4.91-.07zm0 3.31c-2.63 0-4.77 2.14-4.77 4.77s2.14 4.77 4.77 4.77 4.77-2.14 4.77-4.77-2.14-4.77-4.77-4.77zm0 7.87c-1.71 0-3.1-1.39-3.1-3.1s1.39-3.1 3.1-3.1 3.1 1.39 3.1 3.1-1.39 3.1-3.1 3.1zm6.31-7.9c-.61 0-1.11.5-1.11 1.11s.5 1.11 1.11 1.11 1.11-.5 1.11-1.11-.5-1.11-1.11-1.11z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>`
};

/**
 * Cargar Header con Menú Hamburguesa
 * - Logo y título
 * - Navegación principal
 * - Menú responsive con toggle
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
            <nav class="nav-menu">
                <a href="index.html" class="nav-link">Inicio</a>
                <a href="about.html" class="nav-link">Acerca del Blog</a>
                <a href="news.html" class="nav-link">Noticias</a>
                <a href="events.html" class="nav-link">Eventos</a>
                <a href="gallery.html" class="nav-link">Galería</a>
                <a href="contact.html" class="nav-link">Contacto</a>
            </nav>
            <button class="menu-toggle" aria-label="Menú" aria-expanded="false">
                ${MENU_ICON}
            </button>
        </div>
    `;

    setupMenuToggle();
}

/**
 * Configurar el Toggle del Menú Hamburguesa
 * - Alterna entre icono de menú y X
 * - Controla la visibilidad del menú
 * - Maneja el estado ARIA
 */
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        // Alternar estado
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');

        // Cambiar icono
        menuToggle.innerHTML = isExpanded ? MENU_ICON : CLOSE_ICON;
    });

    // Cerrar menú al hacer clic en un enlace (en móviles)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = MENU_ICON;
            }
        });
    });
}

/**
 * Cargar Footer con Redes Sociales
 * - Información de contacto
 * - Enlaces rápidos
 * - Redes sociales
 * - Copyright
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
                </div>
                
                <div class="footer-column">
                    <h3 class="footer-title">Enlaces rápidos</h3>
                    <ul class="footer-links">
                        <li><a href="index.html" class="footer-link">Inicio</a></li>
                        <li><a href="news.html" class="footer-link">Noticias</a></li>
                        <li><a href="events.html" class="footer-link">Eventos</a></li>
                        <li><a href="gallery.html" class="footer-link">Galería</a></li>
                        <li><a href="contact.html" class="footer-link">Contacto</a></li>
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
                            <svg viewBox="0 0 24 24" width="16" height="16" class="contact-icon">
                                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            contacto@colegio.edu
                        </li>
                    </ul>
                    
                    <div class="social-media">
                        <h4 class="social-title">Síguenos</h4>
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
 * - Compara la URL actual con los enlaces del menú
 * - Añade la clase 'active' al enlace correspondiente
 * - Funciona tanto para el header como para el footer
 */
function setActiveMenu() {
    // Obtener la ruta actual (ej: 'news.html' o 'index.html')
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Seleccionar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link, .footer-link');

    navLinks.forEach(link => {
        // Obtener la página del enlace (ej: 'news.html')
        const linkPage = link.getAttribute('href');

        // Comprobar si el enlace coincide con la página actual
        if (currentPage === linkPage) {
            link.classList.add('active');

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
 * Inicializar todos los componentes
 * - Header
 * - Footer
 * - Otros componentes que puedan añadirse
 */
function initComponents() {
    loadHeader();
    loadFooter();
    setActiveMenu();
    // Otros componentes que puedan necesitar inicialización
}

// Cargar componentes cuando el DOM esté listo
=======
/**
 * COMPONENTES REUTILIZABLES DEL BLOG ESCOLAR
 * 
 * Este archivo contiene todos los componentes reutilizables del blog:
 * - Header con menú hamburguesa responsive
 * - Footer con redes sociales
 * - Funciones auxiliares
 */

// Constantes para iconos SVG
const MENU_ICON = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
const SOCIAL_ICONS = {
    facebook: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.12.14 4.53 1.57 4.66 4.66.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.14 3.12-1.57 4.53-4.66 4.66-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.12-.14-4.53-1.57-4.66-4.66-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85.14-3.12 1.57-4.53 4.66-4.66 1.27-.06 1.65-.07 4.85-.07zm0-1.8c-3.23 0-3.63.01-4.91.07-3.66.17-5.58 2.1-5.75 5.75-.06 1.28-.07 1.68-.07 4.91s.01 3.63.07 4.91c.17 3.66 2.1 5.58 5.75 5.75 1.28.06 1.68.07 4.91.07s3.63-.01 4.91-.07c3.66-.17 5.58-2.1 5.75-5.75.06-1.28.07-1.68.07-4.91s-.01-3.63-.07-4.91c-.17-3.66-2.1-5.58-5.75-5.75-1.28-.06-1.68-.07-4.91-.07zm0 3.31c-2.63 0-4.77 2.14-4.77 4.77s2.14 4.77 4.77 4.77 4.77-2.14 4.77-4.77-2.14-4.77-4.77-4.77zm0 7.87c-1.71 0-3.1-1.39-3.1-3.1s1.39-3.1 3.1-3.1 3.1 1.39 3.1 3.1-1.39 3.1-3.1 3.1zm6.31-7.9c-.61 0-1.11.5-1.11 1.11s.5 1.11 1.11 1.11 1.11-.5 1.11-1.11-.5-1.11-1.11-1.11z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>`
};

/**
 * Cargar Header con Menú Hamburguesa
 * - Logo y título
 * - Navegación principal
 * - Menú responsive con toggle
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
            <nav class="nav-menu">
                <a href="index.html" class="nav-link">Inicio</a>
                <a href="about.html" class="nav-link">Acerca del Blog</a>
                <a href="news.html" class="nav-link">Noticias</a>
                <a href="events.html" class="nav-link">Eventos</a>
                <a href="gallery.html" class="nav-link">Galería</a>
                <a href="contact.html" class="nav-link">Contacto</a>
            </nav>
            <button class="menu-toggle" aria-label="Menú" aria-expanded="false">
                ${MENU_ICON}
            </button>
        </div>
    `;

    setupMenuToggle();
}

/**
 * Configurar el Toggle del Menú Hamburguesa
 * - Alterna entre icono de menú y X
 * - Controla la visibilidad del menú
 * - Maneja el estado ARIA
 */
function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

        // Alternar estado
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');

        // Cambiar icono
        menuToggle.innerHTML = isExpanded ? MENU_ICON : CLOSE_ICON;
    });

    // Cerrar menú al hacer clic en un enlace (en móviles)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = MENU_ICON;
            }
        });
    });
}

/**
 * Cargar Footer con Redes Sociales
 * - Información de contacto
 * - Enlaces rápidos
 * - Redes sociales
 * - Copyright
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
                </div>
                
                <div class="footer-column">
                    <h3 class="footer-title">Enlaces rápidos</h3>
                    <ul class="footer-links">
                        <li><a href="index.html" class="footer-link">Inicio</a></li>
                        <li><a href="news.html" class="footer-link">Noticias</a></li>
                        <li><a href="events.html" class="footer-link">Eventos</a></li>
                        <li><a href="gallery.html" class="footer-link">Galería</a></li>
                        <li><a href="contact.html" class="footer-link">Contacto</a></li>
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
                            <svg viewBox="0 0 24 24" width="16" height="16" class="contact-icon">
                                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            contacto@colegio.edu
                        </li>
                    </ul>
                    
                    <div class="social-media">
                        <h4 class="social-title">Síguenos</h4>
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
 * Inicializar todos los componentes
 * - Header
 * - Footer
 * - Otros componentes que puedan añadirse
 */
function initComponents() {
    loadHeader();
    loadFooter();
    // Otros componentes que puedan necesitar inicialización
}

// Cargar componentes cuando el DOM esté listo
>>>>>>> f544b31e5157af84e4703e6538865ca99e6358ab
document.addEventListener('DOMContentLoaded', initComponents);