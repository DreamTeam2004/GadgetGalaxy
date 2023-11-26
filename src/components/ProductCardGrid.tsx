import React from "react";
import Link from "next/link";
import Image from "next/image";

import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";
import Rating from "./Rating";

import "@/assets/styles/style-components/ProductCardGrid.scss";
import { IProduct } from "@/@types/IProduct";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCardGrid({ product }: ProductCardProps) {
  const isDiscount =
    product.newPrice !== undefined && product.newPrice !== null;
  return (
    <div className="product-cardV1">
      <div className="product-cardV1__text">
        <p className="product-cardV1__category">{product.category}</p>
        <h4 className="product-cardV1__name">{product.name}</h4>
        <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
      </div>

      <div className="product-cardV1__image">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 200px, (min-width: 1024px) and (max-width: 1279px) 185px, (min-width: 768px) and (max-width: 1023px) 185px, (max-width: 767px) 145px"
        />
      </div>

      <div className="product-cardV1__bottom">
        {isDiscount ? (
          <div className="product-cardV1__price">
            <p className="product-cardV1__price-new">${product.newPrice}</p>
            <p className="product-cardV1__price-old">${product.price}</p>
          </div>
        ) : (
          <div className="product-cardV1__price">${product.price}</div>
        )}

        <div className="product-cardV1__buttons">
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
}
