/**
 * Sistema de Menú Estudiantil - Versión Mejorada
 * Con contador regresivo en tiempo real y estados visibles
 */

class MenuCountdownSystem {
  constructor(menuData) {
    this.menuData = menuData;
    this.currentDate = new Date();
    this.countdowns = new Map();
    this.updateInterval = null;

    this.init();
  }

  init() {
    this.renderAllSections();
    this.startCountdowns();
    this.setupEventListeners();

    this.updateMenuStats();
  }

  // ======================
  //  ESTADÍSTICAS DEL MENÚ
  // ======================

  calculateMenuStats() {
    if (!this.menuData || this.menuData.length === 0) {
      return {
        totalDays: 0,
        totalMeals: 0,
        uniqueHelpers: 0,
        breakfastCount: 0,
        lunchCount: 0
      };
    }

    // Calcular días únicos (semana laboral)
    const totalDays = this.menuData.length;

    // Calcular total de comidas
    let breakfastCount = 0;
    let lunchCount = 0;
    let uniqueHelpers = new Set();

    this.menuData.forEach(menu => {
      if (menu.breakfast) breakfastCount++;
      if (menu.lunch) lunchCount++;

      // Contar ayudantes únicos
      if (menu.helpers && menu.helpers.names) {
        menu.helpers.names.forEach(helper => {
          uniqueHelpers.add(helper.toLowerCase().trim());
        });
      }
    });

    const totalMeals = breakfastCount + lunchCount;

    return {
      totalDays,
      totalMeals,
      uniqueHelpers: uniqueHelpers.size,
      breakfastCount,
      lunchCount
    };
  }

  updateMenuStats() {
    const stats = this.calculateMenuStats();

    // Actualizar elementos del DOM
    this.updateStatElement('days-stat', stats.totalDays);
    this.updateStatElement('meals-stat', stats.totalMeals);
    this.updateStatElement('helpers-stat', stats.uniqueHelpers);

    // Iniciar animación de contadores
    this.animateMenuStats();
  }

  updateStatElement(statId, value) {
    const element = document.querySelector(`[data-stat="${statId}"]`);
    if (element) {
      element.setAttribute('data-count', value);
      element.textContent = '0'; // Reset para animación
    }
  }

  animateMenuStats() {
    const statElements = document.querySelectorAll('.section-stat-number[data-stat]');

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

  startCountdowns() {
    // Limpiar intervalo anterior si existe
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    // Actualizar contadores cada segundo
    this.updateInterval = setInterval(() => {
      this.updateAllCountdowns();
    }, 1000);
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
    const classified = this.classifyMenus();

    // Renderizar secciones organizadas
    this.renderOrganizedSections(classified);

    // Renderizar otras secciones
    this.renderTodayMenu(classified.today[0]);
    this.renderUpcomingMenus(classified.upcoming.slice(0, 3));
    this.renderSupportSchedule();

    // Registrar contadores después de renderizar
    this.registerAllCountdowns(classified);
  }

  renderOrganizedSections(menus) {
    const organizedSections = document.getElementById('organized-sections');
    if (!organizedSections) return;

    organizedSections.innerHTML = '';

    // Sección de Hoy
    if (menus.today.length > 0) {
      const todaySection = this.createSection('Menú de Hoy', 'today');
      todaySection.appendChild(this.createMenuCards(menus.today));
      organizedSections.appendChild(todaySection);
    }

    // Sección de Próximos
    if (menus.upcoming.length > 0) {
      const upcomingSection = this.createSection('Próximos Menús', 'upcoming');
      upcomingSection.appendChild(this.createMenuCards(menus.upcoming));
      organizedSections.appendChild(upcomingSection);
    }

    // Sección de Atendidos
    if (menus.attended.length > 0) {
      const attendedSection = this.createSection('Menús Atendidos', 'attended');
      attendedSection.appendChild(this.createMenuCards(menus.attended));
      organizedSections.appendChild(attendedSection);
    }

    if (menus.today.length === 0 && menus.upcoming.length === 0 && menus.attended.length === 0) {
      organizedSections.innerHTML = `
                <div class="empty-section">
                    <p>No hay menús programados</p>
                </div>
            `;
    }
  }

  createSection(title, id) {
    const section = document.createElement('section');
    section.className = 'menu-section';
    section.id = id;
    section.innerHTML = `
            <div class="section-header">
                <h3>${title}</h3>
            </div>
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
    return `
            <div class="menu-card-header">
                <div class="menu-card-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    ${menu.day}, ${this.formatDisplayDate(menu.date)}
                </div>
                <h3 class="menu-card-title">Menú del Día</h3>
                <div class="menu-card-meta">
                    <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        ${menu.cook}
                    </span>
                    <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        ${menu.helpers.names.join(' y ')} (${menu.helpers.grade})
                    </span>
                </div>
            </div>
            <div class="menu-card-meals-grid">
                ${menu.breakfast ? this.createMealCard(menu.breakfast, 'Desayuno', menu.date) : this.createEmptyMealCard('Desayuno')}
                ${menu.lunch ? this.createMealCard(menu.lunch, 'Almuerzo', menu.date) : this.createEmptyMealCard('Almuerzo')}
            </div>
        `;
  }

  // Función createMealCard corregida con estados visibles
  createMealCard(meal, title, menuDate = '', countdownId = '') {
    const mealType = title.toLowerCase();
    const finalCountdownId = countdownId || this.generateCountdownId(mealType, menuDate);

    // Registrar el contador si existe la comida
    if (meal) {
      this.registerCountdown(finalCountdownId, meal, mealType, menuDate);
    }

    // Calcular estado inicial para mostrar inmediatamente
    const { state } = this.calculateMealStatus(meal, menuDate);
    const statusClass = this.getStatusClass(state);

    return `
            <div class="meal-card ${mealType}">
                <div class="meal-card-image">
                    <img src="${meal?.image || 'assets/img/default-food.jpg'}" alt="${meal?.name || title}" class="meal-image">
                    <div class="meal-card-overlay">
                        <h5 class="meal-title">${title}</h5>
                        <span class="meal-time">${meal?.start || '--:--'} - ${meal?.end || '--:--'}</span>
                    </div>
                    <div class="meal-status-indicator ${statusClass}">
                        ${this.getStatusText(state)}
                    </div>
                </div>
                <div class="meal-card-content">
                    <h4 class="meal-name">${meal?.name || 'Menú no especificado'}</h4>
                    <p class="meal-description">${meal?.description || 'Descripción no disponible'}</p>
                    <div id="${finalCountdownId}" class="meal-countdown-container"></div>
                    ${meal ? `
                    <button class="btn meal-details-btn" data-meal='${JSON.stringify(meal)}' data-meal-type="${mealType}" data-date="${menuDate}">
                        Ver detalles
                    </button>
                    ` : ''}
                </div>
            </div>
        `;
  }

  // Generar IDs más únicos para evitar conflictos
  generateCountdownId(mealType, menuDate, suffix = '') {
    // Limpiar la fecha para usarla en ID (remover caracteres especiales)
    const cleanDate = menuDate.replace(/-/g, '');
    return `countdown-${mealType}-${cleanDate}${suffix ? '-' + suffix : ''}`;
  }

  createEmptyMealCard(title) {
    return `
            <div class="meal-card empty">
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
                    <div class="meal-status-indicator finished">
                        No programado
                    </div>
                </div>
                <div class="meal-card-content">
                    <h4 class="meal-name">No hay servicio</h4>
                    <p class="meal-description">No se ha programado ${title.toLowerCase()} para este día.</p>
                </div>
            </div>
        `;
  }

  // Y en el método registerAllCountdowns, agregar el registro para createMealCard
  registerAllCountdowns(classified) {
    // Registrar todos los contadores para todas las secciones
    const allMenus = [...classified.today, ...classified.upcoming, ...classified.attended];

    allMenus.forEach(menu => {
      if (menu.breakfast) {
        const breakfastId = this.generateCountdownId('breakfast', menu.date);
        this.registerCountdown(breakfastId, menu.breakfast, 'breakfast', menu.date);
      }
      if (menu.lunch) {
        const lunchId = this.generateCountdownId('lunch', menu.date);
        this.registerCountdown(lunchId, menu.lunch, 'lunch', menu.date);
      }
    });
  }

  calculateMealStatus(meal, menuDate) {
    const now = new Date();
    const today = this.formatDate(now);

    // Verificar si el menú es para hoy
    if (menuDate !== today) {
      const menuDateObj = new Date(menuDate);
      if (menuDateObj > now) {
        // Menú futuro - calcular tiempo hasta el inicio
        const startTime = new Date(`${menuDate}T${meal.start}`);
        const timeRemaining = startTime - now;
        return {
          status: 'pending',
          timeRemaining: this.calculateTimeUnits(timeRemaining)
        };
      } else {
        // Menú pasado - completado
        return { status: 'completed', timeRemaining: null };
      }
    }

    // Para menús de hoy, calcular tiempos exactos
    const startTime = new Date(`${today}T${meal.start}`);
    const endTime = new Date(`${today}T${meal.end}`);

    if (now < startTime) {
      // Evento pendiente - contar hacia startTime
      const timeRemaining = startTime - now;
      return {
        status: 'pending',
        timeRemaining: this.calculateTimeUnits(timeRemaining)
      };
    } else if (now >= startTime && now <= endTime) {
      // Evento en proceso - contar hacia endTime
      const timeRemaining = endTime - now;
      return {
        status: 'in-progress',
        timeRemaining: this.calculateTimeUnits(timeRemaining)
      };
    } else {
      // Evento completado
      return { status: 'completed', timeRemaining: null };
    }
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
      seconds: Math.max(0, seconds),
      totalMs: timeInMs
    };
  }

  getStatusClass(status) {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return 'status-unknown';
    }
  }

  getStatusText(status) {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'in-progress': return 'En proceso';
      case 'completed': return 'Completado';
      default: return 'Estado desconocido';
    }
  }

  renderCountdownContent(status, timeRemaining, mealType) {
    const mealName = mealType === 'breakfast' ? 'desayuno' : 'almuerzo';

    // Si timeRemaining es null (estado completado)
    if (timeRemaining === null) {
      return `
            <div class="meal-status-badge completed">
                <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span>Completado</span>
            </div>
        `;
    }

    switch (status) {
      case 'pending':
        if (timeRemaining.days > 0) {
          return `
                    <div class="countdown-label">Comienza en</div>
                    <div class="digital-counter">
                        <div class="time-block">
                            <span class="time-value">${this.padZero(timeRemaining.days)}</span>
                            <span class="time-label">DÍAS</span>
                        </div>
                        <span class="time-separator">:</span>
                        <div class="time-block">
                            <span class="time-value">${this.padZero(timeRemaining.hours)}</span>
                            <span class="time-label">HRS</span>
                        </div>
                        <span class="time-separator">:</span>
                        <div class="time-block">
                            <span class="time-value">${this.padZero(timeRemaining.minutes)}</span>
                            <span class="time-label">MIN</span>
                        </div>
                    </div>
                `;
        } else {
          return `
                    <div class="countdown-label">Falta para el ${mealName}</div>
                    <div class="digital-counter">
                        <div class="time-block">
                            <span class="time-value">${this.padZero(timeRemaining.hours)}</span>
                            <span class="time-label">HRS</span>
                        </div>
                        <span class="time-separator">:</span>
                        <div class="time-block">
                            <span class="time-value">${this.padZero(timeRemaining.minutes)}</span>
                            <span class="time-label">MIN</span>
                        </div>
                        <span class="time-separator">:</span>
                        <div class="time-block">
                            <span class="time-value">${this.padZero(timeRemaining.seconds)}</span>
                            <span class="time-label">SEG</span>
                        </div>
                    </div>
                `;
        }

      case 'in-progress':
        return `
                <div class="countdown-label">Tiempo restante</div>
                <div class="digital-counter">
                    <div class="time-block">
                        <span class="time-value">${this.padZero(timeRemaining.hours)}</span>
                        <span class="time-label">HRS</span>
                    </div>
                    <span class="time-separator">:</span>
                    <div class="time-block">
                        <span class="time-value">${this.padZero(timeRemaining.minutes)}</span>
                        <span class="time-label">MIN</span>
                    </div>
                    <span class="time-separator">:</span>
                    <div class="time-block">
                        <span class="time-value">${this.padZero(timeRemaining.seconds)}</span>
                        <span class="time-label">SEG</span>
                    </div>
                </div>
            `;

      case 'completed':
        return `
                <div class="meal-status-badge completed">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    <span>Completado</span>
                </div>
            `;

      default:
        return `
                <div class="meal-status-badge unknown">
                    <span>Estado desconocido</span>
                </div>
            `;
    }
  }

  padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  updateAllCountdowns() {
    this.countdowns.forEach((config, containerId) => {
      const { meal, mealType, menuDate } = config;
      const container = document.getElementById(containerId);

      if (container) {
        const { status, timeRemaining } = this.calculateMealStatus(meal, menuDate);
        const safeTimeRemaining = timeRemaining || null;

        // Determinar qué estilo de contador usar basado en el ID
        if (containerId.includes('sidebar')) {
          container.innerHTML = this.renderSidebarCountdownContent(status, safeTimeRemaining, mealType);

          // Actualizar también el estado en la tarjeta del sidebar
          const mealCard = container.closest('.sidebar-meal-card');
          if (mealCard) {
            const statusElement = mealCard.querySelector('.sidebar-meal-status');
            if (statusElement) {
              statusElement.className = 'sidebar-meal-status ' + this.getStatusClass(status);
              statusElement.textContent = this.getStatusText(status);
            }
          }
        } else {
          container.innerHTML = this.renderCountdownContent(status, safeTimeRemaining, mealType);

          // Actualizar también el indicador de estado en la imagen
          const mealCard = container.closest('.meal-card');
          if (mealCard) {
            const statusIndicator = mealCard.querySelector('.meal-status-indicator');
            if (statusIndicator) {
              statusIndicator.className = 'meal-status-indicator ' + this.getStatusClass(status);
              statusIndicator.textContent = this.getStatusText(status);
            }
          }
        }
      }
    });
  }

  registerCountdown(containerId, meal, mealType, menuDate) {
    this.countdowns.set(containerId, { meal, mealType, menuDate });

    const { status, timeRemaining } = this.calculateMealStatus(meal, menuDate);
    const container = document.getElementById(containerId);

    if (container) {
      // Determinar qué estilo de contador usar basado en el ID
      if (containerId.includes('sidebar')) {
        container.innerHTML = this.renderSidebarCountdownContent(status, timeRemaining, mealType);
      } else {
        container.innerHTML = this.renderCountdownContent(status, timeRemaining, mealType);
      }
    }
  }

  renderTodayMenu(menu) {
    const todayMenuSection = document.getElementById('menu-del-dia');
    if (!todayMenuSection) return;


    if (!menu) {
      todayMenuSection.innerHTML = `
            <div class="sidebar-empty-meal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <p>No hay menú programado para hoy</p>
            </div>
        `;
      return;
    }

    let content = '';

    if (menu.breakfast) {
      const breakfastId = `sidebar-breakfast-countdown-${menu.date.replace(/-/g, '')}`;
      content += this.createMealCardFull(menu.breakfast, 'Desayuno', menu.date, breakfastId);
    } else {
      content += this.createMealCardFull(null, 'Desayuno', menu.date);
    }

    if (menu.breakfast && menu.lunch) {
      content += '<div class="sidebar-meal-divider"></div>';
    }

    if (menu.lunch) {
      const lunchId = `sidebar-lunch-countdown-${menu.date.replace(/-/g, '')}`;
      content += this.createMealCardFull(menu.lunch, 'Almuerzo', menu.date, lunchId);
    } else {
      content += this.createMealCardFull(null, 'Almuerzo', menu.date);
    }

    todayMenuSection.innerHTML = content;

    // Registrar contadores
    if (menu.breakfast) {
      const breakfastId = `sidebar-breakfast-countdown-${menu.date.replace(/-/g, '')}`;
      this.registerCountdown(breakfastId, menu.breakfast, 'breakfast', menu.date);
    }

    if (menu.lunch) {
      const lunchId = `sidebar-lunch-countdown-${menu.date.replace(/-/g, '')}`;
      this.registerCountdown(lunchId, menu.lunch, 'lunch', menu.date);
    }
  }

  createMealCardFull(meal, title, menuDate = '', countdownId = '') {
    const mealType = title.toLowerCase();
    const finalCountdownId = countdownId || this.generateCountdownId(mealType, menuDate, 'sidebar');

    // Registrar el contador si existe la comida
    if (meal) {
      this.registerCountdown(finalCountdownId, meal, mealType, menuDate);
    }

    // Calcular estado inicial para mostrar inmediatamente
    const { state } = this.calculateMealStatus(meal, menuDate);
    const statusClass = this.getStatusClass(state);

    // Si no hay comida, mostrar estado vacío
    if (!meal) {
      return `
            <div class="sidebar-meal-card" data-meal="null" data-meal-type="${mealType}" data-date="${menuDate}">
                <div class="sidebar-empty-meal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <p>No hay ${title.toLowerCase()} programado</p>
                </div>
            </div>
        `;
    }

    return `
        <div class="sidebar-meal-card" data-meal='${JSON.stringify(meal)}' 
             data-meal-type="${mealType}" data-date="${menuDate}">
            <div class="sidebar-meal-header">
                <div class="sidebar-meal-time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>${meal.start} - ${meal.end}</span>
                </div>
                <span class="sidebar-meal-type ${mealType}">
                    ${mealType === 'desayuno' ? 'Desayuno' : 'Almuerzo'}
                </span>
            </div>
            
            <div class="sidebar-meal-content">
                <div class="sidebar-meal-image">
                    <img src="${meal.image || 'assets/img/default-food.jpg'}" alt="${meal.name}">
                </div>
                <div class="sidebar-meal-info">
                    <h4 class="sidebar-meal-name">${meal.name}</h4>
                    <p class="sidebar-meal-description">${meal.description || 'Descripción no disponible'}</p>
                </div>
            </div>
            
            <div class="sidebar-meal-footer">
                <div class="sidebar-meal-status ${statusClass}">
                    ${this.getStatusText(state)}
                </div>
                <div id="${finalCountdownId}" class="sidebar-countdown"></div>
            </div>
        </div>
    `;
  }

  // Función para renderizar el contador en formato sidebar
  renderSidebarCountdownContent(status, timeRemaining, mealType) {
    if (timeRemaining === null) {
      return `<span>Completado</span>`;
    }

    switch (status) {
      case 'pending':
        if (timeRemaining.days > 0) {
          return `
                    <div class="sidebar-compact-counter">
                        <div class="sidebar-time-block">
                            <span class="sidebar-time-value">${this.padZero(timeRemaining.days)}</span>
                            <span class="sidebar-time-label">d</span>
                        </div>
                        <span class="sidebar-time-separator">:</span>
                        <div class="sidebar-time-block">
                            <span class="sidebar-time-value">${this.padZero(timeRemaining.hours)}</span>
                            <span class="sidebar-time-label">h</span>
                        </div>
                    </div>
                `;
        } else {
          return `
                    <div class="sidebar-compact-counter">
                        <div class="sidebar-time-block">
                            <span class="sidebar-time-value">${this.padZero(timeRemaining.hours)}</span>
                            <span class="sidebar-time-label">h</span>
                        </div>
                        <span class="sidebar-time-separator">:</span>
                        <div class="sidebar-time-block">
                            <span class="sidebar-time-value">${this.padZero(timeRemaining.minutes)}</span>
                            <span class="sidebar-time-label">m</span>
                        </div>
                        <div class="sidebar-time-block">
                            <span class="sidebar-time-value">${this.padZero(timeRemaining.seconds)}</span>
                            <span class="sidebar-time-label">m</span>
                        </div>
                    </div>
                `;
        }

      case 'in-progress':
        return `
                <div class="sidebar-compact-counter">
                    <div class="sidebar-time-block">
                        <span class="sidebar-time-value">${this.padZero(timeRemaining.hours)}</span>
                        <span class="sidebar-time-label">h</span>
                    </div>
                    <span class="sidebar-time-separator">:</span>
                    <div class="sidebar-time-block">
                        <span class="sidebar-time-value">${this.padZero(timeRemaining.minutes)}</span>
                        <span class="sidebar-time-label">m</span>
                    </div>
                    <span class="sidebar-time-separator">:</span>
                    <div class="sidebar-time-block">
                        <span class="sidebar-time-value">${this.padZero(timeRemaining.seconds)}</span>
                        <span class="sidebar-time-label">s</span>
                    </div>
                </div>
            `;

      case 'completed':
        return `<span>Completado</span>`;

      default:
        return `<span>--:--</span>`;
    }
  }

  renderUpcomingMenus(menus) {
    const upcomingMenusSection = document.getElementById('upcoming-menus');
    if (!upcomingMenusSection) return;

    if (!menus || menus.length === 0) {
      upcomingMenusSection.innerHTML = '<div class="empty-menu"><p>No hay próximos menús</p></div>';
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

    upcomingMenusSection.innerHTML = content;
  }

  renderSupportSchedule() {
    const supportScheduleSection = document.getElementById('support-schedule');
    if (!supportScheduleSection) return;

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

    supportScheduleSection.innerHTML = scheduleHTML;
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      // 1. Manejar clic en botones de detalles (si aún existen)
      const detailsBtn = e.target.closest('.meal-details-btn');
      if (detailsBtn) {
        e.preventDefault();
        this.handleMealDetailsClick(detailsBtn);
        return; // Salir después de manejar este evento
      }

      // 2. Manejar clic en tarjetas del sidebar
      const sidebarCard = e.target.closest('.sidebar-meal-card');
      if (sidebarCard) {
        e.preventDefault();
        this.handleSidebarCardClick(sidebarCard);
        return; // Salir después de manejar este evento
      }

      // 3. Manejar clic en elementos de lista (si los tienes)
      const listItem = e.target.closest('.meal-list-item');
      if (listItem) {
        e.preventDefault();
        this.handleListItemClick(listItem);
        return; // Salir después de manejar este evento
      }
    });
  }


  handleMealDetailsClick(btn) {
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

  handleSidebarCardClick(card) {
    const mealDataStr = card.getAttribute('data-meal');

    // Verificar si la tarjeta tiene datos de comida (no es una tarjeta vacía)
    if (mealDataStr && mealDataStr !== '' && mealDataStr !== 'null') {
      try {
        const mealData = JSON.parse(mealDataStr);
        const mealType = card.getAttribute('data-meal-type');
        const date = card.getAttribute('data-date');

        // Encontrar el menú completo
        let menuInfo = {};
        const menuSection = card.closest('.sidebar-widget');

        if (menuSection) {
          // Buscar información adicional si está disponible
          const menuTitle = menuSection.querySelector('h3')?.textContent;
          if (menuTitle && menuTitle.includes('Hoy')) {
            const today = this.formatDate(new Date());
            menuInfo = this.menuData.find(m => m.date === today);
          }
        }

        if (mealData) {
          this.showMealDetails(mealData, mealType, date, menuInfo);
        }
      } catch (error) {
        console.error('Error parsing meal data:', error);
      }
    }
  }

  handleListItemClick(item) {
    const mealDataStr = item.getAttribute('data-meal');

    if (mealDataStr && mealDataStr !== '') {
      try {
        const mealData = JSON.parse(mealDataStr);
        const mealType = item.getAttribute('data-meal-type');
        const date = item.getAttribute('data-date');

        // Encontrar el menú completo
        let menuInfo = {};
        const menuCard = item.closest('.menu-card');

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
      } catch (error) {
        console.error('Error parsing meal data:', error);
      }
    }
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
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.countdowns.clear();
  }
}

// Inicialización con manejo de errores
document.addEventListener('DOMContentLoaded', () => {
  try {
    if (typeof weeklyMenu !== 'undefined') {
      window.menuSystem = new MenuCountdownSystem(weeklyMenu);
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