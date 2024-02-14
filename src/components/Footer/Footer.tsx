"use client";
import { useEffect, useState } from "react";

import Logo from "@/components/shared/Logo/Logo";
import Link from "next/link";
import ArrowIcon from "@/assets/images/icon-footer-arrow.svg";

import "./Footer.scss";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const [brandsVisible, setBrandsVisible] = useState(false);

  const [arrowDirectionCategories, setArrowDirectionCategories] =
    useState("down");
  const [arrowDirectionLinks, setArrowDirectionLinks] = useState("down");
  const [arrowDirectionBrands, setArrowDirectionBrands] = useState("down");

  const toggleCategories = () => {
    setCategoriesVisible(!categoriesVisible);
    setArrowDirectionCategories(categoriesVisible ? "down" : "up");
  };

  const toggleLinks = () => {
    setLinksVisible(!linksVisible);
    setArrowDirectionLinks(linksVisible ? "down" : "up");
  };

  const toggleBrands = () => {
    setBrandsVisible(!brandsVisible);
    setArrowDirectionBrands(brandsVisible ? "down" : "up");
  };

  //проверка на мобилу
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.matchMedia("(max-width: 767px)").matches;
      setIsMobile(isMobileView);

      if (isMobileView) {
        setCategoriesVisible(false);
        setLinksVisible(false);
        setBrandsVisible(false);
      } else {
        setCategoriesVisible(true);
        setLinksVisible(true);
        setBrandsVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__inner-top">
            <div className="footer__main">
              <Logo color="#FFFFFF" />
              <div>
                <p className="footer__main-subtitle">Служба поддержки:</p>
                <p className="footer__main-number">(800) 555-35-35</p>
              </div>
              <p className="footer__main-address">
                с. Новая Усмань, ул. 20 лет ВЛКСМ, 3А.
              </p>
              <p className="footer__main-address">
                г. Воронеж, Железнодорожный район, Ленинский проспект, 124А
              </p>
              <div className="footer__main-email">
                <p>dreamteam2004@yandex.com</p>
              </div>
            </div>
            <div className="footer__categories">
              <div className="footer__title">
                КАТЕГОРИИ
                <ArrowIcon
                  onClick={toggleCategories}
                  className={`footer__title--mobile ${arrowDirectionCategories}`}
                />
              </div>
              {categoriesVisible && (
                <>
                  <Link href={"/"}>
                    <div className="footer__link">TV & АУДИО</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">СМАРТФОНЫ & ПЛАНШЕТЫ</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">НОУТБУКИ & ПК</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">ПЕРЕФЕРИЯ & АКСЕССУАРЫ</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">ФОТО & ВИДЕО</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">КОМПЛЕКТУЮЩИЕ ДЛЯ ПК</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">КОНСОЛИ & ВИДЕОИГРЫ</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">СЕТЕВОЕ ОБОРУДОВАНИЕ</div>
                  </Link>
                </>
              )}
            </div>
            <div className="footer__links">
              <div className="footer__title">
                ССЫЛКИ
                <ArrowIcon
                  onClick={toggleLinks}
                  className={`footer__title--mobile ${arrowDirectionLinks}`}
                />
              </div>
              {linksVisible && (
                <>
                  <Link href={"/"}>
                    <div className="footer__link">СПИСОК ЖЕЛАНИЙ</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">КОРЗИНА</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">ЛИЧНЫЙ КАБИНЕТ</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">КАТАЛОГ</div>
                  </Link>
                </>
              )}
            </div>
            <div className="footer__brands">
              <div className="footer__title">
                БРЕНДЫ
                <ArrowIcon
                  onClick={toggleBrands}
                  className={`footer__title--mobile ${arrowDirectionBrands}`}
                />
              </div>
              {brandsVisible && (
                <>
                  <Link href={"/"}>
                    <div className="footer__link">APLLE</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">HUAWEI</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">SAMSUNG</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">DEXP</div>
                  </Link>
                  <Link href={"/"}>
                    <div className="footer__link">XIAOMI</div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__inner-bottom">
            <p>GadgetGalaxy E-commerce © 2023. Все права защищены</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
