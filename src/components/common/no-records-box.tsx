import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import CAT_NO_RECORDS from '@images/images/cat-no-records.svg';

interface NoRecordsBoxProps {
  mode: '공감' | '라이프' | '캘린더';
}

const NoRecordsBox = ({ mode }: NoRecordsBoxProps) => {
  return (
    <section
      className={clsx(
        'col-span-full flex w-full flex-col items-center justify-center whitespace-normal rounded-[12px] bg-secondary-grey-100 text-center text-secondary-grey-500',
        mode === '캘린더' ? 'min-h-[351px]' : 'min-h-[543px]'
      )}
    >
      {/* 고양이 이미지 */}
      <figure className="relative mb-[20px] h-[58px] w-[65px]">
        <Image src={CAT_NO_RECORDS} alt="기록없음을 알리는 고양이 일러스트" fill className="object-contain" />
      </figure>
      {/* 텍스트 문구 */}
      <p>{mode === '캘린더' ? '이 날의 기록이 없어요' : '앗 아직 기록이 없어요'}</p>
      <p>
        {mode === '공감'
          ? '공감 게시판에서 글을 작성해보세요!'
          : mode === '라이프'
            ? '오늘의 혼자 라이프를 기록해보세요!'
            : '혼자만의 하루에 대한 기록을 남겨보세요!'}
      </p>
      {/* 캘린더 모드 시, 버튼 적용 */}
      {mode === '캘린더' ? (
        <Link href={PATH.LIFE_POST} className="mt-[30px] text-secondary-grey-900">
          <CustomButton variant="default">일기 작성하기</CustomButton>
        </Link>
      ) : (
        ''
      )}
    </section>
  );
};

export default NoRecordsBox;
