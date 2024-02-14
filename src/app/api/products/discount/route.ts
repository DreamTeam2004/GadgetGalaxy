import { connectMongoDB, ProductModel } from "@/DB/mongoDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Запрос для получения товаров со скидками $ne = не равен
    const discountProducts = await ProductModel.find({
      newPrice: { $ne: null },
    })
      .limit(15)
      .populate("category subcategory");

    return NextResponse.json(
      { discountProducts },
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
