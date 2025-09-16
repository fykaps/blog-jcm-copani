/**
 * Sistema de Cursos en Tiempo Real
 * Muestra todos los cursos con estado "En curso" en tiempo real
 * con cuenta regresiva en formato HH:MM:SS y la interfaz específica solicitada
 */

class CurrentCoursesSystem {
    constructor() {
        this.currentCourses = [];
        this.countdownIntervals = new Map();
        this.updateInterval = null;
        this.container = null;
        this.icons = {
            clock: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
            book: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>`,
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
        if (minutes <= 0) return '00:00:00';

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const secs = 0; // Segundos siempre 0 ya que actualizamos por minutos

        return `${hours.toString().padStart(2, '0')}h: ${mins.toString().padStart(2, '0')}m: ${secs.toString().padStart(2, '0')}s`;
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
            const courseId = this.getCourseId(course);

            html += `
                <div class="current-course-card" data-course-id="${courseId}">
                    <div class="course-header">
                        <div class="course-grade">
                            ${course.grade}
                        </div>
                        <div class="course-time">
                            <span class="course-time-icon">${this.icons.clock}</span>
                            ${course.start} - ${course.end}
                        </div>
                        <div class="course-countdown">
                            <div class="countdown-value" id="countdown-${courseId}">
                                ${this.formatTimeRemaining(course.timeRemaining)}
                            </div>
                        </div>
                    </div>
                                        
                    <div class="course-details">
                        <div class="course-detail">
                            <span class="course-detail-icon">${this.icons.book}</span>
                            <span class="course-subject">${course.subject}</span>
                        </div>
                        <div class="course-detail">
                            <span class="course-detail-icon">${this.icons.teacher}</span>
                            <span class="course-teacher">${course.teacher}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        this.container.innerHTML = html;
        this.initializeCountdowns();
    }

    getCourseId(course) {
        return `${course.grade}-${course.start}-${course.end}-${course.subject}`.replace(/\s+/g, '-').toLowerCase();
    }

    initializeCountdowns() {
        // Limpiar intervalos anteriores
        this.countdownIntervals.forEach(intervalId => clearInterval(intervalId));
        this.countdownIntervals.clear();

        this.currentCourses.forEach(course => {
            const courseId = this.getCourseId(course);
            const countdownElement = document.getElementById(`countdown-${courseId}`);

            if (countdownElement) {
                this.startCountdown(countdownElement, course.timeRemaining, courseId);
            }
        });
    }

    startCountdown(element, initialMinutes, courseId) {
        let remainingMinutes = initialMinutes;
        let remainingSeconds = 0;

        const updateCountdown = () => {
            if (remainingMinutes <= 0 && remainingSeconds <= 0) {
                clearInterval(this.countdownIntervals.get(courseId));
                this.countdownIntervals.delete(courseId);
                this.checkForUpdates();
                return;
            }

            // Decrementar segundos
            if (remainingSeconds > 0) {
                remainingSeconds--;
            } else {
                // Cuando segundos llegan a 0, decrementar minutos y resetear segundos
                if (remainingMinutes > 0) {
                    remainingMinutes--;
                    remainingSeconds = 59;
                }
            }

            // Actualizar el elemento con el formato HH:MM:SS
            const hours = Math.floor(remainingMinutes / 60);
            const mins = remainingMinutes % 60;
            const secs = remainingSeconds;

            element.textContent = `${hours.toString().padStart(2, '0')}h: ${mins.toString().padStart(2, '0')}m: ${secs.toString().padStart(2, '0')}s`;
        };

        // Inicializar con 0 segundos
        remainingSeconds = 0;

        // Actualizar inmediatamente
        updateCountdown();

        // Configurar intervalo para actualizar cada segundo
        const intervalId = setInterval(updateCountdown, 1000);
        this.countdownIntervals.set(courseId, intervalId);
    }

    checkForUpdates() {
        // Verificar si hay cambios en los cursos actuales
        const newCourses = this.getCurrentCourses();
        const currentIds = this.currentCourses.map(c => this.getCourseId(c));
        const newIds = newCourses.map(c => this.getCourseId(c));

        // Si hay diferencias, volver a renderizar
        if (currentIds.join(',') !== newIds.join(',')) {
            this.render();
        }
    }

    startRealTimeUpdates() {
        // Verificar cambios cada 15 segundos para detectar nuevos cursos
        this.updateInterval = setInterval(() => {
            this.checkForUpdates();
        }, 15000);
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        this.countdownIntervals.forEach(intervalId => {
            clearInterval(intervalId);
        });
        this.countdownIntervals.clear();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que los datos de horarios estén cargados
    const initInterval = setInterval(() => {
        if (typeof getTodaySchedule === 'function') {
            clearInterval(initInterval);
            window.currentCoursesSystem = new CurrentCoursesSystem();
            window.currentCoursesSystem.init();
        }
    }, 100);
});