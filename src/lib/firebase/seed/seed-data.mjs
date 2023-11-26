
export const categories = [
    {
        name: "TV & Аудио",
        slug: "tv-i-audio",
        image: "TV-Audio.png",
    },
    {
        name: "Смартфоны & Планшеты",
        slug: "smartphones-i-tablets",
        image: "Tel.png",
    },
    {
        name: "Ноутбуки & ПК",
        slug: "laptops-i-pc",
        image: "laptops-PC.png",
    },
    {
        name: "Периферия & Аксессуары",
        slug: "peripherals-i-accessories",
        image: "accessories.png",
    },
    {
        name: "Фото & Видео",
        slug: "photo-i-video",
        image: "photo-video.png",
    },
    {
        name: "Комплектующие для ПК",
        slug: "pc-components",
        image: "pc-accessories.png",
    },
    {
        name: "Консоли & Видеоигры",
        slug: "consoles-i-games",
        image: "consoles.png",
    },
    {
        name: "Сетевое оборудование",
        slug: "network-equipment",
        image: "network-equipment.png",
    },
];

export const subcategories = [
    {
        name: "Телевизоры",
        slug: "tv",
        category: "TV & Аудио"
    },
    {
        name: "Аудио",
        slug: "audio",
        category: "TV & Аудио"
    },
    {
        name: "Смартфоны",
        slug: "smartphones",
        category: "Смартфоны & Планшеты"
    },
    {
        name: "Планшеты",
        slug: "tablets",
        category: "Смартфоны & Планшеты"
    },
    {
        name: "Ноутбуки",
        slug: "laptops",
        category: "Ноутбуки & ПК"
    },
    {
        name: "ПК",
        slug: "pc",
        category: "Ноутбуки & ПК"
    },
    {
        name: "Периферия",
        slug: "peripherals",
        category: "Периферия & Аксессуары"
    },
    {
        name: "Аксессуары",
        slug: "accessories",
        category: "Периферия & Аксессуары"
    },
    {
        name: "Фото",
        slug: "photo",
        category: "Фото & Видео"
    },
    {
        name: "Видео",
        slug: "video",
        category: "Фото & Видео"
    },
    {
        name: "Видеокарты",
        slug: "graphics-cards",
        category: "Комплектующие для ПК"
    },
    {
        name: "Процессоры",
        slug: "processors",
        category: "Комплектующие для ПК"
    },
    {
        name: "Консоли",
        slug: "consoles",
        category: "Консоли & Видеоигры"
    },
    {
        name: "Видеоигры",
        slug: "games",
        category: "Консоли & Видеоигры"
    },
    {
        name: "Роутеры",
        slug: "routers",
        category: "Сетевое оборудование"
    },
    {
        name: "Кабели",
        slug: "cables",
        category: "Сетевое оборудование"
    },
];

export const products = [
    {
        name: "Huawei Nova 9, Qualcomm SM7325 Snapdragon 778G",
        images: [
            { img: "product1/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 300,
        description: "Описание",
        rating: 5,
        reviewsCount: 798,
    },
    {
        name: "IPS LED Lenovo ThinkVision 27",
        images: [
            { img: "product2/img1.png" }
        ],
        category: "TV & Аудио",
        subcategory: "Телевизоры",
        price: 180,
        description: "Описание",
        rating: 3,
        reviewsCount: 355,
    },
    {
        name: "D-SLR Canon EOS R10",
        images: [
            { img: "product3/img1.png" }
        ],
        category: "Фото & Видео",
        subcategory: "Фото",
        price: 1100,
        newPrice: 750,
        description: "Описание",
        rating: 4,
        reviewsCount: 125,
    },
    {
        name: "DELL Vostro 3910 MT",
        images: [
            { img: "product4/img1.png" }
        ],
        category: "Ноутбуки & ПК",
        subcategory: "ПК",
        price: 600,
        description: "Описание",
        rating: 2,
        reviewsCount: 1252,
    },
    {
        name: "Asus VivoBook S 14 Flip TP3402ZA",
        images: [
            { img: "product5/img1.png" }
        ],
        category: "Ноутбуки & ПК",
        subcategory: "Ноутбуки",
        price: 1000,
        description: "Описание",
        rating: 5,
        reviewsCount: 556,
    },
    {
        name: "Sony SRS-XP700",
        images: [
            { img: "product6/img1.png" }
        ],
        category: "TV & Аудио",
        subcategory: "Аудио",
        price: 400,
        newPrice: 350,
        description: "Описание",
        rating: 3,
        reviewsCount: 56,
    },
    {
        name: "Laptop HP 250 G9",
        images: [
            { img: "product7/img1.png" }
        ],
        category: "Ноутбуки & ПК",
        subcategory: "Ноутбуки",
        price: 490,
        description: "Описание",
        rating: 4,
        reviewsCount: 775,
    },
    {
        name: "Canon EF-S 18-135mm",
        images: [
            { img: "product8/img1.png" }
        ],
        category: "Фото & Видео",
        subcategory: "Фото",
        price: 510,
        description: "Описание",
        rating: 2,
        reviewsCount: 75,
    },
    {
        name: "Smartwatch Huawei Watch GT 3",
        images: [
            { img: "product9/img1.png" }
        ],
        category: "Переферия & Аксессуары",
        subcategory: "Аксессуары",
        price: 250,
        description: "Описание",
        rating: 5,
        reviewsCount: 1175,
    },
    {
        name: "Nokia 105 (2019)",
        images: [
            { img: "product10/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 20,
        description: "Описание",
        rating: 5,
        reviewsCount: 666,
    },
    {
        name: "Apple TV",
        images: [
            { img: "product11/img1.png" }
        ],
        category: "TV & Аудио",
        subcategory: "TV",
        price: 160,
        newPrice: 140,
        description: "Описание",
        rating: 4,
        reviewsCount: 344,
    },
    {
        name: "Graphic Tablet Wacom Cintiq 16",
        images: [
            { img: "product12/img1.png" }
        ],
        category: "Фото & Видео",
        subcategory: "Фото",
        price: 600,
        newPrice: 500,
        description: "Описание",
        rating: 3,
        reviewsCount: 460,
    },
    {
        name: "E-ink Kindle PaperWhite 2021",
        images: [
            { img: "product13/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Планшеты",
        price: 160,
        newPrice: 120,
        description: "Описание",
        rating: 2,
        reviewsCount: 560,
    },
    {
        name: "Samsung Galaxy Note 10",
        images: [
            { img: "product14/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 500,
        newPrice: 480,
        description: "Описание",
        rating: 4,
        reviewsCount: 260,
    },
    {
        name: "Honor 70",
        images: [
            { img: "product15/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 440,
        newPrice: 380,
        description: "Описание",
        rating: 4,
        reviewsCount: 60,
    },
    {
        name: "Apple iPhone SE (2022)",
        images: [
            { img: "product16/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 440,
        newPrice: 420,
        description: "Описание",
        rating: 4,
        reviewsCount: 77,
    },
    {
        name: "Xiaomi 11T",
        images: [
            { img: "product17/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 230,
        description: "Описание",
        rating: 3,
        reviewsCount: 360,
    },
    {
        name: "Xiaomi Mi 11 Ultra",
        images: [
            { img: "product18/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 400,
        newPrice: 350,
        description: "Описание",
        rating: 5,
        reviewsCount: 760,
    },
    {
        name: "Oppo A96",
        images: [
            { img: "product19/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 260,
        newPrice: 250,
        description: "Описание",
        rating: 3,
        reviewsCount: 1125,
    },
    {
        name: "Xiaomi Redmi Note 11 Pro",
        images: [
            { img: "product20/img1.png" }
        ],
        category: "Смартфоны & Планшеты",
        subcategory: "Смартфоны",
        price: 320,
        description: "Описание",
        rating: 5,
        reviewsCount: 2760,
    },
]