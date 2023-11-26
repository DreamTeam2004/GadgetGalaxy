"use client";
import { getAllCategories } from "@/lib/store/slices/categoriesSlice";
import { AppDispatch, RootState } from "@/lib/store/store";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Category({
  params: { category },
}: {
  params: { category: string };
}) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.Categories);

  useEffect(() => {
    // Загружаем все категории, если они еще не загружены
    if (categories.length === 0 && !loading && !error) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories, loading, error]);

  // Здесь мы фильтруем выбранную категорию
  const selectedCategory = categories.find((cat) => cat.slug === category);

  // Если категория не найдена и данные еще загружаются, показываем заглушку или спиннер
  if (!selectedCategory && loading) {
    return <p>Loading...</p>; // Замените эту заглушку на свой собственный компонент загрузки
  }
  // Если категория не найдена, перенаправляем на страницу 404
  else if (!selectedCategory && !loading) {
    // return notFound();
  }

  return (
    <div className="container">
      <div className="main__inner">
        <h2>Категории {`${selectedCategory?.name}`}</h2>
        {/* Отображайте другие свойства категории и подкатегории */}
        <ul>
          {selectedCategory?.subcategories.map((subcategory) => (
            <Link
            key={`subcategories-${subcategory.id}`}
            href={`/catalog/${selectedCategory.slug}/${subcategory.slug}`}
          >
            <li>{subcategory.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
