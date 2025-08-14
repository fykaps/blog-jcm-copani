/**
 * Sistema de visualización del menú del comedor escolar (Versión Mejorada)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Cargar toda la información estática
  loadProgramInfo();
  loadMothersSchedule();

  // Cargar el menú del día en el widget del sidebar
  loadTodayMenuWidget();

  // Cargar las secciones organizadas
  if (document.getElementById('organized-sections')) {
    loadOrganizedSections();
  }
});

// Iconos SVG reutilizables
const iconsMenu = {
  clock: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
    </svg>`,
  food: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M18 3v2h-2V3H8v2H6V3H4v2h2v2h2V5h8v2h2V5h2V3h-2zM4 9h16v2h2v4h-2v6H4v-6H2v-4h2V9zm2 2v4h12v-4H6z"/>
    </svg>`,
  calendar: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5z"/>
    </svg>`,
  chef: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M12 15c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6zm0-12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5 5h1c1.1 0 2 .9 2 2v1.17c1.17.41 2 1.52 2 2.83v3h-2v-3c0-1.65-1.35-3-3-3h-1v-2h1c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3h-1V3h1c1.1 0 2 .9 2 2v1c0 1.65-1.35 3-3 3h-1v2zM7 8H6c-1.1 0-2 .9-2 2v1c0 1.65 1.35 3 3 3h1v2H6c-1.65 0-3 1.35-3 3v3H1v-3c0-1.31.83-2.42 2-2.83V10c0-1.1.9-2 2-2h1V6H6C4.35 6 3 7.35 3 9V8c0-1.1.9-2 2-2h1v2z"/>
    </svg>`,
  group: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>`,
  cookie: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m-1-8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m3 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m-6 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m3-3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m0 6c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1z"/>
    </svg> `,
  bread: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M12 2c5.5 0 10 3.36 10 7.5 0 1.69-.74 3.25-2 4.5v8H4v-8c-1.26-1.25-2-2.81-2-4.5C2 5.36 6.5 2 12 2m0 2c-4.42 0-8 2.24-8 5.5 0 1.38.62 2.66 1.67 3.5H18.33c1.05-.84 1.67-2.12 1.67-3.5C20 6.24 16.42 4 12 4m6 8H6v6h12v-6z"/>
    </svg>`,
  fruit: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M17 10c1.08 0 2.09.25 3 .68V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3.26c1.19 1.42 3.06 2.26 5.12 2.26 3.87 0 7-3.13 7-7s-3.13-7-7-7zm-7.5 4c-.83 0-1.5-.67-1.5-1.5S8.67 11 9.5 11s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.5-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm0 2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-2-2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm0 2c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z"/>
    </svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>`,
  highlight: `<svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`
};

// Función para calcular el tiempo restante hasta una fecha/hora específica
function getTimeRemaining(targetDate) {
  const now = TimeUtils.getNowInLima();
  const diff = targetDate - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, total: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days,
    hours,
    minutes,
    total: diff
  };
}

// Función para formatear el tiempo restante como "Xd Yh Zm"
function formatTimeRemaining(remaining) {
  if (remaining.total <= 0) return '';

  const parts = [];
  if (remaining.days > 0) parts.push(`${remaining.days}d`);
  if (remaining.hours > 0) parts.push(`${remaining.hours}h`);
  if (remaining.minutes > 0) parts.push(`${remaining.minutes}m`);

  return parts.join(' ');
}

// Función para obtener el estado del servicio
function getServiceStatus(serviceHours, currentTime) {
  const now = TimeUtils.getNowInLima();
  const startTime = new Date(`${now.toISOString().split('T')[0]}T${serviceHours.start}:00-05:00`);
  const endTime = new Date(`${now.toISOString().split('T')[0]}T${serviceHours.end}:00-05:00`);

  if (now < startTime) {
    const remaining = getTimeRemaining(startTime);
    return {
      status: 'pending',
      text: 'Pendiente',
      class: 'status-pending',
      timeRemaining: formatTimeRemaining(remaining),
      startTime,
      endTime
    };
  } else if (now >= startTime && now < endTime) {
    const remaining = getTimeRemaining(endTime);
    return {
      status: 'in-progress',
      text: 'En proceso',
      class: 'status-in-progress',
      timeRemaining: formatTimeRemaining(remaining),
      startTime,
      endTime
    };
  } else {
    return {
      status: 'completed',
      text: 'Completado',
      class: 'status-completed',
      timeRemaining: '',
      startTime,
      endTime
    };
  }
}

// Función para actualizar todos los estados
function updateAllStatuses() {
  const today = TimeUtils.getNowInLima();
  const todayDayName = TimeUtils.getDayName(today);
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  if (isWeekend) {
    // Si es fin de semana, mostrar el próximo lunes
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));
    const remaining = getTimeRemaining(nextMonday);

    document.querySelectorAll('.countdown').forEach(el => {
      el.textContent = `Faltan ${formatTimeRemaining(remaining)}`;
    });

    document.querySelectorAll('.service-status').forEach(el => {
      el.textContent = 'Pendiente';
      el.className = 'service-status status-pending';
    });

    return;
  }

  const currentTime = TimeUtils.getCurrentTime();
  const todayMenu = getTodayMenu();
  const todayHours = getHoursByDay(todayMenu.day);

  // Actualizar estados de hoy
  updateServiceUI('breakfast', todayHours.breakfast, currentTime);
  updateServiceUI('lunch', todayHours.lunch, currentTime);
  updateDayStatus();

  // Actualizar próximos menús
  updateNextMenusCountdowns(todayDayName);
}

// Función para actualizar la UI de un servicio
function updateServiceUI(serviceType, serviceHours, currentTime) {
  const status = getServiceStatus(serviceHours, currentTime);
  const statusElements = document.querySelectorAll(`.${serviceType}-status`);
  const countdownElements = document.querySelectorAll(`.${serviceType}-countdown`);

  statusElements.forEach(el => {
    el.textContent = status.text;
    el.className = `service-status ${serviceType}-status ${status.class}`;
  });

  countdownElements.forEach(el => {
    if (status.status === 'pending') {
      el.textContent = `Falta ${status.timeRemaining}`;
    } else if (status.status === 'in-progress') {
      el.textContent = `Termina en ${status.timeRemaining}`;
    } else {
      el.textContent = '';
    }
  });
}

// Función para actualizar los contadores de los próximos menús
function updateNextMenusCountdowns(todayDayName) {
  const dayIndex = { "Lunes": 0, "Martes": 1, "Miércoles": 2, "Jueves": 3, "Viernes": 4 };
  const todayIndex = dayIndex[todayDayName];
  const now = TimeUtils.getNowInLima();

  // Actualizar para cada día próximo
  for (let i = todayIndex + 1; i < 5; i++) {
    const dayName = Object.keys(dayIndex)[i];
    const dayMenu = getMenuByDay(dayName);
    const dayHours = getHoursByDay(dayName);

    // Calcular tiempo para desayuno
    const breakfastTarget = new Date(`${dayMenu.date}T${dayHours.breakfast.start}:00-05:00`);
    const breakfastRemaining = getTimeRemaining(breakfastTarget);

    // Calcular tiempo para almuerzo
    const lunchTarget = new Date(`${dayMenu.date}T${dayHours.lunch.start}:00-05:00`);
    const lunchRemaining = getTimeRemaining(lunchTarget);

    // Actualizar contadores de desayuno
    document.querySelectorAll(`.next-day-${dayName} .breakfast-countdown`).forEach(el => {
      el.textContent = breakfastRemaining.total > 0 ? `Faltan ${formatTimeRemaining(breakfastRemaining)}` : '';
    });

    // Actualizar contadores de almuerzo
    document.querySelectorAll(`.next-day-${dayName} .lunch-countdown`).forEach(el => {
      el.textContent = lunchRemaining.total > 0 ? `Faltan ${formatTimeRemaining(lunchRemaining)}` : '';
    });
  }
}

// Función para actualizar el estado general del día
function updateDayStatus() {
  const currentTime = TimeUtils.getCurrentTime();
  const todayMenu = getTodayMenu();
  const todayHours = getHoursByDay(todayMenu.day);

  const breakfastStatus = getServiceStatus(todayHours.breakfast, currentTime);
  const lunchStatus = getServiceStatus(todayHours.lunch, currentTime);

  const dayStatusElement = document.querySelector('.day-status');
  if (!dayStatusElement) return;

  if (lunchStatus.status === 'completed') {
    dayStatusElement.textContent = 'Completado';
    dayStatusElement.className = 'day-status status-completed';
  } else if (breakfastStatus.status === 'completed' || lunchStatus.status === 'in-progress') {
    dayStatusElement.textContent = 'En proceso';
    dayStatusElement.className = 'day-status status-in-progress';
  } else if (breakfastStatus.status === 'in-progress') {
    dayStatusElement.textContent = 'En proceso';
    dayStatusElement.className = 'day-status status-in-progress';
  } else {
    dayStatusElement.textContent = 'Pendiente';
    dayStatusElement.className = 'day-status status-pending';
  }
}

// Cargar información del programa con iconos
function loadProgramInfo() {
  const container = document.getElementById('program-info');
  if (!container) return;

  const todayMenu = getTodayMenu();
  const todayHours = getHoursByDay(todayMenu.day);

  container.innerHTML = `
        <h3>${iconsMenu.clock} Horarios de servicio:</h3>
        <ul>
            <li>${iconsMenu.food} <strong>Desayuno:</strong> ${todayHours.breakfast.start} - ${todayHours.breakfast.end}</li>
            <li>${iconsMenu.food} <strong>Almuerzo:</strong> ${todayHours.lunch.start} - ${todayHours.lunch.end}</li>
        </ul>
        <h3>${iconsMenu.chef} Personal del comedor:</h3>
        <ul>
            <li><strong>Cocinera:</strong> ${kitchenStaff.cook}</li>
            <li><strong>Madres de familia:</strong> Rotación diaria según cronograma</li>
        </ul>
    `;
}

// Cargar cronograma de madres con iconos y resaltado del día actual
function loadMothersSchedule() {
  const container = document.getElementById('mothers-schedule');
  if (!container) return;

  let html = '<div class="mothers-schedule-container"><p>Las madres de familia colaboran según el siguiente cronograma:</p>';

  const today = TimeUtils.getNowInLima();
  const todayDayName = TimeUtils.getDayName(today);
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  Object.entries(kitchenStaff.helpers).forEach(([day, data]) => {
    const isToday = day === todayDayName && !isWeekend;
    html += `
            <div class="mother-card ${isToday ? 'highlighted' : ''}">
                <h4>${iconsMenu.calendar} ${day}</h4>
                <p><strong>Madres:</strong> ${data.names.join(' y ')}</p>
                <p><strong>Grado:</strong> ${data.grade}</p>
                ${isToday ? `<div class="today-badge">${iconsMenu.highlight} Hoy</div>` : ''}
            </div>
        `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// Cargar el widget del menú del día con iconos
function loadTodayMenuWidget() {
  const container = document.getElementById('menu-del-dia');
  if (!container) return;

  const todayMenu = getTodayMenu();
  const todayHours = getHoursByDay(todayMenu.day);
  const currentTime = TimeUtils.getCurrentTime();

  const breakfastStatus = getServiceStatus(todayHours.breakfast, currentTime);
  const lunchStatus = getServiceStatus(todayHours.lunch, currentTime);

  container.innerHTML = `
    <div class="menu-widget">
        <h3>${iconsMenu.calendar} Menú de hoy (${TimeUtils.formatDate(todayMenu.date, { weekday: 'long', day: 'numeric', month: 'long' })})</h3>
        <div class="menu-service">
            <h4>${iconsMenu.food} Desayuno (${todayHours.breakfast.start} - ${todayHours.breakfast.end})</h4>
            <p>${todayMenu.breakfast.name}</p>
            <div class="service-status breakfast-status ${breakfastStatus.class}">${breakfastStatus.text}</div>
            ${breakfastStatus.status === 'pending' ? `<div class="countdown">Falta ${breakfastStatus.timeRemaining}</div>` :
      breakfastStatus.status === 'in-progress' ? `<div class="countdown">Termina en ${breakfastStatus.timeRemaining}</div>` : ''}
            <a href="menu-detail.html?day=${todayMenu.day}&service=breakfast" class="btn btn-small">
                Ver detalle ${iconsMenu.arrowRight}
            </a>
        </div>
        <div class="menu-service">
            <h4>${iconsMenu.food} Almuerzo (${todayHours.lunch.start} - ${todayHours.lunch.end})</h4>
            <p>${todayMenu.lunch.name}</p>
            <div class="service-status lunch-status ${lunchStatus.class}">${lunchStatus.text}</div>
            ${lunchStatus.status === 'pending' ? `<div class="countdown">Falta ${lunchStatus.timeRemaining}</div>` :
      lunchStatus.status === 'in-progress' ? `<div class="countdown">Termina en ${lunchStatus.timeRemaining}</div>` : ''}
            <a href="menu-detail.html?day=${todayMenu.day}&service=lunch" class="btn btn-small">
                Ver detalle ${iconsMenu.arrowRight}
            </a>
        </div>
    </div>
`;
}

// Cargar las secciones organizadas (hoy, próximos, atendidos)
function loadOrganizedSections() {
  const container = document.getElementById('organized-sections');
  if (!container) return;

  const today = TimeUtils.getNowInLima();
  const todayDayName = TimeUtils.getDayName(today);
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  const currentTime = TimeUtils.getCurrentTime();

  // Obtener índices de los días
  const dayIndex = {
    "Lunes": 0, "Martes": 1, "Miércoles": 2,
    "Jueves": 3, "Viernes": 4
  };

  let html = '';

  // 1. Sección de hoy (si no es fin de semana)
  if (!isWeekend) {
    const todayMenu = getTodayMenu();
    const todayHours = getHoursByDay(todayMenu.day);
    const todayStaff = getTodayStaff();

    const breakfastStatus = getServiceStatus(todayHours.breakfast, currentTime);
    const lunchStatus = getServiceStatus(todayHours.lunch, currentTime);

    // Determinar si ambos servicios están completados
    const bothCompleted = breakfastStatus.status === 'completed' && lunchStatus.status === 'completed';

    html += `
            <section class="menu-section today-section">
                <div class="section-header">
                    <h2 class="section-title">${iconsMenu.calendar} Menú de hoy</h2>
                    <span class="section-date">${TimeUtils.formatDate(todayMenu.date, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
                <div class="day-card">
                    <div class="day-header">
                        <h3>${todayMenu.day}</h3>
                        <span class="day-status ${bothCompleted ? 'status-completed' :
        (breakfastStatus.status === 'in-progress' || lunchStatus.status === 'in-progress') ? 'status-in-progress' : 'status-pending'}">
                            ${bothCompleted ? 'Completado' :
        (breakfastStatus.status === 'in-progress' || lunchStatus.status === 'in-progress') ? 'En proceso' : 'Pendiente'}
                        </span>
                    </div>
                    <div class="services">
                      <div class="service">
                          <div class="service-header">
                              <div class="service-title">
                                  <h4>${iconsMenu.food} Desayuno (${todayHours.breakfast.start} - ${todayHours.breakfast.end})</h4>
                                  <span class="service-status breakfast-status ${breakfastStatus.class}">${breakfastStatus.text}</span>
                              </div>
                              ${breakfastStatus.status === 'pending' ? `<div class="countdown breakfast-countdown">Falta ${breakfastStatus.timeRemaining}</div>` :
        breakfastStatus.status === 'in-progress' ? `<div class="countdown breakfast-countdown">Termina en ${breakfastStatus.timeRemaining}</div>` : ''}
                              <img src="${todayMenu.breakfast.image}" alt="${todayMenu.breakfast.name}" loading="lazy">
                          </div>
                          <p><strong>${todayMenu.breakfast.name}</strong></p>
                          <p class="additional">${iconsMenu.cookie} ${todayMenu.breakfast.additional}</p>
                          <a href="menu-detail.html?day=${todayMenu.day}&service=breakfast" class="btn btn-recipe">
                              Ver receta ${iconsMenu.arrowRight}
                          </a>
                      </div>
                      <div class="service">
                          <div class="service-header">
                              <div class="service-title">
                                  <h4>${iconsMenu.food} Almuerzo (${todayHours.lunch.start} - ${todayHours.lunch.end})</h4>
                                  <span class="service-status lunch-status ${lunchStatus.class}">${lunchStatus.text}</span>
                              </div>
                              ${lunchStatus.status === 'pending' ? `<div class="countdown lunch-countdown">Falta ${lunchStatus.timeRemaining}</div>` :
        lunchStatus.status === 'in-progress' ? `<div class="countdown lunch-countdown">Termina en ${lunchStatus.timeRemaining}</div>` : ''}
                              <img src="${todayMenu.lunch.image}" alt="${todayMenu.lunch.name}" loading="lazy">
                          </div>
                          <p><strong>${todayMenu.lunch.name}</strong></p>
                          <p class="additional">${iconsMenu.fruit} ${todayMenu.lunch.additional}</p>
                          <a href="menu-detail.html?day=${todayMenu.day}&service=lunch" class="btn btn-recipe">
                              Ver receta ${iconsMenu.arrowRight}
                          </a>
                      </div>
                    </div>
                    <div class="staff-info">
                        <p><strong>Cocinera:</strong> ${todayStaff.cook}</p>
                        <p><strong>Madres de familia:</strong> ${todayStaff.helpers.join(' y ')}</p>
                        <p><strong>Grado:</strong> ${todayStaff.grade}</p>
                    </div>
                </div>
            </section>
        `;
  } else {
    // Si es fin de semana, mostrar mensaje
    html += `
            <section class="menu-section today-section">
                <div class="section-header">
                    <h2 class="section-title">${iconsMenu.calendar} Menú de hoy</h2>
                </div>
                <div class="info-message">
                    <p>No hay servicio de comedor hoy (fin de semana).</p>
                </div>
            </section>
        `;
  }

  // 2. Sección de próximos menús
  html += `
        <section class="menu-section next-section">
            <div class="section-header">
                <h2 class="section-title">${iconsMenu.calendar} Próximos menús</h2>
            </div>
    `;

  if (isWeekend) {
    // Si es fin de semana, mostrar el próximo lunes
    const nextMondayMenu = weeklyMenu[0]; // Lunes
    const nextMondayHours = getHoursByDay(nextMondayMenu.day);
    const nextMondayStaff = getStaffByDay(nextMondayMenu.day);

    const nextMondayDate = new Date(nextMondayMenu.date);
    const breakfastTarget = new Date(`${nextMondayMenu.date}T${nextMondayHours.breakfast.start}:00-05:00`);
    const breakfastRemaining = getTimeRemaining(breakfastTarget);
    const lunchTarget = new Date(`${nextMondayMenu.date}T${nextMondayHours.lunch.start}:00-05:00`);
    const lunchRemaining = getTimeRemaining(lunchTarget);

    html += `
            <div class="day-card next-day-Lunes">
                <div class="day-header">
                    <h3>${nextMondayMenu.day}</h3>
                    <span class="status-badge status-pending">Pendiente</span>
                </div>
                <div class="services">
                    <div class="service">
                        <div class="service-header">
                            <div class="service-title">
                                <h4>${iconsMenu.food} Desayuno (${nextMondayHours.breakfast.start} - ${nextMondayHours.breakfast.end})</h4>
                                <span class="service-status status-pending">Pendiente</span>
                            </div>
                            <div class="countdown breakfast-countdown">${breakfastRemaining.total > 0 ? `Faltan ${formatTimeRemaining(breakfastRemaining)}` : ''}</div>
                            <img src="${nextMondayMenu.breakfast.image}" alt="${nextMondayMenu.breakfast.name}" loading="lazy">
                        </div>
                        <p><strong>${nextMondayMenu.breakfast.name}</strong></p>
                        <p class="additional">${iconsMenu.cookie} ${nextMondayMenu.breakfast.additional}</p>
                        <a href="menu-detail.html?day=${nextMondayMenu.day}&service=breakfast" class="btn btn-recipe">
                            Ver receta ${iconsMenu.arrowRight}
                        </a>
                    </div>
                    <div class="service">
                        <div class="service-header">
                            <div class="service-title">
                                <h4>${iconsMenu.food} Almuerzo (${nextMondayHours.lunch.start} - ${nextMondayHours.lunch.end})</h4>
                                <span class="service-status status-pending">Pendiente</span>
                            </div>
                            <div class="countdown lunch-countdown">${lunchRemaining.total > 0 ? `Faltan ${formatTimeRemaining(lunchRemaining)}` : ''}</div>
                            <img src="${nextMondayMenu.lunch.image}" alt="${nextMondayMenu.lunch.name}" loading="lazy">
                        </div>
                        <p><strong>${nextMondayMenu.lunch.name}</strong></p>
                        <p class="additional">${iconsMenu.fruit} ${nextMondayMenu.lunch.additional}</p>
                        <a href="menu-detail.html?day=${nextMondayMenu.day}&service=lunch" class="btn btn-recipe">
                            Ver receta ${iconsMenu.arrowRight}
                        </a>
                    </div>
                </div>
                <div class="staff-info">
                    <p><strong>Cocinera:</strong> ${nextMondayStaff.cook}</p>
                    <p><strong>Madres de familia:</strong> ${nextMondayStaff.helpers.join(' y ')}</p>
                    <p><strong>Grado:</strong> ${nextMondayStaff.grade}</p>
                </div>
            </div>
        `;
  } else {
    // Mostrar los próximos días de la semana actual
    const todayIndex = dayIndex[todayDayName];
    let hasNextDays = false;

    for (let i = todayIndex + 1; i < 5; i++) {
      const dayName = Object.keys(dayIndex)[i];
      const nextDayMenu = weeklyMenu[i];
      const nextDayHours = getHoursByDay(dayName);
      const nextDayStaff = getStaffByDay(dayName);

      const breakfastTarget = new Date(`${nextDayMenu.date}T${nextDayHours.breakfast.start}:00-05:00`);
      const breakfastRemaining = getTimeRemaining(breakfastTarget);
      const lunchTarget = new Date(`${nextDayMenu.date}T${nextDayHours.lunch.start}:00-05:00`);
      const lunchRemaining = getTimeRemaining(lunchTarget);

      html += `
                <div class="day-card next-day-${dayName}">
                    <div class="day-header">
                        <h3>${dayName}</h3>
                        <span class="status-badge status-pending">Pendiente</span>
                    </div>
                    <div class="services">
                        <div class="service">
                            <div class="service-header">
                                <div class="service-title">
                                    <h4>${iconsMenu.food} Desayuno (${nextDayHours.breakfast.start} - ${nextDayHours.breakfast.end})</h4>
                                    <span class="service-status status-pending">Pendiente</span>
                                </div>
                                <div class="countdown breakfast-countdown">${breakfastRemaining.total > 0 ? `Faltan ${formatTimeRemaining(breakfastRemaining)}` : ''}</div>
                                <img src="${nextDayMenu.breakfast.image}" alt="${nextDayMenu.breakfast.name}" loading="lazy">
                            </div>
                            <p><strong>${nextDayMenu.breakfast.name}</strong></p>
                            <p class="additional">${iconsMenu.cookie} ${nextDayMenu.breakfast.additional}</p>
                            <a href="menu-detail.html?day=${dayName}&service=breakfast" class="btn btn-recipe">
                                Ver receta ${iconsMenu.arrowRight}
                            </a>
                        </div>
                        <div class="service">
                            <div class="service-header">
                                <div class="service-title">
                                    <h4>${iconsMenu.food} Almuerzo (${nextDayHours.lunch.start} - ${nextDayHours.lunch.end})</h4>
                                    <span class="service-status status-pending">Pendiente</span>
                                </div>
                                <div class="countdown lunch-countdown">${lunchRemaining.total > 0 ? `Faltan ${formatTimeRemaining(lunchRemaining)}` : ''}</div>
                                <img src="${nextDayMenu.lunch.image}" alt="${nextDayMenu.lunch.name}" loading="lazy">
                            </div>
                            <p><strong>${nextDayMenu.lunch.name}</strong></p>
                            <p class="additional">${iconsMenu.fruit} ${nextDayMenu.lunch.additional}</p>
                            <a href="menu-detail.html?day=${dayName}&service=lunch" class="btn btn-recipe">
                                Ver receta ${iconsMenu.arrowRight}
                            </a>
                        </div>
                    </div>
                    <div class="staff-info">
                        <p><strong>Cocinera:</strong> ${nextDayStaff.cook}</p>
                        <p><strong>Madres de familia:</strong> ${nextDayStaff.helpers.join(' y ')}</p>
                        <p><strong>Grado:</strong> ${nextDayStaff.grade}</p>
                    </div>
                </div>
            `;
      hasNextDays = true;
    }

    if (!hasNextDays) {
      // Si no hay más días esta semana, mostrar el próximo lunes
      const nextMondayMenu = weeklyMenu[0]; // Lunes
      const nextMondayDate = new Date(nextMondayMenu.date);
      nextMondayDate.setDate(nextMondayDate.getDate() + 7); // Siguiente semana
      const breakfastTarget = new Date(`${nextMondayMenu.date}T${nextMondayHours.breakfast.start}:00-05:00`);
      breakfastTarget.setDate(breakfastTarget.getDate() + 7);
      const breakfastRemaining = getTimeRemaining(breakfastTarget);
      const lunchTarget = new Date(`${nextMondayMenu.date}T${nextMondayHours.lunch.start}:00-05:00`);
      lunchTarget.setDate(lunchTarget.getDate() + 7);
      const lunchRemaining = getTimeRemaining(lunchTarget);

      html += `
                <div class="info-message">
                    <p>No hay más atención esta semana. El próximo servicio será el Lunes.</p>
                    <div class="countdown breakfast-countdown">${breakfastRemaining.total > 0 ? `Faltan ${formatTimeRemaining(breakfastRemaining)}` : ''}</div>
                    <div class="countdown lunch-countdown">${lunchRemaining.total > 0 ? `Faltan ${formatTimeRemaining(lunchRemaining)}` : ''}</div>
                </div>
            `;
    }
  }

  html += `</section>`;

  // 3. Sección de menús atendidos
  html += `
        <section class="menu-section attended-section">
            <div class="section-header">
                <h2 class="section-title">${iconsMenu.calendar} Menús atendidos</h2>
            </div>
            <div class="attended-days">
    `;

  if (!isWeekend) {
    // Mostrar días anteriores en la semana
    for (let i = dayIndex[todayDayName] - 1; i >= 0; i--) {
      const pastDayMenu = weeklyMenu[i];
      const pastDayHours = getHoursByDay(pastDayMenu.day);
      const pastDayStaff = getStaffByDay(pastDayMenu.day);

      html += `
                <div class="day-card">
                    <div class="day-header">
                        <h3>${pastDayMenu.day}</h3>
                        <span class="status-badge status-completed">Completado</span>
                    </div>
                    <div class="services">
                        <div class="service">
                            <div class="service-header">
                                <div class="service-title">
                                    <h4>${iconsMenu.food} Desayuno (${pastDayHours.breakfast.start} - ${pastDayHours.breakfast.end})</h4>
                                    <span class="service-status status-completed">Completado</span>
                                </div>
                                <img src="${pastDayMenu.breakfast.image}" alt="${pastDayMenu.breakfast.name}" loading="lazy">
                            </div>
                            <p><strong>${pastDayMenu.breakfast.name}</strong></p>
                            <p class="additional">${iconsMenu.cookie} ${pastDayMenu.breakfast.additional}</p>
                            <a href="menu-detail.html?day=${pastDayMenu.day}&service=breakfast" class="btn btn-recipe">
                                Ver receta ${iconsMenu.arrowRight}
                            </a>
                        </div>
                        <div class="service">
                            <div class="service-header">
                                <div class="service-title">
                                    <h4>${iconsMenu.food} Almuerzo (${pastDayHours.lunch.start} - ${pastDayHours.lunch.end})</h4>
                                    <span class="service-status status-completed">Completado</span>
                                </div>
                                <img src="${pastDayMenu.lunch.image}" alt="${pastDayMenu.lunch.name}" loading="lazy">
                            </div>
                            <p><strong>${pastDayMenu.lunch.name}</strong></p>
                            <p class="additional">${iconsMenu.fruit} ${pastDayMenu.lunch.additional}</p>
                            <a href="menu-detail.html?day=${pastDayMenu.day}&service=lunch" class="btn btn-recipe">
                                Ver receta ${iconsMenu.arrowRight}
                            </a>
                        </div>
                    </div>
                    <div class="staff-info">
                        <p><strong>Cocinera:</strong> ${pastDayStaff.cook}</p>
                        <p><strong>Madres de familia:</strong> ${pastDayStaff.helpers.join(' y ')}</p>
                        <p><strong>Grado:</strong> ${pastDayStaff.grade}</p>
                    </div>
                </div>
            `;
    }
  } else {
    // Si es fin de semana, mostrar toda la semana pasada
    for (let i = 4; i >= 0; i--) {
      const pastDayMenu = weeklyMenu[i];
      const pastDayHours = getHoursByDay(pastDayMenu.day);
      const pastDayStaff = getStaffByDay(pastDayMenu.day);

      html += `
                <div class="day-card">
                    <div class="day-header">
                        <h3>${pastDayMenu.day}</h3>
                        <span class="status-badge status-completed">Completado</span>
                    </div>
                    <div class="services">
                        <div class="service">
                            <div class="service-header">
                                <div class="service-title">
                                    <h4>${iconsMenu.food} Desayuno (${pastDayHours.breakfast.start} - ${pastDayHours.breakfast.end})</h4>
                                    <span class="service-status status-completed">Completado</span>
                                </div>
                                <img src="${pastDayMenu.breakfast.image}" alt="${pastDayMenu.breakfast.name}" loading="lazy">
                            </div>
                            <p><strong>${pastDayMenu.breakfast.name}</strong></p>
                            <p class="additional">${iconsMenu.cookie} ${pastDayMenu.breakfast.additional}</p>
                            <a href="menu-detail.html?day=${pastDayMenu.day}&service=breakfast" class="btn btn-recipe">
                                Ver receta ${iconsMenu.arrowRight}
                            </a>
                        </div>
                        <div class="service">
                            <div class="service-header">
                                <div class="service-title">
                                    <h4>${iconsMenu.food} Almuerzo (${pastDayHours.lunch.start} - ${pastDayHours.lunch.end})</h4>
                                    <span class="service-status status-completed">Completado</span>
                                </div>
                                <img src="${pastDayMenu.lunch.image}" alt="${pastDayMenu.lunch.name}" loading="lazy">
                            </div>
                            <p><strong>${pastDayMenu.lunch.name}</strong></p>
                            <p class="additional">${iconsMenu.fruit} ${pastDayMenu.lunch.additional}</p>
                            <a href="menu-detail.html?day=${pastDayMenu.day}&service=lunch" class="btn btn-recipe">
                                Ver receta ${iconsMenu.arrowRight}
                            </a>
                        </div>
                    </div>
                    <div class="staff-info">
                        <p><strong>Cocinera:</strong> ${pastDayStaff.cook}</p>
                        <p><strong>Madres de familia:</strong> ${pastDayStaff.helpers.join(' y ')}</p>
                        <p><strong>Grado:</strong> ${pastDayStaff.grade}</p>
                    </div>
                </div>
            `;
    }
  }

  html += `</div></section>`;
  container.innerHTML = html;

  // Iniciar la actualización en tiempo real
  updateAllStatuses();
  setInterval(updateAllStatuses, 60000); // Actualizar cada minuto
}

// Hacer las funciones accesibles globalmente
window.getServiceStatus = getServiceStatus;