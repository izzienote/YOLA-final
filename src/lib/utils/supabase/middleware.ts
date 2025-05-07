import { NextResponse, type NextRequest } from 'next/server';
import { API } from '@/constants/api-path';
import { PATH } from '@/constants/page-path';
import { createClient } from '@/lib/utils/supabase/supabase-server';

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request
  });

  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const requestPath = request.nextUrl.pathname;
  const requestClone = request.nextUrl.clone();

  const privatePaths = [PATH.LIFE, PATH.MYPAGE, PATH.MY_ACHIEVEMENT, PATH.MY_LIFE_LIST, API.PROFILE];
  const isPostUrl = requestPath.includes('post');
  const isPrivatePath = privatePaths.some((path) => {
    return requestPath.startsWith(path); // 나머지는 startsWith
  });

  // 로그인하지 않은 사용자가 비공개 경로 또는 post 경로에 접근하려는 경우
  if (!user && (isPrivatePath || isPostUrl)) {
    requestClone.pathname = PATH.LOGIN;
    return NextResponse.redirect(requestClone);
  }

  // 로그인한 사용자가 login 또는 signup 페이지에 접근하려는 경우
  if (user && (requestPath === PATH.LOGIN || requestPath === PATH.SIGNUP)) {
    requestClone.pathname = PATH.HOME;
    return NextResponse.redirect(requestClone);
  }

  return supabaseResponse;
}
