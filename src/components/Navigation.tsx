import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";

import Image from "next/image";

import "@/assets/styles/style-components/Navigation.scss";
import { getAllCategories } from "@/lib/store/slices/categoriesSlice";
import { useEffect } from "react";
import Link from "next/link";

const Navigation = ({ onClose }: { onClose: () => void }) => {
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
    <div>
      <nav className="drop-down">
        <div className="container">
          <div className="drop-down__inner">
            <h2 className="drop-down__inner-title--mobile">Каталог</h2>
            <ul className="drop-down__categories">
              {categories.map((category) => (
                <li className="drop-down__categories-item" key={`nav-${category.id}`}>
                  <Link href={`/catalog/${category.slug}`} onClick={onClose}>
                    {category.name}
                  </Link>
                  <ul className="drop-down__subcategories">
                    {category.subcategories.map((subcategory) => (
                      <li
                        className="drop-down__subcategories-item"
                        key={`nav-${subcategory.id}`}
                      >
                        <div className="">
                          <Link
                            href={`/catalog/${category.slug}/${subcategory.slug}`}
                            onClick={onClose}
                          >
                            {subcategory.name}
                          </Link>
                        </div>
                      </li>
                    ))}
                    <div className="drop-down__subcategories-image">
                      <Image
                        src={category.img}
                        alt={category.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(min-width: 1280px) 350px, (min-width: 1024px) and (max-width: 1279px) 225px"
                      />
                    </div>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
