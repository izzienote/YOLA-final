'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tabs } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';

export function TabsNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-[16px] border-b pb-2 pt-[8.5px]">
      {tabs.map((tab) => (
        <Link key={tab.slug} href={`${PATH.GONGGAM}/${tab.slug}`} className="px-[10px] pt-[10px]">
          <div
            className={clsx(
              '-mb-2 ml-[-6px] flex w-[calc(100%+25px)] justify-center border-b-2 pb-[10px]',
              pathname?.startsWith(`${PATH.GONGGAM}/${tab.slug}`) ? 'border-secondary-grey-900' : 'border-transparent'
            )}
          >
            <span
              className={clsx(
                'text-[16px] leading-[140%]',
                pathname?.startsWith(`${PATH.GONGGAM}/${tab.slug}`)
                  ? 'font-semibold text-secondary-grey-900'
                  : 'text-secondary-grey-500 hover:font-semibold hover:text-secondary-grey-900'
              )}
            >
              {tab.label}
            </span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
