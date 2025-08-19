// Datos completos de la galería multimedia
const galleryData = [
    {
        id: 1,
        title: "Graduación 2023",
        coverImage: "assets/img/galleries/graduacion/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/graduacion/img1.jpg", caption: "Entrega de diplomas" },
            { type: "image", url: "assets/img/galleries/graduacion/img2.jpg", caption: "Discurso del director" },
            { type: "video", url: "assets/video/galleries/graduacion/video1.mp4", caption: "Momento central de la ceremonia", poster: "assets/img/galleries/graduacion/video-poster.jpg" },
            { type: "audio", url: "assets/audio/galleries/graduacion/audio1.mp3", caption: "Discurso completo del alumno destacado" },
            { type: "image", url: "assets/img/galleries/graduacion/img3.jpg", caption: "Fotos grupales" }
        ],
        category: "Eventos",
        date: "2023-06-15",
        description: "Ceremonia de graduación de nuestra promoción 2023. Un día lleno de emociones y logros celebrados."
    },
    {
        id: 2,
        title: "Olimpiadas Interescolares",
        coverImage: "assets/img/galleries/olimpiadas/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/olimpiadas/img1.jpg", caption: "Equipo de atletismo" },
            { type: "video", url: "assets/video/galleries/olimpiadas/video1.mp4", caption: "Carrera final 100m", poster: "assets/img/galleries/olimpiadas/video-poster.jpg" },
            { type: "image", url: "assets/img/galleries/olimpiadas/img2.jpg", caption: "Ceremonia de premiación" }
        ],
        category: "Deportes",
        date: "2023-05-20",
        description: "Participación destacada en las olimpiadas interescolares regionales."
    },
    {
        id: 3,
        title: "Graduación 2023",
        coverImage: "assets/img/galleries/graduacion/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/graduacion/img1.jpg", caption: "Entrega de diplomas" },
            { type: "image", url: "assets/img/galleries/graduacion/img2.jpg", caption: "Discurso del director" },
            { type: "video", url: "assets/video/galleries/graduacion/video1.mp4", caption: "Momento central de la ceremonia", poster: "assets/img/galleries/graduacion/video-poster.jpg" },
            { type: "audio", url: "assets/audio/galleries/graduacion/audio1.mp3", caption: "Discurso completo del alumno destacado" },
            { type: "image", url: "assets/img/galleries/graduacion/img3.jpg", caption: "Fotos grupales" }
        ],
        category: "Eventos",
        date: "2023-06-15",
        description: "Ceremonia de graduación de nuestra promoción 2023. Un día lleno de emociones y logros celebrados."
    },
    {
        id: 4,
        title: "Olimpiadas Interescolares",
        coverImage: "assets/img/galleries/olimpiadas/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/olimpiadas/img1.jpg", caption: "Equipo de atletismo" },
            { type: "video", url: "assets/video/galleries/olimpiadas/video1.mp4", caption: "Carrera final 100m", poster: "assets/img/galleries/olimpiadas/video-poster.jpg" },
            { type: "image", url: "assets/img/galleries/olimpiadas/img2.jpg", caption: "Ceremonia de premiación" }
        ],
        category: "Deportes",
        date: "2023-05-20",
        description: "Participación destacada en las olimpiadas interescolares regionales."
    },
    {
        id: 5,
        title: "Graduación 2023",
        coverImage: "assets/img/galleries/graduacion/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/graduacion/img1.jpg", caption: "Entrega de diplomas" },
            { type: "image", url: "assets/img/galleries/graduacion/img2.jpg", caption: "Discurso del director" },
            { type: "video", url: "assets/video/galleries/graduacion/video1.mp4", caption: "Momento central de la ceremonia", poster: "assets/img/galleries/graduacion/video-poster.jpg" },
            { type: "audio", url: "assets/audio/galleries/graduacion/audio1.mp3", caption: "Discurso completo del alumno destacado" },
            { type: "image", url: "assets/img/galleries/graduacion/img3.jpg", caption: "Fotos grupales" }
        ],
        category: "Eventos",
        date: "2023-06-15",
        description: "Ceremonia de graduación de nuestra promoción 2023. Un día lleno de emociones y logros celebrados."
    },
    {
        id: 6,
        title: "Olimpiadas Interescolares",
        coverImage: "assets/img/galleries/olimpiadas/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/olimpiadas/img1.jpg", caption: "Equipo de atletismo" },
            { type: "video", url: "assets/video/galleries/olimpiadas/video1.mp4", caption: "Carrera final 100m", poster: "assets/img/galleries/olimpiadas/video-poster.jpg" },
            { type: "image", url: "assets/img/galleries/olimpiadas/img2.jpg", caption: "Ceremonia de premiación" }
        ],
        category: "Deportes",
        date: "2023-05-20",
        description: "Participación destacada en las olimpiadas interescolares regionales."
    },
    {
        id: 7,
        title: "Graduación 2023",
        coverImage: "assets/img/galleries/graduacion/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/graduacion/img1.jpg", caption: "Entrega de diplomas" },
            { type: "image", url: "assets/img/galleries/graduacion/img2.jpg", caption: "Discurso del director" },
            { type: "video", url: "assets/video/galleries/graduacion/video1.mp4", caption: "Momento central de la ceremonia", poster: "assets/img/galleries/graduacion/video-poster.jpg" },
            { type: "audio", url: "assets/audio/galleries/graduacion/audio1.mp3", caption: "Discurso completo del alumno destacado" },
            { type: "image", url: "assets/img/galleries/graduacion/img3.jpg", caption: "Fotos grupales" }
        ],
        category: "Eventos",
        date: "2023-06-15",
        description: "Ceremonia de graduación de nuestra promoción 2023. Un día lleno de emociones y logros celebrados."
    },
    {
        id: 8,
        title: "Olimpiadas Interescolares",
        coverImage: "assets/img/galleries/olimpiadas/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/olimpiadas/img1.jpg", caption: "Equipo de atletismo" },
            { type: "video", url: "assets/video/galleries/olimpiadas/video1.mp4", caption: "Carrera final 100m", poster: "assets/img/galleries/olimpiadas/video-poster.jpg" },
            { type: "image", url: "assets/img/galleries/olimpiadas/img2.jpg", caption: "Ceremonia de premiación" }
        ],
        category: "Deportes",
        date: "2023-05-20",
        description: "Participación destacada en las olimpiadas interescolares regionales."
    }
];