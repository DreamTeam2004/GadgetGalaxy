import { connectMongoDB } from "@/DB/mongoDB/mongoDB";
import { ProductModel } from "@/DB/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Запрос для получения новых товаров (сортировка по дате создания в убывающем порядке)
    const newProducts = await ProductModel.find()
      .sort({ createdAt: -1 }) // Сортировка по дате создания в убывающем порядке
      .limit(15)
      .populate("category subcategory");

    return NextResponse.json(
      { newProducts },
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
