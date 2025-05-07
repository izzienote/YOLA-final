import Image from 'next/image';
import Link from 'next/link';
import { PATH } from '@/constants/page-path';

const TitleSection = () => {
  return (
    <div className="inline-flex items-center justify-between self-stretch">
      <strong className="justify-start text-xl font-semibold leading-7 text-secondary-grey-900">
        YOLA 공감 게시판
      </strong>
      <Link href={PATH.GONGGAM} className="flex h-[28px] items-center text-sm font-normal text-secondary-grey-900">
        <p className="h-[17px] text-end">전체보기</p>
        <Image
          src="images/gonggam-preview.svg"
          alt="공감게시판 전체보기 버튼"
          width={12}
          height={12}
          style={{ width: 'auto', height: 'auto' }}
        />
      </Link>
    </div>
  );
};

export default TitleSection;
