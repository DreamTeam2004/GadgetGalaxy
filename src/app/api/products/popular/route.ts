import { admin } from "@/app/api/(firebase)/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Запрос для получения популярных товаров (например, сортировка по количеству оценок)
    const querySnapshot = await admin
      .firestore()
      .collection("products")
      .orderBy("reviewsCount", "desc") // Сортировка по рейтингу в убывающем порядке
      .limit(15) // Получить, например, первые 15 популярных товаров
      .get();

    const popularProducts = [];

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();

      // Получаем данные категории
      const categoryDoc = await admin
        .firestore()
        .collection("categories")
        .doc(data.categoryID)
        .get();
      const category = categoryDoc?.data()?.name;

      // Получаем данные подкатегории
      const subcategoryDoc = await admin
        .firestore()
        .collection("subcategories")
        .doc(data.subcategoryID)
        .get();
      const subcategory = subcategoryDoc?.data()?.name;

      // Преобразование Timestamp в объект Date
      const createdAtDate = data.createdAt.toDate().toLocaleString();
      const updatedAtDate = data.updatedAt.toDate().toLocaleString();

      const productData = {
        id: docSnap.id,
        category: category,
        subcategory: subcategory,
        name: data.name,
        description: data.description,
        price: data.price,
        newPrice: data.newPrice,
        rating: data.rating,
        reviewsCount: data.reviewsCount,
        images: data.images,
        createdAt: createdAtDate,
        updatedAt: updatedAtDate,
      };

      popularProducts.push(productData);
    }

    return NextResponse.json(
      { popularProducts },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}
