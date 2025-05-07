'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import RandomMissionLoadingSpinner from '@/components/features/modals/random-mission-loading-spinner';
import { CustomButton } from '@/components/ui/custom-button';
import type { TableMissionList } from '@/types/supabase-const';
import MISSION_CHARACTER from '@images/images/cat-in-question-box-original.svg';

/*
Step 1. 사용할 페이지 서버컴포넌트에서 이 코드를 추가해주세요
const missionsData = await getMissions();

Step 2. 호출할 클라이언트 컴포넌트로 missionsData와 isLogin을 props로 넘겨주세요

Step 3. 클라이언트 컴포넌트에서 이 코드를 추가해주세요
const [showModal, setShowModal] = useState(false);
const clickModal = () => setShowModal(!showModal);

Step 4. 클릭하는 부분에 이 코드를 추가해주세요
<button onClick={clickModal}>랜덤 미션 뽑기</button>

Step 5. 4번의 버튼 바깥에 이 코드를 추가해주세요
{showModal && <RandomMissionModal missions={missions} clickModal={clickModal} showModal={showModal} isLogin={isLogin} />}
 */
interface RandomMissionModalProps {
  missionsData: TableMissionList[];
  clickModal: () => void;
  showModal: boolean;
  isLogin: boolean;
}

const RandomMissionModal = ({ missionsData, clickModal, showModal, isLogin }: RandomMissionModalProps) => {
  const [randomMission, setRandomMission] = useState<string>('');
  const [showContent, setShowContent] = useState<boolean>(true);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (showModal) {
      // 스크롤을 막기 전 브라우저의 스크롤 크기를 확인합니다.
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden'; //모달이 클릭되면 배경에 스크롤 막음
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false }); //모바일에서도 막음

      // paddingRight를 추가합니다. 단 현재 스크롤바가 없을 때는 그대로 유지합니다.(역 레이아웃 시프트 방지입니다.)
      document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '0';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);

      document.body.style.paddingRight = '0'; // 모든 값을 정상으로 되돌릴 때 패딩값도 0으로 넣어주면 됩니다!
    };
  }, [showModal]);

  const handleRandomMission = () => {
    const randomIndex = Math.floor(Math.random() * missionsData.length);
    const randomMissionData = missionsData[randomIndex];
    setRandomMission(randomMissionData.content);
    setShowContent(false);
  };

  return (
    <div
      onClick={() => clickModal()} // 배경 클릭하면 모달 나가기
      className="fixed left-0 top-0 z-[51] flex h-full w-full items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 안을 클릭 했을 때 나가는 것 막음
        className="relative flex h-[100dvh] w-full flex-col gap-5 overflow-hidden rounded-none bg-white px-6 pb-8 pt-10 md:h-[416px] md:w-[598px] md:rounded-[20px] md:px-[68px] md:pb-[36px] md:pt-[60px]"
      >
        <X onClick={() => clickModal()} className="absolute right-[30px] top-[30px] z-[52] h-7 w-7 cursor-pointer" />
        <div className="mt-[158px] flex flex-col justify-start gap-2.5 self-stretch text-center leading-relaxed text-secondary-grey-900 md:mt-0">
          <strong className="text-xl font-semibold">오늘의 랜덤 미션</strong>
          <p className="text-base font-normal">
            {isLogin ? '두근두근 뭐가 나올까?' : '더 많은 미션을 원하시면 회원가입하세요!'}
          </p>
        </div>
        <div className="flex h-[178px] w-full items-center justify-center">
          {randomMission ? (
            <RandomMissionLoadingSpinner
              showContent={showContent}
              setShowContent={setShowContent}
              randomMission={randomMission}
            />
          ) : (
            <Image
              src={MISSION_CHARACTER}
              alt="랜덤 뽑기 캐릭터 이미지"
              width={127}
              height={150}
              className="object-contain"
            />
          )}
        </div>

        {showContent && (
          <div className="flex w-full justify-center">
            <CustomButton onClick={handleRandomMission} type="button" className="w-[344px] md:w-[230px]">
              {randomMission ? '다시 뽑기' : '뽑기'}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomMissionModal;
