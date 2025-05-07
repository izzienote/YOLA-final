import { UseFormReturn } from 'react-hook-form';
import { FAIL } from '@/constants/messages';
import { deleteExistingImage } from '@/lib/utils/extract-file-form-url';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { toastAlert } from '@/lib/utils/toast';
import type { EditFormData } from '@/types/auth-form';
import type { TableUsers } from '@/types/supabase-const';

interface ImageUploaderParams {
  form: UseFormReturn<EditFormData>;
  profile: TableUsers | undefined;
}

/**
 * 사용자가 업로드 하고자 하는 프로필 사진을 supabase storage에 저장한 후 해당 url을 반환하는 함수입니다.
 * 사용자가 프로필 수정 폼에 새로운 데이터를 입력하면 해당 폼 데이터에서 이미지에 해당하는 파일을 가져온 후 로직을 실행합니다.
 * 새로운 파일 업로드가 없을 시에는 로직을 실행하지 않고 early return 합니다.
 * 파일 업로드가 있을 시에는 기존 프로필 사진으로 등록되어 있던 이미지를 deleteExistingImage 함수를 이용해서 삭제 후 업로드를 진행합니다.
 * 한글 이미지 업로드 오류를 방지와 매번 다른 파일명을 생성하기 위해 파일 확장자만 추출한 뒤, 사용자 아이디와 현재 시간을 조합하여 파일명을 생성합니다.
 * 업로드가 완료되면 storage 내 해당 이미지의 url 경로를 반환하고 실패시에는 undefined을 반환합니다.
 *
 * @param { form: UseFormReturn<EditFormData>; profile: TableUsers | undefined; } - 프로필 수정 폼에 입력된 새로운 데이터, 기존 프로필 데이터
 * @returns { Promise<string | undefined> } - 프로필 이미지를 등록했을 때는 storage의 해당 이미지 url / 사진 변경이 없거나 오류 발생시는 undefined 반환
 */
export const profileImageUploader = async ({ form, profile }: ImageUploaderParams): Promise<string | undefined> => {
  const file = form.getValues('profile_image_file')?.[0];
  if (!file) return; // 프로필 사진 업로드 없을 시 로직 실행 안 함

  const existingImageUrl = profile?.profile_image;

  if (existingImageUrl) {
    await deleteExistingImage(existingImageUrl);
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${profile?.id}_profile_${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage.from('profile-images').upload(fileName, file, {
    contentType: file.type
  });

  if (error) {
    toastAlert(FAIL.PROFILE_IMAGE_UPLOAD, 'destructive');
    return;
  }

  const imageUrl = supabase.storage.from('profile-images').getPublicUrl(fileName).data.publicUrl;

  return imageUrl;
};
