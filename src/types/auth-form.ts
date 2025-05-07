import type { TableUsers } from '@/types/supabase-const';

export interface AuthFormButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
}

export interface EditFormData {
  nickname: string;
  profile_image_file: FileList | null;
  profile_image: string;
}

export interface InitProfile {
  initProfile: TableUsers;
}
