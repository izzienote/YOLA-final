import Image from 'next/image';
import MypageProgressBar from '@/components/features/mypage/mypage-progressbar';
import RandomMissionBox from '@/components/features/mypage/mypage-radom-mission-box';
import { FAIL } from '@/constants/messages';
import { getUserProfile, getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import { getMissionsData } from '@/lib/utils/api/missions.api';
import { getUserMission } from '@/lib/utils/api/mypage/my-mission.api';
import { calculateUserLevel } from '@/lib/utils/calculate-user-level';
import { getLevelsByTypes } from '@/lib/utils/get-level-by-types';
import { parseUserMissions } from '@/lib/utils/parse-user-mission';
import CLEAN_ICON from '@images/images/clean-icon.svg';
import GOAT_ICON from '@images/images/goat-icon.svg';
import MEAL_ICON from '@images/images/meal-icon.svg';
import PLAY_ICON from '@images/images/play-icon.svg';
import TRAVEL_ICON from '@images/images/travel-icon.svg';

const AchievementPage = async () => {
  //유저 닉네임 및 로그인 조회
  const profile = await getUserProfile();
  if (!profile) throw new Error(FAIL.GET_PROFILE);
  const { isLogin } = await getUserSessionState();

  // 미션리스트 가져오기
  const missionsData = await getMissionsData();

  //유저 전체 레벨 계산 로직 -> progressBar 에 Props 전달
  const rawMissionsFromSupabase = await getUserMission();
  const totalCount = [...rawMissionsFromSupabase].length;
  const { level, remainingMissions } = calculateUserLevel(totalCount);

  //미션별 레벨 계산할 미션리스트 데이터로 가공 후, 계산 로직 인자값으로 전달
  const missionList = parseUserMissions(rawMissionsFromSupabase);
  const missionLevels = await getLevelsByTypes({ missionList });

  //가져온 계산값을 객체로 만들면서 description 및 icon 정보 추가
  const categories = missionLevels.map(({ type, currentLevel, nextLevelLeft }) => ({
    type: type,
    level: currentLevel as number | string,
    description: currentLevel === 'CLEAR' ? '모든 항목 완료!' : `다음 레벨까지 ${nextLevelLeft}개`,
    icon: CATEGORY_ICONS[type as keyof typeof CATEGORY_ICONS]
  }));

  return (
    <article className="flex flex-col px-[16px] md:gap-[74px]">
      {/* 전체 레벨 5단계 */}
      <section className="mb-[41px] mt-[20px] flex flex-col gap-[20px] md:mb-0 md:mt-[72px]">
        <h2 className="justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          {profile.nickname}님의 혼자라이프 레벨
        </h2>
        <MypageProgressBar level={level} remainingMissions={remainingMissions} />
      </section>

      {/* 각각의 미션 카테고리 level 현황 */}
      <section className="mb-[30px] flex flex-col gap-[20px] md:mb-0">
        <h2 className="justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          {profile.nickname}님의 체크리스트 달성도
        </h2>
        <div className="relative flex flex-col rounded-[12px] border border-secondary-grey-400 py-0 md:flex-row md:py-[12px]">
          {categories.map(({ type, level, description, icon }, index) => (
            <div
              key={type}
              className="group relative flex flex-1 flex-col justify-between px-[20px] py-[20px] md:justify-center"
            >
              {/* 세로 구분선 (데스크탑 환경) */}
              {index !== 0 && (
                <div className="absolute left-0 top-1/2 hidden h-[62px] w-[1px] -translate-y-1/2 bg-secondary-grey-300 md:block" />
              )}

              {/* 가로 구분선 (모바일 환경) */}
              {index !== 0 && (
                <div className="absolute left-1/2 top-0 h-[1px] w-full -translate-x-1/2 bg-secondary-grey-300 md:hidden" />
              )}

              <div className="flex flex-row items-center justify-between md:flex-col md:justify-center">
                {/* 카테고리명 */}
                <div className="flex cursor-pointer flex-row items-center justify-center whitespace-nowrap text-base font-semibold">
                  <figure className="mr-[4px] flex h-[24px] w-[24px]">
                    <Image src={icon} alt={type} height={24} width={24} />
                  </figure>
                  {type}
                </div>
                {/* 레벨 표시 */}
                <strong
                  className={`mt-[15px] flex items-center justify-center text-lg font-semibold ${
                    level === 'CLEAR' ? 'text-mission-clear' : ''
                  }`}
                >
                  {level}
                </strong>
              </div>

              {/* 다음 레벨까지 남은 개수 안내 */}
              <div className="mt-[12px] flex justify-end text-xs font-normal leading-none text-secondary-grey-900 md:justify-center">
                {description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 렌덤 미션 뽑기 */}
      <section className="flex flex-col gap-[20px]">
        <RandomMissionBox isLogin={isLogin} missionsData={missionsData} />
      </section>
    </article>
  );
};

export default AchievementPage;

const CATEGORY_ICONS = {
  혼밥: MEAL_ICON,
  혼자여행: TRAVEL_ICON,
  갓생: GOAT_ICON,
  혼놀: PLAY_ICON,
  청소: CLEAN_ICON
} as const;
