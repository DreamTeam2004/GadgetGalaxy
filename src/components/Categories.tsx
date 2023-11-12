"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/lib/store/slices/categoriesSlice";
import Image from "next/image";
import ArrowIcon from "@/assets/images/icon-arrow.svg";
import "@/assets/styles/style-components/Categories.scss";
import { AppDispatch, RootState } from "@/lib/store/store";

export default function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.Categories);

  useEffect(() => {
    // Вызываем асинхронный action при монтировании компонента
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="categories__inner">
      <h2>Категории</h2>
      <div className="categories__list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          categories.map((category) => (
            <div className="categories__list-item" key={category.id}>
              <h3>{category.name}</h3>
              <div className="categories__list-item-image">
                <Image
                  src={category.image}
                  alt={category.name}
                  priority={true}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <button className="button-1">
                <ArrowIcon width={16} height={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
