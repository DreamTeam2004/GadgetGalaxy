import { connectMongoDB } from "@/DB/mongoDB/mongoDB";
import { ProductModel } from "@/DB/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Запрос для получения популярных товаров (сортировка по количеству оценок в убывающем порядке)
    const popularProducts = await ProductModel.find()
      .sort({ reviewsCount: -1 }) // Сортировка по количеству оценок в убывающем порядке
      .limit(15)
      .populate("category subcategory");

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
