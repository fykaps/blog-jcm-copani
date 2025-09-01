/**
 * Sistema de Menú con Contador Regresivo en Tiempo Real
 * Implementación profesional con buenas prácticas
 */

class MenuCountdownSystem {
    constructor(menuData) {
        this.menuData = menuData;
        this.countdowns = new Map();
        this.updateInterval = null;
        this.currentDate = new Date();

        this.init();
    }

    init() {
        this.renderTodayMenu();
        this.startCountdowns();
    }

    renderTodayMenu() {
        const todayMenuContainer = document.getElementById('menu-del-dia');
        if (!todayMenuContainer) return;

        const today = this.formatDate(this.currentDate);
        const todayMenu = this.menuData.find(menu => menu.date === today);

        if (!todayMenu) {
            todayMenuContainer.innerHTML = `
                <div class="empty-menu">
                    <p>No hay menú programado para hoy</p>
                </div>
            `;
            return;
        }

        let content = `
            <div class="menu-header">
                <h3 class="menu-title">Menú del Día</h3>
                <span class="menu-date">${todayMenu.day}, ${this.formatDisplayDate(todayMenu.date)}</span>
            </div>
            <div class="meal-cards">
        `;

        // Desayuno
        if (todayMenu.breakfast) {
            const breakfastId = `breakfast-${todayMenu.date.replace(/-/g, '')}`;
            content += this.createMealCard(todayMenu.breakfast, 'Desayuno', todayMenu.date, breakfastId, todayMenu.helpers);
        }

        // Almuerzo
        if (todayMenu.lunch) {
            const lunchId = `lunch-${todayMenu.date.replace(/-/g, '')}`;
            content += this.createMealCard(todayMenu.lunch, 'Almuerzo', todayMenu.date, lunchId, todayMenu.helpers);
        }

        content += '</div>';

        todayMenuContainer.innerHTML = content;

        // Registrar contadores después de renderizar
        if (todayMenu.breakfast) {
            const breakfastId = `breakfast-${todayMenu.date.replace(/-/g, '')}`;
            this.registerCountdown(breakfastId, todayMenu.breakfast, todayMenu.date);
        }

        if (todayMenu.lunch) {
            const lunchId = `lunch-${todayMenu.date.replace(/-/g, '')}`;
            this.registerCountdown(lunchId, todayMenu.lunch, todayMenu.date);
        }
    }

    createMealCard(meal, type, date, countdownId, helpers) {
        const mealType = type.toLowerCase();

        return `
            <div class="meal-card">
                <div class="meal-card-header">
                    <span class="meal-type">${type}</span>
                    <span class="meal-time">${meal.start} - ${meal.end}</span>
                </div>
                <div class="meal-card-content">
                    <h4 class="meal-name">${meal.name}</h4>
                    <p class="meal-description">${meal.description}</p>
                    
                    <div id="${countdownId}" class="countdown-container animate-countdown">
                        <!-- El contador se actualizará aquí -->
                    </div>
                    
                    <div class="meal-helpers">
                        <span class="helpers-label">Madres ayudantes:</span>
                        ${helpers.names.join(' y ')} (${helpers.grade})
                    </div>
                </div>
            </div>
        `;
    }

    calculateMealStatus(meal, menuDate) {
        const now = new Date();
        const today = this.formatDate(now);

        // Verificar si el menú es para hoy
        if (menuDate !== today) {
            const menuDateObj = new Date(menuDate);
            if (menuDateObj > now) {
                return { status: 'pending', timeRemaining: null };
            } else {
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

    renderCountdownContent(status, timeRemaining, mealType) {
        const mealName = mealType === 'breakfast' ? 'desayuno' : 'almuerzo';

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
                        <div class="meal-status status-pending">
                            <span class="status-badge">
                                <svg viewBox="0 0 24 24" width="12" height="12">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                </svg>
                                Pendiente
                            </span>
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
                        <div class="meal-status status-pending">
                            <span class="status-badge">
                                <svg viewBox="0 0 24 24" width="12" height="12">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                </svg>
                                Pendiente
                            </span>
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
                    <div class="meal-status status-in-progress">
                        <span class="status-badge">
                            <svg viewBox="0 0 24 24" width="12" height="12">
                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                            </svg>
                            En proceso
                        </span>
                    </div>
                `;

            case 'completed':
                return `
                    <div class="meal-status status-completed">
                        <span class="status-badge">
                            <svg viewBox="0 0 24 24" width="12" height="12">
                                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                            </svg>
                            Completado
                        </span>
                    </div>
                `;

            default:
                return `
                    <div class="meal-status status-completed">
                        <span class="status-badge">
                            Estado desconocido
                        </span>
                    </div>
                `;
        }
    }

    registerCountdown(containerId, meal, menuDate) {
        this.countdowns.set(containerId, { meal, menuDate });

        // Actualizar inmediatamente
        this.updateCountdown(containerId);
    }

    updateCountdown(containerId) {
        const config = this.countdowns.get(containerId);
        if (!config) return;

        const { meal, menuDate } = config;
        const container = document.getElementById(containerId);

        if (!container) return;

        const { status, timeRemaining } = this.calculateMealStatus(meal, menuDate);
        const mealType = containerId.startsWith('breakfast') ? 'breakfast' : 'lunch';

        container.innerHTML = this.renderCountdownContent(status, timeRemaining, mealType);
    }

    updateAllCountdowns() {
        this.countdowns.forEach((config, containerId) => {
            this.updateCountdown(containerId);
        });
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

        // Actualizar inmediatamente
        this.updateAllCountdowns();
    }

    padZero(num) {
        return num < 10 ? `0${num}` : num;
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
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.countdowns.clear();
    }
}

// Inicialización del sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (typeof weeklyMenu !== 'undefined') {
        window.menuSystem = new MenuCountdownSystem(weeklyMenu);
    } else {
        console.error('Error: weeklyMenu no está definido');
        const menuContainer = document.getElementById('menu-del-dia');
        if (menuContainer) {
            menuContainer.innerHTML = `
                <div class="empty-menu">
                    <p>Error al cargar los datos del menú</p>
                </div>
            `;
        }
    }
});