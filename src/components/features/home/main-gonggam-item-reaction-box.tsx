import { Heart, MessageSquare } from 'lucide-react';

interface Props {
  likes: number;
  comments: number;
}

const ReactionBox = ({ likes, comments }: Props) => {
  return (
    <div className="flex items-center justify-start gap-4 pt-[6px] lg:pt-0">
      <div className="flex gap-1">
        <Heart size={15} />
        <span className="justify-start text-xs">{likes}</span>
      </div>
      <div className="flex gap-1">
        <MessageSquare size={15} />
        <span className="justify-start text-xs">{comments}</span>
      </div>
    </div>
  );
};

export default ReactionBox;
