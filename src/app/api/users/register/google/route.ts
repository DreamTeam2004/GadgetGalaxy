import { NextResponse } from "next/server";
import { admin } from "@/app/api/(firebase)/firebase-admin";

export async function POST(req: Request) {
  const { userPayload } = await req.json();
  try {
    // Проверяем существование пользователя в коллекции "users" по UID
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userPayload.uid)
      .get();
    if (!userDoc.exists) {
      // Добавление пользователя в коллекцию "users" в Firestore
      const userRecord = await admin
        .firestore()
        .collection("users")
        .doc(userPayload.uid)
        .set({
          uid: userPayload.uid,
          email: userPayload.email,
          name: userPayload.name,
          photo: userPayload.photo,
          provider: userPayload.provider,
        });
      return NextResponse.json(
        { userRecord },
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
