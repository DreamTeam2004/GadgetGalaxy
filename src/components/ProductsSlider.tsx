"use client";

import React, { HTMLAttributes } from "react";
import Image from "next/image";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "@/components/Rating";

import ArrowNextIcon from "@/assets/images/icon-arrow-next.svg";
import ArrowPrevIcon from "@/assets/images/icon-arrow-prev.svg";
import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";

import "@/assets/styles/style-components/ProductsSlider.scss";

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

interface ProductsSliderProps {
  products: Product[];
  isDiscounts?: Boolean;
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
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

  return (
    <Slider {...settings} className="list">
      {products.map((product) => (
        <div className="list__item" key={product.id}>
          <div className="list__item-text">
            <p className="list__item-category">{product.category}</p>
            <h4 className="list__item-name">{product.name}</h4>
            <Rating
              rating={product.rating}
              reviewsCount={product.reviewsCount}
            ></Rating>
          </div>

          <div className="list__item-image">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(min-width: 1280px) 200px, (min-width: 1024px) and (max-width: 1279px) 185px, (min-width: 768px) and (max-width: 1023px) 185px, (max-width: 767px) 145px"
            />
          </div>

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
      ))}
    </Slider>
  );
};

export default ProductsSlider;
