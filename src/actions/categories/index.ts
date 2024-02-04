"use server";

const baseURL = process.env.NEXT_APP_SERVER_URL;

// Функция для получения данных категорий
export async function getAllCategories() {
  try {
    const response = await fetch(`${baseURL}/categories`, {
      cache: "no-store",
    });
    return (await response.json()).categories;
  } catch (error) {
    throw new Error(`Ошибка при получении категорий: ${error}`);
  }
}
