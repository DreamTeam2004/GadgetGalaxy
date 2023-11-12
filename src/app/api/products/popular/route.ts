import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../../../lib/firebase/config.mjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Запрос для получения популярных товаров (например, сортировка по количеству оценок)
    const querySnapshot = await getDocs(
      query(
        collection(db, "products"),
        orderBy("reviewsCount", "desc"), // Сортировка по рейтингу в убывающем порядке
        limit(15) // Получить, например, первые 15 популярных товаров
      )
    );

    const popularProducts = [];

    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();

      // Получаем данные категории
      const categoryDoc = await getDoc(doc(db, "categories", data.categoryID));
      const categoryData = categoryDoc?.data()?.name;

      // Получаем данные подкатегории
      const subcategoryDoc = await getDoc(
        doc(db, "subcategories", data.subcategoryID)
      );
      const subcategoryData = subcategoryDoc?.data()?.name;

      // Получаем изображения продукта из хранилища
      const imageUrls: string[] = [];
      // Предположим, что у каждого продукта есть, например, три изображения
      for (let i = 1; i <= 5; i++) {
        const imagePath = `productsImg/${docSnap.id}/img${i}.png`; // Замените на свою структуру именования
        try {
          const imageUrl = await getDownloadURL(ref(storage, imagePath));
          imageUrls.push(imageUrl);
        } catch (error: any) {
          // Если изображение не существует, проигнорируем ошибку
          if (error.code === "storage/object-not-found") {
            break;
          }
          // В противном случае, обрабатываем другие ошибки
          console.error("Ошибка при загрузке изображения:", error);
        }
      }

      // Преобразование Timestamp в объект Date
      const createdAtDate = data.createdAt.toDate().toLocaleString();
      const updatedAtDate = data.updatedAt.toDate().toLocaleString();

      const productData = {
        id: docSnap.id,
        category: categoryData,
        subcategory: subcategoryData,
        name: data.name,
        description: data.description,
        price: data.price,
        rating: data.rating,
        reviewsCount: data.reviewsCount,
        images: imageUrls,
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
