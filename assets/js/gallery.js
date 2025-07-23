/**
 * Funcionalidades para la galería de imágenes
 */

// Variables globales
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [];

// Inicializar la galería
function initGallery() {
    setupLightbox();
    setupGalleryFilters();
    displayGallery();
}

// Mostrar galería con filtrado
function displayGallery(filter = currentFilter) {
    currentFilter = filter;
    const container = document.getElementById('gallery-container');
    if (!container) return;

    // Aplicar animación de fade out
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.3s ease';

    // Filtrar imágenes según la categoría seleccionada
    filteredImages = filter === 'all'
        ? [...galleryData]
        : galleryData.filter(item => item.category === filter);

    setTimeout(() => {
        // Limpiar el contenedor
        container.innerHTML = '';

        if (filteredImages.length === 0) {
            container.innerHTML = '<p class="no-images">No hay imágenes en esta categoría.</p>';
        } else {
            // Mostrar imágenes filtradas
            container.innerHTML = filteredImages.map((item, index) => `
                <div class="gallery-item" data-id="${item.id}" data-index="${index}">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.category}</p>
                    </div>
                </div>
            `).join('');
        }

        // Restaurar opacidad
        container.style.opacity = '1';

        // Configurar event listeners para las imágenes
        setupGalleryItems();
    }, 300);
}

// Configurar los event listeners para los items de la galería
function setupGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {
        item.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            openLightbox(index);
        });
    });
}

// Configurar filtros de la galería
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir clase active al botón clickeado
            this.classList.add('active');

            // Obtener el filtro seleccionado
            const filter = this.getAttribute('data-filter');

            // Mostrar galería con el filtro aplicado
            displayGallery(filter);
        });
    });
}

// Lightbox functions
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();

    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Añadir event listener para teclado
    document.addEventListener('keydown', handleKeyDown);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Remover event listener de teclado
    document.removeEventListener('keydown', handleKeyDown);
}

function updateLightboxImage() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');

    const currentImage = filteredImages[currentImageIndex];

    // Aplicar efecto de carga
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transition = 'opacity 0.3s ease';

    lightboxImg.src = currentImage.image;
    lightboxImg.alt = currentImage.title;
    lightboxTitle.textContent = currentImage.title;

    // Cuando la imagen se haya cargado
    lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
    };
}

function navigateLightbox(direction) {
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    } else {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    }
    updateLightboxImage();
}

function handleKeyDown(e) {
    if (!document.querySelector('.lightbox.active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox('prev');
            break;
        case 'ArrowRight':
            navigateLightbox('next');
            break;
    }
}

function setupLightbox() {
    // Crear lightbox si no existe
    if (!document.querySelector('.lightbox')) {
        const lightboxHTML = `
            <div class="lightbox">
                <div class="lightbox-content">
                    <span class="lightbox-close" aria-label="Cerrar lightbox">&times;</span>
                    <img src="" alt="">
                    <h3 class="lightbox-title"></h3>
                    <div class="lightbox-nav">
                        <button class="lightbox-button prev" aria-label="Imagen anterior">&lt;</button>
                        <button class="lightbox-button next" aria-label="Imagen siguiente">&gt;</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    // Configurar event listeners del lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevButton = document.querySelector('.lightbox-button.prev');
    const nextButton = document.querySelector('.lightbox-button.next');

    // Cerrar lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegación
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox('prev');
    });

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox('next');
    });
}

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initGallery);