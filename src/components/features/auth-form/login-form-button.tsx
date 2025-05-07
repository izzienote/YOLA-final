import Image from 'next/image';
import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { GOOGLE_LOGIN, KAKAO_LOGIN } from '@/constants/default-image-url';
import { PATH } from '@/constants/page-path';
import { guestLogin, signInWithSocial } from '@/lib/utils/api/auth/auth-action';

const LoginFormButton = () => {
  return (
    <form className="mt-3 w-full max-w-[360px]">
      <div className="flex flex-col gap-3">
        <CustomButton type="submit" size="auth-submit" className="h-[42px] w-full" formAction={guestLogin}>
          게스트로 로그인
        </CustomButton>
        <CustomButton asChild size="auth-submit" variant="outline" className="h-[42px] w-full">
          <Link href={PATH.SIGNUP}>회원가입</Link>
        </CustomButton>
      </div>
      <div className="relative mb-[21.5px] h-[50px] border-b border-t-0 border-secondary-grey-600 md:mb-[23px] md:h-[78px]">
        <p className="absolute left-[113px] top-[41px] justify-start bg-white px-[26px] text-sm font-normal leading-tight text-secondary-grey-600 md:left-[120px] md:top-[69px]">
          간편 로그인
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <button type="submit" formAction={() => signInWithSocial('google')}>
          <Image src={GOOGLE_LOGIN} alt="구글 로그인 버튼" width={50} height={50} />
        </button>
        <button type="submit" formAction={() => signInWithSocial('kakao')}>
          <Image src={KAKAO_LOGIN} alt="카카오 로그인 버튼" width={50} height={50} />
        </button>
      </div>
    </form>
  );
};

export default LoginFormButton;
