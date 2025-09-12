// Datos completos de la galería multimedia
const galleryData = [
    // {
    //     id: 1,
    //     title: "Graduación 2023",
    //     coverImage: "assets/img/galleries/graduacion/cover.jpg",
    //     media: [
    //         { type: "image", url: "assets/img/galleries/graduacion/img1.jpg", caption: "Entrega de diplomas" },
    //         { type: "image", url: "assets/img/galleries/graduacion/img2.jpg", caption: "Discurso del director" },
    //         { type: "video", url: "assets/video/galleries/graduacion/video1.mp4", caption: "Momento central de la ceremonia", poster: "assets/img/galleries/graduacion/video-poster.jpg" },
    //         { type: "audio", url: "assets/audio/galleries/graduacion/audio1.mp3", caption: "Discurso completo del alumno destacado" },
    //         { type: "image", url: "assets/img/galleries/graduacion/img3.jpg", caption: "Fotos grupales" }
    //     ],
    //     category: "Eventos",
    //     date: "2023-06-15",
    //     description: "Ceremonia de graduación de nuestra promoción 2023. Un día lleno de emociones y logros celebrados."
    // },

    {
        id: 1,
        title: "Día de la madre",
        coverImage: "assets/img/galleries/dia-de-la-madre/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/dia-de-la-madre/img1.jpg", caption: "¡A comer se ha dicho! Concurso de velocidad con mucho sabor" },
            { type: "image", url: "assets/img/galleries/dia-de-la-madre/img2.jpg", caption: "¡Mamá en la cancha! Diversión y energía en el partido de vóley" },
            { type: "image", url: "assets/img/galleries/dia-de-la-madre/img3.jpg", caption: "Danza con amor: Un homenaje artístico para mamá" },
        ],
        category: "Celebración",
        date: "2025-05-12",
        description: "Un espacio lleno de amor, gratitud e inspiración para honrar a todas las madres en su día."
    },
    {
        id: 2,
        title: "Aniversario del colegio",
        coverImage: "assets/img/galleries/aniversario-del-colegio/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/aniversario-del-colegio/img1.jpg", caption: "Una estudiante recita con emoción una poesía en honor al XLI aniversario de la institución, mientras el director la felicita por su destacada participación." },
            { type: "image", url: "assets/img/galleries/aniversario-del-colegio/img2.jpg", caption: "Estudiantes de los grados inferiores demuestran su talento en la pista con un alegre baile, celebrando con entusiasmo el XLI aniversario de la institución." },
            { type: "image", url: "assets/img/galleries/aniversario-del-colegio/img3.jpg", caption: "Las estudiantes de los grados inferiores brillan en la pista, demostrando su talento y alegría con una hermosa presentación de baile por el aniversario del colegio." },
            { type: "image", url: "assets/img/galleries/aniversario-del-colegio/img4.jpg", caption: "La sección inferior ganadora posa orgullosa junto a todos los participantes de la danza, celebrando su esfuerzo y dedicación en el aniversario del colegio." },
            { type: "image", url: "assets/img/galleries/aniversario-del-colegio/img5.jpg", caption: "La sección superior ganadora posa junto al profesor que los acompañó, celebrando su destacada participación y triunfo en la danza del aniversario del colegio." },
            { type: "video", url: "assets/video/galleries/aniversario-del-colegio/video1.mp4", caption: "La APAFA pone el ritmo y la alegría con una presentación musical en vivo, vestidos de mariachis, llenando de color y tradición la celebración del aniversario.", poster: "assets/img/galleries/aniversario-del-colegio/video-poster.jpg" },
        ],
        category: "Celebración",
        date: "2025-05-23",
        description: "Celebramos 41 años de historia, esfuerzo y compromiso con la educación. Un aniversario que refleja el crecimiento de nuestra institución y el orgullo de toda la comunidad educativa. ¡Feliz aniversario!"
    },
    {
        id: 3,
        title: "Año nuevo andino",
        coverImage: "assets/img/galleries/year-nuevo-andino/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/year-nuevo-andino/img1.jpg", caption: "Estudiantes sirviendo con cariño el fiambre en un awayo tradicional, preparando todo para compartir y disfrutar juntos." },
            { type: "image", url: "assets/img/galleries/year-nuevo-andino/img2.jpg", caption: "Estudiantes, junto a algunas mamás, preparan con entusiasmo el fiambre para el almuerzo, compartiendo tradición, trabajo en equipo y alegría." },
            { type: "image", url: "assets/img/galleries/year-nuevo-andino/img3.jpg", caption: "Estudiantes damas organizan con esmero los fiambres, dejando todo listo para compartir un almuerzo en conjunto." },
            { type: "image", url: "assets/img/galleries/year-nuevo-andino/img4.jpg", caption: "Casi al finalizar el almuerzo, un docente posa sonriente en medio del grupo, compartiendo un momento de alegría y camaradería." },
        ],
        category: "Celebración",
        date: "2025-06-22",
        description: "Celebramos el renacer del sol y el inicio de un nuevo ciclo agrícola. El Año Nuevo Andino es una fecha sagrada para nuestras culturas originarias, llena de gratitud, rituales y conexión con la Pachamama."
    },
    {
        id: 4,
        title: "Día del campesino",
        coverImage: "assets/img/galleries/dia-del-campesino/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/dia-del-campesino/img1.jpg", caption: "Durante la celebración del Día del Campesino, un grupo de docentes se prepara para disfrutar la merienda, invitados con generosidad por una autoridad local, como muestra de hospitalidad y gratitud." },
            { type: "image", url: "assets/img/galleries/dia-del-campesino/img2.jpg", caption: "Las señoras de APAFA, uniformadas con orgullo, presentan la merienda con cariño y dedicación, mostrando su compromiso con la comunidad educativa." },
            { type: "image", url: "assets/img/galleries/dia-del-campesino/img3.jpg", caption: "Docentes se despiden del lugar agradeciendo cordialmente a la autoridad local por la cálida recepción y el generoso agasajo compartido." },
            { type: "image", url: "assets/img/galleries/dia-del-campesino/img4.jpg", caption: "El turno de nuestra institución se hace presente en la pista de danza, deleitando al público con su participación llena de ritmo y tradición." },
            { type: "image", url: "assets/img/galleries/dia-del-campesino/img5.jpg", caption: "El profesor y el presidente de APAFA reciben con orgullo el premio por haber obtenido el segundo lugar en el concurso, en representación de toda la institución." },
        ],
        category: "Celebración",
        date: "2025-06-25",
        description: "Hoy rendimos homenaje a quienes con esfuerzo, dedicación y amor por la tierra, cultivan el alimento que llega a nuestras mesas. ¡Feliz Día del Campesino! Su labor es la raíz que sostiene a nuestra sociedad."
    },
    {
        id: 5,
        title: "Concurso Crea y Emprende 2025 - Etapa IE",
        coverImage: "assets/img/galleries/crea-y-emprende-2025-etapa-ie/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/crea-y-emprende-2025-etapa-ie/img1.jpg", caption: "Estudiantes presentando sus proyectos en el patio principal" },
            { type: "image", url: "assets/img/galleries/crea-y-emprende-2025-etapa-ie/img2.jpg", caption: "Jurado evaluando las ideas innovadoras de los participantes" },
            // { type: "video", url: "assets/video/galleries/crea-y-emprende-2025/video1.mp4", caption: "Momento de la premiación en la etapa institucional", poster: "assets/img/galleries/crea-y-emprende-2025/video-poster.jpg" },
            // { type: "image", url: "assets/img/galleries/crea-y-emprende-2025/img3.jpg", caption: "Equipo ganador celebrando con entusiasmo" }
        ],
        category: "Académico",
        date: "2025-09-03",
        description: "La etapa institucional del Concurso Nacional Crea y Emprende 2025 se desarrolló en el patio principal del IES José Carlos Mariátegui. Los estudiantes mostraron su creatividad y espíritu emprendedor presentando proyectos innovadores con impacto social."
    }

];