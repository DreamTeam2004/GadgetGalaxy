"use client";
// Header.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "@/assets/styles/style-components/Header.scss";

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";
import UnionIcon from "@/assets/images/icon-union.svg";
import SearchIcon from "@/assets/images/icon-search.svg";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="header__wrapper">
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <div className="header__group-catalog">
              <Logo color="#565656" />
              <button
                className="header__catalog-btn"
                type="button"
                onClick={() => setIsShow(!isShow)}
              >
                <span>&#9776;</span> Каталог
              </button>
            </div>
            <div className="header__search">
              <input
                className="header__search-input"
                type="input"
                placeholder="Поиск..."
              />
              <button className="header__search-btn">
                <SearchIcon width={20} height={20} />
              </button>
            </div>
            <nav>
              <ul className="header__nav">
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
            </nav>
          </div>
        </div>
      </header>
      {isShow && <Navigation />}
    </div>
  );
};

export default Header;
