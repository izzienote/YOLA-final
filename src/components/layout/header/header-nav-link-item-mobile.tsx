'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import NavLabel from '@/components/layout/header/header-nav-label';
import { SheetClose } from '@/components/ui/sheet';
import { usePathnameContext } from '@/contexts/pathname-context';

interface ItemProps {
  href: string;
  label: string;
  isDropDown?: boolean;
}

const NavMobileLinkItem = ({ href, label, isDropDown = false }: ItemProps) => {
  const { pathname } = usePathnameContext();

  const isSelect: boolean = decodeURIComponent(pathname).includes(href);

  return (
    <li className="w-full justify-start leading-snug hover:bg-primary-orange-200" aria-label={`${label} 페이지로 이동`}>
      <SheetClose asChild>
        <Link
          href={href}
          className={clsx('block py-4', isDropDown ? 'px-[30px]' : 'px-5', isSelect && 'bg-primary-orange-200')}
        >
          <NavLabel label={label} isMobile />
        </Link>
      </SheetClose>
    </li>
  );
};

export default NavMobileLinkItem;
