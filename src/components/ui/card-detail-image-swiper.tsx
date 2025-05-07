import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import type { LifePostWithImageUrls } from '@/types/life-post';

/** 카드 디테일 모달에 들어가는 이미지 슬라이드 구현을 위한 스와이퍼 컴포넌트 */
export const ImageSwiper = ({ image_urls }: Pick<LifePostWithImageUrls, 'image_urls'>) => {
  return (
    <Swiper
      spaceBetween={12}
      slidesPerView="auto"
      slidesOffsetAfter={0}
      breakpoints={{
        768: {
          spaceBetween: 16
        }
      }}
      className="mb-[20px] md:mb-[44px]"
    >
      {image_urls.map((url) => (
        <SwiperSlide key={url} className="!w-[300px] cursor-pointer last:!mr-0">
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-[12px]">
            <Image src={url} alt="post image" fill className="object-cover" sizes="300px" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
