import { admin } from "@/app/api/(firebase)/firebase-admin";
import { OrderByDirection } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = params.category;
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const perPage = 8; // Укажите количество товаров на одной странице
  const itemsPerPage = Math.max(
    Number(req.nextUrl.searchParams.get("items")) || 0,
    perPage
  );
  const sortField = req.nextUrl.searchParams.get("sortField") || "price";
  const sortDirection =
    (req.nextUrl.searchParams.get("sortDirection") as OrderByDirection) ||
    "asc";
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
    const subcategory = categorySnapshot.docs[0].data();

    // Информация для пагинации о общем кол-ве продуктов
    const totalProductsSnapshot = await admin
      .firestore()
      .collection("products")
      .where("subcategoryID", "==", subcategoryID)
      .orderBy(sortField, sortDirection)
      .get();
    const totalProducts = totalProductsSnapshot.size;
    const startIndex = (+page - 1) * perPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);

    // Запрос на товары для конкретной страницы
    let productsQuery = await admin
      .firestore()
      .collection("products")
      .where("subcategoryID", "==", subcategoryID)
      .orderBy(sortField, sortDirection);
    // не используем startAfter для первой страницы
    if (startIndex > 0) {
      const startAfterDoc = totalProductsSnapshot.docs[startIndex - 1];
      productsQuery = productsQuery.startAfter(startAfterDoc);
    }
    const productsSnapshot = await productsQuery.limit(itemsPerPage).get();

    const products = await Promise.all(
      productsSnapshot.docs.map(async (doc) => {
        const data = doc.data();
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
      {
        subcategory: subcategory.name,
        products,
        currentPage: +page,
        itemsPerPage,
        totalPages: Math.ceil(totalProducts / perPage),
        startIndex: startIndex + 1,
        endIndex: endIndex,
        totalProducts: totalProducts,
      },
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
