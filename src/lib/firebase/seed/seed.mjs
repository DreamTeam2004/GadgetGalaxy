import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config.mjs";
import fs from "fs";

import { categories, subcategories, products } from "./seed-data.mjs"

async function seedFirestoreCategories() {
    for (const category of categories) {
        try {
            // Создайте категорию в Firestore без поля 'image'
            const { image, ...categoryData } = category;
            // Добавление временных меток
            const timestamp = serverTimestamp();
            categoryData.createdAt = timestamp;
            categoryData.updatedAt = timestamp;
            // Добавление данных категории в Firestore
            const categoryRef = await addDoc(collection(db, "categories"), categoryData);
            console.log("Category document written with ID: ", categoryRef.id);

            // Создайте ссылку на место в Firebase Storage, где сохранить изображение
            const imageFileName = `${categoryRef.id}.png`; // Имя изображения, основанное на doc.id
            const imageRef = ref(storage, `categoriesImg/${imageFileName}`);

            // Ваш путь к локальному файлу изображения
            const imagePath = `src/lib/firebase/seed/seedImg/categories/${image}`;

            // Прочтите изображение в бинарные данные
            const imageData = fs.readFileSync(imagePath);

            // Загрузите изображение в Firebase Storage
            await uploadBytes(imageRef, imageData);
            console.log("Image successfully uploaded to Firebase Storage: ", imageFileName);

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
}

async function seedFirestoreSubCategories() {
    for (const subcategory of subcategories) {
        try {
            // Найдите ссылку на категорию по имени
            const categoryQuery = query(collection(db, "categories"), where("name", "==", subcategory.category));
            const categoryQuerySnapshot = await getDocs(categoryQuery);

            if (categoryQuerySnapshot.size === 0) {
                console.error(`Category not found for product: ${data.name}`);
                continue; // Пропустить продукт, если категория не найдена
            }

            const categoryDoc = categoryQuerySnapshot.docs[0];
            // Добавьте подкатегории в Firestore
            const subCategoryRef = await addDoc(collection(db, "subcategories"), {
                name: subcategory.name,
                categoryID: categoryDoc.id, // Ссылка на родительскую категорию
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            console.log("Subcategory document written with ID: ", subCategoryRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
}

async function seedFirestoreProducts() {
    for (const product of products) {
        try {
            // Найдите ссылку на категорию по имени
            const categoryQuery = query(collection(db, "categories"), where("name", "==", product.category));
            const categoryQuerySnapshot = await getDocs(categoryQuery);

            if (categoryQuerySnapshot.size === 0) {
                console.error(`Category not found for product: ${product.name}`);
                continue; // Пропустить продукт, если категория не найдена
            }

            const categoryDoc = categoryQuerySnapshot.docs[0];

            // Найдите ссылку на подкатегорию по имени
            const subcategoryQuery = query(collection(db, "subcategories"), where("name", "==", product.subcategory));
            const subcategoryQuerySnapshot = await getDocs(subcategoryQuery);

            if (subcategoryQuerySnapshot.size === 0) {
                console.error(`Subcategory not found for product: ${product.name}`);
                continue; // Пропустить продукт, если подкатегория не найдена
            }

            const subcategoryDoc = subcategoryQuerySnapshot.docs[0];

            // Создайте данные продукта
            const productData = {
                name: product.name,
                categoryID: categoryDoc.id, // Ссылка на категорию
                subcategoryID: subcategoryDoc.id, // Ссылка на подкатегорию
                price: product.price,
                newPrice: product.newPrice || null,
                description: product.description,
                rating: product.rating,
                reviewsCount: product.reviewsCount,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            // Добавление данных продукта в Firestore
            const productRef = await addDoc(collection(db, "products"), productData);
            console.log("Product document written with ID: ", productRef.id);


            // Создайте папку для изображений продукта
            const productImageFolder = `productsImg/${productRef.id}`;

            // Проход по всем изображениям продукта и их загрузка
            for (let i = 0; i < product.images.length; i++) {
                const imageFileName = `img${i + 1}.png`; // Уникальное имя для каждого изображения
                const imageRef = ref(storage, `${productImageFolder}/${imageFileName}`);
                const imagePath = `src/lib/firebase/seed/seedImg/products/${product.images[i].img}`;
                const imageData = fs.readFileSync(imagePath);

                // Загрузите изображение в Firebase Storage
                await uploadBytes(imageRef, imageData);
                console.log("Image successfully uploaded to Firebase Storage: ", imageFileName);
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
}

async function seedFirestore() {
    await seedFirestoreCategories();
    await seedFirestoreSubCategories();
    await seedFirestoreProducts();
    console.log("Seed finished adding data");
    process.exit(0);
}

seedFirestore();

