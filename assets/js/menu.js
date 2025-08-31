/**
 * Sistema de Menú Qaliwarma - Versión Profesional Mejorada
 * Con modal de detalles, estados individuales y cronograma de madres
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
            <div class="countdown-container">
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
    this.currentState = status;
  }

  displayCompleted() {
    this.countdownElement.innerHTML = '';
    this.statusElement.className = 'meal-status completed';
    this.statusElement.textContent = 'Completado';
    this.currentState = 'completed';
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
      'in-progress': 'En Progreso',
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
    this.upcomingMenusSection = document.getElementById('upcoming-menus');
    this.supportScheduleSection = document.getElementById('support-schedule');
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
    this.renderUpcomingMenus(classified.upcoming.slice(0, 3));
    this.renderSupportSchedule();
  }

  renderOrganizedSections(menus) {
    if (!this.organizedSections) return;
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
        const countdownContainers = card.querySelectorAll('.meal-countdown-container');

        // Configurar countdown para desayuno si existe
        if (menu.breakfast && countdownContainers[0]) {
          const countdown = new CountdownSystem(menu.breakfast, 'breakfast', menu.date).init(countdownContainers[0]);
          this.countdowns.push(countdown);
        }

        // Configurar countdown para almuerzo si existe
        if (menu.lunch && countdownContainers[1]) {
          const countdown = new CountdownSystem(menu.lunch, 'lunch', menu.date).init(countdownContainers[1]);
          this.countdowns.push(countdown);
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
    if (!this.todayMenuSection) return;

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
      content += this.createMealCardFull(menu.breakfast, 'Desayuno', menu.date, true);
    }

    if (menu.lunch) {
      content += this.createMealCardFull(menu.lunch, 'Almuerzo', menu.date, true);
    }

    this.todayMenuSection.innerHTML = content;

    // Configurar countdowns solo si existen los elementos
    if (menu.breakfast) {
      const breakfastContainer = this.todayMenuSection.querySelector('.meal-card-full:first-child .meal-card-content');
      if (breakfastContainer) {
        const container = document.createElement('div');
        breakfastContainer.appendChild(container);
        this.countdowns.push(new CountdownSystem(menu.breakfast, 'breakfast', menu.date).init(container));
      }
    }

    if (menu.lunch) {
      const lunchContainer = this.todayMenuSection.querySelector('.meal-card-full:last-child .meal-card-content');
      if (lunchContainer) {
        const container = document.createElement('div');
        lunchContainer.appendChild(container);
        this.countdowns.push(new CountdownSystem(menu.lunch, 'lunch', menu.date).init(container));
      }
    }
  }

  renderUpcomingMenus(menus) {
    if (!this.upcomingMenusSection) return;

    if (!menus || menus.length === 0) {
      this.upcomingMenusSection.innerHTML = '<div class="empty-menu"><p>No hay próximos menús</p></div>';
      return;
    }

    let content = '';
    menus.forEach(menu => {
      content += `
                <div class="upcoming-menu-item">
                    <div class="upcoming-menu-date">
                        <strong>${menu.day}, ${this.formatDisplayDate(menu.date)}</strong>
                    </div>
                    <div class="upcoming-menu-meals">
                        ${menu.breakfast ? `<span class="meal-tag breakfast">Desayuno: ${menu.breakfast.name}</span>` : ''}
                        ${menu.lunch ? `<span class="meal-tag lunch">Almuerzo: ${menu.lunch.name}</span>` : ''}
                    </div>
                    <div class="upcoming-menu-helpers">
                        <small>Ayudantes: ${menu.helpers.names.join(' y ')}</small>
                    </div>
                </div>
            `;
    });

    this.upcomingMenusSection.innerHTML = content;
  }

  renderSupportSchedule() {
    if (!this.supportScheduleSection) return;

    const today = this.currentDate;
    const todayFormatted = this.formatDate(today);

    // Obtener todos los días únicos con sus ayudantes
    const scheduleData = this.menuData.map(menu => {
      const isToday = menu.date === todayFormatted;
      return {
        day: menu.day,
        date: menu.date,
        helpers: menu.helpers,
        isToday: isToday
      };
    });

    let scheduleHTML = `
            <div class="schedule-grid">
                <div class="schedule-header">
                    <span>Día</span>
                    <span>Fecha</span>
                    <span>Madres de Apoyo</span>
                    <span>Grado</span>
                </div>
        `;

    scheduleData.forEach(item => {
      scheduleHTML += `
                <div class="schedule-row ${item.isToday ? 'today' : ''}">
                    <span class="schedule-day">${item.day}</span>
                    <span class="schedule-date">${this.formatDisplayDate(item.date)}</span>
                    <span class="schedule-helpers">${item.helpers.names.join(' y ')}</span>
                    <span class="schedule-grade">${item.helpers.grade}</span>
                </div>
            `;
    });

    scheduleHTML += '</div>';

    this.supportScheduleSection.innerHTML = scheduleHTML;
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

    const menuDate = menu.date || '';
    const hasBreakfast = menu.breakfast && Object.keys(menu.breakfast).length > 0;
    const hasLunch = menu.lunch && Object.keys(menu.lunch).length > 0;

    return `
            <div class="menu-card-header">
                <div class="menu-card-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    ${menu.day || 'Día no especificado'}, ${this.formatDisplayDate(menuDate)}
                </div>
                <h3 class="menu-card-title">Menú del Día</h3>
                <div class="menu-card-meta">
                    <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        ${menu.cook || 'Cocinera no especificada'}
                    </span>
                    <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        ${menu.helpers?.names?.join(' y ') ? `${menu.helpers.names.join(' y ')} (${menu.helpers.grade})` : 'Ayudantes no especificados'}
                    </span>
                </div>
            </div>
            <div class="menu-card-meals-grid">
                ${hasBreakfast ? this.createMealCardFull(menu.breakfast, 'Desayuno', menuDate) : this.createEmptyMealCard('Desayuno')}
                ${hasLunch ? this.createMealCardFull(menu.lunch, 'Almuerzo', menuDate) : this.createEmptyMealCard('Almuerzo')}
            </div>
        `;
  }

  createMealCardFull(meal, title, menuDate = '', isToday = false) {
    const mealType = title.toLowerCase();
    return `
            <div class="meal-card-full ${mealType}">
                <div class="meal-card-image">
                    <img src="${meal?.image || 'assets/img/default-food.jpg'}" alt="${meal?.name || title}" class="meal-image">
                    <div class="meal-card-overlay">
                        <h5 class="meal-title">${title}</h5>
                        <span class="meal-time">${meal?.start || '--:--'} - ${meal?.end || '--:--'}</span>
                    </div>
                </div>
                <div class="meal-card-content">
                    <h4 class="meal-name">${meal?.name || 'Menú no especificado'}</h4>
                    <p class="meal-description">${meal?.description || 'Descripción no disponible'}</p>
                    ${isToday ? '<div class="meal-countdown-container"></div>' : ''}
                    <button class="meal-details-btn" data-meal='${JSON.stringify(meal)}' data-meal-type="${mealType}" data-date="${menuDate}">
                        Ver detalles
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
  }

  createEmptyMealCard(title) {
    return `
            <div class="meal-card-full empty">
                <div class="meal-card-image">
                    <div class="empty-meal-image">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                    </div>
                    <div class="meal-card-overlay">
                        <h5 class="meal-title">${title}</h5>
                        <span class="meal-time">No programado</span>
                    </div>
                </div>
                <div class="meal-card-content">
                    <h4 class="meal-name">No hay servicio</h4>
                    <p class="meal-description">No se ha programado ${title.toLowerCase()} para este día.</p>
                </div>
            </div>
        `;
  }

  createEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-section';
    emptyState.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <h3>No hay menús programados</h3>
                <p>Actualmente no hay menús en ninguna categoría.</p>
            </div>
        `;
    return emptyState;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('meal-details-btn') || e.target.closest('.meal-details-btn')) {
        const btn = e.target.classList.contains('meal-details-btn') ? e.target : e.target.closest('.meal-details-btn');
        const mealData = JSON.parse(btn.getAttribute('data-meal'));
        const mealType = btn.getAttribute('data-meal-type');
        const date = btn.getAttribute('data-date');

        // Encontrar el menú completo para obtener información de cocinera y ayudantes
        const menuCard = btn.closest('.menu-card');
        let menuInfo = {};

        if (menuCard) {
          const menuDateText = menuCard.querySelector('.menu-card-date').textContent;
          const day = menuDateText.split(',')[0].trim();
          const datePart = menuDateText.split(',')[1].trim();

          menuInfo = this.menuData.find(m =>
            m.day === day && this.formatDisplayDate(m.date) === datePart
          );
        }

        if (mealData) {
          this.showMealDetails(mealData, mealType, date, menuInfo);
        }
      }
    });
  }

  showMealDetails(meal, mealType, date, menuInfo) {
    if (!meal) return;

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
                
                <div class="meal-detail-modal">
                    <div class="meal-detail-header">
                        <span class="meal-detail-type ${mealType}">${mealType === 'desayuno' ? 'Desayuno' : 'Almuerzo'}</span>
                        <h3>${this.getDayFromDate(date)}, ${this.formatDisplayDate(date)}</h3>
                        <p class="meal-detail-time">${meal.start} - ${meal.end}</p>
                    </div>
                    
                    <div class="meal-detail-image">
                        <img src="${meal.image || 'assets/img/default-food.jpg'}" alt="${meal.name}">
                    </div>
                    
                    <div class="meal-detail-content">
                        <h4>${meal.name}</h4>
                        <p class="meal-detail-description">${meal.description || 'Descripción no disponible'}</p>
                        
                        ${meal.ingredients && meal.ingredients.length > 0 ? `
                        <div class="meal-detail-ingredients">
                            <h5>Ingredientes:</h5>
                            <ul>
                                ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${meal.additional ? `
                        <div class="meal-detail-additional">
                            <span class="label">Adicional:</span>
                            <span class="value">${meal.additional}</span>
                        </div>
                        ` : ''}
                        
                        <div class="meal-detail-status">
                            ${menuInfo.cook ? `<p class="text-center mb-0">Cocinera: ${menuInfo.cook}</p>` : ''}
                            ${menuInfo.helpers ? `<p class="text-center">Ayudantes: ${menuInfo.helpers.names.join(' y ')} (${menuInfo.helpers.grade})</p>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Activar modal con animación
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);

    const closeModal = () => {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    };

    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    const escHandler = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', escHandler);

    // Limpiar event listener cuando se cierre el modal
    modal.addEventListener('transitionend', () => {
      if (!modal.classList.contains('active')) {
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  getDayFromDate(dateString) {
    const date = new Date(dateString);
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
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
      if (!year || !month || !day) return dateString;
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
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
      const organizedSections = document.getElementById('organized-sections');
      if (organizedSections) {
        organizedSections.appendChild(errorDiv);
      }
    }
  } catch (error) {
    console.error('Error al inicializar MenuSystem:', error);
  }
});