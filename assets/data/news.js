<<<<<<< HEAD
/**
 * Datos de noticias para el blog
 */

const newsData = [
    {
        id: 1,
        title: "Inauguración del nuevo laboratorio de ciencias",
        excerpt: "El colegio ha inaugurado un moderno laboratorio de ciencias equipado con tecnología de última generación.",
        content: "<p>El pasado viernes se llevó a cabo la inauguración oficial del nuevo laboratorio de ciencias de nuestro colegio. Este espacio, equipado con tecnología de última generación, permitirá a nuestros estudiantes realizar experimentos y prácticas en condiciones óptimas.</p><p>El laboratorio cuenta con microscopios digitales, equipos de medición precisos y áreas especializadas para física, química y biología. La inversión en este proyecto asciende a $50,000 dólares y fue posible gracias al apoyo de la asociación de padres y al fondo de desarrollo educativo.</p><p>Durante la ceremonia, el director resaltó la importancia de contar con instalaciones modernas para fomentar el interés por las ciencias entre los estudiantes.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-15",
        category: "Infraestructura",
        tags: ["ciencia", "tecnología", "educación"],
        featured: true,
        likes: 0,
        views: 0
    },
    {
        id: 2,
        title: "Estudiantes ganan concurso regional de matemáticas",
        excerpt: "Nuestro equipo de matemáticas obtuvo el primer lugar en el concurso regional celebrado el fin de semana pasado.",
        content: "<p>El equipo de matemáticas de nuestro colegio, compuesto por los estudiantes María González, Juan Pérez y Carlos Rodríguez, obtuvo el primer lugar en el XX Concurso Regional de Matemáticas celebrado el pasado fin de semana.</p><p>La competencia, que reunió a los mejores estudiantes de 25 colegios de la región, consistió en pruebas individuales y por equipos que evaluaron habilidades en álgebra, geometría y cálculo. Nuestros estudiantes destacaron especialmente en la prueba por equipos, resolviendo problemas complejos en tiempo récord.</p><p>Este logro les da derecho a representar a nuestra región en el concurso nacional que se celebrará el próximo mes.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-10",
        category: "Logros",
        tags: ["matemáticas", "competencias", "estudiantes"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 3,
        title: "Programa de intercambio estudiantil con Canadá",
        excerpt: "Se abre la convocatoria para el programa de intercambio estudiantil con colegios en Vancouver, Canadá.",
        content: "<p>El departamento de relaciones internacionales ha anunciado la apertura de la convocatoria para el programa de intercambio estudiantil con el Colegio Maplewood de Vancouver, Canadá.</p><p>El programa, que tendrá una duración de 3 meses (de septiembre a noviembre), permitirá a 10 estudiantes de último año vivir una experiencia educativa y cultural en el extranjero. Los seleccionados asistirán a clases regulares en el colegio canadiense y participarán en actividades culturales.</p><p>Los requisitos para postular incluyen un promedio académico mínimo de 8.5, dominio del inglés (certificado B2 o superior) y una carta de motivación. Las postulaciones estarán abiertas hasta el 30 de junio.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-05",
        category: "Programas",
        tags: ["intercambio", "internacional", "idiomas"],
        featured: true,
        likes: 0,
        views: 0
    },
    {
        id: 4,
        title: "Taller de orientación vocacional para estudiantes",
        excerpt: "El próximo martes se realizará un taller de orientación vocacional para ayudar a los estudiantes a elegir su carrera.",
        content: "<p>El departamento de orientación estudiantil ha organizado un taller de orientación vocacional que se llevará a cabo el próximo martes 23 de mayo en el auditorio principal.</p><p>El taller, dirigido a estudiantes de los dos últimos años, contará con la participación de profesionales de diversas áreas quienes compartirán sus experiencias y brindarán consejos para la elección de carrera. Además, se realizarán tests vocacionales y actividades de autoconocimiento.</p><p>Los interesados deben inscribirse previamente en la oficina de orientación estudiantil. El cupo es limitado a 50 participantes.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-03",
        category: "Talleres",
        tags: ["orientación", "carreras", "educación"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 5,
        title: "Celebración del Día del Libro con maratón de lectura",
        excerpt: "El colegio celebrará el Día Internacional del Libro con una maratón de lectura de 24 horas.",
        content: "<p>Como parte de las actividades por el Día Internacional del Libro, nuestro colegio organizará una maratón de lectura de 24 horas que comenzará el próximo 23 de abril a las 9:00 am.</p><p>El evento, abierto a toda la comunidad educativa, consistirá en la lectura continua de obras literarias clásicas y contemporáneas. Los participantes podrán inscribirse para leer durante intervalos de 15 minutos. Además, habrá stands de venta de libros con descuentos especiales y encuentros con autores locales.</p><p>La actividad busca fomentar el hábito de la lectura y celebrar la importancia de los libros en nuestra formación.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-04-20",
        category: "Eventos",
        tags: ["lectura", "cultura", "literatura"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 6,
        title: "Nuevo programa de deportes extracurriculares",
        excerpt: "A partir del próximo mes se implementarán nuevos talleres deportivos extracurriculares.",
        content: "<p>La dirección del colegio ha anunciado la implementación de un nuevo programa de deportes extracurriculares que comenzará a funcionar a partir del próximo mes.</p><p>El programa incluirá disciplinas como escalada deportiva, ultimate frisbee y ajedrez competitivo, además de los tradicionales fútbol, baloncesto y voleibol. Los talleres estarán a cargo de entrenadores certificados y se realizarán en las instalaciones del colegio en horarios vespertinos.</p><p>Las inscripciones estarán abiertas desde el lunes 15 de mayo. Los estudiantes interesados deben presentar un certificado médico de aptitud física.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-04-15",
        category: "Deportes",
        tags: ["deportes", "actividad física", "salud"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 7,
        title: "Taller de robótica para principiantes",
        excerpt: "Iniciamos un nuevo taller de robótica para estudiantes de primer año.",
        content: "...",
        image: "assets/img/news/img8.jpg",
        date: new Date().toISOString().split('T')[0], // Fecha actual
        category: "Talleres",
        tags: ["robótica", "tecnología"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 8,
        title: "Concurso de matemáticas",
        excerpt: "Los resultados del concurso de matemáticas ya están disponibles.",
        content: "...",
        image: "assets/img/news/img8.jpg",
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Ayer
        category: "Académico",
        tags: ["matemáticas", "competencias"],
        featured: false,
        likes: 0,
        views: 0
    },
];

// Datos de comentarios simulados
const commentsData = [
    {
        id: 1,
        newsId: 1,
        author: "Padre de familia",
        date: "2023-05-16",
        content: "Excelente noticia! Felicitaciones al colegio por esta inversión en la educación de nuestros hijos."
    },
    {
        id: 2,
        newsId: 1,
        author: "Exalumno",
        date: "2023-05-17",
        content: "Qué bueno ver cómo el colegio sigue mejorando. En mi época solo soñábamos con un laboratorio así."
    },
    {
        id: 3,
        newsId: 2,
        author: "Profesor Martínez",
        date: "2023-05-11",
        content: "Orgulloso del esfuerzo de nuestros estudiantes. Han demostrado dedicación y talento."
    },
    {
        id: 4,
        newsId: 3,
        author: "Estudiante",
        date: "2023-05-07",
        content: "Estoy muy interesado en el programa de intercambio. ¿Dónde puedo obtener más información?"
    }
];

// Categorías disponibles
const categories = [
    { name: "Infraestructura", count: 1 },
    { name: "Logros", count: 1 },
    { name: "Programas", count: 1 },
    { name: "Talleres", count: 1 },
    { name: "Eventos", count: 1 },
    { name: "Deportes", count: 1 }
];

// Etiquetas populares
const popularTags = [
    { name: "ciencia", count: 1 },
    { name: "matemáticas", count: 1 },
    { name: "intercambio", count: 1 },
    { name: "deportes", count: 1 },
    { name: "lectura", count: 1 },
    { name: "tecnología", count: 1 },
    { name: "educación", count: 2 },
    { name: "estudiantes", count: 2 }
=======
/**
 * Datos de noticias para el blog
 */

const newsData = [
    {
        id: 1,
        title: "Inauguración del nuevo laboratorio de ciencias",
        excerpt: "El colegio ha inaugurado un moderno laboratorio de ciencias equipado con tecnología de última generación.",
        content: "<p>El pasado viernes se llevó a cabo la inauguración oficial del nuevo laboratorio de ciencias de nuestro colegio. Este espacio, equipado con tecnología de última generación, permitirá a nuestros estudiantes realizar experimentos y prácticas en condiciones óptimas.</p><p>El laboratorio cuenta con microscopios digitales, equipos de medición precisos y áreas especializadas para física, química y biología. La inversión en este proyecto asciende a $50,000 dólares y fue posible gracias al apoyo de la asociación de padres y al fondo de desarrollo educativo.</p><p>Durante la ceremonia, el director resaltó la importancia de contar con instalaciones modernas para fomentar el interés por las ciencias entre los estudiantes.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-15",
        category: "Infraestructura",
        tags: ["ciencia", "tecnología", "educación"],
        featured: true,
        likes: 0,
        views: 0
    },
    {
        id: 2,
        title: "Estudiantes ganan concurso regional de matemáticas",
        excerpt: "Nuestro equipo de matemáticas obtuvo el primer lugar en el concurso regional celebrado el fin de semana pasado.",
        content: "<p>El equipo de matemáticas de nuestro colegio, compuesto por los estudiantes María González, Juan Pérez y Carlos Rodríguez, obtuvo el primer lugar en el XX Concurso Regional de Matemáticas celebrado el pasado fin de semana.</p><p>La competencia, que reunió a los mejores estudiantes de 25 colegios de la región, consistió en pruebas individuales y por equipos que evaluaron habilidades en álgebra, geometría y cálculo. Nuestros estudiantes destacaron especialmente en la prueba por equipos, resolviendo problemas complejos en tiempo récord.</p><p>Este logro les da derecho a representar a nuestra región en el concurso nacional que se celebrará el próximo mes.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-10",
        category: "Logros",
        tags: ["matemáticas", "competencias", "estudiantes"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 3,
        title: "Programa de intercambio estudiantil con Canadá",
        excerpt: "Se abre la convocatoria para el programa de intercambio estudiantil con colegios en Vancouver, Canadá.",
        content: "<p>El departamento de relaciones internacionales ha anunciado la apertura de la convocatoria para el programa de intercambio estudiantil con el Colegio Maplewood de Vancouver, Canadá.</p><p>El programa, que tendrá una duración de 3 meses (de septiembre a noviembre), permitirá a 10 estudiantes de último año vivir una experiencia educativa y cultural en el extranjero. Los seleccionados asistirán a clases regulares en el colegio canadiense y participarán en actividades culturales.</p><p>Los requisitos para postular incluyen un promedio académico mínimo de 8.5, dominio del inglés (certificado B2 o superior) y una carta de motivación. Las postulaciones estarán abiertas hasta el 30 de junio.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-05",
        category: "Programas",
        tags: ["intercambio", "internacional", "idiomas"],
        featured: true,
        likes: 0,
        views: 0
    },
    {
        id: 4,
        title: "Taller de orientación vocacional para estudiantes",
        excerpt: "El próximo martes se realizará un taller de orientación vocacional para ayudar a los estudiantes a elegir su carrera.",
        content: "<p>El departamento de orientación estudiantil ha organizado un taller de orientación vocacional que se llevará a cabo el próximo martes 23 de mayo en el auditorio principal.</p><p>El taller, dirigido a estudiantes de los dos últimos años, contará con la participación de profesionales de diversas áreas quienes compartirán sus experiencias y brindarán consejos para la elección de carrera. Además, se realizarán tests vocacionales y actividades de autoconocimiento.</p><p>Los interesados deben inscribirse previamente en la oficina de orientación estudiantil. El cupo es limitado a 50 participantes.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-05-03",
        category: "Talleres",
        tags: ["orientación", "carreras", "educación"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 5,
        title: "Celebración del Día del Libro con maratón de lectura",
        excerpt: "El colegio celebrará el Día Internacional del Libro con una maratón de lectura de 24 horas.",
        content: "<p>Como parte de las actividades por el Día Internacional del Libro, nuestro colegio organizará una maratón de lectura de 24 horas que comenzará el próximo 23 de abril a las 9:00 am.</p><p>El evento, abierto a toda la comunidad educativa, consistirá en la lectura continua de obras literarias clásicas y contemporáneas. Los participantes podrán inscribirse para leer durante intervalos de 15 minutos. Además, habrá stands de venta de libros con descuentos especiales y encuentros con autores locales.</p><p>La actividad busca fomentar el hábito de la lectura y celebrar la importancia de los libros en nuestra formación.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-04-20",
        category: "Eventos",
        tags: ["lectura", "cultura", "literatura"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 6,
        title: "Nuevo programa de deportes extracurriculares",
        excerpt: "A partir del próximo mes se implementarán nuevos talleres deportivos extracurriculares.",
        content: "<p>La dirección del colegio ha anunciado la implementación de un nuevo programa de deportes extracurriculares que comenzará a funcionar a partir del próximo mes.</p><p>El programa incluirá disciplinas como escalada deportiva, ultimate frisbee y ajedrez competitivo, además de los tradicionales fútbol, baloncesto y voleibol. Los talleres estarán a cargo de entrenadores certificados y se realizarán en las instalaciones del colegio en horarios vespertinos.</p><p>Las inscripciones estarán abiertas desde el lunes 15 de mayo. Los estudiantes interesados deben presentar un certificado médico de aptitud física.</p>",
        image: "assets/img/news/img8.jpg",
        date: "2023-04-15",
        category: "Deportes",
        tags: ["deportes", "actividad física", "salud"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 7,
        title: "Taller de robótica para principiantes",
        excerpt: "Iniciamos un nuevo taller de robótica para estudiantes de primer año.",
        content: "...",
        image: "assets/img/news/img8.jpg",
        date: new Date().toISOString().split('T')[0], // Fecha actual
        category: "Talleres",
        tags: ["robótica", "tecnología"],
        featured: false,
        likes: 0,
        views: 0
    },
    {
        id: 8,
        title: "Concurso de matemáticas",
        excerpt: "Los resultados del concurso de matemáticas ya están disponibles.",
        content: "...",
        image: "assets/img/news/img8.jpg",
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Ayer
        category: "Académico",
        tags: ["matemáticas", "competencias"],
        featured: false,
        likes: 0,
        views: 0
    },
];

// Datos de comentarios simulados
const commentsData = [
    {
        id: 1,
        newsId: 1,
        author: "Padre de familia",
        date: "2023-05-16",
        content: "Excelente noticia! Felicitaciones al colegio por esta inversión en la educación de nuestros hijos."
    },
    {
        id: 2,
        newsId: 1,
        author: "Exalumno",
        date: "2023-05-17",
        content: "Qué bueno ver cómo el colegio sigue mejorando. En mi época solo soñábamos con un laboratorio así."
    },
    {
        id: 3,
        newsId: 2,
        author: "Profesor Martínez",
        date: "2023-05-11",
        content: "Orgulloso del esfuerzo de nuestros estudiantes. Han demostrado dedicación y talento."
    },
    {
        id: 4,
        newsId: 3,
        author: "Estudiante",
        date: "2023-05-07",
        content: "Estoy muy interesado en el programa de intercambio. ¿Dónde puedo obtener más información?"
    }
];

// Categorías disponibles
const categories = [
    { name: "Infraestructura", count: 1 },
    { name: "Logros", count: 1 },
    { name: "Programas", count: 1 },
    { name: "Talleres", count: 1 },
    { name: "Eventos", count: 1 },
    { name: "Deportes", count: 1 }
];

// Etiquetas populares
const popularTags = [
    { name: "ciencia", count: 1 },
    { name: "matemáticas", count: 1 },
    { name: "intercambio", count: 1 },
    { name: "deportes", count: 1 },
    { name: "lectura", count: 1 },
    { name: "tecnología", count: 1 },
    { name: "educación", count: 2 },
    { name: "estudiantes", count: 2 }
>>>>>>> f544b31e5157af84e4703e6538865ca99e6358ab
];