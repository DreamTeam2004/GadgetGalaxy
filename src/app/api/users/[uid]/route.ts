import { auth } from "@/lib/firebase/config.mjs";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid;

  try {
    const currentUser: any = auth.currentUser;

    if (currentUser) {
      if (currentUser.uid === uid) {
        // Возвращение информации о пользователе
        return NextResponse.json(
          {
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName,
            photo: currentUser.photoURL,
            accessToken: currentUser.accessToken,
            provider: currentUser.providerData[0].providerId,
            // Другие свойства пользователя, которые вы хотите включить
          },
          {
            status: 200,
          }
        );
      } else {
        // Если uid не совпадает, это может быть ошибка доступа
        return NextResponse.json(
          {
            error_message: "Ошибка доступа. Неверный UID пользователя.",
   
          },
          {
            status: 403, // Forbidden
          }
        );
      }
    } else {
      // Если пользователь не аутентифицирован
      return NextResponse.json(
        {
          error_message: "Пользователь не аутентифицирован.",
          uid: currentUser
        },
        {
          status: 401, // Unauthorized
        }
      );
    }
  } catch (error: any) {
    console.error("Ошибка получения данных о пользователе:", error);
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
