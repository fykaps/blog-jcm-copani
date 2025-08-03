/**
 * Funcionalidades para la página de detalle de evento
 */

// Mostrar detalle del evento
function displayEventDetail() {
    const container = document.getElementById('event-detail');
    if (!container) return;

    // Obtener ID del evento de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));

    // Buscar evento
    const event = galleryData.find(item => item.id === eventId);

    if (!event) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Evento no encontrado</h2>
                <p>El evento solicitado no existe o ha sido eliminado.</p>
                <a href="gallery.html" class="back-btn">Volver a la galería</a>
            </div>
        `;
        return;
    }

    // Mostrar evento
    container.innerHTML = `
        <article class="event-detail">
            <header class="event-detail-header">
                <div class="event-breadcrumb">
                    <a href="gallery.html">Galerías</a> / <span>${event.category}</span>
                </div>
                <h1 class="event-detail-title">${event.title}</h1>
                <div class="event-detail-meta">
                    <div class="meta-item">
                        <span class="event-date">${formatDate(event.date)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="event-category">${event.category}</span>
                    </div>
                </div>
            </header>
            
            <div class="event-description">
                <p>${event.description}</p>
            </div>
            
            <section class="event-gallery">
                <h2>Galería de Fotos</h2>
                <div class="gallery-grid">
                    ${event.images.map((image, index) => `
                        <div class="gallery-item" data-index="${index}">
                            <img src="${image}" alt="${event.title} - Foto ${index + 1}" loading="lazy">
                        </div>
                    `).join('')}
                </div>
            </section>
            
            <div class="event-actions">
                <a href="gallery.html" class="back-btn">Volver a la galería</a>
            </div>
        </article>
    `;

    // Configurar lightbox
    setupLightbox(event.images, event.title);
}

// Configurar lightbox
function setupLightbox(images, title) {
    // Crear lightbox si no existe
    if (!document.querySelector('.lightbox')) {
        const lightboxHTML = `
            <div class="lightbox">
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="" alt="">
                    <div class="lightbox-info">
                        <h3 class="lightbox-title">${title}</h3>
                        <p class="lightbox-counter"></p>
                    </div>
                    <div class="lightbox-nav">
                        <button class="lightbox-prev">&lt;</button>
                        <button class="lightbox-next">&gt;</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    // Configurar eventos
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentIndex = 0;

    // Abrir lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Actualizar lightbox
    function updateLightbox() {
        lightboxImg.src = images[currentIndex];
        lightboxImg.alt = `${title} - Foto ${currentIndex + 1}`;
        lightboxCounter.textContent = `Foto ${currentIndex + 1} de ${images.length}`;
    }

    // Cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners para imágenes
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Event listeners para controles
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    });

    // Cerrar al hacer clic fuera
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateLightbox();
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 1) % images.length;
                updateLightbox();
                break;
        }
    });
}

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', displayEventDetail);