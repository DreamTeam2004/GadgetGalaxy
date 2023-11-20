import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

import Image from "next/image";

import "@/assets/styles/style-components/Navigation.scss";

const Navigation = () => {
  const categories = useSelector((state: RootState) => state.Categories.data);
  return (
    <nav className="drop-down">
      <div className="container">
        <div className="drop-down__inner">
          <h2 className="drop-down__inner-title--mobile">Каталог</h2>
          <ul className="drop-down__categories">
            {categories.map((category) => (
              <li className="drop-down__categories-item" key={category.id}>
                <div>{category.name}</div>
                <ul className="drop-down__subcategories">
                  {category.subcategories.map((subcategory) => (
                    <li
                      className="drop-down__subcategories-item"
                      key={subcategory.id}
                    >
                      <div className="">
                        <div>{subcategory.name}</div>
                      </div>
                    </li>
                  ))}
                  <div className="drop-down__subcategories-image">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      style={{ objectFit: 'cover' }}
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
  );
};

export default Navigation;
