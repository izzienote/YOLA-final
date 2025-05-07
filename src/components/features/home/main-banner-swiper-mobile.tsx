'use client';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MainBannerImage from '@/components/features/home/main-banner-image';
import BANNER_1 from '@images/images/main-banner-mobile-1.svg';
import BANNER_2 from '@images/images/main-banner-mobile-2.svg';
import BANNER_3 from '@images/images/main-banner-mobile-3.svg';

const MainBannerSwiperMobile = () => {
  const banners: string[] = [BANNER_1, BANNER_2, BANNER_3];

  return (
    <section className="mx-auto flex w-full flex-col md:hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.custom-pagination-mobile',
          bulletClass: 'custom-bullet-mobile',
          bulletActiveClass: 'custom-bullet-active-mobile'
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="my-swiper aspect-[375/184] w-full"
      >
        {banners.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <MainBannerImage imageUrl={imageUrl} index={index} isMobile />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination-mobile mt-4 inline-flex items-center justify-center gap-2" />
    </section>
  );
};

export default MainBannerSwiperMobile;
