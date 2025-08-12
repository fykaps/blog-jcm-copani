/**
 * Página de detalle del menú del comedor Qaliwarma (Versión Mejorada)
 */

// Función para actualizar el estado y el contador en tiempo real
function updateServiceStatusRealTime() {
  const serviceStatusElement = document.querySelector('.service-status-container');
  if (!serviceStatusElement) return;

  const urlParams = new URLSearchParams(window.location.search);
  const dayParam = urlParams.get('day');
  const serviceParam = urlParams.get('service');

  const menuItem = dayParam ? getMenuByDay(dayParam) : getTodayMenu();
  if (!menuItem) return;

  const hours = getHoursByDay(menuItem.day);
  const serviceHours = serviceParam === 'breakfast' ? hours.breakfast : hours.lunch;

  const today = new Date();
  const currentTime = TimeUtils.getCurrentTime();
  const serviceStatus = getServiceStatus(serviceHours, currentTime);

  // Actualizar el estado y el contador
  serviceStatusElement.innerHTML = `
    <div class="service-time">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
      </svg>
      <span>${serviceHours.start} - ${serviceHours.end}</span>
    </div>
    <div class="service-status ${serviceStatus.class}">${serviceStatus.text}</div>
    ${serviceStatus.status !== 'completed' ? `
    <div class="service-countdown">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
      </svg>
      <span>${serviceStatus.status === 'pending' ? 'Faltan' : 'Termina en'} ${TimeUtils.formatCountdown(serviceStatus.timeRemaining)}</span>
    </div>
    ` : ''}
  `;
}

function displayMenuDetail() {
  const container = document.getElementById('menu-detail-container');
  if (!container) return;

  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const dayParam = urlParams.get('day');
  const serviceParam = urlParams.get('service');

  // Obtener el menú correspondiente
  let menuItem;
  let staff;
  let hours;

  if (dayParam) {
    // Buscar por día específico
    menuItem = getMenuByDay(dayParam);
    staff = getStaffByDay(dayParam);
    hours = getHoursByDay(dayParam);
  } else {
    // Mostrar el menú del día actual
    menuItem = getTodayMenu();
    staff = getTodayStaff();
    hours = getHoursByDay(menuItem.day);
  }

  if (!menuItem) {
    container.innerHTML = `
      <div class="error-message">
        <h2>Menú no encontrado</h2>
        <p>El menú solicitado no está disponible.</p>
        <a href="menu.html" class="btn btn-primary">Volver al menú</a>
      </div>
    `;
    return;
  }

  // Determinar si es desayuno o almuerzo
  const service = serviceParam === 'breakfast' ? menuItem.breakfast : menuItem.lunch;
  const serviceName = serviceParam === 'breakfast' ? 'Desayuno' : 'Almuerzo';
  const serviceHours = serviceParam === 'breakfast' ? hours.breakfast : hours.lunch;

  // Obtener estado inicial
  const today = new Date();
  const currentTime = TimeUtils.getCurrentTime();
  const serviceStatus = getServiceStatus(serviceHours, currentTime);

  // Mostrar el detalle
  container.innerHTML = `
    <article class="menu-detail">
      <header class="menu-detail-header">
        <div class="menu-breadcrumb">
          <a href="menu.html">Comedor Qaliwarma</a> / <span>${menuItem.day}</span>
        </div>
        <h1 class="menu-detail-title">${service.name}</h1>
        <div class="menu-detail-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
            </svg>
            <span>${TimeUtils.formatDate(menuItem.date)}</span>
          </div>
          <div class="meta-item">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
            </svg>
            <span>${serviceName}</span>
          </div>
          ${service.additional ? `
          <div class="meta-item">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>Adicional: ${service.additional}</span>
          </div>
          ` : ''}
        </div>
        
        <!-- Nueva sección para estado y horario -->
        <div class="service-status-container"></div>
      </header>
      
      <div class="menu-detail-content">
        <div class="menu-image">
          <img src="${service.image}" alt="${service.name}" loading="lazy">
        </div>
        
        <div class="menu-description">
          <h2>Descripción</h2>
          <p>${service.description}</p>
        </div>
        
        <div class="menu-ingredients">
          <h2>Ingredientes</h2>
          <ul>
            ${service.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>
        
        <div class="menu-staff">
          <h2>Personal a cargo</h2>
          <div class="staff-list">
            <div class="staff-member">
              <h3>Cocinera</h3>
              <p>${staff.cook}</p>
            </div>
            <div class="staff-member">
              <h3>Madres de familia</h3>
              <p>${staff.helpers.join('</p><p>')}</p>
              <p><strong>Grado:</strong> ${staff.grade}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="menu-actions">
        <a href="menu.html" class="btn btn-primary">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Volver al menú
        </a>
      </div>
    </article>
  `;

  // Actualizar el estado inicial
  updateServiceStatusRealTime();

  // Configurar la actualización en tiempo real (cada minuto)
  setInterval(updateServiceStatusRealTime, 60000);
}

function getServiceStatus(serviceHours, currentTime) {
  const start = TimeUtils.timeToMinutes(serviceHours.start);
  const end = TimeUtils.timeToMinutes(serviceHours.end);
  const now = TimeUtils.timeToMinutes(currentTime);

  if (now < start) {
    return {
      status: 'pending',
      text: 'Pendiente',
      class: 'status-pending',
      timeRemaining: start - now
    };
  } else if (now >= start && now < end) {
    return {
      status: 'in-progress',
      text: 'En proceso',
      class: 'status-in-progress',
      timeRemaining: end - now
    };
  } else {
    return {
      status: 'completed',
      text: 'Completado',
      class: 'status-completed',
      timeRemaining: 0
    };
  }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', displayMenuDetail);