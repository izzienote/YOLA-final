import type { Children } from '@/types/children';

const ListContainer = ({ children }: Children) => {
  return <div className="inline-flex flex-col items-start justify-start gap-1 self-stretch md:gap-2.5">{children}</div>;
};

export default ListContainer;
