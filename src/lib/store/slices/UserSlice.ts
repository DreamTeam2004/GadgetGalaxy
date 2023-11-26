import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "@/lib/firebase/firebase.mjs";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

interface UserState {
  uid: string | null;
  email: string | null;
  name: string | null;
  photo: string | null;
  accessToken: string | null;
  //   emailVerified: boolean;
  provider: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  name: null,
  photo: null,
  accessToken: null,
  //   emailVerified: false,
  provider: null,
};

export const loginUserWithPassword = createAsyncThunk(
  "user/loginUserWithPassword",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // Авторизация пользователя в Firebase
      const data = await signInWithEmailAndPassword(auth, email, password);
      const { user } = data;

      if (user?.uid) {
        const userPayload = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          accessToken: await user.getIdToken(),
          provider: user.providerData[0].providerId,
        };

        dispatch(setUser(userPayload));
        return;
      } else {
        return rejectWithValue("Произошла ошибка при авторизации.");
      }
    } catch (error: any) {
      // console.error("Ошибка авторизации:", error);
      const errorMessage = error.message || "Неизвестная ошибка.";
      switch (error.code) {
        case "auth/invalid-email":
          return rejectWithValue("Неверный формат электронной почты.");
        case "auth/invalid-login-credentials":
          return rejectWithValue("Неверный email или пароль.");
        default:
          return rejectWithValue(errorMessage);
      }
    }
  }
);
export const loginUserWithGoogle = createAsyncThunk(
  "user/loginUserWithGoogle",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, googleProvider);
      const { user } = data;

      if (user?.uid) {
        const userPayload = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          accessToken: await user.getIdToken(),
          provider: user.providerData[0].providerId,
        };
        //Добавление пользователя Google в бд, если он входит первый раз
        const response = await fetch("/api/users/register/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userPayload }),
        });
        const data = await response.json();

        //Добавление пользователя в store
        if (response.ok) {
          dispatch(setUser(userPayload)); // Добавляем данные пользователя после успешной авторизации
          return;
        } else {
          return rejectWithValue(data.error_message); // Бросаем ошибку в случае неудачной авторизации
        }
      } else {
        return rejectWithValue("Не удалось получить данные Google"); // Бросаем ошибку в случае неудачной авторизации
      }
    } catch (error: any) {
      // console.error("Ошибка авторизации c помощью Google:", error);
      const errorMessage = error.message || "Неизвестная ошибка.";
      switch (error.code) {
        case "auth/popup-closed-by-user":
          return rejectWithValue("Окно Google было закрыто.");
        case "auth/cancelled-popup-request":
          return rejectWithValue("Авторизация c помощью Google была отменена.");
        default:
          return rejectWithValue(errorMessage);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return { ...initialState };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const UserReducer = userSlice.reducer;
