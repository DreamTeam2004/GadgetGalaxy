import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config.mjs";

export async function POST(req: Request) {
  const { token } = await req.json();
  try {
    // Проверка подлинности токена через GoogleAuthProvider
    const credential = GoogleAuthProvider.credential(token);
    const userCredential = await signInWithCredential(auth, credential);

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

    // Добавление пользователя в коллекцию "users" в Firestore
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("uid", "==", user.uid));
    const existingUsers = await getDocs(userQuery);
    if (existingUsers.size === 0) {
      const newUserDocRef = await addDoc(usersCollection, {
        uid: fullUserObject.uid,
        email: fullUserObject.email,
        name: fullUserObject.displayName,
        photo: fullUserObject.photoURL,
        provider: fullUserObject.providerData[0].providerId,
      });
    }

    return NextResponse.json(
      { user },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Ошибка авторизации через Google:", error);
    // auth/invalid-credential
    return NextResponse.json(
      // { error_message: "Ошибка сервера при авторизации через Google" },
      { error_message: token },
      {
        status: 401,
      }
    );
  }
}
