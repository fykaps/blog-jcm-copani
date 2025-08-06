/**
 * Funcionalidades para la galería principal de eventos
 */

let currentFilter = 'all';
let filteredEvents = [];

// Inicializar la galería
function initGallery() {
    displayGallery();
    setupGalleryFilters();
}

// Mostrar galería con filtrado
function displayGallery(filter = currentFilter) {
    currentFilter = filter;
    const container = document.getElementById('galleries-container');
    if (!container) return;

    container.style.opacity = '0';
    container.style.transition = 'opacity 0.3s ease';

    // Filtrar eventos
    filteredEvents = filter === 'all'
        ? [...galleryData]
        : galleryData.filter(event => event.category === filter);

    setTimeout(() => {
        container.innerHTML = '';

        if (filteredEvents.length === 0) {
            container.innerHTML = '<p class="no-events">No hay eventos en esta categoría.</p>';
        } else {
            container.innerHTML = filteredEvents.map(event => `
                <article class="event-card" data-id="${event.id}">
                    <div class="event-cover-container">
                        <div class="event-cover" style="background-image: url('${event.coverImage}')">
                            <span class="media-count">
                                ${getMediaCount(event.media)}
                            </span>
                        </div>
                    </div>
                    
                    <div class="event-info">
                        <div class="event-header">
                            <h2 class="event-title">${event.title}</h2>
                            <div class="event-meta">
                                <span class="event-date">${formatDate(event.date)}</span>
                                <span class="event-category">${event.category}</span>
                            </div>
                        </div>
                        
                        <div class="event-content">
                            <p class="event-description">${truncateDescription(event.description, 120)}</p>
                            <a href="gallery-detail.html?id=${event.id}" class="view-more-btn">
                                Ver galería completa
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        container.style.opacity = '1';
    }, 300);
}

// Obtener conteo de medios con iconos
function getMediaCount(media) {
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

// Contar tipos de medios en un evento
function countMediaTypes(mediaItems) {
    return mediaItems.reduce((counts, item) => {
        counts[item.type + 's']++;
        return counts;
    }, { images: 0, videos: 0, audios: 0 });
}

// Función para truncar descripción si es muy larga
function truncateDescription(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Configurar filtros
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Aplicar filtro
            const filter = this.getAttribute('data-filter');
            displayGallery(filter);
        });
    });
}

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initGallery);