"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Image from "next/image";

import slide1 from "@/assets/images/banner/slide1.jpg";
import slide2 from "@/assets/images/banner/slide2.jpg";
import slide3 from "@/assets/images/banner/slide3.jpg";

import "@/assets/styles/style-components/Banner.scss";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
  };

  return (
    <Slider {...settings}>
      <div className="banner__slide">
        <Image src={slide1} alt="slide1" className="banner__image" />
        <div className="banner__text">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            НОВЫЙ <b className="banner__title-bold">NAMPHONE</b>
            <br />
            РЕЛИЗ ЭТОЙ ОСЕНЬЮ
          </motion.h1>
          <button className="banner__button">Узнать больше</button>
        </div>
      </div>

      <div className="banner__slide">
        <Image src={slide2} alt="slide2" className="banner__image" />
        <div className="banner__text">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="banner__title"
          >
            ИГРОВАЯ <b className="banner__title-bold">ПРИСТАВКА</b>
            <br />
            X245-HD
          </motion.h1>
          <button className="banner__button">Узнать больше</button>
        </div>
      </div>

      <div className="banner__slide">
        <Image src={slide3} alt="slide3" className="banner__image" />
        <div className="banner__text">
          <div className="container">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ПОДДЕРЖИВАЙТЕ СВОЮ
              <br />
              ФОРМУ С ПОМОЩЬЮ
              <br />
              НОВЫХ <b className="banner__title-bold">ГАДЖЕТОВ</b>
            </motion.h1>
            <button className="banner__button">Узнать больше</button>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Banner;
