/**
 * Sistema de visualización de horarios de clases con temporizador en tiempo real
 * Incluye manejo de días actuales y futuros con actualización automática
 */

// Definición de iconos SVG
const iconsSchedule = {
    clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
    class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
    teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    food: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 3v2h-2V3H8v2H6V3H4v2h2v2h2V5h8v2h2V5h2V3h-2zM4 9h16v2h2v4h-2v6H4v-6H2v-4h2V9zm2 2v4h12v-4H6z"/></svg>`,
    exam: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/></svg>`,
    recess: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8.5h-3v5h-2v-5H8V9h8v2.5z"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
    loadTodaySchedule();
    loadGradeSelector();
    startRealTimeUpdates();
});

// Función para iniciar las actualizaciones en tiempo real
function startRealTimeUpdates() {
    // Actualizar inmediatamente
    updateAllStatuses();

    // Configurar actualización cada minuto
    setInterval(updateAllStatuses, 60000);

    // Actualizar la hora cada segundo
    setInterval(updateCurrentTime, 1000);
}

// Actualizar hora actual
function updateCurrentTime() {
    const currentTimeElements = document.querySelectorAll('.current-time');
    if (currentTimeElements.length > 0) {
        const currentTime = TimeUtils.getCurrentTime();
        currentTimeElements.forEach(el => {
            el.textContent = currentTime;
        });
    }
}

// Actualizar todos los estados
function updateAllStatuses() {
    const today = TimeUtils.getNowInLima();
    const currentDayName = TimeUtils.getDayName(today);
    const currentTime = TimeUtils.getCurrentTime();

    // Actualizar clases y recesos
    document.querySelectorAll('.class-item, .recess-item').forEach(item => {
        const start = item.dataset.start;
        const end = item.dataset.end;
        const isRecess = item.classList.contains('recess-item');

        const status = getClassStatus({ start, end }, currentTime);

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
                countdownElement.innerHTML = `${iconsSchedule.clock} ${status.text === 'Pendiente' ?
                    'Inicia en ' + TimeUtils.formatCountdown(status.timeRemaining) :
                    'Termina en ' + TimeUtils.formatCountdown(status.timeRemaining)
                    }`;
            } else {
                countdownElement.remove();
            }
        }
    });
}

// Renderizar ítem de clase o receso
function renderClassItem(cls, currentTime, dayName) {
    const status = getClassStatus(cls, currentTime);
    const isBreak = cls.isBreak || cls.subject === "Receso";

    // Contador regresivo
    const countdown = status.timeRemaining > 0 ?
        `<div class="countdown">${status.text === 'Pendiente' ?
            `${iconsSchedule.clock} Inicia en ${TimeUtils.formatCountdown(status.timeRemaining)}` :
            `${iconsSchedule.clock} Termina en ${TimeUtils.formatCountdown(status.timeRemaining)}`}</div>` : '';

    if (isBreak) {
        // Obtener menú para este receso
        const menuContent = getRecessMenuContent(cls.start, dayName);

        return `
        <li class="class-item ${status.class} recess-item" data-start="${cls.start}" data-end="${cls.end}">
            <div class="class-content">
                <span class="class-time">${iconsSchedule.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${iconsSchedule.recess} ${cls.subject}</span>
                <span class="class-status">${status.status === 'in-progress' ? 'En receso' : status.text}</span>
                ${countdown}
                ${menuContent}
            </div>
        </li>`;
    }

    return `
    <li class="class-item ${status.class}" data-start="${cls.start}" data-end="${cls.end}">
        <div class="class-content">
            <span class="class-time">${iconsSchedule.clock} ${cls.start} - ${cls.end}</span>
            <span class="class-subject">${iconsSchedule.class} ${cls.subject}</span>
            <span class="class-teacher">${iconsSchedule.teacher} ${cls.teacher}</span>
            <span class="class-status">${status.text}</span>
            ${countdown}
        </div>
    </li>`;
}

// Obtener contenido del menú para el receso
function getRecessMenuContent(recessTime, dayName) {
    const menu = getMenuForDay(dayName);
    if (!menu) return '';

    const recessMinutes = TimeUtils.timeToMinutes(recessTime);
    const breakfastEnd = TimeUtils.timeToMinutes(menu.breakfast.hours.end);
    const lunchStart = TimeUtils.timeToMinutes(menu.lunch.hours.start);

    let menuType, menuData;

    if (recessMinutes < breakfastEnd) {
        menuType = 'breakfast';
        menuData = menu.breakfast;
    } else if (recessMinutes >= lunchStart) {
        menuType = 'lunch';
        menuData = menu.lunch;
    } else {
        // Entre desayuno y almuerzo, mostramos el desayuno
        menuType = 'breakfast';
        menuData = menu.breakfast;
    }

    const currentTime = TimeUtils.getCurrentTime();
    const menuStatus = getServiceStatus(menuData.hours, currentTime);

    return `
    <div class="recess-menu ${menuType}-menu">
        <div class="menu-header">
            <h4>${iconsSchedule.food} Menú ${menuType === 'breakfast' ? 'Desayuno' : 'Almuerzo'}</h4>
            <span class="menu-status ${menuStatus.class}">${menuStatus.text}</span>
        </div>
        <div class="menu-details">
            <p class="menu-name">${menuData.name}</p>
            <p class="menu-additional">${menuData.additional}</p>
            ${menuStatus.status !== 'completed' ?
            `<div class="menu-countdown">
                ${menuStatus.status === 'pending' ?
                `Inicia: ${menuData.hours.start}` :
                `Termina: ${menuData.hours.end} (${TimeUtils.formatCountdown(menuStatus.timeRemaining)})`
            }
            </div>` : ''}
        </div>
    </div>`;
}

// Cargar selector de grados
function loadGradeSelector() {
    const selector = document.getElementById('grade-selector');
    if (!selector) return;

    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        selector.appendChild(option);
    });

    selector.addEventListener('change', (e) => {
        if (e.target.value === "") {
            loadTodaySchedule();
        } else {
            loadGradeSchedule(e.target.value);
        }
    });
}

// Cargar horario del día actual
function loadTodaySchedule() {
    const today = TimeUtils.getNowInLima();
    const dayName = TimeUtils.getDayName(today);
    const schedule = getTodaySchedule();

    displaySchedule(dayName, schedule);
}

// Cargar horario por grado
function loadGradeSchedule(grade) {
    const today = TimeUtils.getNowInLima();
    const dayName = TimeUtils.getDayName(today);
    const schedule = getScheduleByDayAndGrade(dayName, grade);

    displaySchedule(dayName, schedule, grade);
}

// Mostrar horario
function displaySchedule(dayName, schedule, specificGrade = null) {
    const container = document.getElementById('schedule-container');
    if (!container) return;

    const currentTime = TimeUtils.getCurrentTime();
    const isGeneralView = !specificGrade;

    let html = `
    <div class="schedule-header">
        <h2>Horario ${isGeneralView ? 'general' : 'de ' + specificGrade} - ${dayName}</h2>
        <div class="current-time">${currentTime}</div>
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
                    Ver completo ${iconsSchedule.arrowRight}
                </a>
            </div>
            ${renderClassList(groupedSchedule[grade], currentTime, dayName)}
        </div>`;
    }

    container.innerHTML = html;
}

// Renderizar lista de clases
function renderClassList(classes, currentTime, dayName) {
    return `
    <ul class="class-list">
      ${classes.map(cls => renderClassItem(cls, currentTime, dayName)).join('')}
    </ul>
  `;
}

// Obtener estado de la clase
function getClassStatus(cls, currentTime) {
    const start = TimeUtils.timeToMinutes(cls.start);
    const end = TimeUtils.timeToMinutes(cls.end);
    const now = TimeUtils.timeToMinutes(currentTime);

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

// Obtener menú para un día específico
function getMenuForDay(dayName) {
    const menu = getMenuByDay(dayName);
    if (!menu) return null;

    const hours = getHoursByDay(dayName);
    return {
        breakfast: { ...menu.breakfast, hours: hours.breakfast },
        lunch: { ...menu.lunch, hours: hours.lunch }
    };
}

// Obtener estado del servicio de comedor
function getServiceStatus(serviceHours, currentTime) {
    const start = TimeUtils.timeToMinutes(serviceHours.start);
    const end = TimeUtils.timeToMinutes(serviceHours.end);
    const now = TimeUtils.timeToMinutes(currentTime);

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
            text: 'En proceso',
            class: 'status-in-progress',
            timeRemaining: end - now
        };
    } else {
        return {
            status: 'completed',
            text: 'Completado',
            class: 'status-completed',
            timeRemaining: 0
        };
    }
}

// Funciones auxiliares
function timeToMinutes(timeStr) {
    return TimeUtils.timeToMinutes(timeStr);
}

function formatCountdown(minutes) {
    return TimeUtils.formatCountdown(minutes);
}

function getCurrentTime() {
    return TimeUtils.getCurrentTime();
}

function getDayName(date) {
    return TimeUtils.getDayName(date);
}