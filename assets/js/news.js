/**
 * Sistema completo de gestión de noticias para el blog escolar
 * Incluye: paginación, filtrado, búsqueda, likes y reseteo de filtros
 */

// Variables globales
let currentPage = 1;
const newsPerPage = 4;
let currentNewsSet = [];
let currentFilter = 'all';
let currentSearchQuery = '';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadNewsData();
    setupSearch();
    setupEventListeners();
});

// Cargar datos de noticias
function loadNewsData() {
    currentNewsSet = [...newsData];
    displayAllNews();
    displayFeaturedNews();
    displayRecentNews();
    displayPopularNews();
    displayCategories();
    displayPopularTags();
}

// Configurar búsqueda
function setupSearch() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(searchInput.value);
        });
    }
}

// Realizar búsqueda
function performSearch(query) {
    const searchInput = document.getElementById('search-input');
    currentSearchQuery = query.trim();
    currentPage = 1;
    currentFilter = currentSearchQuery === '' ? 'all' : 'search';

    if (currentSearchQuery === '') {
        resetFilters();
        searchInput.value = '';
        return;
    }

    const filteredNews = newsData.filter(news => {
        const searchText = currentSearchQuery.toLowerCase();
        return (
            news.title.toLowerCase().includes(searchText) ||
            news.excerpt.toLowerCase().includes(searchText) ||
            news.content.toLowerCase().includes(searchText) ||
            news.tags.some(tag => tag.toLowerCase().includes(searchText))
        );
    });

    updateFilterUI(`Búsqueda: "${currentSearchQuery}"`, `Resultados para "${currentSearchQuery}"`);
    currentNewsSet = filteredNews;
    displayPaginatedNews();
}

// Configurar event listeners
function setupEventListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.like-button')) {
            const button = e.target.closest('.like-button');
            handleLike(button);
        }
    });

    document.getElementById('reset-filters')?.addEventListener('click', resetFilters);
}

// Actualizar la UI del filtro
function updateFilterUI(title, description) {
    const filterTitle = document.getElementById('filter-title');
    const filterDescription = document.getElementById('filter-description');
    const resetButton = document.getElementById('reset-filters');

    if (filterTitle) filterTitle.textContent = title;
    if (filterDescription) filterDescription.textContent = description;
    if (resetButton) resetButton.style.display = currentFilter === 'all' ? 'none' : 'flex';
}

// Mostrar todas las noticias con filtros
function displayAllNews() {
    let filteredNews = [...newsData];
    let title = 'Todas las noticias';
    let description = 'Las últimas publicaciones de nuestro blog escolar';

    if (currentFilter === 'category') {
        filteredNews = filteredNews.filter(news => news.category === currentSearchQuery);
        title = `Categoría: ${currentSearchQuery}`;
        description = `Mostrando noticias de la categoría ${currentSearchQuery}`;
    }
    else if (currentFilter === 'tag') {
        filteredNews = filteredNews.filter(news => news.tags.includes(currentSearchQuery));
        title = `Etiqueta: ${currentSearchQuery}`;
        description = `Mostrando noticias con la etiqueta ${currentSearchQuery}`;
    }

    updateFilterUI(title, description);
    currentNewsSet = filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayPaginatedNews();
}

// Resetear todos los filtros
function resetFilters() {
    currentFilter = 'all';
    currentSearchQuery = '';
    currentPage = 1;

    // Resetear UI
    document.querySelectorAll('.filter-button, .category-link, .tag').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-button[data-filter="all"]')?.classList.add('active');
    document.getElementById('search-input').value = '';

    updateFilterUI('Todas las noticias', 'Las últimas publicaciones de nuestro blog escolar');
    loadNewsData();
}

// Mostrar noticias paginadas
function displayPaginatedNews() {
    const container = document.getElementById('all-news-container');
    const paginationContainer = document.getElementById('news-pagination');
    const resetButton = document.getElementById('reset-filters');

    if (!container) return;

    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const paginatedNews = currentNewsSet.slice(startIndex, endIndex);
    const totalPages = Math.ceil(currentNewsSet.length / newsPerPage);

    if (currentNewsSet.length === 0) {
        // Ocultar el botón de reset principal cuando mostramos el mensaje de no resultados
        if (resetButton) resetButton.style.display = 'none';

        container.innerHTML = `
            <div class="no-results">
                <svg width="48" height="48" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15.5 12c2.5 0 4.5 2 4.5 4.5 0 .88-.25 1.71-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5M10 4a4 4 0 0 1 4 4c0 .73-.19 1.41-.54 2H18a2 2 0 0 1 2 2v6c0 .24-.04.47-.12.68A6.5 6.5 0 0 0 20 16.5V10l-6-6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5.5c.31.75.76 1.42 1.31 2H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h4m0 2H6v2h4V6m0 4H6v2h4v-2m0 4H6v2h4v-2Z"/>
                </svg>
                <h3>No se encontraron noticias</h3>
                <p>No hay resultados para los filtros aplicados.</p>
                <button class="reset-search" onclick="resetFilters()">Mostrar todas las noticias</button>
            </div>
        `;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    // Mostrar noticias normalmente
    container.innerHTML = paginatedNews.map(news => `
        <article class="news-card">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">${formatDate(news.date)}</span>
                    <span class="news-category">${news.category}</span>
                </div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-actions">
                    <a href="news-detail.html?id=${news.id}" class="read-more">Ver más</a>
                    <button class="like-button" data-id="${news.id}">
                        <span class="like-icon">❤</span>
                        <span class="like-count">${getLikes(news.id)}</span>
                    </button>
                </div>
                <div class="news-tags">
                    ${news.tags.map(tag => `<a href="#" class="tag" data-tag="${tag}">${tag}</a>`).join('')}
                </div>
            </div>
        </article>
    `).join('');

    // Configurar event listeners para tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            currentFilter = 'tag';
            currentSearchQuery = tag.getAttribute('data-tag');
            currentPage = 1;
            displayAllNews();
        });
    });

    renderPagination(totalPages);
}

// Mostrar noticias destacadas
function displayFeaturedNews() {
    const container = document.getElementById('featured-news-container');
    if (!container) return;

    const featuredNews = newsData.filter(news => news.featured).slice(0, 2);

    container.innerHTML = featuredNews.length === 0 ?
        '<p class="no-results">No hay noticias destacadas.</p>' :
        featuredNews.map(news => createNewsCard(news, true)).join('');
}

// Mostrar noticias recientes
function displayRecentNews() {
    const container = document.getElementById('recent-news-container');
    if (!container) return;

    const recentNews = [...newsData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4);

    container.innerHTML = recentNews.length === 0 ?
        '<p class="no-results">No hay noticias recientes.</p>' :
        recentNews.map(news => createNewsCard(news)).join('');
}

// Mostrar noticias populares
function displayPopularNews() {
    const container = document.getElementById('popular-news-container');
    if (!container) return;

    const popularNews = [...newsData]
        .sort((a, b) => getViews(b.id) - getViews(a.id))
        .slice(0, 3);

    container.innerHTML = popularNews.length === 0 ?
        '<p class="no-results">No hay datos de noticias populares.</p>' :
        popularNews.map(news => `
            <div class="popular-news-item">
                <div class="popular-news-image">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div>
                    <h4 class="popular-news-title">
                        <a href="news-detail.html?id=${news.id}">${news.title}</a>
                    </h4>
                    <span class="views-count">${getViews(news.id)} vistas</span>
                </div>
            </div>
        `).join('');
}

// Mostrar categorías
function displayCategories() {
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
            currentFilter = 'category';
            currentSearchQuery = link.getAttribute('data-category');
            currentPage = 1;
            displayAllNews();
        });
    });
}

// Mostrar etiquetas populares
function displayPopularTags() {
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
            currentFilter = 'tag';
            currentSearchQuery = tag.getAttribute('data-tag');
            currentPage = 1;
            displayAllNews();
        });
    });
}

// Renderizar paginación
function renderPagination(totalPages) {
    const container = document.getElementById('news-pagination');
    if (!container || totalPages <= 1) {
        if (container) container.innerHTML = '';
        return;
    }

    let html = `
        <button class="pagination-button ${currentPage === 1 ? 'disabled' : ''}" 
                onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            &lt;
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button class="pagination-button ${currentPage === i ? 'active' : ''}" 
                    onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }

    html += `
        <button class="pagination-button ${currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            &gt;
        </button>
    `;

    container.innerHTML = html;
}

// Cambiar de página
function changePage(page) {
    if (page < 1 || page > Math.ceil(currentNewsSet.length / newsPerPage)) return;
    currentPage = page;
    displayPaginatedNews();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Crear tarjeta de noticia
function createNewsCard(news, featured = false) {
    return `
        <article class="news-card ${featured ? 'featured' : ''}">
            <div class="news-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">${formatDate(news.date)}</span>
                    <span class="news-category">${news.category}</span>
                </div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-actions">
                    <a href="news-detail.html?id=${news.id}" class="read-more">Ver más</a>
                    <button class="like-button" data-id="${news.id}">
                        <span class="like-icon">❤</span>
                        <span class="like-count">${getLikes(news.id)}</span>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Manejar likes
function handleLike(button) {
    const newsId = parseInt(button.getAttribute('data-id'));
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
    const likeCount = button.querySelector('.like-count');

    if (userLikes.includes(newsId)) {
        likes[newsId] = (likes[newsId] || 1) - 1;
        button.classList.remove('liked');
        userLikes.splice(userLikes.indexOf(newsId), 1);
    } else {
        likes[newsId] = (likes[newsId] || 0) + 1;
        button.classList.add('liked');
        userLikes.push(newsId);
    }

    localStorage.setItem('newsLikes', JSON.stringify(likes));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
    likeCount.textContent = likes[newsId] || 0;
}

// Obtener número de likes
function getLikes(newsId) {
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    return likes[newsId] || 0;
}

// Obtener número de vistas
function getViews(newsId) {
    const views = JSON.parse(localStorage.getItem('newsViews')) || {};
    return views[newsId] || 0;
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Hacer funciones accesibles globalmente
window.changePage = changePage;
window.resetFilters = resetFilters;
