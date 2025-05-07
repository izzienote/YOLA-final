'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { useEffect, useMemo, useState } from 'react';

import NoRecordsBox from '@/components/common/no-records-box';
import SoloLifeCard from '@/components/common/solo-life-card';
import { PostDetailModal } from '@/components/features/modals/calendar-post-detail';
import { SoloLifeCardSkeletonSection } from '@/components/ui/skeleton';
import { useLifePostsByMonth } from '@/lib/hooks/queries/use-life-posts-by-month';
import type { LifePostWithImageUrls } from '@/types/life-post';
interface SoloLifeListProps {
  selectedDate: string;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const SoloLifeList = ({ selectedDate, setIsEmpty }: SoloLifeListProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<LifePostWithImageUrls | null>(null);

  const selectedMonth = selectedDate.slice(0, 7);
  const { data: posts = [], isPending } = useLifePostsByMonth(selectedMonth);

  const parsedList = useMemo(() => {
    return posts
      .filter((p) => p.date.startsWith(selectedDate))
      .map((post) => {
        const imageUrls = post.image_urls ?? [];
        return {
          id: post.id.toString(),
          date: post.date,
          title: post.content.split('\n')[0] || '제목 없음',
          content: post.content,
          thumbnail: imageUrls[0] || '/images/default-image.svg',
          imageUrls,
          isMission: post.mission_id !== null,
          tags: post.tags ?? []
        };
      });
  }, [posts, selectedDate]);

  useEffect(() => {
    setIsEmpty(parsedList.length === 0);
  }, [parsedList, setIsEmpty]);

  const handleClickCard = (id: string) => {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      return;
    }
    setSelectedPost(post);
    setShowModal(true);
  };

  if (isPending) return <SoloLifeCardSkeletonSection mode="calendar" />;

  if (parsedList.length === 0) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDate} // 날짜 바뀔 때마다 새로 렌더링
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <NoRecordsBox mode="캘린더" />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedDate} // 날짜 바뀔 때마다 새로 렌더링
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-wrap items-start justify-start gap-4"
      >
        {parsedList.map((data) => (
          <SoloLifeCard onClick={() => handleClickCard(data.id)} key={data.id} {...data} mode="calendar" />
        ))}
        {showModal && (
          <PostDetailModal clickModal={() => setShowModal(false)} showModal={showModal} post={selectedPost} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SoloLifeList;
