import { connectMongoDB } from "@/DB/mongoDB/mongoDB";
import { CategoryModel } from "@/DB/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();

    // Получение категорий из MongoDB
    const categories = await CategoryModel.find()
      .sort({ order: 1 })
      .populate("subcategories"); // включаем подкатегории

    return NextResponse.json(
      { categories },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
