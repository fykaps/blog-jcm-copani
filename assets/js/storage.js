<<<<<<< HEAD
/**
 * Manejo del localStorage para likes, comentarios y vistas
 */

// Obtener likes de una noticia
function getLikes(newsId) {
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    return likes[newsId] || 0;
}

// Añadir like a una noticia
function addLike(newsId) {
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    likes[newsId] = (likes[newsId] || 0) + 1;
    localStorage.setItem('newsLikes', JSON.stringify(likes));
    return likes[newsId];
}

// Obtener comentarios de una noticia
function getComments(newsId) {
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    return allComments[newsId] || [];
}

// Añadir comentario a una noticia
function addComment(newsId, comment) {
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    if (!allComments[newsId]) {
        allComments[newsId] = [];
    }

    const newComment = {
        id: Date.now(),
        author: comment.author,
        email: comment.email,
        content: comment.content,
        date: new Date().toISOString()
    };

    allComments[newsId].unshift(newComment);
    localStorage.setItem('newsComments', JSON.stringify(allComments));
    return newComment;
}

// Incrementar contador de vistas
function incrementViews(newsId) {
    const views = JSON.parse(localStorage.getItem('newsViews')) || {};
    views[newsId] = (views[newsId] || 0) + 1;
    localStorage.setItem('newsViews', JSON.stringify(views));
    return views[newsId];
}

// Obtener noticias más vistas
function getMostViewedNews(newsList, limit = 5) {
    const views = JSON.parse(localStorage.getItem('newsViews')) || {};

    return newsList
        .map(news => ({
            ...news,
            views: views[news.id] || 0
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
=======
/**
 * Manejo del localStorage para likes, comentarios y vistas
 */

// Obtener likes de una noticia
function getLikes(newsId) {
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    return likes[newsId] || 0;
}

// Añadir like a una noticia
function addLike(newsId) {
    const likes = JSON.parse(localStorage.getItem('newsLikes')) || {};
    likes[newsId] = (likes[newsId] || 0) + 1;
    localStorage.setItem('newsLikes', JSON.stringify(likes));
    return likes[newsId];
}

// Obtener comentarios de una noticia
function getComments(newsId) {
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    return allComments[newsId] || [];
}

// Añadir comentario a una noticia
function addComment(newsId, comment) {
    const allComments = JSON.parse(localStorage.getItem('newsComments')) || {};
    if (!allComments[newsId]) {
        allComments[newsId] = [];
    }

    const newComment = {
        id: Date.now(),
        author: comment.author,
        email: comment.email,
        content: comment.content,
        date: new Date().toISOString()
    };

    allComments[newsId].unshift(newComment);
    localStorage.setItem('newsComments', JSON.stringify(allComments));
    return newComment;
}

// Incrementar contador de vistas
function incrementViews(newsId) {
    const views = JSON.parse(localStorage.getItem('newsViews')) || {};
    views[newsId] = (views[newsId] || 0) + 1;
    localStorage.setItem('newsViews', JSON.stringify(views));
    return views[newsId];
}

// Obtener noticias más vistas
function getMostViewedNews(newsList, limit = 5) {
    const views = JSON.parse(localStorage.getItem('newsViews')) || {};

    return newsList
        .map(news => ({
            ...news,
            views: views[news.id] || 0
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
>>>>>>> f544b31e5157af84e4703e6538865ca99e6358ab
}