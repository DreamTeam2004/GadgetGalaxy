"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/components/shared/Logo/Logo";
import Navigation from "@/components/header/Navigation/Navigation";
import AuthModal from "@/components/AuthModal/AuthModal";

import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";
import UnionIcon from "@/assets/images/icon-union.svg";
import SearchIcon from "@/assets/images/icon-search.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toast } from "react-toastify";
import { clearUser } from "@/lib/store/slices/UserSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/DB/firebase";
import useAuth from "@/hooks/useAuth";

import "./Header.scss";

const Header = () => {
  const [isNavigationShow, setNavigationIsShow] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.User);
  useAuth();

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    document.body.style.overflow = "visible";
  };
  // Убедитесь, что стиль сбрасывается при размонтировании компонента
  useEffect(() => {
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleLogout = () => {
    // Выход из Firebase
    signOut(auth)
      .then(() => {
        // Успешный выход
        dispatch(clearUser());
        toast.success("Вы вышли из системы");
      })
      .catch((error: any) => {
        // console.error("Ошибка при выходе из Firebase:", error.message);
        toast.error("Произошла ошибка при выходе из системы");
      });
  };

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
                onClick={() => setNavigationIsShow(!isNavigationShow)}
              >
                <span className="header__catalog-btn-burger">&#9776;</span>
                <span className="header__catalog-btn-text">Каталог</span>
              </button>
            </div>
            <div className="header__search">
              <input
                className="header__search-input"
                type="input"
                placeholder="Поиск..."
                id="search"
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
                {user.accessToken ? (
                  <li className="header__nav-item">
                    {user.photo ? (
                      <div className="header__nav-icon--user">
                        <Image
                          src={user.photo}
                          alt="User Photo"
                          fill
                          className="header__nav-icon--user-photo"
                          sizes="30px"
                        />
                      </div>
                    ) : (
                      <UnionIcon className="header__nav-icon" />
                    )}
                    <div className="dropdown-menu">
                      <ul className="dropdown-menu__inner">
                        <li className="dropdown-menu__item--name">
                          {user.name ? user.name : "Вы"}
                        </li>
                        <li className="dropdown-menu__item">Личный кабинет</li>
                        <li
                          className="dropdown-menu__item"
                          onClick={handleLogout}
                        >
                          Выйти
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li className="header__nav-item" onClick={openAuthModal}>
                    <UnionIcon className="header__nav-icon" />
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {isNavigationShow && (
        <Navigation onClose={() => setNavigationIsShow(false)} />
      )}
      <AuthModal isOpen={isAuthModalOpen} onRequestClose={closeAuthModal} />
    </div>
  );
};

export default Header;
