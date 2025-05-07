import Image from 'next/image';
import Link from 'next/link';
import { PATH } from '@/constants/page-path';
import MAIN_LOGO from '@images/images/main-logo.svg';

const MainLogo = () => {
  return (
    <Link href={PATH.HOME} className="flex h-[44px] w-[104px] items-center justify-center">
      <Image src={MAIN_LOGO} alt="YOLA 메인 로고" width={84} height={23} />
    </Link>
  );
};

export default MainLogo;
