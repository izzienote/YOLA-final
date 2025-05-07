import EditProfileForm from '@/components/features/mypage/edit-profile-form';
import BackButton from '@/components/features/mypage/edit-profile-mobile-back-button';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

const MyPage = async () => {
  const profile = await getUserProfile();
  if (!profile) throw Error;

  return (
    <div className="absolute inset-0 z-20 min-h-screen w-full bg-white md:static md:z-0 md:min-h-0">
      <BackButton />
      <h1 className="mx-auto mt-[17.5px] h-[25px] w-[255px] self-stretch text-center text-lg font-semibold leading-7 text-secondary-grey-900 md:mb-[24px] md:mt-[72px] md:h-[28px] md:w-full md:text-left md:text-xl">
        프로필 수정
      </h1>
      <EditProfileForm initProfile={profile} />
    </div>
  );
};

export default MyPage;
