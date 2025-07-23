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
document.addEventListener('DOMContentLoaded', initEventsPage);