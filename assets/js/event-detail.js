/**
 * Funcionalidades para la página de detalle de eventos
 */

// Mostrar detalle de evento
function displayEventDetail() {
    const container = document.querySelector('.event-detail-container');
    if (!container) return;

    // Obtener ID del evento de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));

    // Buscar evento
    const event = eventsData.find(item => item.id === eventId);

    if (!event) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Evento no encontrado</h2>
                <p>El evento que buscas no existe o ha sido cancelado.</p>
                <a href="events.html" class="btn btn-primary">Volver a eventos</a>
            </div>
        `;
        return;
    }

    // Registrar vista (opcional, si quieres llevar estadísticas)
    registerEventView(eventId);

    // Formatear fecha y hora
    const eventDate = formatEventDate(event.date);
    const eventStartTime = formatTime(event.startTime);
    const eventEndTime = formatTime(event.endTime);

    // Mostrar evento
    container.innerHTML = `
        <article class="event-detail">
            <header class="event-detail-header">
                <div class="event-breadcrumb">
                    <a href="events.html">Eventos</a> / <span>${event.category}</span>
                </div>
                <h1 class="event-detail-title">${event.title}</h1>
                <div class="event-detail-meta">
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                        </svg>
                        <span>${eventDate}</span>
                    </div>
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        <span>${eventStartTime} - ${eventEndTime}</span>
                    </div>
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>${event.location}</span>
                    </div>
                </div>
                <div class="event-category">${event.category}</div>
            </header>
            
            <div class="event-detail-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            
            <div class="event-detail-content">
                <p>${event.description}</p>
                
                <div class="event-info-box">
                    <h3>Información importante</h3>
                    <ul>
                        <li><strong>Fecha:</strong> ${eventDate}</li>
                        <li><strong>Hora inicio:</strong> ${eventStartTime}</li>
                        <li><strong>Hora final:</strong> ${eventEndTime}</li>
                        <li><strong>Lugar:</strong> ${event.location}</li>
                        ${event.featured ? '<li><strong>Evento destacado:</strong> Requiere inscripción previa</li>' : ''}
                    </ul>
                </div>
            </div>
            
            <div class="event-actions">
                <button class="btn btn-primary" id="add-to-calendar">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M17 13h-5v5h5v-5zM16 2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-1V2h-2zm3 18H5V9h14v11z"/>
                    </svg>
                    <span>Agregar a calendario</span>
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
        </article>
        
        <section class="related-events">
            <div class="section-header">
                <h2>Eventos relacionados</h2>
            </div>
            
            <div class="related-events-grid" id="related-events-container">
                <!-- Eventos relacionados se cargarán aquí -->
            </div>
        </section>
    `;

    // Configurar botón de agregar a calendario
    const calendarButton = document.getElementById('add-to-calendar');
    if (calendarButton) {
        calendarButton.addEventListener('click', addToCalendar);
    }

    // Configurar botones de compartir
    document.querySelectorAll('.share-button').forEach(button => {
        button.addEventListener('click', handleShare);
    });

    // Mostrar eventos relacionados
    displayRelatedEvents(eventId, event.category);
}

// Agregar evento a calendario
function addToCalendar() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    const event = eventsData.find(item => item.id === eventId);

    if (!event) return;

    // Formatear fecha para el calendario (formato ISO)
    const startDate = new Date(`${event.date}T${event.time}:00`);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2); // Asumimos 2 horas de duración

    // Crear archivo .ics
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `DTSTART:${formatDateToICS(startDate)}`,
        `DTEND:${formatDateToICS(endDate)}`,
        `LOCATION:${event.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\n');

    // Descargar archivo
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Mostrar eventos relacionados
function displayRelatedEvents(currentEventId, category) {
    const container = document.getElementById('related-events-container');
    if (!container) return;

    // Obtener 3 eventos de la misma categoría (excluyendo el actual)
    const relatedEvents = eventsData
        .filter(event => event.id !== currentEventId && event.category === category)
        .slice(0, 3);

    if (relatedEvents.length === 0) {
        container.innerHTML = '<p class="no-events">No hay eventos relacionados en esta categoría.</p>';
        return;
    }

    container.innerHTML = relatedEvents.map(event => `
        <article class="related-event-card">
            <div class="related-event-image-container">
                <img src="${event.image}" alt="${event.title}" class="related-event-image">
                <div class="related-event-meta-overlay">
                    <span class="related-event-date">${formatEventDate(event.date)}</span>
                    <span class="related-event-time">${formatTime(event.time)}</span>
                </div>
                <span class="related-event-category-badge">${event.category}</span>
            </div>
            <div class="related-event-content">
                <h3 class="related-event-title">
                    <a href="event-detail.html?id=${event.id}">${event.title}</a>
                </h3>
                <div class="related-event-location">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>${event.location}</span>
                </div>
                <p class="related-event-excerpt">${event.description.substring(0, 100)}...</p>
                <a href="event-detail.html?id=${event.id}" class="btn btn-secondary">Ver detalles</a>
            </div>
        </article>
    `).join('');
}

// Formatear fecha para el detalle
function formatEventDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Formatear hora
function formatTime(timeString) {
    return timeString.substring(0, 5); // Formato HH:MM
}

// Formatear fecha para ICS
function formatDateToICS(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\..+/, '');
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

// Registrar vista de evento (opcional)
function registerEventView(eventId) {
    let views = JSON.parse(localStorage.getItem('eventViews')) || {};
    views[eventId] = (views[eventId] || 0) + 1;
    localStorage.setItem('eventViews', JSON.stringify(views));
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', displayEventDetail);