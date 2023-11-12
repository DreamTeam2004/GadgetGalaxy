"use client"
import Link from "next/link";
import Image from "next/image";

import mackbook from "@/assets/images/banner/macbookPro.png";
import mackbookMobile from "@/assets/images/banner/macbookProMobile.jpg";
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
import { useEffect, useState } from "react";

interface Product {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  newPrice?: number;
  createdAt: string;
  updatedAt: string;
}

// export const metadata = {
//   title: "GadgetGalaxy - Главная",
// };

export default function Home() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Функция для получения данных с популярных товаров
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch("/api/products/popular"); // Поменяйте на свой URL эндпоинта
        const data = await response.json();
        setPopularProducts(data.popularProducts);
      } catch (error) {
        console.error("Ошибка при запросе популярных товаров", error);
      }
    };

    // Функция для получения данных с новых товаров
    const fetchNewProducts = async () => {
      try {
        const response = await fetch("/api/products/new"); // Поменяйте на свой URL эндпоинта
        const data = await response.json();
        setNewProducts(data.newProducts);
      } catch (error) {
        console.error("Ошибка при запросе новых товаров", error);
      }
    };

     // Функция для получения данных с скидками товаров
     const fetchDiscountProducts = async () => {
      try {
        const response = await fetch("/api/products/discount"); // Поменяйте на свой URL эндпоинта
        const data = await response.json();
        setDiscountProducts(data.discountProducts);
      } catch (error) {
        console.error("Ошибка при запросе новых товаров", error);
      }
    };

    // Вызываем функции для получения данных при монтировании компонента
    fetchPopularProducts();
    fetchNewProducts();
    fetchDiscountProducts();
  }, []); // Пустой массив зависимостей, чтобы запросы выполнялись только один раз при монтировании
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
            <Image src={mackbook} alt="slide1" className="commercial__image" />
            <Image
              src={mackbookMobile}
              alt="slide1"
              className="commercial__image--mobile"
            />
          </Link>
        </div>
      </section>
      <section className="discounts">
        <div className="container">
          <div className="popular__inner">
            <h2>Скидки</h2>
            <ProductsSlider products={discountProducts} isDiscounts={true} />
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
