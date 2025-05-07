import Link from 'next/link';
import { PATH } from '@/constants/page-path';
import type { Children } from '@/types/children';

interface ContainerProps extends Children {
  postId: number;
  category: string;
}

const ItemContainer = ({ children, postId, category }: ContainerProps) => {
  return (
    <Link
      href={`${PATH.GONGGAM}/${category}/${postId}`}
      className="inline-flex flex-col justify-between self-stretch border-b border-secondary-grey-400 py-2 lg:flex-row lg:items-end lg:py-3"
    >
      {children}
    </Link>
  );
};

export default ItemContainer;
