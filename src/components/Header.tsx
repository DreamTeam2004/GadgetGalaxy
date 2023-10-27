// Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/components/Logo";

import shopping from "@/assets/images/icon-shopping.svg";
import heart from "@/assets/images/icon-heart.svg";
import union from "@/assets/images/icon-union.svg";
import search from "@/assets/images/icon-search.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__group-catalog">
            <Logo color="#565656" />
            <button className="header__catalog">
              <span>&#9776;</span> Каталог
            </button>
          </div>
          <div className="header__search">
            <input
              className="header__search-input"
              type="search"
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
                  <Image src={heart} alt="heart" className="header__nav-icon" />
                </li>
              </Link>
              <Link href={"/"}>
                <li className="header__nav-item">
                  <Image src={union} alt="union" className="header__nav-icon" />
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
