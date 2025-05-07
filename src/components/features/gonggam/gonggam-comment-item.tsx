'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { FAIL, SUCCESS } from '@/constants/messages';
import { QUERY_KEY } from '@/constants/query-keys';
import { useUpdateGonggamComment } from '@/lib/hooks/mutations/use-update-gonggam-comment';
import { formatRelativeDate } from '@/lib/utils/date-format';
import { toastAlert } from '@/lib/utils/toast';
import type { CommentWithUser } from '@/types/gonggam';
import DEFAULT_AVATAR_URL from '@images/images/default-avatar.svg';

interface GonggamCommentItemProps {
  comment: CommentWithUser;
  postId: number;
  userId?: string;
  onClickDelete: (commentId: number) => void;
}

const GonggamCommentItem = ({ comment, postId, userId, onClickDelete }: GonggamCommentItemProps) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.comment);
  const { mutate: updateComment } = useUpdateGonggamComment();

  const handleUpdate = () => {
    updateComment(
      { commentId: comment.id, content: editedContent },
      {
        onSuccess: () => {
          toastAlert(SUCCESS.UPDATE_COMMENT, 'success');
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.GONGGAM_COMMENTS, postId]
          });
          setIsEditing(false);
        },
        onError: () => {
          toastAlert(FAIL.UPDATE_COMMENT, 'destructive');
        }
      }
    );
  };

  return (
    <div className="relative flex items-start gap-[16px] py-[12px] text-sm">
      {/* 프로필 이미지 */}
      <div className="border-black/12 relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full border">
        <Image
          src={comment.writer.profile_image || DEFAULT_AVATAR_URL}
          alt={comment.writer.nickname ?? '알 수 없음'}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>

      {/* 본문 */}
      <div className="flex w-full flex-col gap-[4px]">
        <div className="flex items-center gap-[8px]">
          <p className="text-[16px] font-semibold leading-[1.4]">{comment.writer.nickname ?? '알 수 없음'}</p>
          <span className="text-[16px] font-normal text-secondary-grey-700">
            {formatRelativeDate(comment.created_at)}
          </span>
        </div>

        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="flex flex-col gap-[8px]"
          >
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="h-[48px] w-full rounded-md border border-secondary-grey-400 px-3 text-[16px]"
            />
            <div className="absolute right-0 top-0 flex gap-1 text-sm text-secondary-grey-700">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(comment.comment);
                }}
                className="hover:underline"
              >
                취소
              </button>
              <span>|</span>
              <button type="submit" className="hover:underline">
                저장
              </button>
            </div>
          </form>
        ) : (
          <p className="text-[16px] font-normal leading-[1.4]">{comment.comment}</p>
        )}
      </div>

      {/* 수정/삭제 버튼 */}
      {comment.writer.id === userId && !isEditing && (
        <div className="absolute right-0 top-0 flex gap-1 text-sm text-secondary-grey-700">
          <button type="button" onClick={() => setIsEditing(true)} className="hover:underline">
            수정
          </button>
          <span>|</span>
          <button type="button" onClick={() => onClickDelete(comment.id)} className="hover:underline">
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default GonggamCommentItem;
