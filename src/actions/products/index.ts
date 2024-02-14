"use server";

const baseURL = process.env.NEXT_APP_SERVER_URL;

// Функцию для получения товаров по категории
export async function getProductsByCategory(
  subcategory: string,
  page: number,
  items: number,
  sortField: string,
  sortDirection: string
) {
  try {
    // ??? обновление данных при каждом запросе без кеширования
    const response = await fetch(
      `${baseURL}/products/${subcategory}?page=${page}&items=${items}&sortField=${sortField}&sortDirection=${sortDirection}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    if (response.status === 200) {
      return { data };
    } else {
      console.log(data.error_message);
    }
  } catch (error: any) {
    console.log("Error fetching products:", error.code);
  }
}

// Функция для получения данных с популярных товаров
export async function getPopularProducts() {
  try {
    const response = await fetch(`${baseURL}/products/popular`, {
      cache: "no-store",
    });
    return (await response.json()).popularProducts;
  } catch (error) {
    console.error("Ошибка при запросе популярных товаров", error);
  }
}

// Функция для получения данных с новых товаров
export async function getNewProducts() {
  try {
    const response = await fetch(`${baseURL}/products/new`, {
      cache: "no-store",
    });
    return (await response.json()).newProducts;
  } catch (error) {
    console.error("Ошибка при запросе популярных товаров", error);
  }
}

// Функция для получения данных с скидками товаров
export async function getDiscountProducts() {
  try {
    const response = await fetch(`${baseURL}/products/discount`, {
      cache: "no-store",
    });
    return (await response.json()).discountProducts;
  } catch (error) {
    console.error("Ошибка при запросе популярных товаров", error);
  }
}
