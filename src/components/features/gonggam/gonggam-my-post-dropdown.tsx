'use client';

import { MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmModal from '@/components/features/modals/confirm-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { categoryMap } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';
import { useDeleteGonggamPost } from '@/lib/hooks/mutations/use-delete-gonggam-post';
import type { GonggamPostDetailWithoutCounts } from '@/types/gonggam';

interface GonggamMyPostDropdownProps {
  post: GonggamPostDetailWithoutCounts;
}

const GonggamMyPostDropdown = ({ post }: GonggamMyPostDropdownProps) => {
  const [showModal, setShowModal] = useState(false);
  const route = useRouter();

  const handleEdit = () => {
    route.push(`${PATH.GONGGAM_POST}/edit/${post.id}`);
  };

  const deleteMutation = useDeleteGonggamPost({
    onSuccessCallback: () => {
      const slug = categoryMap[post.category];
      if (!slug) {
        console.error('삭제 후 이동 실패: category → slug 변환 실패', post.category);
        return;
      }
      route.push(`${PATH.GONGGAM}/${slug}`);
    }
  });

  const handleDelete = () => {
    deleteMutation.mutate(post);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-sm p-1 hover:bg-muted">
            <MoreVertical size={14} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={handleEdit}>수정</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowModal(!showModal)}>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showModal && <ConfirmModal clickModal={() => setShowModal(false)} handleDelete={handleDelete} isItPost={true} />}
    </>
  );
};

export default GonggamMyPostDropdown;
