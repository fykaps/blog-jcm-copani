/**
 * Sistema de Gestión de Reuniones - Versión Profesional
 * Separado completamente del sistema de eventos generales
 */

class MeetingSystem {
    constructor(meetingsData, options = {}) {
        this.meetings = meetingsData;
        this.options = {
            meetingsPerPage: 5,
            ...options
        };
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.currentPage = 1;
        this.totalPages = 1;
        this.activeMeetings = [];

        this.init();
    }

    init() {
        this.renderMeetingsList();
        this.renderMeetingFilters();
        this.renderMeetingStats();
        this.setupMeetingModal();
        this.setupCategoryFilters();
        this.setupPagination();
    }

    // ======================
    //  RENDERIZADO PRINCIPAL
    // ======================

    renderMeetingsList() {
        const meetingsList = document.getElementById('meetings-list');
        if (!meetingsList) return;

        // Filtrar reuniones
        let filteredMeetings = [...this.meetings];

        if (this.currentFilter !== 'all') {
            filteredMeetings = filteredMeetings.filter(meeting => meeting.status === this.currentFilter);
        }

        if (this.currentCategory !== 'all') {
            filteredMeetings = filteredMeetings.filter(meeting => meeting.category === this.currentCategory);
        }

        // Ordenar por fecha y hora (más recientes primero)
        filteredMeetings.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.startTime}`);
            const dateB = new Date(`${b.date}T${b.startTime}`);
            return dateB - dateA;
        });

        this.activeMeetings = filteredMeetings;
        this.totalPages = Math.ceil(filteredMeetings.length / this.options.meetingsPerPage);

        // Ajustar página actual si es necesario
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }

        // Mostrar mensaje si no hay reuniones
        if (filteredMeetings.length === 0) {
            meetingsList.innerHTML = this.renderNoMeetingsMessage();
            document.getElementById('meetings-pagination-wrapper').style.display = 'none';
            return;
        }

        // Mostrar paginación
        document.getElementById('meetings-pagination-wrapper').style.display = 'flex';

        // Obtener reuniones para la página actual
        const startIndex = (this.currentPage - 1) * this.options.meetingsPerPage;
        const endIndex = startIndex + this.options.meetingsPerPage;
        const paginatedMeetings = filteredMeetings.slice(startIndex, endIndex);

        // Renderizar reuniones
        meetingsList.innerHTML = paginatedMeetings.map(meeting => this.renderMeetingCard(meeting)).join('');

        // Renderizar paginación
        this.renderPagination();

        // Configurar event listeners para las tarjetas
        this.setupMeetingCardInteractions();
    }

    renderMeetingCard(meeting) {
        const meetingDate = new Date(`${meeting.date}T${meeting.startTime}`);
        const now = new Date();
        const isPast = meetingDate < now;

        return `
            <article class="meeting-card" data-id="${meeting.id}" data-category="${meeting.category}" data-status="${meeting.status}">
                <div class="meeting-header">
                    <div class="meeting-date-badge">
                        <span class="meeting-day">${this.formatDay(meeting.date)}</span>
                        <span class="meeting-month">${this.formatMonth(meeting.date)}</span>
                    </div>
                    <div class="meeting-status ${meeting.status}">
                        ${this.getStatusLabel(meeting.status)}
                    </div>
                </div>
                
                <div class="meeting-content">
                    <h3 class="meeting-title">${meeting.title}</h3>
                    
                    <div class="meeting-meta">
                        <span class="meeting-time">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                            ${meeting.startTime} - ${meeting.endTime}
                        </span>
                        
                        <span class="meeting-category ${meeting.category.toLowerCase().replace(/\s+/g, '-')}">
                            ${meeting.category}
                        </span>
                    </div>
                    
                    <p class="meeting-description">${meeting.description}</p>
                    
                    <div class="meeting-details">
                        <div class="meeting-detail">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span>${meeting.location}</span>
                        </div>
                        
                        <div class="meeting-detail">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            <span>${meeting.participants.join(', ')}</span>
                        </div>
                    </div>
                    
                    ${meeting.agenda && meeting.agenda.length > 0 ? `
                        <div class="meeting-agenda-preview">
                            <strong>Temas:</strong> ${meeting.agenda.slice(0, 2).join(', ')}${meeting.agenda.length > 2 ? '...' : ''}
                        </div>
                    ` : ''}
                    
                    <div class="meeting-actions">
                        <button class="btn btn-outline meeting-details-btn" data-meeting-id="${meeting.id}">
                            Ver detalles
                        </button>
                        
                        ${meeting.status === 'scheduled' ? `
                            <button class="btn btn-primary meeting-register-btn" data-meeting-id="${meeting.id}">
                                Confirmar asistencia
                            </button>
                        ` : ''}
                    </div>
                </div>
                
                ${meeting.required ? `
                    <div class="meeting-required-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Asistencia requerida
                    </div>
                ` : ''}
            </article>
        `;
    }

    renderNoMeetingsMessage() {
        let message = '';

        if (this.currentFilter !== 'all') {
            message = `
                <div class="no-meetings">
                    <svg width="64" height="64" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <h3>No hay reuniones ${this.getStatusLabel(this.currentFilter, true).toLowerCase()}</h3>
                    <p>No se encontraron reuniones con el estado seleccionado.</p>
                    <button class="btn btn-primary reset-filters-btn">Mostrar todas las reuniones</button>
                </div>
            `;
        } else if (this.currentCategory !== 'all') {
            const categoryName = this.getCategoryName(this.currentCategory);
            message = `
                <div class="no-meetings">
                    <svg width="64" height="64" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <h3>No hay reuniones de ${categoryName.toLowerCase()}</h3>
                    <p>No se encontraron reuniones para la categoría seleccionada.</p>
                    <button class="btn btn-primary reset-filters-btn">Mostrar todas las reuniones</button>
                </div>
            `;
        } else {
            message = `
                <div class="no-meetings">
                    <svg width="64" height="64" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <h3>No hay reuniones programadas</h3>
                    <p>Actualmente no hay reuniones planificadas. Vuelve a revisar más tarde.</p>
                </div>
            `;
        }

        return message;
    }

    // ======================
    //  FILTROS Y CATEGORÍAS
    // ======================

    renderMeetingFilters() {
        const filtersContainer = document.getElementById('meetings-filters');
        if (!filtersContainer) return;

        const statusFilters = [
            { value: 'all', label: 'Todas', count: this.meetings.length },
            { value: 'scheduled', label: 'Programadas', count: this.meetings.filter(m => m.status === 'scheduled').length },
            { value: 'completed', label: 'Realizadas', count: this.meetings.filter(m => m.status === 'completed').length },
            { value: 'cancelled', label: 'Canceladas', count: this.meetings.filter(m => m.status === 'cancelled').length }
        ];

        filtersContainer.innerHTML = `
            <div class="filters-header">
                <h3>Filtrar por estado</h3>
            </div>
            <div class="filters-grid">
                ${statusFilters.map(filter => `
                    <button class="filter-btn ${this.currentFilter === filter.value ? 'active' : ''}" 
                            data-filter="${filter.value}">
                        <span class="filter-label">${filter.label}</span>
                        <span class="filter-count">${filter.count}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Configurar event listeners
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.currentFilter = filter;
                this.currentPage = 1;

                // Actualizar UI
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.renderMeetingsList();
            });
        });
    }

    setupCategoryFilters() {
        const categoriesContainer = document.getElementById('meetings-categories');
        if (!categoriesContainer) return;

        // Obtener categorías únicas
        const categories = [...new Set(this.meetings.map(m => m.category))];

        categoriesContainer.innerHTML = `
            <h3>Filtrar por categoría</h3>
            <div class="categories-list">
                <button class="category-btn ${this.currentCategory === 'all' ? 'active' : ''}" 
                        data-category="all">
                    Todas las categorías
                </button>
                ${categories.map(category => `
                    <button class="category-btn ${this.currentCategory === category ? 'active' : ''}" 
                            data-category="${category}">
                        ${category}
                    </button>
                `).join('')}
            </div>
        `;

        // Configurar event listeners
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.currentCategory = category;
                this.currentPage = 1;

                // Actualizar UI
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.renderMeetingsList();
            });
        });
    }

    // ======================
    //  ESTADÍSTICAS
    // ======================

    renderMeetingStats() {
        const statsContainer = document.getElementById('meetings-stats');
        if (!statsContainer) return;

        const totalMeetings = this.meetings.length;
        const scheduled = this.meetings.filter(m => m.status === 'scheduled').length;
        const completed = this.meetings.filter(m => m.status === 'completed').length;
        const cancelled = this.meetings.filter(m => m.status === 'cancelled').length;

        statsContainer.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${totalMeetings}</div>
                    <div class="stat-label">Total reuniones</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${scheduled}</div>
                    <div class="stat-label">Programadas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${completed}</div>
                    <div class="stat-label">Realizadas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${cancelled}</div>
                    <div class="stat-label">Canceladas</div>
                </div>
            </div>
        `;
    }

    // ======================
    //  MODAL DE REUNIONES
    // ======================

    setupMeetingModal() {
        const modalHTML = `
            <div class="meeting-modal" id="meeting-modal">
                <div class="meeting-modal-content">
                    <div class="meeting-modal-header">
                        <h3>Detalles de la Reunión</h3>
                        <button class="meeting-modal-close" aria-label="Cerrar modal">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="meeting-modal-body" id="meeting-modal-body"></div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('meeting-modal');

        document.querySelector('.meeting-modal-close').addEventListener('click', () => this.closeMeetingModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeMeetingModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeMeetingModal();
            }
        });
    }

    showMeetingModal(meetingId) {
        const meeting = this.meetings.find(m => m.id == meetingId);
        if (!meeting) return;

        const modalBody = document.getElementById('meeting-modal-body');
        modalBody.innerHTML = this.renderMeetingModalContent(meeting);

        // Configurar acciones de los botones
        document.querySelector('[data-action="register"]')?.addEventListener('click', () => {
            this.handleRegistration(meetingId);
        });

        document.querySelector('[data-action="download"]')?.addEventListener('click', () => {
            this.handleMaterialDownload(meetingId);
        });

        // Mostrar el modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    renderMeetingModalContent(meeting) {
        const meetingDate = new Date(`${meeting.date}T${meeting.startTime}`);
        const formattedDate = meetingDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        return `
            <div class="meeting-modal-main">
                <div class="meeting-modal-header-info">
                    <div class="meeting-modal-status ${meeting.status}">
                        ${this.getStatusLabel(meeting.status)}
                    </div>
                    <div class="meeting-modal-category ${meeting.category.toLowerCase().replace(/\s+/g, '-')}">
                        ${meeting.category}
                    </div>
                </div>

                <h1 class="meeting-modal-title">${meeting.title}</h1>

                <div class="meeting-modal-meta">
                    <div class="meta-item">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <span>${formattedDate}</span>
                    </div>

                    <div class="meta-item">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        <span>${meeting.startTime} - ${meeting.endTime}</span>
                    </div>

                    <div class="meta-item">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>${meeting.location}</span>
                    </div>

                    <div class="meta-item">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        <span>Organizado por: ${meeting.organizer}</span>
                    </div>
                </div>

                <div class="meeting-modal-section">
                    <h3>Descripción</h3>
                    <p>${meeting.description}</p>
                </div>

                ${meeting.agenda && meeting.agenda.length > 0 ? `
                    <div class="meeting-modal-section">
                        <h3>Agenda</h3>
                        <ol class="agenda-list">
                            ${meeting.agenda.map(item => `
                                <li>${item}</li>
                            `).join('')}
                        </ol>
                    </div>
                ` : ''}

                <div class="meeting-modal-section">
                    <h3>Participantes</h3>
                    <div class="participants-list">
                        ${meeting.participants.map(participant => `
                            <span class="participant-tag">${participant}</span>
                        `).join('')}
                    </div>
                </div>

                ${meeting.materials && meeting.materials.length > 0 ? `
                    <div class="meeting-modal-section">
                        <h3>Materiales</h3>
                        <div class="materials-list">
                            ${meeting.materials.map(material => `
                                <div class="material-item">
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                                    </svg>
                                    <span>${material}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${meeting.status === 'completed' && meeting.minutes ? `
                    <div class="meeting-modal-section">
                        <h3>Minuta de la reunión</h3>
                        <a href="${meeting.minutes}" target="_blank" class="minutes-link">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                            </svg>
                            Ver minuta completa
                        </a>
                    </div>
                ` : ''}
            </div>

            <div class="meeting-modal-actions">
                ${meeting.status === 'scheduled' ? `
                    <button class="btn btn-primary" data-action="register">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm9 14H5v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/>
                        </svg>
                        Confirmar asistencia
                    </button>
                ` : ''}

                ${meeting.materials && meeting.materials.length > 0 ? `
                    <button class="btn btn-outline" data-action="download">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        Descargar materiales
                    </button>
                ` : ''}

                ${meeting.recording ? `
                    <button class="btn btn-outline" data-action="recording">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        Ver grabación
                    </button>
                ` : ''}
            </div>
        `;
    }

    closeMeetingModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            document.getElementById('meeting-modal-body').innerHTML = '';
        }, 300);
    }

    // ======================
    //  MANEJADORES DE EVENTOS
    // ======================

    setupMeetingCardInteractions() {
        document.addEventListener('click', (e) => {
            const detailsBtn = e.target.closest('.meeting-details-btn');
            const registerBtn = e.target.closest('.meeting-register-btn');
            const meetingCard = e.target.closest('.meeting-card');
            const resetBtn = e.target.closest('.reset-filters-btn');

            if (detailsBtn) {
                e.preventDefault();
                const meetingId = detailsBtn.getAttribute('data-meeting-id');
                this.showMeetingModal(meetingId);
            } else if (registerBtn) {
                e.preventDefault();
                const meetingId = registerBtn.getAttribute('data-meeting-id');
                this.handleRegistration(meetingId);
            } else if (meetingCard && !detailsBtn && !registerBtn) {
                const meetingId = meetingCard.getAttribute('data-id');
                this.showMeetingModal(meetingId);
            } else if (resetBtn) {
                e.preventDefault();
                this.resetFilters();
            }
        });
    }

    handleRegistration(meetingId) {
        // Simular registro (en una implementación real, esto conectaría con un backend)
        const meeting = this.meetings.find(m => m.id == meetingId);
        if (!meeting) return;

        alert(`¡Gracias por confirmar su asistencia a: ${meeting.title}\n\nFecha: ${meeting.date}\nHora: ${meeting.startTime}\nLugar: ${meeting.location}`);
    }

    handleMaterialDownload(meetingId) {
        // Simular descarga de materiales
        alert('Los materiales de la reunión se están preparando para su descarga.');
    }

    // ======================
    //  PAGINACIÓN
    // ======================

    setupPagination() {
        this.renderPagination();
    }

    renderPagination() {
        const paginationContainer = document.getElementById('meetings-pagination');
        if (!paginationContainer || this.totalPages <= 1) {
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        let html = `
            <button class="pagination-button ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="meetingSystem.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
                &lt;
            </button>
        `;

        // Mostrar siempre la primera página
        html += `
            <button class="pagination-button ${this.currentPage === 1 ? 'active' : ''}" 
                    onclick="meetingSystem.changePage(1)">
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
                            onclick="meetingSystem.changePage(${i})">
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
                        onclick="meetingSystem.changePage(${this.totalPages})">
                    ${this.totalPages}
                </button>
            `;
        }

        html += `
            <button class="pagination-button ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                    onclick="meetingSystem.changePage(${this.currentPage + 1})" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                &gt;
            </button>
        `;

        paginationContainer.innerHTML = html;
    }

    changePage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.renderMeetingsList();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ======================
    //  FUNCIONES UTILITARIAS
    // ======================

    resetFilters() {
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.currentPage = 1;

        // Actualizar UI
        document.querySelectorAll('.filter-btn, .category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        document.querySelector('.category-btn[data-category="all"]').classList.add('active');

        this.renderMeetingsList();
    }

    getStatusLabel(status, lowercase = false) {
        const labels = {
            'scheduled': 'Programada',
            'completed': 'Realizada',
            'cancelled': 'Cancelada'
        };

        let label = labels[status] || status;
        if (lowercase) {
            label = label.toLowerCase();
        }

        return label;
    }

    getCategoryName(category) {
        const names = {
            'Padres de familia': 'Padres de familia',
            'Consejo escolar': 'Consejo escolar',
            'Docentes': 'Docentes',
            'Formativo': 'Formativo'
        };

        return names[category] || category;
    }

    formatDay(dateStr) {
        const date = new Date(dateStr);
        return date.getDate();
    }

    formatMonth(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
    }

    destroy() {
        if (this.modal) {
            document.body.removeChild(this.modal);
        }
    }
}

// Inicialización del sistema de reuniones
let meetingSystem;

document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof meetingsData !== 'undefined') {
            meetingSystem = new MeetingSystem(meetingsData);
            window.meetingSystem = meetingSystem;
        } else {
            console.error('Error: meetingsData no está definido');
            this.showDataError();
        }
    } catch (error) {
        console.error('Error al inicializar MeetingSystem:', error);
        this.showDataError();
    }
});

// Función para mostrar error de datos
function showDataError() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'data-error';
    errorDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c" width="48" height="48">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h3>Error al cargar las reuniones</h3>
        <p>Los datos de reuniones no están disponibles</p>
    `;
    document.getElementById('meetings-list')?.appendChild(errorDiv);
}