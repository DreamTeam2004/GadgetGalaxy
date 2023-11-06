// ПРИМЕР*************************************/
import { categories } from "@/example-data.js";
// ПРИМЕР*************************************/

import Image from "next/image";

import "@/assets/styles/style-components/Navigation.scss";

const Navigation = () => {
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
                  <Image
                    className="drop-down__subcategories-image"
                    src={category.image}
                    alt={category.name}
                  />
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
