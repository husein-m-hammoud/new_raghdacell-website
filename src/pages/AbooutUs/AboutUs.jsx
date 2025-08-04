import { Container, Title } from "../../components/index";
import { useContextTranslate } from "../../Context/ContextAPI";
import { publicRequest, privateRequest } from '../../Context/CoinexApi';
import axios from 'axios';

import React, { useEffect, useState } from 'react';

import { fileUrl, useFETCH } from "../../Tools/APIs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Loading from "../../Tools/Loading";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
const AboutUs = () => {
  const { content } = useContextTranslate();
  const { data, isLoading } = useFETCH(
    `about-us/info?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;

  return (
    <section className="py-4">
      <Container>
        {isLoading ? <Loading /> : ""}
        <Title title={content.aboutUs} />
        <p className="py-3 text-center text-lg font-medium mb-2">
          {dataAll?.about_us_text}
        </p>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className="mySwiper h-[75vh] max-sm:max-h-[40vh]"
          style={{ direction: "ltr" }}
        >
          {dataAll?.about_us_images.map((e) => (
            <SwiperSlide key={e.id}>
              <img
                src={fileUrl + e.image}
                alt=""
                className="w-full h-full rounded-xl "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default AboutUs;
