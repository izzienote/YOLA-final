'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { API, NEXT_SERVER_BASE_URL } from '@/constants/api-path';
import { FAIL } from '@/constants/messages';
import { PATH } from '@/constants/page-path';
import { TABLE } from '@/constants/supabase-tables-name';
import { getUserSessionState } from '@/lib/utils/api/auth/auth.api';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { LoginFormData, SignupFormData } from '@/lib/utils/validation/auth-schema';
import type { EditFormData } from '@/types/auth-form';

const LAYOUT = 'layout';

export const login = async (formData: LoginFormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.email,
    password: formData.password
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.message === 'Invalid login credentials') throw new Error(FAIL.LOGIN);
    return;
  }

  revalidatePath(PATH.HOME, LAYOUT);
  redirect(PATH.HOME);
};

export const guestLogin = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw new Error(FAIL.LOGIN); // 호출 측에서 에러 처리 가능
  }

  revalidatePath(PATH.HOME, LAYOUT);
  redirect(PATH.HOME);
};

export const signup = async (formData: SignupFormData) => {
  const supabase = await createClient();
  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        nickname: formData.nickname
      }
    }
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) throw error;

  revalidatePath(PATH.HOME, LAYOUT);
  redirect(PATH.HOME);
};

export const signInWithSocial = async (provider: 'google' | 'kakao') => {
  const supabase = await createClient();

  const scopes = provider === 'kakao' ? 'profile_nickname profile_image account_email' : undefined;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      scopes: scopes,
      redirectTo: `${NEXT_SERVER_BASE_URL}${API.SOCIAL_LOGIN_CALL_BACK}`
    }
  });

  if (error) throw new Error(error.message);

  redirect(data.url);
};

export const logout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
    redirect(PATH.ERROR);
  }
  revalidatePath(PATH.HOME, LAYOUT);
  redirect(PATH.HOME);
};

/**
 * 사용자가 프로필 정보를 업데이트 하는 api 함수입니다.
 * 현재 로그인 된 사용자 아이디를 받아와서 아이디에 해당하는 row를 파라미터로 받은 정보로 변경합니다.
 * @param { { string, string } } - 변경할 닉네임과 프로필 이미지기 업로드 된 주소
 * @returns { TableUser } - 현재 세션에 해당하는 users 테이블 row
 */
export const updateUserProfile = async (formData: EditFormData): Promise<void> => {
  const supabase = await createClient();
  const { userId } = await getUserSessionState();

  if (userId === null) throw new Error(FAIL.SESSION);

  const { error } = await supabase
    .from(TABLE.USERS)
    .update({ nickname: formData.nickname, profile_image: formData.profile_image })
    .eq('id', userId);

  if (error) throw new Error(error.message);
};
