"use client";

import { toast } from "react-toastify";
import ProductCardGrid from "@/components/ProductCardGrid";
import ProductCardList from "@/components/ProductCardList";
import { IProduct } from "@/@types/IProduct";

import CatalogViewV1Icon from "@/assets/images/icon-catalog-viewV1.svg";
import CatalogViewV2Icon from "@/assets/images/icon-catalog-viewV2.svg";
import FiltersIcon from "@/assets/images/icon-filters.svg";
import ArrowRightIcon from "@/assets/images/icon-arrow-right.svg";
import ArrowLeftIcon from "@/assets/images/icon-arrow-left.svg";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import "@/assets/styles/style-components/CatalogProducts.scss";

export default function CatalogProducts({
  products,
  subcategory,
  sortField,
  sortDirection,
  currentPage,
  itemsPerPage,
  totalPages,
  startIndex,
  endIndex,
  totalProducts,
}: {
  products: IProduct[];
  sortField: string;
  sortDirection: string;
  subcategory: string;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalProducts: number;
}) {
  const [viewType, setViewType] = useState("grid"); // По умолчанию отображаем сетку

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;

    const [sortField, sortDirection] = newSort.split(":");

    const newParams = new URLSearchParams(params);
    newParams.set("sortField", sortField);
    newParams.set("sortDirection", sortDirection);
    router.replace<any>(`${pathname}?${newParams}`);
  };

  const showMoreProducts = () => {
    itemsPerPage += 4;
    // Обновляем URL, добавляя новый параметр
    const newParams = new URLSearchParams(params);
    newParams.set("items", itemsPerPage.toString());
    router.replace<any>(`${pathname}?${newParams}`, { scroll: false });
  };

  const handlePageChange = (pageNumber: number) => {
    // Обновляем URL, добавляя новый параметр page
    const newParams = new URLSearchParams(params);
    newParams.set("page", pageNumber.toString());
    newParams.delete("items");
    router.replace<any>(`${pathname}?${newParams}`);
  };

  return (
    <div className="catalog__inner">
      <div className="catalog__header">
        <div className="catalog__header-content">
          <div className="catalog__header-title">{`${subcategory}`}</div>
          <div className="catalog__header-pagination">
            Показано
            <span className="catalog__header-pagination--bold">
              {" "}
              {startIndex}-{endIndex}{" "}
            </span>
            из{" "}
            <span className="catalog__header-pagination--bold">
              {totalProducts}
            </span>
          </div>
        </div>
        <div className="catalog__header-divider"></div>
        <div className="catalog__header-content">
          <div className="catalog__header-view">
            <div
              className={`catalog__header-view-item ${
                viewType === "grid" ? "catalog__header-view-item--active" : ""
              }`}
              onClick={() => setViewType("grid")}
            >
              <CatalogViewV1Icon className="catalogViewIcon" />
            </div>
            <div
              className={`catalog__header-view-item ${
                viewType === "list" ? "catalog__header-view-item--active" : ""
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
                onChange={handleSortChange}
                value={`${sortField}:${sortDirection}`}
                className="catalog__header-sort--value"
              >
                <option value="price:asc">По цене (возрастание)</option>
                <option value="price:desc">По цене (убывание)</option>
                <option value="name:asc">По названию (A-Z)</option>
                <option value="name:desc">По названию (Z-A)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={viewType === "grid" ? "catalog__grid" : "catalog__list"}>
        {products.map((product) =>
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

      {endIndex !== totalProducts && (
        <button
          onClick={() => showMoreProducts()}
          className="catalog__show-more"
        >
          Показать ещё
        </button>
      )}

      <div className="catalog__pagination">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="catalog__pagination-arrow"
          >
            <ArrowLeftIcon />
          </button>
        )}

        {totalPages > 5 && currentPage > 3 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={
                currentPage === 1
                  ? "catalog__pagination-button catalog__pagination-button--active"
                  : "catalog__pagination-button"
              }
            >
              1
            </button>
            {currentPage > 4 && (
              <span className="catalog__pagination-dots">...</span>
            )}
          </>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            (totalPages <= 5 ||
              (pageNumber >= currentPage - 2 &&
                pageNumber <= currentPage + 2)) && (
              <button
                key={index}
                onClick={() => handlePageChange(pageNumber)}
                className={
                  currentPage === pageNumber
                    ? "catalog__pagination-button catalog__pagination-button--active"
                    : "catalog__pagination-button"
                }
              >
                {pageNumber}
              </button>
            )
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 3 && (
          <span className="catalog__pagination-dots">...</span>
        )}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className={
              currentPage === totalPages
                ? "catalog__pagination-button catalog__pagination-button--active"
                : "catalog__pagination-button"
            }
          >
            {totalPages}
          </button>
        )}

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="catalog__pagination-arrow"
          >
            <ArrowRightIcon />
          </button>
        )}
      </div>
    </div>
  );
}
