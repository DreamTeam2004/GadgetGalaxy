import tv from "@/assets/images/categories/TV-Audio.png";
import smart from "@/assets/images/categories/Tel.png";
import laptops from "@/assets/images/categories/laptops-PC.png";
import accessories from "@/assets/images/categories/accessories.png";
import photo from "@/assets/images/categories/photo-video.png";
import pcAccessories from "@/assets/images/categories/pc-accessories.png";
import consoles from "@/assets/images/categories/consoles.png";
import network from "@/assets/images/categories/network-equipment.png";

import product1 from "@/assets/images/products/product1.png";
import product2 from "@/assets/images/products/product2.png";

import DEXP from "@/assets/images/brands/DEXP.jpg";
import XIAOMI from "@/assets/images/brands/XIAOMI.jpg";
import SAMSUNG from "@/assets/images/brands/SAMSUNG.jpg";
import APPLE from "@/assets/images/brands/APPLE.jpg";
import HUAVEI from "@/assets/images/brands/HUAVEI.jpg";

export const categories = [
  {
    id: 1,
    name: "TV & Аудио",
    image: tv,
    subcategories: [
      { id: 11, name: "Телевизоры" },
      { id: 12, name: "Аудио" },
      { id: 12, name: "Хуйня" },
    ],
  },
  {
    id: 2,
    name: "Смартфоны & Планшеты",
    image: smart,
    subcategories: [
      { id: 11, name: "Смартфоны" },
      { id: 12, name: "Планшеты" },
    ],
  },
  {
    id: 3,
    name: "Ноутбуки & ПК",
    image: laptops,
    subcategories: [
      { id: 11, name: "Ноутбуки" },
      { id: 12, name: "ПК" },
    ],
  },
  {
    id: 4,
    name: "Переферия & Аксессуары",
    image: accessories,
    subcategories: [
      { id: 11, name: "Переферия" },
      { id: 12, name: "Аксессуары" },
    ],
  },
  {
    id: 5,
    name: "Фото & Видео",
    image: photo,
    subcategories: [
      { id: 11, name: "Фото" },
      { id: 12, name: "Видео" },
    ],
  },
  {
    id: 6,
    name: "Комплектующие для ПК",
    image: pcAccessories,
    subcategories: [
      { id: 11, name: "Видеокарты" },
      { id: 12, name: "Процессоры" },
    ],
  },
  {
    id: 7,
    name: "Консоли & Видеоигры",
    image: consoles,
    subcategories: [
      { id: 11, name: "Консоли" },
      { id: 12, name: "Видеоигры" },
    ],
  },
  {
    id: 8,
    name: "Сетевое оборудование",
    image: network,
    subcategories: [
      { id: 11, name: "Роутеры" },
      { id: 12, name: "Кабели" },
    ],
  },
];

export const products = [
  {
    id: 1,
    name: "Huawei Nova 9, Qualcomm SM7325 Snapdragon 778G",
    rating: 5,
    reviewsCount: 798,
    image: product1,
    price: 300,
    categoryID: 2,
    newPrice: 100, 
  },
  {
    id: 2,
    name: "IPS LED Lenovo ThinkVision 27",
    rating: 3,
    reviewsCount: 355,
    image: product2,
    price: 180,
    categoryID: 1, 
    newPrice: 75, 
  },
  {
    id: 3,
    name: "Huawei Nova 9, Qualcomm SM7325 Snapdragon 778G",
    rating: 5,
    reviewsCount: 798,
    image: product1,
    price: 300,
    categoryID: 2,
    newPrice: 100,  
  },
  {
    id: 4,
    name: "IPS LED Lenovo ThinkVision 27",
    rating: 3,
    reviewsCount: 355,
    image: product2,
    price: 180,
    categoryID: 1, 
    newPrice: 75, 
  },
  {
    id: 5,
    name: "Huawei Nova 9, Qualcomm SM7325 Snapdragon 778G",
    rating: 5,
    reviewsCount: 798,
    image: product1,
    price: 300,
    categoryID: 2, 
    newPrice: 100, 
  },
  {
    id: 6,
    name: "IPS LED Lenovo ThinkVision 27",
    rating: 3,
    reviewsCount: 355,
    image: product2,
    price: 180,
    categoryID: 1, 
    newPrice: 75, 
  },
]

export const brands = [
  {
    id: 1,
    name: "DEXP",
    image: DEXP,
  },
  {
    id: 2,
    name: "XIAOMI",
    image: XIAOMI,
  },
  {
    id: 3,
    name: "SAMSUNG",
    image: SAMSUNG,
  },
  {
    id: 4,
    name: "APPLE",
    image: APPLE,
  },
  {
    id: 5,
    name: "HUAVEI",
    image: HUAVEI,
  },
  {
    id: 6,
    name: "APPLE",
    image: APPLE,
  },
  {
    id: 7,
    name: "APPLE",
    image: APPLE,
  },
  {
    id: 8,
    name: "APPLE",
    image: APPLE,
  },
]