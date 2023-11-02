"use client";

// ПРИМЕР*************************************/
import { products, categories } from "@/example-data.js";
// ПРИМЕР*************************************/

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "@/components/Rating";

import ArrowNextIcon from "@/assets/images/icon-arrow-next.svg";
import ArrowPrevIcon from "@/assets/images/icon-arrow-prev.svg";
import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";

import "@/assets/styles/style-components/ProductsSlider.scss";

interface ProductsSliderProps {
  isDiscounts?: Boolean;
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({
  isDiscounts = false,
}) => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false, // Отображение точек для навигации
    infinite: true, // Бесконечная карусель
    speed: 500, // Скорость анимации
    slidesToShow: 5, // Количество отображаемых карточек
    slidesToScroll: 1, // Количество карточек, перелистываемых за раз
    initialSlide: 0,
    nextArrow: (
      <div>
        <ArrowNextIcon width={35} height={35} className="next-slick-arrow" />
      </div>
    ),
    prevArrow: (
      <div>
        <ArrowPrevIcon width={35} height={35} className="prev-slick-arrow" />
      </div>
    ),
  };

  return (
    <Slider {...settings} className="list">
      {products.map((product) => {
        // Находим категорию товара по его categoryId
        const productCategory = categories.find(
          (category) => category.id === product.categoryID
        );

        return (
          <div className="list__item" key={product.id}>
            <div className="list__item-text">
              <p className="list__item-category">{productCategory?.name}</p>
              <h4 className="list__item-name">{product.name}</h4>
              <Rating
                rating={product.rating}
                reviewsCount={product.reviewsCount}
              ></Rating>
            </div>

            <Image
              className="list__item-image"
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
            />
            <div className="list__item-bottom">
              {isDiscounts ? (
                <div className="list__item-price">
                  <p className="list__item-price-new">${product.newPrice}</p>
                  <p className="list__item-price-old">${product.price}</p>
                </div>
              ) : (
                <div className="list__item-price">${product.price}</div>
              )}

              <div className="list__item-buttons">
                <button className="button-1 favorites">
                  <HeartIcon className="favoritesIcon" height={30} />
                </button>
                <button className="button-1 basket">
                  <ShoppingIcon className="basketIcon" height={30} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default ProductsSlider;
