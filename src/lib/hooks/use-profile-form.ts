import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { editProfileSchema } from '@/lib/utils/validation/auth-schema';
import type { EditFormData } from '@/types/auth-form';

export const useProfileForm = (initNickname: string) => {
  const editProfileForm = useForm<EditFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      nickname: initNickname,
      profile_image_file: null,
      profile_image: ''
    },
    mode: 'onBlur'
  });

  const { isValid, isSubmitting } = editProfileForm.formState;

  return { editProfileForm, isValid, isSubmitting };
};
