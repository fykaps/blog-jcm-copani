// Datos para la página "Acerca de"
const aboutData = {
    schoolInfo: {
        name: "IES José Carlos Mariátegui",
        motto: "Un mariateguino, siempre adelante",
        description: "Somos la Institución Educativa Secundaria con Jornada Escolar Completa 'José Carlos Mariátegui'. Brindamos educación a estudiantes de 1°, 2°, 3°, 4° y 5° grado de nivel Secundaria del distrito de Copani. Nuestros estudiantes hablan el idioma castellano y aimara y provienen de familias dedicadas a actividades agrícolas principalmente y en pequeña escala a la ganadería, pesca y comercio.",
        founded: "22 de mayo de 1984",
        director: "Lic. Desiderio Coronado Romero",
        location: "Copani, Yunguyo, Puno",
        logo: "assets/img/logo.png",
        image: "assets/img/about-us/school/school-building.jpg",
        stats: {
            years: 41,
            teachers: 27,
            students: 151
        }
    },

    missionVision: {
        mission: "Somos una comunidad educativa de sólida organización con mística de trabajo, tiene como misión brindar una educación de calidad, con metodología activa para el desarrollo de competencias orientadas a la investigación y el liderazgo, con cultura emprendedora y conciencia ecológica encaminada al desarrollo de la autonomía para la trasformación integral como actores protagónicos para trascender en la sociedad globalizada.",
        vision: "Al 2027 seremos una Institución Educativa transcendente y con estándares de calidad en los aprendizajes, con participación protagónica de los agentes educativos, como personas dignas, libres, proactivas, autónomas que vivencien principios, valores y derechos; promoviendo el cuidado y preservación del medio ambiente, la investigación e innovación, afirmando nuestra identidad y compromiso con el desarrollo de la región, en concordancia con el perfil de egreso del CNEB."
    },

    milestones: [
        {
            year: "1984",
            title: "Fundación",
            description: "La Institución Educativa Secundaria «José Carlos Mariátegui» de Copani, fue creada mediante Resolución Directoral N° 7635-84-Sétima Región de Educación Puno, con fecha 22 de mayo del año 1984; inicialmente funcionó como Colegio Mixto atendiendo a 70 estudiantes de primero al quinto grado."
        },
        {
            year: "1987",
            title: "Reconocimiento Oficial",
            description: "Posteriormente fue reconocido como Colegio Estatal con Resolución Directoral N° 1026-87-DRE en el año de 1987, como Colegio de Educación Secundaria de Copani."
        },
        {
            year: "1999",
            title: "Regularización",
            description: "Se regulariza la creación y funcionamiento como C.E.S. «José Carlos Mariátegui» de Copani con Código Modular N° 1029321, señalándose como fecha de aniversario el día 22 de mayo de cada año."
        },
        {
            year: "2015",
            title: "Jornada Escolar Completa",
            description: "La institución comienza a funcionar con Jornada Escolar Completa, ampliando y mejorando los servicios educativos."
        },
        {
            year: "2025",
            title: "Actualidad",
            description: "Se ha convertido en un referente educativo de la región, con logros académicos destacados y proyección a la comunidad."
        }
    ],

    team: [
        {
            id: "team-1",
            name: "Equipo de Profesores",
            role: "Cuerpo Docente",
            bioShort: "Contribuyen con artículos educativos y reportes de actividades académicas.",
            bio: "Nuestro equipo docente está compuesto por profesionales altamente capacitados y comprometidos con la educación de calidad. Cada profesor aporta su experiencia y conocimiento para enriquecer el contenido del blog y mantener a la comunidad informada sobre las actividades académicas.",
            image: "assets/img/about-us/teams/teachers.jpg",
            achievements: [
                "Más de 85 profesionales en diferentes áreas",
                "Capacitación continua en metodologías educativas",
                "Comprometidos con la innovación pedagógica"
            ]
        },
        {
            id: "team-2",
            name: "Estudiantes Reporteros",
            role: "Club de Periodismo Escolar",
            bioShort: "Miembros del club de periodismo escolar que redactan noticias y entrevistas.",
            bio: "Los estudiantes del club de periodismo escolar son los encargados de investigar, redactar y publicar las noticias más relevantes de nuestra institución. Desarrollan habilidades de comunicación, investigación y trabajo en equipo mientras mantienen informada a la comunidad educativa.",
            image: "assets/img/team/students.jpg",
            achievements: [
                "Ganadores del concurso regional de periodismo escolar 2024",
                "Publicación de más de 50 artículos en el último año",
                "Entrevistas a personalidades locales y educativas"
            ]
        },
        {
            id: "team-3",
            name: "Personal Administrativo",
            role: "Apoyo Institucional",
            bioShort: "Proporcionan información oficial sobre políticas y eventos institucionales.",
            bio: "El personal administrativo garantiza que la información oficial sea precisa y esté actualizada. Gestionan la comunicación institucional, coordinan eventos y aseguran que toda la comunidad educativa tenga acceso a la información relevante de manera oportuna.",
            image: "assets/img/team/staff.jpg",
            achievements: [
                "Gestión eficiente de comunicación institucional",
                "Organización de eventos escolares y comunitarios",
                "Soporte continuo a estudiantes, padres y docentes"
            ]
        }
    ],

    values: [
        {
            name: "Ética",
            description: "Que inspira una educación promotora de los valores de paz, solidaridad, justicia, libertad, honestidad, tolerancia, responsabilidad, trabajo, verdad y pleno respeto a las normas de convivencia.",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`
        },
        {
            name: "Equidad",
            description: "Que garantiza a todas iguales oportunidades de acceso, permanencia y trato en un sistema educativo de calidad.",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm3-7.5h-2v-2h-2v2H9V13h2v2h2v-2h2v-2.5z"/></svg>`
        },
        {
            name: "Inclusión",
            description: "Que incorpora a las personas con discapacidad, grupos sociales excluidos, marginados y vulnerables, especialmente en el ámbito rural.",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/><circle cx="19" cy="5" r="2" fill="currentColor"/></svg>`
        },
        {
            name: "Calidad",
            description: "Que asegura condiciones adecuadas para una educación integral, pertinente, abierta, flexible y permanente.",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>`
        },
        {
            name: "Democracia",
            description: "Que promueve el respeto irrestricto a los derechos humanos, la libertad de conciencia, pensamiento y opinión.",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm1-14c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9l-1.43-1.43c.69-1.07 1.12-2.35 1.12-3.47 0-3.31-2.69-6-6-6s-6 2.69-6 6c0 1.12.43 2.4 1.12 3.47l-1.43 1.43C4.63 15.55 4 13.85 4 12c0-4.42 3.58-8 8-8z"/></svg>`
        },
        {
            name: "Interculturalidad",
            description: "Que asume como riqueza la diversidad cultural, étnica y lingüística del país, y encuentra en el reconocimiento y respeto a las diferencias.",
            icon: `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.05-12.83c-1.33 0-2.42 1.09-2.42 2.42s1.09 2.42 2.42 2.42 2.42-1.09 2.42-2.42-1.09-2.42-2.42-2.42zm-.05 10c-2.33 0-4.32-1.45-5.12-3.5h1.67c.69 1.19 1.97 2 3.45 2s2.76-.81 3.45-2h1.67c-.8 2.05-2.79 3.5-5.12 3.5z"/></svg>`
        }
    ],

    contact: {
        address: "Av. El Estudiante S/N, Copani, Yunguyo, Puno",
        phone: "(051) 925633564",
        email: "contacto@jsm.edu.pe"
    },

    creator: {
        id: "creator-1",
        name: "KAG",
        grade: "1ro A",
        shortBio: "Estudiante apasionada por la tecnología y comunicación, creadora de este blog escolar como proyecto para mejorar la comunicación en nuestra institución educativa.",
        bio: "Soy una estudiante de primer año de secundaria apasionada por la tecnología, comunicación y el diseño. Desarrollé este blog escolar como proyecto personal con el objetivo de mejorar la comunicación dentro de nuestra institución y compartir las actividades, logros y noticias relevantes con toda la comunidad educativa. Mi visión es crear un espacio digital donde estudiantes, profesores y padres de familia puedan mantenerse informados y conectados.",
        image: "assets/img/creator.jpg",
        contact: "kag@gmail.com"
    }
};