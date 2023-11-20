"use client";
// Header.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "@/assets/styles/style-components/HeaderMobile.scss";

import Navigation from "@/components/Navigation";

import ShoppingIcon from "@/assets/images/icon-shopping.svg";
import HomeIcon from "@/assets/images/icon-home.svg";
import CatalogIcon from "@/assets/images/icon-catalog.svg";
import HeartIcon from "@/assets/images/icon-heart.svg";
import UnionIcon from "@/assets/images/icon-union.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { clearUser } from "@/lib/store/slices/UserSlice";
import { toast } from "react-toastify";
import AuthModal from "./AuthModal";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config.mjs";

const Header = () => {
  const [isNavigationShow, setNavigationIsShow] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.User);

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
    <div className="header__wrapper--mobile">
      <header className="header">
        <div className="container">
          <ul className="header__nav">
            <Link href={"/"}>
              <li className="header__nav-item">
                <HomeIcon className="header__nav-icon" />
              </li>
            </Link>
            <li
              className="header__nav-item"
              onClick={() => setNavigationIsShow(!isNavigationShow)}
            >
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
            {user.uid ? (
              <Link href={"/"}>
                <li className="header__nav-item">
                  {user.photo ? (
                    <div className="header__nav-icon--user">
                      <Image
                        src={user.photo}
                        alt="User Photo"
                        fill
                        className="header__nav-icon--user-photo"
                        sizes="45px"
                      />
                    </div>
                  ) : (
                    <UnionIcon className="header__nav-icon" />
                  )}
                </li>
              </Link>
            ) : (
              <li className="header__nav-item" onClick={openAuthModal}>
                <UnionIcon className="header__nav-icon" />
              </li>
            )}
          </ul>
        </div>
      </header>
      {isNavigationShow && <Navigation />}
      <AuthModal isOpen={isAuthModalOpen} onRequestClose={closeAuthModal} />
    </div>
  );
};

export default Header;
