'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavLabel from '@/components/layout/header/header-nav-label';
import NavUnderBar from '@/components/layout/header/header-nav-under-bar';
import { usePathnameContext } from '@/contexts/pathname-context';

interface ItemProps {
  href: string;
  label: string;
}

const NavLinkItem = ({ href, label }: ItemProps) => {
  const { fullUrl, isMission } = usePathnameContext();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isSelect: boolean = fullUrl.includes(href);

  return (
    <li
      aria-label={`${label} 페이지 이동 메뉴`}
      className="flex h-[44px] w-[127px] flex-col items-center justify-center"
    >
      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <NavLabel label={label} isBold={isHovered || (isSelect && !isMission)} />
        <NavUnderBar isVisible={isHovered || (isSelect && !isMission)} />
      </Link>
    </li>
  );
};

export default NavLinkItem;
