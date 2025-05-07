import { API, NEXT_SERVER_BASE_URL } from '@/constants/api-path';
import { FAIL } from '@/constants/messages';
import type { TableUsers } from '@/types/supabase-const';

/**
 * user-session-state 라우트 핸들러에서 값을 fetching 해오는 api 함수입니다.
 * 현재 세션 정보에 따라 사용자의 아이디와 로그인 상태를 반환합니다.
 * @returns { string | null, boolean } userId, isLogin
 */
export const fetchUserSessionState = async (): Promise<{
  userId: string | null;
  isLogin: boolean;
}> => {
  try {
    const res = await fetch(`${NEXT_SERVER_BASE_URL}/api/auth/user-session-state`, {
      method: 'GET',
      credentials: 'include'
    });

    const { data }: { data: { userId: string | null; isLogin: boolean } } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * check-duplicate 라우트 핸들러에서 값을 fetching 해오는 api 함수입니다.
 * 중복 체크 시도 할 항목(FormData의 field name)과 검색하고자 하는 데이터 값을 넣으면 결과를 반환합니다.
 * 검색한 데이터의 유무에 따라 참 또는 거짓으로 값을 반환합니다.
 * @param { string } field - 중복 체크 할 항목(field 이름)
 * @param { string } value  - 중복 체크 할 값(바꾸고자 하는 데이터)
 * @returns { boolean } - 해당 하는 값이 이미 users 테이블에 있으면 true, 없으면 false
 */
export const fetchDuplicateCheck = async (field: string, value: string): Promise<boolean> => {
  try {
    const res = await fetch(
      `${NEXT_SERVER_BASE_URL}${API.DUPLICATE}?field=${field}&value=${encodeURIComponent(value)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || FAIL.DUPLICATE);
    }

    const { data }: { data: { nickname: string } | { email: string } | null } = await res.json();

    return !!data;
  } catch (error) {
    throw error;
  }
};

/**
 * profile 라우트 핸들러에서 값을 fetching 해오는 api 함수입니다.
 * 현재 로그인 되어 있는 사용자의 프로필 정보를 반홥합니다.
 * @returns { TableUsers } - 현재 로그인 되어있는 사용자의 프로필 정보
 */
export const fetchUserProfile = async (): Promise<TableUsers> => {
  try {
    const res = await fetch(`${NEXT_SERVER_BASE_URL}${API.PROFILE}`, {
      method: 'GET'
    });

    const { data }: { data: TableUsers } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
