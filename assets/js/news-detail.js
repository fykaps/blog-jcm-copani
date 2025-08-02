<<<<<<< HEAD
/**
 * Funcionalidades para la página de detalle de noticias
 */

// Mostrar detalle de noticia
function displayNewsDetail() {
    const container = document.querySelector('.news-detail-container');
    if (!container) return;

    // Obtener ID de la noticia de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = parseInt(urlParams.get('id'));

    // Buscar noticia
    const news = newsData.find(item => item.id === newsId);

    if (!news) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Noticia no encontrada</h2>
                <p>La noticia que buscas no existe o ha sido eliminada.</p>
                <a href="news.html" class="btn btn-primary">Volver a noticias</a>
            </div>
        `;
        return;
    }

    // Registrar vista
    registerView(newsId);

    // Mostrar noticia
    container.innerHTML = `
        <article class="news-detail">
            <header class="news-detail-header">
                <div class="news-breadcrumb">
                    <a href="news.html">Noticias</a> / <span>${news.category}</span>
                </div>
                <h1 class="news-detail-title">${news.title}</h1>
                <div class="news-detail-meta">
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <span>${formatDate(news.date)}</span>
                    </div>
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                        </svg>
                        <span>${getViews(newsId)} vistas</span>
                    </div>
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span class="like-count">${getLikes(newsId)}</span>
                    </div>
                </div>
                <div class="news-category">${news.category}</div>
            </header>
            
            <div class="news-detail-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
            </div>
            
            <div class="news-detail-content">
                ${news.content}
            </div>
            
            <div class="news-actions">
                <button class="like-button ${isNewsLiked(newsId) ? 'liked' : ''}" data-id="${newsId}">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>Me gusta</span>
                    <span class="like-count">${getLikes(newsId)}</span>
                </button>
                <div class="share-buttons">
                    <span>Compartir:</span>
                    <button class="share-button" data-network="facebook">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                        </svg>
                    </button>
                    <button class="share-button" data-network="twitter">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="news-tags">
                ${news.tags.map(tag => `<a href="news.html?tag=${tag}" class="tag">${tag}</a>`).join('')}
            </div>
        </article>
        
        <section class="comments-section">
            <div class="section-header">
                <h2>Comentarios</h2>
                <span class="comments-count">${getCommentsCount(newsId)} comentarios</span>
            </div>
            
            <div class="comment-form">
                <h3>Deja tu comentario</h3>
                <form id="comment-form">
                    <div class="form-group">
                        <label for="comment-name">Nombre*</label>
                        <input type="text" id="comment-name" required>
                    </div>
                    <div class="form-group">
                        <label for="comment-email">Email (no se publicará)*</label>
                        <input type="email" id="comment-email" required>
                    </div>
                    <div class="form-group">
                        <label for="comment-text">Comentario*</label>
                        <textarea id="comment-text" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Publicar comentario</button>
                </form>
            </div>
            
            <div class="comment-list" id="comment-list">
                <!-- Comentarios se cargarán aquí -->
            </div>
        </section>
    `;

    // Configurar botón de like
    const likeButton = document.querySelector('.like-button');
    if (likeButton) {
        likeButton.addEventListener('click', handleLike);
    }

    // Configurar botones de compartir
    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', handleShare);
    });

    // Configurar formulario de comentarios
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            addComment(newsId);
        });
    }

    // Mostrar comentarios
    displayComments(newsId);
}

// Manejar like
function handleLike(event) {
    const button = event.currentTarget;
    const newsId = parseInt(button.getAttribute('data-id'));

    // Obtener likes actuales
    let likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    let userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];

    // Animación de like
    button.classList.add('animate-pulse');
    setTimeout(() => button.classList.remove('animate-pulse'), 700);

    if (userLikes.includes(newsId)) {
        // Quitar like
        likes[newsId] = (likes[newsId] || 1) - 1;
        userLikes = userLikes.filter(id => id !== newsId);
        button.classList.remove('liked');
    } else {
        // Añadir like
        likes[newsId] = (likes[newsId] || 0) + 1;
        userLikes.push(newsId);
        button.classList.add('liked');

        // Efecto de confeti para like
        if (likes[newsId] % 10 === 0) {
            showConfetti();
        }
    }

    // Guardar en localStorage
    localStorage.setItem('newsLikes', JSON.stringify(likes));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));

    // Actualizar contadores
    document.querySelectorAll(`.like-count`).forEach(el => {
        el.textContent = likes[newsId] || 0;
    });
}

// Verificar si una noticia tiene like
function isNewsLiked(newsId) {
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
    return userLikes.includes(newsId);
}

// Manejar compartir
function handleShare(event) {
    const network = event.currentTarget.getAttribute('data-network');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    let shareUrl;

    switch (network) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Mostrar comentarios
function displayComments(newsId) {
    const container = document.getElementById('comment-list');
    if (!container) return;

    // Obtener comentarios del localStorage
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    const newsComments = allComments[newsId] || [];

    // Comentarios simulados (solo para demostración)
    const simulatedComments = [
        {
            id: 1,
            name: "María González",
            date: new Date(Date.now() - 86400000).toISOString(), // Hace 1 día
            content: "¡Excelente noticia! Me encanta ver cómo mejoran las instalaciones del colegio."
        },
        {
            id: 2,
            name: "Profesor Martínez",
            date: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
            content: "Como docente, estoy muy contento con este avance. Beneficiará mucho a nuestros estudiantes."
        }
    ];

    // Combinar comentarios reales con simulados
    const commentsToShow = [...simulatedComments, ...newsComments]
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (commentsToShow.length === 0) {
        container.innerHTML = '<p class="no-comments">No hay comentarios aún. Sé el primero en comentar.</p>';
        return;
    }

    container.innerHTML = commentsToShow.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <div class="comment-author">
                    <div class="comment-avatar">
                        ${comment.name.charAt(0).toUpperCase()}
                    </div>
                    <span>${comment.name}</span>
                </div>
                <span class="comment-date">${formatDate(comment.date)}</span>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div>
        </div>
    `).join('');
}

// Añadir nuevo comentario
function addComment(newsId) {
    const nameInput = document.getElementById('comment-name');
    const emailInput = document.getElementById('comment-email');
    const textInput = document.getElementById('comment-text');

    if (!nameInput || !emailInput || !textInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !email || !text) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }

    // Obtener comentarios existentes
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    const newsComments = allComments[newsId] || [];

    // Crear nuevo comentario
    const newComment = {
        id: Date.now(),
        name: name,
        email: email,
        date: new Date().toISOString(),
        content: text
    };

    // Guardar comentario
    allComments[newsId] = [newComment, ...newsComments];
    localStorage.setItem('newsComments', JSON.stringify(allComments));

    // Mostrar mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Gracias por tu comentario!';
    document.querySelector('.comment-form').appendChild(successMessage);

    // Limpiar formulario
    nameInput.value = '';
    emailInput.value = '';
    textInput.value = '';

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => successMessage.remove(), 300);
    }, 3000);

    // Actualizar lista de comentarios
    displayComments(newsId);
    updateCommentsCount(newsId);
}

// Obtener número de comentarios
function getCommentsCount(newsId) {
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    const newsComments = allComments[newsId] || [];
    return newsComments.length + 2; // +2 por los comentarios simulados
}

// Actualizar contador de comentarios
function updateCommentsCount(newsId) {
    const countElement = document.querySelector('.comments-count');
    if (countElement) {
        countElement.textContent = `${getCommentsCount(newsId)} comentarios`;
    }
}

// Mostrar confeti (para likes especiales)
function showConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-overlay';
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.style.opacity = '0';
        setTimeout(() => confetti.remove(), 1000);
    }, 3000);
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Obtener número de vistas
function getViews(newsId) {
    const views = JSON.parse(localStorage.getItem('newsViews')) || {};
    return views[newsId] || 0;
}

// Registrar vista
function registerView(newsId) {
    let views = JSON.parse(localStorage.getItem('newsViews')) || {};
    views[newsId] = (views[newsId] || 0) + 1;
    localStorage.setItem('newsViews', JSON.stringify(views));
}

// Obtener número de likes
function getLikes(newsId) {
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    return likes[newsId] || 0;
}

// Inicializar la página
=======
/**
 * Funcionalidades para la página de detalle de noticias
 */

// Mostrar detalle de noticia
function displayNewsDetail() {
    const container = document.querySelector('.news-detail-container');
    if (!container) return;

    // Obtener ID de la noticia de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = parseInt(urlParams.get('id'));

    // Buscar noticia
    const news = newsData.find(item => item.id === newsId);

    if (!news) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Noticia no encontrada</h2>
                <p>La noticia que buscas no existe o ha sido eliminada.</p>
                <a href="news.html" class="btn btn-primary">Volver a noticias</a>
            </div>
        `;
        return;
    }

    // Registrar vista
    registerView(newsId);

    // Mostrar noticia
    container.innerHTML = `
        <article class="news-detail">
            <header class="news-detail-header">
                <div class="news-breadcrumb">
                    <a href="news.html">Noticias</a> / <span>${news.category}</span>
                </div>
                <h1 class="news-detail-title">${news.title}</h1>
                <div class="news-detail-meta">
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <span>${formatDate(news.date)}</span>
                    </div>
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                        </svg>
                        <span>${getViews(newsId)} vistas</span>
                    </div>
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span class="like-count">${getLikes(newsId)}</span>
                    </div>
                </div>
                <div class="news-category">${news.category}</div>
            </header>
            
            <div class="news-detail-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
            </div>
            
            <div class="news-detail-content">
                ${news.content}
            </div>
            
            <div class="news-actions">
                <button class="like-button ${isNewsLiked(newsId) ? 'liked' : ''}" data-id="${newsId}">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>Me gusta</span>
                    <span class="like-count">${getLikes(newsId)}</span>
                </button>
                <div class="share-buttons">
                    <span>Compartir:</span>
                    <button class="share-button" data-network="facebook">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                        </svg>
                    </button>
                    <button class="share-button" data-network="twitter">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="news-tags">
                ${news.tags.map(tag => `<a href="news.html?tag=${tag}" class="tag">${tag}</a>`).join('')}
            </div>
        </article>
        
        <section class="comments-section">
            <div class="section-header">
                <h2>Comentarios</h2>
                <span class="comments-count">${getCommentsCount(newsId)} comentarios</span>
            </div>
            
            <div class="comment-form">
                <h3>Deja tu comentario</h3>
                <form id="comment-form">
                    <div class="form-group">
                        <label for="comment-name">Nombre*</label>
                        <input type="text" id="comment-name" required>
                    </div>
                    <div class="form-group">
                        <label for="comment-email">Email (no se publicará)*</label>
                        <input type="email" id="comment-email" required>
                    </div>
                    <div class="form-group">
                        <label for="comment-text">Comentario*</label>
                        <textarea id="comment-text" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Publicar comentario</button>
                </form>
            </div>
            
            <div class="comment-list" id="comment-list">
                <!-- Comentarios se cargarán aquí -->
            </div>
        </section>
    `;

    // Configurar botón de like
    const likeButton = document.querySelector('.like-button');
    if (likeButton) {
        likeButton.addEventListener('click', handleLike);
    }

    // Configurar botones de compartir
    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', handleShare);
    });

    // Configurar formulario de comentarios
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            addComment(newsId);
        });
    }

    // Mostrar comentarios
    displayComments(newsId);
}

// Manejar like
function handleLike(event) {
    const button = event.currentTarget;
    const newsId = parseInt(button.getAttribute('data-id'));

    // Obtener likes actuales
    let likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    let userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];

    // Animación de like
    button.classList.add('animate-pulse');
    setTimeout(() => button.classList.remove('animate-pulse'), 700);

    if (userLikes.includes(newsId)) {
        // Quitar like
        likes[newsId] = (likes[newsId] || 1) - 1;
        userLikes = userLikes.filter(id => id !== newsId);
        button.classList.remove('liked');
    } else {
        // Añadir like
        likes[newsId] = (likes[newsId] || 0) + 1;
        userLikes.push(newsId);
        button.classList.add('liked');

        // Efecto de confeti para like
        if (likes[newsId] % 10 === 0) {
            showConfetti();
        }
    }

    // Guardar en localStorage
    localStorage.setItem('newsLikes', JSON.stringify(likes));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));

    // Actualizar contadores
    document.querySelectorAll(`.like-count`).forEach(el => {
        el.textContent = likes[newsId] || 0;
    });
}

// Verificar si una noticia tiene like
function isNewsLiked(newsId) {
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || [];
    return userLikes.includes(newsId);
}

// Manejar compartir
function handleShare(event) {
    const network = event.currentTarget.getAttribute('data-network');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    let shareUrl;

    switch (network) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Mostrar comentarios
function displayComments(newsId) {
    const container = document.getElementById('comment-list');
    if (!container) return;

    // Obtener comentarios del localStorage
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    const newsComments = allComments[newsId] || [];

    // Comentarios simulados (solo para demostración)
    const simulatedComments = [
        {
            id: 1,
            name: "María González",
            date: new Date(Date.now() - 86400000).toISOString(), // Hace 1 día
            content: "¡Excelente noticia! Me encanta ver cómo mejoran las instalaciones del colegio."
        },
        {
            id: 2,
            name: "Profesor Martínez",
            date: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
            content: "Como docente, estoy muy contento con este avance. Beneficiará mucho a nuestros estudiantes."
        }
    ];

    // Combinar comentarios reales con simulados
    const commentsToShow = [...simulatedComments, ...newsComments]
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (commentsToShow.length === 0) {
        container.innerHTML = '<p class="no-comments">No hay comentarios aún. Sé el primero en comentar.</p>';
        return;
    }

    container.innerHTML = commentsToShow.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <div class="comment-author">
                    <div class="comment-avatar">
                        ${comment.name.charAt(0).toUpperCase()}
                    </div>
                    <span>${comment.name}</span>
                </div>
                <span class="comment-date">${formatDate(comment.date)}</span>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div>
        </div>
    `).join('');
}

// Añadir nuevo comentario
function addComment(newsId) {
    const nameInput = document.getElementById('comment-name');
    const emailInput = document.getElementById('comment-email');
    const textInput = document.getElementById('comment-text');

    if (!nameInput || !emailInput || !textInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !email || !text) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }

    // Obtener comentarios existentes
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    const newsComments = allComments[newsId] || [];

    // Crear nuevo comentario
    const newComment = {
        id: Date.now(),
        name: name,
        email: email,
        date: new Date().toISOString(),
        content: text
    };

    // Guardar comentario
    allComments[newsId] = [newComment, ...newsComments];
    localStorage.setItem('newsComments', JSON.stringify(allComments));

    // Mostrar mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Gracias por tu comentario!';
    document.querySelector('.comment-form').appendChild(successMessage);

    // Limpiar formulario
    nameInput.value = '';
    emailInput.value = '';
    textInput.value = '';

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => successMessage.remove(), 300);
    }, 3000);

    // Actualizar lista de comentarios
    displayComments(newsId);
    updateCommentsCount(newsId);
}

// Obtener número de comentarios
function getCommentsCount(newsId) {
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    const newsComments = allComments[newsId] || [];
    return newsComments.length + 2; // +2 por los comentarios simulados
}

// Actualizar contador de comentarios
function updateCommentsCount(newsId) {
    const countElement = document.querySelector('.comments-count');
    if (countElement) {
        countElement.textContent = `${getCommentsCount(newsId)} comentarios`;
    }
}

// Mostrar confeti (para likes especiales)
function showConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-overlay';
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.style.opacity = '0';
        setTimeout(() => confetti.remove(), 1000);
    }, 3000);
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Obtener número de vistas
function getViews(newsId) {
    const views = JSON.parse(localStorage.getItem('newsViews')) || {};
    return views[newsId] || 0;
}

// Registrar vista
function registerView(newsId) {
    let views = JSON.parse(localStorage.getItem('newsViews')) || {};
    views[newsId] = (views[newsId] || 0) + 1;
    localStorage.setItem('newsViews', JSON.stringify(views));
}

// Obtener número de likes
function getLikes(newsId) {
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    return likes[newsId] || 0;
}

// Inicializar la página
>>>>>>> f544b31e5157af84e4703e6538865ca99e6358ab
document.addEventListener('DOMContentLoaded', displayNewsDetail);