<<<<<<< HEAD
/**
 * Funcionalidades de scroll
 */

// Mostrar/ocultar botón de subir
function setupScrollTopButton() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar funcionalidades de scroll
=======
/**
 * Funcionalidades de scroll
 */

// Mostrar/ocultar botón de subir
function setupScrollTopButton() {
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicializar funcionalidades de scroll
>>>>>>> f544b31e5157af84e4703e6538865ca99e6358ab
document.addEventListener('DOMContentLoaded', setupScrollTopButton);