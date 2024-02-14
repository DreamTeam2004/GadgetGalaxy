import React from "react";
import Link from "next/link";
import Image from "next/image";

import Rating from "../Rating/Rating";

import HeartIcon from "@/assets/images/icon-heart.svg";

import { IProduct } from "@/DB/models/productModel";
import { ISubCategory } from "@/DB/models/subCategoryModel";

import "./ProductCardList.scss";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCardList({ product }: ProductCardProps) {
  const isDiscount =
    product.newPrice !== undefined && product.newPrice !== null;
  return (
    <div className="product-cardV2">
      <div className="product-cardV2__left">
        <div className="product-cardV2__image">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 200px, (min-width: 1024px) and (max-width: 1279px) 185px, (min-width: 768px) and (max-width: 1023px) 185px, (max-width: 767px) 145px"
          />
        </div>

        <div className="product-cardV2__text">
          <p className="product-cardV2__category">
            {(product.subcategory as ISubCategory).name}
          </p>
          <h4 className="product-cardV2__name">{product.name}</h4>
          <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>
      </div>

      <div className="product-cardV2__right">
        <div className="product-cardV2__buttons">
          <button className="button favorites">
            <HeartIcon className="favoritesIcon" height={40} />
          </button>
          <div className="product-cardV2__buttons-buy">
            {isDiscount ? (
              <div className="product-cardV2__price">
                <p className="product-cardV2__price-new">${product.newPrice}</p>
                <p className="product-cardV2__price-old">${product.price}</p>
              </div>
            ) : (
              <div className="product-cardV2__price">${product.price}</div>
            )}
            <button className="product-cardV2__buttons--basket">
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
