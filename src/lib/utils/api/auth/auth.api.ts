import { FAIL } from '@/constants/messages';
import { TABLE } from '@/constants/supabase-tables-name';
import { createClient } from '@/lib/utils/supabase/supabase-server';
import type { TableUsers } from '@/types/supabase-const';

/**
 * 서버 환경에서만 동작합니다. 클라이언트에서 호출시 에러 발생합니다.
 * supabase의 auth.getUser를 통해 현재 로그인 된 사용자의 user_id(auth.uid)와 로그인 상태를 불러옵니다.
 * 세션이 존재하지 않는 경우 userId는 null을 반환하고, isLogin은 false를 반환합니다.
 * @returns { string | null, boolean } userId, isLogin
 */
export const getUserSessionState = async (): Promise<{
  userId: string | null;
  isLogin: boolean;
}> => {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const userId = user?.id ?? null;

  const isLogin = !!userId;

  return { userId, isLogin };
};

/**
 * 서버 환경에서만 동작합니다. 클라이언트에서 호출시 에러 발생합니다.
 * public.users 테이블에서 현재 로그인 된 사용자의 프로필 정보를 불러옵니다.
 * 로그인 세션 정보가 존재하지 않으면 null 값을 반환합니다.
 * @returns { TableUsers } - 현재 세션에 해당하는 users 테이블 row
 */
export const getUserProfile = async (): Promise<TableUsers | null> => {
  const supabase = await createClient();
  try {
    const { userId } = await getUserSessionState();
    if (userId === null) return null;

    const { data, error } = await supabase.from(TABLE.USERS).select('*').eq('id', userId).single();

    if (error) throw new Error(FAIL.GET_PROFILE);

    return data;
  } catch (error) {
    throw error;
  }
};
