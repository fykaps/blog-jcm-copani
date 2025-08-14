// Asegúrate de que utils/time-utils.js esté cargado antes que este archivo
// Si usas módulos ES6, deberías importar así:
// import { TimeUtils } from './utils/time-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    displayGradeSchedule();
    startRealTimeUpdates();
});

// Iconos SVG
const iconsSchedule = {
    clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
    class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
    teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    food: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 3v2h-2V3H8v2H6V3H4v2h2v2h2V5h8v2h2V5h2V3h-2zM4 9h16v2h2v4h-2v6H4v-6H2v-4h2V9zm2 2v4h12v-4H6z"/></svg>`,
    recess: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8.5h-3v5h-2v-5H8V9h8v2.5z"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`
};

// Iniciar actualizaciones en tiempo real
function startRealTimeUpdates() {
    updateCurrentTime();
    updateAllClassStatuses();
    setInterval(updateAllClassStatuses, 60000);
    setInterval(updateCurrentTime, 1000);
}

// Actualizar hora actual
function updateCurrentTime() {
    const currentTimeElement = document.querySelector('.current-time');
    if (currentTimeElement) {
        currentTimeElement.textContent = TimeUtils.getCurrentTime();
    }
}

// Mostrar horario detallado
function displayGradeSchedule() {
    const container = document.getElementById('grade-schedule-detail');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const grade = urlParams.get('grade');
    const day = urlParams.get('day') || TimeUtils.getDayName();

    if (!grade) {
        showErrorMessage(container);
        return;
    }

    const fullSchedule = getFullScheduleByGrade(grade);
    const currentTime = TimeUtils.getCurrentTime();

    const { tabsHtml, contentHtml } = createScheduleTabs(grade, day, fullSchedule, currentTime);

    container.innerHTML = `
    <div class="detail-header">
        <h2>Horario completo de ${grade}</h2>
        <div class="current-time">${currentTime}</div>
        <a href="schedule.html" class="btn btn-back">Volver al horario general</a>
    </div>
    ${tabsHtml}
    ${contentHtml}`;

    // Actualizar estados cada minuto
    setInterval(() => {
        updateClassDetailStatuses(grade, day);
    }, 60000);
}

// Mostrar mensaje de error
function showErrorMessage(container) {
    container.innerHTML = `
    <div class="error-message">
        <h2>Grado no especificado</h2>
        <p>No se ha especificado un grado para mostrar el horario.</p>
        <a href="schedule.html" class="btn">Volver al horario general</a>
    </div>`;
}

// Crear pestañas de días
function createScheduleTabs(grade, activeDay, fullSchedule, currentTime) {
    let tabsHtml = '<div class="schedule-tabs">';
    let contentHtml = '<div class="schedule-tab-content">';

    const daysOrder = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    daysOrder.forEach(dayName => {
        const isActive = dayName === activeDay;
        tabsHtml += `
        <button class="tab-btn ${isActive ? 'active' : ''}" 
                onclick="loadTab('${dayName}')">
            ${dayName}
        </button>`;

        contentHtml += `
        <div class="tab-pane ${isActive ? 'active' : ''}" id="tab-${dayName}">
            <h3>Horario de ${grade} - ${dayName}</h3>
            ${fullSchedule[dayName] && fullSchedule[dayName].length > 0 ?
                `<ul class="class-list-detail">
                    ${fullSchedule[dayName].map(cls => renderClassDetailItem(cls, currentTime, dayName)).join('')}
                </ul>` :
                `<p class="no-classes">No hay clases programadas para este día.</p>`
            }
        </div>`;
    });

    tabsHtml += '</div>';
    contentHtml += '</div>';

    return { tabsHtml, contentHtml };
}

// Cargar pestaña específica
function loadTab(dayName) {
    const grade = new URLSearchParams(window.location.search).get('grade');
    const currentTime = TimeUtils.getCurrentTime();

    // Actualizar URL
    window.history.pushState(null, '', `?grade=${encodeURIComponent(grade)}&day=${encodeURIComponent(dayName)}`);

    // Actualizar pestañas activas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === dayName);
    });

    // Actualizar contenido visible
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `tab-${dayName}`);
    });

    // Actualizar estados
    updateClassDetailStatuses(grade, dayName);
}

// Función para renderizar ítem de clase detallado (modificada)
function renderClassDetailItem(cls, currentTime, dayName) {
    const today = TimeUtils.getNowInLima();
    const currentDayName = TimeUtils.getDayName(today);
    const isToday = dayName === currentDayName;
    const isPast = TimeUtils.getDayIndex(dayName) < TimeUtils.getDayIndex(currentDayName);

    let status;

    if (isToday) {
        status = getClassStatus(cls, currentTime);
    } else if (isPast) {
        status = {
            status: 'completed',
            text: 'Completada',
            class: 'status-completed',
            timeRemaining: 0,
            daysRemaining: 0
        };
    } else {
        // Para días futuros
        const daysOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const todayIndex = daysOrder.indexOf(currentDayName);
        const dayIndex = daysOrder.indexOf(dayName);
        let daysDiff = dayIndex - todayIndex;
        if (daysDiff <= 0) daysDiff += 7;
        status = getFutureClassStatus(cls.start, cls.end, currentTime, daysDiff);
    }

    const isBreak = cls.isBreak || cls.subject === "Receso";
    const typeLabel = (cls.type && cls.type.toLowerCase() !== "normal" && !isBreak) ?
        `<span class="type-label ${cls.type.toLowerCase()}">${cls.type}</span>` : '';

    // Formatear el contador regresivo para días futuros
    let countdown = '';
    if (status.timeRemaining > 0) {
        if (status.daysRemaining > 0) {
            const hours = Math.floor((status.timeRemaining % 1440) / 60);
            const minutes = status.timeRemaining % 60;
            countdown = `<span class="countdown">Faltan ${status.daysRemaining}d ${hours}h ${minutes}m</span>`;
        } else {
            countdown = `<span class="countdown">${status.text === 'Pendiente' ?
                `${iconsSchedule.clock} Inicia en ${TimeUtils.formatCountdown(status.timeRemaining)}` :
                `${iconsSchedule.clock} Termina en ${TimeUtils.formatCountdown(status.timeRemaining)}`
                }</span>`;
        }
    }

    if (isBreak) {
        const menuContent = getRecessMenuContent(cls.start, dayName, isToday || isPast);
        return `
        <li class="class-item-detail ${status.class} recess-item-detail">
            <div class="class-content">
                <span class="class-time">${iconsSchedule.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${iconsSchedule.recess} ${cls.subject}</span>
                <span class="class-status">${isBreak && status.status === 'in-progress' ? 'En receso' : status.text}</span>
                ${countdown}
                ${menuContent}
            </div>
        </li>`;
    }

    return `
    <li class="class-item-detail ${status.class}">
        <div class="class-content">
            <span class="class-time">${iconsSchedule.clock} ${cls.start} - ${cls.end}</span>
            <span class="class-subject">${iconsSchedule.class} ${cls.subject}</span>
            <span class="class-teacher">${iconsSchedule.teacher} ${cls.teacher}</span>
            ${typeLabel}
            <span class="class-status">${status.text}</span>
            ${countdown}
        </div>
    </li>`;
}

// Función modificada para obtener el menú de receso
function getRecessMenuContent(recessTime, dayName, isTodayOrPast) {
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
        menuType = 'breakfast';
        menuData = menu.breakfast;
    }

    const currentTime = TimeUtils.getCurrentTime();
    let menuStatus;

    if (isTodayOrPast) {
        // Para hoy o días pasados
        menuStatus = getServiceStatus(menuData.hours, currentTime);
    } else {
        // Para días futuros - cálculo mejorado
        const today = TimeUtils.getNowInLima();
        const currentDayName = TimeUtils.getDayName(today);
        const daysOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const todayIndex = daysOrder.indexOf(currentDayName);
        const dayIndex = daysOrder.indexOf(dayName);
        let daysDiff = dayIndex - todayIndex;
        if (daysDiff <= 0) daysDiff += 7;

        // Calcular minutos hasta el inicio (incluyendo días completos)
        const totalMinutesUntilStart = daysDiff * 1440 +
            (TimeUtils.timeToMinutes(menuData.hours.start) -
                TimeUtils.timeToMinutes(currentTime));

        menuStatus = {
            status: 'pending',
            text: 'Pendiente',
            class: 'status-pending',
            timeRemaining: totalMinutesUntilStart,
            daysRemaining: daysDiff
        };
    }

    // Función auxiliar para formatear el tiempo restante
    const formatFullCountdown = (minutes) => {
        const days = Math.floor(minutes / 1440);
        const hours = Math.floor((minutes % 1440) / 60);
        const mins = minutes % 60;

        let parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);

        return parts.join(' ');
    };

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
                `Inicia: ${menuData.hours.start} (Faltan ${formatFullCountdown(menuStatus.timeRemaining)})` :
                `Termina: ${menuData.hours.end} (${TimeUtils.formatCountdown(menuStatus.timeRemaining)})`
            }
            </div>` : ''}
            <a href="menu-detail.html?day=${dayName}&service=${menuType}" 
               class="btn-view-menu">
                Ver completo ${iconsSchedule.arrowRight}
            </a>
        </div>
    </div>`;
}

// Actualizar todos los estados de clase
function updateAllClassStatuses() {
    const urlParams = new URLSearchParams(window.location.search);
    const grade = urlParams.get('grade');
    const day = urlParams.get('day') || TimeUtils.getDayName();

    if (grade) {
        updateCurrentTime();
        updateClassDetailStatuses(grade, day);
    }
}

// Función para actualizar estados de clase en detalle (modificada)
function updateClassDetailStatuses(grade, day) {
    const currentTime = TimeUtils.getCurrentTime();
    const schedule = getScheduleByDayAndGrade(day, grade);
    const today = TimeUtils.getNowInLima();
    const currentDayName = TimeUtils.getDayName(today);
    const isToday = day === currentDayName;
    const isPast = TimeUtils.getDayIndex(day) < TimeUtils.getDayIndex(currentDayName);

    const classItems = document.querySelectorAll(`#tab-${day} .class-item-detail, #tab-${day} .recess-item-detail`);
    classItems.forEach((item, index) => {
        const cls = schedule[index];
        if (!cls) return;

        let status;
        if (isToday) {
            status = getClassStatus(cls, currentTime);
        } else if (isPast) {
            status = {
                status: 'completed',
                text: 'Completada',
                class: 'status-completed',
                timeRemaining: 0,
                daysRemaining: 0
            };
        } else {
            const daysOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const todayIndex = daysOrder.indexOf(currentDayName);
            const dayIndex = daysOrder.indexOf(day);
            let daysDiff = dayIndex - todayIndex;
            if (daysDiff <= 0) daysDiff += 7;
            status = getFutureClassStatus(cls.start, cls.end, currentTime, daysDiff);
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
                if (status.daysRemaining > 0) {
                    const hours = Math.floor((status.timeRemaining % 1440) / 60);
                    const minutes = status.timeRemaining % 60;
                    countdownElement.innerHTML = `Faltan ${status.daysRemaining}d ${hours}h ${minutes}m`;
                } else {
                    countdownElement.innerHTML = status.text === 'Pendiente' ?
                        `${iconsSchedule.clock} Inicia en ${TimeUtils.formatCountdown(status.timeRemaining)}` :
                        `${iconsSchedule.clock} Termina en ${TimeUtils.formatCountdown(status.timeRemaining)}`;
                }
            } else {
                countdownElement.remove();
            }
        }

        if (isBreak) {
            const menuContent = getRecessMenuContent(cls.start, day, isToday || isPast);
            const existingMenu = item.querySelector('.recess-menu');
            if (existingMenu) {
                existingMenu.outerHTML = menuContent;
            } else {
                item.querySelector('.class-content').insertAdjacentHTML('beforeend', menuContent);
            }
        }
    });
}

// Función para obtener el estado de una clase futura
function getFutureClassStatus(startTime, endTime, currentTime, daysDiff) {
    const now = TimeUtils.timeToMinutes(currentTime);
    const start = TimeUtils.timeToMinutes(startTime);
    const end = TimeUtils.timeToMinutes(endTime);
    const daysInMinutes = daysDiff * 1440; // 1440 minutos = 1 día
    const timeToStart = daysInMinutes + (start - now);
    const timeToEnd = daysInMinutes + (end - now);

    // Si estamos antes del inicio de la clase
    if (timeToStart > 0) {
        return {
            status: 'pending',
            text: 'Pendiente',
            class: 'status-pending',
            timeRemaining: timeToStart,
            daysRemaining: daysDiff
        };
    }
    // Si estamos durante la clase
    else if (timeToStart <= 0 && timeToEnd > 0) {
        return {
            status: 'in-progress',
            text: 'En curso',
            class: 'status-in-progress',
            timeRemaining: timeToEnd,
            daysRemaining: 0
        };
    }
    // Si la clase ya pasó
    else {
        return {
            status: 'completed',
            text: 'Completada',
            class: 'status-completed',
            timeRemaining: 0,
            daysRemaining: 0
        };
    }
}


// Obtener estado de clase
function getClassStatus(cls, currentTime) {
    const start = TimeUtils.timeToMinutes(cls.start);
    const end = TimeUtils.timeToMinutes(cls.end);
    const now = TimeUtils.timeToMinutes(currentTime);

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

// Obtener menú para día específico
function getMenuForDay(dayName) {
    const menu = getMenuByDay(dayName);
    if (!menu) return null;

    const hours = getHoursByDay(dayName);
    return {
        breakfast: { ...menu.breakfast, hours: hours.breakfast },
        lunch: { ...menu.lunch, hours: hours.lunch }
    };
}

// Obtener estado de servicio de comedor
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

// Hacer función loadTab accesible globalmente
window.loadTab = loadTab;
