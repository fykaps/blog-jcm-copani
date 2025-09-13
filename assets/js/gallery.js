/**
 * GALERÍA DE EVENTOS - VERSIÓN PROFESIONAL MEJORADA CON PAGINACIÓN
 * 
 * Características:
 * - Filtrado por categorías
 * - Paginación avanzada (similar a news.js)
 * - Animaciones fluidas
 * - Carga diferida de imágenes
 * - Sistema de conteo de medios con colores distintivos
 * - Diseño responsive
 * - Estados de carga
 * CORREGIDO: Problema de zona horaria en fechas
 * CORREGIDO: Ordenamiento por fecha más reciente primero
 */

class GalleryManager {
    constructor(galleryData, options = {}) {
        this.galleryData = galleryData;
        this.options = {
            eventsPerPage: 6,
            recentGalleriesCount: 3,
            ...options
        };
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.totalPages = 1;
        this.filteredEvents = [];
        this.initialized = false;
        this.isLoading = false;
        this.imageObserver = null;
    }

    // ======================
    //  UTILIDADES DE FECHA (CORREGIDAS)
    // ======================

    /**
     * Parsea una fecha en formato YYYY-MM-DD sin problemas de zona horaria
     * @param {string} dateStr - Fecha en formato YYYY-MM-DD
     * @returns {Date} - Objeto Date correctamente ajustado
     */
    parseLocalDate(dateStr) {
        if (!dateStr) return new Date();

        const parts = dateStr.split('-');
        if (parts.length !== 3) return new Date(dateStr);

        // Crear fecha en zona horaria local (sin ajuste UTC)
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    }

    /**
     * Formatea una fecha en español sin problemas de zona horaria
     * @param {string} dateString - Fecha en formato YYYY-MM-DD
     * @returns {string} - Fecha formateada
     */
    formatDate(dateString) {
        try {
            const date = this.parseLocalDate(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('es-ES', options);
        } catch (error) {
            console.error('Error formateando fecha:', error);
            return dateString;
        }
    }

    /**
     * Ordena las galerías por fecha (más recientes primero)
     * @param {Array} galleries - Array de galerías
     * @returns {Array} - Galerías ordenadas por fecha
     */
    sortGalleriesByDate(galleries) {
        return [...galleries].sort((a, b) => {
            const dateA = this.parseLocalDate(a.date);
            const dateB = this.parseLocalDate(b.date);
            return dateB - dateA; // Más recientes primero
        });
    }

    // ======================
    //  MÉTODOS PRINCIPALES (CON FECHAS CORREGIDAS)
    // ======================

    init() {
        if (this.initialized) return;

        // Ordenar todos los datos por fecha al inicializar
        this.galleryData = this.sortGalleriesByDate(this.galleryData);

        this.showLoadingState();
        this.displayGallery();
        this.displayRecentGalleries();
        this.setupGalleryFilters();
        this.setupIntersectionObserver();

        this.updateGalleryStats();

        this.initialized = true;
    }

    // ======================
    //  GALERÍAS RECIENTES (CON FECHAS CORREGIDAS)
    // ======================

    displayRecentGalleries() {
        const container = document.getElementById('recent-galleries-container');
        if (!container) return;

        // Obtener galerías más recientes (ya están ordenadas por sortGalleriesByDate)
        const recentGalleries = this.galleryData.slice(0, this.options.recentGalleriesCount);

        if (recentGalleries.length === 0) {
            container.innerHTML = '<p class="no-galleries">No hay galerías recientes</p>';
            return;
        }

        container.innerHTML = recentGalleries.map(gallery => `
            <article class="recent-gallery-card animate-fade-in">
                <div class="recent-gallery-image" style="background-image: url('${gallery.coverImage}')">
                    <span class="gallery-category-badge">${gallery.category}</span>
                </div>
                <div class="recent-gallery-content">
                    <h3 class="recent-gallery-title">${gallery.title}</h3>
                    <p class="recent-gallery-date">${this.formatDate(gallery.date)}</p>
                    <p class="recent-gallery-description">${this.truncateDescription(gallery.description, 80)}</p>
                    <a href="gallery-detail.html?id=${gallery.id}" class="recent-gallery-link">
                        Ver galería
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </a>
                </div>
            </article>
        `).join('');

        // Configurar carga de imágenes para galerías recientes
        this.setupRecentGalleryImages();
    }

    // ======================
    //  ESTADÍSTICAS DE GALERÍA (CON FECHAS CORREGIDAS)
    // ======================

    calculateGalleryStats() {
        if (!this.galleryData || this.galleryData.length === 0) {
            return {
                totalGalleries: 0,
                totalPhotos: 0,
                totalVideos: 0,
                totalAudios: 0,
                totalCategories: 0
            };
        }

        let totalPhotos = 0;
        let totalVideos = 0;
        let totalAudios = 0;
        const uniqueCategories = new Set();

        this.galleryData.forEach(gallery => {
            // Contar tipos de medios
            gallery.media.forEach(media => {
                switch (media.type) {
                    case 'image':
                        totalPhotos++;
                        break;
                    case 'video':
                        totalVideos++;
                        break;
                    case 'audio':
                        totalAudios++;
                        break;
                }
            });

            // Contar categorías únicas
            if (gallery.category) {
                uniqueCategories.add(gallery.category);
            }
        });

        return {
            totalGalleries: this.galleryData.length,
            totalPhotos,
            totalVideos,
            totalAudios,
            totalCategories: uniqueCategories.size
        };
    }

    // ======================
    //  RENDERIZADO PRINCIPAL
    // ======================

    showLoadingState() {
        const container = document.getElementById('galleries-container');
        if (!container) return;

        container.innerHTML = `
            <div class="gallery-loading">
                ${Array(6).fill(0).map(() => `
                    <div class="loading-card"></div>
                `).join('')}
            </div>
        `;
    }

    displayGallery(filter = this.currentFilter) {
        this.currentFilter = filter;
        const container = document.getElementById('galleries-container');
        const paginationWrapper = document.getElementById('gallery-pagination-wrapper');

        if (!container) return;

        // Aplicar efecto de transición
        container.style.opacity = '0';
        container.style.transition = 'opacity 0.3s ease';

        // Filtrar eventos y ordenar por fecha
        this.filteredEvents = filter === 'all'
            ? [...this.galleryData] // Ya están ordenados por fecha
            : this.sortGalleriesByDate(
                this.galleryData.filter(event => event.category === filter)
            );

        this.totalPages = Math.ceil(this.filteredEvents.length / this.options.eventsPerPage);

        // Asegurar que la página actual sea válida
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }

        // Obtener eventos para la página actual
        const startIndex = (this.currentPage - 1) * this.options.eventsPerPage;
        const endIndex = startIndex + this.options.eventsPerPage;
        const paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);

        setTimeout(() => {
            container.innerHTML = '';

            if (this.filteredEvents.length === 0) {
                container.innerHTML = this.createNoResultsMessage();
                if (paginationWrapper) paginationWrapper.style.display = 'none';
            } else {
                container.innerHTML = paginatedEvents.map(event =>
                    this.createEventCard(event)
                ).join('');

                // Mostrar paginación solo si hay más de una página
                if (paginationWrapper) {
                    if (this.totalPages > 1) {
                        paginationWrapper.style.display = 'flex';
                    } else {
                        paginationWrapper.style.display = 'none';
                    }
                }
            }

            container.style.opacity = '1';
            this.setupIntersectionObserver();
            this.updateFilterCounts();
            this.renderPagination();
        }, 300);
    }

    // ======================
    //  PAGINACIÓN
    // ======================

    renderPagination() {
        const paginationContainer = document.getElementById('gallery-pagination');
        if (!paginationContainer || this.totalPages <= 1) {
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        let html = `
            <button class="pagination-button ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="galleryManager.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
                &lt;
            </button>
        `;

        // Mostrar siempre la primera página
        html += `
            <button class="pagination-button ${this.currentPage === 1 ? 'active' : ''}" 
                    onclick="galleryManager.changePage(1)">
                1
            </button>
        `;

        // Mostrar puntos suspensivos si hay muchas páginas
        if (this.totalPages > 5 && this.currentPage > 3) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        // Mostrar páginas alrededor de la actual
        const startPage = Math.max(2, this.currentPage - 1);
        const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (i > 1 && i < this.totalPages) {
                html += `
                    <button class="pagination-button ${this.currentPage === i ? 'active' : ''}" 
                            onclick="galleryManager.changePage(${i})">
                        ${i}
                    </button>
                `;
            }
        }

        // Mostrar puntos suspensivos si hay muchas páginas
        if (this.totalPages > 5 && this.currentPage < this.totalPages - 2) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        // Mostrar siempre la última página
        if (this.totalPages > 1) {
            html += `
                <button class="pagination-button ${this.currentPage === this.totalPages ? 'active' : ''}" 
                        onclick="galleryManager.changePage(${this.totalPages})">
                    ${this.totalPages}
                </button>
            `;
        }

        html += `
            <button class="pagination-button ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                    onclick="galleryManager.changePage(${this.currentPage + 1})" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                &gt;
            </button>
        `;

        paginationContainer.innerHTML = html;
    }

    changePage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.displayGallery(this.currentFilter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ======================
    //  FILTROS
    // ======================

    setupGalleryFilters() {
        const filterButtons = document.querySelectorAll('.gallery-filters .filter-button');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Aplicar filtro y resetear a página 1
                const filter = button.getAttribute('data-filter');
                this.currentPage = 1;
                this.displayGallery(filter);

                // Scroll suave al contenido
                document.getElementById('galleries-container').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    updateFilterCounts() {
        const filterButtons = document.querySelectorAll('.gallery-filters .filter-button');

        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            if (filter === 'all') return;

            const count = this.galleryData.filter(event => event.category === filter).length;
            const countSpan = button.querySelector('.filter-count') || document.createElement('span');

            if (!button.querySelector('.filter-count')) {
                countSpan.className = 'filter-count';
                button.appendChild(countSpan);
            }

            countSpan.textContent = ` (${count})`;
        });
    }

    resetFilters() {
        this.currentFilter = 'all';
        this.currentPage = 1;

        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });

        const allFilterButton = document.querySelector('.filter-button[data-filter="all"]');
        if (allFilterButton) {
            allFilterButton.classList.add('active');
        }

        this.displayGallery();
    }

    // ======================
    //  FUNCIONES UTILITARIAS
    // ======================

    createEventCard(event) {
        return `
            <article class="event-card animate-fade-in" data-id="${event.id}" data-category="${event.category}">
                <div class="event-cover-container">
                    <div class="event-cover" style="background-image: url('${event.coverImage}')">
                        <span class="event-category-badge">${event.category}</span>
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
                            <span class="event-category">${this.getCategoryDisplayName(event.category)}</span>
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
                <span class="media-count-item image" title="${counts.image} imagen${counts.image !== 1 ? 'es' : ''}">
                    ${counts.image}
                    <svg class="media-count-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                    </svg>
                </span>
            `;
        }

        if (counts.video > 0) {
            html += `
                <span class="media-count-item video" title="${counts.video} video${counts.video !== 1 ? 's' : ''}">
                    ${counts.video}
                    <svg class="media-count-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 7l-7 5 7 5V7z"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                </span>
            `;
        }

        if (counts.audio > 0) {
            html += `
                <span class="media-count-item audio" title="${counts.audio} audio${counts.audio !== 1 ? 's' : ''}">
                    ${counts.audio}
                    <svg class="media-count-icon" viewBox="0 0 24 24" fill="currentColor">
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

    getCategoryDisplayName(category) {
        const categories = {
            'celebration': 'Celebración',
            'academic': 'Académico',
            'sport': 'Deporte',
            'cultural': 'Cultural',
            'social': 'Social',
            'other': 'Otros'
        };

        return categories[category] || category;
    }

    createNoResultsMessage() {
        return `
            <div class="no-events">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                    <path d="M9 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4z"/>
                </svg>
                <h3>No hay eventos en esta categoría</h3>
                <p>Intenta con otra categoría o vuelve a ver todos los eventos.</p>
                <button class="reset-filter" onclick="galleryManager.resetFilters()">
                    Mostrar todos los eventos
                </button>
            </div>
        `;
    }

    setupIntersectionObserver() {
        // Limpiar observer existente si hay uno
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }

        // Crear nuevo observer para imágenes
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-image');
                        img.classList.add('loaded-image');
                    }
                    this.imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px',
            threshold: 0.01
        });

        // Observar todas las imágenes con carga diferida
        document.querySelectorAll('.lazy-image').forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    setupRecentGalleryImages() {
        const galleryImages = document.querySelectorAll('.recent-gallery-image');
        galleryImages.forEach(container => {
            const backgroundImage = container.style.backgroundImage;
            const imageUrl = backgroundImage.replace('url("', '').replace('")', '');

            // Precargar imagen
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                container.style.backgroundImage = `url('${imageUrl}')`;
                container.classList.add('loaded');
            };
        });
    }

    updateGalleryStats() {
        const stats = this.calculateGalleryStats();

        // Actualizar elementos del DOM
        this.updateStatElement('total-galleries', stats.totalGalleries);
        this.updateStatElement('total-photos', stats.totalPhotos);
        this.updateStatElement('total-videos', stats.totalVideos);
        this.updateStatElement('total-audios', stats.totalAudios);

        // Iniciar animación de contadores
        this.animateGalleryStats();
    }

    updateStatElement(statId, value) {
        const element = document.querySelector(`[data-stat="${statId}"]`);
        if (element) {
            element.setAttribute('data-count', value);
            element.textContent = '0'; // Reset para animación
        }
    }

    animateGalleryStats() {
        const statElements = document.querySelectorAll('.gallery-stat-number[data-stat]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const target = parseInt(statElement.getAttribute('data-count'));
                    const duration = 1500;
                    const increment = target / (duration / 16);

                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            current = target;
                        }
                        statElement.textContent = Math.floor(current);
                    }, 16);

                    observer.unobserve(statElement);
                }
            });
        }, { threshold: 0.5 });

        statElements.forEach(stat => observer.observe(stat));
    }

    truncateDescription(text, maxLength) {
        if (!text || text.length <= maxLength) return text || 'Sin descripción disponible';
        return text.substring(0, maxLength) + '...';
    }

    destroy() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        this.initialized = false;
    }
}

// Instanciar y exportar el manager
let galleryManager;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof galleryData !== 'undefined') {
            // Configuración personalizable
            const options = {
                eventsPerPage: 6 // Puedes cambiar este valor según sea necesario
            };

            galleryManager = new GalleryManager(galleryData, options);
            galleryManager.init();
            window.galleryManager = galleryManager; // Hacer accesible globalmente
        } else {
            console.error('Error: galleryData no está definido');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c" width="48" height="48">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Error al cargar la galería</h3>
                <p>Los datos de la galería no están disponibles</p>
            `;
            const galleryContainer = document.getElementById('galleries-container');
            if (galleryContainer) {
                galleryContainer.appendChild(errorDiv);
            }
        }
    } catch (error) {
        console.error('Error al inicializar GalleryManager:', error);
    }
});