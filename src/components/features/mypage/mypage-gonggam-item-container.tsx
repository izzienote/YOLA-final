import Link from 'next/link';
import { PATH } from '@/constants/page-path';
import type { Children } from '@/types/children';

interface ContainerProps extends Children {
  postId: number;
  category: string;
}

const MypageItemContainer = ({ children, postId, category }: ContainerProps) => {
  return (
    <Link
      href={`${PATH.GONGGAM}/${category}/${postId}`}
      className="flex flex-col items-start rounded-[8px] border border-secondary-grey-300 px-[20px] py-[20px]"
    >
      {children}
    </Link>
  );
};

export default MypageItemContainer;
