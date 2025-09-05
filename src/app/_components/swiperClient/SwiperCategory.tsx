"use client";
import { Categories } from '@/types/Categories'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import Image from "next/image";
import 'swiper/css';

const SwiperCategory = ({ categories }: { categories: Categories[] }) => {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={5}
            modules={[Autoplay]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            loop >
            {categories.map((category) => <SwiperSlide key={category._id}>
                <Image className="h-[200px] w-full object-cover rounded-xl" width={600} height={400} src={category.image} alt={category.name} />
                <p className='my-3 text-center'>{category.name}</p>
            </SwiperSlide>)}
        </Swiper>
    )
}

export default SwiperCategory
