/**
 * Datos de horarios de clases completos con múltiples grados
 * Incluye información de contacto de profesores
 */

// Grados y secciones disponibles
const grades = [
    "1ro A", "1ro B",
    "2do A", "2do B", "2do C",
    "3ro A", "3ro B", "3ro C",
    "4to A", "4to B", "4to C",
    "5to A", "5to B"
];

// Información completa de profesores con teléfonos
const teachers = {
    "David Mengoa Mamani": {
        subject: "Matemáticas",
        phone: "+51 987 654 321",
        email: "david.mengoa@colegio.edu"
    },
    "Heydi Maria Estrada Sucasayiri": {
        subject: "Matemáticas",
        phone: "+51 987 674 322",
        email: "maria.estrada@colegio.edu"
    },
    "Oriel Jose Calizaya Gomez": {
        subject: "Matemáticas",
        phone: "+51 955 678 123",
        email: "oriel.calizaya@colegio.edu"
    },
    "Fidel Severiano Cruz Tiquilloca": {
        subject: "Ciencias Sociales",
        phone: "+51 987 654 324",
        email: "fidel.cruz@colegio.edu"
    },
    "Violeta Miriam Alberssi Tisnado": {
        subject: "Ciencias Sociales",
        phone: "+51 987 654 335",
        email: "violeta.alberssi@colegio.edu"
    },
    "Edgar Henry Quispe Vargas": {
        subject: "Ciencias Sociales",
        phone: "+51 987 654 325",
        email: "edgar.quispe@colegio.edu"
    },
    "Rogelio Quispe Ortiz": {
        subject: "Ciencias Sociales",
        phone: "+51 933 611 364",
        email: "edgar.quispe@colegio.edu"
    },
    "Fidel Severiano Cruz Tiquilloca": {
        subject: "Tutoría",
        phone: "+51 987 654 324",
        email: "fidel.cruz@colegio.edu"
    },
    "David Mengoa Mamani": {
        subject: "Tutoría",
        phone: "+51 987 654 321",
        email: "david.mengoa@colegio.edu"
    },
    "Violeta Miriam Alberssi Tisnado": {
        subject: "Tutoría",
        phone: "+51 987 654 335",
        email: "violeta.alberssi@colegio.edu"
    },
    "Juan Zacarias Colorado Mamani": {
        subject: "Tutoría",
        phone: "+51 987 333 555",
        email: "juan.colorado@colegio.edu"
    },
    "Vidal Quiñonez Quispe": {
        subject: "Tutoría",
        phone: "+51 987 654 327",
        email: "vidal.quinonez@colegio.edu"
    },
    "Nestor Rene Cruz Paye": {
        subject: "Tutoría",
        phone: "+51 987 654 332",
        email: "nestor.cruz@colegio.edu"
    },
    "Francisco Chambilla Sandia": {
        subject: "Tutoría",
        phone: "+51 957 222 111",
        email: "francisco.chambilla@colegio.edu"
    },
    "Vidal Quiñonez Quispe": {
        subject: "Educación Religiosa",
        phone: "+51 987 654 327",
        email: "vidal.quinonez@colegio.edu"
    },
    "Fidel Severiano Cruz Tiquilloca": {
        subject: "Educación Religiosa",
        phone: "+51 987 654 324",
        email: "fidel.cruz@colegio.edu"
    },
    "Esteban Jaime Asqui Flores": {
        subject: "Educación Religiosa",
        phone: "+51 987 354 222",
        email: "esteban.asqui@colegio.edu"
    },
    "Madelaine Gonzalo Segura": {
        subject: "Inglés",
        phone: "+51 987 654 329",
        email: "madelaine.gonzalo@colegio.edu"
    },
    "Violeta Miriam Alberssi Tisnado": {
        subject: "Inglés",
        phone: "+51 987 654 335",
        email: "violeta.alberssi@colegio.edu"
    },
    "Lourdes Sonia Laura Mamani": {
        subject: "Inglés",
        phone: "+51 966 666 366",
        email: "lourder.laura@colegio.edu"
    },
    "Nestor Rene Cruz Paye": {
        subject: "Educación Física",
        phone: "+51 987 654 332",
        email: "nestor.cruz@colegio.edu"
    },
    "Vidal Quiñonez Quispe": {
        subject: "Educación Física",
        phone: "+51 987 654 327",
        email: "vidal.quinonez@colegio.edu"
    },
    "Nestor Palomino Manzano": {
        subject: "Arte y Cultura",
        phone: "+51 987 654 334",
        email: "nestor.palomino@colegio.edu"
    },
    "Constantino Eulogio Apaza Lopez": {
        subject: "Arte y Cultura",
        phone: "+51 987 654 335",
        email: "fernando.silva@colegio.edu"
    },
    "Julio Amilcar Rivera Aguilar": {
        subject: "Desarrollo Personal",
        phone: "+51 987 654 336",
        email: "julio.rivera@colegio.edu"
    },
    "Mario Estrada Pacohuanca": {
        subject: "Desarrollo Personal",
        phone: "+51 987 654 337",
        email: "mario.estrada@colegio.edu"
    },
    "Alfonso Aruquipa Ccuno": {
        subject: "Ciencia y Tecnología",
        phone: "+51 987 654 338",
        email: "alfonso.aruquipa@colegio.edu"
    },
    "Alex Ramires Arenas": {
        subject: "Ciencia y Tecnología",
        phone: "+51 987 654 339",
        email: "alex.ramires@colegio.edu"
    },
    "David Mengoa Mamani": {
        subject: "Ciencia y Tecnología",
        phone: "+51 987 654 321",
        email: "david.mengoa@colegio.edu"
    },
    "Joel Calisaya Enriquez": {
        subject: "Comunicación",
        phone: "+51 987 654 340",
        email: "joel.calisaya@colegio.edu"
    },
    "Eliseo Rene Calisaya Huanchi": {
        subject: "Comunicación",
        phone: "+51 920 124 440",
        email: "eliseo.calisaya@colegio.edu"
    },
    "Constantino Eulogio Apaza Lopez": {
        subject: "Aimara",
        phone: "+51 987 654 341",
        email: "constantino.apaza@colegio.edu"
    },
    "Esteban Jaime Asqui Flores": {
        subject: "Aimara",
        phone: "+51 987 354 222",
        email: "esteban.asqui@colegio.edu"
    },
    "Julio Flores Quispe": {
        subject: "Aimara",
        phone: "+51 987 354 000",
        email: "julio.quispe@colegio.edu"
    },
    "Juan Zacarias Colorado Mamani": {
        subject: "Aimara",
        phone: "+51 987 333 555",
        email: "juan.colorado@colegio.edu"
    },
    "Geber Yole Chambilla Condori": {
        subject: "Educación para el Trabajo",
        phone: "+51 987 654 342",
        email: "geber.chambilla@colegio.edu"
    }
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
        { grade: "1ro B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Tutoría", teacher: "David Mengoa Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro B", subject: "Ciencias Sociales", teacher: "Violeta Miriam Alberssi Tisnado", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Educación Religiosa", teacher: "Vidal Quiñonez Quispe", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "1ro B", subject: "Inglés", teacher: "Violeta Miriam Alberssi Tisnado", start: "14:20", end: "15:00", type: "Normal" },

        // 2do A
        { grade: "2do A", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do A", subject: "Ciencias Sociales", teacher: "Edgar Henry Quispe Vargas", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Aimara", teacher: "Julio Flores Quispe", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do A", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "13:40", end: "15:00", type: "Normal" },

        // 2do B
        { grade: "2do B", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2ro B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do B", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do B", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "13:40", end: "15:00", type: "Normal" },

        // 2do C
        { grade: "2do C", subject: "Tutoría", teacher: "Vidal Quiñonez Quispe", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do C", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do C", subject: "Aimara", teacher: "Julio Flores Quispe", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro A
        { grade: "3ro A", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro A", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "11:10", end: "11:50", type: "Normal" },
        { grade: "3ro A", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "3ro A", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro B
        { grade: "3ro B", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro B", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Tutoría", teacher: "Francisco Chambilla Sandia", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro B", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "14:20", end: "15:00", type: "Normal" },

        // 3ro C
        { grade: "3ro C", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro C", subject: "Tutoría", teacher: "Nestor Rene Cruz Paye", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Ciencia y Tecnología", teacher: "David Mengoa Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "3ro C", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "13:40", end: "15:00", type: "Normal" },

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

        // 1do B
        { grade: "1ro B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Inglés", teacher: "Violeta Miriam Alberssi Tisnado", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro B", subject: "Ciencias Sociales", teacher: "Violeta Miriam Alberssi Tisnado", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Aimara", teacher: "Esteban Jaime Asqui Flores", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "1ro B", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "13:40", end: "15:00", type: "Normal" },

        // 2do A
        { grade: "2do A", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do A", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "11:10", end: "11:50", type: "Normal" },
        { grade: "2do A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "2do A", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "14:20", end: "15:00", type: "Normal" },

        // 2do B
        { grade: "2do B", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Ciencias Sociales", teacher: "Edgar Henry Quispe Vargas", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do B", subject: "Aimara", teacher: "Julio Flores Quispe", start: "11:10", end: "11:50", type: "Normal" },
        { grade: "2do B", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do B", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "13:40", end: "15:00", type: "Normal" },

        // 2do C
        { grade: "2do C", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do C", subject: "Ciencias Sociales", teacher: "Edgar Henry Quispe Vargas", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do C", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro A
        { grade: "3ro A", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro A", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro A", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "14:20", end: "15:00", type: "Normal" },

        // 3ro B
        { grade: "3ro B", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "08:15", end: "08:55", type: "Normal" },
        { grade: "3ro B", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "08:55", end: "09:35", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro B", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "3ro B", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro C
        { grade: "3ro C", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro C", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "3ro C", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "13:40", end: "15:00", type: "Normal" },

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

        // 1ro B
        { grade: "1ro B", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro B", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "1ro B", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "14:20", end: "15:00", type: "Centro de Computo" },

        // 2do A
        { grade: "2do A", subject: "Ciencias Sociales", teacher: "Edgar Henry Quispe Vargas", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do A", subject: "Aimara", teacher: "Julio Flores Quispe", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "2do A", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "14:20", end: "15:00", type: "Normal" },

        // 2do B
        { grade: "2do B", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do B", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do B", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "13:40", end: "15:00", type: "Normal" },

        // 2do C
        { grade: "2do C", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do C", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "11:10", end: "11:50", type: "Normal" },
        { grade: "2do C", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Aimara", teacher: "Julio Flores Quispe", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do C", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro A
        { grade: "3ro A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro A", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro A", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "14:20", end: "15:00", type: "Normal" },

        // 3ro B
        { grade: "3ro B", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro B", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro B", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "14:20", end: "15:00", type: "Normal" },

        // 3ro C
        { grade: "3ro C", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Ciencia y Tecnología", teacher: "David Mengoa Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro C", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "3ro C", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "13:40", end: "14:20", type: "Normal" },
        { grade: "3ro C", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "14:20", end: "15:00", type: "Normal" },

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
        { grade: "1ro B", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "09:50", end: "10:30", type: "Normal" },
        { grade: "1ro B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "10:30", end: "11:10", type: "Normal" },
        { grade: "1ro B", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "1ro B", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "13:40", end: "15:00", type: "Normal" },

        // 2do A
        { grade: "2do A", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do A", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2ro A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do A", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "13:40", end: "15:00", type: "Normal" },

        // 2do B
        { grade: "2do B", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Tutoría", teacher: "Juan Zacarias Colorado Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do B", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "13:40", end: "15:00", type: "Normal" },

        // 2do C
        { grade: "2do C", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Matemáticas", teacher: "Heydi Maria Estrada Sucasayiri", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do C", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do C", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro A
        { grade: "3ro A", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Educación Religiosa", teacher: "Esteban Jaime Asqui Flores", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro A", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro A", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "14:20", end: "15:00", type: "Normal" },

        // 3ro B
        { grade: "3ro B", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro B", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "3ro B", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro C
        { grade: "3ro C", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Ciencia y Tecnología", teacher: "David Mengoa Mamani", start: "09:50", end: "11:10", type: "Laboratorio" },
        { grade: "3ro C", subject: "Desarrollo Personal", teacher: "Mario Estrada Pacohuanca", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro C", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "14:20", end: "15:00", type: "Normal" },

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

        // 1ro B
        { grade: "1ro B", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Inglés", teacher: "Violeta Miriam Alberssi Tisnado", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro B", subject: "Aimara", teacher: "Esteban Jaime Asqui Flores", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro B", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "1ro B", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "14:20", end: "15:00", type: "Normal" },

        // 2do A
        { grade: "2do A", subject: "Tutoría", teacher: "Violeta Miriam Alberssi Tisnado", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do A", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2ro A", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "13:40", end: "15:00", type: "Normal" },

        // 2do B
        { grade: "2do B", subject: "Ciencias Sociales", teacher: "Edgar Henry Quispe Vargas", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2ro B", subject: "Aimara", teacher: "Julio Flores Quispe", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "2do B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "14:20", end: "15:00", type: "Normal" },

        // 2do C
        { grade: "2do C", subject: "Comunicación", teacher: "Joel Calisaya Enriquez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "2do C", subject: "Ciencias Sociales", teacher: "Edgar Henry Quispe Vargas", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "2do C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "2do C", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do C", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro A
        { grade: "3ro A", subject: "Tutoría", teacher: "Nestor Rene Cruz Paye", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro A", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "3ro A", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "13:40", end: "15:00", type: "Normal" },

        // 3ro B
        { grade: "3ro B", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "3ro B", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro B", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro B", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "14:20", end: "15:00", type: "Normal" },

        // 3ro C
        { grade: "3ro C", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Educación para el Trabajo", teacher: "Geber Yole Chambilla Condori", start: "09:50", end: "11:10", type: "Laboratorio" },
        { grade: "3ro C", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "3ro C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "3ro C", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "3ro C", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "14:20", end: "15:00", type: "Normal" },

        // 5to C
        { grade: "5to C", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "08:00", end: "09:30", type: "Exámen" },
        { grade: "5to C", subject: "Receso", start: "09:30", end: "09:45", type: "receso", isBreak: true },
        { grade: "5to C", subject: "Ciencia y Tecnología", teacher: "Lucía Ramírez", start: "23:20", end: "23:30", type: "Práctica" }
    ],
    "Sábado": [],
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

// Función para obtener información del profesor
function getTeacherInfo(teacherName) {
    return teachers[teacherName] || {
        subject: "Asignatura no especificada",
        phone: "No disponible",
        email: "No disponible"
    };
}