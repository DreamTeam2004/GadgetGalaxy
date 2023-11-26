import { configureStore } from "@reduxjs/toolkit";

import { UserReducer } from "./slices/UserSlice";
import { CategoriesReducer } from "./slices/categoriesSlice";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    Categories: CategoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
