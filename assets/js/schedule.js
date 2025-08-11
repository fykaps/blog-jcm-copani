/**
 * Sistema de visualización de horarios de clases (Versión Mejorada)
 */

document.addEventListener('DOMContentLoaded', () => {
    loadTodaySchedule();
    loadGradeSelector();
    setInterval(updateClassStatuses, 60000); // Actualizar cada minuto
});

// Iconos SVG mejorados
const icons = {
    clock: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg>`,
    class: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
    teacher: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    exam: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7zm4-7h2v12h-2zm4 5h2v7h-2z"/></svg>`,
    recess: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8.5h-3v5h-2v-5H8V9h8v2.5z"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`
};

// Función para renderizar un ítem de clase en línea
function renderClassItem(cls, currentTime) {
    const status = getClassStatus(cls, currentTime);
    const isBreak = cls.isBreak || cls.subject === "Receso";

    // Etiqueta de tipo (solo si no es normal ni receso)
    const typeLabel = (cls.type && cls.type !== "normal" && !isBreak) ?
        `<span class="type-label ${cls.type}">${cls.type}</span>` : '';

    // Contador regresivo si aplica
    const countdown = status.timeRemaining > 0 ?
        `<div class="countdown">${status.text === 'Pendiente' ?
            `${icons.clock} Inicia en ${formatCountdown(status.timeRemaining)}` :
            `${icons.clock} Termina en ${formatCountdown(status.timeRemaining)}`}</div>` : '';

    if (isBreak) {
        return `
        <li class="class-item ${status.class} recess-item">
            <div class="class-content">
                <span class="class-time">${icons.clock} ${cls.start} - ${cls.end}</span>
                <span class="class-subject">${icons.recess} ${cls.subject}</span>
                <span class="class-status">${status.text}</span>
                ${countdown}
            </div>
        </li>`;
    }

    return `
    <li class="class-item ${status.class}">
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

// Cargar selector de grados con mejor estilo
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

// Cargar horario del día actual con recesos
function loadTodaySchedule() {
    const today = new Date();
    const dayName = getDayName(today);
    const schedule = getTodaySchedule();

    displaySchedule(dayName, schedule);
}

// Cargar horario por grado con recesos
function loadGradeSchedule(grade) {
    const today = new Date();
    const dayName = getDayName(today);
    const schedule = getScheduleByDayAndGrade(dayName, grade);

    displaySchedule(dayName, schedule, grade);
}

// Función para mostrar el horario (con botón "Ver más" siempre visible)
function displaySchedule(dayName, schedule, specificGrade = null) {
    const container = document.getElementById('schedule-container');
    if (!container) return;

    const currentTime = getCurrentTime();
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
                    Ver completo ${icons.arrowRight}
                </a>
            </div>
            ${renderClassList(groupedSchedule[grade], currentTime)}
        </div>`;
    }

    container.innerHTML = html;
}

// Renderizar lista de clases
function renderClassList(classes, currentTime) {
    return `
    <ul class="class-list">
      ${classes.map(cls => renderClassItem(cls, currentTime)).join('')}
    </ul>
  `;
}

// Obtener estado de la clase o receso
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

// Actualizar estados de las clases y recesos
function updateClassStatuses() {
    const currentTime = getCurrentTime();
    const classItems = document.querySelectorAll('.class-item');

    classItems.forEach(item => {
        const timeText = item.querySelector('.class-time').textContent;
        const timeMatches = timeText.match(/(\d{2}:\d{2})/g);

        if (!timeMatches || timeMatches.length < 2) return;

        const start = timeMatches[0];
        const end = timeMatches[1];
        const isBreak = item.querySelector('.class-time').innerHTML.includes('recess');

        const cls = {
            start,
            end,
            subject: isBreak ? 'Receso' : item.querySelector('h4').textContent.replace(' (Examen)', ''),
            type: timeText.includes('Examen') ? 'examen' : 'normal',
            isBreak
        };

        const status = getClassStatus(cls, currentTime);
        const statusElement = item.querySelector('.class-status');
        const countdownElement = item.querySelector('.countdown');

        // Actualizar clases/recesos
        item.className = `class-item ${status.class} ${isBreak ? 'class-break' : ''}`;
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
            item.querySelector('.class-info').appendChild(newCountdown);
        }
    });

    // Actualizar hora actual
    const currentTimeElement = document.querySelector('.current-time');
    if (currentTimeElement) {
        currentTimeElement.textContent = currentTime;
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