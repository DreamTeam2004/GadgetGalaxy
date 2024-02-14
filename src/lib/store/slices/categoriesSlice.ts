import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "@/DB/models/categoryModel";



interface CategoriesState {
  data: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: null,
};

// Создаем асинхронный action для загрузки категорий
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { categories } = await response.json();
      return categories;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error}`);
    }
  }
);

const categoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const CategoriesReducer = categoriesSlice.reducer;
