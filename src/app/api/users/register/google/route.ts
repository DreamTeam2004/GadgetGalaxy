import { connectMongoDB } from "@/DB/mongoDB/mongoDB";
import { UserModel } from "@/DB/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userPayload } = await req.json();
  try {
    await connectMongoDB();

    // Проверяем существование пользователя в коллекции "users" по UID
    const existingUser = await UserModel.findOne({ uid: userPayload.uid });

    if (!existingUser) {
      // Добавление пользователя в коллекцию "users" в MongoDB с помощью Mongoose
      const newUser = new UserModel({
        uid: userPayload.uid,
        email: userPayload.email,
        name: userPayload.name,
        photo: userPayload.photo,
        provider: userPayload.provider,
      });

      await newUser.save();

      return NextResponse.json(
        { newUser },
        {
          status: 201,
        }
      );
    } else
      return NextResponse.json(
        { message: "Этот адрес электронной почты уже используется." },
        {
          status: 200,
        }
      );
  } catch (error: any) {
    console.error("Ошибка регистрации через Google:", error);

    return NextResponse.json(
      {
        error_message:
          "Ошибка сервера при добавлении пользователя Google в базу данных.",
      },
      {
        status: 500,
      }
    );
  }
}
