'use client';

import { Dot } from 'lucide-react';
import Image from 'next/image';
import GonggamBoardMeta from '@/components/features/gonggam/gonggam-board-meta';
import { formatRelativeDate } from '@/lib/utils/date-format';
import type { GonggamPostDetailResponse } from '@/types/gonggam';
import DEFAULT_POST_IMAGE from '@images/images/default-image.svg';

interface GonggamPostCardProps {
  post: GonggamPostDetailResponse;
}

const GonggamPostCard = ({ post }: GonggamPostCardProps) => {
  /** view 에서 데이터가 없는 경우 예외 처리 */
  if (
    post.id == null ||
    post.created_at == null ||
    post.title == null ||
    post.content == null ||
    post.like_count == null ||
    post.comment_count == null ||
    post.view_count == null
  )
    throw new Error('Error occurred in GonggamPostCard');

  const displayImage = post.imageUrl ? post.imageUrl : DEFAULT_POST_IMAGE;

  return (
    <article className="flex max-w-[1200px] items-start justify-between gap-[10px] border-b border-secondary-grey-200 px-[10px] py-[12px]">
      <section className="flex flex-col items-start gap-1 self-stretch">
        {/* 작성자 영역 */}
        <div className="mt-[11px] flex h-[17px] items-center gap-[4px] text-[12px] font-normal leading-[140%] text-secondary-grey-800">
          <p>{post.writer.nickname}</p>
          <Dot size={12} className="translate-y-[-2px]" />
          <time dateTime={post.created_at}>{formatRelativeDate(post.created_at)}</time>
        </div>

        {/* 텍스트 영역 */}
        <div className="mb-[13px] mt-[4px] flex flex-col items-start gap-1 self-stretch">
          <h1 className="line-clamp-1 flex-1 text-[14px] font-normal leading-[140%] text-secondary-grey-900">
            {post.title}
          </h1>
          <p className="line-clamp-1 text-[12px] font-normal leading-[140%] text-secondary-grey-900">
            {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
          </p>
        </div>

        {/* 좋아요/댓글/조회수 */}
        <GonggamBoardMeta likeCnt={post.like_count} commentCnt={post.comment_count} viewCount={post.view_count} />
      </section>

      {/* 이미지 */}
      <figure className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-[16px]">
        <Image src={displayImage} alt={post.title} fill sizes="110px" className="object-cover" priority />
      </figure>
    </article>
  );
};

export default GonggamPostCard;
