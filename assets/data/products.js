// Datos de productos de la tienda escolar - Versión Mejorada
const productsData = [
    // {
    //     id: 1,
    //     name: "Uniforme Escolar Varones",
    //     category: "uniforme",
    //     subcategory: "varon",
    //     description: "Uniforme escolar completo para varones, incluye camisa, pantalón y corbata. Tela de alta calidad, resistente y cómoda.",
    //     features: [
    //         "Tela poliéster-algodón",
    //         "Resistente al desgaste",
    //         "Color azul marino con detalles institucionales",
    //         "Disponible en tallas: S, M, L, XL"
    //     ],
    //     sizes: ["S", "M", "L", "XL"],
    //     colors: ["Azul marino", "Azul oscuro"],
    //     images: [
    //         "assets/img/products/uniforme-varon-1.jpg",
    //         "assets/img/products/uniforme-varon-2.jpg",
    //         "assets/img/products/uniforme-varon-3.jpg"
    //     ],
    //     tags: ["uniforme", "varon", "escolar", "combo"],
    //     status: "available"
    // },
    // {
    //     id: 2,
    //     name: "Uniforme Escolar Damas",
    //     category: "uniforme",
    //     subcategory: "dama",
    //     description: "Elegante uniforme escolar para damas, incluye blusa, falda y corbata. Diseño moderno y cómodo.",
    //     features: [
    //         "Tela fresca y transpirable",
    //         "Diseño ergonómico",
    //         "Color azul marino con detalles institucionales",
    //         "Disponible en tallas: XS, S, M, L"
    //     ],
    //     sizes: ["XS", "S", "M", "L"],
    //     colors: ["Azul marino", "Gris oscuro"],
    //     images: [
    //         "assets/img/products/uniforme-dama-1.jpg",
    //         "assets/img/products/uniforme-dama-2.jpg",
    //         "assets/img/products/uniforme-dama-3.jpg"
    //     ],
    //     tags: ["uniforme", "dama", "escolar", "combo"],
    //     status: "available"
    // },
    {
        id: 1,
        name: "Chompa Escolar Unisex",
        category: "chompa",
        subcategory: "unisex",
        description: "Chompa escolar unisex de diseño elegante y moderno, con ajuste cómodo. Confeccionada con materiales de alta calidad, incluye el logo de la institución finamente bordado.",
        features: [
            "Material: 70% acrílico, 30% lana",
            "Tejido suave y cálido",
            "Diseño adaptable para damas y varones",
            "Disponible en tallas: XS, S, M, L"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Bordeaux",],
        images: [
            "assets/img/products/unisex/chompa-unisex-1.png",
            "assets/img/products/unisex/chompa-unisex-2.png"
        ],
        tags: ["chompa", "unisex", "invierno", "elegante"],
        status: "available"
    },
    {
        id: 2,
        name: "Falda Escolar",
        category: "falda",
        subcategory: "dama",
        description: "Falda escolar de pliegues, confeccionada en tela de alta calidad. Diseño clásico y elegante.",
        features: [
            "Tela poliéster resistente",
            "Pliegues permanentes",
            "Cierre lateral invisible",
            "Disponible en tallas: XS, S, M, L"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Bordeaux",],
        images: [
            "assets/img/products/woman/falda-1.png",
            "assets/img/products/woman/falda-2.png"
        ],
        tags: ["falda", "dama", "escolar", "pliegues"],
        status: "available"
    },
    {
        id: 3,
        name: "Sombrero Escolar Unisex",
        category: "sombrero",
        subcategory: "unisex",
        description: "Sombrero escolar unisex para protección solar, con el logo institucional bordado. Ideal para actividades al aire libre.",
        features: [
            "Material: 100% poliéster",
            "Protección UV",
            "Ajustable con cinta posterior",
            "Talla única"
        ],
        sizes: ["Única"],
        colors: ["Azul marino",],
        images: [
            "assets/img/products/unisex/sombrero-unisex-1.png",
            "assets/img/products/unisex/sombrero-unisex-2.png",
        ],
        tags: ["sombrero", "unisex", "protección solar", "verano"],
        status: "available"
    },
    {
        id: 4,
        name: "Combo Uniforme Completo Varón",
        category: "combo",
        subcategory: "varon",
        description: "Combo completo que incluye uniforme, chompa y sombrero para varones. Contactar para más información.",
        features: [
            "Incluye: uniforme, chompa y sombrero",
            "Calidad garantizada en todos los productos",
            "Disponible en tallas coordinadas"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Azul marino", "Bordeaux",],
        images: [
            "assets/img/products/man/combo-varon-1.png",
            // "assets/img/products/man/combo-varon-2.png"
        ],
        tags: ["combo", "varon", "completo"],
        status: "available"
    },
    {
        id: 5,
        name: "Combo Uniforme Completo Dama",
        category: "combo",
        subcategory: "dama",
        description: "Combo completo que incluye uniforme, chompa, falda y sombrero para damas. Contactar para más información.",
        features: [
            "Incluye: uniforme, chompa, falda y sombrero",
            "Calidad premium garantizada",
            "Disponible en tallas coordinadas"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Azul marino", "Bordeaux",],
        images: [
            "assets/img/products/woman/combo-dama-1.png",
            // "assets/img/products/woman/combo-dama-2.png"
        ],
        tags: ["combo", "dama", "completo"],
        status: "available"
    }
];