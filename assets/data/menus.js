/**
 * Datos del menú del comedor estudiantil Qaliwarma
 */

const weeklyMenu = [
    {
        day: "Lunes",
        date: "2025-08-25",
        cook: "Rosa Pérez",
        helpers: {
            names: ["Lucía Pérez", "Ana Tejada"],
            grade: "5to A"
        },
        breakfast: {
            start: "09:35",
            end: "09:50",
            name: "Leche con avena y pan con huevo",
            description: "Nutritivo desayuno para empezar el día con energía",
            ingredients: [
                "Leche fresca",
                "Avena en hojuelas",
                "Pan integral",
                "Huevos",
                "Aceite vegetal",
                "Sal"
            ],
            image: "assets/img/menus/desayuno/desayuno1.jpg",
            additional: "Galleta"
        },
        lunch: {
            start: "12:30",
            end: "13:00",
            name: "Arroz con pollo y ensalada fresca",
            description: "Plato balanceado con proteínas y carbohidratos",
            ingredients: [
                "Arroz",
                "Pollo",
                "Zanahoria",
                "Arvejas",
                "Cebolla",
                "Aceite vegetal",
                "Sal",
                "Especias"
            ],
            image: "assets/img/menus/almuerzo/almuerzo1.jpg",
            additional: "Gelatina"
        }
    },
    {
        day: "Martes",
        date: "2025-08-26",
        cook: "Rosa Pérez",
        helpers: {
            names: ["Patricia Ramírez", "Laura González"],
            grade: "4to B"
        },
        breakfast: {
            start: "09:35",
            end: "09:50",
            name: "Leche con maca y pan con mermelada",
            description: "Desayuno energético con propiedades nutritivas",
            ingredients: [
                "Leche fresca",
                "Maca en polvo",
                "Pan integral",
                "Mermelada de frutas",
                "Mantequilla"
            ],
            image: "assets/img/menus/desayuno/desayuno2.png",
            additional: "Galleta"
        },
        lunch: {
            start: "12:30",
            end: "13:00",
            name: "Pescado sudado con arroz y ensalada criolla",
            description: "Plato rico en omega 3 y proteínas",
            ingredients: [
                "Pescado fresco",
                "Arroz",
                "Cebolla",
                "Tomate",
                "Limón",
                "Cilantro",
                "Aceite vegetal",
                "Sal",
                "Especias"
            ],
            image: "assets/img/menus/almuerzo/almuerzo2.jpg",
            additional: "Piña"
        }
    },
    {
        day: "Miércoles",
        date: "2025-08-27",
        cook: "Rosa Pérez",
        helpers: {
            names: ["Sofía Martínez", "Elena Sánchez"],
            grade: "4to A"
        },
        breakfast: {
            start: "09:35",
            end: "09:50",
            name: "Leche con kiwicha y pan con queso",
            description: "Desayuno rico en calcio y fibra",
            ingredients: [
                "Leche fresca",
                "Kiwicha",
                "Pan integral",
                "Queso fresco",
                "Mantequilla"
            ],
            image: "assets/img/menus/desayuno/desayuno3.jpg",
            additional: "Galleta"
        },
        lunch: {
            start: "12:30",
            end: "13:00",
            name: "Lentejas con arroz y ensalada de pepino",
            description: "Plato vegetariano rico en hierro y proteínas",
            ingredients: [
                "Lentejas",
                "Arroz",
                "Pepino",
                "Tomate",
                "Cebolla",
                "Limón",
                "Aceite vegetal",
                "Sal",
                "Especias"
            ],
            image: "assets/img/menus/almuerzo/almuerzo3.jpg",
            additional: "Papaya"
        }
    },
    {
        day: "Jueves",
        date: "2025-08-28",
        cook: "Rosa Pérez",
        helpers: {
            names: ["Matías Oro", "Elsa Plata"],
            grade: "3ro A"
        },
        breakfast: {
            start: "09:35",
            end: "09:50",
            name: "Leche con cacao y pan con mantequilla y miel",
            description: "Desayuno clásico y nutritivo",
            ingredients: [
                "Leche fresca",
                "Cacao en polvo",
                "Pan integral",
                "Mantequilla",
                "Miel de abeja"
            ],
            image: "assets/img/menus/desayuno/desayuno4.jpg",
            additional: "Galleta"
        },
        lunch: {
            start: "12:30",
            end: "13:00",
            name: "Ají de gallina con arroz y papa sancochada",
            description: "Plato tradicional peruano",
            ingredients: [
                "Gallina",
                "Arroz",
                "Papa",
                "Ají amarillo",
                "Pan remojado",
                "Leche evaporada",
                "Nuez moscada",
                "Aceite vegetal",
                "Sal",
                "Especias"
            ],
            image: "assets/img/menus/almuerzo/almuerzo4.jpg",
            additional: "Sandía"
        }
    },
    {
        day: "Viernes",
        date: "2025-08-29",
        cook: "Rosa Pérez",
        helpers: {
            names: ["Olga Bernabé", "Lidia Herrera"],
            grade: "5to B"
        },
        breakfast: {
            start: "09:35",
            end: "09:50",
            name: "Quinua con leche y pan con palta",
            description: "Desayuno alto en proteínas y grasas saludables",
            ingredients: [
                "Quinua",
                "Leche",
                "Pan integral",
                "Palta",
                "Sal"
            ],
            image: "assets/img/menus/desayuno/desayuno5.png",
            additional: "Pan"
        },
        lunch: {
            start: "12:30",
            end: "13:00",
            name: "Tallarines rojos con carne y ensalada de beterraga",
            description: "Plato de pasta con salsa de tomate y carne molida",
            ingredients: [
                "Tallarines",
                "Carne molida",
                "Tomate",
                "Cebolla",
                "Ajo",
                "Beterraga",
                "Limón",
                "Aceite vegetal",
                "Sal",
                "Especias"
            ],
            image: "assets/img/menus/almuerzo/almuerzo5.png",
            additional: "Pera"
        }
    },
    {
        day: "Sábado",
        date: "2025-08-30",
        cook: "Rosa Pérez",
        helpers: {
            names: ["Olga Bernabé", "Lidia Herrera"],
            grade: "5to B"
        },
        breakfast: {
            start: "09:35",
            end: "09:50",
            name: "Quinua con leche y pan con palta",
            description: "Desayuno alto en proteínas y grasas saludables",
            ingredients: [
                "Quinua",
                "Leche",
                "Pan integral",
                "Palta",
                "Sal"
            ],
            image: "assets/img/menus/desayuno/desayuno5.png",
            additional: "Pan"
        },
        lunch: {
            start: "12:30",
            end: "13:00",
            name: "Tallarines rojos con carne y ensalada de beterraga",
            description: "Plato de pasta con salsa de tomate y carne molida",
            ingredients: [
                "Tallarines",
                "Carne molida",
                "Tomate",
                "Cebolla",
                "Ajo",
                "Beterraga",
                "Limón",
                "Aceite vegetal",
                "Sal",
                "Especias"
            ],
            image: "assets/img/menus/almuerzo/almuerzo5.png",
            additional: "Pera"
        }
    },
    {
        day: "Domingo",
        date: "2025-08-31",
        cook: "Rosa Pérez",
        helpers: {
            names: ["Olga Bernabé", "Lidia Herrera"],
            grade: "5to B"
        },
        breakfast: {
            start: "09:35",
            end: "09:50",
            name: "Quinua con leche y pan con palta",
            description: "Desayuno alto en proteínas y grasas saludables",
            ingredients: [
                "Quinua",
                "Leche",
                "Pan integral",
                "Palta",
                "Sal"
            ],
            image: "assets/img/menus/desayuno/desayuno5.png",
            additional: "Pan"
        },
        lunch: {
            start: "12:30",
            end: "13:00",
            name: "Tallarines rojos con carne y ensalada de beterraga",
            description: "Plato de pasta con salsa de tomate y carne molida",
            ingredients: [
                "Tallarines",
                "Carne molida",
                "Tomate",
                "Cebolla",
                "Ajo",
                "Beterraga",
                "Limón",
                "Aceite vegetal",
                "Sal",
                "Especias"
            ],
            image: "assets/img/menus/almuerzo/almuerzo5.png",
            additional: "Pera"
        }
    },
];
