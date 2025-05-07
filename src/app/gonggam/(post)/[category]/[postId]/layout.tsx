import type { Children } from '@/types/children';

const PostDetailLayout = ({ children }: Children) => {
  return (
    <div className="w-full">
      <div>{children}</div>
    </div>
  );
};

export default PostDetailLayout;
