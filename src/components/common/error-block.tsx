'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';

interface ErrorBlockProps {
  image: string;
  errorMessage: string;
}

const ErrorBlock = ({ errorMessage, image }: ErrorBlockProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleBackHome = () => {
    startTransition(() => {
      router.push(PATH.HOME);
    });
  };

  return (
    <section className="inline-flex h-[calc(100vh-150px-157px)] flex-col items-center justify-center justify-items-center gap-10 md:h-[calc(100vh-150px-250px)]">
      <div className="flex flex-col">
        <Image src={image} alt="에러페이지" width={240} height={184} />
        <p className="font-center mb-[20px] mt-[40px] inline-flex items-center justify-center gap-2.5 self-stretch px-2.5 text-center text-base leading-snug text-zinc-800">
          {errorMessage} <br />
          홈으로 다시 가볼까요?
        </p>
        <CustomButton onClick={handleBackHome} disabled={isPending} size="error-page">
          {isPending ? '이동 중...' : '홈으로 돌아가기'}
        </CustomButton>
      </div>
    </section>
  );
};

export default ErrorBlock;
