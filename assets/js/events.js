<<<<<<< HEAD
/**
 * Sistema de Eventos Escolares - Versión Mejorada
 */

// Variables globales
let currentFilter = 'all';
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let interval = null;
let activeEvents = [];

// Inicializar la página de eventos
function initEventsPage() {
    renderMiniCalendar();
    renderEventsList();
    renderUpcomingEvents();
    renderFeaturedEvents();
    setupEventFilters();
}

// Renderizar mini calendario con colores para eventos
function renderMiniCalendar() {
    const miniCalendar = document.getElementById('mini-calendar');
    if (!miniCalendar) return;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Obtener eventos del mes actual
    const monthEvents = eventsData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    miniCalendar.innerHTML = `
        <div class="mini-calendar-header">
            <button id="prev-month" class="mini-calendar-nav">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
            </button>
            <h4>${getMonthName(currentMonth)} ${currentYear}</h4>
            <button id="next-month" class="mini-calendar-nav">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
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
        const dateStr = `${currentYear}-${padZero(currentMonth + 1)}-${padZero(day)}`;
        const dayEvents = monthEvents.filter(event => event.date === dateStr);
        const hasEvent = dayEvents.length > 0;

        // Determinar el estado más relevante para el día
        let dayStatus = '';
        if (hasEvent) {
            const now = new Date();
            const eventDate = new Date(dateStr);

            if (eventDate < now) {
                // Evento pasado - verificar si todos están completados
                const allFinished = dayEvents.every(event => {
                    const eventEnd = new Date(`${event.date}T${event.endTime}`);
                    return eventEnd < now;
                });
                dayStatus = allFinished ? 'finished' : 'mixed';
            } else {
                // Evento futuro
                dayStatus = 'upcoming';
            }
        }

        return `
                    <div class="mini-calendar-day ${hasEvent ? 'has-event' : ''} 
                        ${dayStatus} 
                        ${currentDate.getDate() === day && currentDate.getMonth() === currentMonth ? 'today' : ''}"
                        data-date="${dateStr}">
                        ${day}
                        ${hasEvent ? `<div class="day-event-dots">${dayEvents.map(e =>
            `<span class="event-dot ${getEventStatusClass(e)}"></span>`
        ).join('')}</div>` : ''}
                    </div>
                `;
    }).join('')}
        </div>
    `;

    // Configurar navegación del calendario
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderMiniCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderMiniCalendar();
    });

    // Configurar clic en días del calendario
    document.querySelectorAll('.mini-calendar-day[data-date]').forEach(day => {
        day.addEventListener('click', () => {
            const date = day.getAttribute('data-date');
            filterEventsByDate(date);
        });
    });
}

// Función para obtener la clase de estado de un evento
function getEventStatusClass(event) {
    const now = new Date();
    const eventStart = new Date(`${event.date}T${event.startTime}`);
    const eventEnd = new Date(`${event.date}T${event.endTime}`);

    if (event.status === 'cancelled') return 'cancelled';
    if (event.status === 'postponed') return 'postponed';
    if (now < eventStart) return 'upcoming';
    if (now >= eventStart && now <= eventEnd) return 'in-progress';
    return 'finished';
}

// Función para calcular el estado y tiempo restante
function calculateEventStatus(event) {
    const now = new Date();
    const eventStart = new Date(`${event.date}T${event.startTime}`);
    const eventEnd = new Date(`${event.date}T${event.endTime}`);

    // Estados posibles
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

// Función para renderizar el contador
function renderCounterContent(timeObj, state) {
    // Estado: Finalizado con éxito
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
                    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
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
                    <span class="time-value">${String(timeObj.hours).padStart(2, '0')}:${String(timeObj.minutes).padStart(2, '0')}:${String(timeObj.seconds).padStart(2, '0')}</span>
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
                    <span class="time-value">${String(timeObj.hours).padStart(2, '0')}</span>
                    <span class="time-label">HRS</span>
                </div>
                <span class="time-separator">:</span>
                <div class="time-block">
                    <span class="time-value">${String(timeObj.minutes).padStart(2, '0')}</span>
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
                <span class="time-value">${String(timeObj.hours).padStart(2, '0')}</span>
                <span class="time-label">HRS</span>
            </div>
            <span class="time-separator">:</span>
            <div class="time-block">
                <span class="time-value">${String(timeObj.minutes).padStart(2, '0')}</span>
                <span class="time-label">MIN</span>
            </div>
            <span class="time-separator">:</span>
            <div class="time-block">
                <span class="time-value">${String(timeObj.seconds).padStart(2, '0')}</span>
                <span class="time-label">SEG</span>
            </div>
        </div>
    `;
}

// Renderizar lista de eventos
function renderEventsList(filter = 'all', dateFilter = null) {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    // Limpiar intervalo anterior si existe
    if (interval) {
        clearInterval(interval);
    }

    let filteredEvents = [...eventsData];

    // Aplicar filtros
    if (filter === 'date' && dateFilter) {
        // Filtrado por fecha específica
        filteredEvents = filteredEvents.filter(event => event.date === dateFilter);
    } else if (filter !== 'all') {
        // Filtrado por categoría
        filteredEvents = filteredEvents.filter(event => event.category === filter);
    }

    // Ordenar eventos por fecha y hora de inicio
    filteredEvents.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA - dateB;
    });

    // Guardar eventos activos
    activeEvents = filteredEvents;

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

        // Configurar evento para el botón de reset
        document.querySelector('.reset-filter')?.addEventListener('click', () => {
            currentFilter = 'all';
            document.querySelectorAll('.filter-button.active, .category-tag.active').forEach(el => {
                el.classList.remove('active');
            });
            document.querySelector('.filter-button[data-filter="all"]').classList.add('active');
            document.querySelectorAll('.mini-calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            renderEventsList('all');
        });

        return;
    }

    eventsList.innerHTML = filteredEvents.map(event => {
        const { state, timeRemaining } = calculateEventStatus(event);

        return `
        <article class="event-card" data-id="${event.id}" data-category="${event.category}" data-status="${state}">
            <div class="event-date">
                <span class="event-day">${formatDay(event.date)}</span>
                <span class="event-month">${formatMonth(event.date)}</span>
            </div>
            <div class="event-content">
                <div class="event-meta">
                    <span class="event-category">${event.category}</span>
                    <span class="event-time">${event.startTime} - ${event.endTime}</span>
                </div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <p><svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> ${event.location}</p>
                </div>
                <div class="event-counter-container" data-id="${event.id}">
                    ${renderCounterContent(timeRemaining, state)}
                </div>
            </div>
            ${event.featured ? '<span class="event-badge">Destacado</span>' : ''}
        </article>
        `;
    }).join('');

    // Configurar intervalo para actualizar contadores
    interval = setInterval(updateCounters, 1000);
}

// Función para actualizar los contadores
function updateCounters() {
    activeEvents.forEach(event => {
        const { state, timeRemaining } = calculateEventStatus(event);
        const counterElement = document.querySelector(`.event-counter-container[data-id="${event.id}"]`);
        const eventCard = document.querySelector(`.event-card[data-id="${event.id}"]`);

        if (counterElement) {
            counterElement.innerHTML = renderCounterContent(timeRemaining, state);
        }

        if (eventCard) {
            // Actualizar el estado del card si cambió
            eventCard.setAttribute('data-status', state);
        }
    });
}

// Renderizar próximos eventos (sidebar)
function renderUpcomingEvents() {
    const upcomingEvents = document.getElementById('upcoming-events');
    if (!upcomingEvents) return;

    // Obtener eventos futuros ordenados por fecha
    const now = new Date();
    const futureEvents = [...eventsData]
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
        const { state, timeRemaining } = calculateEventStatus(event);

        return `
        <div class="upcoming-event">
            <div class="upcoming-event-date">
                <span>${formatDay(event.date)}</span>
                <small>${formatShortMonth(event.date)}</small>
            </div>
            <div class="upcoming-event-info">
                <h4>${event.title}</h4>
                <p>${event.startTime} - ${event.endTime}</p>
                <div class="upcoming-event-counter ${state}">
                    ${state === 'upcoming' ?
                `<span>En ${timeRemaining.days > 0 ?
                    `${timeRemaining.days} días` :
                    `${String(timeRemaining.hours).padStart(2, '0')}:${String(timeRemaining.minutes).padStart(2, '0')}`}
                        </span>` :
                '<span>Próximamente</span>'}
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Renderizar eventos destacados (sidebar)
function renderFeaturedEvents() {
    const featuredEvents = document.getElementById('featured-events');
    if (!featuredEvents) return;

    const featured = eventsData.filter(event => event.featured).slice(0, 2);

    if (featured.length === 0) {
        featuredEvents.innerHTML = '<p>No hay eventos destacados</p>';
        return;
    }

    featuredEvents.innerHTML = featured.map(event => {
        const { state } = calculateEventStatus(event);

        return `
        <div class="featured-event">
            <div class="featured-event-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            <div class="featured-event-content">
                <h4>${event.title}</h4>
                <p>${formatFullDate(event.date)} • ${event.startTime}</p>
                <div class="featured-event-status ${state}">
                    ${state === 'upcoming' ? 'Próximamente' :
                state === 'in-progress' ? 'En curso' :
                    state === 'finished' ? 'Finalizado' :
                        state === 'cancelled' ? 'Cancelado' : 'Postergado'}
                </div>
                <a href="event-detail.html?id=${event.id}" class="read-more" data-event-id="${event.id}">Más info</a>
            </div>
        </div>
        `;
    }).join('');
}

// Configurar filtros de eventos
function setupEventFilters() {
    // Filtros principales
    document.querySelectorAll('.filters-container .filter-button').forEach(button => {
        button.addEventListener('click', function () {
            // Limpiar selección del calendario
            document.querySelectorAll('.mini-calendar-day').forEach(day => {
                day.classList.remove('selected');
            });

            // Actualizar botones activos
            document.querySelectorAll('.filters-container .filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            // Actualizar filtro actual
            currentFilter = this.getAttribute('data-filter');

            // Renderizar eventos
            renderEventsList(currentFilter);
        });
    });

    // Filtros de categorías en sidebar
    document.querySelectorAll('.category-tag').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Limpiar selección del calendario
            document.querySelectorAll('.mini-calendar-day').forEach(day => {
                day.classList.remove('selected');
            });

            const filter = this.getAttribute('data-filter');
            currentFilter = filter;

            // Actualizar botones activos en ambos lugares
            document.querySelectorAll('.filter-button, .category-tag').forEach(btn => {
                btn.classList.remove('active');
            });

            document.querySelector(`.filter-button[data-filter="${filter}"]`)?.classList.add('active');
            this.classList.add('active');

            // Renderizar eventos
            renderEventsList(currentFilter);
        });
    });
}

// Filtrar eventos por fecha
function filterEventsByDate(dateStr) {
    currentFilter = 'date';

    // Resaltar solo el día seleccionado
    document.querySelectorAll('.mini-calendar-day').forEach(day => {
        day.classList.remove('selected');
        if (day.getAttribute('data-date') === dateStr) {
            day.classList.add('selected');
        }
    });

    // Renderizar eventos para esta fecha
    renderEventsList('date', dateStr);
}

// Funciones de formato de fecha
function formatDay(dateStr) {
    const date = new Date(dateStr);
    return date.getDate();
}

function formatMonth(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
}

function formatShortMonth(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short' }).slice(0, 3);
}

function formatFullDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getMonthName(monthIndex) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthIndex];
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

// Inicializar la página de eventos
=======
/**
 * Sistema de Eventos Escolares - Versión Mejorada
 */

// Variables globales
let currentFilter = 'all';
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Inicializar la página de eventos
function initEventsPage() {
    renderMiniCalendar();
    renderEventsList();
    renderUpcomingEvents();
    renderFeaturedEvents();
    setupEventFilters();
}

// Renderizar mini calendario
function renderMiniCalendar() {
    const miniCalendar = document.getElementById('mini-calendar');
    if (!miniCalendar) return;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Obtener eventos del mes actual
    const monthEvents = eventsData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    miniCalendar.innerHTML = `
        <div class="mini-calendar-header">
            <button id="prev-month" class="mini-calendar-nav">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
            </button>
            <h4>${getMonthName(currentMonth)} ${currentYear}</h4>
            <button id="next-month" class="mini-calendar-nav">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
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
        const dateStr = `${currentYear}-${padZero(currentMonth + 1)}-${padZero(day)}`;
        const hasEvent = monthEvents.some(event => event.date === dateStr);

        return `
                    <div class="mini-calendar-day ${hasEvent ? 'has-event' : ''} 
                        ${currentDate.getDate() === day && currentDate.getMonth() === currentMonth ? 'today' : ''}"
                        data-date="${dateStr}">
                        ${day}
                    </div>
                `;
    }).join('')}
        </div>
    `;

    // Configurar navegación del calendario
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderMiniCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderMiniCalendar();
    });

    // Configurar clic en días del calendario
    document.querySelectorAll('.mini-calendar-day[data-date]').forEach(day => {
        day.addEventListener('click', () => {
            const date = day.getAttribute('data-date');
            filterEventsByDate(date);
        });
    });
}

// Renderizar lista de eventos
function renderEventsList(filter = 'all', dateFilter = null) {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    let filteredEvents = [...eventsData];

    // Aplicar filtros
    if (filter !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.category === filter);
    }

    if (dateFilter) {
        filteredEvents = filteredEvents.filter(event => event.date === dateFilter);
    }

    // Ordenar eventos por fecha
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filteredEvents.length === 0) {
        eventsList.innerHTML = `
            <div class="no-events">
                <svg width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                <p>No hay eventos programados con los criterios seleccionados</p>
            </div>
        `;
        return;
    }

    eventsList.innerHTML = filteredEvents.map(event => `
        <article class="event-card" data-category="${event.category}">
            <div class="event-date">
                <span class="event-day">${formatDay(event.date)}</span>
                <span class="event-month">${formatMonth(event.date)}</span>
            </div>
            <div class="event-content">
                <div class="event-meta">
                    <span class="event-category">${event.category}</span>
                    <span class="event-time">${event.time}</span>
                </div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <p><svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> ${event.location}</p>
                </div>
            </div>
            ${event.featured ? '<span class="event-badge">Destacado</span>' : ''}
        </article>
    `).join('');
}

// Renderizar próximos eventos (sidebar)
function renderUpcomingEvents() {
    const upcomingEvents = document.getElementById('upcoming-events');
    if (!upcomingEvents) return;

    // Obtener eventos futuros ordenados por fecha
    const now = new Date();
    const futureEvents = [...eventsData]
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    if (futureEvents.length === 0) {
        upcomingEvents.innerHTML = '<p class="no-upcoming">No hay eventos próximos</p>';
        return;
    }

    upcomingEvents.innerHTML = futureEvents.map(event => `
        <div class="upcoming-event">
            <div class="upcoming-event-date">
                <span>${formatDay(event.date)}</span>
                <small>${formatShortMonth(event.date)}</small>
            </div>
            <div class="upcoming-event-info">
                <h4>${event.title}</h4>
                <p>${event.time} • ${event.location}</p>
            </div>
        </div>
    `).join('');
}

// Renderizar eventos destacados (sidebar)
function renderFeaturedEvents() {
    const featuredEvents = document.getElementById('featured-events');
    if (!featuredEvents) return;

    const featured = eventsData.filter(event => event.featured).slice(0, 2);

    if (featured.length === 0) {
        featuredEvents.innerHTML = '<p>No hay eventos destacados</p>';
        return;
    }

    featuredEvents.innerHTML = featured.map(event => `
        <div class="featured-event">
            <div class="featured-event-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            <div class="featured-event-content">
                <h4>${event.title}</h4>
                <p>${formatFullDate(event.date)} • ${event.time}</p>
                <a href="#" class="read-more" data-event-id="${event.id}">Más info</a>
            </div>
        </div>
    `).join('');
}

// Configurar filtros de eventos
function setupEventFilters() {
    // Filtros principales
    document.querySelectorAll('.filters-container .filter-button').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('.filters-container .filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderEventsList(currentFilter);
        });
    });

    // Filtros de categorías en sidebar
    document.querySelectorAll('.category-tag').forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;

            // Actualizar botones activos en ambos lugares
            document.querySelectorAll('.filter-button, .category-tag').forEach(btn => {
                btn.classList.remove('active');
            });

            document.querySelector(`.filter-button[data-filter="${filter}"]`).classList.add('active');
            document.querySelector(`.category-tag[data-filter="${filter}"]`).classList.add('active');

            renderEventsList(currentFilter);
        });
    });
}

// Filtrar eventos por fecha
function filterEventsByDate(dateStr) {
    currentFilter = 'all';
    document.querySelectorAll('.filter-button, .category-tag').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-button[data-filter="all"]').classList.add('active');
    document.querySelector('.category-tag[data-filter="all"]').classList.add('active');

    renderEventsList('all', dateStr);
}

// Funciones de formato de fecha
function formatDay(dateStr) {
    const date = new Date(dateStr);
    return date.getDate();
}

function formatMonth(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
}

function formatShortMonth(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short' }).slice(0, 3);
}

function formatFullDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
}

function getMonthName(monthIndex) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthIndex];
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

// Inicializar la página de eventos
>>>>>>> f544b31e5157af84e4703e6538865ca99e6358ab
document.addEventListener('DOMContentLoaded', initEventsPage);