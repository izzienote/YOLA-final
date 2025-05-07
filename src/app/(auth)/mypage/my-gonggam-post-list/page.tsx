import MyGonggamPostClient from '@/components/features/mypage/my-gonggam-post-client';
import { FAIL } from '@/constants/messages';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyGonggamPostListPage = async () => {
  //유저 닉네임 조회
  const profile = await getUserProfile();
  if (!profile) throw new Error(FAIL.GET_PROFILE);
  const nickname = profile.nickname;
  return <MyGonggamPostClient nickname={nickname} />;
};

export default MyGonggamPostListPage;
