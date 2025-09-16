/**
 * DETALLE DE EVENTO - VERSIÓN PROFESIONAL CORREGIDA
 * 
 * Características:
 * - Galería multimedia con filtros
 * - Lightbox avanzado que funciona con imágenes y videos
 * - Visualizador de audio
 * - Navegación por teclado
 * - Sistema de breadcrumbs
 * - Totalmente responsivo
 * CORREGIDO: Problema de zona horaria en fechas
 */

// ======================
//  UTILIDADES DE FECHA (CORREGIDAS) - AÑADIDAS
// ======================

/**
 * Parsear fecha local sin problemas de zona horaria
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {Date} - Objeto Date correctamente ajustado
 */
function parseLocalDate(dateStr) {
    if (!dateStr) return new Date();

    const parts = dateStr.split('-');
    if (parts.length !== 3) return new Date(dateStr);

    // Crear fecha en zona horaria local (sin ajuste UTC)
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

/**
 * Formatear fecha local para mostrar
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {string} - Fecha formateada
 */
function formatLocalDate(dateStr) {
    const date = parseLocalDate(dateStr);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

class EventDetailManager {
    constructor() {
        this.currentEvent = null;
        this.currentMediaFilter = 'all';
        this.lightboxOpen = false;
        this.currentLightboxIndex = 0;
        this.currentFilteredItems = [];
        this.audioContext = null;
        this.analyser = null;
        this.visualizerAnimationId = null;
    }

    init() {
        this.displayEventDetail();
        this.setupBackButton();
    }

    displayEventDetail() {
        const container = document.getElementById('event-detail');
        if (!container) return;

        // Obtener ID del evento de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = parseInt(urlParams.get('id'));

        // Buscar evento
        this.currentEvent = galleryData.find(item => item.id === eventId);

        if (!this.currentEvent) {
            container.innerHTML = this.createErrorMessage();
            return;
        }

        // Mostrar evento
        container.innerHTML = this.createEventDetailHTML();

        // Configurar componentes
        this.setupMediaFilters();
        this.setupMultimediaLightbox();

        // Precargar imágenes para mejor performance
        this.preloadMedia();
    }

    createEventDetailHTML() {
        const event = this.currentEvent;

        return `
            <article class="event-detail animate-fade-in">
                    <!-- Hero para Detalle de Galería -->
        <section class="detail-hero detail-hero-gallery animate-fade-in">
            <div class="detail-hero-decoration detail-hero-decoration-line"></div>
            <div class="detail-hero-decoration detail-hero-decoration-line"></div>

            <div class="detail-hero-image" aria-hidden="true">
                <img src=${event.coverImage} alt="" loading="eager" decoding="async">
            </div>

            <div class="detail-hero-content">
                <nav class="detail-breadcrumb animate-fade-in" aria-label="Miga de pan">
                    <ol class="detail-breadcrumb-list">
                        <li class="detail-breadcrumb-item">
                            <a href="index.html" class="detail-breadcrumb-link">Inicio</a>
                        </li>
                        <li class="detail-breadcrumb-item">
                            <a href="gallery.html" class="detail-breadcrumb-link">Galerías</a>
                        </li>
                        <li class="detail-breadcrumb-item">
                            <span class="detail-breadcrumb-current">Detalle</span>
                        </li>
                    </ol>
                </nav>

                <div class="detail-hero-badges animate-fade-in">
                    <span class="detail-hero-badge">Galería Multimedia</span>
                    <!-- <span class="detail-hero-badge">Evento Escolar</span> -->
                </div>

                <h1 class="animate-slide-up" id="gallery-title">${event.title}</h1>

                <p class="detail-hero-description animate-slide-up delay-1" id="gallery-description">
                    ${event.description}
                </p>

                <div class="detail-hero-meta animate-fade-in delay-2">
                    <div class="detail-meta-item">
                        <svg class="detail-meta-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor"
                                d="M20 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                        </svg>
                        <span id="gallery-date">${this.formatDate(event.date)}</span>
                    </div>
                   <!-- <div class="detail-meta-item">
                        <svg class="detail-meta-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor"
                                d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                        <span id="gallery-count">Cargando...</span>
                    </div> -->
                    <div class="detail-meta-item">
                        <svg class="detail-meta-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor"
                                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span id="gallery-category">${event.category}</span>
                    </div>
                </div>
            </div>
        </section>
                
                <section class="event-gallery">
                    <div class="media-filters">
                        <button class="media-filter active" data-filter="all">Todos</button>
                        <button class="media-filter" data-filter="image">Imágenes (${this.countMediaByType('image')})</button>
                        <button class="media-filter" data-filter="video">Videos (${this.countMediaByType('video')})</button>
                        <button class="media-filter" data-filter="audio">Audios (${this.countMediaByType('audio')})</button>
                    </div>
                    
                    <div class="media-grid">
                        ${event.media.map((media, index) => `
                            <div class="media-item ${media.type}" data-index="${index}" data-type="${media.type}">
                                ${this.renderMediaItem(media, index)}
                            </div>
                        `).join('')}
                    </div>
                </section>
                
            </article>
        `;
    }

    createErrorMessage() {
        return `
            <div class="error-message">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <h2>Evento no encontrado</h2>
                <p>El evento solicitado no existe o ha sido eliminado.</p>
                <a href="gallery.html" class="back-btn">Volver a galerías</a>
            </div>
        `;
    }

    countMediaByType(type) {
        return this.currentEvent.media.filter(m => m.type === type).length;
    }

    renderMediaItem(media, index) {
        const eventTitle = this.currentEvent.title;

        switch (media.type) {
            case 'image':
                return `
                    <div class="media-thumbnail">
                        <img src="${media.url}" 
                             alt="${media.caption || `${eventTitle} - Imagen ${index + 1}`}" 
                             loading="lazy"
                             data-index="${index}">
                        <div class="media-overlay">
                            <span class="media-type-icon">
                                <svg viewBox="0 0 24 24" width="32" height="32">
                                    <path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="media-caption">${media.caption || `Imagen ${index + 1}`}</div>
                `;
            case 'video':
                return `
                    <div class="media-thumbnail">
                        <img src="${media.poster || 'assets/img/video-poster-default.jpg'}" 
                             alt="${media.caption || `${eventTitle} - Video ${index + 1}`}"
                             loading="lazy"
                             data-index="${index}">
                        <div class="media-overlay">
                            <span class="media-type-icon">
                                <svg viewBox="0 0 24 24" width="32" height="32">
                                    <path fill="currentColor" d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="media-caption">${media.caption || `Video ${index + 1}`}</div>
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
                    <div class="media-caption">${media.caption || `Audio ${index + 1}`}</div>
                `;
            default:
                return '';
        }
    }

    setupMediaFilters() {
        const filterButtons = document.querySelectorAll('.media-filter');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Añadir clase active al botón clickeado
                button.classList.add('active');

                // Obtener el filtro seleccionado
                this.currentMediaFilter = button.getAttribute('data-filter');

                // Mostrar/ocultar medios según el filtro
                document.querySelectorAll('.media-item').forEach(item => {
                    if (this.currentMediaFilter === 'all' || item.classList.contains(this.currentMediaFilter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    setupMultimediaLightbox() {
        // Crear lightbox si no existe
        if (!document.querySelector('.multimedia-lightbox')) {
            const lightboxHTML = `
                <div class="multimedia-lightbox">
                    <div class="lightbox-container">
                        <!-- Sección superior: Multimedia -->
                        <div class="media-display-section">
                            <div class="media-display-container">
                                <div class="media-display"></div>
                            </div>
                            <!-- Controles flotantes -->
                            <div class="media-controls">
                                <button class="control-btn lightbox-close" aria-label="Cerrar">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    </svg>
                                </button>
                            </div>
                            <!-- Controles de navegación -->
                            <div class="media-nav-controls">
                                <button class="control-btn lightbox-prev" aria-label="Anterior">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                                    </svg>
                                </button>
                                <button class="control-btn lightbox-next" aria-label="Siguiente">
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <!-- Sección inferior: Información -->
                        <div class="media-info-section">
                            <div class="media-info-content">
                                <h3 class="media-title"></h3>
                                <p class="media-description"></p>
                                <p class="media-counter"></p>
                            </div>
                        </div>
                    </div>    
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        }

        const lightbox = document.querySelector('.multimedia-lightbox');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        // Configurar eventos para los elementos multimedia
        document.querySelectorAll('.media-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const mediaType = item.getAttribute('data-type');
                const index = parseInt(item.getAttribute('data-index'));

                // Obtener los elementos filtrados
                const filteredItems = this.getFilteredMediaItems();

                // Encontrar el índice en la lista filtrada
                let filteredIndex = 0;
                if (this.currentMediaFilter === 'all') {
                    filteredIndex = index;
                } else {
                    // Buscar el elemento actual en la lista filtrada
                    const currentMedia = this.currentEvent.media[index];
                    filteredIndex = filteredItems.findIndex(m =>
                        m.url === currentMedia.url && m.type === currentMedia.type
                    );
                }

                if (filteredIndex !== -1) {
                    this.openLightbox(filteredIndex, filteredItems);
                }
            });
        });

        // Configurar eventos para las imágenes dentro de los media-items
        document.querySelectorAll('.media-thumbnail img').forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                const mediaItem = img.closest('.media-item');
                if (mediaItem) mediaItem.click();
            });
        });

        // Configurar controles del lightbox
        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.navigateLightbox('prev'));
        nextBtn.addEventListener('click', () => this.navigateLightbox('next'));

        // Cerrar al hacer clic fuera del contenido
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (!this.lightboxOpen) return;

            switch (e.key) {
                case 'Escape': this.closeLightbox(); break;
                case 'ArrowLeft': this.navigateLightbox('prev'); break;
                case 'ArrowRight': this.navigateLightbox('next'); break;
                case ' ':
                    const media = document.querySelector('.media-display video, .media-display audio');
                    if (media) media.paused ? media.play() : media.pause();
                    break;
            }
        });
    }

    getFilteredMediaItems() {
        if (this.currentMediaFilter === 'all') {
            return [...this.currentEvent.media];
        } else {
            return this.currentEvent.media.filter(m => m.type === this.currentMediaFilter);
        }
    }

    openLightbox(index, filteredItems = this.getFilteredMediaItems()) {
        this.lightboxOpen = true;
        this.currentLightboxIndex = index;
        this.currentFilteredItems = filteredItems;

        const lightbox = document.querySelector('.multimedia-lightbox');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        this.updateLightbox();
    }

    updateLightbox() {
        const media = this.currentFilteredItems[this.currentLightboxIndex];
        const lightbox = document.querySelector('.multimedia-lightbox');
        const mediaDisplay = lightbox.querySelector('.media-display');
        const mediaTitle = lightbox.querySelector('.media-title');
        const mediaDescription = lightbox.querySelector('.media-description');
        const mediaCounter = lightbox.querySelector('.media-counter');

        // Mostrar indicador de carga
        mediaDisplay.innerHTML = '<div class="media-loading"></div>';

        // Actualizar información
        mediaTitle.textContent = this.currentEvent.title;
        mediaDescription.textContent = media.caption || '';
        mediaCounter.textContent = `${this.currentLightboxIndex + 1} de ${this.currentFilteredItems.length}`;

        // Crear el medio después de un breve delay para permitir que se muestre el loader
        setTimeout(() => {
            mediaDisplay.innerHTML = '';

            if (media.type === 'image') {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-container';

                const img = document.createElement('img');
                img.src = media.url;
                img.alt = media.caption || this.currentEvent.title;
                img.loading = 'eager';
                img.onload = () => {
                    // Asegurar proporciones correctas
                    this.adjustMediaSize(imgContainer, img);
                };

                imgContainer.appendChild(img);
                mediaDisplay.appendChild(imgContainer);
            }
            else if (media.type === 'video') {
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';

                const video = document.createElement('video');
                video.controls = true;
                video.poster = media.poster || '';
                video.playsInline = true;
                video.className = 'responsive-video';
                video.onloadedmetadata = () => {
                    // Asegurar proporciones correctas
                    this.adjustMediaSize(videoContainer, video);
                };

                const source = document.createElement('source');
                source.src = media.url;
                source.type = 'video/mp4';

                video.appendChild(source);
                video.appendChild(document.createTextNode('Tu navegador no soporta el elemento de video.'));
                videoContainer.appendChild(video);
                mediaDisplay.appendChild(videoContainer);

                // Manejo de autoplay con fallback
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        const playButton = this.createPlayButton(video);
                        videoContainer.appendChild(playButton);
                    });
                }
            }
            else if (media.type === 'audio') {
                const audioContainer = document.createElement('div');
                audioContainer.className = 'audio-container';

                // Imagen de fondo para audio
                const audioImage = document.createElement('div');
                audioImage.className = 'audio-image';
                audioImage.innerHTML = `
                <svg viewBox="0 0 24 24" width="80" height="80">
                    <path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
            `;
                audioContainer.appendChild(audioImage);

                // Controles de audio
                const audioControls = document.createElement('div');
                audioControls.className = 'audio-controls';

                const audio = document.createElement('audio');
                audio.controls = true;
                audio.className = 'responsive-audio';

                const source = document.createElement('source');
                source.src = media.url;
                source.type = 'audio/mpeg';

                audio.appendChild(source);
                audio.appendChild(document.createTextNode('Tu navegador no soporta el elemento de audio.'));
                audioControls.appendChild(audio);
                audioContainer.appendChild(audioControls);

                // Visualizador de audio
                const visualizer = document.createElement('div');
                visualizer.className = 'audio-visualizer';
                audioContainer.appendChild(visualizer);

                mediaDisplay.appendChild(audioContainer);
                this.setupAudioVisualizer(audio, visualizer);
            }
        }, 100);
    }

    // Nueva función para ajustar el tamaño de medios
    adjustMediaSize(container, mediaElement) {
        // Asegurar que todos los medios mantengan proporciones adecuadas
        const displayHeight = document.querySelector('.media-display').clientHeight;
        const displayWidth = document.querySelector('.media-display').clientWidth;

        if (mediaElement.tagName === 'IMG' || mediaElement.tagName === 'VIDEO') {
            const ratio = mediaElement.videoWidth ?
                mediaElement.videoHeight / mediaElement.videoWidth :
                mediaElement.naturalHeight / mediaElement.naturalWidth;

            if (ratio > 0.8) { // Imagen/vertical
                mediaElement.style.maxHeight = '90%';
                mediaElement.style.width = 'auto';
            } else { // Imagen horizontal
                mediaElement.style.maxWidth = '90%';
                mediaElement.style.height = 'auto';
            }
        }
    }

    createPlayButton(videoElement) {
        const playButton = document.createElement('button');
        playButton.className = 'video-play-button';
        playButton.innerHTML = `
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M8 5v14l11-7z"/>
            </svg>
        `;
        playButton.addEventListener('click', () => {
            videoElement.play();
            playButton.remove();
        });
        return playButton;
    }

    setupAudioVisualizer(audioElement, visualizer) {
        // Limpiar animación previa si existe
        if (this.visualizerAnimationId) {
            cancelAnimationFrame(this.visualizerAnimationId);
            this.visualizerAnimationId = null;
        }

        // Limpiar AudioContext previo si existe
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.analyser = null;
        }

        // Crear barras del visualizador
        visualizer.innerHTML = '';
        const bars = 20;
        for (let i = 0; i < bars; i++) {
            const bar = document.createElement('div');
            bar.className = 'audio-bar';
            visualizer.appendChild(bar);
        }

        // Configurar AudioContext para visualización real
        if (window.AudioContext || window.webkitAudioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.analyser = this.audioContext.createAnalyser();
                const source = this.audioContext.createMediaElementSource(audioElement);

                source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
                this.analyser.fftSize = 64;

                const bufferLength = this.analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const updateVisualizer = () => {
                    if (!this.lightboxOpen || audioElement.paused) {
                        this.visualizerAnimationId = null;
                        return;
                    }

                    this.analyser.getByteFrequencyData(dataArray);
                    const bars = visualizer.querySelectorAll('.audio-bar');

                    for (let i = 0; i < bars.length; i++) {
                        const value = dataArray[i % bufferLength] / 255;
                        const height = value * 100;
                        bars[i].style.height = `${height}%`;
                        bars[i].style.opacity = `${0.1 + value * 0.9}`;
                    }

                    this.visualizerAnimationId = requestAnimationFrame(updateVisualizer);
                };

                audioElement.addEventListener('play', () => {
                    if (this.audioContext.state === 'suspended') {
                        this.audioContext.resume();
                    }
                    updateVisualizer();
                });

                audioElement.addEventListener('pause', () => {
                    if (this.visualizerAnimationId) {
                        cancelAnimationFrame(this.visualizerAnimationId);
                        this.visualizerAnimationId = null;
                    }
                });

                audioElement.addEventListener('ended', () => {
                    if (this.visualizerAnimationId) {
                        cancelAnimationFrame(this.visualizerAnimationId);
                        this.visualizerAnimationId = null;
                    }
                });
            } catch (error) {
                console.error('Error setting up audio visualizer:', error);
                // Fallback para navegadores sin AudioContext
                this.setupFallbackVisualizer(audioElement, visualizer);
            }
        } else {
            // Fallback para navegadores sin AudioContext
            this.setupFallbackVisualizer(audioElement, visualizer);
        }
    }

    setupFallbackVisualizer(audioElement, visualizer) {
        const bars = visualizer.querySelectorAll('.audio-bar');

        // Limpiar animación previa si existe
        if (this.visualizerAnimationId) {
            cancelAnimationFrame(this.visualizerAnimationId);
            this.visualizerAnimationId = null;
        }

        const animateBars = () => {
            bars.forEach(bar => {
                const height = Math.random() * 100;
                bar.style.height = `${height}%`;
                bar.style.opacity = `${0.1 + (height / 100) * 0.9}`;
            });

            this.visualizerAnimationId = requestAnimationFrame(animateBars);
        };

        audioElement.addEventListener('play', () => {
            if (!this.visualizerAnimationId) {
                animateBars();
            }
        });

        audioElement.addEventListener('pause', () => {
            if (this.visualizerAnimationId) {
                cancelAnimationFrame(this.visualizerAnimationId);
                this.visualizerAnimationId = null;
            }
        });

        audioElement.addEventListener('ended', () => {
            if (this.visualizerAnimationId) {
                cancelAnimationFrame(this.visualizerAnimationId);
                this.visualizerAnimationId = null;
            }
        });
    }

    navigateLightbox(direction) {
        if (direction === 'prev') {
            this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.currentFilteredItems.length) % this.currentFilteredItems.length;
        } else {
            this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.currentFilteredItems.length;
        }
        this.updateLightbox();
    }

    closeLightbox() {
        this.lightboxOpen = false;
        const lightbox = document.querySelector('.multimedia-lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Detener cualquier reproducción de medios
        const mediaElements = lightbox.querySelectorAll('video, audio');
        mediaElements.forEach(media => {
            media.pause();
            media.currentTime = 0;
        });

        // Limpiar recursos de audio
        if (this.visualizerAnimationId) {
            cancelAnimationFrame(this.visualizerAnimationId);
            this.visualizerAnimationId = null;
        }

        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.analyser = null;
        }
    }

    setupBackButton() {
        document.querySelector('.back-btn')?.addEventListener('click', (e) => {
            if (document.referrer.includes('gallery.html')) {
                e.preventDefault();
                history.back();
            }
        });
    }

    preloadMedia() {
        // Precargar imágenes para mejor experiencia de usuario
        this.currentEvent.media.forEach(media => {
            if (media.type === 'image') {
                const img = new Image();
                img.src = media.url;
            }
        });
    }

    formatDate(dateString) {
        // Usar la función corregida formatLocalDate
        return formatLocalDate(dateString);
    }
}

// Instanciar y exportar el manager
const eventDetailManager = new EventDetailManager();

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => eventDetailManager.init());

// Hacer accesible globalmente
window.eventDetailManager = eventDetailManager;