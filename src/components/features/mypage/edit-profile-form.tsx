'use client';

import { useState } from 'react';
import EmailField from '@/components/features/mypage/edit-profile-form-email-field';
import ProfileImageField from '@/components/features/mypage/edit-profile-form-image-field';
import NicknameField from '@/components/features/mypage/edit-profile-form-nickname-field';
import { CustomButton } from '@/components/ui/custom-button';
import { Form as FormProvider } from '@/components/ui/form';
import { FAIL, SUCCESS } from '@/constants/messages';
import { useUpdateProfileMutate } from '@/lib/hooks/mutations/use-profile-update-mutate';
import { useUserProfile } from '@/lib/hooks/queries/use-get-user-profile';
import { useProfileForm } from '@/lib/hooks/use-profile-form';
import { profileImageUploader } from '@/lib/utils/api/mypage/profile-image-upload.api';
import { toastAlert } from '@/lib/utils/toast';
import type { EditFormData, InitProfile } from '@/types/auth-form';

const EditProfileForm = ({ initProfile }: InitProfile) => {
  const [duplicateCheck, setDuplicateCheck] = useState<boolean>(false);

  const { editProfileForm, isValid, isSubmitting } = useProfileForm(initProfile.nickname);
  const { profile, isProfileError, profileFetchingError } = useUserProfile(initProfile);
  const updateProfile = useUpdateProfileMutate();

  const handleUpdateProfile = async (formData: EditFormData) => {
    try {
      const imageUrl = await profileImageUploader({ form: editProfileForm, profile: initProfile });
      const updatedData = {
        ...formData,
        profile_image: imageUrl || formData.profile_image // 이미지 업로드 없거나 실패시에는 기존 값 유지
      };
      updateProfile(updatedData);
      toastAlert(SUCCESS.UPDATE_PROFILE, 'success');
    } catch {
      toastAlert(FAIL.UPDATE_PROFILE, 'destructive');
    }
  };

  if (isProfileError) throw profileFetchingError;

  return (
    <FormProvider {...editProfileForm}>
      <form
        className="mx-auto mt-[87.5px] w-[375px] justify-items-end space-y-[61px] md:mx-0 md:mt-0 md:min-h-[236px] md:w-[941px] md:space-y-[38px] md:border-none"
        onSubmit={editProfileForm.handleSubmit(handleUpdateProfile)}
      >
        <div className="flex w-full flex-col items-center gap-[34px] rounded-xl bg-white px-4 md:h-[236px] md:flex-row md:items-start md:gap-10 md:p-8 md:outline md:outline-1 md:outline-offset-[-1px] md:outline-secondary-grey-400">
          <ProfileImageField form={editProfileForm} profileImage={profile.profile_image} />
          <div className="flex w-full flex-col items-start justify-center gap-4 self-stretch md:w-[500px]">
            <EmailField email={profile.email ? profile.email : '게스트 계정입니다.'} />
            <NicknameField
              form={editProfileForm}
              setDuplicateCheck={setDuplicateCheck}
              initNickname={profile.nickname}
            />
          </div>
        </div>
        <CustomButton
          type="submit"
          disabled={!isValid || !duplicateCheck || isSubmitting}
          variant="default"
          size="gonggam-write"
          className="mr-4 h-[42px] w-[343px] md:mr-0 md:h-[38px] md:w-[100px]"
        >
          {isSubmitting ? '저장 중...' : '저장하기'}
        </CustomButton>
      </form>
    </FormProvider>
  );
};

export default EditProfileForm;
