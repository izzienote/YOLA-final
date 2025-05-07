import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';

const GuestOptionMenu = () => {
  return (
    <CustomButton asChild variant="default" aria-label="로그인 페이지 이동 버튼" size="login" className="h-[38px]">
      <Link href={PATH.LOGIN}>로그인</Link>
    </CustomButton>
  );
};

export default GuestOptionMenu;
