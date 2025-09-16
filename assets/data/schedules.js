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
        phone: "+51 935 121 719",
        email: "david.mengoa@gmail.com"
    },
    "Heydi Maria Estrada Sucasayiri": {
        subject: "Matemáticas",
        phone: "+51 986 601 021",
        email: "maria.estrada@gmail.com"
    },
    "Oriel Jose Calizaya Gomez": {
        subject: "Matemáticas",
        phone: "+51 971 932 821",
        email: "oriel.calizaya@gmail.com"
    },
    "Dawizz William Antonio Flores": {
        subject: "Matemáticas",
        phone: "+51 951 846 160",
        email: "dawizz.antonio@gmail.com"
    },
    "Fidel Severiano Cruz Tiquilloca": {
        subject: "Ciencias Sociales",
        phone: "+51 951 994 539",
        email: "fidel.cruz@gmail.com"
    },
    "Violeta Miriam Alberssi Tisnado": {
        subject: "Ciencias Sociales",
        phone: "+51 943 171 553",
        email: "violeta.alberssi@gmail.com"
    },
    "Edgar Henry Quispe Vargas": {
        subject: "Ciencias Sociales",
        phone: "+51 952 359 258",
        email: "edgar.quispe@gmail.com"
    },
    "Rogelio Quispe Ortiz": {
        subject: "Ciencias Sociales",
        phone: "+51 929 168 979",
        email: "edgar.quispe@gmail.com"
    },
    "Fidel Severiano Cruz Tiquilloca": {
        subject: "Tutoría",
        phone: "+51 951 994 539",
        email: "fidel.cruz@gmail.com"
    },
    "David Mengoa Mamani": {
        subject: "Tutoría",
        phone: "+51 935 121 719",
        email: "david.mengoa@gmail.com"
    },
    "Violeta Miriam Alberssi Tisnado": {
        subject: "Tutoría",
        phone: "+51 943 171 553",
        email: "violeta.alberssi@gmail.com"
    },
    "Juan Zacarias Colorado Mamani": {
        subject: "Tutoría",
        phone: "+51 951 780 721",
        email: "juan.colorado@gmail.com"
    },
    "Vidal Quiñonez Quispe": {
        subject: "Tutoría",
        phone: "+51 957 768 338",
        email: "vidal.quinonez@gmail.com"
    },
    "Nestor Rene Cruz Paye": {
        subject: "Tutoría",
        phone: "+51 950 079 868",
        email: "nestor.cruz@gmail.com"
    },
    "Francisco Chambilla Sandia": {
        subject: "Tutoría",
        phone: "+51 900 934 878",
        email: "francisco.chambilla@gmail.com"
    },
    "Constantino Eulogio Apaza Lopez": {
        subject: "Tutoría",
        phone: "+51 900 001 049",
        email: "fernando.silva@gmail.com"
    },
    "Ronal David Aguilar Mamani": {
        subject: "Tutoría",
        phone: "+51 946 981 527",
        email: "ronal.aguilar@gmail.com"
    },
    "Esteban Jaime Asqui Flores": {
        subject: "Tutoría",
        phone: "+51 943 560 269",
        email: "esteban.asqui@gmail.com"
    },
    "Vidal Quiñonez Quispe": {
        subject: "Educación Religiosa",
        phone: "+51 957 768 338",
        email: "vidal.quinonez@gmail.com"
    },
    "Fidel Severiano Cruz Tiquilloca": {
        subject: "Educación Religiosa",
        phone: "+51 951 994 539",
        email: "fidel.cruz@gmail.com"
    },
    "Esteban Jaime Asqui Flores": {
        subject: "Educación Religiosa",
        phone: "+51 943 560 269",
        email: "esteban.asqui@gmail.com"
    },
    "Constantino Eulogio Apaza Lopez": {
        subject: "Educación Religiosa",
        phone: "+51 900 001 049",
        email: "constantino.apaza@gmail.com"
    },
    "Madelaine Gonzalo Segura": {
        subject: "Inglés",
        phone: "+51 918 876 532",
        email: "madelaine.gonzalo@gmail.com"
    },
    "Violeta Miriam Alberssi Tisnado": {
        subject: "Inglés",
        phone: "+51 943 171 553",
        email: "violeta.alberssi@gmail.com"
    },
    "Lourdes Sonia Laura Mamani": {
        subject: "Inglés",
        phone: "+51 966 891 100",
        email: "lourder.laura@gmail.com"
    },
    "Ronal David Aguilar Mamani": {
        subject: "Inglés",
        phone: "+51 946 981 527",
        email: "ronal.aguilar@gmail.com"
    },
    "Nestor Rene Cruz Paye": {
        subject: "Educación Física",
        phone: "+51 950 079 868",
        email: "nestor.cruz@gmail.com"
    },
    "Vidal Quiñonez Quispe": {
        subject: "Educación Física",
        phone: "+51 957 768 338",
        email: "vidal.quinonez@gmail.com"
    },
    "Nestor Palomino Manzano": {
        subject: "Arte y Cultura",
        phone: "+51 985 130 307",
        email: "nestor.palomino@gmail.com"
    },
    "Constantino Eulogio Apaza Lopez": {
        subject: "Arte y Cultura",
        phone: "+51 900 001 049",
        email: "constantino.apaza@gmail.com"
    },
    "Julio Amilcar Rivera Aguilar": {
        subject: "Desarrollo Personal",
        phone: "+51 970 922 052",
        email: "julio.rivera@gmail.com"
    },
    "Mario Estrada Pacohuanca": {
        subject: "Desarrollo Personal",
        phone: "+51 973 144 250",
        email: "mario.estrada@gmail.com"
    },
    "Violeta Miriam Alberssi Tisnado": {
        subject: "Desarrollo Personal",
        phone: "+51 943 171 553",
        email: "violeta.alberssi@gmail.com"
    },
    "Alfonso Aruquipa Ccuno": {
        subject: "Ciencia y Tecnología",
        phone: "+51 951 069 206",
        email: "alfonso.aruquipa@gmail.com"
    },
    "Alex Ramires Arenas": {
        subject: "Ciencia y Tecnología",
        phone: "+51 917 430 859",
        email: "alex.ramires@gmail.com"
    },
    "David Mengoa Mamani": {
        subject: "Ciencia y Tecnología",
        phone: "+51 935 121 719",
        email: "david.mengoa@gmail.com"
    },
    "Francisco Chambilla Sandia": {
        subject: "Ciencia y Tecnología",
        phone: "+51 900 934 878",
        email: "francisco.chambilla@gmail.com"
    },
    "Joel Calisaya Enriquez": {
        subject: "Comunicación",
        phone: "+51 932 360 049",
        email: "joel.calisaya@gmail.com"
    },
    "Eliseo Rene Calisaya Huanchi": {
        subject: "Comunicación",
        phone: "+51 910 061 040",
        email: "eliseo.calisaya@gmail.com"
    },
    "Julio Flores Quispe": {
        subject: "Comunicación",
        phone: "+51 902 588 761",
        email: "julio.quispe@gmail.com"
    },
    "Constantino Eulogio Apaza Lopez": {
        subject: "Aimara",
        phone: "+51 900 001 049",
        email: "constantino.apaza@gmail.com"
    },
    "Esteban Jaime Asqui Flores": {
        subject: "Aimara",
        phone: "+51 943 560 269",
        email: "esteban.asqui@gmail.com"
    },
    "Julio Flores Quispe": {
        subject: "Aimara",
        phone: "+51 902 588 761",
        email: "julio.quispe@gmail.com"
    },
    "Juan Zacarias Colorado Mamani": {
        subject: "Aimara",
        phone: "+51 951 780 721",
        email: "juan.colorado@gmail.com"
    },
    "Geber Yole Chambilla Condori": {
        subject: "Educación para el Trabajo",
        phone: "+51 931 417 823",
        email: "geber.chambilla@gmail.com"
    },
    "Esteban Jaime Asqui Flores": {
        subject: "Educación para el Trabajo",
        phone: "+51 943 560 269",
        email: "esteban.asqui@gmail.com"
    },
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
        { grade: "2do B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "09:50", end: "11:10", type: "Normal" },
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

        // 4to A
        { grade: "4to A", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "09:50", end: "10:30", type: "Práctica" },
        { grade: "4to A", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "10:30", end: "11:50", type: "Normal" },
        { grade: "4to A", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "4to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Matemáticas", teacher: "Dawizz William Antonio Flores", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "4to A", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "14:20", end: "15:00", type: "Normal" },

        // 4to B
        { grade: "4to B", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Tutoría", teacher: "Violeta Miriam Alberssi Tisnado", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to B", subject: "Matemáticas", teacher: "Dawizz William Antonio Flores", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "4to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to B", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "13:40", end: "15:00", type: "Normal" },

        // 4to C
        { grade: "4to C", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to C", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "4to C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "4to C", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "14:20", end: "15:00", type: "Normal" },

        // 5to A
        { grade: "5to A", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Ciencia y Tecnología", teacher: "Francisco Chambilla Sandia", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to A", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Ciencias Sociales", teacher: "Violeta Miriam Alberssi Tisnado", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "5to A", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "14:20", end: "15:00", type: "Normal" },

        // 5to B
        { grade: "5to B", subject: "Ciencias Sociales", teacher: "Violeta Miriam Alberssi Tisnado", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to B", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "5to B", subject: "Ciencia y Tecnología", teacher: "Francisco Chambilla Sandia", start: "14:20", end: "15:00", type: "Normal" },
    ],
    "Martes": [
        // 1ro A
        { grade: "1ro A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "00:15", end: "02:35", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "1ro A", subject: "Educación Religiosa", teacher: "Vidal Quiñonez Quispe", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "1ro A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "1ro A", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "1ro A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "14:20", end: "15:00", type: "Normal" },

        // 1do B
        { grade: "1ro B", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "00:15", end: "05:35", type: "Normal" },
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

        // 4to A
        { grade: "4to A", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Matemáticas", teacher: "Dawizz William Antonio Flores", start: "09:50", end: "11:10", type: "Práctica" },
        { grade: "4to A", subject: "Tutoría", teacher: "Constantino Eulogio Apaza Lopez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "4to A", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "14:20", end: "15:00", type: "Normal" },

        // 4to B
        { grade: "4to B", subject: "Matemáticas", teacher: "Dawizz William Antonio Flores", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to B", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "11:10", end: "11:50", type: "Normal" },
        { grade: "4to B", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "4to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to B", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "13:40", end: "15:00", type: "Normal" },

        // 4to C
        { grade: "4to C", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to C", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "4to C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to C", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "13:40", end: "15:00", type: "Normal" },

        // 5to A
        { grade: "5to A", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to A", subject: "Inglés", teacher: "Ronal David Aguilar Mamani", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to A", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "13:40", end: "14:20", type: "Normal" },
        { grade: "5to A", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "14:20", end: "15:00", type: "Normal" },

        // 5to B
        { grade: "5to B", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "09:50", end: "10:30", type: "Normal" },
        { grade: "5to B", subject: "Tutoría", teacher: "Esteban Jaime Asqui Flores", start: "10:30", end: "11:50", type: "Normal" },
        { grade: "5to B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "11:50", end: "12:30", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Inglés", teacher: "Ronal David Aguilar Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to B", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "13:40", end: "15:00", type: "Normal" },
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
        { grade: "4to A", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "09:50", end: "11:10", type: "Práctica" },
        { grade: "4to A", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to A", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "13:40", end: "15:00", type: "Normal" },

        // 4to B
        { grade: "4to B", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to B", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to B", subject: "Matemáticas", teacher: "Dawizz William Antonio Flores", start: "13:40", end: "15:00", type: "Normal" },

        // 4to C
        { grade: "4to C", subject: "Ciencias Sociales", teacher: "Rogelio Quispe Ortiz", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Tutoría", teacher: "Ronal David Aguilar Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to C", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to C", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "13:40", end: "14:20", type: "Normal" },
        { grade: "4to C", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "14:20", end: "15:00", type: "Normal" },

        // 5to A
        { grade: "5to A", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Educación Religiosa", teacher: "Constantino Eulogio Apaza Lopez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to A", subject: "Tutoría", teacher: "Constantino Eulogio Apaza Lopez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Inglés", teacher: "Ronal David Aguilar Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to A", subject: "Ciencia y Tecnología", teacher: "Francisco Chambilla Sandia", start: "13:40", end: "15:00", type: "Normal" },

        // 5to B
        { grade: "5to B", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to B", subject: "Ciencia y Tecnología", teacher: "Francisco Chambilla Sandia", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to B", subject: "Inglés", teacher: "Ronal David Aguilar Mamani", start: "13:40", end: "15:00", type: "Normal" },
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
        { grade: "2do A", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "13:00", end: "13:40", type: "Normal" },
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

        // 4to A
        { grade: "4to A", subject: "Desarrollo Personal", teacher: "Violeta Miriam Alberssi Tisnado", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "09:50", end: "11:10", type: "Práctica" },
        { grade: "4to A", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to A", subject: "Matemáticas", teacher: "Dawizz William Antonio Flores", start: "13:40", end: "15:00", type: "Normal" },

        // 4to B
        { grade: "4to B", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to B", subject: "Inglés", teacher: "Lourdes Sonia Laura Mamani", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to B", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "13:40", end: "15:00", type: "Normal" },

        // 4to C
        { grade: "4to C", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Ciencia y Tecnología", teacher: "Alex Ramires Arenas", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to C", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to C", subject: "Educación Física", teacher: "Vidal Quiñonez Quispe", start: "13:40", end: "15:00", type: "Normal" },

        // 5to A
        { grade: "5to A", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to A", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Ciencia y Tecnología", teacher: "Francisco Chambilla Sandia", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to A", subject: "Ciencias Sociales", teacher: "Violeta Miriam Alberssi Tisnado", start: "13:40", end: "15:00", type: "Normal" },

        // 5to B
        { grade: "5to B", subject: "Ciencia y Tecnología", teacher: "Francisco Chambilla Sandia", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to B", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to B", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "13:40", end: "15:00", type: "Normal" },
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
        { grade: "2do A", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "2do A", subject: "Ciencia y Tecnología", teacher: "Alfonso Aruquipa Ccuno", start: "13:40", end: "15:00", type: "Normal" },

        // 2do B
        { grade: "2do B", subject: "Ciencias Sociales", teacher: "Edgar Henry Quispe Vargas", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "2do B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "2do B", subject: "Aimara", teacher: "Julio Flores Quispe", start: "09:50", end: "11:10", type: "Normal" },
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

        // 4to A
        { grade: "4to A", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "09:50", end: "11:10", type: "Práctica" },
        { grade: "4to A", subject: "Desarrollo Personal", teacher: "Violeta Miriam Alberssi Tisnado", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to A", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to A", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "13:40", end: "15:00", type: "Normal" },

        // 4to B
        { grade: "4to B", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Educación Religiosa", teacher: "Fidel Severiano Cruz Tiquilloca", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to B", subject: "Arte y Cultura", teacher: "Constantino Eulogio Apaza Lopez", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to B", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "4to B", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "13:40", end: "15:00", type: "Normal" },

        // 4to C
        { grade: "4to C", subject: "Arte y Cultura", teacher: "Nestor Palomino Manzano", start: "08:15", end: "09:35", type: "Laboratorio" },
        { grade: "4to C", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Matemáticas", teacher: "David Mengoa Mamani", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "4to C", subject: "Comunicación", teacher: "Julio Flores Quispe", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "4to C", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "4to C", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "13:00", end: "14:20", type: "Normal" },
        { grade: "4to C", subject: "Inglés", teacher: "Madelaine Gonzalo Segura", start: "14:20", end: "15:00", type: "Normal" },

        // 5to A
        { grade: "5to A", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Desarrollo Personal", teacher: "Julio Amilcar Rivera Aguilar", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to A", subject: "Aimara", teacher: "Juan Zacarias Colorado Mamani", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to A", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to A", subject: "Educación para el Trabajo", teacher: "Esteban Jaime Asqui Flores", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to A", subject: "Inglés", teacher: "Ronal David Aguilar Mamani", start: "13:40", end: "15:00", type: "Normal" },

        // 5to B
        { grade: "5to B", subject: "Inglés", teacher: "Ronal David Aguilar Mamani", start: "08:15", end: "09:35", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "09:35", end: "09:50", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Matemáticas", teacher: "Oriel Jose Calizaya Gomez", start: "09:50", end: "11:10", type: "Normal" },
        { grade: "5to B", subject: "Educación Física", teacher: "Nestor Rene Cruz Paye", start: "11:10", end: "12:30", type: "Normal" },
        { grade: "5to B", subject: "Receso", start: "12:30", end: "13:00", type: "receso", isBreak: true },
        { grade: "5to B", subject: "Comunicación", teacher: "Eliseo Rene Calisaya Huanchi", start: "13:00", end: "13:40", type: "Normal" },
        { grade: "5to B", subject: "Ciencias Sociales", teacher: "Violeta Miriam Alberssi Tisnado", start: "13:40", end: "15:00", type: "Normal" },
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