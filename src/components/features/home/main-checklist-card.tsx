import Image from 'next/image';
import Link from 'next/link';
import LevelLabel from '@/components/features/home/main-checklist-card-level';
import { PATH } from '@/constants/page-path';

const CheckListCard = async ({ checkListType }: { checkListType: string }) => {
  return (
    <Link
      href={`${PATH.CHECKLIST}/${checkListType}`}
      className="relative h-[221px] w-[221px] flex-shrink-0 overflow-hidden rounded-[30px] bg-white text-secondary-grey-900 outline outline-1 outline-secondary-grey-300"
    >
      <section className="absolute top-0 h-[79px] w-full px-[16px] pb-[16px] pt-[19px]">
        <p className="justify-start leading-snug">
          {checkListType} <br /> 체크리스트
        </p>
        <LevelLabel checkListType={checkListType} />
      </section>
      <section className="absolute left-0 top-[79px] h-36 w-56 overflow-hidden">
        <Image
          draggable="false"
          src={`/images/${checkListType}.svg`}
          alt={`${checkListType} 체크리스트 이미지`}
          width={221}
          height={142}
          priority
        />
      </section>
    </Link>
  );
};

export default CheckListCard;
