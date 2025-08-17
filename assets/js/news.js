/**
 * Sistema de gestión de noticias profesional
 * - Paginación avanzada
 * - Filtrado por categorías y etiquetas
 * - Búsqueda con sugerencias
 * - Gestión de likes y vistas
 * - Carga diferida de imágenes
 */

class NewsManager {
    constructor() {
        this.currentPage = 1;
        this.newsPerPage = 6;
        this.currentNewsSet = [];
        this.currentFilter = 'all';
        this.currentSearchQuery = '';
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        this.loadNewsData();
        this.setupSearch();
        this.setupEventListeners();
        this.setupIntersectionObserver();

        this.initialized = true;
    }

    loadNewsData() {
        this.currentNewsSet = [...newsData];
        this.displayAllNews();
        this.displayFeaturedNews();
        this.displayRecentNews();
        this.displayPopularNews();
        this.displayCategories();
        this.displayPopularTags();
    }

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

    performSearch(query) {
        this.currentSearchQuery = query.trim();
        this.currentPage = 1;
        this.currentFilter = this.currentSearchQuery === '' ? 'all' : 'search';

        if (this.currentSearchQuery === '') {
            this.resetFilters();
            document.getElementById('search-input').value = '';
            return;
        }

        const filteredNews = newsData.filter(news => {
            const searchText = this.currentSearchQuery.toLowerCase();
            return (
                news.title.toLowerCase().includes(searchText) ||
                news.excerpt.toLowerCase().includes(searchText) ||
                news.content.toLowerCase().includes(searchText) ||
                news.tags.some(tag => tag.toLowerCase().includes(searchText))
            );
        });

        this.updateFilterUI(`Búsqueda: "${this.currentSearchQuery}"`, `Resultados para "${this.currentSearchQuery}"`);
        this.currentNewsSet = filteredNews;
        this.displayPaginatedNews();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-button')) {
                const button = e.target.closest('.like-button');
                this.handleLike(button);
            }
        });

        document.getElementById('reset-filters')?.addEventListener('click', () => this.resetFilters());
    }

    setupIntersectionObserver() {
        // Carga diferida de imágenes
        const lazyImages = document.querySelectorAll('.news-image img[loading="lazy"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px'
        });

        lazyImages.forEach(img => observer.observe(img));
    }

    updateFilterUI(title, description) {
        const filterTitle = document.getElementById('filter-title');
        const filterDescription = document.getElementById('filter-description');
        const resetButton = document.getElementById('reset-filters');

        if (filterTitle) filterTitle.textContent = title;
        if (filterDescription) filterDescription.textContent = description;
        if (resetButton) resetButton.style.display = this.currentFilter === 'all' ? 'none' : 'flex';
    }

    displayAllNews() {
        let filteredNews = [...newsData];
        let title = 'Todas las noticias';
        let description = 'Las últimas publicaciones de nuestro blog escolar';

        if (this.currentFilter === 'category') {
            filteredNews = filteredNews.filter(news => news.category === this.currentSearchQuery);
            title = `Categoría: ${this.currentSearchQuery}`;
            description = `Mostrando noticias de la categoría ${this.currentSearchQuery}`;
        }
        else if (this.currentFilter === 'tag') {
            filteredNews = filteredNews.filter(news => news.tags.includes(this.currentSearchQuery));
            title = `Etiqueta: ${this.currentSearchQuery}`;
            description = `Mostrando noticias con la etiqueta ${this.currentSearchQuery}`;
        }

        this.updateFilterUI(title, description);
        this.currentNewsSet = filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.displayPaginatedNews();
    }

    resetFilters() {
        this.currentFilter = 'all';
        this.currentSearchQuery = '';
        this.currentPage = 1;

        document.querySelectorAll('.filter-button, .category-link, .tag').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-button[data-filter="all"]')?.classList.add('active');
        document.getElementById('search-input').value = '';

        this.updateFilterUI('Todas las noticias', 'Las últimas publicaciones de nuestro blog escolar');
        this.loadNewsData();
    }

    displayPaginatedNews() {
        const container = document.getElementById('all-news-container');
        const paginationContainer = document.getElementById('news-pagination');
        const resetButton = document.getElementById('reset-filters');

        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.newsPerPage;
        const endIndex = startIndex + this.newsPerPage;
        const paginatedNews = this.currentNewsSet.slice(startIndex, endIndex);
        const totalPages = Math.ceil(this.currentNewsSet.length / this.newsPerPage);

        if (this.currentNewsSet.length === 0) {
            if (resetButton) resetButton.style.display = 'none';

            container.innerHTML = `
                <div class="no-results">
                    <svg width="48" height="48" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.5 12c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5M10 4a4 4 0 0 1 4 4c0 .73-.19 1.41-.54 2H18a2 2 0 0 1 2 2v6c0 .24-.04.47-.12.68A6.5 6.5 0 0 0 20 16.5V10l-6-6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.5c.31.75.76 1.42 1.31 2H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h4m0 2H6v2h4V6m0 4H6v2h4v-2m0 4H6v2h4v-2Z"/>
                    </svg>
                    <h3>No se encontraron noticias</h3>
                    <p>No hay resultados para los filtros aplicados.</p>
                    <button class="reset-search" onclick="newsManager.resetFilters()">Mostrar todas las noticias</button>
                </div>
            `;
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        container.innerHTML = paginatedNews.map(news => `
            <article class="news-card">
                <div class="news-image">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3C/svg%3E" 
                         data-src="${news.image}" 
                         alt="${news.title}" 
                         loading="lazy">
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-date">${this.formatDate(news.date)}</span>
                        <span class="news-category">${news.category}</span>
                    </div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <div class="news-actions">
                        <a href="news-detail.html?id=${news.id}" class="read-more">Ver más</a>
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

        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentFilter = 'tag';
                this.currentSearchQuery = tag.getAttribute('data-tag');
                this.currentPage = 1;
                this.displayAllNews();
            });
        });

        this.renderPagination(totalPages);
        this.setupIntersectionObserver();
    }

    displayFeaturedNews() {
        const container = document.getElementById('featured-news-container');
        if (!container) return;

        const featuredNews = newsData.filter(news => news.featured).slice(0, 2);

        container.innerHTML = featuredNews.length === 0 ?
            '<p class="no-results">No hay noticias destacadas.</p>' :
            featuredNews.map(news => this.createNewsCard(news, true)).join('');
    }

    displayRecentNews() {
        const container = document.getElementById('recent-news-container');
        if (!container) return;

        const recentNews = [...newsData]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4);

        container.innerHTML = recentNews.length === 0 ?
            '<p class="no-results">No hay noticias recientes.</p>' :
            recentNews.map(news => this.createNewsCard(news)).join('');
    }

    displayPopularNews() {
        const container = document.getElementById('popular-news-container');
        if (!container) return;

        const popularNews = [...newsData]
            .sort((a, b) => this.getViews(b.id) - this.getViews(a.id))
            .slice(0, 3);

        container.innerHTML = popularNews.length === 0 ?
            '<p class="no-results">No hay datos de noticias populares.</p>' :
            popularNews.map(news => `
                <div class="popular-news-item">
                    <div class="popular-news-image">
                        <img src="${news.image}" alt="${news.title}" loading="lazy">
                    </div>
                    <div>
                        <h4 class="popular-news-title">
                            <a href="news-detail.html?id=${news.id}">${news.title}</a>
                        </h4>
                        <span class="views-count">${this.getViews(news.id)} vistas</span>
                    </div>
                </div>
            `).join('');
    }

    displayCategories() {
        const container = document.getElementById('categories-container');
        if (!container) return;

        const categoryCounts = {};
        newsData.forEach(news => {
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
                this.currentFilter = 'category';
                this.currentSearchQuery = link.getAttribute('data-category');
                this.currentPage = 1;
                this.displayAllNews();
            });
        });
    }

    displayPopularTags() {
        const container = document.getElementById('tags-container');
        if (!container) return;

        const tagCounts = {};
        newsData.forEach(news => {
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
                this.currentFilter = 'tag';
                this.currentSearchQuery = tag.getAttribute('data-tag');
                this.currentPage = 1;
                this.displayAllNews();
            });
        });
    }

    renderPagination(totalPages) {
        const container = document.getElementById('news-pagination');
        if (!container || totalPages <= 1) {
            if (container) container.innerHTML = '';
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
        if (totalPages > 5 && this.currentPage > 3) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        // Mostrar páginas alrededor de la actual
        const startPage = Math.max(2, this.currentPage - 1);
        const endPage = Math.min(totalPages - 1, this.currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            if (i > 1 && i < totalPages) {
                html += `
                    <button class="pagination-button ${this.currentPage === i ? 'active' : ''}" 
                            onclick="newsManager.changePage(${i})">
                        ${i}
                    </button>
                `;
            }
        }

        // Mostrar puntos suspensivos si hay muchas páginas
        if (totalPages > 5 && this.currentPage < totalPages - 2) {
            html += `<span class="pagination-ellipsis">...</span>`;
        }

        // Mostrar siempre la última página
        if (totalPages > 1) {
            html += `
                <button class="pagination-button ${this.currentPage === totalPages ? 'active' : ''}" 
                        onclick="newsManager.changePage(${totalPages})">
                    ${totalPages}
                </button>
            `;
        }

        html += `
            <button class="pagination-button ${this.currentPage === totalPages ? 'disabled' : ''}" 
                    onclick="newsManager.changePage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''}>
                &gt;
            </button>
        `;

        container.innerHTML = html;
    }

    changePage(page) {
        if (page < 1 || page > Math.ceil(this.currentNewsSet.length / this.newsPerPage)) return;
        this.currentPage = page;
        this.displayPaginatedNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    createNewsCard(news, featured = false) {
        return `
            <article class="news-card ${featured ? 'featured' : ''}">
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}" loading="lazy">
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-date">${this.formatDate(news.date)}</span>
                        <span class="news-category">${news.category}</span>
                    </div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <div class="news-actions">
                        <a href="news-detail.html?id=${news.id}" class="read-more">Ver más</a>
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
        likeCount.textContent = likes[newsId] || 0;
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
}

// Instanciar y exportar el manager
const newsManager = new NewsManager();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => newsManager.init());

// Hacer accesible globalmente
window.newsManager = newsManager;