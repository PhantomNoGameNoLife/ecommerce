"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Autoplay  } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import Image from 'next/image';

const ProductSlider = ({ images } : { images: string[] }) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop
      pagination={{
        horizontalClass: "!w-fit",
        clickable: true,
        renderBullet: (index, className) => {
          return `
              <span class="${className} !flex !flex-col border b-chart-1 rounded-full overflow-hidden !size-10 !mb-2 sm:!size-20">
                <img 
                  src="${images[index]}" 
                  alt="Slide ${index + 1}" 
                  class="!w-full !h-full !object-cover" 
                />
              </span>
            `;
        },
      }}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={img}
            alt="product img"
            width={300}
            height={300}
            className="aspect-square object-cover w-full rounded-2xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;