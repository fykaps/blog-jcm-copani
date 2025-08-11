/**
 * Datos de horarios de clases completos con múltiples grados
 */

// Grados y secciones disponibles
const grades = [
    "1ro A", "1ro B",
    "2do A", "2do B",
    "3ro A", "3ro B", "3ro C",
    "4to A", "4to B", "4to C",
    "5to A", "5to B", "5to C"
];

// Docentes por área
const teachers = {
    "Matemáticas": ["David Mengoa Mamani", "María Gómez", "Carlos López"],
    "Ciencias Sociales": ["Fidel Severiano Cruz Tiquilloca", "Luis Torres"],
    "Tutoría": ["Fidel Severiano Cruz Tiquilloca", "Sofía Castro"],
    "Educación Religiosa": ["Vidal Quiñonez Quispe", "Jorge Ruiz"],
    "Inglés": ["Madelaine Gonzalo Segura", "Laura Méndez", "David Jiménez"],
    "Educación Física": ["Nestor Rene Cruz Paye", "Elena Flores"],
    "Arte y Cultura": ["Nestor Palomino Manzano", "Fernando Silva"],
    "Desarrollo Personal": ["Julio Amilcar Rivera Aguilar", "Silvia Mendoza"],
    "Ciencia y Tecnología": ["Alfonso Aruquipa Ccuno", "Lucía Ramírez"],
    "Comunicación": ["Joel Calisaya Enriquez", "sOtro"],
    "Aimara": ["Constantino Eulogio Apaza Lopez", "ososo"],
    "Educación para el Trabajo": ["Geber Yole Chambilla Condori", "fddd"],
};

// Horarios de clases por día y grado (estructura completa)
const classSchedules = {
    "Lunes": [
        // 1ro A
        { grade: "1ro A", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Ciencias Sociales", teacher: "Fidel Severiano Cruz Tiquilloca", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro A", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Tutoría", teacher: "Fidel Severiano Cruz Tiquilloca", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "1ro A", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "14:20", end: "15:00", type: "Normal" },

        // 1ro B
        { grade: "1ro B", subject: "Matemáticas", teacher: "María Gómez", start: "08:00", end: "09:00", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Inglés", teacher: "Laura Méndez", start: "09:15", end: "10:00", type: "Normal" },
        { grade: "1ro B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "10:00", end: "11:30", type: "Práctica" },

        // 2do A
        { grade: "2do A", subject: "Educación Religiosa", teacher: "Vidal Quiñonez Quispe", start: "07:30", end: "09:00", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Matemáticas", teacher: "Carlos López", start: "09:15", end: "10:45", type: "Normal" },
        { grade: "2do A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "10:45", end: "12:15", type: "Práctica" },

        // 3ro B
        { grade: "3ro B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "08:30", end: "10:00", type: "Práctica" },
        { grade: "3ro B", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Ciencias Sociales", teacher: "Luis Torres", start: "10:15", end: "11:45", type: "Normal" },

        // 4to C
        { grade: "4to C", subject: "Tutoría", teacher: "Sofía Castro", start: "07:45", end: "09:15", type: "Laboratorio" },
        { grade: "4to C", subject: "Receso", start: "09:15", end: "09:30", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "09:30", end: "11:00", type: "Práctica" },

        // 5to A
        { grade: "5to A", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "08:15", end: "09:45", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "09:45", end: "10:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Inglés", teacher: "David Jiménez", start: "10:00", end: "11:30", type: "Normal" }
    ],
    "Martes": [
        // 1ro A
        { grade: "1ro A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro A", subject: "Educación Religiosa", teacher: "Vidal Quiñonez Quispe", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "1ro A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "14:20", end: "15:00", type: "Normal" },

        // 2do B
        { grade: "2do B", subject: "Matemáticas", teacher: "María Gómez", start: "07:30", end: "09:00", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Educación Religiosa", teacher: "Jorge Ruiz", start: "09:15", end: "10:45", type: "Normal" },

        // 3ro A
        { grade: "3ro A", subject: "Tutoría", teacher: "Fidel Severiano Cruz Tiquilloca", start: "08:30", end: "10:00", type: "Laboratorio" },
        { grade: "3ro A", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Educación Física", teacher: "Elena Flores", start: "10:15", end: "11:45", type: "Práctica" },

        // 5to C
        { grade: "5to C", subject: "Ciencia y Tecnología", teacher: "Lucía Ramírez", start: "08:00", end: "09:30", type: "Práctica" },
        { grade: "5to C", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "5to C", subject: "Ciencias Sociales", teacher: "Fidel Severiano Cruz Tiquilloca", start: "09:45", end: "11:15", type: "Normal" }
    ],
    "Miércoles": [
        // 1ro A
        { grade: "1ro A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro A", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Aimara", teacher: "Constantino Eulogio Apaza Lopez", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "1ro A", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "13:40", end: "15:00", type: "Centro de Computo" },

        // 4to A
        { grade: "4to A", subject: "Arte y Cultura", teacher: "Fernando Silva", start: "08:30", end: "10:00", type: "Práctica" },
        { grade: "4to A", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Desarrollo Personal", teacher: "Silvia Mendoza", start: "10:15", end: "11:45", type: "Práctica" },

        // 5to B
        { grade: "5to B", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "08:15", end: "09:45", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "09:45", end: "10:00", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Educación Religiosa", teacher: "Jorge Ruiz", start: "10:00", end: "11:30", type: "Normal" }
    ],
    "Jueves": [
        // 1ro A
        { grade: "1ro A", subject: "Ciencias Sociales", teacher: "Fidel Severiano Cruz Tiquilloca", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro A", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "1ro A", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "13:40", end: "15:00", type: "Normal" },

        // 1ro B
        { grade: "1ro B", subject: "Ciencias Sociales", teacher: "Fidel Severiano Cruz Tiquilloca", start: "08:00", end: "09:30", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Tutoría", teacher: "Fidel Severiano Cruz Tiquilloca", start: "09:45", end: "11:15", type: "Práctica" },

        // 3ro C
        { grade: "3ro C", subject: "Matemáticas", teacher: "Carlos López", start: "07:30", end: "09:00", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "09:15", end: "10:45", type: "Práctica" },

        // 4to B
        { grade: "4to B", subject: "Inglés", teacher: "David Jiménez", start: "08:30", end: "10:00", type: "Normal" },
        { grade: "4to B", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "10:15", end: "11:45", type: "Práctica" },

        // 5to A
        { grade: "5to A", subject: "Tutoría", teacher: "Sofía Castro", start: "08:15", end: "09:45", type: "Laboratorio" },
        { grade: "5to A", subject: "Receso", start: "09:45", end: "10:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "10:00", end: "11:30", type: "Práctica" }
    ],
    "Viernes": [
        // 1ro A
        { grade: "1ro A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Aimara", teacher: "Constantino Eulogio Apaza Lopez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro A", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "11:10", end: "11:50", type: "Normal" },
        { grade: "1ro A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "1ro A", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "14:20", end: "15:00", type: "Centro de Computo" },

        // 2do A
        { grade: "2do A", subject: "Ciencias Sociales", teacher: "Luis Torres", start: "07:30", end: "09:00", type: "Exámen" },
        { grade: "2do A", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "09:15", end: "10:45", type: "Práctica" },

        // 3ro B
        { grade: "3ro B", subject: "Educación Religiosa", teacher: "Vidal Quiñonez Quispe", start: "08:30", end: "10:00", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Tutoría", teacher: "Fidel Severiano Cruz Tiquilloca", start: "10:15", end: "11:45", type: "Laboratorio" },

        // 5to C
        { grade: "5to C", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "08:00", end: "09:30", type: "Exámen" },
        { grade: "5to C", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "5to C", subject: "Ciencia y Tecnología", teacher: "Lucía Ramírez", start: "23:20", end: "23:30", type: "Práctica" }
    ],
    "Sábado": [
        // Solo actividades especiales los sábados
        // { grade: "5to A", subject: "Preparación Universitaria", teacher: "David Mengoa Mamani", start: "09:00", end: "12:00", type: "especial" },
        // { grade: "5to B", subject: "Preparación Universitaria", teacher: "María Gómez", start: "09:00", end: "12:00", type: "especial" },
        // { grade: "5to C", subject: "Preparación Universitaria", teacher: "Carlos López", start: "09:00", end: "12:00", type: "especial" }
    ],
    "Domingo": []
};

// Función para obtener el horario del día actual
function getTodaySchedule() {
    const today = new Date();
    const dayName = getDayName(today);
    return classSchedules[dayName] || [];
}

// Función para obtener el horario por día y grado
function getScheduleByDayAndGrade(day, grade) {
    if (!classSchedules[day]) return [];
    return classSchedules[day].filter(cls => cls.grade === grade);
}

// Función para obtener todos los horarios de un grado específico
function getFullScheduleByGrade(grade) {
    const fullSchedule = {};

    Object.keys(classSchedules).forEach(day => {
        fullSchedule[day] = classSchedules[day].filter(cls => cls.grade === grade);
    });

    return fullSchedule;
}

// Función auxiliar para obtener nombre del día
function getDayName(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
}

// Función para formatear hora
function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
}