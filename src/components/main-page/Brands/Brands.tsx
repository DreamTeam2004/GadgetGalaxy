"use client";

// ПРИМЕР*************************************/
import { brands } from "@/example-data.js";
// ПРИМЕР*************************************/

import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowRightIcon from "@/assets/images/icon-arrow-right.svg";
import ArrowLeftIcon from "@/assets/images/icon-arrow-left.svg";

import "./Brands.scss";

export default function Brands() {
  const settings = {
    dots: false, // Отображение точек для навигации
    infinite: true, // Бесконечная карусель
    speed: 500, // Скорость анимации
    slidesToShow: 5, // Количество отображаемых карточек
    slidesToScroll: 1, // Количество карточек, перелистываемых за раз
    nextArrow: (
      <div>
        <ArrowRightIcon width={30} className="next-slick-arrow" />
      </div>
    ),
    prevArrow: (
      <div>
        <ArrowLeftIcon width={30} className="prev-slick-arrow" />
      </div>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4,
          nextArrow: <div />,
          prevArrow: <div />,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          nextArrow: <div />,
          prevArrow: <div />,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="brands">
      {brands.map((brand) => (
        <div className="brands__item" key={brand.id}>
          <Image
            className="brands__item-image"
            src={brand.image}
            alt={brand.name}
          />
        </div>
      ))}
    </Slider>
  );
}
