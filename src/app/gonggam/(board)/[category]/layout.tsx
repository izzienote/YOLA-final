import GonggamHeader from '@/components/features/gonggam/gonggam-header';
import { TabsNav } from '@/components/features/gonggam/gonggam-tabs-nav';
import type { Children } from '@/types/children';

const GonggamLayout = ({ children }: Children) => {
  return (
    <div className="w-full max-w-[1200px]">
      <GonggamHeader />
      <TabsNav />
      {children}
    </div>
  );
};

export default GonggamLayout;
