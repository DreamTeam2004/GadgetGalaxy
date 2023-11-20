import { auth } from "@/lib/firebase/config.mjs";
import { signInWithEmailAndPassword } from "firebase/auth";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Авторизация пользователя в Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Весь объект пользователя от Firebase
    const fullUserObject: any = userCredential.user;

    // Только необходимые поля
    const user = {
      uid: fullUserObject.uid,
      email: fullUserObject.email,
      name: fullUserObject.displayName,
      photo: fullUserObject.photoURL,
      accessToken: fullUserObject.accessToken,
      provider: fullUserObject.providerData[0].providerId,
    };

    // Возвращается объект пользователя от Firebase
    return NextResponse.json(
      { user },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // console.error("Ошибка авторизации:", error);
    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        {
          error_message: "Почта не найдена.",
        },
        { status: 400 }
      );
    }
    if (error.code === "auth/invalid-login-credentials") {
      return NextResponse.json(
        {
          error_message: "Неверный email или пароль.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error_message: "Ошибка сервера при авторизации пользователя" },
      {
        status: 401,
      }
    );
  }
}
