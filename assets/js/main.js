<<<<<<< HEAD
/**
 * Funcionalidades principales del blog
 */

// Navegación activa
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

// Control del header al hacer scroll
function setupHeaderScroll() {
    const header = document.getElementById('main-header');
    let lastScroll = 0;
    const scrollThreshold = 100; // Cuántos píxeles de scroll antes de activar el efecto

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Siempre mostrar header en la parte superior
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            header.classList.add('visible');
            document.body.classList.remove('scrolled');
            return;
        }

        // Añadir clase scrolled al body para estilos adicionales
        if (currentScroll > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }

        // Determinar dirección del scroll
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scroll hacia abajo - ocultar header
            header.classList.remove('visible');
            header.classList.add('hidden');
        } else if (currentScroll < lastScroll) {
            // Scroll hacia arriba - mostrar header
            header.classList.remove('hidden');
            header.classList.add('visible');
        }

        lastScroll = currentScroll;
    });
}

// Inicializar funcionalidades
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    setupHeaderScroll();
=======
/**
 * Funcionalidades principales del blog
 */

// Navegación activa
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

// Control del header al hacer scroll
function setupHeaderScroll() {
    const header = document.getElementById('main-header');
    let lastScroll = 0;
    const scrollThreshold = 100; // Cuántos píxeles de scroll antes de activar el efecto

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Siempre mostrar header en la parte superior
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            header.classList.add('visible');
            document.body.classList.remove('scrolled');
            return;
        }

        // Añadir clase scrolled al body para estilos adicionales
        if (currentScroll > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }

        // Determinar dirección del scroll
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scroll hacia abajo - ocultar header
            header.classList.remove('visible');
            header.classList.add('hidden');
        } else if (currentScroll < lastScroll) {
            // Scroll hacia arriba - mostrar header
            header.classList.remove('hidden');
            header.classList.add('visible');
        }

        lastScroll = currentScroll;
    });
}

// Inicializar funcionalidades
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    setupHeaderScroll();
>>>>>>> f544b31e5157af84e4703e6538865ca99e6358ab
});