import GonggamCommentForm from '@/components/features/gonggam/gonggam-comment-form';
import GonggamCommentList from '@/components/features/gonggam/gonggam-comment-list';
import GonggamPostContent from '@/components/features/gonggam/gonggam-post-content';
import { getUserProfile } from '@/lib/utils/api/auth/auth.api';
import { getViewCount } from '@/lib/utils/api/gonggam/gonggam-board.api';

interface GonggamPostDetailProps {
  params: {
    postId: number;
  };
}

const GonggamPostDetail = async ({ params: { postId } }: GonggamPostDetailProps) => {
  const userData = await getUserProfile();
  const viewCount = await getViewCount(String(postId));

  return (
    <article className="px-[40px]">
      <GonggamPostContent postId={postId} viewCount={viewCount} userData={userData} />
      <GonggamCommentList postId={postId} userId={userData?.id} />
      <GonggamCommentForm
        postId={postId}
        isLogin={!!userData?.id}
        {...(userData?.profile_image && { profileImage: userData.profile_image })}
      />
    </article>
  );
};

export default GonggamPostDetail;
