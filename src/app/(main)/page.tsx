// ПРИМЕР*************************************/
import { categories } from "@/example-data.js";
// ПРИМЕР*************************************/

import Link from "next/link";
import Image from "next/image";

import arrow from "@/assets/images/icon-arrow.svg";

import ProductsSlider from "@/components/ProductsSlider";

import "@/assets/styles/style-pages/main-page.scss";

export const metadata = {
  title: "GadgetGalaxy - Главная",
};

export default function Home() {
  return (
    <main>
      {/* Banner */}
      <section className="categories">
        <div className="container">
          <div className="categories__inner">
            <h2>Категории</h2>
            <div className="categories__list">
              {categories.map((category) => (
                <div className="categories__list-item" key={category.id}>
                  <h3>{category.name}</h3>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={200}
                  />
                  <button className="button-1">
                    <Image
                      src={arrow}
                      alt="Стрелка"
                      width={16}
                      height={16}
                    ></Image>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="popular">
        <div className="container">
          <div className="popular__inner">
            <h2>Популярное</h2>
            <ProductsSlider />
          </div>
        </div>
      </section>
      <section className="new">
      <div className="container">
          <div className="popular__inner">
            <h2>Новинки</h2>
            <ProductsSlider />
          </div>
        </div>
      </section>
      <section className="discounts">
      <div className="container">
          <div className="popular__inner">
            <h2>Скидки</h2>
            <ProductsSlider />
          </div>
        </div>
      </section>
    </main>
  );
}
