/**
 * Sistema de Búsqueda de Profesores - Versión Profesional
 * Muestra la ubicación actual y horario de profesores según la hora del sistema
 */

class TeacherSearchSystem {
    constructor() {
        this.teachers = teachers;
        this.classSchedules = classSchedules;
        this.currentTime = this.getCurrentTime();
        this.currentDay = this.getCurrentDay();
        this.init();
    }

    init() {
        this.setupSearchForm();
        this.startTimeUpdates();
    }

    getCurrentTime() {
        const now = new Date();
        return now.toTimeString().slice(0, 5); // Formato HH:MM
    }

    getCurrentDay() {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[new Date().getDay()];
    }

    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    formatTimeRange(start, end) {
        return `${start} - ${end}`;
    }

    getClassStatus(start, end) {
        const startMinutes = this.timeToMinutes(start);
        const endMinutes = this.timeToMinutes(end);
        const nowMinutes = this.timeToMinutes(this.currentTime);

        if (nowMinutes < startMinutes) {
            return {
                status: 'upcoming',
                text: 'Próxima',
                timeRemaining: startMinutes - nowMinutes
            };
        } else if (nowMinutes >= startMinutes && nowMinutes < endMinutes) {
            return {
                status: 'current',
                text: 'En curso',
                timeRemaining: endMinutes - nowMinutes
            };
        } else {
            return {
                status: 'completed',
                text: 'Finalizada',
                timeRemaining: 0
            };
        }
    }

    setupSearchForm() {
        const searchForm = document.getElementById('teacher-search-form');
        const searchInput = document.getElementById('teacher-search-input');
        const resultsContainer = document.getElementById('teacher-search-results');

        if (!searchForm || !searchInput || !resultsContainer) return;

        // Crear datalist para autocompletado
        this.setupAutocomplete(searchInput);

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.performSearch(searchInput.value.trim(), resultsContainer);
        });

        // Búsqueda en tiempo real con debounce
        let timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.performSearch(e.target.value.trim(), resultsContainer);
            }, 300);
        });
    }

    setupAutocomplete(input) {
        const datalist = document.createElement('datalist');
        datalist.id = 'teachers-list';

        Object.keys(this.teachers).forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher;
            datalist.appendChild(option);
        });

        document.body.appendChild(datalist);
        input.setAttribute('list', 'teachers-list');
    }

    performSearch(query, resultsContainer) {
        if (!query) {
            resultsContainer.innerHTML = this.createEmptyState();
            return;
        }

        // Mostrar estado de carga
        resultsContainer.innerHTML = this.createLoadingState();

        // Simular búsqueda asíncrona (en un caso real, podría ser una API call)
        setTimeout(() => {
            const results = this.searchTeachers(query);
            resultsContainer.innerHTML = this.renderResults(results);
        }, 500);
    }

    searchTeachers(query) {
        const results = [];
        const queryLower = query.toLowerCase();

        // Buscar por nombre
        Object.keys(this.teachers).forEach(teacherName => {
            if (teacherName.toLowerCase().includes(queryLower)) {
                const teacherInfo = this.teachers[teacherName];
                const schedule = this.getTeacherSchedule(teacherName);

                results.push({
                    name: teacherName,
                    info: teacherInfo,
                    schedule: schedule
                });
            }
        });

        return results;
    }

    getTeacherSchedule(teacherName) {
        const todaySchedule = this.classSchedules[this.currentDay] || [];

        // Filtrar clases del profesor para hoy
        const teacherClasses = todaySchedule.filter(cls =>
            cls.teacher === teacherName && !cls.isBreak
        );

        // Ordenar por hora de inicio
        teacherClasses.sort((a, b) => {
            return this.timeToMinutes(a.start) - this.timeToMinutes(b.start);
        });

        return teacherClasses;
    }

    getCurrentLocation(teacherSchedule) {
        const nowMinutes = this.timeToMinutes(this.currentTime);
        let currentClass = null;
        let nextClass = null;
        let previousClass = null;

        for (const cls of teacherSchedule) {
            const startMinutes = this.timeToMinutes(cls.start);
            const endMinutes = this.timeToMinutes(cls.end);
            const status = this.getClassStatus(cls.start, cls.end);

            if (status.status === 'current') {
                currentClass = { ...cls, status };
            } else if (status.status === 'upcoming' && !nextClass) {
                nextClass = { ...cls, status };
            } else if (status.status === 'completed' && !previousClass) {
                previousClass = { ...cls, status };
            }
        }

        // Si no hay clase actual, buscar la próxima
        if (!currentClass && nextClass) {
            return {
                type: 'next',
                class: nextClass,
                message: `Próxima clase: ${nextClass.start} - ${nextClass.grade}`
            };
        }

        // Si no hay próxima clase, mostrar la última
        if (!currentClass && !nextClass && previousClass) {
            return {
                type: 'previous',
                class: previousClass,
                message: `Última clase finalizada: ${previousClass.grade}`
            };
        }

        // Si hay clase actual
        if (currentClass) {
            return {
                type: 'current',
                class: currentClass,
                message: `Clase en curso: ${currentClass.grade}`
            };
        }

        return {
            type: 'none',
            message: 'Sin clases hoy'
        };
    }

    renderResults(results) {
        if (results.length === 0) {
            return this.createNoResultsState();
        }

        return results.map(result => this.renderTeacherResult(result)).join('');
    }

    renderTeacherResult(result) {
        const { name, info, schedule } = result;
        const currentLocation = this.getCurrentLocation(schedule);

        return `
            <div class="teacher-result-item animate-fade-in">
                <div class="teacher-result-header">
                    <div>
                        <h3 class="teacher-result-name">${name}</h3>
                        <p class="teacher-result-subject">${info.subject}</p>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="scheduleSystem.showTeacherModal('${name}')">
                        Contactar
                    </button>
                </div>

                <div class="teacher-schedule-info">
                    <div class="teacher-current-location">
                        <div class="teacher-location-title">Ubicación actual</div>
                        <div class="teacher-location-details">
                            <span class="teacher-location-label">Estado:</span>
                            <span class="teacher-location-value">${currentLocation.message}</span>
                            
                            ${currentLocation.class ? `
                                <span class="teacher-location-label">Horario:</span>
                                <span class="teacher-location-value">
                                    ${this.formatTimeRange(currentLocation.class.start, currentLocation.class.end)}
                                </span>
                                
                                <span class="teacher-location-label">Grado/Sección:</span>
                                <span class="teacher-location-value">${currentLocation.class.grade}</span>
                                
                                <span class="teacher-location-label">Asignatura:</span>
                                <span class="teacher-location-value">${currentLocation.class.subject}</span>
                            ` : ''}
                        </div>
                    </div>

                    ${schedule.length > 0 ? `
                        <div class="teacher-schedule-today">
                            <div class="teacher-location-title">Horario completo hoy</div>
                            <ul class="teacher-schedule-list">
                                ${schedule.map(cls => this.renderScheduleItem(cls)).join('')}
                            </ul>
                        </div>
                    ` : `
                        <div class="teacher-no-classes">
                            <p>No tiene clases programadas para hoy.</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    renderScheduleItem(cls) {
        const status = this.getClassStatus(cls.start, cls.end);

        return `
            <li class="teacher-schedule-item">
                <span class="teacher-schedule-time">${this.formatTimeRange(cls.start, cls.end)}</span>
                <span class="teacher-schedule-class">${cls.grade} - ${cls.subject}</span>
                <span class="teacher-schedule-status status-${status.status}">${status.text}</span>
            </li>
        `;
    }

    createLoadingState() {
        return `
            <div class="teacher-search-loading">
                <div class="loading-spinner"></div>
                <p>Buscando profesores...</p>
            </div>
        `;
    }

    createEmptyState() {
        return `
            <div class="teacher-no-results">
                <svg viewBox="0 0 24 24" width="48" height="48" style="margin-bottom: 1rem;">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <p>Ingresa el nombre de un profesor para buscar</p>
            </div>
        `;
    }

    createNoResultsState() {
        return `
            <div class="teacher-no-results">
                <svg viewBox="0 0 24 24" width="48" height="48" style="margin-bottom: 1rem;">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p>No se encontraron profesores con ese nombre</p>
                <p class="text-sm" style="margin-top: 0.5rem; color: var(--color-gray-500);">
                    Intenta con otro nombre o verifica la ortografía
                </p>
            </div>
        `;
    }

    startTimeUpdates() {
        // Actualizar cada minuto
        setInterval(() => {
            this.currentTime = this.getCurrentTime();

            // Si hay búsquedas activas, actualizar los resultados
            const searchInput = document.getElementById('teacher-search-input');
            const resultsContainer = document.getElementById('teacher-search-results');

            if (searchInput && searchInput.value.trim() && resultsContainer) {
                this.performSearch(searchInput.value.trim(), resultsContainer);
            }
        }, 60000);
    }

    destroy() {
        // Cleanup si es necesario
    }
}

// Inicialización del sistema de búsqueda
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.teacherSearchSystem = new TeacherSearchSystem();
    } catch (error) {
        console.error('Error al inicializar TeacherSearchSystem:', error);

        const resultsContainer = document.getElementById('teacher-search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="teacher-search-error">
                    <p>Error al cargar el sistema de búsqueda. Por favor, recarga la página.</p>
                </div>
            `;
        }
    }
});