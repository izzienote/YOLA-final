import { useState, useEffect } from 'react';
import { TABLE } from '@/constants/supabase-tables-name';
import { fetchViewCount, incrementViewCount } from '@/lib/utils/api/gonggam/gonggam-view-count.api';
import { supabase } from '@/lib/utils/supabase/supabase-client';

/**
 * 공감 게시글의 조회수를 실시간으로 반영하여 반환하는 훅입니다. 게시글 내부의 클라이언트 컴포넌트에서 선언하여 사용할 수 있습니다.
 * 파라미터의 initCount 값은 부모 서버 컴포넌트에서 getViewCount() 함수를 사용하여 초기 조회수 값을 받은 뒤 설정해주면 됩니다.
 *
 * @example
 * // 자식 클라이언트 컴포넌트
 * 'use client';
 *
 * const Test = ({ postId, initCount }: { postId: string; initCount: number }) => {
 *  const viewCount = useViewCount(postId, initCount);
 *  return <div>조회수: {viewCount}</div>;
 * };
 *
 * // 부모 서버 컴포넌트
 * const page = async ({ params: { category, postId } }: GonggamPostDetailProps) => {
 *  const viewCount = await getViewCount(postId);
 *
 *  return (
 *     <div>
 *      {postId}번 글 콘텐츠입니다.
 *       <Test postId={postId} initCount={viewCount} />
 *     </div>
 *   );
 *  };
 *
 * @param { string } id - 선택한 게시글의 post id입니다.
 * @param  { number } initCount - 서버에서 받아온 해당 post의 view_count 컬럼 데이터입니다. 마운트 시 초기데이터가 0이나 null 등으로 표기되는 것을 방지하기 위해 설정합니다.
 * @returns { number } viewCount - 선택한 게시글의 조회수를 실시간으로 반영하여 반환합니다.
 */
export const useViewCount = (id: string, initCount: number): number => {
  const [viewCount, setViewCount] = useState(initCount);

  useEffect(() => {
    // 초기 조회수 가져오기
    const viewCount = async () => {
      await incrementViewCount(id);
      const count = await fetchViewCount(id);
      setViewCount(count);
    };

    viewCount();

    // Realtime 구독
    const subscription = supabase
      .channel(TABLE.GONGGAM_POSTS)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: TABLE.GONGGAM_POSTS,
          filter: `id=eq.${id}`
        },
        (payload) => {
          setViewCount(payload.new.view_count);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [id]);

  return viewCount;
};
