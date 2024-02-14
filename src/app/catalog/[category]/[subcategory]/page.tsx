import Image from "next/image";
import Link from "next/link";

import CatalogProducts from "@/components/catalog/CatalogProducts/CatalogProducts";

import xiaomi from "@/assets/images/banner/xiaomiTrueEarbuds.png";
import "@/assets/styles/catalog-page.scss";

import { getProductsByCategory } from "@/actions/products";

export default async function Catalog({
  params: { subcategory: urlSubcategory },
  searchParams,
}: {
  params: { subcategory: string };
  searchParams?: {
    page?: number;
    items?: number;
    sortField?: string;
    sortDirection?: string;
  };
}) {
  const page = searchParams?.page;
  const items = searchParams?.items;
  const sortField = searchParams?.sortField || "price";
  const sortDirection = searchParams?.sortDirection || "asc";
  // Преобразовываем строку в число, используя "+"
  const itemsPerPage = items ? +items : 8;
  const pageNumber = page ? +page : 1;
  const { data } =
    (await getProductsByCategory(
      urlSubcategory,
      pageNumber,
      itemsPerPage,
      sortField,
      sortDirection
    )) || {};
  if (!data?.subcategory) {
    // Если категория не найдена и данные еще загружаются, показываем заглушку или спиннер
    return <p>Loading...</p>; // Замените эту заглушку на свой собственный компонент загрузки
  }
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
        <CatalogProducts
          products={data.products}
          subcategory={data.subcategory}
          sortField={sortField}
          sortDirection={sortDirection}
          currentPage={pageNumber}
          itemsPerPage={data.itemsPerPage}
          totalPages={data.totalPages}
          startIndex={data.startIndex}
          endIndex={data.endIndex}
          totalProducts={data.totalProducts}
        />
      </div>
    </div>
  );
}
