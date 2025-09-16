/**
 * Sistema de Cursos en Tiempo Real
 * Muestra todos los cursos con estado "En curso" en tiempo real
 * con cuenta regresiva y transiciones suaves
 */

class CurrentCoursesSystem {
    constructor() {
        this.currentCourses = [];
        this.countdownInstances = new Map();
        this.updateInterval = null;
        this.container = null;
        this.icons = {
            clock: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
            teacher: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
            live: `<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M18 10c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z"/></svg>`
        };
    }

    init() {
        this.container = document.getElementById('current-courses-container');
        if (!this.container) {
            console.error('Container #current-courses-container no encontrado');
            return;
        }

        this.startRealTimeUpdates();
        this.render();
    }

    getCurrentTime() {
        const now = new Date();
        return now.toTimeString().slice(0, 5); // Formato HH:MM
    }

    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    getCurrentCourses() {
        const currentTime = this.getCurrentTime();
        const nowMinutes = this.timeToMinutes(currentTime);
        const dayName = this.getDayName(new Date());

        const schedule = getTodaySchedule();
        const currentCourses = [];

        schedule.forEach(cls => {
            if (cls.isBreak || cls.subject === "Receso") return;

            const startMinutes = this.timeToMinutes(cls.start);
            const endMinutes = this.timeToMinutes(cls.end);

            if (nowMinutes >= startMinutes && nowMinutes < endMinutes) {
                const timeRemaining = endMinutes - nowMinutes;
                currentCourses.push({
                    ...cls,
                    timeRemaining,
                    endsAt: cls.end
                });
            }
        });

        // Ordenar por tiempo restante (ascendente)
        return currentCourses.sort((a, b) => a.timeRemaining - b.timeRemaining);
    }

    getDayName(date) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[date.getDay()];
    }

    formatTimeRemaining(minutes) {
        if (minutes <= 0) return '0:00';

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}`;
        }
        return `${mins} min`;
    }

    render() {
        this.currentCourses = this.getCurrentCourses();

        if (this.currentCourses.length === 0) {
            this.container.innerHTML = `
                <div class="no-current-courses">
                    <p>No hay cursos en este momento</p>
                    <small>Todos los cursos han finalizado por hoy</small>
                </div>
            `;
            return;
        }

        let html = '';

        this.currentCourses.forEach((course, index) => {
            const countdownId = `course-countdown-${course.grade.replace(/\s+/g, '-')}-${course.start}-${index}`;

            html += `
                <div class="current-course-card" data-course-id="${countdownId}">
                    <div class="current-course-header">
                        <span class="current-course-grade">${course.grade}</span>
                        <span class="current-course-time">${this.icons.clock} ${course.start} - ${course.end}</span>
                    </div>
                    
                    <div class="current-course-subject">${course.subject}</div>
                    
                    <div class="current-course-teacher">
                        ${this.icons.teacher} ${course.teacher}
                    </div>
                    
                    <div class="current-course-countdown">
                        <div class="countdown-label">Termina en</div>
                        <div class="countdown-value" id="${countdownId}">
                            ${this.formatTimeRemaining(course.timeRemaining)}
                        </div>
                    </div>
                </div>
            `;
        });

        this.container.innerHTML = html;
        this.initializeCountdowns();
    }

    initializeCountdowns() {
        // Limpiar countdowns anteriores
        this.countdownInstances.forEach(instance => clearInterval(instance));
        this.countdownInstances.clear();

        this.currentCourses.forEach(course => {
            const countdownId = `course-countdown-${course.grade.replace(/\s+/g, '-')}-${course.start}`;
            const countdownElement = document.getElementById(countdownId);

            if (countdownElement) {
                this.startCountdown(countdownElement, course.timeRemaining, course);
            }
        });
    }

    startCountdown(element, initialMinutes, course) {
        let remainingMinutes = initialMinutes;

        const updateCountdown = () => {
            if (remainingMinutes <= 0) {
                clearInterval(this.countdownInstances.get(course));
                this.countdownInstances.delete(course);
                this.checkForUpdates();
                return;
            }

            remainingMinutes--;
            element.textContent = this.formatTimeRemaining(remainingMinutes);
        };

        // Actualizar inmediatamente
        updateCountdown();

        // Configurar intervalo para actualizar cada minuto
        const intervalId = setInterval(updateCountdown, 60000);
        this.countdownInstances.set(course, intervalId);
    }

    checkForUpdates() {
        // Verificar si hay cambios en los cursos actuales
        const newCourses = this.getCurrentCourses();
        const currentIds = this.currentCourses.map(c => `${c.grade}-${c.start}-${c.end}`);
        const newIds = newCourses.map(c => `${c.grade}-${c.start}-${c.end}`);

        // Si hay diferencias, volver a renderizar
        if (currentIds.join(',') !== newIds.join(',')) {
            this.render();
        }
    }

    startRealTimeUpdates() {
        // Verificar cambios cada 30 segundos
        this.updateInterval = setInterval(() => {
            this.checkForUpdates();
        }, 30000);
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        this.countdownInstances.forEach(intervalId => {
            clearInterval(intervalId);
        });
        this.countdownInstances.clear();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.currentCoursesSystem = new CurrentCoursesSystem();
    window.currentCoursesSystem.init();
});