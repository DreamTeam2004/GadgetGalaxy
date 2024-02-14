import { connectMongoDB } from "@/DB/mongoDB/mongoDB";
import { ProductModel } from "@/DB/models/productModel";
import { SubCategoryModel } from "@/DB/models/subCategoryModel";
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
  const sortDirection = req.nextUrl.searchParams.get("sortDirection") || "asc";
  try {
    await connectMongoDB();

    // Получаем подкатегорию по slug
    const subcategory = await SubCategoryModel.findOne({ slug: category });
    if (!subcategory) {
      return NextResponse.json(
        { error_message: "Категория не найдена" },
        {
          status: 404,
        }
      );
    }

    // Информация для пагинации о общем количестве продуктов
    const totalProducts = await ProductModel.countDocuments({
      subcategory: subcategory._id,
    });

    const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);

    // Запрос на товары для конкретной страницы
    const products = await ProductModel.find({ subcategory: subcategory._id })
      .sort({ [sortField]: sortDirection as "asc" | "desc" })
      .skip(startIndex)
      .limit(itemsPerPage);

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
      { error },
      {
        status: 500,
      }
    );
  }
}
