"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowNextIcon from "@/assets/images/icon-arrow-next.svg";
import ArrowPrevIcon from "@/assets/images/icon-arrow-prev.svg";

import "@/assets/styles/style-components/ProductsSlider.scss";
import ProductCard from "./ProductCardGrid";
import { IProduct } from "@/@types/IProduct";

interface ProductsSliderProps {
  products: IProduct[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
}) => {
  const settings = {
    // autoplay: true,
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
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
          nextArrow: <div />,
          prevArrow: <div />,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          nextArrow: <div />,
          prevArrow: <div />,
        },
      },
    ],
  };

  // if (!products) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Slider {...settings} className="list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Slider>
  );
};

export default ProductsSlider;
