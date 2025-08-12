/**
 * Datos del menú del comedor estudiantil Qaliwarma (Versión Mejorada)
 */

// Personal del comedor
const kitchenStaff = {
    cook: "Rosa Pérez",
    helpers: {
        "Lunes": {
            names: ["Lucía Pérez", "Ana Tejada"],
            grade: "5to A"
        },
        "Martes": {
            names: ["Olga Bernabé", "Lidia Herrera"],
            grade: "5to B"
        },
        "Miércoles": {
            names: ["Sofía Martínez", "Elena Sánchez"],
            grade: "4to A"
        },
        "Jueves": {
            names: ["Patricia Ramírez", "Laura González"],
            grade: "4to B"
        },
        "Viernes": {
            names: ["Matías Oro", "Elsa Plata"],
            grade: "3ro A"
        }
    }
};

// Horarios de los servicios (pueden variar por día)
const serviceHours = {
    "Lunes": {
        breakfast: { start: "09:35", end: "09:50" },
        lunch: { start: "12:30", end: "13:00" }
    },
    "Martes": {
        breakfast: { start: "09:35", end: "09:50" },
        lunch: { start: "12:30", end: "13:00" }
    },
    "Miércoles": {
        breakfast: { start: "09:35", end: "09:50" },
        lunch: { start: "12:30", end: "13:00" }
    },
    "Jueves": {
        breakfast: { start: "09:35", end: "09:50" },
        lunch: { start: "12:30", end: "13:00" }
    },
    "Viernes": {
        breakfast: { start: "09:35", end: "09:50" },
        lunch: { start: "12:30", end: "13:00" }
    }
};

// Menú semanal (ejemplo para una semana)
const weeklyMenu = [
    {
        day: "Lunes",
        date: "2025-08-11",
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
        date: "2025-08-12",
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
    {
        day: "Miércoles",
        date: "2025-08-13",
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
        date: "2025-08-14",
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
        date: "2025-08-15",
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
    const today = TimeUtils.getNowInLima();
    const todayDateStr = today.toISOString().split('T')[0];

    // Buscar por fecha exacta
    const todayMenu = weeklyMenu.find(item => item.date === todayDateStr);
    if (todayMenu) return todayMenu;

    // Si no coincide la fecha, buscar por día de la semana
    const dayOfWeek = today.getDay() - 1; // Ajuste porque el array empieza en lunes (0)
    console.log(dayOfWeek)
    // Si es fin de semana, mostrar el lunes
    if (dayOfWeek < 0 || dayOfWeek > 4) {
        return weeklyMenu[0];
    }

    return weeklyMenu[dayOfWeek];
}

// Obtener el menú de días específicos
function getMenuByDay(dayName) {
    return weeklyMenu.find(item => item.day === dayName);
}

// Obtener el personal de hoy
function getTodayStaff() {
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const today = TimeUtils.getNowInLima();
    const dayOfWeek = today.getDay() - 1;

    // Si es fin de semana, mostrar el lunes
    if (dayOfWeek < 0 || dayOfWeek > 4) {
        return {
            cook: kitchenStaff.cook,
            helpers: kitchenStaff.helpers["Lunes"].names,
            grade: kitchenStaff.helpers["Lunes"].grade
        };
    }

    const dayName = days[dayOfWeek];
    return {
        cook: kitchenStaff.cook,
        helpers: kitchenStaff.helpers[dayName].names,
        grade: kitchenStaff.helpers[dayName].grade
    };
}

// Obtener el personal por día
function getStaffByDay(dayName) {
    return {
        cook: kitchenStaff.cook,
        helpers: kitchenStaff.helpers[dayName].names,
        grade: kitchenStaff.helpers[dayName].grade
    };
}

// Obtener horarios por día
function getHoursByDay(dayName) {
    return serviceHours[dayName] || {
        breakfast: { start: "07:30", end: "08:30" },
        lunch: { start: "12:30", end: "14:00" }
    };
}

// Formatear fecha en formato local
function formatDate(dateString, options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) {
    return new Date(dateString).toLocaleDateString('es-PE', options);
}

// Hacer las funciones accesibles globalmente
window.getMenuByDay = getMenuByDay;
window.getTodayMenu = getTodayMenu;
window.getHoursByDay = getHoursByDay;