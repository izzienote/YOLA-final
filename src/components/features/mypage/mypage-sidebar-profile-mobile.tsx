'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfileAvatar from '@/components/features/mypage/profile-avatar';
import { CustomButton } from '@/components/ui/custom-button';
import { PATH } from '@/constants/page-path';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import type { InitProfile } from '@/types/auth-form';

const MobileProfileBox = ({ initProfile }: InitProfile) => {
  //현재 경로 가져오기
  const pathname = usePathname();
  const { profile, isProfileError, profileFetchingError } = useUserProfile(initProfile);

  if (isProfileError) throw profileFetchingError;

  return (
    <aside className="mt-[20px] flex flex-col items-center">
      {/* 프로필 영역 */}
      <section className="mt-[12px] flex w-full flex-row px-[16px]">
        <ProfileAvatar src={profile.profile_image} mode="mobile" />
        <div className="ml-[16px] flex-1 justify-start">
          <p className="text-xl font-semibold text-secondary-grey-900">{profile.nickname}</p>
          <p className="mb-[8px] text-base text-secondary-grey-700">
            {profile.email ? profile.email : '게스트 계정입니다.'}
          </p>
        </div>
        {/* 프로필 수정 버튼 */}
        <Link href={PATH.MYPAGE}>
          <CustomButton variant="grey" size="edit-profile" className="h-[36px] w-[41px] text-sm">
            수정
          </CustomButton>
        </Link>
      </section>

      {/* 마이페이지 탭 3개 */}
      <nav className="mt-[12px] flex w-full justify-around px-[16px]">
        {/* 혼자라이프 기록 */}
        <div className="flex flex-col items-center">
          <Link
            href={PATH.MY_LIFE_LIST}
            className={`pb-[8px] text-lg ${
              pathname === PATH.MY_LIFE_LIST ? 'text-secondary-900 font-normal' : 'text-secondary-grey-900'
            }`}
          >
            혼자라이프 기록
          </Link>
          {pathname === PATH.MY_LIFE_LIST && <div className="h-[3px] w-[112px] bg-black" />}
        </div>

        {/* 작성 공감글 */}
        <div className="flex flex-col items-center">
          <Link
            href={PATH.MY_GONGGAM_POST_LIST}
            className={`pb-[8px] text-lg ${
              pathname === PATH.MY_GONGGAM_POST_LIST ? 'text-secondary-900 font-normal' : 'text-secondary-grey-900'
            }`}
          >
            작성 공감글
          </Link>
          {pathname === PATH.MY_GONGGAM_POST_LIST && <div className="h-[3px] w-[112px] bg-black" />}
        </div>

        {/* 나의 현황 */}
        <div className="flex flex-col items-center">
          <Link
            href={PATH.MY_ACHIEVEMENT}
            className={`pb-[8px] text-lg ${
              pathname === PATH.MY_ACHIEVEMENT ? 'text-secondary-900 font-normal' : 'text-secondary-grey-900'
            }`}
          >
            나의 현황
          </Link>
          {pathname === PATH.MY_ACHIEVEMENT && <div className="h-[3px] w-[112px] bg-black" />}
        </div>
      </nav>
      {/* 구분선 */}
      <div className="h-[1px] w-full bg-secondary-grey-400" />
    </aside>
  );
};

export default MobileProfileBox;
