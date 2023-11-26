"use client";

import { getAllCategories } from "@/lib/store/slices/categoriesSlice";
import { AppDispatch, RootState } from "@/lib/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductCardGrid from "@/components/ProductCardGrid";
import ProductCardList from "@/components/ProductCardList";
import { IProduct } from "@/@types/IProduct";

import Image from "next/image";
import Link from "next/link";

import xiaomi from "@/assets/images/banner/xiaomiTrueEarbuds.png";
import CatalogViewV1Icon from "@/assets/images/icon-catalog-viewV1.svg";
import CatalogViewV2Icon from "@/assets/images/icon-catalog-viewV2.svg";
import FiltersIcon from "@/assets/images/icon-filters.svg";

import "@/assets/styles/style-pages/catalog-page.scss";

export default function Catalog({
  params: { subcategory },
}: {
  params: { subcategory: string };
}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  const [viewType, setViewType] = useState("grid"); // По умолчанию отображаем сетку

  const dispatch = useDispatch<AppDispatch>();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.Categories);

  //Проверка на наличие категорий в store
  useEffect(() => {
    // Загружаем все категории, если они еще не загружены
    if (categories.length === 0 && !loading && !error) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories, loading, error]);
  // Здесь мы фильтруем выбранную категорию
  useEffect(() => {
    // Проверяем, что у нас есть выбранная подкатегория
    const selectedSubCategory = categories
      .map((cat) =>
        cat.subcategories.find((subcat) => subcat.slug === subcategory)
      )
      .find((subcat) => subcat);

    // Если у нас есть подкатегория, делаем запрос к API для получения продуктов по подкатегории
    if (selectedSubCategory) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`/api/products/${subcategory}`);
          const data = await response.json();

          if (response.status === 200) {
            setProducts(data.products);
            setSelectedSubCategory(selectedSubCategory);
            toast.success("Я загрузился");
          } else {
            toast.error(
              "Ошибка запроса:",
              data.error_message || "Unknown error"
            );
          }
        } catch (error: any) {
          toast.error("Error fetching products:", error.code);
        }
      };
      fetchProducts();
    }
  }, [subcategory, loading]);
  return (
    <div className="container">
      <div className="catalog">
        <aside className="catalog__aside">
          <Link href={"/"}>
            <div className="catalog__aside-banner">
              <Image
                src={xiaomi}
                alt="xiaomi"
                fill
                style={{ objectFit: "cover" }}
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) and (max-width: 1279px) 175px, (min-width: 768px) and (max-width: 1023px) 150px, (max-width: 767px) 75px"
              />
            </div>
          </Link>
          <h2>Фильтры</h2>
        </aside>
        <div className="catalog__inner">
          <div className="catalog__header">
            <div className="catalog__header-content">
              <div className="catalog__header-title">{`${selectedSubCategory?.name}`}</div>
              <div className="catalog__header-pagination">
                Показано{" "}
                <span className="catalog__header-pagination--bold">0</span> из{" "}
                <span className="catalog__header-pagination--bold">0</span>
              </div>
            </div>
            <div className="catalog__header-divider"></div>
            <div className="catalog__header-content">
              <div className="catalog__header-view">
                <div
                  className={`catalog__header-view-item ${
                    viewType === "grid"
                      ? "catalog__header-view-item--active"
                      : ""
                  }`}
                  onClick={() => setViewType("grid")}
                >
                  <CatalogViewV1Icon className="catalogViewIcon" />
                </div>
                <div
                  className={`catalog__header-view-item ${
                    viewType === "list"
                      ? "catalog__header-view-item--active"
                      : ""
                  }`}
                  onClick={() => setViewType("list")}
                >
                  <CatalogViewV2Icon className="catalogViewIcon" />
                </div>
              </div>
              <div className="catalog__header-sort">
                <div className="catalog__header-sort-item catalog__header-sort-item--mobile">
                  <FiltersIcon className="filtersIcon" height={16} />
                  Фильтры
                </div>
                <div className="catalog__header-sort-item">
                  <label htmlFor="sortSelect">Сортировка:</label>
                  <select
                    id="sortSelect"
                    // onChange={handleSortChange}
                    // value={selectedSort}
                    className="catalog__header-sort--value"
                  >
                    <option value="priceAsc">По цене (возрастание)</option>
                    <option value="priceDesc">По цене (убывание)</option>
                    <option value="nameAsc">По названию (A-Z)</option>
                    <option value="nameDesc">По названию (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="catalog__list">
            {products.map((product) =>
              // В зависимости от viewType рендерим разные компоненты карточек
              viewType === "grid" ? (
                <ProductCardGrid
                  key={`catalogGrid-${product.id}`}
                  product={product}
                />
              ) : (
                <ProductCardList
                  key={`catalogList-${product.id}`}
                  product={product}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
