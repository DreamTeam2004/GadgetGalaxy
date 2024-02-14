import React from "react";
import Link from "next/link";
import Image from "next/image";

import Rating from "@/components/product-card/Rating/Rating";

import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";

import { IProduct } from "@/DB/models/productModel";
import { ISubCategory } from "@/DB/models/subCategoryModel";

import "./ProductCardGrid.scss";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCardGrid({ product }: ProductCardProps) {
  const isDiscount =
    product.newPrice !== undefined && product.newPrice !== null;
  return (
    <div className="product-cardV1">
      <div className="product-cardV1__text">
        <p className="product-cardV1__category">
          {(product.subcategory as ISubCategory).name}
        </p>
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
          <button className="button favorites">
            <HeartIcon className="favoritesIcon" height={30} />
          </button>
          <button className="button basket">
            <ShoppingIcon className="basketIcon" height={30} />
          </button>
        </div>
      </div>
    </div>
  );
}
