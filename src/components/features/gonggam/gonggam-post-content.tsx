'use client';

import { Dot } from 'lucide-react';
import Image from 'next/image';
import GonggamDetailViewCount from '@/components/features/gonggam/gonggam-detail-view-count';
import GonggamImageSwiper from '@/components/features/gonggam/gonggam-image-swiper';
import GonggamLikes from '@/components/features/gonggam/gonggam-likes';
import GonggamMyPostDropdown from '@/components/features/gonggam/gonggam-my-post-dropdown';
import { GonggamSkeletonDetailContent } from '@/components/ui/skeleton';
import { useGetGonggamPostDetail } from '@/lib/hooks/queries/use-get-gonggam-post-detail';
import { getKoreanDateTime } from '@/lib/utils/utc-to-kst';
import type { TableUsers } from '@/types/supabase-const';
import DEFAULT_AVATAR_URL from '@images/images/default-avatar.svg';

interface GonggamPostContentProps {
  postId: number;
  viewCount: number;
  userData?: TableUsers | null;
}

const GonggamPostContent = ({ postId, viewCount, userData }: GonggamPostContentProps) => {
  const { data: post, isPending, error } = useGetGonggamPostDetail(postId);

  if (isPending) return <GonggamSkeletonDetailContent />;
  if (error) throw new Error(error.message);

  const { title, content, created_at, updated_at, writer: users, images, tags, user_id } = post;
  const displayDate = updated_at ?? created_at;

  return (
    <section>
      {/* 게시글 헤더 */}
      <header className="mt-[64px]">
        <h1 className="mb-[12px] justify-start self-stretch text-xl font-semibold leading-7 text-secondary-grey-900">
          {title}
        </h1>
        <figure className="flex items-center justify-between border-b pb-[20px] text-base text-secondary-grey-800">
          <div className="flex items-center">
            <div className="relative mr-[6px] h-[22px] w-[22px] overflow-hidden rounded-full">
              <Image
                src={users.profile_image ?? DEFAULT_AVATAR_URL}
                alt={`${users.nickname}의 프로필 이미지`}
                fill
                sizes="22px"
                className="object-cover"
              />
            </div>
            <span className="ml-[6px]">{users.nickname}</span>
            <Dot size={12} />
            <time dateTime={displayDate}>{getKoreanDateTime(displayDate)}</time>
            <Dot size={12} />
            <GonggamDetailViewCount postId={String(postId)} initCount={viewCount} />
          </div>
          {userData?.id === user_id && <GonggamMyPostDropdown post={post} />}
        </figure>
      </header>

      {/* 이미지 영역 */}
      {images.length > 0 && (
        <figure className="mb-[40px] mt-[46px] w-full">
          <GonggamImageSwiper images={images} />
        </figure>
      )}

      {/* 본문 영역 */}
      <section className="prose prose-sm sm:prose lg:prose-lg mb-[46px] mt-[40px] max-w-none justify-start text-[16px] text-secondary-grey-800">
        <p className="whitespace-pre-wrap">{content}</p>
      </section>

      {/* 좋아요 영역 */}
      <GonggamLikes postId={postId} userId={userData?.id} />

      {/* 태그 영역 */}
      <ul className="mt-[46px] flex flex-wrap gap-[8px] border-b pb-[38px] text-[12px]">
        {(tags ?? []).map((tag) => (
          <li
            key={tag}
            className="border-black/12 rounded-[4px] border bg-secondary-grey-150 px-2 py-1 text-[12px] text-secondary-grey-900"
          >
            # {tag}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GonggamPostContent;
