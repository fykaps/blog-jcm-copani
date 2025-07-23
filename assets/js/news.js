/**
 * Sistema completo de gestión de noticias para el blog escolar
 * Incluye: paginación, filtrado, búsqueda, likes y más
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
    // En una implementación real, aquí podrías cargar desde un archivo JSON
    // Por ahora usamos el array newsData definido en news-data.js
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
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

// Realizar búsqueda
function performSearch(query) {
    currentSearchQuery = query.trim();
    currentPage = 1;
    currentFilter = 'search';

    if (currentSearchQuery === '') {
        currentFilter = 'all';
    }

    displayAllNews();
}

// Configurar event listeners
function setupEventListeners() {
    // Likes
    document.addEventListener('click', (e) => {
        if (e.target.closest('.like-button')) {
            const button = e.target.closest('.like-button');
            handleLike(button);
        }
    });
}

// Mostrar todas las noticias con filtros
function displayAllNews() {
    const container = document.getElementById('all-news-container');
    const filterTitle = document.getElementById('filter-title');
    const filterDescription = document.getElementById('filter-description');

    if (!container) return;

    // Aplicar filtros
    let filteredNews = [...newsData];

    if (currentFilter === 'category') {
        filteredNews = filteredNews.filter(news => news.category === currentSearchQuery);
        filterTitle.textContent = `Categoría: ${currentSearchQuery}`;
        filterDescription.textContent = `Mostrando noticias de la categoría ${currentSearchQuery}`;
    }
    else if (currentFilter === 'tag') {
        filteredNews = filteredNews.filter(news => news.tags.includes(currentSearchQuery));
        filterTitle.textContent = `Etiqueta: ${currentSearchQuery}`;
        filterDescription.textContent = `Mostrando noticias con la etiqueta ${currentSearchQuery}`;
    }
    else if (currentFilter === 'search') {
        const query = currentSearchQuery.toLowerCase();
        filteredNews = filteredNews.filter(news =>
            news.title.toLowerCase().includes(query) ||
            news.excerpt.toLowerCase().includes(query) ||
            news.content.toLowerCase().includes(query) ||
            news.tags.some(tag => tag.toLowerCase().includes(query))
        );
        filterTitle.textContent = `Búsqueda: "${currentSearchQuery}"`;
        filterDescription.textContent = `Resultados para "${currentSearchQuery}"`;
    }
    else {
        filterTitle.textContent = 'Todas las noticias';
        filterDescription.textContent = 'Las últimas publicaciones de nuestro blog escolar';
    }

    // Ordenar por fecha (más recientes primero)
    currentNewsSet = filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Mostrar noticias paginadas
    displayPaginatedNews();
}

// Mostrar noticias paginadas
function displayPaginatedNews() {
    const container = document.getElementById('all-news-container');
    const paginationContainer = document.getElementById('news-pagination');

    if (!container) return;

    // Calcular índices para la paginación
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;
    const paginatedNews = currentNewsSet.slice(startIndex, endIndex);
    const totalPages = Math.ceil(currentNewsSet.length / newsPerPage);

    // Mostrar mensaje si no hay noticias
    if (currentNewsSet.length === 0) {
        container.innerHTML = '<p class="no-results">No se encontraron noticias con los criterios seleccionados.</p>';
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    // Generar HTML de las noticias
    container.innerHTML = paginatedNews.map(news => `
        <article class="news-card hover-scale animate-fade-in">
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
                    <a href="news-detail.html?id=${news.id}" class="read-more hover-underline">
                        Ver más <span>&rarr;</span>
                    </a>
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

    // Generar paginación
    renderPagination(totalPages);
}

// Mostrar noticias destacadas
function displayFeaturedNews() {
    const container = document.getElementById('featured-news-container');
    if (!container) return;

    const featuredNews = newsData.filter(news => news.featured).slice(0, 2);

    if (featuredNews.length === 0) {
        container.innerHTML = '<p class="no-results">No hay noticias destacadas en este momento.</p>';
        return;
    }

    container.innerHTML = featuredNews.map(news => `
        <article class="news-card featured hover-scale animate-fade-in">
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
                    <a href="news-detail.html?id=${news.id}" class="read-more hover-underline">
                        Ver más <span>&rarr;</span>
                    </a>
                    <button class="like-button" data-id="${news.id}">
                        <span class="like-icon">❤</span>
                        <span class="like-count">${getLikes(news.id)}</span>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// Mostrar noticias recientes (con fecha de hoy o cercanas)
function displayRecentNews() {
    const container = document.getElementById('recent-news-container');
    if (!container) return;

    // Obtener fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Obtener noticias recientes (de hoy o los últimos 7 días)
    const recentNews = newsData.filter(news => {
        const newsDate = new Date(news.date);
        const diffTime = today - newsDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 7; // Mostrar noticias de los últimos 7 días
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha más reciente

    // Si no hay noticias recientes, mostrar un mensaje
    if (recentNews.length === 0) {
        container.innerHTML = '<p class="no-news">No hay noticias recientes. Por favor visita nuestra sección de noticias.</p>';
        return;
    }

    // Mostrar máximo 4 noticias recientes
    const newsToShow = recentNews.slice(0, 4);

    container.innerHTML = newsToShow.map(news => `
        <article class="news-card hover-scale">
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
                    <a href="news-detail.html?id=${news.id}" class="read-more hover-underline">
                        Ver más <span>&rarr;</span>
                    </a>
                    <button class="like-button" data-id="${news.id}">
                        <span class="like-icon">❤</span>
                        <span class="like-count">${getLikes(news.id)}</span>
                    </button>
                </div>
            </div>
        </article>
    `).join('');

    // Configurar botones de like
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', handleLike);
    });
}

// Mostrar noticias populares
function displayPopularNews() {
    const container = document.getElementById('popular-news-container');
    if (!container) return;

    // Ordenar por vistas (usando localStorage)
    const sortedNews = [...newsData].sort((a, b) => getViews(b.id) - getViews(a.id));
    const popularNews = sortedNews.slice(0, 3);

    if (popularNews.length === 0) {
        container.innerHTML = '<p class="no-results">No hay datos de noticias populares.</p>';
        return;
    }

    container.innerHTML = popularNews.map(news => `
        <div class="popular-news-item animate-fade-in">
            <div class="popular-news-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
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

    // Obtener categorías únicas y contar noticias por categoría
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

    // Configurar event listeners para categorías
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

    // Contar frecuencia de etiquetas
    const tagCounts = {};
    newsData.forEach(news => {
        news.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    // Convertir a array y ordenar por frecuencia
    const popularTags = Object.keys(tagCounts)
        .map(tag => ({ name: tag, count: tagCounts[tag] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Mostrar solo las 10 más populares

    container.innerHTML = popularTags.map(tag => `
        <a href="#" class="tag" data-tag="${tag.name}">
            ${tag.name} <span>(${tag.count})</span>
        </a>
    `).join('');

    // Configurar event listeners para tags
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
    const paginationContainer = document.getElementById('news-pagination');
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    const maxVisiblePages = 5; // Máximo de páginas visibles
    let startPage, endPage;

    // Calcular rango de páginas visibles
    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
        const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

        if (currentPage <= maxPagesBeforeCurrent) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrent;
            endPage = currentPage + maxPagesAfterCurrent;
        }
    }

    // Botón Anterior
    paginationHTML += `
        <button class="pagination-button ${currentPage === 1 ? 'disabled' : ''}" 
                onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            &lt;
        </button>
    `;

    // Primera página con elipsis si es necesario
    if (startPage > 1) {
        paginationHTML += `
            <button class="pagination-button" onclick="changePage(1)">
                1
            </button>
        `;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }

    // Páginas visibles
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-button ${currentPage === i ? 'active' : ''}" 
                    onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }

    // Última página con elipsis si es necesario
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
        paginationHTML += `
            <button class="pagination-button" onclick="changePage(${totalPages})">
                ${totalPages}
            </button>
        `;
    }

    // Botón Siguiente
    paginationHTML += `
        <button class="pagination-button ${currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            &gt;
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

// Cambiar de página
function changePage(page) {
    if (page < 1 || page > Math.ceil(currentNewsSet.length / newsPerPage)) return;

    currentPage = page;
    displayPaginatedNews();

    // Scroll suave al principio de las noticias
    const newsSection = document.getElementById('all-news-container');
    if (newsSection) {
        newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Manejar likes
function handleLike(button) {
    const newsId = parseInt(button.getAttribute('data-id'));
    const likeCountElement = button.querySelector('.like-count');

    // Obtener likes actuales del localStorage
    let likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    let userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];

    if (userLikes.includes(newsId)) {
        // Quitar like
        likes[newsId] = (likes[newsId] || 1) - 1;
        button.classList.remove('liked');
        userLikes = userLikes.filter(id => id !== newsId);
    } else {
        // Añadir like
        likes[newsId] = (likes[newsId] || 0) + 1;
        button.classList.add('liked');
        userLikes.push(newsId);
    }

    // Guardar en localStorage
    localStorage.setItem('newsLikes', JSON.stringify(likes));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));

    // Actualizar contador
    likeCountElement.textContent = likes[newsId] || 0;
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

// Hacer funciones accesibles globalmente para los event listeners en HTML
window.changePage = changePage;