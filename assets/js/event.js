/**
 * Sistema de Eventos Escolares - Versión Premium
 * Con diseño ecommerce, modal interactivo, paginación y contador regresivo
 */

class EventSystem {
  constructor(eventsData, options = {}) {
    this.events = eventsData;
    this.options = {
      eventsPerPage: 4, // Valor por defecto, personalizable
      ...options
    };
    this.currentFilter = 'all';
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.activeEvents = [];
    this.updateInterval = null;
    this.modal = null;
    this.currentPage = 1;
    this.totalPages = 1;

    this.init();
  }

  init() {
    this.renderMiniCalendar();
    this.renderEventsList();
    this.renderUpcomingEvents();
    this.renderFeaturedEvents();
    this.setupEventFilters();
    this.setupEventModal();
    this.setupEventCardInteractions();
    this.setupPagination();

    // Actualizar estadísticas después de la inicialización
    this.updateEventStats();
  }

  // ======================
  //  ESTADÍSTICAS PARA HERO
  // ======================

  updateEventStats() {
    const now = new Date();

    // Contar eventos próximos (futuros)
    const upcomingEvents = this.events.filter(event => {
      if (event.status !== 'active') return false;
      const eventDate = new Date(`${event.date}T${event.startTime}`);
      return eventDate > now;
    });

    // Contar eventos pasados (finalizados)
    const pastEvents = this.events.filter(event => {
      if (event.status !== 'active') return false;
      const eventDate = new Date(`${event.date}T${event.endTime}`);
      return eventDate < now;
    });

    // Contar eventos en curso
    const inProgressEvents = this.events.filter(event => {
      if (event.status !== 'active') return false;
      const eventStart = new Date(`${event.date}T${event.startTime}`);
      const eventEnd = new Date(`${event.date}T${event.endTime}`);
      return now >= eventStart && now <= eventEnd;
    });

    // Contar eventos cancelados o postergados
    const inactiveEvents = this.events.filter(event =>
      event.status === 'cancelled' || event.status === 'postponed'
    );

    // Calcular el total de eventos activos (próximos + pasados + en curso)
    const totalActiveEvents = upcomingEvents.length + pastEvents.length + inProgressEvents.length;

    // Calcular el total general (activos + inactivos)
    const totalAllEvents = this.events.length;

    // Actualizar los elementos del DOM
    this.updateStatElement('upcoming-stat', upcomingEvents.length);
    this.updateStatElement('past-stat', pastEvents.length);
    this.updateStatElement('total-stat', totalActiveEvents); // o totalAllEvents según lo que quieras mostrar
    this.updateStatElement('inprogress-stat', inProgressEvents.length);

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

  renderMiniCalendar() {
    const miniCalendar = document.getElementById('mini-calendar');
    if (!miniCalendar) return;

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    const monthEvents = this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === this.currentMonth &&
        eventDate.getFullYear() === this.currentYear;
    });

    miniCalendar.innerHTML = `
            <div class="mini-calendar-header">
                <button id="prev-month" class="mini-calendar-nav" aria-label="Mes anterior">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                    </svg>
                </button>
                <h4>${this.getMonthName(this.currentMonth)} ${this.currentYear}</h4>
                <button id="next-month" class="mini-calendar-nav" aria-label="Mes siguiente">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                </button>
            </div>
            <div class="mini-calendar-grid">
                ${['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => `
                    <div class="mini-calendar-weekday">${day}</div>
                `).join('')}
                ${Array(firstDay.getDay()).fill().map(() => `
                    <div class="mini-calendar-day empty"></div>
                `).join('')}
                ${Array(daysInMonth).fill().map((_, i) => {
      const day = i + 1;
      const dateStr = `${this.currentYear}-${this.padZero(this.currentMonth + 1)}-${this.padZero(day)}`;
      const dayEvents = monthEvents.filter(event => event.date === dateStr);
      const hasEvent = dayEvents.length > 0;
      const dayStatus = this.getDayStatus(dateStr, dayEvents);

      return `
                        <div class="mini-calendar-day ${hasEvent ? 'has-event' : ''} 
                            ${dayStatus} 
                            ${this.currentDate.getDate() === day &&
          this.currentDate.getMonth() === this.currentMonth ? 'today' : ''}"
                            data-date="${dateStr}">
                            ${day}
                            ${hasEvent ? `
                                <div class="day-event-dots">
                                    ${dayEvents.map(e => `<span class="event-dot ${this.getEventStatusClass(e)}"></span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `;
    }).join('')}
            </div>
        `;

    // Event listeners para navegación
    document.getElementById('prev-month').addEventListener('click', () => {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.renderMiniCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.renderMiniCalendar();
    });

    // Event listeners para días del calendario
    document.querySelectorAll('.mini-calendar-day[data-date]').forEach(day => {
      day.addEventListener('click', () => {
        const date = day.getAttribute('data-date');
        this.filterEventsByDate(date);
      });
    });
  }

  renderEventsList(filter = 'all', dateFilter = null) {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    // Limpiar intervalo anterior
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    // Filtrar eventos
    let filteredEvents = [...this.events];

    if (filter === 'date' && dateFilter) {
      filteredEvents = filteredEvents.filter(event => event.date === dateFilter);
    } else if (filter !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.category === filter);
    }

    // Ordenar por fecha y hora
    filteredEvents.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateB - dateA;
    });

    this.activeEvents = filteredEvents;
    this.totalPages = Math.ceil(filteredEvents.length / this.options.eventsPerPage);

    // Asegurar que la página actual sea válida
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
    }

    // Mostrar mensaje si no hay eventos
    if (filteredEvents.length === 0) {
      let message = '';
      if (filter === 'date' && dateFilter) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(dateFilter).toLocaleDateString('es-ES', options);
        message = `
                    <div class="no-results">
                        <svg width="48" height="48" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                        <h3>No hay eventos programados para el ${formattedDate}</h3>
                        <p>Intenta con otra fecha.</p>
                        <button class="reset-filter">Mostrar todos los eventos</button>
                    </div>
                `;
      } else {
        message = `
                    <div class="no-results">
                        <svg width="48" height="48" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                        </svg>
                        <p>No hay eventos programados con los criterios seleccionados</p>
                        <button class="reset-filter">Mostrar todos los eventos</button>
                    </div>
                `;
      }

      eventsList.innerHTML = message;
      document.querySelector('.reset-filter')?.addEventListener('click', () => {
        this.resetFilters();
      });

      // Ocultar paginación si no hay resultados
      document.getElementById('events-pagination-wrapper').style.display = 'none';
      return;
    }

    // Mostrar paginación
    document.getElementById('events-pagination-wrapper').style.display = 'flex';

    // Obtener eventos para la página actual
    const startIndex = (this.currentPage - 1) * this.options.eventsPerPage;
    const endIndex = startIndex + this.options.eventsPerPage;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    // Renderizar eventos
    eventsList.innerHTML = paginatedEvents.map(event => {
      const { state, timeRemaining } = this.calculateEventStatus(event);

      return `
                <article class="event-card" data-id="${event.id}" data-category="${event.category}" data-status="${state}">
                    <div class="event-date">
                        <span class="event-day">${this.formatDay(event.date)}</span>
                        <span class="event-month">${this.formatMonth(event.date)}</span>
                    </div>
                    <div class="event-content">
                        <div class="event-meta">
                            <span class="event-category">${event.category}</span>
                            <span class="event-time">${event.startTime} - ${event.endTime}</span>
                        </div>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-description">${event.description}</p>
                        <div class="event-details">
                            <p>
                                <svg viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg> 
                                ${event.location}
                            </p>
                        </div>
                        <div class="event-counter-container" data-id="${event.id}">
                            ${this.renderCounterContent(timeRemaining, state)}
                        </div>
                    </div>
                    ${event.featured ? '<span class="event-badge">Destacado</span>' : ''}
                </article>
            `;
    }).join('');

    // Renderizar paginación
    this.renderPagination();

    // Iniciar contador de eventos
    this.updateInterval = setInterval(() => this.updateCounters(), 1000);
  }

  renderUpcomingEvents() {
    const upcomingEvents = document.getElementById('upcoming-events');
    if (!upcomingEvents) return;

    const now = new Date();
    const futureEvents = [...this.events]
      .filter(event => {
        const eventDate = new Date(`${event.date}T${event.startTime}`);
        return eventDate >= now && event.status === 'active';
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA - dateB;
      })
      .slice(0, 3);

    if (futureEvents.length === 0) {
      upcomingEvents.innerHTML = '<p class="no-upcoming">No hay eventos próximos</p>';
      return;
    }

    upcomingEvents.innerHTML = futureEvents.map(event => {
      const { state, timeRemaining } = this.calculateEventStatus(event);

      return `
                <div class="upcoming-event" data-id="${event.id}">
                    <div class="upcoming-event-date">
                        <span>${this.formatDay(event.date)}</span>
                        <small>${this.formatShortMonth(event.date)}</small>
                    </div>
                    <div class="upcoming-event-info">
                        <h4>${event.title}</h4>
                        <p>${event.startTime} - ${event.endTime}</p>
                        <div class="upcoming-event-counter ${state}">
                            ${state === 'upcoming' ?
          `<span>En ${timeRemaining.days > 0 ?
            `${timeRemaining.days} días` :
            `${this.padZero(timeRemaining.hours)}:${this.padZero(timeRemaining.minutes)}`}
                            </span>` :
          '<span>Próximamente</span>'}
                        </div>
                    </div>
                </div>
            `;
    }).join('');
  }

  renderFeaturedEvents() {
    const featuredEvents = document.getElementById('featured-events');
    if (!featuredEvents) return;

    const featured = this.events.filter(event => event.featured).slice(0, 2);

    if (featured.length === 0) {
      featuredEvents.innerHTML = '<p>No hay eventos destacados</p>';
      return;
    }

    featuredEvents.innerHTML = featured.map(event => {
      const { state } = this.calculateEventStatus(event);

      return `
                <div class="featured-event" data-id="${event.id}">
                    <div class="featured-event-image">
                        <img src="${event.image}" alt="${event.title}" loading="lazy">
                    </div>
                    <div class="featured-event-content">
                        <h4>${event.title}</h4>
                        <p>${this.formatFullDate(event.date)} • ${event.startTime}</p>
                        <div class="featured-event-status ${state}">
                            ${state === 'upcoming' ? 'Próximamente' :
          state === 'in-progress' ? 'En curso' :
            state === 'finished' ? 'Finalizado' :
              state === 'cancelled' ? 'Cancelado' : 'Postergado'}
                        </div>
                        <a href="#" class="read-more" data-event-id="${event.id}">Más info</a>
                    </div>
                </div>
            `;
    }).join('');
  }

  // ======================
  //  PAGINACIÓN
  // ======================

  setupPagination() {
    this.renderPagination();
  }

  renderPagination() {
    const paginationContainer = document.getElementById('events-pagination');
    if (!paginationContainer || this.totalPages <= 1) {
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    let html = `
            <button class="pagination-button ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="eventSystem.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>
                &lt;
            </button>
        `;

    // Mostrar siempre la primera página
    html += `
            <button class="pagination-button ${this.currentPage === 1 ? 'active' : ''}" 
                    onclick="eventSystem.changePage(1)">
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
                            onclick="eventSystem.changePage(${i})">
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
                        onclick="eventSystem.changePage(${this.totalPages})">
                    ${this.totalPages}
                </button>
            `;
    }

    html += `
            <button class="pagination-button ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                    onclick="eventSystem.changePage(${this.currentPage + 1})" ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                &gt;
            </button>
        `;

    paginationContainer.innerHTML = html;
  }

  changePage(page) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.renderEventsList(this.currentFilter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ======================
  //  FILTROS Y NAVEGACIÓN
  // ======================

  setupEventFilters() {
    // Filtros principales
    document.querySelectorAll('.filters-container .filter-button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.mini-calendar-day').forEach(day => {
          day.classList.remove('selected');
        });

        document.querySelectorAll('.filters-container .filter-button').forEach(btn => {
          btn.classList.remove('active');
        });
        button.classList.add('active');

        this.currentFilter = button.getAttribute('data-filter');
        this.currentPage = 1;
        this.renderEventsList(this.currentFilter);
      });
    });

    // Filtros de categorías en sidebar
    document.querySelectorAll('.category-tag').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        document.querySelectorAll('.mini-calendar-day').forEach(day => {
          day.classList.remove('selected');
        });

        const filter = button.getAttribute('data-filter');
        this.currentFilter = filter;
        this.currentPage = 1;

        document.querySelectorAll('.filter-button, .category-tag').forEach(btn => {
          btn.classList.remove('active');
        });

        document.querySelector(`.filter-button[data-filter="${filter}"]`)?.classList.add('active');
        button.classList.add('active');

        this.renderEventsList(this.currentFilter);
      });
    });
  }

  filterEventsByDate(dateStr) {
    this.currentFilter = 'date';
    this.currentPage = 1;

    document.querySelectorAll('.mini-calendar-day').forEach(day => {
      day.classList.remove('selected');
      if (day.getAttribute('data-date') === dateStr) {
        day.classList.add('selected');
      }
    });

    this.renderEventsList('date', dateStr);
  }

  resetFilters() {
    this.currentFilter = 'all';
    this.currentPage = 1;
    document.querySelectorAll('.filter-button.active, .category-tag.active').forEach(el => {
      el.classList.remove('active');
    });
    document.querySelector('.filter-button[data-filter="all"]').classList.add('active');
    document.querySelectorAll('.mini-calendar-day.selected').forEach(el => {
      el.classList.remove('selected');
    });
    this.renderEventsList('all');
  }

  // ======================
  //  MODAL DE EVENTOS
  // ======================

  setupEventModal() {
    const modalHTML = `
            <div class="event-modal" id="event-modal">
                <div class="event-modal-content">
                    <div class="event-modal-header">
                        <h3>Detalles del Evento</h3>
                        <button class="event-modal-close" aria-label="Cerrar modal">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="event-modal-body" id="event-modal-body"></div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('event-modal');

    document.querySelector('.event-modal-close').addEventListener('click', () => this.closeEventModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeEventModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeEventModal();
      }
    });
  }

  showEventModal(eventId) {
    const event = this.events.find(e => e.id == eventId);

    if (!event) {
      return;
    }

    const { state, timeRemaining } = this.calculateEventStatus(event);
    const eventDate = new Date(`${event.date}T${event.startTime}`);
    const formattedDate = eventDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Construir HTML para los topics si existen
    const topicsHTML = event.topics && event.topics.length > 0 ? `
            <div class="event-modal-topics">
                <h4 class="topics-title">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    Temas a tratar
                </h4>
                <div class="topics-list">
                    ${event.topics.map(topic => `
                        <div class="topic-item">${topic}</div>
                    `).join('')}
                </div>
            </div>
        ` : '';

    const modalContent = `
            <div class="event-modal-image">
                <img src="${event.image || 'assets/img/event-default.jpg'}" alt="${event.title}" loading="lazy">
            </div>
            
            <div class="event-modal-meta">
                <div class="event-modal-date">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                    </svg>
                    <span>${formattedDate}</span>
                </div>
                
                <div class="event-modal-time">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <span>${event.startTime} - ${event.endTime}</span>
                </div>
                
                <div class="event-modal-location">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>${event.location}</span>
                </div>
                
                <div class="event-modal-category">
                    ${event.category}
                </div>
            </div>
            
            <h1 class="event-modal-title">${event.title}</h1>
            
            <div class="event-modal-description">
                ${event.description}
            </div>
            
            ${topicsHTML}
            
            <div class="event-modal-counter">
                ${this.renderCounterContent(timeRemaining, state)}
            </div>
            
            <div class="event-modal-footer">
                <button class="event-modal-button primary" data-action="register">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm9 14H5v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/>
                    </svg>
                    Registrarse
                </button>
                
                <button class="event-modal-button secondary" data-action="share">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                        <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                    </svg>
                    Compartir
                </button>
            </div>
        `;

    document.getElementById('event-modal-body').innerHTML = modalContent;

    // Configurar acciones de los botones
    document.querySelector('[data-action="register"]')?.addEventListener('click', () => {
      alert(`Registro para ${event.title}`);
    });

    document.querySelector('[data-action="share"]')?.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
        }).catch(err => {
          console.error('Error al compartir:', err);
        });
      } else {
        alert('Función de compartir no disponible en este navegador');
      }
    });

    // Mostrar el modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Iniciar contador si es necesario
    if (state === 'upcoming' || state === 'in-progress') {
      this.startModalCounter(eventId);
    }
  }

  closeEventModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';

    if (this.modalInterval) {
      clearInterval(this.modalInterval);
      this.modalInterval = null;
    }

    setTimeout(() => {
      document.getElementById('event-modal-body').innerHTML = '';
    }, 300);
  }

  startModalCounter(eventId) {
    const event = this.events.find(e => e.id == eventId);

    if (!event) {
      return;
    }

    this.modalInterval = setInterval(() => {
      const { state, timeRemaining } = this.calculateEventStatus(event);
      const counterElement = document.querySelector('.event-modal-counter');

      if (counterElement) {
        counterElement.innerHTML = this.renderCounterContent(timeRemaining, state);
      }

      if (state === 'finished') {
        clearInterval(this.modalInterval);
        this.modalInterval = null;
      }
    }, 1000);
  }

  setupEventCardInteractions() {
    document.addEventListener('click', (e) => {
      const moreInfoBtn = e.target.closest('.read-more');
      const eventCard = e.target.closest('.event-card');
      const upcomingEvent = e.target.closest('.upcoming-event');
      const featuredEvent = e.target.closest('.featured-event');

      if (moreInfoBtn) {
        e.preventDefault();
        const eventId = moreInfoBtn.getAttribute('data-event-id');
        if (eventId) {
          this.showEventModal(eventId);
        }
      } else if (eventCard) {
        const eventId = eventCard.getAttribute('data-id');
        if (eventId) {
          this.showEventModal(eventId);
        }
      } else if (upcomingEvent) {
        const eventId = upcomingEvent.getAttribute('data-id');
        if (eventId) {
          this.showEventModal(eventId);
        }
      } else if (featuredEvent) {
        const eventId = featuredEvent.getAttribute('data-id');
        if (eventId) {
          this.showEventModal(eventId);
        }
      }
    });
  }

  // ======================
  //  LÓGICA DE CONTADORES
  // ======================

  updateCounters() {
    this.activeEvents.forEach(event => {
      const { state, timeRemaining } = this.calculateEventStatus(event);
      const counterElement = document.querySelector(`.event-counter-container[data-id="${event.id}"]`);
      const eventCard = document.querySelector(`.event-card[data-id="${event.id}"]`);

      if (counterElement) {
        counterElement.innerHTML = this.renderCounterContent(timeRemaining, state);
      }

      if (eventCard) {
        eventCard.setAttribute('data-status', state);
      }
    });
  }

  calculateEventStatus(event) {
    const now = new Date();
    const eventStart = new Date(`${event.date}T${event.startTime}`);
    const eventEnd = new Date(`${event.date}T${event.endTime}`);

    const states = {
      UPCOMING: 'upcoming',
      IN_PROGRESS: 'in-progress',
      FINISHED: 'finished',
      CANCELLED: 'cancelled',
      POSTPONED: 'postponed'
    };

    let state;
    let timeRemaining = {};

    if (event.status === 'cancelled') {
      state = states.CANCELLED;
    } else if (event.status === 'postponed') {
      state = states.POSTPONED;
    } else if (now < eventStart) {
      state = states.UPCOMING;
      const diff = eventStart - now;

      timeRemaining = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    } else if (now >= eventStart && now <= eventEnd) {
      state = states.IN_PROGRESS;
      const diff = eventEnd - now;

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
                <div class="event-status-badge finished">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span>Finalizado</span>
                </div>
            `;
    }

    // Estado: Cancelado
    if (state === 'cancelled') {
      return `
                <div class="event-status-badge cancelled">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    <span>Cancelado</span>
                </div>
            `;
    }

    // Estado: Postergado
    if (state === 'postponed') {
      return `
                <div class="event-status-badge postponed">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                    </svg>
                    <span>Postergado</span>
                </div>
            `;
    }

    // Estado: En progreso
    if (state === 'in-progress') {
      return `
                <div class="event-status-badge in-progress">
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

  getDayStatus(dateStr, dayEvents) {
    if (dayEvents.length === 0) return '';

    const now = new Date();
    const eventDate = new Date(dateStr);

    if (eventDate < now) {
      const allFinished = dayEvents.every(event => {
        const eventEnd = new Date(`${event.date}T${event.endTime}`);
        return eventEnd < now;
      });
      return allFinished ? 'finished' : 'mixed';
    } else {
      return 'upcoming';
    }
  }

  getEventStatusClass(event) {
    const now = new Date();
    const eventStart = new Date(`${event.date}T${event.startTime}`);
    const eventEnd = new Date(`${event.date}T${event.endTime}`);

    if (event.status === 'cancelled') return 'cancelled';
    if (event.status === 'postponed') return 'postponed';
    if (now < eventStart) return 'upcoming';
    if (now >= eventStart && now <= eventEnd) return 'in-progress';
    return 'finished';
  }

  // ======================
  //  FUNCIONES UTILITARIAS
  // ======================

  formatDay(dateStr) {
    const date = new Date(dateStr);
    return date.getDate();
  }

  formatMonth(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
  }

  formatShortMonth(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short' }).slice(0, 3);
  }

  formatFullDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  getMonthName(monthIndex) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthIndex];
  }

  padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if (this.modalInterval) {
      clearInterval(this.modalInterval);
    }
    if (this.modal) {
      document.body.removeChild(this.modal);
    }
  }
}

// Inicialización del sistema de eventos
let eventSystem;

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof eventsData !== 'undefined') {
      // Configuración personalizable
      const options = {
        eventsPerPage: 4 // Puedes cambiar este valor según sea necesario
      };

      eventSystem = new EventSystem(eventsData, options);
      window.eventSystem = eventSystem; // Hacer accesible globalmente
    } else {
      console.error('Error: eventsData no está definido');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c" width="48" height="48">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Error al cargar los eventos</h3>
                <p>Los datos de eventos no están disponibles</p>
            `;
      document.getElementById('events-list')?.appendChild(errorDiv);
    }
  } catch (error) {
    console.error('Error al inicializar EventSystem:', error);
  }
});