import { NextRequest, NextResponse } from 'next/server';
import { getViewCount } from '@/lib/utils/api/gonggam/gonggam-board.api';
import { createClient } from '@/lib/utils/supabase/supabase-server';

/**
 * 클라이언트에서 게시글을 조회했을 때 view_count 컬럼 값을 1씩 올리기 위한 라우트 핸들러입니다.
 * @param params post id 값이 담긴 params 객체
 */
export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const supabase = await createClient();

  const { id } = params;

  // 조회수 증가
  await supabase.rpc('increment_view_count', { post_id: Number(id) });

  return NextResponse.json({ message: 'Success' }, { status: 200 });
};

/**
 * 클라이언트에서 view_count 컬럼 데이터를 받아오기 위한 라우트 핸들러입니다.
 * @param params post id 값이 담긴 params 객체
 * @returns 조회수(count)가 담긴 객체 형태의 응답이 반환됩니다.
 */
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  const data = await getViewCount(id);

  if (!data) return NextResponse.json({ message: '데이터 없음' }, { status: 500 });

  return NextResponse.json({ count: data || 0 }, { status: 200 });
};
