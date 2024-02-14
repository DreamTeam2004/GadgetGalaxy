"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/lib/store/slices/categoriesSlice";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/assets/images/icon-arrow.svg";
import { AppDispatch, RootState } from "@/lib/store/store";

import "./Categories.scss";

export default function Categories() {
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
            <Link
              key={`categories-${category._id}`}
              href={`/catalog/${category.slug}`}
              className="categories__list-item"
            >
              <h3>{category.name}</h3>
              <div className="categories__list-item-image">
                {category?.img ? (
                  <Image
                    src={category.img}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) and (max-width: 1279px) 175px, (min-width: 768px) and (max-width: 1023px) 150px, (max-width: 767px) 75px"
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>
              <button className="button">
                <ArrowIcon width={16} height={16} />
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
