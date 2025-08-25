// Datos de productos de la tienda escolar
const productsData = [
    {
        id: 1,
        name: "Uniforme Escolar Varones",
        category: "uniforme",
        subcategory: "varon",
        price: 120.00,
        originalPrice: 150.00,
        discount: 20,
        description: "Uniforme escolar completo para varones, incluye camisa, pantalón y corbata. Tela de alta calidad, resistente y cómoda.",
        features: [
            "Tela poliéster-algodón",
            "Resistente al desgaste",
            "Color azul marino con detalles institucionales",
            "Disponible en tallas: S, M, L, XL"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Azul marino", "Azul oscuro"],
        images: [
            "assets/img/products/uniforme-varon-1.jpg",
            "assets/img/products/uniforme-varon-2.jpg",
            "assets/img/products/uniforme-varon-3.jpg"
        ],
        stock: 45,
        rating: 3,
        reviews: 124,
        featured: true,
        tags: ["uniforme", "varon", "escolar", "combo"]
    },
    {
        id: 2,
        name: "Uniforme Escolar Damas",
        category: "uniforme",
        subcategory: "dama",
        price: 135.00,
        originalPrice: 160.00,
        discount: 15,
        description: "Elegante uniforme escolar para damas, incluye blusa, falda y corbata. Diseño moderno y cómodo.",
        features: [
            "Tela fresca y transpirable",
            "Diseño ergonómico",
            "Color azul marino con detalles institucionales",
            "Disponible en tallas: XS, S, M, L"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Azul marino", "Gris oscuro"],
        images: [
            "assets/img/products/uniforme-dama-1.jpg",
            "assets/img/products/uniforme-dama-2.jpg",
            "assets/img/products/uniforme-dama-3.jpg"
        ],
        stock: 38,
        rating: 4.9,
        reviews: 98,
        featured: true,
        tags: ["uniforme", "dama", "escolar", "combo"]
    },
    {
        id: 3,
        name: "Chompa Escolar Varones",
        category: "chompa",
        subcategory: "varon",
        price: 85.00,
        originalPrice: 100.00,
        discount: 15,
        description: "Chompa escolar abrigada para varones, con el escudo institucional bordado. Ideal para temporada de invierno.",
        features: [
            "Material: 80% algodón, 20% poliéster",
            "Acabado anti-pilling",
            "Bolsillos frontales",
            "Disponible en tallas: S, M, L, XL"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Azul marino", "Negro", "Gris"],
        images: [
            "assets/img/products/chompa-varon-1.jpg",
            "assets/img/products/chompa-varon-2.jpg"
        ],
        stock: 25,
        rating: 4.7,
        reviews: 67,
        featured: false,
        tags: ["chompa", "varon", "invierno", "abrigado"]
    },
    {
        id: 4,
        name: "Chompa Escolar Damas",
        category: "chompa",
        subcategory: "dama",
        price: 90.00,
        originalPrice: 110.00,
        discount: 18,
        description: "Chompa escolar elegante para damas, con diseño ajustado y escudo institucional bordado.",
        features: [
            "Material: 70% acrílico, 30% lana",
            "Tejido suave y cálido",
            "Diseño femenino",
            "Disponible en tallas: XS, S, M, L"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Azul marino", "Bordeaux", "Gris claro"],
        images: [
            "assets/img/products/chompa-dama-1.jpg",
            "assets/img/products/chompa-dama-2.jpg"
        ],
        stock: 22,
        rating: 4.6,
        reviews: 54,
        featured: false,
        tags: ["chompa", "dama", "invierno", "elegante"]
    },
    {
        id: 5,
        name: "Falda Escolar",
        category: "falda",
        subcategory: "dama",
        price: 65.00,
        originalPrice: 80.00,
        discount: 19,
        description: "Falda escolar de pliegues, confeccionada en tela de alta calidad. Diseño clásico y elegante.",
        features: [
            "Tela poliéster resistente",
            "Pliegues permanentes",
            "Cierre lateral invisible",
            "Disponible en tallas: XS, S, M, L"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Azul marino", "Gris oscuro"],
        images: [
            "assets/img/products/falda-1.jpg",
            "assets/img/products/falda-2.jpg"
        ],
        stock: 30,
        rating: 4.5,
        reviews: 43,
        featured: false,
        tags: ["falda", "dama", "escolar", "pliegues"]
    },
    {
        id: 6,
        name: "Sombrero Escolar",
        category: "sombrero",
        subcategory: "unisex",
        price: 35.00,
        originalPrice: 45.00,
        discount: 22,
        description: "Sombrero escolar para protección solar, con el logo institucional bordado. Unisex.",
        features: [
            "Material: 100% poliéster",
            "Protección UV",
            "Ajustable con cinta posterior",
            "Talla única"
        ],
        sizes: ["Única"],
        colors: ["Azul marino", "Blanco", "Beige"],
        images: [
            "assets/img/products/sombrero-1.jpg",
            "assets/img/products/sombrero-2.jpg"
        ],
        stock: 50,
        rating: 4.4,
        reviews: 38,
        featured: false,
        tags: ["sombrero", "unisex", "protección solar", "verano"]
    },
    {
        id: 7,
        name: "Combo Uniforme Completo Varón",
        category: "combo",
        subcategory: "varon",
        price: 210.00,
        originalPrice: 280.00,
        discount: 25,
        description: "Combo completo que incluye uniforme, chompa y sombrero para varones. Ahorra comprando el pack completo.",
        features: [
            "Incluye: uniforme, chompa y sombrero",
            "Precio especial por combo",
            "Garantía de calidad en todos los productos",
            "Disponible en tallas coordinadas"
        ],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Azul marino"],
        images: [
            "assets/img/products/combo-varon-1.jpg",
            "assets/img/products/combo-varon-2.jpg"
        ],
        stock: 15,
        rating: 4.9,
        reviews: 32,
        featured: true,
        tags: ["combo", "varon", "completo", "ahorro"]
    },
    {
        id: 8,
        name: "Combo Uniforme Completo Dama",
        category: "combo",
        subcategory: "dama",
        price: 230.00,
        originalPrice: 295.00,
        discount: 22,
        description: "Combo completo que incluye uniforme, chompa, falda y sombrero para damas. Look escolar completo con descuento especial.",
        features: [
            "Incluye: uniforme, chompa, falda y sombrero",
            "Ahorro significativo vs compra individual",
            "Calidad premium garantizada",
            "Disponible en tallas coordinadas"
        ],
        sizes: ["XS", "S", "M", "L"],
        colors: ["Azul marino"],
        images: [
            "assets/img/products/combo-dama-1.jpg",
            "assets/img/products/combo-dama-2.jpg"
        ],
        stock: 12,
        rating: 4.8,
        reviews: 28,
        featured: true,
        tags: ["combo", "dama", "completo", "ahorro"]
    }
];