/**
 * Página de detalle de horario por grado (Versión Mejorada y Corregida)
 */

// Definir los iconos SVG al inicio del archivo
const icons = {
    clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
    class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
    teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    exam: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/></svg>`,
    recess: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8.5h-3v5h-2v-5H8V9h8v2.5z"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
    displayGradeSchedule();
});

function displayGradeSchedule() {
    const container = document.getElementById('grade-schedule-detail');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const grade = urlParams.get('grade');
    const day = urlParams.get('day') || getDayName(new Date());

    if (!grade) {
        container.innerHTML = `
        <div class="error-message">
            <h2>Grado no especificado</h2>
            <p>No se ha especificado un grado para mostrar el horario.</p>
            <a href="schedule.html" class="btn">Volver al horario general</a>
        </div>`;
        return;
    }

    // Obtener horario completo del grado
    const fullSchedule = getFullScheduleByGrade(grade);
    const currentTime = getCurrentTime();

    // Crear pestañas por día
    let tabsHtml = '<div class="schedule-tabs">';
    let contentHtml = '<div class="schedule-tab-content">';

    Object.keys(fullSchedule).forEach(dayName => {
        const isActive = dayName === day;
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
                    ${fullSchedule[dayName].map(cls => renderClassDetailItem(cls, currentTime)).join('')}
                </ul>` :
                `<p class="no-classes">No hay clases programadas para este día.</p>`
            }
        </div>`;
    });

    tabsHtml += '</div>';
    contentHtml += '</div>';

    container.innerHTML = `
    <div class="detail-header">
        <h2>Horario completo de ${grade}</h2>
        <div class="current-time">${currentTime}</div>
        <a href="schedule.html" class="btn btn-back">Volver al horario general</a>
    </div>
    ${tabsHtml}
    ${contentHtml}`;

    // Configurar actualización periódica
    setInterval(() => {
        updateClassDetailStatuses(grade, day);
    }, 60000);
}

// Función para cargar una pestaña específica
function loadTab(dayName) {
    const grade = new URLSearchParams(window.location.search).get('grade');
    const currentTime = getCurrentTime();

    // Actualizar URL sin recargar
    window.history.pushState(null, '', `?grade=${encodeURIComponent(grade)}&day=${encodeURIComponent(dayName)}`);

    // Actualizar pestañas activas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === dayName);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `tab-${dayName}`);
    });

    // Actualizar estados
    updateClassDetailStatuses(grade, dayName);
}

// Renderizar ítem de clase detallado en línea
function renderClassDetailItem(cls, currentTime) {
    const status = getClassStatus(cls, currentTime);
    const isBreak = cls.isBreak || cls.subject === "Receso";

    // Mostrar etiqueta solo si no es "normal" ni "receso"
    const typeLabel = (cls.type && cls.type !== "normal" && !isBreak) ?
        `<span class="type-label ${cls.type}">${cls.type}</span>` : '';

    const countdown = status.timeRemaining > 0 ?
        `<span class="countdown">${status.text === 'Pendiente' ?
            `${icons.clock} Inicia en ${formatCountdown(status.timeRemaining)}` :
            `${icons.clock} Termina en ${formatCountdown(status.timeRemaining)}`}</span>` : '';

    if (isBreak) {
        return `
        <li class="class-item-detail ${status.class} recess-item-detail">
            <div class="class-content">
                <span class="class-time">${icons.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${icons.recess} ${cls.subject}</span>
                <span class="class-status">${status.text}</span>
                ${countdown}
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

// Actualizar estados de las clases y recesos
function updateClassDetailStatuses(grade, day) {
    const currentTime = getCurrentTime();
    const schedule = getScheduleByDayAndGrade(day, grade);

    // Actualizar hora
    const currentTimeElement = document.querySelector('.current-time');
    if (currentTimeElement) {
        currentTimeElement.textContent = currentTime;
    }

    // Actualizar cada clase/receso
    const classItems = document.querySelectorAll('.class-item-detail, .recess-item-detail');
    classItems.forEach((item, index) => {
        const cls = schedule[index];
        if (!cls) return;

        const status = getClassStatus(cls, currentTime);
        const statusElement = item.querySelector('.class-status span');
        const countdownElement = item.querySelector('.countdown');

        // Actualizar clases/recesos
        item.className = `${cls.subject === 'Receso' ? 'recess-item-detail' : 'class-item-detail'} ${status.class}`;
        if (statusElement) {
            statusElement.textContent = status.text;
        }

        // Actualizar contador
        if (countdownElement) {
            if (status.timeRemaining > 0) {
                countdownElement.textContent = status.text === 'Pendiente' ?
                    `Inicia en ${formatCountdown(status.timeRemaining)}` :
                    `Termina en ${formatCountdown(status.timeRemaining)}`;
            } else {
                countdownElement.remove();
            }
        } else if (status.timeRemaining > 0) {
            const newCountdown = document.createElement('div');
            newCountdown.className = 'countdown';
            newCountdown.textContent = status.text === 'Pendiente' ?
                `Inicia en ${formatCountdown(status.timeRemaining)}` :
                `Termina en ${formatCountdown(status.timeRemaining)}`;
            item.querySelector('.class-main').appendChild(newCountdown);
        }
    });
}

// Funciones auxiliares
function getClassStatus(cls, currentTime) {
    const start = timeToMinutes(cls.start);
    const end = timeToMinutes(cls.end);
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
            text: cls.subject === 'Receso' ? 'En receso' : 'En curso',
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

// Hacer la función accesible globalmente para los botones
window.loadTab = loadTab;