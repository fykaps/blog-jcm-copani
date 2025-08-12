// Asegúrate de que utils/time-utils.js esté cargado antes que este archivo
// Si usas módulos ES6, deberías importar así:
// import { TimeUtils } from './utils/time-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    displayGradeSchedule();
    startRealTimeUpdates();
});

function startRealTimeUpdates() {
    updateAllClassStatuses();
    setInterval(updateAllClassStatuses, 60000); // Cada minuto
    setInterval(updateCurrentTime, 1000); // Cada segundo
}

function updateCurrentTime() {
    const currentTimeElement = document.querySelector('.current-time');
    if (currentTimeElement) {
        currentTimeElement.textContent = TimeUtils.getCurrentTime();
    }
}

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
    const currentTime = TimeUtils.getCurrentTime();

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
    const today = TimeUtils.getNowInLima();
    const currentDayName = TimeUtils.getDayName(today);
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
                `🕒 Inicia en ${TimeUtils.formatCountdown(status.timeRemaining)}` :
                `🕒 Termina en ${TimeUtils.formatCountdown(status.timeRemaining)}`)
        }</span>` :
        '';

    if (isBreak) {
        const menuContent = getRecessMenuContent(cls.start, dayName);
        return `
        <li class="class-item-detail ${status.class} recess-item-detail">
            <div class="class-content">
                <span class="class-time">🕒 ${cls.start} - ${cls.end}</span>
                <span class="class-subject">🧘 ${cls.subject}</span>
                <span class="class-status">${status.text}</span>
                ${countdown}
                ${menuContent}
            </div>
        </li>`;
    }

    return `
    <li class="class-item-detail ${status.class}">
        <div class="class-content">
            <span class="class-time">🕒 ${cls.start} - ${cls.end}</span>
            <span class="class-subject">📘 ${cls.subject}</span>
            <span class="class-teacher">👩‍🏫 ${cls.teacher}</span>
            ${typeLabel}
            <span class="class-status">${status.text}</span>
            ${countdown}
        </div>
    </li>`;
}

function getRecessMenuContent(recessTime, dayName) {
    const menu = getMenuForDay(dayName);
    if (!menu) return '';

    const recessMinutes = TimeUtils.timeToMinutes(recessTime);
    const breakfastEnd = TimeUtils.timeToMinutes(menu.breakfast.hours.end);
    const lunchStart = TimeUtils.timeToMinutes(menu.lunch.hours.start);
    const lunchEnd = TimeUtils.timeToMinutes(menu.lunch.hours.end);

    let menuType, menuData;

    if (recessMinutes < breakfastEnd) {
        menuType = 'breakfast';
        menuData = menu.breakfast;
    } else if (recessMinutes >= lunchStart && recessMinutes < lunchEnd) {
        menuType = 'lunch';
        menuData = menu.lunch;
    } else if (recessMinutes > breakfastEnd && recessMinutes < lunchStart) {
        menuType = 'breakfast';
        menuData = menu.breakfast;
    } else {
        menuType = 'lunch';
        menuData = menu.lunch;
    }

    const currentTime = TimeUtils.getCurrentTime();
    const menuStatus = getServiceStatus(menuData.hours, currentTime);

    return `
    <div class="recess-menu ${menuType}-menu">
        <div class="menu-header">
            <h4>🍽️ Menú ${menuType === 'breakfast' ? 'Desayuno' : 'Almuerzo'}</h4>
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
            </div>` : ''
        }
            <a href="menu-detail.html?day=${dayName}&service=${menuType}" 
               class="btn-view-menu">
                Ver completo →
            </a>
        </div>
    </div>`;
}

function updateAllClassStatuses() {
    const urlParams = new URLSearchParams(window.location.search);
    const grade = urlParams.get('grade');
    const day = urlParams.get('day') || TimeUtils.getDayName();

    if (grade) {
        updateCurrentTime();
        updateClassDetailStatuses(grade, day);
    }
}

function updateClassDetailStatuses(grade, day) {
    const currentTime = TimeUtils.getCurrentTime();
    const schedule = getScheduleByDayAndGrade(day, grade);
    const today = TimeUtils.getNowInLima();
    const currentDayName = TimeUtils.getDayName(today);
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

        item.className = `${cls.subject === 'Receso' ? 'recess-item-detail' : 'class-item-detail'} ${status.class}`;

        const statusElement = item.querySelector('.class-status');
        const countdownElement = item.querySelector('.countdown');

        if (statusElement) statusElement.textContent = status.text;

        if (countdownElement) {
            if (status.timeRemaining > 0) {
                countdownElement.innerHTML = status.daysRemaining > 0 ?
                    `Faltan ${status.daysRemaining}d ${Math.floor((status.timeRemaining % 1440) / 60)}h ${status.timeRemaining % 60}m` :
                    (status.text === 'Pendiente' ?
                        `🕒 Inicia en ${TimeUtils.formatCountdown(status.timeRemaining)}` :
                        `🕒 Termina en ${TimeUtils.formatCountdown(status.timeRemaining)}`);
            } else {
                countdownElement.remove();
            }
        }

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
    const now = TimeUtils.timeToMinutes(currentTime);
    const start = TimeUtils.timeToMinutes(startTime);
    const end = TimeUtils.timeToMinutes(endTime);
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

function getMenuForDay(dayName) {
    const menu = getMenuByDay(dayName);
    if (!menu) return null;

    const hours = getHoursByDay(dayName);
    return {
        breakfast: { ...menu.breakfast, hours: hours.breakfast },
        lunch: { ...menu.lunch, hours: hours.lunch }
    };
}

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

window.loadTab = loadTab;
