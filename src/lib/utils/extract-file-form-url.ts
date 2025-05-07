import { supabase } from '@/lib/utils/supabase/supabase-client';

/**
 * 프로필 이미지로 등록되어있는 파일의 전체 URL에서 파일 경로만 추출하는 함수입니다. (예: 'user-id_profile_123456789.png')
 *
 * @param { string } url 현재 users table에 등록된 사용자의 프로필 이미지 전체 url
 * @returns { string | null } 추출한 파일 경로
 */
const extractFilePathFromUrl = (url: string): string | null => {
  // URL에서 파일 경로만 추출 (예: 'user-id_profile_123456789.png')
  const match = url.match(/profile-images\/(.+?)(?:\?.*)?$/);
  return match ? match[1] : null;
};

/**
 * 새로운 프로필 이미지를 업로드 후 등록하면, 기존에 등록되어 있던 이미지를 storage에서 삭제하는 함수입니다.
 * 현재 로그인 된 사용자의 profile_image에 등록된 url을 받아와서 extractFilePathFromUrl()를 통해 storage 내 파일 경로만 추출합니다.
 * 추출한 파일 경로로 profile_images storage에서 해당 파일을 삭제합니다. 등록된 이미지가 없을 경우 삭제 로직 실행 전 early return 합니다.
 *
 * @param { string } existingImageUrl 현재 users table에 등록된 사용자의 프로필 이미지 전체 url
 */
export const deleteExistingImage = async (existingImageUrl: string) => {
  const filePath = extractFilePathFromUrl(existingImageUrl);

  if (!filePath) return;

  const { error } = await supabase.storage.from('profile-images').remove([filePath]);
  if (error) alert('기존 이미지 삭제 실패!');
};
