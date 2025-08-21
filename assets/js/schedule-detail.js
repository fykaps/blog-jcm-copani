/**
 * Sistema de Detalle de Horarios - Versión Ecommerce Profesional
 * Con mejoras de rendimiento, accesibilidad y experiencia de usuario
 * Sin dependencia de time-utils.js
 */

class ScheduleDetailSystem {
    constructor() {
        this.icons = {
            clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
            class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
            teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
            food: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 3v2h-2V3H8v2H6V3H4v2h2v2h2V5h8v2h2V5h2V3h-2zM4 9h16v2h2v4h-2v6H4v-6H2v-4h2V9zm2 2v4h12v-4H6z"/></svg>`,
            recess: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8.5h-3v5h-2v-5H8V9h8v2.5z"/></svg>`,
            arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`,
            phone: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>`,
            email: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
            close: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
        };

        this.currentTab = null;
        this.intervals = [];
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
                <div class="detail-header">
                    <h2>Horario completo de ${grade}</h2>
                    <div class="current-time">${currentTime}</div>
                    <a href="schedule.html" class="btn btn-back">← Volver al horario general</a>
                </div>
                ${tabsHtml}
                ${contentHtml}`;

                this.currentTab = day;
                this.initializeTabInteractions();

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
                <h3>Horario de ${grade} - ${dayName}</h3>
                ${fullSchedule[dayName] && fullSchedule[dayName].length > 0 ?
                    `<ul class="class-list-detail">
                        ${fullSchedule[dayName].map(cls => this.renderClassDetailItem(cls, currentTime, dayName)).join('')}
                    </ul>` :
                    `<p class="no-classes">No hay clases programadas para este día.</p>`
                }
            </div>`;
        });

        tabsHtml += '</div>';
        contentHtml += '</div>';

        return { tabsHtml, contentHtml };
    }

    renderClassDetailItem(cls, currentTime, dayName) {
        const today = new Date();
        const currentDayName = this.getDayName(today);
        const isToday = dayName === currentDayName;
        const isPast = this.getDayIndex(dayName) < this.getDayIndex(currentDayName);

        let status;

        if (isToday) {
            status = this.getClassStatus(cls, currentTime);
        } else if (isPast) {
            status = {
                status: 'completed',
                text: 'Completada',
                class: 'status-completed',
                timeRemaining: 0,
                daysRemaining: 0
            };
        } else {
            const daysDiff = this.calculateDaysDifference(dayName, currentDayName);
            status = this.getFutureClassStatus(cls.start, cls.end, currentTime, daysDiff);
        }

        const isBreak = cls.isBreak || cls.subject === "Receso";
        const typeLabel = (cls.type && cls.type.toLowerCase() !== "normal" && !isBreak) ?
            `<span class="type-label ${cls.type.toLowerCase().replace(/\s+/g, '-')}">${cls.type}</span>` : '';

        let countdown = '';
        if (status.timeRemaining > 0) {
            countdown = this.formatCountdown(status);
        }

        return `
        <li class="class-item-detail ${status.class}">
            <div class="class-content">
                <span class="class-time">${this.icons.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${this.icons.class} ${cls.subject}</span>
                <span class="class-teacher" data-teacher="${cls.teacher}" onclick="scheduleDetailSystem.showTeacherModal('${cls.teacher}')">
                    ${this.icons.teacher} ${cls.teacher}
                </span>
                ${typeLabel}
                <span class="class-status">${status.text}</span>
                ${countdown}
            </div>
        </li>`;
    }

    formatCountdown(status) {
        if (status.daysRemaining > 0) {
            const hours = Math.floor((status.timeRemaining % 1440) / 60);
            const minutes = status.timeRemaining % 60;
            return `<span class="countdown">Faltan ${status.daysRemaining}d ${hours}h ${minutes}m</span>`;
        } else {
            return `<span class="countdown">${this.icons.clock} ${status.text === 'Pendiente' ?
                `Inicia en ${this.formatFullCountdown(status.timeRemaining)}` :
                `Termina en ${this.formatFullCountdown(status.timeRemaining)}`
                }</span>`;
        }
    }

    formatFullCountdown(minutes) {
        const days = Math.floor(minutes / 1440);
        const hours = Math.floor((minutes % 1440) / 60);
        const mins = minutes % 60;

        let parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);

        return parts.join(' ');
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
                timeRemaining: timeToStart,
                daysRemaining: daysDiff
            };
        } else if (timeToStart <= 0 && timeToEnd > 0) {
            return {
                status: 'in-progress',
                text: 'En curso',
                class: 'status-in-progress',
                timeRemaining: timeToEnd,
                daysRemaining: 0
            };
        } else {
            return {
                status: 'completed',
                text: 'Completada',
                class: 'status-completed',
                timeRemaining: 0,
                daysRemaining: 0
            };
        }
    }

    getClassStatus(cls, currentTime) {
        const start = this.timeToMinutes(cls.start);
        const end = this.timeToMinutes(cls.end);
        const now = this.timeToMinutes(currentTime);

        if (now < start) {
            return {
                status: 'pending',
                text: 'Pendiente',
                class: 'status-pending',
                timeRemaining: start - now,
                daysRemaining: 0
            };
        } else if (now >= start && now < end) {
            return {
                status: 'in-progress',
                text: 'En curso',
                class: 'status-in-progress',
                timeRemaining: end - now,
                daysRemaining: 0
            };
        } else {
            return {
                status: 'completed',
                text: 'Completada',
                class: 'status-completed',
                timeRemaining: 0,
                daysRemaining: 0
            };
        }
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
        this.updateClassDetailStatuses(grade, dayName);

        // Scroll suave a la sección
        document.querySelector('.schedule-tab-content').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    updateClassDetailStatuses(grade, day) {
        const currentTime = this.getCurrentTime();
        const schedule = getScheduleByDayAndGrade(day, grade);
        const today = new Date();
        const currentDayName = this.getDayName(today);
        const isToday = day === currentDayName;
        const isPast = this.getDayIndex(day) < this.getDayIndex(currentDayName);

        const classItems = document.querySelectorAll(`#tab-${day} .class-item-detail, #tab-${day} .recess-item-detail`);

        classItems.forEach((item, index) => {
            const cls = schedule[index];
            if (!cls) return;

            let status;
            if (isToday) {
                status = this.getClassStatus(cls, currentTime);
            } else if (isPast) {
                status = {
                    status: 'completed',
                    text: 'Completada',
                    class: 'status-completed',
                    timeRemaining: 0,
                    daysRemaining: 0
                };
            } else {
                const daysDiff = this.calculateDaysDifference(day, currentDayName);
                status = this.getFutureClassStatus(cls.start, cls.end, currentTime, daysDiff);
            }

            const isBreak = cls.isBreak || cls.subject === "Receso";
            item.className = `${isBreak ? 'recess-item-detail' : 'class-item-detail'} ${status.class}`;

            const statusElement = item.querySelector('.class-status');
            const countdownElement = item.querySelector('.countdown');

            if (statusElement) {
                statusElement.textContent = isBreak && status.status === 'in-progress' ? 'En receso' : status.text;
            }

            if (countdownElement) {
                if (status.timeRemaining > 0) {
                    countdownElement.innerHTML = this.formatCountdown(status);
                } else {
                    countdownElement.remove();
                }
            }
        });
    }

    startRealTimeUpdates() {
        // Actualizar cada minuto
        this.intervals.push(setInterval(() => {
            this.updateAllClassStatuses();
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

    updateAllClassStatuses() {
        const urlParams = new URLSearchParams(window.location.search);
        const grade = urlParams.get('grade');
        const day = this.currentTab || urlParams.get('day') || this.getDayName();

        if (grade) {
            this.updateClassDetailStatuses(grade, day);
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
                    <div class="contact-item">
                        <div class="contact-icon">
                            ${this.icons.phone}
                        </div>
                        <div class="contact-info">
                            <span class="contact-label">Teléfono</span>
                            <a href="tel:${teacherInfo.phone}" class="contact-value phone">${teacherInfo.phone}</a>
                        </div>
                    </div>
                    
                    <div class="contact-item">
                        <div class="contact-icon">
                            ${this.icons.email}
                        </div>
                        <div class="contact-info">
                            <span class="contact-label">Email</span>
                            <a href="mailto:${teacherInfo.email}" class="contact-value">${teacherInfo.email}</a>
                        </div>
                    </div>
                </div>

                <div class="teacher-modal-actions">
                    <button class="btn btn-primary" onclick="navigator.clipboard.writeText('${teacherInfo.phone}')">
                        Copiar teléfono
                    </button>
                    <a href="mailto:${teacherInfo.email}" class="btn btn-secondary">
                        Enviar email
                    </a>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Activar modal
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

        // Limpiar event listener
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
                <a href="schedule.html" class="btn btn-primary">Volver al horario general</a>
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

    destroy() {
        // Limpiar intervalos
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
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