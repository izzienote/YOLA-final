'use client';

import Image from 'next/image';
import React from 'react';
import NavLabel from '@/components/layout/header/header-nav-label';
import NavMobileLinkItem from '@/components/layout/header/header-nav-link-item-mobile';
import { PATH } from '@/constants/page-path';
import { usePathnameContext } from '@/contexts/pathname-context';
import MENU_ICON from '@images/images/challenge_menu.svg';

const NavMobileChallengeMenu = () => {
  const { fullUrl } = usePathnameContext();

  const isSelect: boolean = fullUrl.includes(PATH.CHECKLIST);

  const challengeMenuItem = [
    { href: PATH.MEAL_CHECKLIST, label: '혼밥' },
    { href: PATH.TRAVEL_CHECKLIST, label: '혼자여행' },
    { href: PATH.GOD_LIFE_CHECKLIST, label: '갓생' },
    { href: PATH.CLEAN_CHECKLIST, label: '청소' },
    { href: PATH.PLAY_CHECKLIST, label: '혼놀' }
  ];

  return (
    <li aria-label="챌린지 리스트 드롭 다운 메뉴" className="group">
      <details open={isSelect} className="group">
        <summary className="flex items-center gap-2 px-5 py-4">
          <NavLabel label="챌린지" isMobile />
          <Image
            draggable="false"
            className="group-open:rotate-180"
            src={MENU_ICON}
            alt="챌린지 메뉴 드롭 다운 표시 아이콘"
            width={14}
            height={26}
            style={{ width: 'auto', height: 'auto' }}
          />
        </summary>
        <ul className="flex flex-col">
          {challengeMenuItem.map((item, index) => (
            <NavMobileLinkItem isDropDown key={index} href={item.href} label={item.label} />
          ))}
        </ul>
      </details>
    </li>
  );
};

export default NavMobileChallengeMenu;
