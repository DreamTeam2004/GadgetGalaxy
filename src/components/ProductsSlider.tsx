"use client";

// ПРИМЕР*************************************/
import { products } from "@/example-data.js";
// ПРИМЕР*************************************/

import React from "react";
import Image from "next/image";

import shopping from "@/assets/images/icon-shopping-blue.svg";
import heart from "@/assets/images/icon-heart-blue.svg";

import "@/assets/styles/style-components/ProductsSlider.scss";

export default function ProductsSlider() {
  return (
    <div className="product-slider">
      <div className="list">
        {products.map((product) => (
          <div className="list__item" key={product.id}>
            <h4>{product.name}</h4>
            <Image
              className="list__item-image"
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
            />
            <div className="list__item-bottom">
              <div className="list__item-price">${product.price}</div>
              <div className="list__item-buttons">
                <button className="button-1 favorites">
                  <Image src={heart} alt="Избранное" />
                </button>
                <button className="button-1 basket">
                  <Image
                    src={shopping}
                    alt="Корзина"
                  ></Image>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button>←</button>
      <button>→</button>
    </div>
  );
}
