'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BACK_ICON from '@images/images/go-back-icon.svg';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      aria-label="나의 달성도 페이지로 돌아가기 버튼"
      className="absolute left-[26px] top-[18px] h-6 w-6 md:hidden"
    >
      <Image src={BACK_ICON} alt="나의 달성도 페이지로 돌아가기 버튼 아이콘" width={16} height={24} />
    </button>
  );
};

export default BackButton;
