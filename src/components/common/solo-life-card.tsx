'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { SoloLifeCardType } from '@/types/life-post';

interface SoloLifeCardProps extends SoloLifeCardType {
  mode?: 'mypage' | 'calendar';
  onClick: () => void;
}

const SoloLifeCard = ({ thumbnail, content, date, isMission, tags, onClick, mode = 'calendar' }: SoloLifeCardProps) => {
  const [visibleCount, setVisibleCount] = useState(2); // 기본값: 데스크탑

  useEffect(() => {
    const updateVisibleCount = () => {
      const isMobile = window.innerWidth < 640;
      setVisibleCount(isMobile ? 3 : 2);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxLength = mode === 'mypage' ? 24 : 28;
  const previewContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
  const formattedDate = date.replaceAll('-', '.');

  return (
    <article
      onClick={onClick}
      className={clsx(
        'flex w-full cursor-pointer items-start justify-between gap-3 rounded-2xl bg-white outline outline-1 outline-offset-[-1px] outline-secondary-grey-300',
        mode === 'mypage' && 'p-3 sm:h-[322px] sm:w-[222px] sm:flex-col',
        mode === 'calendar' && 'p-4 sm:h-[337px] sm:w-[237px] sm:flex-col'
      )}
    >
      <figure className="flex-shrink-0">
        <div
          className={clsx(
            'relative h-[66px] w-[66px] overflow-hidden rounded-xl',
            mode === 'mypage' && 'sm:h-[198px] sm:w-[198px]',
            mode === 'calendar' && 'sm:h-[205px] sm:w-[205px]'
          )}
        >
          <Image src={thumbnail} alt="썸네일" fill sizes="205" className="object-cover" priority />
        </div>
      </figure>

      <section className="flex h-full flex-1 flex-col justify-between sm:items-start">
        <p className="line-clamp-1 text-sm font-medium text-secondary-grey-900 sm:line-clamp-none sm:whitespace-pre-line sm:break-words">
          {previewContent}
        </p>

        <div>
          {/* 태그 */}
          <ul className="mt-1 flex flex-wrap gap-1 text-xs text-secondary-grey-900">
            {tags.slice(0, visibleCount).map((tag, idx) => (
              <li
                key={idx}
                className="line-clamp-1 max-w-[80px] overflow-hidden rounded bg-secondary-grey-100 px-[6px] py-1 outline outline-1 outline-offset-[-1px] outline-black/10"
              >
                # {tag}
              </li>
            ))}
            {tags.length > visibleCount && (
              <li className="line-clamp-1 rounded px-2 py-1 outline outline-1 outline-offset-[-1px] outline-black/10">
                +{tags.length - visibleCount}
              </li>
            )}
          </ul>

          {/* Footer */}
          <footer className="mt-1 flex items-center gap-[6px] text-xs text-secondary-grey-800">
            <time>{formattedDate}</time>
            <div className="mt-[1.7px] h-0 w-[9px] rotate-90 outline outline-[0.5px] outline-secondary-grey-400" />
            <div
              className={clsx(
                'h-[8px] w-[8px] rounded-full',
                isMission ? 'bg-calendar-mission' : 'bg-secondary-grey-900'
              )}
            />
            <span>{isMission ? '미션인증' : '하루일기'}</span>
          </footer>
        </div>
      </section>
    </article>
  );
};

export default SoloLifeCard;
