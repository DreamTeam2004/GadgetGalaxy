import { connectMongoDB } from "../mongoDB/mongoDB";
import { CategoryModel } from "../models/categoryModel";
import { SubCategoryModel } from "../models/subCategoryModel";
import { ProductModel } from "../models/productModel";
import fs from "fs";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { categories, subcategories, products } from "./seed-data";

async function seedCategories() {
  for (const category of categories) {
    try {
      const { image, ...categoryData } = category;
      // Добавление данных категории в MongoDB
      const categoryID = (await CategoryModel.create(categoryData))._id;

      // Создайте ссылку на место в Firebase Storage, где сохранить изображение
      const imageFileName = `${categoryID}.png`; // Имя изображения, основанное на _id
      const imageRef = ref(storage, `categoriesImg/${imageFileName}`);

      // Ваш путь к локальному файлу изображения
      const imagePath = `src/DB/seed/seedImg/categories/${image}`;
      // Прочтите изображение в бинарные данные
      const imageData = fs.readFileSync(imagePath);
      // Загрузите изображение в Firebase Storage
      await uploadBytes(imageRef, imageData);
      console.log(
        "Image successfully uploaded to Firebase Storage: ",
        imageFileName
      );

      // Получите URL загруженного изображения
      const img = await getDownloadURL(imageRef);

      // Обновите документ в MongoDB, добавив поле img
      await CategoryModel.findByIdAndUpdate(categoryID, { img });
      console.log("Category document written with ID: ", categoryID);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

async function seedSubCategories() {
  for (const subcategory of subcategories) {
    try {
      // Найдите категорию по имени в MongoDB
      const category = await CategoryModel.findOne({
        name: subcategory.category,
      });

      if (!category) {
        console.error(
          `Category not found for subcategory: ${subcategory.name}`
        );
        continue; // Пропустить подкатегорию, если категория не найдена
      }

      // Формирование данных для MongoDB
      const subCategoryData = {
        name: subcategory.name,
        slug: subcategory.slug,
        categoryID: category._id, // Ссылка на родительскую категорию
      };

      // Добавьте подкатегорию в MongoDB
      const subCategoryID = (await SubCategoryModel.create(subCategoryData))
        ._id;

      // Добавьте ObjectId новой подкатегории в массив subcategories категории
      await CategoryModel.findByIdAndUpdate(category._id, {
        $push: { subcategories: subCategoryID },
      });

      // Создайте ссылку на место в Firebase Storage, где сохранить изображение подкатегории
      const imageFileName = `${subCategoryID}.png`; // Имя изображения, основанное на _id
      const subcategoryImageRef = ref(
        storage,
        `subcategoriesImg/${imageFileName}`
      );
      // Ваш путь к локальному файлу изображения подкатегории
      const subcategoryImagePath = `src/DB/seed/seedImg/subcategories/${subcategory.image}`;
      // Прочтите изображение в бинарные данные
      const subcategoryImageData = fs.readFileSync(subcategoryImagePath);
      // Загрузите изображение в Firebase Storage
      await uploadBytes(subcategoryImageRef, subcategoryImageData);
      console.log(
        "Image successfully uploaded to Firebase Storage: ",
        imageFileName
      );
      // Получите URL загруженного изображения
      const subcategoryImg = await getDownloadURL(subcategoryImageRef);

      // Обновите документ в MongoDB, добавив поле img
      await SubCategoryModel.findByIdAndUpdate(subCategoryID, {
        img: subcategoryImg,
      });
      console.log("Subcategory document written with ID: ", subCategoryID);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

async function seedProducts() {
  for (const product of products) {
    try {
      // Найдите категорию по имени в MongoDB
      const category = await CategoryModel.findOne({ name: product.category });
      if (!category) {
        console.error(`Category not found for product: ${product.name}`);
        continue; // Пропустить продукт, если категория не найдена
      }

      // Найдите подкатегорию по имени в MongoDB
      const subcategory = await SubCategoryModel.findOne({
        name: product.subcategory,
      });
      if (!subcategory) {
        console.error(`Subcategory not found for product: ${product.name}`);
        continue; // Пропустить продукт, если подкатегория не найдена
      }

      // Создайте данные продукта
      const productData = {
        name: product.name,
        category: category._id, // Ссылка на категорию
        subcategory: subcategory._id, // Ссылка на подкатегорию
        price: product.price,
        newPrice: product.newPrice || null,
        description: product.description,
        rating: product.rating,
        reviewsCount: product.reviewsCount,
      };

      // Добавление данных продукта в MongoDB
      const productID = (await ProductModel.create(productData))._id;

      // Создайте папку для изображений продукта
      const productImageFolder = `productsImg/${productID}`;
      const images = [];
      // Проход по всем изображениям продукта и их загрузка
      for (let i = 0; i < product.images.length; i++) {
        const imageFileName = `img${i + 1}.png`; // Уникальное имя для каждого изображения
        const imageRef = ref(storage, `${productImageFolder}/${imageFileName}`);
        const imagePath = `src/DB/seed/seedImg/products/${product.images[i].img}`;
        const imageData = fs.readFileSync(imagePath);

        // Загрузите изображение в Firebase Storage
        await uploadBytes(imageRef, imageData);
        console.log(
          "Image successfully uploaded to Firebase Storage: ",
          imageFileName
        );

        // Получите URL загруженного изображения
        const downloadURL = await getDownloadURL(imageRef);
        images.push(downloadURL);
      }

      // Обновите документ в MongoDB, добавив поле images
      await ProductModel.findByIdAndUpdate(productID, { images });
      console.log("Product document written with ID: ", productID);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

async function seedFirestore() {
  // Подключение к базе данных MongoDB
  await connectMongoDB();
  // Выполнение операций по добавлению данных
  await seedCategories();
  await seedSubCategories();
  await seedProducts();
  console.log("Seed finished adding data");
  process.exit(0);
}

seedFirestore();
