"use client";
import React from "react";
import banner1 from "@/../public/slider/grocery-banner.png";
import banner2 from "@/../public/slider/grocery-banner-2.jpeg";
import slide1 from "@/../public/slider/slider-image-1.jpeg";
import slide2 from "@/../public/slider/slider-image-2.jpeg";
import slide3 from "@/../public/slider/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from "next/image";
import 'swiper/css';

const HomeSlider = () => {
    return (
        <section className="mb-10 flex">
            <div className="w-2/3 rounded-s-xl">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop >
                    <SwiperSlide><Image className="h-[400px] w-full object-cover rounded-s-xl" width={600} height={400} src={slide1} alt="slide 1" /></SwiperSlide>
                    <SwiperSlide><Image className="h-[400px] w-full object-cover rounded-s-xl" width={600} height={400} src={slide2} alt="slide 2" /></SwiperSlide>
                    <SwiperSlide><Image className="h-[400px] w-full object-cover rounded-s-xl" width={600} height={400} src={slide3} alt="slide 3" /></SwiperSlide>
                </Swiper>
            </div>
            <div className="w-1/3 rounded-e-xl">
                <Image className="h-[200px] w-full object-cover rounded-e-xl" width={300} height={200} src={banner1} alt="banner 1" />
                <Image className="h-[200px] w-full object-cover rounded-e-xl" width={300} height={200} src={banner2} alt="banner 2" />
            </div>
        </section>
    );
};

export default HomeSlider;
