/**
 * Página de detalle de horario por grado - Versión Mejorada
 * Muestra correctamente los menús en los recesos
 */

// Iconos SVG
const icons = {
    clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
    class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
    teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    exam: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/></svg>`,
    recess: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8.5h-3v5h-2v-5H8V9h8v2.5z"/></svg>`,
    food: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 3v2h-2V3H8v2H6V3H4v2h2v2h2V5h8v2h2V5h2V3h-2zM4 9h16v2h2v4h-2v6H4v-6H2v-4h2V9zm2 2v4h12v-4H6z"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
    displayGradeSchedule();
    startRealTimeUpdates();
});

function startRealTimeUpdates() {
    updateAllClassStatuses();
    setInterval(updateAllClassStatuses, 60000);
    setInterval(updateCurrentTime, 1000);
}

function updateCurrentTime() {
    const currentTimeElement = document.querySelector('.current-time');
    if (currentTimeElement) {
        currentTimeElement.textContent = getCurrentTime();
    }
}

function displayGradeSchedule() {
    const container = document.getElementById('grade-schedule-detail');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const grade = urlParams.get('grade');
    const day = urlParams.get('day') || getDayName(new Date());

    if (!grade) {
        showErrorMessage(container);
        return;
    }

    const fullSchedule = getFullScheduleByGrade(grade);
    const currentTime = getCurrentTime();

    const { tabsHtml, contentHtml } = createScheduleTabs(grade, day, fullSchedule, currentTime);

    container.innerHTML = `
    <div class="detail-header">
        <h2>Horario completo de ${grade}</h2>
        <div class="current-time">${currentTime}</div>
        <a href="schedule.html" class="btn btn-back">Volver al horario general</a>
    </div>
    ${tabsHtml}
    ${contentHtml}`;

    setInterval(() => {
        updateClassDetailStatuses(grade, day);
    }, 60000);
}

function showErrorMessage(container) {
    container.innerHTML = `
    <div class="error-message">
        <h2>Grado no especificado</h2>
        <p>No se ha especificado un grado para mostrar el horario.</p>
        <a href="schedule.html" class="btn">Volver al horario general</a>
    </div>`;
}

function createScheduleTabs(grade, activeDay, fullSchedule, currentTime) {
    let tabsHtml = '<div class="schedule-tabs">';
    let contentHtml = '<div class="schedule-tab-content">';

    Object.keys(fullSchedule).forEach(dayName => {
        const isActive = dayName === activeDay;
        tabsHtml += `
        <button class="tab-btn ${isActive ? 'active' : ''}" 
                onclick="loadTab('${dayName}')">
            ${dayName}
        </button>`;

        contentHtml += `
        <div class="tab-pane ${isActive ? 'active' : ''}" id="tab-${dayName}">
            <h3>Horario de ${grade} - ${dayName}</h3>
            ${fullSchedule[dayName].length > 0 ?
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

function loadTab(dayName) {
    const grade = new URLSearchParams(window.location.search).get('grade');
    const currentTime = getCurrentTime();

    window.history.pushState(null, '', `?grade=${encodeURIComponent(grade)}&day=${encodeURIComponent(dayName)}`);

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === dayName);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `tab-${dayName}`);
    });

    updateClassDetailStatuses(grade, dayName);
}

function renderClassDetailItem(cls, currentTime, dayName) {
    const today = new Date();
    const currentDayName = getDayName(today);
    const isToday = dayName === currentDayName;

    let status;

    if (isToday) {
        status = getClassStatus(cls, currentTime);
    } else {
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

    const countdown = status.timeRemaining > 0 ?
        `<span class="countdown">${status.daysRemaining > 0 ?
            `Faltan ${status.daysRemaining}d ${Math.floor((status.timeRemaining % 1440) / 60)}h ${status.timeRemaining % 60}m` :
            (status.text === 'Pendiente' ?
                `${icons.clock} Inicia en ${formatCountdown(status.timeRemaining)}` :
                `${icons.clock} Termina en ${formatCountdown(status.timeRemaining)}`)
        }</span>` :
        '';

    if (isBreak) {
        const menuContent = getRecessMenuContent(cls.start, dayName);
        return `
        <li class="class-item-detail ${status.class} recess-item-detail">
            <div class="class-content">
                <span class="class-time">${icons.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${icons.recess} ${cls.subject}</span>
                <span class="class-status">${status.text}</span>
                ${countdown}
                ${menuContent}
            </div>
        </li>`;
    }

    return `
    <li class="class-item-detail ${status.class}">
        <div class="class-content">
            <span class="class-time">${icons.clock} ${cls.start} - ${cls.end}</span>
            <span class="class-subject">${icons.class} ${cls.subject}</span>
            <span class="class-teacher">${icons.teacher} ${cls.teacher}</span>
            ${typeLabel}
            <span class="class-status">${status.text}</span>
            ${countdown}
        </div>
    </li>`;
}

function getRecessMenuContent(recessTime, dayName) {
    const menu = getMenuForDay(dayName);
    if (!menu) return '';

    const recessMinutes = timeToMinutes(recessTime);
    const breakfastEnd = timeToMinutes(menu.breakfast.hours.end);
    const lunchStart = timeToMinutes(menu.lunch.hours.start);
    const lunchEnd = timeToMinutes(menu.lunch.hours.end);

    // Determinar qué menú mostrar según la hora del receso
    let menuType, menuData;

    if (recessMinutes < breakfastEnd) {
        // Receso antes del fin del desayuno - mostrar desayuno
        menuType = 'breakfast';
        menuData = menu.breakfast;
    } else if (recessMinutes >= lunchStart && recessMinutes < lunchEnd) {
        // Receso durante el almuerzo - mostrar almuerzo
        menuType = 'lunch';
        menuData = menu.lunch;
    } else if (recessMinutes > breakfastEnd && recessMinutes < lunchStart) {
        // Receso entre desayuno y almuerzo - mostrar desayuno (primer receso)
        menuType = 'breakfast';
        menuData = menu.breakfast;
    } else {
        // Receso después del almuerzo - mostrar almuerzo (segundo receso)
        menuType = 'lunch';
        menuData = menu.lunch;
    }

    const currentTime = getCurrentTime();
    const menuStatus = getServiceStatus(
        { start: menuData.hours.start, end: menuData.hours.end },
        currentTime
    );

    return `
    <div class="recess-menu ${menuType}-menu">
        <div class="menu-header">
            <h4>${icons.food} Menú ${menuType === 'breakfast' ? 'Desayuno' : 'Almuerzo'}</h4>
            <span class="menu-status ${menuStatus.class}">${menuStatus.text}</span>
        </div>
        <div class="menu-details">
            <p class="menu-name">${menuData.name}</p>
            <p class="menu-additional">${menuData.additional}</p>
            ${menuStatus.status !== 'completed' ?
            `<div class="menu-countdown">
                    ${menuStatus.status === 'pending' ?
                `Inicia: ${menuData.hours.start}` :
                `Termina: ${menuData.hours.end} (${formatCountdown(menuStatus.timeRemaining)})`
            }
                </div>` : ''
        }
            <a href="menu-detail.html?day=${dayName}&service=${menuType}" 
               class="btn-view-menu" title="Ver detalles del menú">
                Ver completo ${icons.arrowRight}
            </a>
        </div>
    </div>`;
}

function updateAllClassStatuses() {
    const urlParams = new URLSearchParams(window.location.search);
    const grade = urlParams.get('grade');
    const day = urlParams.get('day') || getDayName(new Date());

    if (grade) {
        updateCurrentTime();
        updateClassDetailStatuses(grade, day);
    }
}

function updateClassDetailStatuses(grade, day) {
    const currentTime = getCurrentTime();
    const schedule = getScheduleByDayAndGrade(day, grade);
    const today = new Date();
    const currentDayName = getDayName(today);
    const isToday = day === currentDayName;

    const classItems = document.querySelectorAll(`#tab-${day} .class-item-detail, #tab-${day} .recess-item-detail`);
    classItems.forEach((item, index) => {
        const cls = schedule[index];
        if (!cls) return;

        let status;

        if (isToday) {
            status = getClassStatus(cls, currentTime);
        } else {
            const daysOrder = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            const todayIndex = daysOrder.indexOf(currentDayName);
            const dayIndex = daysOrder.indexOf(day);

            let daysDiff = dayIndex - todayIndex;
            if (daysDiff <= 0) daysDiff += 7;

            status = getFutureClassStatus(cls.start, cls.end, currentTime, daysDiff);
        }

        const statusElement = item.querySelector('.class-status');
        const countdownElement = item.querySelector('.countdown');

        item.className = `${cls.subject === 'Receso' ? 'recess-item-detail' : 'class-item-detail'} ${status.class}`;
        if (statusElement) {
            statusElement.textContent = status.text;
        }

        if (countdownElement) {
            if (status.timeRemaining > 0) {
                countdownElement.innerHTML = status.daysRemaining > 0 ?
                    `Faltan ${status.daysRemaining}d ${Math.floor((status.timeRemaining % 1440) / 60)}h ${status.timeRemaining % 60}m` :
                    (status.text === 'Pendiente' ?
                        `${icons.clock} Inicia en ${formatCountdown(status.timeRemaining)}` :
                        `${icons.clock} Termina en ${formatCountdown(status.timeRemaining)}`);
            } else {
                countdownElement.remove();
            }
        } else if (status.timeRemaining > 0) {
            const newCountdown = document.createElement('span');
            newCountdown.className = 'countdown';
            newCountdown.innerHTML = status.daysRemaining > 0 ?
                `Faltan ${status.daysRemaining}d ${Math.floor((status.timeRemaining % 1440) / 60)}h ${status.timeRemaining % 60}m` :
                (status.text === 'Pendiente' ?
                    `${icons.clock} Inicia en ${formatCountdown(status.timeRemaining)}` :
                    `${icons.clock} Termina en ${formatCountdown(status.timeRemaining)}`);
            item.querySelector('.class-content').appendChild(newCountdown);
        }

        // Actualizar menús en recesos si es hoy
        if (isToday && (cls.isBreak || cls.subject === "Receso")) {
            const menuContent = getRecessMenuContent(cls.start, day);
            const existingMenu = item.querySelector('.recess-menu');
            if (existingMenu) {
                existingMenu.outerHTML = menuContent;
            } else {
                item.querySelector('.class-content').insertAdjacentHTML('beforeend', menuContent);
            }
        }
    });
}

function getFutureClassStatus(startTime, endTime, currentTime, daysDiff) {
    const now = timeToMinutes(currentTime);
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    const daysInMinutes = daysDiff * 1440;
    const timeToStart = daysInMinutes + (start - now);

    if (timeToStart > 0) {
        return {
            status: 'pending',
            text: 'Pendiente',
            class: 'status-pending',
            timeRemaining: timeToStart,
            daysRemaining: daysDiff
        };
    } else {
        const status = getClassStatus({ start: startTime, end: endTime }, currentTime);
        status.daysRemaining = 0;
        return status;
    }
}

function getClassStatus(cls, currentTime) {
    const start = timeToMinutes(cls.start);
    const end = timeToMinutes(cls.end);
    const now = timeToMinutes(currentTime);

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
            text: cls.subject === 'Receso' ? 'En receso' : 'En curso',
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

// Funciones auxiliares
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function formatCountdown(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins}m`;
}

function getCurrentTime() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

function getDayName(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
}

function getMenuForDay(dayName) {
    const menu = getMenuByDay(dayName);
    if (!menu) return null;

    const hours = getHoursByDay(dayName);
    return {
        breakfast: {
            ...menu.breakfast,
            hours: hours.breakfast
        },
        lunch: {
            ...menu.lunch,
            hours: hours.lunch
        }
    };
}

function getServiceStatus(serviceHours, currentTime) {
    const start = timeToMinutes(serviceHours.start);
    const end = timeToMinutes(serviceHours.end);
    const now = timeToMinutes(currentTime);

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

window.loadTab = loadTab;