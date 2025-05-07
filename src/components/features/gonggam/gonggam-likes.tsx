'use client';

import { clsx } from 'clsx';
import { Heart } from 'lucide-react';
import { FAIL } from '@/constants/messages';
import { useDislikePost, useLikePost } from '@/lib/hooks/mutations/use-gonggam-likes';
import { useLikeCount, useLikedStatus } from '@/lib/hooks/queries/use-gonggam-likes';
import { toastAlert } from '@/lib/utils/toast';

interface GonggamLikesProps {
  postId: number;
  userId?: string;
}

const GonggamLikes = ({ postId, userId }: GonggamLikesProps) => {
  const { data: likeCnt = 0 } = useLikeCount(postId);
  const { data: isLiked = false } = useLikedStatus(postId, userId);
  const { mutate: likeMutate, isPending: isLiking } = useLikePost();
  const { mutate: dislikeMutate, isPending: isDisliking } = useDislikePost();

  const isLikePending = isLiking || isDisliking;

  const handleLikeToggle = () => {
    if (!userId) {
      toastAlert(FAIL.NEED_LOGIN, 'destructive');
      return;
    }
    if (isLiked) {
      dislikeMutate({ postId, userId });
    } else {
      likeMutate({ postId });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2 text-base text-secondary-grey-800">
        <button
          onClick={handleLikeToggle}
          disabled={isLikePending}
          className="flex h-[38px] w-[54px] items-center gap-[10px] rounded-[8px] border border-secondary-grey-700 p-2 transition-colors hover:text-primary"
        >
          <Heart
            size={14}
            className={clsx('transition-colors', {
              'fill-red-500 text-red-500': isLiked,
              'text-secondary-grey-800': !isLiked
            })}
          />
          <span>{likeCnt}</span>
        </button>
      </div>
    </div>
  );
};

export default GonggamLikes;
