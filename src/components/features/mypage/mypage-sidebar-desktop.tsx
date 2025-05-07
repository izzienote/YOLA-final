import ProfileBoxDesktop from '@/components/features/mypage/mypage-sidebar-profile-desktop';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MypageSideBarDesktop = async () => {
  const initProfile = await getUserProfile();
  if (!initProfile) throw Error;

  return (
    <aside className="ml-[40px] mr-[50px] mt-[40px] flex h-[843px] w-[209px] flex-col items-center gap-5 rounded-[20px] border border-secondary-grey-400 px-[18px] py-[20px]">
      {/* 내 프로필 보기 */}
      <ProfileBoxDesktop initProfile={initProfile} />
    </aside>
  );
};

export default MypageSideBarDesktop;
