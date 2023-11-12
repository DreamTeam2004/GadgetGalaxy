
export const categories = [
    {
        name: "TV & Аудио",
        image: "TV-Audio.png",
    },
    {
        name: "Смартфоны & Планшеты",
        image: "Tel.png",
    },
    {
        name: "Ноутбуки & ПК",
        image: "laptops-PC.png",
    },
    {
        name: "Переферия & Аксессуары",
        image: "accessories.png",
    },
    {
        name: "Фото & Видео",
        image: "photo-video.png",
    },
    {
        name: "Комплектующие для ПК",
        image: "pc-accessories.png",
    },
    {
        name: "Консоли & Видеоигры",
        image: "consoles.png",
    },
    {
        name: "Сетевое оборудование",
        image: "network-equipment.png",
    },
];

export const subcategories = [
    {
        name: "Телевизоры",
        category: "TV & Аудио"
    },
    {
        name: "Аудио",
        category: "TV & Аудио"
    },
    {
        name: "Смартфоны",
        category: "Смартфоны & Планшеты"
    },
    {
        name: "Планшеты",
        category: "Смартфоны & Планшеты"
    },
    {
        name: "Ноутбуки",
        category: "Ноутбуки & ПК"
    },
    {
        name: "ПК",
        category: "Ноутбуки & ПК"
    },
    {
        name: "Переферия",
        category: "Переферия & Аксессуары"
    },
    {
        name: "Аксессуары",
        category: "Переферия & Аксессуары"
    },
    {
        name: "Фото",
        category: "Фото & Видео"
    },
    {
        name: "Видео",
        category: "Фото & Видео"
    },
    {
        name: "Видеокарты",
        category: "Комплектующие для ПК"
    },
    {
        name: "Процессоры",
        category: "Комплектующие для ПК"
    },
    {
        name: "Консоли",
        category: "Консоли & Видеоигры"
    },
    {
        name: "Видеоигры",
        category: "Консоли & Видеоигры"
    },
    {
        name: "Роутеры",
        category: "Сетевое оборудование"
    },
    {
        name: "Кабели",
        category: "Сетевое оборудование"
    },
];

export const products = [
    {
        name: "Huawei Nova 9, Qualcomm SM7325 Snapdragon 778G",
        images: [
            { img: "product1/img1.png" },
            { img: "product1/img2.png" }
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
        name: "IPS LED Lenovo ThinkVision 27",
        images: [
            { img: "product2/img1.png" }
        ],
        category: "TV & Аудио",
        subcategory: "Телевизоры",
        price: 180,
        newPrice: 75,
        description: "Описание",
        rating: 3,
        reviewsCount: 355,
    },
]