import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // 현재 pathname을 커스텀 헤더에 추가
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
