/**
 * Sistema de Menú Qaliwarma - Versión Completa y Corregida
 * Con contador regresivo en tiempo real, estados dinámicos y modal mejorado
 */

class CountdownSystem {
  constructor(meal, mealType, dateString) {
    this.meal = meal;
    this.mealType = mealType;
    this.dateString = dateString;
    this.interval = null;
    this.currentState = null;
  }

  init(container) {
    this.container = container;
    this.renderCountdown();
    this.startCountdown();
    return this;
  }

  renderCountdown() {
    this.container.innerHTML = `
      <div class="meal-countdown">
        <div class="countdown"></div>
        <div class="meal-status"></div>
      </div>
    `;
    this.countdownElement = this.container.querySelector('.countdown');
    this.statusElement = this.container.querySelector('.meal-status');
  }

  startCountdown() {
    this.updateCountdown();
    this.interval = setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown() {
    const now = new Date();
    const mealDate = new Date(this.dateString);
    const startDateTime = new Date(`${this.dateString}T${this.meal.start}`);
    const endDateTime = new Date(`${this.dateString}T${this.meal.end}`);

    if (this.isSameDate(now, mealDate)) {
      if (now < startDateTime) {
        const timeLeft = startDateTime - now;
        this.displayCountdown(timeLeft, `Falta para ${this.mealType === 'breakfast' ? 'desayuno' : 'almuerzo'}:`, 'pending');
      } else if (now >= startDateTime && now <= endDateTime) {
        const timeLeft = endDateTime - now;
        this.displayCountdown(timeLeft, `Termina en:`, 'in-progress');
      } else {
        this.displayCompleted();
        this.stopCountdown();
      }
    } else {
      const timeLeft = startDateTime - now;
      this.displayCountdown(timeLeft, `Falta para ${this.mealType === 'breakfast' ? 'desayuno' : 'almuerzo'}:`, 'pending');
    }
  }

  displayCountdown(timeLeft, prefix, status) {
    const { days, hours, minutes, seconds } = this.calculateTimeUnits(timeLeft);

    this.countdownElement.innerHTML = `
      <span class="countdown-prefix">${prefix}</span>
      ${days > 0 ? `<span class="countdown-unit"><strong>${days}</strong>d</span>` : ''}
      <span class="countdown-unit"><strong>${hours}</strong>h</span>
      <span class="countdown-unit"><strong>${minutes}</strong>m</span>
      <span class="countdown-unit"><strong>${seconds}</strong>s</span>
    `;

    this.statusElement.className = 'meal-status ' + status;
    this.statusElement.textContent = this.getStatusText(status);
  }

  displayCompleted() {
    this.countdownElement.innerHTML = '';
    this.statusElement.className = 'meal-status completed';
    this.statusElement.textContent = 'Completado';
  }

  calculateTimeUnits(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return {
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds)
    };
  }

  isSameDate(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  getStatusText(status) {
    const statusTexts = {
      'pending': 'Pendiente',
      'in-progress': 'En proceso',
      'completed': 'Completado'
    };
    return statusTexts[status] || '';
  }

  stopCountdown() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  destroy() {
    this.stopCountdown();
  }
}

class MenuSystem {
  constructor(menuData) {
    this.menuData = menuData;
    this.currentDate = new Date();
    this.organizedSections = document.getElementById('organized-sections');
    this.todayMenuSection = document.getElementById('menu-del-dia');
    this.countdowns = [];

    this.init();
    this.startDateCheck();
  }

  init() {
    this.renderAllSections();
    this.setupEventListeners();
  }

  startDateCheck() {
    setInterval(() => {
      const newDate = new Date();
      if (newDate.getDate() !== this.currentDate.getDate()) {
        this.currentDate = newDate;
        this.renderAllSections();
      }
    }, 60000);
  }

  classifyMenus() {
    const today = this.formatDate(this.currentDate);
    const todayTime = this.currentDate.getTime();

    return this.menuData.reduce((acc, menu) => {
      const menuDate = new Date(menu.date);
      const menuTime = menuDate.getTime();
      const dayDiff = Math.floor((todayTime - menuTime) / (1000 * 60 * 60 * 24));

      if (menu.date === today) {
        acc.today.push(menu);
      } else if (dayDiff > 0) {
        acc.attended.push(menu);
      } else {
        acc.upcoming.push(menu);
      }

      return acc;
    }, { today: [], upcoming: [], attended: [] });
  }

  renderAllSections() {
    this.countdowns.forEach(c => c.destroy());
    this.countdowns = [];

    const classified = this.classifyMenus();

    this.renderOrganizedSections(classified);
    this.renderTodayMenu(classified.today[0]);
  }

  renderOrganizedSections(menus) {
    this.organizedSections.innerHTML = '';

    if (menus.today.length > 0) {
      const todaySection = this.createSectionElement('Menú de Hoy', 'today');
      todaySection.appendChild(this.createMenuCards(menus.today));
      this.organizedSections.appendChild(todaySection);
    }

    if (menus.upcoming.length > 0) {
      const upcomingSection = this.createSectionElement('Próximos Menús', 'upcoming');
      const upcomingCards = this.createMenuCards(menus.upcoming);

      Array.from(upcomingCards.children).forEach((card, index) => {
        const menu = menus.upcoming[index];
        const mealsContainer = card.querySelector('.menu-card-meals');

        if (menu.breakfast) {
          const container = document.createElement('div');
          mealsContainer.appendChild(container);
          this.countdowns.push(new CountdownSystem(menu.breakfast, 'breakfast', menu.date).init(container));
        }

        if (menu.lunch) {
          const container = document.createElement('div');
          mealsContainer.appendChild(container);
          this.countdowns.push(new CountdownSystem(menu.lunch, 'lunch', menu.date).init(container));
        }
      });

      upcomingSection.appendChild(upcomingCards);
      this.organizedSections.appendChild(upcomingSection);
    }

    if (menus.attended.length > 0) {
      const attendedSection = this.createSectionElement('Menús Atendidos', 'attended');
      attendedSection.appendChild(this.createMenuCards(menus.attended));
      this.organizedSections.appendChild(attendedSection);
    }

    if (menus.today.length === 0 && menus.upcoming.length === 0 && menus.attended.length === 0) {
      this.organizedSections.appendChild(this.createEmptyState());
    }
  }

  renderTodayMenu(menu) {
    if (!menu) {
      this.todayMenuSection.innerHTML = '<div class="empty-menu"><p>No hay menú programado para hoy</p></div>';
      return;
    }

    let content = `
      <div class="today-menu-header">
        <h4>${menu.day}, ${this.formatDisplayDate(menu.date)}</h4>
        <p>Cocinera: ${menu.cook}</p>
        <p>Madres ayudantes: ${menu.helpers.names.join(' y ')} (${menu.helpers.grade})</p>
      </div>
    `;

    if (menu.breakfast) {
      content += this.createMealCard(menu.breakfast, 'Desayuno', true);
    }

    if (menu.lunch) {
      content += this.createMealCard(menu.lunch, 'Almuerzo', true);
    }

    this.todayMenuSection.innerHTML = content;

    if (menu.breakfast) {
      const container = document.createElement('div');
      this.todayMenuSection.querySelector('.meal-card').appendChild(container);
      this.countdowns.push(new CountdownSystem(menu.breakfast, 'breakfast', menu.date).init(container));
    }

    if (menu.lunch) {
      const cards = this.todayMenuSection.querySelectorAll('.meal-card');
      const container = document.createElement('div');
      cards[cards.length - 1].appendChild(container);
      this.countdowns.push(new CountdownSystem(menu.lunch, 'lunch', menu.date).init(container));
    }
  }

  createSectionElement(title, id) {
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.id = id;

    section.innerHTML = `
      <div class="section-header">
        <h3>${title}</h3>
      </div>
      <div class="menu-cards-container"></div>
    `;

    return section;
  }

  createMenuCards(menus) {
    const container = document.createElement('div');
    container.className = 'menu-cards-container';

    menus.forEach(menu => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.innerHTML = this.createMenuCardContent(menu);
      container.appendChild(card);
    });

    return container;
  }

  createMenuCardContent(menu) {
    if (!menu) return '<div class="error-card">Error: Menú no válido</div>';

    let mealsHtml = '';
    const menuDate = menu.date || '';

    if (menu.breakfast) {
      mealsHtml += this.createMealCard(menu.breakfast, 'Desayuno', false, menuDate);
    }

    if (menu.lunch) {
      mealsHtml += this.createMealCard(menu.lunch, 'Almuerzo', false, menuDate);
    }

    return `
      <div class="menu-card-header">
        <h4>${menu.day || 'Día no especificado'}, ${this.formatDisplayDate(menuDate)}</h4>
        <div class="menu-meta">
          <span class="cook-info">${menu.cook || 'Cocinera no especificada'}</span>
          <span class="helpers-info">${menu.helpers?.names?.join(' y ') || 'Ayudantes no especificados'} (${menu.helpers?.grade || 'Grado no especificado'})</span>
        </div>
      </div>
      <div class="menu-card-meals">
        ${mealsHtml || '<p class="no-meals">No hay servicios programados</p>'}
      </div>
    `;
  }

  createMealCard(meal, title, isCompact = false, menuDate = '') {
    const compactClass = isCompact ? 'compact' : '';
    const dateDisplay = menuDate ? this.formatDisplayDate(menuDate) : 'Fecha no definida';

    return `
      <div class="meal-card ${compactClass}">
        <div class="meal-header">
          <h5>${title}</h5>
          <span class="meal-time">${meal?.start || '--:--'} - ${meal?.end || '--:--'}</span>
        </div>
        <div class="meal-content">
          <p class="meal-name">${meal?.name || 'Menú no especificado'}</p>
          ${!isCompact ? `<p class="meal-description">${meal?.description || ''}</p>` : ''}
        </div>
        ${!isCompact ? `
        <button class="btn-details" data-meal="${title.toLowerCase()}" data-date="${menuDate || ''}">
          Ver detalles
        </button>
        ` : ''}
      </div>
    `;
  }

  createEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-section';
    emptyState.innerHTML = `
      <div class="empty-state">
        <h3>No hay menús programados</h3>
        <p>Actualmente no hay menús en ninguna categoría.</p>
      </div>
    `;
    return emptyState;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-details')) {
        const mealType = e.target.getAttribute('data-meal');
        const date = e.target.getAttribute('data-date');
        const menuCard = e.target.closest('.menu-card');

        const menuDate = menuCard.querySelector('.menu-card-header h4').textContent.split(',')[1].trim();
        const menu = this.menuData.find(m =>
          `${m.day}, ${this.formatDisplayDate(m.date)}` === `${menuCard.querySelector('.menu-card-header h4').textContent}`
        );

        if (menu) {
          const meal = mealType === 'desayuno' ? menu.breakfast : menu.lunch;
          this.showMealDetails(meal, mealType, date, menu);
        }
      }
    });
  }

  showMealDetails(meal, mealType, date, menu) {
    if (!meal) return;

    const now = new Date();
    const startTime = new Date(`${menu.date}T${meal.start}`);
    const endTime = new Date(`${menu.date}T${meal.end}`);
    let countdownText = '';
    let status = '';

    if (now < startTime) {
      const timeLeft = startTime - now;
      const { days, hours, minutes, seconds } = this.calculateTimeUnits(timeLeft);
      countdownText = `Falta: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      status = 'pending';
    } else if (now >= startTime && now <= endTime) {
      const timeLeft = endTime - now;
      const { days, hours, minutes, seconds } = this.calculateTimeUnits(timeLeft);
      countdownText = `Termina en: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      status = 'in-progress';
    } else {
      countdownText = 'Servicio completado';
      status = 'completed';
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
<button class="modal-close" aria-label="Cerrar modal">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <div class="meal-details">
          <div class="meal-details-header">
            <h3>${mealType === 'desayuno' ? 'Desayuno' : 'Almuerzo'} - ${date}</h3>
            <div class="meal-time-status">
              <span class="meal-time">${meal.start} - ${meal.end}</span>
              <span class="meal-status ${status}">${this.getStatusText(status)}</span>
            </div>
            <div class="meal-countdown">${countdownText}</div>
          </div>
          
          <div class="meal-details-content">
            <div class="meal-image-container">
              <img src="${meal.image}" alt="${meal.name}" class="meal-image">
            </div>
            
            <div class="meal-info">
              <h4>${meal.name}</h4>
              <p class="meal-description">${meal.description}</p>
              
              <div class="meal-ingredients">
                <h5>Ingredientes:</h5>
                <ul>
                  ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
              </div>
              
              ${meal.additional ? `
              <div class="meal-additional">
                <span class="label">Adicional:</span>
                <span class="value">${meal.additional}</span>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      document.body.removeChild(modal);
    };

    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  calculateTimeUnits(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return { days, hours, minutes, seconds };
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  formatDisplayDate(dateString) {
    if (!dateString) return 'Fecha no definida';

    try {
      const [year, month, day] = dateString.split('-');
      if (!year || !month || !day) return dateString; // Si no tiene formato esperado
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString; // Devuelve el valor original si hay error
    }
  }

  getStatusText(status) {
    const statusTexts = {
      'pending': 'Pendiente',
      'in-progress': 'En proceso',
      'completed': 'Completado'
    };
    return statusTexts[status] || '';
  }

  destroy() {
    this.countdowns.forEach(c => c.destroy());
    this.countdowns = [];
  }
}

// Inicialización con manejo de errores
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof weeklyMenu !== 'undefined') {
      new MenuSystem(weeklyMenu);
    } else {
      console.error('Error: weeklyMenu no está definido');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c" width="48" height="48">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h3>Error al cargar los menús</h3>
        <p>Los datos del menú no están disponibles</p>
      `;
      document.getElementById('organized-sections')?.appendChild(errorDiv);
    }
  } catch (error) {
    console.error('Error al inicializar MenuSystem:', error);
  }
});