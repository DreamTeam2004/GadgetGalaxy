import { getAllCategories } from "@/actions/categories";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArrowIcon from "@/assets/images/icon-arrow.svg";
import "@/assets/styles/subcategories-page.scss";
import { ISubCategory } from "@/DB/models/subCategoryModel";

export const metadata = {
  title: `GadgetGalaxy - Каталог`,
};

export default async function Categories({
  params: { category },
}: {
  params: { category: string };
}) {
  const categories = await getAllCategories();
  // Здесь мы фильтруем выбранную категорию
  const selectedCategory = categories.find((cat: any) => cat.slug === category);
  
  if (!selectedCategory) {
    return <p>Loading...</p>; // Замените эту заглушку на свой собственный компонент загрузки
  }
  // Если категория не найдена, перенаправляем на страницу 404
  // else if (!selectedCategory && !loading) {
  //   // return notFound();
  // }

  return (
    <div className="container">
      <div className="subcategories__inner">
        <h2>{`${selectedCategory?.name}`}</h2>
        {/* Отображайте другие свойства категории и подкатегории */}
        <ul className="subcategories__list">
          {selectedCategory?.subcategories.map((subcategory: ISubCategory) => (
            <Link
              key={`subcategories-${subcategory._id}`}
              href={`/catalog/${selectedCategory.slug}/${subcategory.slug}`}
              className="subcategories__list-item"
            >
              <h3>{subcategory.name}</h3>
              <div className="subcategories__list-item-image">
                {subcategory?.img ? (
                  <Image
                    src={subcategory.img}
                    alt={subcategory.name}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(min-width: 1280px) 200px, (min-width: 1024px) and (max-width: 1279px) 175px, (min-width: 768px) and (max-width: 1023px) 150px, (max-width: 767px) 75px"
                  />
                ) : (
                  <div>No image available</div>
                )}
              </div>
              <button className="button button--white">
                <ArrowIcon width={16} height={16} />
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
