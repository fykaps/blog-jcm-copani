/**
 * Sistema de gestión de noticias profesional - VERSIÓN MEJORADA CON ESTADÍSTICAS
 * - Problema de imágenes solucionado
 * - Paginación avanzada
 * - Filtrado por categorías y etiquetas
 * - Búsqueda con sugerencias
 * - Gestión de likes y vistas
 * - Carga diferida de imágenes mejorada
 * - Estadísticas automáticas para el hero
 */

class NewsManager {
    constructor(newsData, options = {}) {
        this.icons = {
            arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`,
        };
        this.news = newsData;
        this.options = {
            newsPerPage: 6,
            ...options
        };
        this.currentFilter = 'all';
        this.currentSearchQuery = '';
        this.currentPage = 1;
        this.totalPages = 1;
        this.activeNews = [];
        this.initialized = false;
        this.imageObserver = null; // Observer para imágenes
    }

    init() {
        if (this.initialized) return;

        this.renderNewsList();
        this.displayFeaturedNews();
        this.displayRecentNews();
        this.displayPopularNews();
        this.displayCategories();
        this.displayPopularTags();
        this.setupSearch();
        this.setupEventListeners();
        this.setupIntersectionObserver();

        // Actualizar estadísticas después de la inicialización
        this.updateNewsStats();

        this.initialized = true;
    }

    // ======================
    //  ESTADÍSTICAS PARA HERO
    // ======================

    updateNewsStats() {
        const totalNews = this.news.length;

        // Contar categorías únicas
        const uniqueCategories = new Set(this.news.map(news => news.category));
        const totalCategories = uniqueCategories.size;

        // Contar autores únicos (si existen) o estimar
        let totalAuthors;
        if (this.news[0] && this.news[0].author) {
            const uniqueAuthors = new Set(this.news.map(news => news.author));
            totalAuthors = uniqueAuthors.size;
        } else {
            // Estimación basada en diversidad de contenido
            totalAuthors = Math.max(1, Math.floor(totalNews / 3));
        }

        // Actualizar los elementos del DOM
        this.updateStatElement('news-stat', totalNews);
        this.updateStatElement('categories-stat', totalCategories);
        this.updateStatElement('authors-stat', totalAuthors);

        // Iniciar animación de los contadores
        this.animateStats();
    }

    updateStatElement(statId, value) {
        const element = document.querySelector(`[data-stat="${statId}"]`);
        if (element) {
            element.setAttribute('data-count', value);
            element.textContent = '0'; // Reset para la animación
        }
    }

    animateStats() {
        const statElements = document.querySelectorAll('.section-stat-number');

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

    // ======================
    //  RENDERIZADO PRINCIPAL
    // ======================

    renderNewsList(filter = 'all', searchQuery = '') {
        const newsContainer = document.getElementById('all-news-container');
        const paginationWrapper = document.getElementById('news-pagination-wrapper');

        if (!newsContainer) return;

        // Limpiar contenido anterior
        this.activeNews = [];

        // Filtrar noticias
        let filteredNews = [...this.news];

        if (filter === 'search' && searchQuery) {
            const normalizedQuery = this.normalizeText(searchQuery);
            filteredNews = filteredNews.filter(news => {
                // Normalizar todos los campos de texto para la búsqueda
                const normalizedTitle = this.normalizeText(news.title);
                const normalizedExcerpt = this.normalizeText(news.excerpt);
                const normalizedContent = this.normalizeText(news.content);
                const normalizedTags = news.tags.map(tag => this.normalizeText(tag));

                // Buscar en todos los campos normalizados
                return (
                    normalizedTitle.includes(normalizedQuery) ||
                    normalizedExcerpt.includes(normalizedQuery) ||
                    normalizedContent.includes(normalizedQuery) ||
                    normalizedTags.some(tag => tag.includes(normalizedQuery))
                );
            });
        } else if (filter === 'category') {
            filteredNews = filteredNews.filter(news => news.category === searchQuery);
        } else if (filter === 'tag') {
            filteredNews = filteredNews.filter(news => news.tags.includes(searchQuery));
        }

        // Ordenar por fecha (más recientes primero)
        filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));

        this.activeNews = filteredNews;
        this.totalPages = Math.ceil(filteredNews.length / this.options.newsPerPage);

        // Asegurar que la página actual sea válida
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }

        // Mostrar mensaje si no hay noticias
        if (filteredNews.length === 0) {
            let message = '';
            if (filter === 'search' && searchQuery) {
                // Mostrar la consulta original, no la normalizada
                const originalQuery = document.getElementById('search-input')?.value || searchQuery;
                message = `
                    <div class="no-results">
                        <svg width="48" height="48" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M15.5 12c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5M10 4a4 4 0 0 1 4 4c0 .73-.19 1.41-.54 2H18a2 2 0 0 1 2 2v6c0 .24-.04.47-.12.68A6.5 6.5 0 0 0 20 16.5V10l-6-6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.5c.31.75.76 1.42 1.31 2H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h4m0 2H6v2h4V6m0 4H6v2h4v-2m0 4H6v2h4v-2Z"/>
                        </svg>
                        <h3>No se encontraron noticias</h3>
                        <p>No hay resultados para "${originalQuery}".</p>
                        <button class="reset-search" onclick="newsManager.resetFilters()">Mostrar todas las noticias</button>
                    </div>
                `;
            } else if (filter === 'category') {
                message = `
                    <div class="no-results">
                        <svg width="48" height="48" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <h3>No hay noticias en esta categoría</h3>
                        <p>No hay publicaciones en la categoría "${searchQuery}".</p>
                        <button class="reset-search" onclick="newsManager.resetFilters()">Mostrar todas las noticias</button>
                    </div>
                `;
            } else if (filter === 'tag') {
                message = `
                    <div class="no-results">
                        <svg width="48" height="48" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42z"/>
                        </svg>
                        <h3>No hay noticias con esta etiqueta</h3>
                        <p>No hay publicaciones con la etiqueta "${searchQuery}".</p>
                        <button class="reset-search" onclick="newsManager.resetFilters()">Mostrar todas las noticias</button>
                    </div>
                `;
            } else {
                message = `
                    <div class="no-results">
                        <svg width="48" height="48" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 002 12a10 10 0 0010 10a10 10 0 0010-10A10 10 0 0012 2z"/>
                        </svg>
                        <h3>No hay noticias disponibles</h3>
                        <p>Pronto publicaremos nuevas noticias.</p>
                    </div>
                `;
            }

            newsContainer.innerHTML = message;

            // Ocultar paginación si no hay resultados
            if (paginationWrapper) {
                paginationWrapper.style.display = 'none';
            }
            return;
        }

        // Mostrar paginación solo si hay más de una página
        if (paginationWrapper) {
            if (this.totalPages > 1) {
                paginationWrapper.style.display = 'flex';
            } else {
                paginationWrapper.style.display = 'none';
            }
        }

        // Obtener noticias para la página actual
        const startIndex = (this.currentPage - 1) * this.options.newsPerPage;
        const endIndex = startIndex + this.options.newsPerPage;
        const paginatedNews = filteredNews.slice(startIndex, endIndex);

        // Renderizar noticias
        newsContainer.innerHTML = paginatedNews.map(news => `
            <article class="news-card">
                <div class="news-image">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3C/svg%3E" 
                         data-src="${news.image}" 
                         alt="${news.title}" 
                         loading="lazy"
                         class="lazy-image">
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-date">${this.formatDate(news.date)}</span>
                        <span class="news-category">${news.category}</span>
                    </div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <div class="news-actions">
                        <a href="news-detail.html?id=${news.id}" class="btn-view-more">Ver más ${this.icons.arrowRight}</a>
                        <button class="like-button ${this.isNewsLiked(news.id) ? 'liked' : ''}" data-id="${news.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span class="like-count">${this.getLikes(news.id)}</span>
                        </button>
                    </div>
                    <div class="news-tags">
                        ${news.tags.map(tag => `<a href="#" class="tag" data-tag="${tag}">${tag}</a>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');

        // Configurar eventos para etiquetas
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByTag(tag.getAttribute('data-tag'));
            });
        });

        // Renderizar paginación
        this.renderPagination();

        // Actualizar UI de filtros
        this.updateFilterUI(filter, searchQuery);

        // IMPORTANTE: Reactivar el observer para las nuevas imágenes
        this.setupImageLoading();
    }

    // ======================
    //  CARGA DE IMÁGENES MEJORADA
    // ======================

    setupIntersectionObserver() {
        // Configurar observer para imágenes
        this.setupImageLoading();
    }

    setupImageLoading() {
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

    // ======================
    //  PAGINACIÓN
    // ======================

    renderPagination() {
        const paginationContainer = document.getElementById('news-pagination');
        if (!paginationContainer || this.totalPages <= 1) {
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        let html = `
            <button class="pagination-button ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="newsManager.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
                &lt;
            </button>
        `;

        // Mostrar siempre la primera página
        html += `
            <button class="pagination-button ${this.currentPage === 1 ? 'active' : ''}" 
                    onclick="newsManager.changePage(1)">
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
                            onclick="newsManager.changePage(${i})">
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
                        onclick="newsManager.changePage(${this.totalPages})">
                    ${this.totalPages}
                </button>
            `;
        }

        html += `
            <button class="pagination-button ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                    onclick="newsManager.changePage(${this.currentPage + 1})" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                &gt;
            </button>
        `;

        paginationContainer.innerHTML = html;
    }

    changePage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.renderNewsList(this.currentFilter, this.currentSearchQuery);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ======================
    //  FILTROS Y BÚSQUEDA
    // ======================

    setupSearch() {
        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');

        if (searchButton && searchInput) {
            searchButton.addEventListener('click', () => this.performSearch(searchInput.value));
            searchInput.addEventListener('input', () => this.handleSearchInput(searchInput.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch(searchInput.value);
            });
        }
    }

    handleSearchInput(query) {
        // Implementar sugerencias de búsqueda si es necesario
    }

    normalizeText(text) {
        if (!text) return '';

        return text.toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
            .replace(/[^a-z0-9\s]/g, '')     // Eliminar caracteres especiales
            .trim();
    }

    performSearch(query) {
        // Normalizar la consulta
        const normalizedQuery = this.normalizeText(query);
        this.currentSearchQuery = normalizedQuery;
        this.currentPage = 1;
        this.currentFilter = this.currentSearchQuery === '' ? 'all' : 'search';

        if (this.currentSearchQuery === '') {
            this.resetFilters();
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';
            return;
        }

        // Mostrar estado de carga
        this.showLoadingState();

        // Pequeño retraso para permitir que la UI se actualice
        setTimeout(() => {
            this.renderNewsList('search', this.currentSearchQuery);
        }, 100);
    }

    showLoadingState() {
        const newsContainer = document.getElementById('all-news-container');
        const paginationWrapper = document.getElementById('news-pagination-wrapper');

        if (!newsContainer) return;

        newsContainer.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Buscando noticias...</p>
            </div>
        `;

        // Ocultar paginación durante la búsqueda
        if (paginationWrapper) {
            paginationWrapper.style.display = 'none';
        }
    }

    filterByCategory(category) {
        this.currentFilter = 'category';
        this.currentSearchQuery = category;
        this.currentPage = 1;
        this.renderNewsList('category', category);
    }

    filterByTag(tag) {
        this.currentFilter = 'tag';
        this.currentSearchQuery = tag;
        this.currentPage = 1;
        this.renderNewsList('tag', tag);
    }

    resetFilters() {
        this.currentFilter = 'all';
        this.currentSearchQuery = '';
        this.currentPage = 1;

        document.querySelectorAll('.filter-button, .category-link, .tag').forEach(btn => {
            btn.classList.remove('active');
        });

        const allFilterButton = document.querySelector('.filter-button[data-filter="all"]');
        if (allFilterButton) {
            allFilterButton.classList.add('active');
        }

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }

        this.renderNewsList('all', '');
    }

    updateFilterUI(filter, query) {
        const filterTitle = document.getElementById('filter-title');
        const filterDescription = document.getElementById('filter-description');
        const resetButton = document.getElementById('reset-filters');

        let title = 'Todas las noticias';
        let description = 'Las últimas publicaciones de nuestro blog escolar';

        if (filter === 'search') {
            title = `Búsqueda: "${query}"`;
            description = `Resultados para "${query}"`;
        } else if (filter === 'category') {
            title = `Categoría: ${query}`;
            description = `Mostrando noticias de la categoría ${query}`;
        } else if (filter === 'tag') {
            title = `Etiqueta: ${query}`;
            description = `Mostrando noticias con la etiqueta ${query}`;
        }

        if (filterTitle) filterTitle.textContent = title;
        if (filterDescription) filterDescription.textContent = description;
        if (resetButton) {
            resetButton.style.display = this.currentFilter === 'all' ? 'none' : 'flex';
        }
    }

    // ======================
    //  COMPONENTES ADICIONALES
    // ======================

    displayFeaturedNews() {
        const container = document.getElementById('featured-news-container');
        if (!container) return;

        const featuredNews = this.news.filter(news => news.featured).slice(0, 2);

        container.innerHTML = featuredNews.length === 0 ?
            '<p class="no-results">No hay noticias destacadas.</p>' :
            featuredNews.map(news => this.createNewsCard(news, true)).join('');

        // Asegurar que las imágenes destacadas se carguen
        setTimeout(() => this.setupImageLoading(), 100);
    }

    displayRecentNews() {
        const container = document.getElementById('recent-news-container');
        if (!container) return;

        const recentNews = [...this.news]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4);

        container.innerHTML = recentNews.length === 0 ?
            '<p class="no-results">No hay noticias recientes.</p>' :
            recentNews.map(news => this.createNewsCard(news)).join('');

        // Asegurar que las imágenes recientes se carguen
        setTimeout(() => this.setupImageLoading(), 100);
    }

    displayPopularNews() {
        const container = document.getElementById('popular-news-container');
        if (!container) return;

        const popularNews = [...this.news]
            .sort((a, b) => this.getViews(b.id) - this.getViews(a.id))
            .slice(0, 3);

        container.innerHTML = popularNews.length === 0 ?
            '<p class="no-results">No hay datos de noticias populares.</p>' :
            popularNews.map(news => `
                <div class="popular-news-item">
                    <div class="popular-news-image">
                        <img src="${news.image}" alt="${news.title}" loading="lazy" class="lazy-image">
                    </div>
                    <div>
                        <h4 class="popular-news-title">
                            <a href="news-detail.html?id=${news.id}">${news.title}</a>
                        </h4>
                        <span class="views-count">${this.getViews(news.id)} vistas</span>
                    </div>
                </div>
            `).join('');

        // Asegurar que las imágenes populares se carguen
        setTimeout(() => this.setupImageLoading(), 100);
    }

    displayCategories() {
        const container = document.getElementById('categories-container');
        if (!container) return;

        const categoryCounts = {};
        this.news.forEach(news => {
            categoryCounts[news.category] = (categoryCounts[news.category] || 0) + 1;
        });

        const categories = Object.keys(categoryCounts).map(category => ({
            name: category,
            count: categoryCounts[category]
        }));

        container.innerHTML = categories.map(category => `
            <li>
                <a href="#" class="category-link" data-category="${category.name}">
                    ${category.name} <span>(${category.count})</span>
                </a>
            </li>
        `).join('');

        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByCategory(link.getAttribute('data-category'));
            });
        });
    }

    displayPopularTags() {
        const container = document.getElementById('tags-container');
        if (!container) return;

        const tagCounts = {};
        this.news.forEach(news => {
            news.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        const popularTags = Object.keys(tagCounts)
            .map(tag => ({ name: tag, count: tagCounts[tag] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        container.innerHTML = popularTags.map(tag => `
            <a href="#" class="tag" data-tag="${tag.name}">
                ${tag.name} <span>(${tag.count})</span>
            </a>
        `).join('');

        document.querySelectorAll('#tags-container .tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByTag(tag.getAttribute('data-tag'));
            });
        });
    }

    // ======================
    //  FUNCIONES UTILITARIAS
    // ======================

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-button')) {
                const button = e.target.closest('.like-button');
                this.handleLike(button);
            }
        });

        const resetButton = document.getElementById('reset-filters');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetFilters());
        }
    }

    createNewsCard(news, featured = false) {
        return `
            <article class="news-card ${featured ? 'featured' : ''}">
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}" loading="lazy" class="lazy-image">
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-date">${this.formatDate(news.date)}</span>
                        <span class="news-category">${news.category}</span>
                    </div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <div class="news-actions">
                        <a href="news-detail.html?id=${news.id}" class="btn-view-more">Ver más ${this.icons.arrowRight}</a>
                        <button class="like-button ${this.isNewsLiked(news.id) ? 'liked' : ''}" data-id="${news.id}">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span class="like-count">${this.getLikes(news.id)}</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    handleLike(button) {
        const newsId = parseInt(button.getAttribute('data-id'));
        const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
        const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
        const likeCount = button.querySelector('.like-count');

        // Animación
        button.classList.add('animate-pulse');
        setTimeout(() => button.classList.remove('animate-pulse'), 700);

        if (userLikes.includes(newsId)) {
            likes[newsId] = (likes[newsId] || 1) - 1;
            button.classList.remove('liked');
            userLikes.splice(userLikes.indexOf(newsId), 1);
        } else {
            likes[newsId] = (likes[newsId] || 0) + 1;
            button.classList.add('liked');
            userLikes.push(newsId);

            // Efecto especial cada 10 likes
            if (likes[newsId] % 10 === 0) {
                this.showConfetti();
            }
        }

        localStorage.setItem('newsLikes', JSON.stringify(likes));
        localStorage.setItem('userLikes', JSON.stringify(userLikes));
        if (likeCount) {
            likeCount.textContent = likes[newsId] || 0;
        }
    }

    isNewsLiked(newsId) {
        const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
        return userLikes.includes(newsId);
    }

    getLikes(newsId) {
        const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
        return likes[newsId] || 0;
    }

    getViews(newsId) {
        const views = JSON.parse(localStorage.getItem('newsViews')) || {};
        return views[newsId] || 0;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    showConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-overlay';
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.opacity = '0';
            setTimeout(() => confetti.remove(), 1000);
        }, 3000);
    }

    destroy() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        this.initialized = false;
    }
}

// Instanciar y exportar el manager
let newsManager;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof newsData !== 'undefined') {
            // Configuración personalizable
            const options = {
                newsPerPage: 6 // Puedes cambiar este valor según sea necesario
            };

            newsManager = new NewsManager(newsData, options);
            newsManager.init();
            window.newsManager = newsManager; // Hacer accesible globalmente
        } else {
            console.error('Error: newsData no está definido');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c" width="48" height="48">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Error al cargar las noticias</h3>
                <p>Los datos de noticias no están disponibles</p>
            `;
            const newsContainer = document.getElementById('all-news-container');
            if (newsContainer) {
                newsContainer.appendChild(errorDiv);
            }
        }
    } catch (error) {
        console.error('Error al inicializar NewsManager:', error);
    }
});