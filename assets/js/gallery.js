/**
 * GALERÍA DE EVENTOS - VERSIÓN PROFESIONAL
 * 
 * Características:
 * - Filtrado por categorías
 * - Animaciones fluidas
 * - Carga diferida de imágenes
 * - Sistema de conteo de medios
 * - Diseño responsive
 */

class GalleryManager {
    constructor() {
        this.currentFilter = 'all';
        this.filteredEvents = [];
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.displayGallery();
        this.setupGalleryFilters();
        this.setupIntersectionObserver();

        this.initialized = true;
    }

    displayGallery(filter = this.currentFilter) {
        this.currentFilter = filter;
        const container = document.getElementById('galleries-container');

        if (!container) return;

        // Aplicar efecto de transición
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.3s ease';

        // Filtrar eventos
        this.filteredEvents = filter === 'all'
            ? [...galleryData]
            : galleryData.filter(event => event.category === filter);

        setTimeout(() => {
            container.innerHTML = '';

            if (this.filteredEvents.length === 0) {
                container.innerHTML = this.createNoResultsMessage();
            } else {
                container.innerHTML = this.filteredEvents.map(event =>
                    this.createEventCard(event)
                ).join('');
            }

            container.style.opacity = '1';
            this.setupIntersectionObserver();
        }, 300);
    }

    createEventCard(event) {
        return `
            <article class="event-card animate-fade-in" data-id="${event.id}">
                <div class="event-cover-container">
                    <div class="event-cover" style="background-image: url('${event.coverImage}')">
                        <span class="media-count">
                            ${this.getMediaCount(event.media)}
                        </span>
                    </div>
                </div>
                
                <div class="event-info">
                    <div class="event-header">
                        <h2 class="event-title">${event.title}</h2>
                        <div class="event-meta">
                            <span class="event-date">${this.formatDate(event.date)}</span>
                            <span class="event-category">${event.category}</span>
                        </div>
                    </div>
                    
                    <div class="event-content">
                        <p class="event-description">${this.truncateDescription(event.description, 120)}</p>
                        <a href="gallery-detail.html?id=${event.id}" class="view-more-btn">
                            Ver galería completa
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }

    getMediaCount(media) {
        const counts = {
            image: media.filter(m => m.type === 'image').length,
            video: media.filter(m => m.type === 'video').length,
            audio: media.filter(m => m.type === 'audio').length
        };

        let html = '';

        if (counts.image > 0) {
            html += `
                <span class="media-count-item">
                    ${counts.image}
                    <svg class="media-count-icon image" viewBox="0 0 24 24">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                    </svg>
                </span>
            `;
        }

        if (counts.video > 0) {
            html += `
                <span class="media-count-item">
                    ${counts.video}
                    <svg class="media-count-icon video" viewBox="0 0 24 24">
                        <path d="M23 7l-7 5 7 5V7z"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                </span>
            `;
        }

        if (counts.audio > 0) {
            html += `
                <span class="media-count-item">
                    ${counts.audio}
                    <svg class="media-count-icon audio" viewBox="0 0 24 24">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <path d="M12 19v4"/>
                        <path d="M8 23h8"/>
                    </svg>
                </span>
            `;
        }

        return html;
    }

    createNoResultsMessage() {
        return `
            <div class="no-events">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                    <path d="M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z"/>
                </svg>
                <h3>No hay eventos en esta categoría</h3>
                <button class="reset-filter" onclick="galleryManager.resetFilters()">
                    Mostrar todos los eventos
                </button>
            </div>
        `;
    }

    setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.gallery-filters .filter-button');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Aplicar filtro
                const filter = button.getAttribute('data-filter');
                this.displayGallery(filter);
            });
        });
    }

    setupIntersectionObserver() {
        // Carga diferida de imágenes de fondo
        const lazyBackgrounds = document.querySelectorAll('.event-cover[data-bg]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cover = entry.target;
                    cover.style.backgroundImage = `url('${cover.dataset.bg}')`;
                    cover.removeAttribute('data-bg');
                    observer.unobserve(cover);
                }
            });
        }, {
            rootMargin: '200px'
        });

        lazyBackgrounds.forEach(cover => observer.observe(cover));
    }

    resetFilters() {
        this.currentFilter = 'all';
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-button[data-filter="all"]').classList.add('active');
        this.displayGallery();
    }

    truncateDescription(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }
}

// Instanciar y exportar el manager
const galleryManager = new GalleryManager();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => galleryManager.init());

// Hacer accesible globalmente
window.galleryManager = galleryManager;