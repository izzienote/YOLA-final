import { NextResponse } from 'next/server';
import { FAIL } from '@/constants/messages';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';

/**
 * 클라이언트에서 getUserProfile() 함수를 이용해서 사용자 프로필 정보를 받아오기 위한 라우트 핸들러입니다.
 * @returns 현재 로그인 한 사용자의 users 테이블 row 데이터
 */
export const GET = async () => {
  try {
    const data = await getUserProfile();
    return NextResponse.json({ data });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message || FAIL.GET_PROFILE }, { status: 500 });
  }
};
