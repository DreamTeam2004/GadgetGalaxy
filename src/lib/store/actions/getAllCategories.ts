import { createAsyncThunk } from "@reduxjs/toolkit";

// Создаем асинхронный action для загрузки категорий
export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.categories;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error}`);
    }
  }
);
