import Image from 'next/image';
import type { MissionWithStatus } from '@/types/checklist';
import DONE from '@images/images/checklist-done.svg';
import UNDO from '@images/images/checklist-undo.svg';

interface MissionCardProps {
  mission: MissionWithStatus;
  isCompleted: boolean;
}

const MissionCard = ({ mission, isCompleted }: MissionCardProps) => {
  return (
    <>
      <strong className="flex w-[250px] items-start gap-[10px] px-[20px] py-[20px] pb-0 pt-[20px] md:w-[221px]">
        <span className="flex-1 grow basis-0 text-[18px] font-semibold leading-[1.4] text-primary-orange-900 md:text-[16px]">
          {mission.content}
        </span>
      </strong>
      <figure className="flex flex-1 items-center justify-center gap-[10px] self-stretch px-[10px]">
        <Image
          src={isCompleted ? DONE : UNDO}
          alt={isCompleted ? '완료' : '진행 전'}
          className="h-[105px] w-[105px] flex-shrink-0 md:h-[93px] md:w-[93px]"
          priority
        />
      </figure>
      <div className="flex h-[50px] items-center justify-center gap-[10px] self-stretch rounded-b-[20px] bg-primary-orange-200 md:h-[45px]">
        <span className="flex-1 grow basis-0 text-center text-[16px] leading-[1.4] md:text-[14px]">
          {isCompleted ? '인증글 보기' : '인증하기'}
        </span>
      </div>
    </>
  );
};

export default MissionCard;
