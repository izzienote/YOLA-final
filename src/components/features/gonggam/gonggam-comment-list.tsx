'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import GonggamCommentItem from '@/components/features/gonggam/gonggam-comment-item';
import ConfirmModal from '@/components/features/modals/confirm-modal';
import { SUCCESS, FAIL } from '@/constants/messages';
import { QUERY_KEY } from '@/constants/query-keys';
import { useDeleteGonggamComment } from '@/lib/hooks/mutations/use-delete-gonggam-comment';
import { useGonggamComments } from '@/lib/hooks/queries/use-gonggam-comments';
import { toastAlert } from '@/lib/utils/toast';

interface GonggamCommentListProps {
  postId: number;
  userId?: string;
}

const GonggamCommentList = ({ postId, userId }: GonggamCommentListProps) => {
  const { comments, isCommentsPending, commentsErr } = useGonggamComments(postId);
  const { mutate: deleteComment } = useDeleteGonggamComment();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<number | null>(null);

  const handleDelete = (commentId: number) => {
    setCommentIdToDelete(commentId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (commentIdToDelete === null) return;

    deleteComment(commentIdToDelete, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GONGGAM_COMMENTS, postId]
        });
        toastAlert(SUCCESS.DELETE_COMMENT, 'success');
        setShowModal(false);
        setCommentIdToDelete(null);
      },
      onError: () => {
        toastAlert(FAIL.DELETE_COMMENT, 'destructive');
      }
    });
  };

  if (commentsErr) throw new Error(commentsErr.message);
  if (isCommentsPending) return null;

  return (
    <div className="mb-[44px] mt-[24px]">
      <h2 className="mb-[14px] text-base font-medium">댓글 {comments.length}개</h2>

      {comments.map((comment) => (
        <GonggamCommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          userId={userId}
          onClickDelete={handleDelete}
        />
      ))}

      {showModal && (
        <ConfirmModal
          clickModal={() => {
            setShowModal(false);
            setCommentIdToDelete(null);
          }}
          handleDelete={confirmDelete}
          isItPost={false}
        />
      )}
    </div>
  );
};

export default GonggamCommentList;
