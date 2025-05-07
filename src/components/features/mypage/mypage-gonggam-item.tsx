import ContentsContainer from '@/components/features/home/main-gonggam-item-contents-container';
import ReactionBox from '@/components/features/home/main-gonggam-item-reaction-box';
import MypageItemContainer from '@/components/features/mypage/mypage-gonggam-item-container';
import { formatRelativeDate } from '@/lib/utils/date-format';
import type { GonggamPostWithCounts } from '@/types/gonggam';

interface ItemProps {
  post: GonggamPostWithCounts;
}

const MypageGonggamItem = ({ post }: ItemProps) => {
  return (
    <MypageItemContainer postId={post.id} category={post.category}>
      <ContentsContainer>
        <h2 className="justify-start self-stretch text-sm font-normal leading-tight text-secondary-grey-900">
          {post.title}
        </h2>
        <p className="w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap text-xs text-secondary-grey-900">
          {post.content}
        </p>
      </ContentsContainer>
      <time className="mb-[10px] mt-[20px] flex text-xs text-secondary-grey-600" dateTime={post.created_at}>
        <div className="text-secondary-grey-900">{post.users.nickname}</div> · {formatRelativeDate(post.created_at)}
      </time>
      <ReactionBox likes={post.like_count ?? 0} comments={post.comment_count ?? 0} />
    </MypageItemContainer>
  );
};

export default MypageGonggamItem;
