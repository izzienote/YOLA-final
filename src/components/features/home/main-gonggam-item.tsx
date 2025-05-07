import ItemContainer from '@/components/features/home/main-gonggam-item-container';
import ContentsContainer from '@/components/features/home/main-gonggam-item-contents-container';
import ReactionBox from '@/components/features/home/main-gonggam-item-reaction-box';
import type { GonggamPostWithReaction } from '@/types/gonggam';

interface ItemProps {
  post: GonggamPostWithReaction;
}

const GonggamItem = ({ post }: ItemProps) => {
  const { title, content, id, comments, likes, category } = post;

  return (
    <ItemContainer postId={id} category={category}>
      <ContentsContainer>
        <p className="w-full justify-start self-stretch text-base leading-snug">{title}</p>
        <p className="min-h-[17px] w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-none">
          {content}
        </p>
      </ContentsContainer>
      <ReactionBox likes={likes.length} comments={comments.length} />
    </ItemContainer>
  );
};

export default GonggamItem;
