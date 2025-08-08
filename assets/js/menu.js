/**
 * Sistema de visualización del menú del comedor Qaliwarma (Versión Mejorada)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Cargar toda la información estática
  loadProgramInfo();
  loadMothersSchedule();

  // Cargar el menú del día en el widget del sidebar
  loadTodayMenuWidget();

  // Si estamos en la página de menú completo, cargar toda la semana
  if (document.getElementById('weekly-menu-container')) {
    loadWeeklyMenu();
  }
});

// Iconos SVG reutilizables
const icons = {
  clock: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
    </svg>`,
  food: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M18 3v2h-2V3H8v2H6V3H4v2h2v2h2V5h8v2h2V5h2V3h-2zM4 9h16v2h2v4h-2v6H4v-6H2v-4h2V9zm2 2v4h12v-4H6z"/>
    </svg>`,
  calendar: `<svg viewBox="0 0 24 24" class="icon-service" width="20" height="20">
        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"/>
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
    </svg>`
};

// Cargar información del programa con iconos
function loadProgramInfo() {
  const container = document.getElementById('program-info');
  if (!container) return;

  container.innerHTML = `
        <h3>${icons.clock} Horarios de servicio:</h3>
        <ul>
            <li>${icons.food} <strong>Desayuno:</strong> ${serviceHours.breakfast.start} - ${serviceHours.breakfast.end}</li>
            <li>${icons.food} <strong>Almuerzo:</strong> ${serviceHours.lunch.start} - ${serviceHours.lunch.end}</li>
        </ul>
        <h3>${icons.chef} Personal del comedor:</h3>
        <ul>
            <li><strong>Cocinera:</strong> ${kitchenStaff.cook}</li>
            <li><strong>Madres de familia:</strong> Rotación diaria según cronograma</li>
        </ul>
    `;
}

// Cargar cronograma de madres con iconos
function loadMothersSchedule() {
  const container = document.getElementById('mothers-schedule');
  if (!container) return;

  let html = '<p>Las madres de familia colaboran según el siguiente cronograma:</p><ul>';

  Object.entries(kitchenStaff.helpers).forEach(([day, helpers]) => {
    html += `<li>${icons.calendar} <strong>${day}:</strong> ${helpers.join(' y ')}</li>`;
  });

  html += '</ul>';
  container.innerHTML = html;
}

// Cargar el widget del menú del día con iconos
function loadTodayMenuWidget() {
  const container = document.getElementById('menu-del-dia');
  if (!container) return;

  const todayMenu = getTodayMenu();

  container.innerHTML = `
    <div class="menu-widget">
      <div class="menu-service">
        <h4>${icons.food} Desayuno (${serviceHours.breakfast.start} - ${serviceHours.breakfast.end})</h4>
        <p>${todayMenu.breakfast.name}</p>
        <a href="menu-detail.html?service=breakfast" class="btn btn-small">
          Ver detalle ${icons.arrowRight}
        </a>
      </div>
      <div class="menu-service">
        <h4>${icons.food} Almuerzo (${serviceHours.lunch.start} - ${serviceHours.lunch.end})</h4>
        <p>${todayMenu.lunch.name}</p>
        <a href="menu-detail.html?service=lunch" class="btn btn-small">
          Ver detalle ${icons.arrowRight}
        </a>
      </div>
    </div>
  `;
}

// Cargar el menú semanal completo con iconos
function loadWeeklyMenu() {
  const container = document.getElementById('weekly-menu-container');
  if (!container) return;

  let html = '<div class="weekly-menu">';

  weeklyMenu.forEach(day => {
    html += `
      <div class="day-menu">
        <h3>${icons.calendar} ${day.day}, ${formatDate(day.date)}</h3>
        <div class="services">
          <div class="service breakfast">
            <h4>${icons.food} Desayuno</h4>
            <img src="${day.breakfast.image}" alt="${day.breakfast.name}" loading="lazy">
            <p><strong>${day.breakfast.name}</strong></p>
            <p>${day.breakfast.description}</p>
            <p class="additional-tag">${icons.bread} ${day.breakfast.additional}</p>
            <a href="menu-detail.html?day=${day.day}&service=breakfast" class="btn btn-small">
              Ver receta ${icons.arrowRight}
            </a>
          </div>
          <div class="service lunch">
            <h4>${icons.food} Almuerzo</h4>
            <img src="${day.lunch.image}" alt="${day.lunch.name}" loading="lazy">
            <p><strong>${day.lunch.name}</strong></p>
            <p>${day.lunch.description}</p>
            ${day.lunch.additional ? `
            <p class="additional-tag">${icons.fruit} ${day.lunch.additional}</p>
                      ` : ''}
            <a href="menu-detail.html?day=${day.day}&service=lunch" class="btn btn-small">
              Ver receta ${icons.arrowRight}
            </a>
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

// Formatear fecha
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-PE', options);
}