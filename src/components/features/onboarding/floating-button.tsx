'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import FLOATING_ICON from '@images/images/onboarding-floating.svg';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsVisible(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 최상단으로 부드럽게 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="absolute bottom-6 right-6 flex justify-end">
      <button
        className={`transition-all duration-300 hover:scale-105 ${
          isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        onClick={scrollToTop}
      >
        <Image
          src={FLOATING_ICON}
          alt="플로팅 버튼: 누르면 최상단으로 올라갑니다."
          width={60}
          height={60}
          draggable="false"
        />
      </button>
    </div>
  );
};

export default FloatingButton;
