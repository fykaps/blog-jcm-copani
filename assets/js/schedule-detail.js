/**
 * Sistema de Detalle de Horarios - Versión Mejorada
 * Con el mismo diseño y funcionalidades que schedule.js
 * CORREGIDO: Problemas de zona horaria en fechas
 */

// ======================
//  UTILIDADES DE FECHA (CORREGIDAS) - AÑADIDAS
// ======================

/**
 * Parsear fecha local sin problemas de zona horaria
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {Date} - Objeto Date correctamente ajustado
 */
function parseLocalDate(dateStr) {
    if (!dateStr) return new Date();

    const parts = dateStr.split('-');
    if (parts.length !== 3) return new Date(dateStr);

    // Crear fecha en zona horaria local (sin ajuste UTC)
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
}

/**
 * Formatear fecha local para mostrar
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {string} - Fecha formateada
 */
function formatLocalDate(dateStr) {
    const date = parseLocalDate(dateStr);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

/**
 * Obtener día del mes sin problemas de zona horaria
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {number} - Día del mes
 */
function getLocalDay(dateStr) {
    const date = parseLocalDate(dateStr);
    return date.getDate();
}

/**
 * Obtener nombre del mes
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {string} - Nombre del mes
 */
function getLocalMonthName(dateStr) {
    const date = parseLocalDate(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'long' });
}

/**
 * Obtener nombre corto del mes
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {string} - Nombre corto del mes
 */
function getLocalShortMonthName(dateStr) {
    const date = parseLocalDate(dateStr);
    return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
}

/**
 * Formatear fecha completa en español
 * @param {string} dateStr - Fecha en formato YYYY-MM-DD
 * @returns {string} - Fecha completa formateada
 */
function formatFullLocalDate(dateStr) {
    const date = parseLocalDate(dateStr);
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

class CountdownSystem {
    constructor(options = {}) {
        // Configuración por defecto
        this.defaultOptions = {
            precision: 'seconds',
            updateInterval: 1000,
            autoStart: true,
            onTick: null,
            onComplete: null,
            format: 'compact'
        };

        // Fusionar opciones
        this.options = { ...this.defaultOptions, ...options };

        // Estado interno
        this.targetDate = null;
        this.isRunning = false;
        this.intervalId = null;
        this.lastUpdate = null;

        // Métodos bindeados
        this.tick = this.tick.bind(this);
    }

    /**
     * Inicializar cuenta regresiva
     */
    init(targetDate, container) {
        this.targetDate = this.parseDate(targetDate);
        this.container = container;

        if (!this.targetDate || !this.container) {
            console.error('CountdownSystem: Fecha objetivo o contenedor no válidos');
            return this;
        }

        this.render();

        if (this.options.autoStart) {
            this.start();
        }

        return this;
    }

    /**
     * Parsear diferentes formatos de fecha (CORREGIDO)
     */
    parseDate(date) {
        if (date instanceof Date) return date;
        if (typeof date === 'string') {
            // Si es un string de tiempo (HH:MM), crear fecha con hora actual
            if (date.includes(':')) {
                const now = new Date();
                const [hours, minutes] = date.split(':').map(Number);
                return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            }
            // Si es un string de fecha, usar parseLocalDate
            return parseLocalDate(date);
        }
        if (typeof date === 'number') return new Date(date);

        console.error('CountdownSystem: Formato de fecha no válido');
        return null;
    }

    /**
     * Iniciar cuenta regresiva
     */
    start() {
        if (this.isRunning || !this.targetDate) return;

        this.isRunning = true;
        this.lastUpdate = Date.now();

        // Ejecutar primer tick inmediatamente
        this.tick();

        // Configurar intervalo
        this.intervalId = setInterval(this.tick, this.options.updateInterval);
    }

    /**
     * Detener cuenta regresiva
     */
    stop() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    /**
     * Actualizar cuenta regresiva
     */
    tick() {
        const now = Date.now();
        const timeRemaining = this.targetDate.getTime() - now;

        if (timeRemaining <= 0) {
            this.complete();
            return;
        }

        // Calcular unidades de tiempo
        const timeUnits = this.calculateTimeUnits(timeRemaining);

        // Renderizar en el contenedor
        this.render(timeUnits);

        // Llamar callback onTick si existe
        if (typeof this.options.onTick === 'function') {
            this.options.onTick(timeUnits, timeRemaining);
        }

        this.lastUpdate = now;
    }

    /**
     * Calcular unidades de tiempo
     */
    calculateTimeUnits(timeRemaining) {
        const totalSeconds = Math.floor(timeRemaining / 1000);
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
            totalMs: timeRemaining,
            totalSeconds: totalSeconds
        };
    }

    /**
     * Renderizar cuenta regresiva
     */
    render(timeUnits = null) {
        if (!this.container) return;

        if (!timeUnits) {
            // Estado inicial
            this.container.innerHTML = this.createSkeleton();
            return;
        }

        this.container.innerHTML = this.createCountdownHTML(timeUnits);
    }

    /**
     * Crear HTML del esqueleto
     */
    createSkeleton() {
        return `
            <div class="countdown-skeleton">
                <span class="countdown-unit skeleton"></span>
                <span class="countdown-unit skeleton"></span>
                <span class="countdown-unit skeleton"></span>
                <span class="countdown-unit skeleton"></span>
            </div>
        `;
    }

    /**
     * Crear HTML de la cuenta regresiva
     */
    createCountdownHTML(timeUnits) {
        const { days, hours, minutes, seconds } = timeUnits;

        switch (this.options.format) {
            case 'minimal':
                return this.createMinimalHTML(timeUnits);
            case 'detailed':
                return this.createDetailedHTML(timeUnits);
            case 'compact':
            default:
                return this.createCompactHTML(timeUnits);
        }
    }

    createCompactHTML({ days, hours, minutes, seconds }) {
        return `
            <div class="countdown-compact" role="timer" aria-live="polite">
                ${days > 0 ? `
                    <div class="countdown-unit">
                        <span class="countdown-value">${this.formatNumber(days)}</span>
                        <span class="countdown-label">días</span>
                    </div>
                ` : ''}
                <div class="countdown-unit">
                    <span class="countdown-value">${this.formatNumber(hours)}</span>
                    <span class="countdown-label">horas</span>
                </div>
                <div class="countdown-unit">
                    <span class="countdown-value">${this.formatNumber(minutes)}</span>
                    <span class="countdown-label">min</span>
                </div>
                <div class="countdown-unit">
                    <span class="countdown-value">${this.formatNumber(seconds)}</span>
                    <span class="countdown-label">seg</span>
                </div>
            </div>
        `;
    }

    createDetailedHTML({ days, hours, minutes, seconds }) {
        return `
            <div class="countdown-detailed" role="timer" aria-live="polite">
                <div class="countdown-grid">
                    <div class="countdown-item">
                        <div class="countdown-number">${this.formatNumber(days)}</div>
                        <div class="countdown-text">Días</div>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <div class="countdown-number">${this.formatNumber(hours)}</div>
                        <div class="countdown-text">Horas</div>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <div class="countdown-number">${this.formatNumber(minutes)}</div>
                        <div class="countdown-text">Minutos</div>
                    </div>
                    <div class="countdown-separator">:</div>
                    <div class="countdown-item">
                        <div class="countdown-number">${this.formatNumber(seconds)}</div>
                        <div class="countdown-text">Segundos</div>
                    </div>
                </div>
            </div>
        `;
    }

    createMinimalHTML({ days, hours, minutes, seconds }) {
        const parts = [];

        if (days > 0) parts.push(`${days}d`);
        if (hours > 0 || days > 0) parts.push(`${hours}h`);
        if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
        parts.push(`${seconds}s`);

        return `
            <div class="countdown-minimal" role="timer" aria-live="polite">
                ${parts.join(' : ')}
            </div>
        `;
    }

    /**
     * Formatear números (añadir cero inicial)
     */
    formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    /**
     * Manejar finalización
     */
    complete() {
        this.stop();

        this.container.innerHTML = `
            <div class="countdown-complete">
                <span class="complete-text">¡Tiempo completado!</span>
            </div>
        `;

        if (typeof this.options.onComplete === 'function') {
            this.options.onComplete();
        }
    }

    /**
     * Actualizar fecha objetivo
     */
    updateTargetDate(newDate) {
        const parsedDate = this.parseDate(newDate);
        if (!parsedDate) return;

        this.targetDate = parsedDate;

        // Reiniciar si estaba corriendo
        if (this.isRunning) {
            this.stop();
            this.start();
        } else {
            this.render();
        }
    }

    /**
     * Destruir instancia (cleanup)
     */
    destroy() {
        this.stop();
        this.container = null;
        this.targetDate = null;
    }
}


class ScheduleDetailSystem {
    constructor() {
        this.icons = {
            clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
            class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
            teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
            arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`,
            phone: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>`,
            email: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
            close: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
        };

        this.currentTab = null;
        this.intervals = [];
        this.countdownInstances = [];
        this.init();
    }

    // ===== FUNCIONES DE UTILIDAD DE TIEMPO =====

    getCurrentTime() {
        const now = new Date();
        return now.toTimeString().slice(0, 5); // Formato HH:MM
    }

    getDayName(date = new Date()) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[date.getDay()];
    }

    getDayIndex(dayName) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days.indexOf(dayName);
    }

    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    formatCountdown(minutes) {
        if (minutes <= 0) return '0m 0s';

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    }

    // ===== FUNCIONES PRINCIPALES =====

    init() {
        this.displayGradeSchedule();
        this.startRealTimeUpdates();
        this.setupEventListeners();
    }


    displayGradeSchedule() {
        const container = document.getElementById('grade-schedule-detail');
        if (!container) return;

        const urlParams = new URLSearchParams(window.location.search);
        const grade = urlParams.get('grade');
        const day = urlParams.get('day') || this.getDayName();

        if (!grade) {
            this.showErrorMessage(container);
            return;
        }

        this.showLoadingState(container);

        // Cargar datos de forma asíncrona
        setTimeout(() => {
            try {
                const fullSchedule = getFullScheduleByGrade(grade);
                const currentTime = this.getCurrentTime();

                const { tabsHtml, contentHtml } = this.createScheduleTabs(grade, day, fullSchedule, currentTime);

                container.innerHTML = `
                        <!-- Hero para Detalle de Horario -->
        <section class="detail-hero detail-hero-schedule animate-fade-in">
            <div class="detail-hero-decoration detail-hero-decoration-line"></div>
            <div class="detail-hero-decoration detail-hero-decoration-line"></div>
            
            <div class="detail-hero-image" aria-hidden="true">
                <img src="assets/img/heros/schedule-detail-hero.jpg" alt="" loading="eager" decoding="async">
            </div>
            
            <div class="detail-hero-content">
                <nav class="detail-breadcrumb animate-fade-in" aria-label="Miga de pan">
                    <ol class="detail-breadcrumb-list">
                        <li class="detail-breadcrumb-item">
                            <a href="index.html" class="detail-breadcrumb-link">Inicio</a>
                        </li>
                        <li class="detail-breadcrumb-item">
                            <a href="schedule.html" class="detail-breadcrumb-link">Horarios</a>
                        </li>
                        <li class="detail-breadcrumb-item">
                            <span class="detail-breadcrumb-current">Detalle</span>
                        </li>
                    </ol>
                </nav>
                
                <div class="detail-hero-badges animate-fade-in">
                    <span class="detail-hero-badge" id="schedule-grade">${grade}</span>
                    <span class="detail-hero-badge">Horario Semanal</span>
                </div>
                
                <h1 class="animate-slide-up">Horario de Clases</h1>
                
                <p class="detail-hero-description animate-slide-up delay-1">
                    Consulta el horario detallado con información completa de clases,
                    profesores y actividades programadas para esta semana.
                </p>
                
                <div class="detail-hero-meta animate-fade-in delay-2">
                    <div class="detail-meta-item">
                        <svg class="detail-meta-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        <span id="current-time">${currentTime}</span>
                    </div>
                </div>
            </div>
        </section>

                ${tabsHtml}
                ${contentHtml}`;

                this.currentTab = day;
                this.initializeTabInteractions();
                this.initializeAllCountdowns();

            } catch (error) {
                console.error('Error loading schedule:', error);
                this.showErrorState(container, 'Error al cargar el horario');
            }
        }, 500);
    }

    createScheduleTabs(grade, activeDay, fullSchedule, currentTime) {
        let tabsHtml = '<div class="schedule-tabs" role="tablist" aria-label="Días de la semana">';
        let contentHtml = '<div class="schedule-tab-content">';

        const daysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

        daysOrder.forEach(dayName => {
            const isActive = dayName === activeDay;
            const tabId = `tab-${dayName}`;

            tabsHtml += `
            <button class="tab-btn ${isActive ? 'active' : ''}" 
                    id="tab-btn-${dayName}"
                    role="tab"
                    aria-selected="${isActive}"
                    aria-controls="${tabId}"
                    onclick="scheduleDetailSystem.loadTab('${dayName}')">
                ${dayName}
            </button>`;

            contentHtml += `
            <div class="tab-pane ${isActive ? 'active' : ''}" 
                 id="${tabId}"
                 role="tabpanel"
                 aria-labelledby="tab-btn-${dayName}"
                 ${isActive ? '' : 'hidden'}>
                ${fullSchedule[dayName] && fullSchedule[dayName].length > 0 ?
                    `<div class="grade-section">
                        <ul class="class-list">
                            ${fullSchedule[dayName].map(cls => this.renderClassItem(cls, currentTime, dayName)).join('')}
                        </ul>
                    </div>` :
                    `<p class="no-classes">No hay clases programadas para este día.</p>`
                }
            </div>`;
        });

        tabsHtml += '</div>';
        contentHtml += '</div>';

        return { tabsHtml, contentHtml };
    }

    renderClassItem(cls, currentTime, dayName) {
        const today = new Date();
        const currentDayName = this.getDayName(today);
        const isToday = dayName === currentDayName;
        const isPast = this.getDayIndex(dayName) < this.getDayIndex(currentDayName);

        let status;

        if (isToday) {
            status = this.getClassStatus(cls);
        } else if (isPast) {
            status = {
                status: 'completed',
                text: 'Completada',
                class: 'status-completed',
                timeRemaining: 0
            };
        } else {
            const daysDiff = this.calculateDaysDifference(dayName, currentDayName);
            status = this.getFutureClassStatus(cls.start, cls.end, currentTime, daysDiff);
        }

        const isBreak = cls.isBreak || cls.subject === "Receso";
        const teacherInfo = getTeacherInfo(cls.teacher);

        // ID único para el contenedor del countdown
        const countdownId = `countdown-${cls.start}-${cls.end}-${Math.random().toString(36).substr(2, 9)}`;

        // Crear elemento para el tipo de clase (si no es receso)
        let typeHTML = '';
        if (!isBreak && cls.type && cls.type !== "Normal") {
            typeHTML = `<span class="class-type">${cls.type}</span>`;
        }

        let countdownHTML = '';
        if (status.timeRemaining > 0) {
            countdownHTML = `
                <div class="countdown-container" id="${countdownId}">
                    <div class="countdown-skeleton">
                        <span class="countdown-unit skeleton"></span>
                        <span class="countdown-unit skeleton"></span>
                    </div>
                </div>
            `;
        }

        if (isBreak) {
            return `
            <li class="class-item ${status.class} recess-item" 
                data-start="${cls.start}" 
                data-end="${cls.end}"
                data-countdown-id="${countdownId}">
                <div class="class-content">
                    <span class="class-time">${this.icons.clock} ${cls.start} - ${cls.end}</span>
                    <span class="class-subject">${cls.subject}</span>
                    <span class="class-status">${status.status === 'in-progress' ? 'En receso' : status.text}</span>
                    ${countdownHTML}
                </div>
            </li>`;
        }

        return `
        <li class="class-item ${status.class}" 
            data-start="${cls.start}" 
            data-end="${cls.end}"
            data-countdown-id="${countdownId}">
            <div class="class-content">
                <span class="class-time">${this.icons.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${this.icons.class} ${cls.subject}</span>
                <span class="class-teacher" data-teacher="${cls.teacher}">
                    ${this.icons.teacher} ${cls.teacher}
                </span>
                <span class="class-status">${status.text}</span>
                ${countdownHTML}
                ${typeHTML}
            </div>
        </li>`;
    }

    getClassStatus(cls) {
        const start = this.timeToMinutes(cls.start);
        const end = this.timeToMinutes(cls.end);
        const now = this.timeToMinutes(this.getCurrentTime());

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
                text: 'En curso',
                class: 'status-in-progress',
                timeRemaining: end - now
            };
        } else {
            return {
                status: 'completed',
                text: 'Completada',
                class: 'status-completed',
                timeRemaining: 0
            };
        }
    }

    calculateDaysDifference(targetDay, currentDay) {
        const daysOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const currentIndex = daysOrder.indexOf(currentDay);
        const targetIndex = daysOrder.indexOf(targetDay);

        let diff = targetIndex - currentIndex;
        if (diff <= 0) diff += 7;

        return diff;
    }

    getFutureClassStatus(startTime, endTime, currentTime, daysDiff) {
        const now = this.timeToMinutes(currentTime);
        const start = this.timeToMinutes(startTime);
        const end = this.timeToMinutes(endTime);
        const daysInMinutes = daysDiff * 1440;
        const timeToStart = daysInMinutes + (start - now);
        const timeToEnd = daysInMinutes + (end - now);

        if (timeToStart > 0) {
            return {
                status: 'pending',
                text: 'Pendiente',
                class: 'status-pending',
                timeRemaining: timeToStart
            };
        } else if (timeToStart <= 0 && timeToEnd > 0) {
            return {
                status: 'in-progress',
                text: 'En curso',
                class: 'status-in-progress',
                timeRemaining: timeToEnd
            };
        } else {
            return {
                status: 'completed',
                text: 'Completada',
                class: 'status-completed',
                timeRemaining: 0
            };
        }
    }

    initializeAllCountdowns() {
        const classItems = document.querySelectorAll('.class-item, .recess-item');

        classItems.forEach(item => {
            const start = item.dataset.start;
            const end = item.dataset.end;
            const countdownId = item.dataset.countdownId;
            const status = this.getClassStatus({ start, end });

            if (status.timeRemaining > 0 && countdownId) {
                this.initializeCountdown(item, start, end, status, countdownId);
            }
        });
    }

    // ======================
    //  MÉTODOS PRINCIPALES (CON FECHAS CORREGIDAS)
    // ======================

    initializeCountdown(item, startTime, endTime, status, countdownId) {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        let targetDate;
        let message;

        if (status.status === 'pending') {
            // Usar parseLocalDate para crear la fecha correctamente
            targetDate = this.parseTimeToDate(today, startTime);
            message = 'Inicia en';
        } else {
            targetDate = this.parseTimeToDate(today, endTime);
            message = 'Termina en';
        }

        const countdownElement = document.getElementById(countdownId);
        if (!countdownElement) return;

        // Crear nueva instancia de CountdownSystem
        const instance = new CountdownSystem({
            format: 'minimal',
            precision: 'seconds',
            onComplete: () => {
                // Recargar cuando un countdown termine
                this.updateAllStatuses();
            }
        }).init(targetDate, countdownElement);

        this.countdownInstances.push({ instance, element: countdownElement });
    }

    /**
     * Parsear tiempo a fecha sin problemas de zona horaria
     * @param {string} dateStr - Fecha en formato YYYY-MM-DD
     * @param {string} timeStr - Tiempo en formato HH:MM
     * @returns {Date} - Objeto Date correctamente ajustado
     */
    parseTimeToDate(dateStr, timeStr) {
        const date = parseLocalDate(dateStr);
        const [hours, minutes] = timeStr.split(':').map(Number);

        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    loadTab(dayName) {
        const urlParams = new URLSearchParams(window.location.search);
        const grade = urlParams.get('grade');
        const currentTime = this.getCurrentTime();

        // Actualizar URL sin recargar
        const newUrl = `?grade=${encodeURIComponent(grade)}&day=${encodeURIComponent(dayName)}`;
        window.history.pushState(null, '', newUrl);

        // Actualizar pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            const isActive = btn.textContent.trim() === dayName;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        // Actualizar contenido
        document.querySelectorAll('.tab-pane').forEach(pane => {
            const isActive = pane.id === `tab-${dayName}`;
            pane.classList.toggle('active', isActive);
            pane.hidden = !isActive;
        });

        this.currentTab = dayName;

        // Actualizar estados
        this.updateClassStatuses(grade, dayName);

        // Scroll suave a la sección
        document.querySelector('.schedule-tab-content').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    updateClassStatuses(grade, day) {
        const currentTime = this.getCurrentTime();
        const schedule = getScheduleByDayAndGrade(day, grade);
        const today = new Date();
        const currentDayName = this.getDayName(today);
        const isToday = day === currentDayName;
        const isPast = this.getDayIndex(day) < this.getDayIndex(currentDayName);

        const classItems = document.querySelectorAll(`#tab-${day} .class-item, #tab-${day} .recess-item`);

        classItems.forEach((item, index) => {
            const cls = schedule[index];
            if (!cls) return;

            let status;
            if (isToday) {
                status = this.getClassStatus(cls);
            } else if (isPast) {
                status = {
                    status: 'completed',
                    text: 'Completada',
                    class: 'status-completed',
                    timeRemaining: 0
                };
            } else {
                const daysDiff = this.calculateDaysDifference(day, currentDayName);
                status = this.getFutureClassStatus(cls.start, cls.end, currentTime, daysDiff);
            }

            const isBreak = cls.isBreak || cls.subject === "Receso";
            item.className = `${isBreak ? 'recess-item' : 'class-item'} ${status.class}`;

            const statusElement = item.querySelector('.class-status');
            if (statusElement) {
                statusElement.textContent = isBreak && status.status === 'in-progress' ? 'En receso' : status.text;
            }

            // Actualizar countdown si existe
            const countdownId = item.dataset.countdownId;
            if (status.timeRemaining > 0 && countdownId) {
                this.updateCountdown(item, cls.start, cls.end, status, countdownId);
            } else {
                // Limpiar countdown si existe
                const countdownElement = item.querySelector('.countdown-container');
                if (countdownElement) {
                    countdownElement.remove();
                }
            }
        });
    }

    updateCountdown(item, startTime, endTime, status, countdownId) {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        let targetDate;

        if (status.status === 'pending') {
            targetDate = new Date(`${today}T${startTime}`);
        } else {
            targetDate = new Date(`${today}T${endTime}`);
        }

        const countdownElement = document.getElementById(countdownId);
        if (!countdownElement) return;

        // Buscar instancia existente
        const existingInstance = this.countdownInstances.find(inst => inst.element === countdownElement);

        if (existingInstance) {
            // Actualizar fecha objetivo
            existingInstance.instance.updateTargetDate(targetDate);
        } else {
            // Crear nueva instancia si no existe
            this.initializeCountdown(item, startTime, endTime, status, countdownId);
        }
    }

    startRealTimeUpdates() {
        // Actualizar cada minuto
        this.intervals.push(setInterval(() => {
            this.updateAllStatuses();
        }, 60000));

        // Actualizar la hora cada segundo
        this.intervals.push(setInterval(() => {
            this.updateCurrentTime();
        }, 1000));
    }

    updateCurrentTime() {
        const currentTime = this.getCurrentTime();
        const currentTimeElements = document.querySelectorAll('.current-time');

        currentTimeElements.forEach(el => {
            el.textContent = currentTime;
        });
    }

    updateAllStatuses() {
        const urlParams = new URLSearchParams(window.location.search);
        const grade = urlParams.get('grade');
        const day = this.currentTab || urlParams.get('day') || this.getDayName();

        if (grade) {
            this.updateClassStatuses(grade, day);
        }
    }

    showTeacherModal(teacherName) {
        const teacherInfo = getTeacherInfo(teacherName);

        const modal = document.createElement('div');
        modal.className = 'teacher-modal';
        modal.innerHTML = `
            <div class="teacher-modal-overlay"></div>
            <div class="teacher-modal-content">
                <button class="teacher-modal-close" aria-label="Cerrar modal">
                    ${this.icons.close}
                </button>
                
                <div class="teacher-details-header">
                    <div class="teacher-avatar">
                        <svg viewBox="0 0 24 24" width="64" height="64">
                            <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    <h3 class="teacher-name">${teacherName}</h3>
                    <p class="teacher-subject">${teacherInfo.subject}</p>
                </div>
                
                <div class="teacher-contact">
                    <div class="teacher-contact-item">
                        <div class="teacher-contact-icon">
                            ${this.icons.phone}
                        </div>
                        <div class="teacher-contact-info">
                            <span class="teacher-contact-label">Teléfono</span>
                            <a href="tel:${teacherInfo.phone}" class="teacher-contact-value phone">${teacherInfo.phone}</a>
                        </div>
                    </div>
                    
                    <div class="teacher-contact-item">
                        <div class="teacher-contact-icon">
                            ${this.icons.email}
                        </div>
                        <div class="teacher-contact-info">
                            <span class="teacher-contact-label">Email</span>
                            <a href="mailto:${teacherInfo.email}" class="teacher-contact-value">${teacherInfo.email}</a>
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

        modal.querySelector('.teacher-modal-overlay').addEventListener('click', closeModal);
        modal.querySelector('.teacher-modal-close').addEventListener('click', closeModal);

        const escHandler = (e) => {
            if (e.key === 'Escape') closeModal();
        };

        document.addEventListener('keydown', escHandler);

        // Limpiar event listener cuando se cierre el modal
        modal.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity' && !modal.classList.contains('active')) {
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    showLoadingState(container) {
        container.innerHTML = `
            <div class="schedule-loading">
                <div class="loading-spinner"></div>
                <p>Cargando horario...</p>
            </div>
        `;
    }

    showErrorState(container, message) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Error</h2>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="location.reload()">Reintentar</button>
            </div>
        `;
    }

    showErrorMessage(container) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Grado no especificado</h2>
                <p>No se ha especificado un grado para mostrar el horario.</p>
                <a href="schedule.html" class="btn-back">Volver al horario general</a>
            </div>
        `;
    }

    initializeTabInteractions() {
        // Navegación por teclado en pestañas
        const tabButtons = document.querySelectorAll('.tab-btn');

        tabButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    const nextIndex = (index + 1) % tabButtons.length;
                    tabButtons[nextIndex].focus();
                } else if (e.key === 'ArrowLeft') {
                    const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    tabButtons[prevIndex].focus();
                } else if (e.key === 'Home') {
                    tabButtons[0].focus();
                } else if (e.key === 'End') {
                    tabButtons[tabButtons.length - 1].focus();
                }
            });
        });
    }

    setupEventListeners() {
        // Manejar popstate para navegación con el botón atrás
        window.addEventListener('popstate', () => {
            this.displayGradeSchedule();
        });

        // Delegación de eventos para los clics en profesores
        document.addEventListener('click', (e) => {
            const teacherElement = e.target.closest('.class-teacher');
            if (teacherElement) {
                const teacherName = teacherElement.dataset.teacher;
                if (teacherName) {
                    this.showTeacherModal(teacherName);
                }
            }
        });

        // Mejorar accesibilidad de botones de profesor
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const teacherElement = e.target.closest('.class-teacher');
                if (teacherElement) {
                    e.preventDefault();
                    const teacherName = teacherElement.dataset.teacher;
                    if (teacherName) {
                        this.showTeacherModal(teacherName);
                    }
                }
            }
        });
    }

    cleanupCountdowns() {
        // Destruir todas las instancias de countdown
        this.countdownInstances.forEach(({ instance }) => instance.destroy());
        this.countdownInstances = [];
    }

    destroy() {
        // Limpiar intervalos
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];

        // Limpiar countdowns
        this.cleanupCountdowns();
    }
}

// Inicializar el sistema
let scheduleDetailSystem;

document.addEventListener('DOMContentLoaded', () => {
    try {
        scheduleDetailSystem = new ScheduleDetailSystem();
    } catch (error) {
        console.error('Error initializing ScheduleDetailSystem:', error);
        const container = document.getElementById('grade-schedule-detail');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Error del sistema</h2>
                    <p>No se pudo cargar el horario. Por favor, recarga la página.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Reintentar</button>
                </div>
            `;
        }
    }
});

// Hacer la función loadTab accesible globalmente
window.loadTab = (dayName) => {
    if (scheduleDetailSystem) {
        scheduleDetailSystem.loadTab(dayName);
    }
};