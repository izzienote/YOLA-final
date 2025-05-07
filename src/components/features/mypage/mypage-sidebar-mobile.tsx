import MobileProfileBox from '@/components/features/mypage/mypage-sidebar-profile-mobile';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MypageSidebarMobile = async () => {
  const initProfile = await getUserProfile();
  if (!initProfile) throw Error;
  return <MobileProfileBox initProfile={initProfile} />;
};
export default MypageSidebarMobile;
