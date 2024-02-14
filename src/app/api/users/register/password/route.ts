import { auth } from "@/DB/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { connectMongoDB, UserModel } from "@/DB/mongoDB";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    await connectMongoDB();

    // Создание пользователя в Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    // Успешная регистрация
    if (user) {
      // Обновление профиля пользователя, чтобы установить displayName
      await updateProfile(user, { displayName: name });

      // Сохранение пользователя в MongoDB
      const userRecord = await UserModel.create({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: null,
        provider: user.providerData[0]?.providerId || null,
      });

      return NextResponse.json({ userRecord }, { status: 201 });
    } else {
      throw new Error("Не удалось завершить регистрацию.");
    }
  } catch (error: any) {
    // console.error("Ошибка регистрации:", error);
    const errorMessage =
      error.code === "auth/invalid-email"
        ? "Неверный формат электронной почты."
        : error.code === "auth/email-already-in-use"
        ? "Этот адрес электронной почты уже используется."
        : "Ошибка сервера при регистрации пользователя.";

    return NextResponse.json({ error_message: errorMessage }, { status: 400 });
  }
}
