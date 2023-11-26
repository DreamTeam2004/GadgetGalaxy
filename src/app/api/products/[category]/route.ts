import { admin } from "@/app/api/(firebase)/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  try {
    // Получаем категорию по slug
    const categorySnapshot = await admin
      .firestore()
      .collection("subcategories")
      .where("slug", "==", category)
      .get();

    if (categorySnapshot.empty) {
      return NextResponse.json(
        { error_message: "Категория не найдена" },
        {
          status: 404,
        }
      );
    }

    // Используем имя документа в качестве id
    const subcategoryID = categorySnapshot.docs[0].id;

    const productsSnapshot = await admin
      .firestore()
      .collection("products")
      .where("subcategoryID", "==", subcategoryID)
      .get();

    const products = await Promise.all(
      productsSnapshot.docs.map(async (doc) => {
        const data = doc.data();

        // Получаем данные категории
        const categoryDoc = await admin
          .firestore()
          .collection("categories")
          .doc(data.categoryID)
          .get();
        const category= categoryDoc?.data()?.name;

        // Получаем данные подкатегории
        const subcategoryDoc = await admin
          .firestore()
          .collection("subcategories")
          .doc(data.subcategoryID)
          .get();
        const subcategory = subcategoryDoc?.data()?.name;

        // Обновляем значения createdAt и updatedAt в объекте
        data.createdAt = data.createdAt.toDate().toLocaleString();
        data.updatedAt = data.updatedAt.toDate().toLocaleString();

        return {
          id: doc.id,
          category,
          subcategory,
          ...data,
        };
      })
    );

    return NextResponse.json(
      { products },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Ошибка получения данных о продуктах:", error);
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}
