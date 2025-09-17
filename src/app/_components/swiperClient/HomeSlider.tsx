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
            <div className="w-full md:w-2/3 overflow-hidden rounded-xl md:rounded-none md:rounded-l-xl">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    // modules={[Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop 
                    className="!rounded-none"
                    >
                    <SwiperSlide><div className="h-[300px] md:h-[400px] aspect-[750/483] w-full relative"><Image className="md:object-cover rounded-xl"  sizes="(max-width: 768px) 100vw, 66vw" fill priority fetchPriority="high" src={slide1} alt="slide 1" /></div></SwiperSlide>
                    <SwiperSlide><div className="h-[300px] md:h-[400px] aspect-[750/483] w-full relative"><Image className="md:object-cover rounded-xl rounded-xl md:rounded-none md:rounded-l-xl"  sizes="(max-width: 768px) 100vw, 66vw" fill src={slide2} alt="slide 2" /></div></SwiperSlide>
                    <SwiperSlide><div className="h-[300px] md:h-[400px] aspect-[750/483] w-full relative"><Image className="md:object-cover rounded-xl rounded-xl md:rounded-none md:rounded-l-xl"  sizes="(max-width: 768px) 100vw, 66vw" fill src={slide3} alt="slide 3" /></div></SwiperSlide>
                </Swiper>
            </div>
            <div className="w-full md:w-1/3 rounded-r-xl hidden md:block overflow-hidden">
                <div className="h-[200px] w-1/2 md:w-full relative"><Image className="object-cover" fill src={banner1} alt="banner 1" /></div>
                <div className="h-[200px] w-1/2 md:w-full relative"><Image className="object-cover" fill src={banner2} alt="banner 2" /></div>
            </div>
        </section>
    );
};

export default HomeSlider;
