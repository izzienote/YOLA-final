import { headers } from 'next/headers';
import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';

const GonggamHeader = () => {
  const headersList = headers();
  const pathName = headersList.get('x-pathname') || '';
  const categoryName = pathName.split('/').filter(Boolean).pop();

  return (
    <section className="mt-[44px] flex justify-between px-[10px] py-[8px]">
      <h1 className="py-[5px] text-center text-[20px] font-semibold leading-[140%]">YOLA 공감 게시판</h1>
      <Link href={`${PATH.GONGGAM_POST}/${categoryName}`}>
        <CustomButton size="gonggam-write">글 작성하기</CustomButton>
      </Link>
    </section>
  );
};

export default GonggamHeader;
