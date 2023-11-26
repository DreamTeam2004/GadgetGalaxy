import { admin } from "@/app/api/(firebase)/firebase-admin";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    // Регистрация пользователя в Firebase
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });
    // Добавление пользователя в коллекцию "users" в Firestore
    admin.firestore().collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      photo: null,
      provider: userRecord.providerData[0].providerId,
    });

    return NextResponse.json(
      { userRecord },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    // console.error("Ошибка регистрации:", error);
    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        {
          error_message: "Неверный формат электронной почты.",
        },
        { status: 400 }
      );
    }
    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        {
          error_message: "Этот адрес электронной почты уже используется.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error_message: "Ошибка сервера при регистрации пользователя.",
      },
      {
        status: 500,
      }
    );
  }
}
