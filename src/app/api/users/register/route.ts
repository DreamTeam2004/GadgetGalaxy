import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/config.mjs";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    // Регистрация пользователя в Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const fullUserObject = userCredential.user; // Возвращается объект пользователя от Firebase

     // Установка имени пользователя (displayName)
     await updateProfile(fullUserObject, {
      displayName: name,
    });
    
    // Добавление пользователя в коллекцию "users" в Firestore
    const usersCollection = collection(db, "users");
    const newUserDocRef = await addDoc(usersCollection, {
      uid: fullUserObject.uid,
      email: fullUserObject.email,
      name: fullUserObject.displayName,
      photo: fullUserObject.photoURL,
      provider: fullUserObject.providerData[0].providerId,
    });

    return NextResponse.json(
      { fullUserObject, userId: newUserDocRef.id },
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
    if (error.code === "auth/email-already-in-use") {
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
