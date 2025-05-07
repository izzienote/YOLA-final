'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ProfileAvatar from '@/components/features/mypage/profile-avatar';
import { Button } from '@/components/ui/button';
import { FormControl, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AUTH } from '@/constants/auth-form';
import type { EditFormData } from '@/types/auth-form';
import CAMERA from '@images/images/camera.svg';

const ProfileImageField = ({
  form,
  profileImage
}: {
  form: UseFormReturn<EditFormData>;
  profileImage: string | null;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null); // input 요소 참조
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL

  // 버튼 클릭 시 파일 선택 창 열기
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Form에 파일 설정
    form.setValue(AUTH.PROFILE_IMAGE_FILE, e.target.files);

    const url = URL.createObjectURL(selectedFile);

    setPreviewUrl(url);
  };

  return (
    <FormField
      control={form.control}
      name={AUTH.PROFILE_IMAGE}
      render={() => (
        <div className="relative flex w-44 flex-col items-end justify-start">
          <ProfileAvatar src={previewUrl ? previewUrl : profileImage} mode="desktop" />
          <FormControl>
            <Input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp,image/gif,image/jpg"
            />
          </FormControl>
          <Button
            type="button"
            onClick={triggerFileInput}
            className="absolute left-[140px] top-[140px] flex h-10 w-10 items-center justify-center rounded-full bg-secondary-grey-800 p-0"
          >
            <Image src={CAMERA} alt="프로필 이미지 업로드 버튼" width={20} height={20} draggable="false" />
          </Button>
        </div>
      )}
    />
  );
};

export default ProfileImageField;
