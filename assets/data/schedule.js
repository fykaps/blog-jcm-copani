// Datos del comedor Qali Warma
const menuData = {
    "2023-11-01": {
        desayuno: {
            nombre: "Leche con avena y pan con huevo",
            imagen: "assets/img/menu/desayuno-1.jpg",
            receta: "Ingredientes: Leche, avena, pan, huevos. Preparación:...",
            cocinera: "Sra. Rosa Pérez",
            ayudantes: ["María Gómez", "Juan López"]
        },
        almuerzo: {
            nombre: "Arroz con pollo y ensalada",
            imagen: "assets/img/menu/almuerzo-1.jpg",
            receta: "Ingredientes: Arroz, pollo, vegetales. Preparación:...",
            cocinera: "Sra. Rosa Pérez",
            ayudantes: ["María Gómez", "Juan López"]
        }
    },
    // Más datos para otros días...
};

// Datos de horarios
const scheduleData = {
    "1A": [
        { dia: "Lunes", hora: "08:00-09:00", curso: "Matemáticas", docente: "Prof. García" },
        { dia: "Lunes", hora: "09:00-10:00", curso: "Comunicación", docente: "Prof. Martínez" },
        // Más horarios...
    ],
    "1B": [
        // Horarios para 1B...
    ],
    // Más grados...
};

// Función para cargar el menú del día
function loadDailyMenu() {
    const today = new Date().toISOString().split('T')[0];
    const menuContainer = document.getElementById('menu-del-dia');

    if (menuData[today]) {
        menuContainer.innerHTML = `
            <div class="menu-item" onclick="window.location.href='comedor.html?fecha=${today}&tipo=desayuno'">
                <div class="menu-title">Desayuno</div>
                <div>${menuData[today].desayuno.nombre}</div>
                <div class="menu-time">07:30 - 08:00</div>
            </div>
            <div class="menu-item" onclick="window.location.href='comedor.html?fecha=${today}&tipo=almuerzo'">
                <div class="menu-title">Almuerzo</div>
                <div>${menuData[today].almuerzo.nombre}</div>
                <div class="menu-time">12:30 - 13:30</div>
            </div>
        `;
    } else {
        menuContainer.innerHTML = `<p>No hay información del menú para hoy.</p>`;
    }
}

// Función para cargar el horario rotativo
let currentGradeIndex = 0;
const grades = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B"];

function loadRotatingSchedule() {
    const scheduleContainer = document.getElementById('horario-actual');
    const currentGrade = grades[currentGradeIndex];

    if (scheduleData[currentGrade]) {
        // Obtener el día actual (0=Domingo, 1=Lunes...)
        const today = new Date().getDay() - 1;
        const todaySchedule = scheduleData[currentGrade].filter(item => {
            const diaNum = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].indexOf(item.dia);
            return diaNum === today;
        });

        let scheduleHTML = `
            <div class="grade-selector">
                <span>Grado: ${currentGrade}</span>
                <a href="horarios.html?grado=${currentGrade}" class="btn-vermas">Ver completo</a>
            </div>
            <div class="current-schedule">
        `;

        if (todaySchedule.length > 0) {
            const now = new Date();
            const currentHour = now.getHours() + (now.getMinutes() / 60);

            todaySchedule.forEach(item => {
                const [start, end] = item.hora.split('-').map(time => {
                    const [h, m] = time.split(':');
                    return parseInt(h) + (parseInt(m) / 60);
                });

                const isCurrent = currentHour >= start && currentHour <= end;

                scheduleHTML += `
                    <div class="current-course ${isCurrent ? 'current' : ''}">
                        <span class="course-name">${item.curso}</span>
                        <span class="course-time">${item.hora}</span>
                    </div>
                `;
            });
        } else {
            scheduleHTML += `<p>No hay clases hoy para ${currentGrade}</p>`;
        }

        scheduleHTML += `</div>`;
        scheduleContainer.innerHTML = scheduleHTML;
    }

    // Rotar cada 8 segundos
    currentGradeIndex = (currentGradeIndex + 1) % grades.length;
    setTimeout(loadRotatingSchedule, 8000);
}

// Inicializar los widgets cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadDailyMenu();
    loadRotatingSchedule();
});