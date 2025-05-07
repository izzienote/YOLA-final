import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import type { AuthFormButtonProps } from '@/types/auth-form';

const SignupFormButton = ({ isValid, isSubmitting }: AuthFormButtonProps) => {
  return (
    <div className="mt-[53px] flex flex-col gap-3">
      <CustomButton disabled={!isValid || isSubmitting} type="submit" size="auth-submit" className="w-full">
        {isSubmitting ? '회원 등록 중...' : '가입하기'}
      </CustomButton>
      <CustomButton asChild variant="outline" size="auth-submit" className="h-[42px] w-full">
        <Link href={PATH.LOGIN}>뒤로가기</Link>
      </CustomButton>
    </div>
  );
};

export default SignupFormButton;
