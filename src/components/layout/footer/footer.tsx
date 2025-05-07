import Image from 'next/image';
import Link from 'next/link';
import { PATH } from '@/constants/page-path';
import FOOTER_LOGO from '@images/images/footer-logo.svg';

const Footer = () => {
  return (
    <footer className="flex h-[150px] w-full flex-col items-center justify-center justify-items-center overflow-hidden bg-secondary-grey-150 text-xs">
      <div className="mx-auto flex h-[44px] items-center justify-center">
        <Image src={FOOTER_LOGO} alt="푸터 로고" width={84} height={23} />
      </div>
      <Link
        aria-label="YOLA 소개 페이지로 이동하기"
        href={PATH.ONBOARDING}
        className="flex h-[29px] items-center justify-center leading-none text-secondary-grey-900 underline"
      >
        YOLA 소개
      </Link>
      <p className="justify-start self-stretch text-center leading-tight text-secondary-grey-800">
        ⓒ 2025. 태초마을 all rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
