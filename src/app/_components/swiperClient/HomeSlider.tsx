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
        <section className="mb-10 flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 rounded-s-xl">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop >
                    <SwiperSlide><div className="h-[400px] w-full relative"><Image className="object-fill md:object-cover rounded-s-xl" fill priority src={slide1} alt="slide 1" /></div></SwiperSlide>
                    <SwiperSlide><div className="h-[400px] w-full relative"><Image className="object-fill md:object-cover rounded-s-xl" fill priority src={slide2} alt="slide 2" /></div></SwiperSlide>
                    <SwiperSlide><div className="h-[400px] w-full relative"><Image className="object-fill md:object-cover rounded-s-xl" fill priority src={slide3} alt="slide 3" /></div></SwiperSlide>
                </Swiper>
            </div>
            <div className="w-full md:w-1/3 rounded-e-xl hidden md:block">
                <div className="h-[200px] w-1/2 md:w-full relative"><Image className="object-cover rounded-e-xl" fill src={banner1} alt="banner 1" /></div>
                <div className="h-[200px] w-1/2 md:w-full relative"><Image className="object-cover rounded-e-xl" fill src={banner2} alt="banner 2" /></div>
            </div>
        </section>
    );
};

export default HomeSlider;
