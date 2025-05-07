'use client';

import { Eye } from 'lucide-react';
import { useViewCount } from '@/lib/hooks/use-view-count';

interface GonggamDetailViewCountProps {
  postId: string;
  initCount: number;
}

const GonggamDetailViewCount = ({ postId, initCount }: GonggamDetailViewCountProps) => {
  const viewCount = useViewCount(postId, initCount);
  return (
    <div className="flex items-center gap-[3px] text-[16px] font-normal leading-[1.4] text-secondary-grey-800">
      <Eye size={14} />
      {viewCount}
    </div>
  );
};

export default GonggamDetailViewCount;
