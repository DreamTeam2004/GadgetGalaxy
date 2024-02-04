import Link from "next/link";
import Image from "next/image";

import macBook from "@/assets/images/banner/macBookPro.png";
import macBookMobile from "@/assets/images/banner/macBookProMobile.jpg";
import AdvantageIcon1 from "@/assets/images/advantages/advantage1.svg";
import AdvantageIcon2 from "@/assets/images/advantages/advantage2.svg";
import AdvantageIcon3 from "@/assets/images/advantages/advantage3.svg";
import AdvantageIcon4 from "@/assets/images/advantages/advantage4.svg";
import AdvantageIcon5 from "@/assets/images/advantages/advantage5.svg";

import Banner from "@/components/Banner";
import ProductsSlider from "@/components/ProductsSlider";
import Brands from "@/components/Brands";
import Categories from "@/components/Categories";

import "@/assets/styles/style-pages/main-page.scss";

import { getDiscountProducts, getNewProducts, getPopularProducts } from "@/actions/products";

export const metadata = {
  title: "GadgetGalaxy - Главная",
};

export default async function Home() {
 
  const popularProducts = await getPopularProducts();
  const newProducts = await getNewProducts();
  const discountProducts = await getDiscountProducts();

  return (
    <main>
      <Banner />
      <section className="categories">
        <div className="container">
          <Categories />
        </div>
      </section>
      <section className="brands">
        <div className="container">
          <Brands />
        </div>
      </section>
      <section className="popular">
        <div className="container">
          <div className="popular__inner">
            <h2>Популярное</h2>
            <ProductsSlider products={popularProducts} />
          </div>
        </div>
      </section>
      <section className="new">
        <div className="container">
          <div className="popular__inner">
            <h2>Новинки</h2>
            <ProductsSlider products={newProducts} />
          </div>
        </div>
      </section>
      <section className="commercial">
        <div className="container">
          <Link href={"/"}>
            <Image src={macBook} alt="slide1" className="commercial__image" />
            <Image
              src={macBookMobile}
              alt="macbook"
              className="commercial__image--mobile"
            />
          </Link>
        </div>
      </section>
      <section className="discounts">
        <div className="container">
          <div className="popular__inner">
            <h2>Скидки</h2>
            <ProductsSlider products={discountProducts} />
          </div>
        </div>
      </section>
      <section className="advantages">
        <div className="container">
          <div className="advantages__inner">
            <div className="advantages__item">
              <AdvantageIcon1 className="advantages__item-image" />
              <div className="advantages__item-text">
                <div className="advantages__item-title">Гарантия</div>
                <div className="advantages__item-subtitle">24 месяца</div>
              </div>
            </div>
            <div className="advantages__item">
              <AdvantageIcon2 className="advantages__item-image" />
              <div className="advantages__item-text">
                <div className="advantages__item-title">Гарантия</div>
                <div className="advantages__item-subtitle">6-12 месяцев</div>
              </div>
            </div>
            <div className="advantages__item">
              <AdvantageIcon3 className="advantages__item-image" />
              <div className="advantages__item-text">
                <div className="advantages__item-title">Платежи</div>
                <div className="advantages__item-subtitle">Защищены</div>
              </div>
            </div>
            <div className="advantages__item">
              <AdvantageIcon4 className="advantages__item-image" />
              <div className="advantages__item-text">
                <div className="advantages__item-title">
                  Бесплатная доставка
                </div>
                <div className="advantages__item-subtitle">До $100</div>
              </div>
            </div>
            <div className="advantages__item">
              <AdvantageIcon5 className="advantages__item-image" />
              <div className="advantages__item-text">
                <div className="advantages__item-title">Бренды</div>
                <div className="advantages__item-subtitle">Только лучшие</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
