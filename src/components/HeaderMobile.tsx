"use client";
// Header.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "@/assets/styles/style-components/HeaderMobile.scss";

import Navigation from "@/components/Navigation";

import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HomeIcon from "@/assets/images/icon-home.svg";
import CatalogIcon from "@/assets/images/icon-catalog.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";
import UnionIcon from "@/assets/images/icon-union.svg";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="header__wrapper--mobile">
      <header className="header">
        <div className="container">
          <ul className="header__nav">
            <Link href={"/"}>
              <li className="header__nav-item">
                <HomeIcon className="header__nav-icon" />
              </li>
            </Link>
            <li className="header__nav-item" onClick={() => setIsShow(!isShow)}>
              <CatalogIcon className="header__nav-icon" />
            </li>
            <Link href={"/"}>
              <li className="header__nav-item">
                <ShoppingIcon className="header__nav-icon" />
              </li>
            </Link>
            <Link href={"/"}>
              <li className="header__nav-item">
                <HeartIcon className="header__nav-icon" />
              </li>
            </Link>
            <Link href={"/"}>
              <li className="header__nav-item">
                <UnionIcon className="header__nav-icon" />
              </li>
            </Link>
          </ul>
        </div>
      </header>
      {isShow && <Navigation />}
    </div>
  );
};

export default Header;
