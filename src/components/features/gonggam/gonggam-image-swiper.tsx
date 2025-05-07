'use client';

import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface GonggamImageSwiperProps {
  images: string[];
}

const GonggamImageSwiper = ({ images }: GonggamImageSwiperProps) => {
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={2.2}
      breakpoints={{
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }}
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <div className="relative aspect-square w-full overflow-hidden rounded-[12px]">
            <Image src={url} alt={`게시글 이미지 ${index + 1}`} fill sizes="379px" className="object-cover" priority />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GonggamImageSwiper;
