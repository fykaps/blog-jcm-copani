/**
 * Funcionalidades para la página de detalle de evento
 */


// Mostrar detalle del evento
function displayEventDetail() {
    const container = document.getElementById('event-detail');
    if (!container) return;

    // Obtener ID del evento de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));

    // Buscar evento
    const event = galleryData.find(item => item.id === eventId);

    if (!event) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Evento no encontrado</h2>
                <p>El evento solicitado no existe o ha sido eliminado.</p>
                <a href="gallery.html" class="back-btn">Volver a galerías</a>
            </div>
        `;
        return;
    }

    // Mostrar evento
    container.innerHTML = `
        <article class="event-detail">
            <header class="event-detail-header">
                <div class="event-breadcrumb">
                    <a href="gallery.html">Galerías</a> / <span>${event.category}</span>
                </div>
                <h1 class="event-detail-title">${event.title}</h1>
                <div class="event-detail-meta">
                    <div class="meta-item">
                        <span class="event-date">${formatDate(event.date)}</span>
                    </div>
                    <div class="meta-item">
                        <span class="event-category">${event.category}</span>
                    </div>
                </div>
            </header>
            
            <div class="event-description">
                <p>${event.description}</p>
            </div>
            
            <section class="event-gallery">
                <h2>Galería Multimedia</h2>
                <div class="media-filters">
                    <button class="media-filter active" data-filter="all">Todos</button>
                    <button class="media-filter" data-filter="image">Imágenes</button>
                    <button class="media-filter" data-filter="video">Videos</button>
                    <button class="media-filter" data-filter="audio">Audios</button>
                </div>
                
                <div class="media-grid">
                    ${event.media.map((media, index) => `
                        <div class="media-item ${media.type}" data-index="${index}" data-type="${media.type}">
                            ${renderMediaItem(media, index, event.title)}
                        </div>
                    `).join('')}
                </div>
            </section>
            
<div class="event-actions">
    <a href="gallery.html" class="back-btn icon-left">
        <svg viewBox="0 0 512 512" width="16" height="16">
            <path fill="currentColor" d="M24 192l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-46.7-46.7c75.3-58.6 184.3-53.3 253.5 15.9 75 75 75 196.5 0 271.5s-196.5 75-271.5 0c-10.2-10.2-19-21.3-26.4-33-9.5-14.9-29.3-19.3-44.2-9.8s-19.3 29.3-9.8 44.2C49.7 408.7 61.4 423.5 75 437 175 537 337 537 437 437S537 175 437 75C342.8-19.3 193.3-24.7 92.7 58.8L41 7C34.1 .2 23.8-1.9 14.8 1.8S0 14.3 0 24L0 168c0 13.3 10.7 24 24 24z"/>
        </svg>
        Volver a galerías
    </a>
</div>
        </article>
    `;

    // Configurar filtros de medios
    setupMediaFilters();
    // Configurar lightbox multimedia
    setupMultimediaLightbox(event.media, event.title);
}

// Renderizar ítem multimedia
function renderMediaItem(media, index, eventTitle) {
    switch (media.type) {
        case 'image':
            return `
                <div class="media-thumbnail">
                    <img src="${media.url}" alt="${media.caption || eventTitle + ' - Imagen ' + (index + 1)}" loading="lazy">
                    <div class="media-overlay">
                        <span class="media-type-icon">
                            <svg viewBox="0 0 24 24" width="32" height="32">
                                <path fill="currentColor" d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                                <circle fill="currentColor" cx="12" cy="12" r="3"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="media-caption">${media.caption || 'Imagen ' + (index + 1)}</div>
            `;
        case 'video':
            return `
                <div class="media-thumbnail">
                    <img src="${media.poster || 'assets/img/video-poster-default.jpg'}" alt="${media.caption || eventTitle + ' - Video ' + (index + 1)}">
                    <div class="media-overlay">
                        <span class="media-type-icon">
                            <svg viewBox="0 0 24 24" width="32" height="32">
                                <path fill="currentColor" d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="media-caption">${media.caption || 'Video ' + (index + 1)}</div>
            `;
        case 'audio':
            return `
                <div class="media-thumbnail audio-thumbnail">
                    <div class="audio-icon">
                        <svg viewBox="0 0 24 24" width="32" height="32">
                            <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                    </div>
                    <div class="media-overlay">
                        <span class="media-type-icon">
                            <svg viewBox="0 0 24 24" width="32" height="32">
                                <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="media-caption">${media.caption || 'Audio ' + (index + 1)}</div>
            `;
        default:
            return '';
    }
}

// Configurar filtros de medios
function setupMediaFilters() {
    const filterButtons = document.querySelectorAll('.media-filter');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir clase active al botón clickeado
            this.classList.add('active');

            // Obtener el filtro seleccionado
            const filter = this.getAttribute('data-filter');

            // Mostrar/ocultar medios según el filtro
            document.querySelectorAll('.media-item').forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}


// Configurar lightbox multimedia
function setupMultimediaLightbox(mediaItems, title) {
    // Crear lightbox si no existe
    if (!document.querySelector('.multimedia-lightbox')) {
        const lightboxHTML = `
            <div class="multimedia-lightbox">
                <div class="lightbox-container">
                    <span class="lightbox-close">&times;</span>
                    <div class="media-display"></div>
                    <div class="lightbox-info">
                        <h3 class="lightbox-title">${title}</h3>
                        <p class="lightbox-caption"></p>
                        <p class="lightbox-counter"></p>
                    </div>
                    <div class="lightbox-controls">
                        <button class="lightbox-prev">&lt;</button>
                        <button class="lightbox-next">&gt;</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    const lightbox = document.querySelector('.multimedia-lightbox');
    const mediaDisplay = lightbox.querySelector('.media-display');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    let currentMediaItems = [...mediaItems];

    // Abrir lightbox
    function openLightbox(index, filteredItems = mediaItems) {
        currentMediaItems = filteredItems;
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Actualizar lightbox
    function updateLightbox() {
        const media = currentMediaItems[currentIndex];

        lightboxTitle.textContent = title;
        lightboxCaption.textContent = media.caption || '';
        lightboxCounter.textContent = `${currentIndex + 1} de ${currentMediaItems.length}`;

        // Limpiar y crear nuevo contenido según el tipo de medio
        mediaDisplay.innerHTML = '';

        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.url;
            img.alt = media.caption || '';
            mediaDisplay.appendChild(img);
        }
        else if (media.type === 'video') {
            const video = document.createElement('video');
            video.controls = true;
            video.poster = media.poster || '';

            const source = document.createElement('source');
            source.src = media.url;
            source.type = 'video/mp4';

            video.appendChild(source);
            video.appendChild(document.createTextNode('Tu navegador no soporta el elemento de video.'));
            mediaDisplay.appendChild(video);

            // Reproducir automáticamente
            video.play().catch(e => console.log('Autoplay prevented:', e));
        }
        else if (media.type === 'audio') {
            const audioContainer = document.createElement('div');
            audioContainer.className = 'audio-container';

            const audio = document.createElement('audio');
            audio.controls = true;

            const source = document.createElement('source');
            source.src = media.url;
            source.type = 'audio/mpeg';

            audio.appendChild(source);
            audio.appendChild(document.createTextNode('Tu navegador no soporta el elemento de audio.'));
            audioContainer.appendChild(audio);

            // Visualizador de audio
            const visualizer = document.createElement('div');
            visualizer.className = 'audio-visualizer';
            audioContainer.appendChild(visualizer);

            mediaDisplay.appendChild(audioContainer);

            // Configurar animación del visualizador
            setupAudioVisualizer(audio, visualizer);
        }
    }

    // Configurar visualizador de audio
    function setupAudioVisualizer(audioElement, visualizer) {
        // Esta es una implementación simple sin Web Audio API
        // Para una implementación real necesitarías usar Web Audio API
        const bars = 20;
        let animationId;

        // Crear barras del visualizador
        for (let i = 0; i < bars; i++) {
            const bar = document.createElement('div');
            bar.className = 'audio-bar';
            visualizer.appendChild(bar);
        }

        // Animar las barras
        function animateBars() {
            const bars = visualizer.querySelectorAll('.audio-bar');
            bars.forEach(bar => {
                // Simular movimiento aleatorio (en una implementación real usarías los datos de audio)
                const height = Math.random() * 100;
                bar.style.height = `${height}%`;
                bar.style.opacity = `${0.1 + (height / 100) * 0.9}`;
            });

            animationId = requestAnimationFrame(animateBars);
        }

        // Controlar la animación según el estado del audio
        audioElement.addEventListener('play', () => {
            if (!animationId) {
                animateBars();
            }
        });

        audioElement.addEventListener('pause', () => {
            cancelAnimationFrame(animationId);
            animationId = null;
        });

        audioElement.addEventListener('ended', () => {
            cancelAnimationFrame(animationId);
            animationId = null;
        });
    }

    // Navegar entre medios
    function navigate(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + currentMediaItems.length) % currentMediaItems.length;
        } else {
            currentIndex = (currentIndex + 1) % currentMediaItems.length;
        }
        updateLightbox();
    }

    // Cerrar lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Detener cualquier reproducción de medios
        const mediaElements = mediaDisplay.querySelectorAll('video, audio');
        mediaElements.forEach(media => {
            media.pause();
            media.currentTime = 0;
        });
    }

    // Configurar eventos para los elementos multimedia
    document.querySelectorAll('.media-item').forEach((item, index) => {
        item.addEventListener('click', function () {
            const filter = document.querySelector('.media-filter.active').getAttribute('data-filter');
            const filteredItems = filter === 'all' ? [...mediaItems] : mediaItems.filter(m => m.type === filter);
            const itemIndex = filteredItems.findIndex(m =>
                m.type === this.getAttribute('data-type') &&
                m.url === (this.querySelector('img')?.src ||
                    this.querySelector('.audio-thumbnail') ? mediaItems[index].url : '')
            );

            if (itemIndex !== -1) {
                openLightbox(itemIndex, filteredItems);
            }
        });
    });

    // Configurar controles del lightbox
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigate('prev'));
    nextBtn.addEventListener('click', () => navigate('next'));

    // Cerrar al hacer clic fuera del contenido
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigate('prev');
                break;
            case 'ArrowRight':
                navigate('next');
                break;
            case ' ':
                // Pausar/reproducir con espacio
                const media = mediaDisplay.querySelector('video, audio');
                if (media) {
                    if (media.paused) media.play();
                    else media.pause();
                }
                break;
        }
    });
}

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', displayEventDetail);