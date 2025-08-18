// /**
//  * Datos estructurados para la página About - Versión Ecommerce
//  */

// const aboutData = {
//     schoolInfo: {
//         name: "Colegio San Andrés",
//         motto: "Educando para el futuro",
//         founded: 1995,
//         location: "Av. Principal 123, Ciudad",
//         students: 1200,
//         teachers: 85,
//         director: "Lic. María González",
//         logo: "assets/img/logo-colegio.png",
//         image: "assets/img/colegio.jpg",
//         description: "El Colegio San Andrés es una institución educativa líder comprometida con la excelencia académica y la formación integral de nuestros estudiantes. Fundado en 1995, hemos crecido para convertirnos en un referente educativo en la región."
//     },

//     creator: {
//         name: "KAG",
//         grade: "1ro A",
//         bio: "Estudiante apasionada por la tecnología y comunicación, creadora de este blog escolar como proyecto para mejorar la comunicación en nuestra institución educativa.",
//         image: "assets/img/creator.jpg",
//         modalImage: "assets/img/creator-modal.jpg"
//     },

//     collaborators: [
//         {
//             name: "Juan Pérez",
//             grade: "4to B",
//             avatar: "assets/img/avatars/avatar1.jpg"
//         },
//         {
//             name: "María López",
//             grade: "5to A",
//             avatar: "assets/img/avatars/avatar2.jpg"
//         },
//         {
//             name: "Carlos Ruiz",
//             grade: "3ro C",
//             avatar: "assets/img/avatars/avatar3.jpg"
//         },
//         {
//             name: "Ana Martínez",
//             grade: "6to A",
//             avatar: "assets/img/avatars/avatar4.jpg"
//         },
//         {
//             name: "Luis García",
//             grade: "2do B",
//             avatar: "assets/img/avatars/avatar5.jpg"
//         },
//         {
//             name: "Sofía Ramírez",
//             grade: "5to C",
//             avatar: "assets/img/avatars/avatar6.jpg"
//         }
//     ],

//     milestones: [
//         {
//             year: "2020",
//             title: "Fundación del Blog",
//             description: "Inicio del proyecto como una pequeña iniciativa escolar."
//         },
//         {
//             year: "2021",
//             title: "Primera versión pública",
//             description: "Lanzamiento oficial para toda la comunidad educativa."
//         },
//         {
//             year: "2023",
//             title: "Rediseño completo",
//             description: "Actualización a la versión actual con más funcionalidades."
//         }
//     ],

//     stats: {
//         postsPublished: 156,
//         monthlyVisitors: 3200,
//         collaborators: 12,
//         awardsWon: 3
//     }
// };

/**
 * Datos estructurados para la página About - Versión mejorada
 */

const aboutData = {
    schoolInfo: {
        name: "Colegio San Andrés",
        logo: "assets/img/logo-colegio.png",
        image: "assets/img/colegio.jpg",
        motto: "Educando para el futuro",
        founded: 1995,
        location: "Av. Principal 123, Ciudad",
        students: 1200,
        teachers: 85,
        director: "Lic. María González",
        description: "Institución educativa líder en formación integral con más de 25 años de experiencia educativa."
    },

    creator: {
        name: "KAG",
        grade: "1ro A",
        shortBio: "Estudiante creadora del blog escolar",
        image: "assets/img/creator.jpg",
        modalContent: `
            <div class="creator-modal-content">
                <img src="assets/img/creator.jpg" alt="KAG" class="creator-modal-image">
                <h3>KAG</h3>
                <p class="creator-grade">1ro A</p>
                <p class="creator-bio">Estudiante apasionada por la tecnología y comunicación, creadora de este blog escolar como proyecto para mejorar la comunicación en nuestra institución.</p>
            </div>
        `
    },

    collaborators: [
        {
            name: "Juan Pérez",
            grade: "5to B",
            avatar: "assets/img/avatars/avatar1.jpg"
        },
        {
            name: "María López",
            grade: "4to A",
            avatar: "assets/img/avatars/avatar2.jpg"
        },
        {
            name: "Carlos Ruiz",
            grade: "6to C",
            avatar: "assets/img/avatars/avatar3.jpg"
        },
        {
            name: "Ana Martínez",
            grade: "3ro B",
            avatar: "assets/img/avatars/avatar4.jpg"
        }
    ],

    team: [
        {
            name: "Profesores",
            role: "Departamento Académico",
            details: "Contribuyen con artículos educativos y reportes de actividades académicas.",
            image: "assets/img/teams/teachers.jpg"
        },
        {
            name: "Estudiantes",
            role: "Club de Periodismo",
            details: "Miembros del club de periodismo escolar que redactan noticias y entrevistas.",
            image: "assets/img/teams/students.jpg"
        }
    ],

    milestones: [
        {
            year: "2020",
            title: "Fundación del Blog",
            description: "Inicio del proyecto como una pequeña iniciativa escolar."
        },
        {
            year: "2023",
            title: "Rediseño completo",
            description: "Actualización a la versión actual con más funcionalidades."
        }
    ],

    values: [
        {
            title: "Transparencia",
            description: "Información veraz y oportuna para nuestra comunidad.",
            icon: "assets/icons/transparency.svg"
        },
        {
            title: "Innovación",
            description: "Buscamos constantemente nuevas formas de comunicación.",
            icon: "assets/icons/innovation.svg"
        }
    ]
};