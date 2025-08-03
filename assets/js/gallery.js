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
                    <!-- Sección superior: Imagen cover -->
                    <div class="event-cover-container">
                        <div class="event-cover" style="background-image: url('${event.coverImage}')">
                            <span class="photo-count">${event.images.length} ${event.images.length === 1 ? 'foto' : 'fotos'}</span>
                        </div>
                    </div>
                    
                    <!-- Sección inferior: Información del evento -->
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