import type { Children } from '@/types/children';

const RandomMissionContainer = ({ children }: Children) => {
  return (
    <div className="relative inline-flex w-full items-start justify-between pb-4 lg:max-w-[516px]">{children}</div>
  );
};

export default RandomMissionContainer;
