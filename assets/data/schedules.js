/**
 * Datos de horarios de clases completos con múltiples grados
 */

// Grados y secciones disponibles
const grades = [
    "1ro A", "1ro B", "1ro C",
    "2do A", "2do B", "2do C",
    "3ro A", "3ro B", "3ro C",
    "4to A", "4to B", "4to C",
    "5to A", "5to B", "5to C"
];

// Docentes por área
const teachers = {
    "Matemáticas": ["Mengoa Mamani David", "María Gómez", "Carlos López"],
    "Comunicación": ["Ana Rodríguez", "Luis Torres"],
    "Ciencias": ["Pedro Sánchez", "Sofía Castro"],
    "Historia": ["Marta Díaz", "Jorge Ruiz"],
    "Inglés": ["Laura Méndez", "David Jiménez"],
    "Educación Física": ["Raúl Vargas", "Elena Flores"],
    "Arte": ["Carmen Ortega", "Fernando Silva"],
    "Música": ["Roberto Guzmán", "Silvia Mendoza"],
    "Tecnología": ["Juan Pérez", "Lucía Ramírez"]
};

// Horarios de clases por día y grado (estructura completa)
const classSchedules = {
    "Lunes": [
        // 1ro A
        { grade: "1ro A", subject: "Matemáticas", teacher: "Mengoa Mamani David", start: "08:00", end: "09:30", type: "normal" },
        { grade: "1ro A", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Comunicación", teacher: "Ana Rodríguez", start: "09:45", end: "11:15", type: "normal" },
        { grade: "1ro A", subject: "Receso", start: "11:15", end: "11:30", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Ciencias", teacher: "Pedro Sánchez", start: "11:30", end: "12:30", type: "normal" },

        // 1ro B
        { grade: "1ro B", subject: "Matemáticas", teacher: "María Gómez", start: "08:00", end: "09:00", type: "normal" },
        { grade: "1ro B", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Inglés", teacher: "Laura Méndez", start: "09:15", end: "10:00", type: "normal" },
        { grade: "1ro B", subject: "Educación Física", teacher: "Raúl Vargas", start: "10:00", end: "11:30", type: "práctica" },

        // 2do A
        { grade: "2do A", subject: "Historia", teacher: "Marta Díaz", start: "07:30", end: "09:00", type: "normal" },
        { grade: "2do A", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Matemáticas", teacher: "Carlos López", start: "09:15", end: "10:45", type: "normal" },
        { grade: "2do A", subject: "Arte", teacher: "Carmen Ortega", start: "10:45", end: "12:15", type: "práctica" },

        // 3ro B
        { grade: "3ro B", subject: "Tecnología", teacher: "Juan Pérez", start: "08:30", end: "10:00", type: "práctica" },
        { grade: "3ro B", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Comunicación", teacher: "Luis Torres", start: "10:15", end: "11:45", type: "normal" },

        // 4to C
        { grade: "4to C", subject: "Ciencias", teacher: "Sofía Castro", start: "07:45", end: "09:15", type: "laboratorio" },
        { grade: "4to C", subject: "Receso", start: "09:15", end: "09:30", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Música", teacher: "Roberto Guzmán", start: "09:30", end: "11:00", type: "práctica" },

        // 5to A
        { grade: "5to A", subject: "Matemáticas", teacher: "Mengoa Mamani David", start: "08:15", end: "09:45", type: "normal" },
        { grade: "5to A", subject: "Receso", start: "09:45", end: "10:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Inglés", teacher: "David Jiménez", start: "10:00", end: "11:30", type: "normal" }
    ],
    "Martes": [
        // 1ro A
        { grade: "1ro A", subject: "Educación Física", teacher: "Raúl Vargas", start: "08:00", end: "09:30", type: "práctica" },
        { grade: "1ro A", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Arte", teacher: "Carmen Ortega", start: "09:45", end: "11:15", type: "normal" },

        // 2do B
        { grade: "2do B", subject: "Matemáticas", teacher: "María Gómez", start: "07:30", end: "09:00", type: "normal" },
        { grade: "2do B", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Historia", teacher: "Jorge Ruiz", start: "09:15", end: "10:45", type: "normal" },

        // 3ro A
        { grade: "3ro A", subject: "Ciencias", teacher: "Pedro Sánchez", start: "08:30", end: "10:00", type: "laboratorio" },
        { grade: "3ro A", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Educación Física", teacher: "Elena Flores", start: "10:15", end: "11:45", type: "práctica" },

        // 5to C
        { grade: "5to C", subject: "Tecnología", teacher: "Lucía Ramírez", start: "08:00", end: "09:30", type: "práctica" },
        { grade: "5to C", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "5to C", subject: "Comunicación", teacher: "Ana Rodríguez", start: "09:45", end: "11:15", type: "normal" }
    ],
    "Miércoles": [
        // 1ro C
        { grade: "1ro C", subject: "Historia", teacher: "Marta Díaz", start: "08:00", end: "09:30", type: "normal" },
        { grade: "1ro C", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "1ro C", subject: "Matemáticas", teacher: "Carlos López", start: "09:45", end: "11:15", type: "normal" },

        // 2do C
        { grade: "2do C", subject: "Inglés", teacher: "Laura Méndez", start: "07:30", end: "09:00", type: "normal" },
        { grade: "2do C", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Ciencias", teacher: "Sofía Castro", start: "09:15", end: "10:45", type: "normal" },

        // 4to A
        { grade: "4to A", subject: "Arte", teacher: "Fernando Silva", start: "08:30", end: "10:00", type: "práctica" },
        { grade: "4to A", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Música", teacher: "Silvia Mendoza", start: "10:15", end: "11:45", type: "práctica" },

        // 5to B
        { grade: "5to B", subject: "Matemáticas", teacher: "Mengoa Mamani David", start: "08:15", end: "09:45", type: "normal" },
        { grade: "5to B", subject: "Receso", start: "09:45", end: "10:00", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Historia", teacher: "Jorge Ruiz", start: "10:00", end: "11:30", type: "normal" }
    ],
    "Jueves": [
        // 1ro B
        { grade: "1ro B", subject: "Comunicación", teacher: "Ana Rodríguez", start: "08:00", end: "09:30", type: "normal" },
        { grade: "1ro B", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Ciencias", teacher: "Pedro Sánchez", start: "09:45", end: "11:15", type: "práctica" },

        // 3ro C
        { grade: "3ro C", subject: "Matemáticas", teacher: "Carlos López", start: "07:30", end: "09:00", type: "normal" },
        { grade: "3ro C", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Tecnología", teacher: "Juan Pérez", start: "09:15", end: "10:45", type: "práctica" },

        // 4to B
        { grade: "4to B", subject: "Inglés", teacher: "David Jiménez", start: "08:30", end: "10:00", type: "normal" },
        { grade: "4to B", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Educación Física", teacher: "Raúl Vargas", start: "10:15", end: "11:45", type: "práctica" },

        // 5to A
        { grade: "5to A", subject: "Ciencias", teacher: "Sofía Castro", start: "08:15", end: "09:45", type: "laboratorio" },
        { grade: "5to A", subject: "Receso", start: "09:45", end: "10:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Arte", teacher: "Carmen Ortega", start: "10:00", end: "11:30", type: "práctica" }
    ],
    "Viernes": [
        // 1ro A
        { grade: "1ro A", subject: "Matemáticas", teacher: "Mengoa Mamani David", start: "08:00", end: "09:00", type: "examen" },
        { grade: "1ro A", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Inglés", teacher: "Laura Méndez", start: "09:15", end: "10:00", type: "normal" },

        // 2do A
        { grade: "2do A", subject: "Comunicación", teacher: "Luis Torres", start: "07:30", end: "09:00", type: "examen" },
        { grade: "2do A", subject: "Receso", start: "09:00", end: "09:15", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Música", teacher: "Roberto Guzmán", start: "09:15", end: "10:45", type: "práctica" },

        // 3ro B
        { grade: "3ro B", subject: "Historia", teacher: "Marta Díaz", start: "08:30", end: "10:00", type: "normal" },
        { grade: "3ro B", subject: "Receso", start: "10:00", end: "10:15", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Ciencias", teacher: "Pedro Sánchez", start: "10:15", end: "11:45", type: "laboratorio" },

        // 5to C
        { grade: "5to C", subject: "Matemáticas", teacher: "Mengoa Mamani David", start: "08:00", end: "09:30", type: "examen" },
        { grade: "5to C", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "5to C", subject: "Tecnología", teacher: "Lucía Ramírez", start: "23:20", end: "23:30", type: "práctica" }
    ],
    "Sábado": [
        // Solo actividades especiales los sábados
        { grade: "5to A", subject: "Preparación Universitaria", teacher: "Mengoa Mamani David", start: "09:00", end: "12:00", type: "especial" },
        { grade: "5to B", subject: "Preparación Universitaria", teacher: "María Gómez", start: "09:00", end: "12:00", type: "especial" },
        { grade: "5to C", subject: "Preparación Universitaria", teacher: "Carlos López", start: "09:00", end: "12:00", type: "especial" }
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