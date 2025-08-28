/**
 * MÓDULO DE BOTONES FLOTANTES - SISTEMA PROFESIONAL
 * Gestión centralizada de todos los botones flotantes con IntersectionObserver
 */

class FloatingButtonsManager {
    constructor() {
        this.buttons = [];
        this.footer = null;
        this.observer = null;
        this.isInitialized = false;
    }

    /**
     * Inicializar el gestor de botones flotantes
     */
    init() {
        if (this.isInitialized) return;

        this.footer = document.getElementById('main-footer');

        // Configurar IntersectionObserver para el footer
        this.setupFooterObserver();

        // Registrar botones existentes
        this.registerExistingButtons();

        this.isInitialized = true;
        console.log('FloatingButtonsManager initialized');
    }

    /**
     * Configurar observador para el footer
     */
    setupFooterObserver() {
        if (!this.footer) return;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Footer visible - ocultar botones
                        this.hideAllButtons();
                    } else {
                        // Footer no visible - mostrar botones
                        this.showAllButtons();
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px 50px 0px' // Margen inferior para detectar antes
            }
        );

        this.observer.observe(this.footer);
    }

    /**
     * Registrar botones existentes en el DOM
     */
    registerExistingButtons() {
        const buttonSelectors = [
            '.floating-cart',
            '.floating-wishlist',
            '.floating-whatsapp',
        ];

        buttonSelectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => this.registerButton(button));
        });
    }

    /**
     * Registrar un nuevo botón flotante
     * @param {HTMLElement} button - Elemento del botón
     * @param {Object} options - Opciones de configuración
     */
    registerButton(button, options = {}) {
        if (!button) return;

        const buttonConfig = {
            element: button,
            originalPosition: window.getComputedStyle(button).position,
            originalBottom: window.getComputedStyle(button).bottom,
            originalTransition: window.getComputedStyle(button).transition,
            hideOnFooter: options.hideOnFooter !== false, // Por defecto true
            ...options
        };

        // Añadir transición suave si no existe
        if (!button.style.transition) {
            button.style.transition = 'transform 0.3s ease, opacity 0.3s ease, bottom 0.3s ease';
        }

        this.buttons.push(buttonConfig);

        // Inicializar visibilidad
        this.updateButtonVisibility(buttonConfig);
    }

    /**
     * Actualizar visibilidad del botón según posición del footer
     * @param {Object} buttonConfig - Configuración del botón
     */
    updateButtonVisibility(buttonConfig) {
        if (!this.footer || !buttonConfig.hideOnFooter) return;

        const footerRect = this.footer.getBoundingClientRect();
        const buttonRect = buttonConfig.element.getBoundingClientRect();

        // Verificar si el botón se superpone con el footer
        const isOverlapping = buttonRect.bottom > footerRect.top;

        if (isOverlapping) {
            this.hideButton(buttonConfig);
        } else {
            this.showButton(buttonConfig);
        }
    }

    /**
     * Ocultar un botón específico
     * @param {Object} buttonConfig - Configuración del botón
     */
    hideButton(buttonConfig) {
        const { element } = buttonConfig;

        // Solo aplicar si no está ya oculto
        if (element.classList.contains('floating-hidden')) return;

        element.classList.add('floating-hidden');
        element.style.pointerEvents = 'none';
    }

    /**
     * Mostrar un botón específico
     * @param {Object} buttonConfig - Configuración del botón
     */
    showButton(buttonConfig) {
        const { element } = buttonConfig;

        element.classList.remove('floating-hidden');
        element.style.pointerEvents = 'auto';
    }

    /**
     * Ocultar todos los botones
     */
    hideAllButtons() {
        this.buttons.forEach(buttonConfig => {
            if (buttonConfig.hideOnFooter) {
                this.hideButton(buttonConfig);
            }
        });
    }

    /**
     * Mostrar todos los botones
     */
    showAllButtons() {
        this.buttons.forEach(buttonConfig => {
            if (buttonConfig.hideOnFooter) {
                this.showButton(buttonConfig);
            }
        });
    }

    /**
     * Actualizar posición de todos los botones (para scroll)
     */
    updateAllButtons() {
        this.buttons.forEach(buttonConfig => {
            this.updateButtonVisibility(buttonConfig);
        });
    }

    /**
     * Destruir el gestor y limpiar recursos
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.buttons.forEach(buttonConfig => {
            const { element } = buttonConfig;
            element.classList.remove('floating-hidden');
            element.style.pointerEvents = 'auto';
            element.style.transition = buttonConfig.originalTransition;
        });

        this.buttons = [];
        this.isInitialized = false;
    }
}

// Instancia global del gestor
const floatingButtonsManager = new FloatingButtonsManager();

/**
 * Inicializar el sistema de botones flotantes
 */
function initFloatingButtons() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            floatingButtonsManager.init();
        });
    } else {
        floatingButtonsManager.init();
    }

    // Actualizar botones durante el scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            floatingButtonsManager.updateAllButtons();
        }, 100);
    });

    // Actualizar en resize
    window.addEventListener('resize', () => {
        floatingButtonsManager.updateAllButtons();
    });
}

// Exportar para uso global
window.FloatingButtonsManager = floatingButtonsManager;
window.initFloatingButtons = initFloatingButtons;

// Inicializar automáticamente
initFloatingButtons();