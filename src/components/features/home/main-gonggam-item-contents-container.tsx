import type { Children } from '@/types/children';

const ContentsContainer = ({ children }: Children) => {
  return (
    <div className="flex w-full max-w-[341px] flex-col items-start justify-start gap-1 self-stretch">{children}</div>
  );
};

export default ContentsContainer;
