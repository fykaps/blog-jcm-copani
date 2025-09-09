/**
 * Sistema de visualización de horarios de clases con temporizador en tiempo real
 * Incluye CountdownSystem integrado para cuenta regresiva profesional
 * Versión profesional con modal de contacto de profesores y diseño ecommerce
 */

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
     * Parsear diferentes formatos de fecha
     */
    parseDate(date) {
        if (date instanceof Date) return date;
        if (typeof date === 'string') return new Date(date);
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

class ScheduleSystem {
    constructor() {
        this.icons = {
            clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
            class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
            teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
            phone: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>`,
            email: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
            arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`,
            close: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
        };

        this.currentTime = this.getCurrentTime();
        this.intervals = [];
        this.countdownInstances = [];
        this.init();
    }

    init() {
        this.loadTodaySchedule();
        this.loadGradeSelector();
        this.startRealTimeUpdates();
        this.setupEventListeners();

        this.calculateAndDisplayStats();
    }

    // ======================
    //  ESTADÍSTICAS DINÁMICAS
    // ======================

    calculateAndDisplayStats() {
        // Calcular estadísticas basadas en los datos de schedules.js
        const stats = this.calculateScheduleStats();

        // Actualizar los elementos del DOM
        this.updateStatsElements(stats);

        // Iniciar animación de los contadores
        this.animateStats();
    }

    calculateScheduleStats() {
        // Calcular grados únicos
        const uniqueGrades = new Set(grades);

        // Calcular profesores únicos
        const uniqueTeachers = new Set(Object.keys(teachers));

        // Calcular cursos únicos (materias)
        const uniqueCourses = new Set();
        Object.values(classSchedules).forEach(daySchedule => {
            daySchedule.forEach(cls => {
                if (cls.subject && cls.subject !== "Receso") {
                    uniqueCourses.add(cls.subject);
                }
            });
        });

        // Calcular horas semanales totales
        let totalWeeklyHours = 0;
        Object.values(classSchedules).forEach(daySchedule => {
            daySchedule.forEach(cls => {
                if (!cls.isBreak && cls.subject !== "Receso") {
                    const start = this.timeToMinutes(cls.start);
                    const end = this.timeToMinutes(cls.end);
                    const duration = (end - start) / 60; // Convertir a horas
                    totalWeeklyHours += duration;
                }
            });
        });

        return {
            totalGrades: uniqueGrades.size,
            totalTeachers: uniqueTeachers.size,
            totalCourses: uniqueCourses.size,
            weeklyHours: Math.round(totalWeeklyHours)
        };
    }

    updateStatsElements(stats) {
        this.updateStatElement('total-grades', stats.totalGrades);
        this.updateStatElement('total-teachers', stats.totalTeachers);
        this.updateStatElement('total-courses', stats.totalCourses);
        this.updateStatElement('weekly-hours', stats.weeklyHours);
    }

    updateStatElement(statId, value) {
        const element = document.querySelector(`[data-stat="${statId}"]`);
        if (element) {
            element.setAttribute('data-count', value);
            element.textContent = '0'; // Reset para la animación
        }
    }

    animateStats() {
        const statElements = document.querySelectorAll('.schedule-stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const target = parseInt(statElement.getAttribute('data-count'));
                    const duration = 2000; // 2 segundos
                    const increment = target / (duration / 16); // 60fps

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

    getCurrentTime() {
        const now = new Date();
        return now.toTimeString().slice(0, 5); // Formato HH:MM
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

    getDayName(date) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[date.getDay()];
    }

    // Funciones principales
    loadTodaySchedule() {
        const today = new Date();
        const dayName = this.getDayName(today);
        const schedule = getTodaySchedule();

        this.displaySchedule(dayName, schedule);
    }

    loadGradeSchedule(grade) {
        const today = new Date();
        const dayName = this.getDayName(today);
        const schedule = getScheduleByDayAndGrade(dayName, grade);

        this.displaySchedule(dayName, schedule, grade);
    }

    loadGradeSelector() {
        const selector = document.getElementById('grade-selector');
        if (!selector) return;

        // Limpiar opciones existentes excepto la primera
        while (selector.options.length > 1) {
            selector.remove(1);
        }

        grades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            selector.appendChild(option);
        });

        selector.addEventListener('change', (e) => {
            if (e.target.value === "") {
                this.loadTodaySchedule();
            } else {
                this.loadGradeSchedule(e.target.value);
            }
        });
    }

    displaySchedule(dayName, schedule, specificGrade = null) {
        const container = document.getElementById('schedule-container');
        if (!container) return;

        // Limpiar countdowns anteriores
        this.cleanupCountdowns();

        this.currentTime = this.getCurrentTime();
        const isGeneralView = !specificGrade;

        let html = `
        <div class="schedule-header">
            <h2>Horario ${isGeneralView ? 'general' : 'de ' + specificGrade} - ${dayName}</h2>
            <div class="current-time">${this.currentTime}</div>
        </div>`;

        if (schedule.length === 0) {
            html += `<p class="no-classes">No hay clases programadas para hoy.</p>`;
            container.innerHTML = html;
            return;
        }

        // Agrupar por grado si es vista general
        const groupedSchedule = isGeneralView ?
            schedule.reduce((acc, cls) => {
                if (!acc[cls.grade]) acc[cls.grade] = [];
                acc[cls.grade].push(cls);
                return acc;
            }, {}) : { [specificGrade]: schedule };

        for (const grade in groupedSchedule) {
            html += `
            <div class="grade-section">
                <div class="grade-header">
                    <h3>${grade}</h3>
                    <a href="schedule-detail.html?grade=${encodeURIComponent(grade)}&day=${encodeURIComponent(dayName)}" 
                       class="btn-view-more">
                        Ver completo ${this.icons.arrowRight}
                    </a>
                </div>
                ${this.renderClassList(groupedSchedule[grade], dayName)}
            </div>`;
        }

        container.innerHTML = html;
        this.initializeAllCountdowns();
    }

    renderClassList(classes, dayName) {
        return `
        <ul class="class-list">
          ${classes.map(cls => this.renderClassItem(cls, dayName)).join('')}
        </ul>
      `;
    }

    renderClassItem(cls, dayName) {
        const status = this.getClassStatus(cls);
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
        const now = this.timeToMinutes(this.currentTime);

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

    initializeCountdown(item, startTime, endTime, status, countdownId) {
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        let targetDate;
        let message;

        if (status.status === 'pending') {
            targetDate = new Date(`${today}T${startTime}`);
            message = 'Inicia en';
        } else {
            targetDate = new Date(`${today}T${endTime}`);
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
        this.currentTime = this.getCurrentTime();
        const currentTimeElements = document.querySelectorAll('.current-time');

        if (currentTimeElements.length > 0) {
            currentTimeElements.forEach(el => {
                el.textContent = this.currentTime;
            });
        }
    }

    updateAllStatuses() {
        const classItems = document.querySelectorAll('.class-item, .recess-item');

        classItems.forEach(item => {
            const start = item.dataset.start;
            const end = item.dataset.end;
            const countdownId = item.dataset.countdownId;
            const isRecess = item.classList.contains('recess-item');

            const status = this.getClassStatus({ start, end });

            // Actualizar estado
            const statusElement = item.querySelector('.class-status');
            if (statusElement) {
                statusElement.textContent = isRecess ?
                    (status.status === 'in-progress' ? 'En receso' : status.text) :
                    status.text;
                statusElement.className = 'class-status ' + status.class;
            }

            // Actualizar countdown si existe
            if (status.timeRemaining > 0 && countdownId) {
                this.updateCountdown(item, start, end, status, countdownId);
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

    cleanupCountdowns() {
        // Destruir todas las instancias de countdown
        this.countdownInstances.forEach(({ instance }) => instance.destroy());
        this.countdownInstances = [];
    }

    setupEventListeners() {
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

    destroy() {
        // Limpiar todos los intervalos
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];

        // Destruir todas las instancias de countdown
        this.cleanupCountdowns();
    }
}

// Inicialización con manejo de errores
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.scheduleSystem = new ScheduleSystem();

        // Inicializar el sistema de búsqueda después de que el sistema de horarios esté listo
        setTimeout(() => {
            try {
                window.teacherSearchSystem = new TeacherSearchSystem();
            } catch (error) {
                console.error('Error al inicializar TeacherSearchSystem:', error);
            }
        }, 1000);

    } catch (error) {
        console.error('Error al inicializar ScheduleSystem:', error);

        const container = document.getElementById('schedule-container');
        if (container) {
            container.innerHTML = `
                <div class="schedule-loading">
                    <div class="loading-spinner"></div>
                    <p>Error al cargar los horarios. Por favor, recarga la página.</p>
                </div>
            `;
        }
    }
});