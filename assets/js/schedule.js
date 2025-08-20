/**
 * Sistema de visualización de horarios de clases con temporizador en tiempo real
 * Versión profesional con modal de contacto de profesores y diseño ecommerce
 */

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
        this.init();
    }

    init() {
        this.loadTodaySchedule();
        this.loadGradeSelector();
        this.startRealTimeUpdates();
        this.setupEventListeners();
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
        this.updateAllStatuses();
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

        // Contador regresivo
        const countdown = status.timeRemaining > 0 ?
            `<div class="countdown">${this.icons.clock} ${status.text === 'Pendiente' ?
                `Inicia en ${this.formatCountdown(status.timeRemaining)}` :
                `Termina en ${this.formatCountdown(status.timeRemaining)}`}</div>` : '';

        if (isBreak) {
            return `
            <li class="class-item ${status.class} recess-item" data-start="${cls.start}" data-end="${cls.end}">
                <div class="class-content">
                    <span class="class-time">${this.icons.clock} ${cls.start} - ${cls.end}</span>
                    <span class="class-subject">${cls.subject}</span>
                    <span class="class-status">${status.status === 'in-progress' ? 'En receso' : status.text}</span>
                    ${countdown}
                </div>
            </li>`;
        }

        return `
        <li class="class-item ${status.class}" data-start="${cls.start}" data-end="${cls.end}">
            <div class="class-content">
                <span class="class-time">${this.icons.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${this.icons.class} ${cls.subject}</span>
                <span class="class-teacher" data-teacher="${cls.teacher}">
                    ${this.icons.teacher} ${cls.teacher}
                </span>
                <span class="class-status">${status.text}</span>
                ${countdown}
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

            // Actualizar contador
            const countdownElement = item.querySelector('.countdown');
            if (countdownElement) {
                if (status.timeRemaining > 0) {
                    countdownElement.innerHTML = `${this.icons.clock} ${status.text === 'Pendiente' ?
                        'Inicia en ' + this.formatCountdown(status.timeRemaining) :
                        'Termina en ' + this.formatCountdown(status.timeRemaining)
                        }`;
                } else {
                    countdownElement.remove();
                }
            }
        });
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
    }
}

// Inicialización con manejo de errores
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.scheduleSystem = new ScheduleSystem();
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