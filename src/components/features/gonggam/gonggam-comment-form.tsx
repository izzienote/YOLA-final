'use client';
import Image from 'next/image';
import { useState } from 'react';
import { CustomButton } from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import { FAIL, SUCCESS } from '@/constants/messages';
import { useInsertGonggamComment } from '@/lib/hooks/mutations/use-insert-gonggam-comment';
import { toastAlert } from '@/lib/utils/toast';
import DEFAULT_AVATAR_URL from '@images/images/default-avatar.svg';

interface GonggamCommentFormProps {
  postId: number;
  isLogin: boolean;
  profileImage?: string;
}

const GonggamCommentForm = ({ postId, isLogin, profileImage = DEFAULT_AVATAR_URL }: GonggamCommentFormProps) => {
  const [newComment, setNewComment] = useState<string>('');
  const { mutate: uploadComment, isPending: isUploading } = useInsertGonggamComment(postId);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    uploadComment(newComment, {
      onSuccess: () => {
        toastAlert(SUCCESS.UPLOAD_COMMENT, 'success');
        setNewComment('');
      },
      onError: (err) => {
        toastAlert(FAIL.UPLOAD_COMMENT);
        throw Error(err.message);
      }
    });
  };

  return (
    <div className="border-t py-[24px]">
      <form className="flex items-center gap-[16px]" onSubmit={handleSubmit}>
        <div className="border-black/12 relative h-[40px] w-[40px] overflow-hidden rounded-full border">
          <Image src={profileImage} alt="profile" fill sizes="40px" className="object-cover" />
        </div>
        <Input
          type="text"
          placeholder={isLogin ? '댓글을 작성해보세요.' : '댓글을 작성하려면 로그인 해주세요.'}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!isLogin}
          className="font-base flex h-[46px] flex-1 items-center gap-[10px] rounded-[8px] bg-secondary-grey-150 px-[10px] py-[16px] leading-[140%]"
        />
        <CustomButton type="submit" size="comment-submit" disabled={isUploading || !isLogin}>
          등록하기
        </CustomButton>
      </form>
    </div>
  );
};

export default GonggamCommentForm;
