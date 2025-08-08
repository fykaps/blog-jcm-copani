/**
 * Datos del menú del comedor estudiantil Qaliwarma
 */

// Personal del comedor
const kitchenStaff = {
    cook: "Rosa Pérez",
    helpers: {
        "Lunes": ["María Gómez", "Luisa Fernández"],
        "Martes": ["Carmen Díaz", "Ana López"],
        "Miércoles": ["Sofía Martínez", "Elena Sánchez"],
        "Jueves": ["Patricia Ramírez", "Laura González"],
        "Viernes": ["Teresa Jiménez", "Isabel Ruiz"]
    }
};

// Horarios de los servicios
const serviceHours = {
    breakfast: {
        start: "07:30",
        end: "08:30"
    },
    lunch: {
        start: "12:30",
        end: "14:00"
    }
};

// Menú semanal (ejemplo para una semana)
const weeklyMenu = [
    {
        day: "Lunes",
        date: "2023-11-20",
        breakfast: {
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
        date: "2023-11-21",
        breakfast: {
            name: "Quinua con leche y pan con palta",
            description: "Desayuno alto en proteínas y grasas saludables",
            ingredients: [
                "Quinua",
                "Leche",
                "Pan integral",
                "Palta",
                "Sal"
            ],
            image: "assets/img/menus/desayuno/desayuno2.jpg",
            additional: "Pan"
        },
        lunch: {
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
            image: "assets/img/menus/almuerzo/almuerzo2.jpg",
            additional: "Pera"
        }
    },
    // ... Continuar con miércoles, jueves y viernes
    {
        day: "Miércoles",
        date: "2023-11-22",
        breakfast: {
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
        date: "2023-11-23",
        breakfast: {
            name: "Leche con maca y pan con mermelada",
            description: "Desayuno energético con propiedades nutritivas",
            ingredients: [
                "Leche fresca",
                "Maca en polvo",
                "Pan integral",
                "Mermelada de frutas",
                "Mantequilla"
            ],
            image: "assets/img/menus/desayuno/desayuno4.jpg",
            additional: "Galleta"
        },
        lunch: {
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
            image: "assets/img/menus/almuerzo/almuerzo4.jpg",
            additional: "Piña"
        }
    },
    {
        day: "Viernes",
        date: "2023-11-24",
        breakfast: {
            name: "Leche con cacao y pan con mantequilla y miel",
            description: "Desayuno clásico y nutritivo",
            ingredients: [
                "Leche fresca",
                "Cacao en polvo",
                "Pan integral",
                "Mantequilla",
                "Miel de abeja"
            ],
            image: "assets/img/menus/desayuno/desayuno5.jpg",
            additional: "Galleta"
        },
        lunch: {
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
            image: "assets/img/menus/almuerzo/almuerzo5.jpg",
            additional: "Sandía"
        }
    }
];

// Obtener el menú del día actual
function getTodayMenu() {
    const today = new Date();
    const dayOfWeek = today.getDay() - 1; // Ajuste porque el array empieza en lunes (0)

    // Si es fin de semana, mostrar el lunes
    if (dayOfWeek < 0 || dayOfWeek > 4) {
        return weeklyMenu[0];
    }

    return weeklyMenu[dayOfWeek];
}

// Obtener el personal de hoy
function getTodayStaff() {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const today = new Date();
    const dayOfWeek = today.getDay() - 1;

    // Si es fin de semana, mostrar el lunes
    if (dayOfWeek < 0 || dayOfWeek > 4) {
        return {
            cook: kitchenStaff.cook,
            helpers: kitchenStaff.helpers["Lunes"]
        };
    }

    return {
        cook: kitchenStaff.cook,
        helpers: kitchenStaff.helpers[days[dayOfWeek]]
    };
}