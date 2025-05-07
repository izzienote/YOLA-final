'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import GonggamPagination from '@/components/features/gonggam/gonggam-pagination';
import GonggamPostCard from '@/components/features/gonggam/gonggam-post-card';
import { GonggamSkeletonSection } from '@/components/ui/skeleton';
import { slugToCategory } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';
import { usePaginatedGonggamPosts } from '@/lib/hooks/queries/use-paginated-gonggam-posts';

interface GonggamCategoryBoardProps {
  params: { category: string };
}

const GonggamCategoryBoard = ({ params: { category } }: GonggamCategoryBoardProps) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const categoryEnum = slugToCategory[category];
  const { data, isPending, error } = usePaginatedGonggamPosts(categoryEnum, currentPage);

  if (isPending)
    return (
      <div className="mt-[20px] flex flex-col gap-8">
        <GonggamSkeletonSection />
      </div>
    );
  if (error) throw new Error(error.message);

  const { posts, pagination } = data;

  return (
    <div>
      <ul className="mb-[2px]">
        {posts.length === 0 ? (
          <li className="py-3 text-sm text-gray-500">게시글이 없습니다.</li>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`${PATH.GONGGAM}/${post.category}/${post.id}`}>
              <GonggamPostCard post={post} />
            </Link>
          ))
        )}
      </ul>
      <GonggamPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        baseHref={`${PATH.GONGGAM}/${category}`}
      />
    </div>
  );
};

export default GonggamCategoryBoard;
