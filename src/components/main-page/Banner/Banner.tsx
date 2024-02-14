"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Image from "next/image";

import slide1 from "@/assets/images/banner/slide1.png";
import slide2 from "@/assets/images/banner/slide2.png";
import slide3 from "@/assets/images/banner/slide3.png";

import "./Banner.scss";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <div className="banner__slide banner__slide--one">
        <div className="container">
          <div className="banner__slide-inner">
            <div className="banner__text">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="banner__title"
              >
                НОВЫЙ <b className="banner__title-bold">NAMPHONE</b>
                <br />
                РЕЛИЗ ЭТОЙ ОСЕНЬЮ
              </motion.h1>
              <motion.button
                initial={{ y: 75, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="banner__button"
              >
                Узнать больше
              </motion.button>
            </div>
            <motion.div
              initial={{ y: -250, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75 }}
            >
              <Image src={slide1} alt="slide1" className="banner__image" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="banner__slide banner__slide--two">
        <div className="container">
          <div className="banner__slide-inner">
            <div className="banner__text">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="banner__title"
              >
                ИГРОВАЯ <b className="banner__title-bold">ПРИСТАВКА</b>
                <br />
                X245-HD
              </motion.h1>
              <motion.button
                initial={{ y: 75, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="banner__button"
              >
                Узнать больше
              </motion.button>
            </div>
            <motion.div
              initial={{ y: -250, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75 }}
            >
              <Image src={slide2} alt="slide2" className="banner__image" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="banner__slide banner__slide--three">
        <div className="container">
          <div className="banner__slide-inner">
            <div className="banner__text">
              <motion.h1
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="banner__title"
              >
                ПОДДЕРЖИВАЙТЕ СВОЮ
                <br />
                ФОРМУ С ПОМОЩЬЮ
                <br />
                НОВЫХ <b className="banner__title-bold">ГАДЖЕТОВ</b>
              </motion.h1>
              <motion.button
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="banner__button"
              >
                Узнать больше
              </motion.button>
            </div>
            <motion.div
              initial={{ y: -250, opacity: 0 }}
              whileInView={{  y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={slide3} alt="slide3" className="banner__image" />
            </motion.div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Banner;
