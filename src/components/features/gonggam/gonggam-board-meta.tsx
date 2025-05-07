'use client';

import { Eye, Heart, MessageSquare } from 'lucide-react';

interface GonggamBoardMetaProps {
  likeCnt: number;
  commentCnt: number;
  viewCount: number;
}

const GonggamBoardMeta = ({ likeCnt, commentCnt, viewCount }: GonggamBoardMetaProps) => {
  return (
    <footer className="mb-[11px] flex gap-[12px] self-stretch">
      <div className="flex items-center gap-[3px] overflow-hidden truncate text-[12px] font-normal leading-normal text-secondary-grey-900">
        <Heart size={12} /> {likeCnt}
      </div>
      <div className="flex items-center gap-[3px] overflow-hidden truncate text-[12px] font-normal leading-normal text-secondary-grey-900">
        <MessageSquare size={12} /> {commentCnt}
      </div>
      <div className="flex items-center gap-[3px] overflow-hidden truncate text-[12px] font-normal leading-normal text-secondary-grey-900">
        <Eye size={12} /> {viewCount}
      </div>
    </footer>
  );
};

export default GonggamBoardMeta;
