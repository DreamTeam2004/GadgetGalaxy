import { admin } from "@/app/api/(firebase)/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid;
  const authorizationHeader = req.headers.get("Authorization");

  try {
    // Проверка наличия токена в заголовке Authorization
    if (!authorizationHeader) {
      return NextResponse.json(
        {
          error_message: "Пользователь не авторизован",
        },
        {
          status: 401,
        }
      );
    }

    const idToken = authorizationHeader.replace("Bearer ", "");

    // Проверка авторизации пользователя с использованием токена ID
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.uid !== uid) {
      return NextResponse.json(
        { error_message: "Доступ запрещён. Чужой профиль." },
        {
          status: 403,
        }
      );
    }

    // Проверяем, есть ли пользователь в Firestore по UID
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        {
          error_message: "Пользователь не найден.",
          uid: uid,
        },
        {
          status: 404,
        }
      );
    }

    // Извлечение данных из DocumentSnapshot
    const data = userDoc.data();
    // Возвращение информации о пользователе
    return NextResponse.json(
      {
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Ошибка получения данных о пользователе:", error);
    // Проверяем, является ли ошибка ошибкой истекшего токена
    if (
      error.code === 'auth/id-token-expired'
    ) {
      return NextResponse.json(
        {
          error_message: "Firebase ID токен устарел.",
        },
        {
          status: 401,
        }
      );
    }
    return NextResponse.json(
      {
        error_message: "Ошибка сервера при получении данных о пользователе.",
      },
      {
        status: 500,
      }
    );
  }
}
