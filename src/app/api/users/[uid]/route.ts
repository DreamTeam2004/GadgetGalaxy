import { UserModel } from "@/DB/models/userModel";
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

    // Проверка авторизации пользователя с помощью удалённого запроса к firebase
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error_message: "Пользователь не авторизован.",
        },
        {
          status: 401,
        }
      );
    }

    const data = await response.json();

    if (data.users?.[0]?.localId !== uid) {
      return NextResponse.json(
        { error_message: "Доступ запрещён. Чужой профиль." },
        { status: 403 }
      );
    }
    const user = await UserModel.findOne({ uid });

    if (!user) {
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

    return NextResponse.json(
      {
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
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
