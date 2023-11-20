import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const response = await fetch("/api/users/login/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user)); // Возвращаем данные пользователя после успешной авторизации
        return;
      } else {
        return rejectWithValue(data.error_message); // Бросаем ошибку в случае неудачной авторизации
      }
    } catch (error) {
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
export const loginUserWithGoogle = createAsyncThunk(
  "user/loginUserWithGoogle",
  async (
    { token }: { token: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await fetch("/api/users/login/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUser(data.user)); 
        return data.user;
      } else {
        return rejectWithValue(data.error_message); // Бросаем ошибку в случае неудачной авторизации
      }
    } catch (error) {
      return rejectWithValue("Неизвестная ошибка");
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
