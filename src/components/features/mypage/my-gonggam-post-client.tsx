'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import NoRecordsBox from '@/components/common/no-records-box';
import { SelectBox } from '@/components/features/mypage/my-gonggam-filter';
import MypageGonggamItem from '@/components/features/mypage/mypage-gonggam-item';
import { GonggamSkeletonMiniSection } from '@/components/ui/skeleton';
import useGetGonggamPostsInfiniteQuery from '@/lib/hooks/queries/use-get-gonggam-posts-infinite-query';
import type { SortBy } from '@/types/gonggam';

interface MyGonggamPostClientProps {
  nickname: string;
}

const MyGonggamPostClient = ({ nickname }: MyGonggamPostClientProps) => {
  const [sortBy, setSortBy] = useState<SortBy>('latest');

  const {
    data: posts,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetGonggamPostsInfiniteQuery(sortBy);

  const { ref } = useInView({
    threshold: 0.5,
    onChange(inView) {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  });

  if (isPending) return <GonggamSkeletonMiniSection />;
  if (error) throw error;

  const allPosts = posts.pages.flatMap((page) => page.data);

  return (
    <article className="mt-[20px] px-[16px] md:mt-[72px]">
      <section className="mb-[12px] flex flex-row items-center justify-between md:mb-[35px]">
        {/* 데스크탑에서만 보이는 텍스트 */}
        <h2 className="hidden justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900 md:block">
          {nickname}님이 작성한 공감 게시글
        </h2>
        {/* SelectBox는 항상 오른쪽 정렬 */}
        <div className="ml-auto">
          <SelectBox value={sortBy} onChange={(value) => setSortBy(value as typeof sortBy)} />
        </div>
      </section>

      <section className="mb-[30px] grid gap-5 md:mb-[272px] md:grid-cols-1 lg:grid-cols-2">
        {allPosts.length === 0 ? (
          <NoRecordsBox mode="공감" />
        ) : (
          <>
            {allPosts.map((item) => (
              <MypageGonggamItem key={item.id} post={item} />
            ))}

            <div className="col-span-full flex items-center justify-center text-sm text-secondary-grey-500">
              {hasNextPage ? (
                <div ref={ref}>{isFetchingNextPage && '불러오는 중...'}</div>
              ) : (
                '작성하신 공감 게시글을 전부 불러왔어요.'
              )}
            </div>
          </>
        )}
      </section>
    </article>
  );
};

export default MyGonggamPostClient;
