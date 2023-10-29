// Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

import "@/assets/styles/style-components/Header.scss";

import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

import shopping from "@/assets/images/icon-shopping-blue.svg";
import heart from "@/assets/images/icon-heart-blue.svg";
import union from "@/assets/images/icon-union-blue.svg";
import search from "@/assets/images/icon-search.svg";

const Header = () => {
  return (
    <div className="header__wrapper">
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <div className="header__group-catalog">
              <Logo color="#565656" />
              <button className="header__catalog" type="button">
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
                <Image src={search} alt="search" width={20} height={20} />
              </button>
            </div>
            <nav>
              <ul className="header__nav">
                <Link href={"/"}>
                  <li className="header__nav-item">
                    <Image
                      src={shopping}
                      alt="shopping"
                      className="header__nav-icon"
                    />
                  </li>
                </Link>
                <Link href={"/"}>
                  <li className="header__nav-item">
                    <Image
                      src={heart}
                      alt="heart"
                      className="header__nav-icon"
                    />
                  </li>
                </Link>
                <Link href={"/"}>
                  <li className="header__nav-item">
                    <Image
                      src={union}
                      alt="union"
                      className="header__nav-icon"
                    />
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {/* <Navigation /> */}
    </div>
  );
};

export default Header;
