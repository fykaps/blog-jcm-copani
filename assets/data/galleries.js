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
        title: "Día de la madre",
        coverImage: "assets/img/galleries/dia-de-la-madre/cover.jpg",
        media: [
            { type: "image", url: "assets/img/galleries/dia-de-la-madre/img1.jpg", caption: "¡A comer se ha dicho! Concurso de velocidad con mucho sabor" },
            { type: "image", url: "assets/img/galleries/dia-de-la-madre/img2.jpg", caption: "¡Mamá en la cancha! Diversión y energía en el partido de vóley" },
            { type: "image", url: "assets/img/galleries/dia-de-la-madre/img3.jpg", caption: "Danza con amor: Un homenaje artístico para mamá" },
            // { type: "video", url: "assets/video/galleries/dia-de-la-madre/video1.mp4", caption: "Momento central de la ceremonia", poster: "assets/img/galleries/dia-de-la-madre/video-poster.jpg" },
            // { type: "audio", url: "assets/audio/galleries/dia-de-la-madre/audio1.mp3", caption: "Discurso completo del alumno destacado" },

        ],
        category: "Celebraciones",
        date: "2025-05-12",
        description: "Un espacio lleno de amor, gratitud e inspiración para honrar a todas las madres en su día."
    },
];