/**
 * Sistema de Gestión de Reuniones - Versión Profesional Mejorada
 * Con contador regresivo como en eventos y corrección de etiquetas
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
        this.updateInterval = null;

        this.init();
    }

    init() {
        this.renderMeetingsList();
        this.renderMeetingFilters();
        this.renderUpcomingMeetings();
        this.renderImportantMeetings();
        this.setupMeetingModal();
        this.setupCategoryFilters();
        this.setupPagination();
        this.startCounters();

        this.updateMeetingStats(); // ← Añadir esta línea
    }

    // ======================
    //  ESTADÍSTICAS PARA HERO
    // ======================

    calculateMeetingStats() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Reuniones de este mes
        const thisMonthMeetings = this.meetings.filter(meeting => {
            const meetingDate = new Date(meeting.date);
            return meetingDate.getMonth() === currentMonth &&
                meetingDate.getFullYear() === currentYear;
        });

        // Reuniones programadas (próximas)
        const upcomingMeetings = this.meetings.filter(meeting => {
            const meetingDate = new Date(`${meeting.date}T${meeting.startTime}`);
            return meeting.status === 'scheduled' && meetingDate >= now;
        });

        // Reuniones de hoy
        const todayMeetings = this.meetings.filter(meeting => {
            const meetingDate = new Date(meeting.date);
            const today = new Date();
            return meetingDate.toDateString() === today.toDateString() &&
                meeting.status === 'scheduled';
        });

        // Calcular porcentaje de asistencia (promedio de todas las reuniones completadas)
        const completedMeetings = this.meetings.filter(meeting =>
            meeting.status === 'completed' && meeting.attendance
        );

        let averageAttendance = 95; // Valor por defecto
        if (completedMeetings.length > 0) {
            const totalAttendance = completedMeetings.reduce((sum, meeting) =>
                sum + meeting.attendance, 0
            );
            averageAttendance = Math.round(totalAttendance / completedMeetings.length);
        }

        return {
            thisMonth: thisMonthMeetings.length,
            upcoming: upcomingMeetings.length,
            today: todayMeetings.length,
            attendance: averageAttendance
        };
    }

    updateMeetingStats() {
        const stats = this.calculateMeetingStats();

        // Actualizar elementos del DOM
        this.updateStatElement('meetings-this-month', stats.thisMonth);
        this.updateStatElement('meetings-upcoming', stats.upcoming);
        this.updateStatElement('meetings-today', stats.today);
        this.updateStatElement('meetings-attendance', stats.attendance);

        // Iniciar animación
        this.animateMeetingStats();
    }

    updateStatElement(statId, value) {
        const element = document.querySelector(`[data-stat="${statId}"]`);
        if (element) {
            element.setAttribute('data-count', value);
            element.textContent = '0'; // Reset para animación
        }
    }

    animateMeetingStats() {
        const statElements = document.querySelectorAll('.meeting-stat-number');

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

    renderMeetingsList() {
        const meetingsList = document.getElementById('meetings-list');
        if (!meetingsList) return;

        // Limpiar intervalo anterior
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

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

        // Iniciar contadores
        this.startCounters();
    }

    renderMeetingCard(meeting) {
        const { state, timeRemaining } = this.calculateMeetingStatus(meeting);

        return `
            <article class="meeting-card" data-id="${meeting.id}" data-category="${meeting.category}" data-status="${meeting.status}">
                <div class="meeting-header">
                    <div class="meeting-date-badge">
                        <span class="meeting-day">${this.formatDay(meeting.date)}</span>
                        <span class="meeting-month">${this.formatMonth(meeting.date)}</span>
                    </div>
                    
                    <div class="meeting-status-container">
                        <div class="meeting-status ${meeting.status}">
                            ${this.getStatusLabel(meeting.status)}
                        </div>
                        ${meeting.required ? `
                            <div class="meeting-required-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                Asistencia requerida
                            </div>
                        ` : ''}
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
                    
                    <!-- Contador regresivo para reuniones programadas -->
                    ${meeting.status === 'scheduled' ? `
                        <div class="meeting-counter-container" data-id="${meeting.id}">
                            ${this.renderCounterContent(timeRemaining, state)}
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
            </article>
        `;
    }

    // ======================
    //  PRÓXIMAS REUNIONES (SIDEBAR)
    // ======================

    renderUpcomingMeetings() {
        const upcomingContainer = document.getElementById('upcoming-meetings');
        if (!upcomingContainer) return;

        // Obtener reuniones programadas (próximas 2 semanas)
        const now = new Date();
        const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

        const upcomingMeetings = this.meetings
            .filter(meeting => {
                if (meeting.status !== 'scheduled') return false;
                const meetingDate = new Date(`${meeting.date}T${meeting.startTime}`);
                return meetingDate >= now && meetingDate <= twoWeeksFromNow;
            })
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.startTime}`);
                const dateB = new Date(`${b.date}T${b.startTime}`);
                return dateA - dateB;
            })
            .slice(0, 5); // Mostrar máximo 5

        if (upcomingMeetings.length === 0) {
            upcomingContainer.innerHTML = `
                <div class="no-upcoming-meetings">
                    <svg width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                    </svg>
                    <p>No hay reuniones programadas para las próximas dos semanas.</p>
                </div>
            `;
            return;
        }

        upcomingContainer.innerHTML = upcomingMeetings.map(meeting => `
            <div class="upcoming-meeting-item" data-id="${meeting.id}">
                <div class="upcoming-meeting-date">
                    <span class="upcoming-day">${this.formatDay(meeting.date)}</span>
                    <span class="upcoming-month">${this.formatMonth(meeting.date)}</span>
                </div>
                <div class="upcoming-meeting-info">
                    <h4 class="upcoming-meeting-title">${meeting.title}</h4>
                    <div class="upcoming-meeting-time">
                        <svg width="12" height="12" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        ${meeting.startTime}
                    </div>
                </div>
            </div>
        `).join('');

        // Añadir event listeners
        document.querySelectorAll('.upcoming-meeting-item').forEach(item => {
            item.addEventListener('click', () => {
                const meetingId = item.getAttribute('data-id');
                this.showMeetingModal(meetingId);
            });
        });
    }

    // ======================
    //  REUNIONES IMPORTANTES (SIDEBAR)
    // ======================

    renderImportantMeetings() {
        const importantContainer = document.getElementById('important-meetings');
        if (!importantContainer) return;

        // Obtener reuniones importantes (requeridas y programadas)
        const importantMeetings = this.meetings
            .filter(meeting => meeting.required && meeting.status === 'scheduled')
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.startTime}`);
                const dateB = new Date(`${b.date}T${b.startTime}`);
                return dateA - dateB;
            })
            .slice(0, 3); // Mostrar máximo 3

        if (importantMeetings.length === 0) {
            importantContainer.innerHTML = `
                <div class="no-important-meetings">
                    <svg width="32" height="32" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p>No hay reuniones obligatorias programadas.</p>
                </div>
            `;
            return;
        }

        importantContainer.innerHTML = importantMeetings.map(meeting => `
            <div class="important-meeting-item" data-id="${meeting.id}">
                <div class="important-meeting-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="important-meeting-info">
                    <h4 class="important-meeting-title">${meeting.title}</h4>
                    <div class="important-meeting-date">
                        ${this.formatFullDate(meeting.date)} a las ${meeting.startTime}
                    </div>
                </div>
            </div>
        `).join('');

        // Añadir event listeners
        document.querySelectorAll('.important-meeting-item').forEach(item => {
            item.addEventListener('click', () => {
                const meetingId = item.getAttribute('data-id');
                this.showMeetingModal(meetingId);
            });
        });
    }

    // ======================
    //  CONTADOR REGRESIVO (Como en eventos)
    // ======================

    startCounters() {
        // Actualizar contadores cada segundo
        this.updateInterval = setInterval(() => this.updateCounters(), 1000);
    }

    updateCounters() {
        this.activeMeetings.forEach(meeting => {
            if (meeting.status === 'scheduled') {
                const { state, timeRemaining } = this.calculateMeetingStatus(meeting);
                const counterElement = document.querySelector(`.meeting-counter-container[data-id="${meeting.id}"]`);

                if (counterElement) {
                    counterElement.innerHTML = this.renderCounterContent(timeRemaining, state);
                }
            }
        });
    }

    calculateMeetingStatus(meeting) {
        const now = new Date();
        const meetingStart = new Date(`${meeting.date}T${meeting.startTime}`);
        const meetingEnd = new Date(`${meeting.date}T${meeting.endTime}`);

        const states = {
            UPCOMING: 'upcoming',
            IN_PROGRESS: 'in-progress',
            FINISHED: 'finished'
        };

        let state;
        let timeRemaining = {};

        if (meeting.status === 'completed') {
            state = states.FINISHED;
        } else if (meeting.status === 'cancelled') {
            state = states.FINISHED; // Tratar como finalizado para contador
        } else if (now < meetingStart) {
            state = states.UPCOMING;
            const diff = meetingStart - now;

            timeRemaining = {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            };
        } else if (now >= meetingStart && now <= meetingEnd) {
            state = states.IN_PROGRESS;
            const diff = meetingEnd - now;

            timeRemaining = {
                hours: Math.floor(diff / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            };
        } else {
            state = states.FINISHED;
        }

        return { state, timeRemaining };
    }

    renderCounterContent(timeObj, state) {
        // Estado: Finalizado
        if (state === 'finished') {
            return `
                <div class="meeting-status-badge finished">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span>Finalizada</span>
                </div>
            `;
        }

        // Estado: En progreso
        if (state === 'in-progress') {
            return `
                <div class="meeting-status-badge in-progress">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                    <span>En curso</span>
                    <div class="time-remaining">
                        <span class="time-value">${this.padZero(timeObj.hours)}:${this.padZero(timeObj.minutes)}:${this.padZero(timeObj.seconds)}</span>
                        <span class="time-label">para finalizar</span>
                    </div>
                </div>
            `;
        }

        // Estado "próximamente" con días
        if (timeObj.days > 0) {
            return `
                <div class="counter-label">Comienza en</div>
                <div class="digital-counter">
                    <div class="time-block large">
                        <span class="time-value">${timeObj.days}</span>
                        <span class="time-label">DÍAS</span>
                    </div>
                    <div class="time-block">
                        <span class="time-value">${this.padZero(timeObj.hours)}</span>
                        <span class="time-label">HRS</span>
                    </div>
                    <span class="time-separator">:</span>
                    <div class="time-block">
                        <span class="time-value">${this.padZero(timeObj.minutes)}</span>
                        <span class="time-label">MIN</span>
                    </div>
                </div>
            `;
        }

        // Estado "próximamente" (menos de 1 día)
        return `
            <div class="counter-label">Comienza en</div>
            <div class="digital-counter">
                <div class="time-block">
                    <span class="time-value">${this.padZero(timeObj.hours)}</span>
                    <span class="time-label">HRS</span>
                </div>
                <span class="time-separator">:</span>
                <div class="time-block">
                    <span class="time-value">${this.padZero(timeObj.minutes)}</span>
                    <span class="time-label">MIN</span>
                </div>
                <span class="time-separator">:</span>
                <div class="time-block">
                    <span class="time-value">${this.padZero(timeObj.seconds)}</span>
                    <span class="time-label">SEG</span>
                </div>
            </div>
        `;
    }

    padZero(num) {
        return num < 10 ? `0${num}` : num;
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

        const { state, timeRemaining } = this.calculateMeetingStatus(meeting);

        return `
            <div class="meeting-modal-main">
                <div class="meeting-modal-header-info">
                    <div class="meeting-modal-status ${meeting.status}">
                        ${this.getStatusLabel(meeting.status)}
                    </div>
                    <div class="meeting-modal-category ${meeting.category.toLowerCase().replace(/\s+/g, '-')}">
                        ${meeting.category}
                    </div>
                    ${meeting.required ? `
                        <div class="meeting-required-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Asistencia requerida
                        </div>
                    ` : ''}
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

                <!-- Contador regresivo en modal para reuniones programadas -->
                ${meeting.status === 'scheduled' ? `
                    <div class="meeting-modal-counter">
                        ${this.renderCounterContent(timeRemaining, state)}
                    </div>
                ` : ''}

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

    formatFullDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
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
            showDataError();
        }
    } catch (error) {
        console.error('Error al inicializar MeetingSystem:', error);
        showDataError();
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