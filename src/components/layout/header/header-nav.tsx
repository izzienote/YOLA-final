'use client';

import GuestOptionMenu from '@/components/layout/header/header-guest-option';
import MainLogo from '@/components/layout/header/header-main-logo';
import NavChallengeMenu from '@/components/layout/header/header-nav-challenge-menu';
import NavLinkItem from '@/components/layout/header/header-nav-link-item';
import HeaderMobileMenu from '@/components/layout/header/header-nav-menu-mobile';
import UserOptionMenu from '@/components/layout/header/header-user-option';
import { PATH } from '@/constants/page-path';
import { PathnameProvider } from '@/contexts/pathname-context';

const HeaderNav = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <nav className="relative flex w-full items-center justify-between">
      <PathnameProvider>
        <HeaderMobileMenu />
        <MainLogo />
        <ul className="left-[164px] hidden items-center justify-center gap-[4px] md:absolute md:flex">
          <NavLinkItem label="혼자라이프 달력" href={PATH.LIFE} />
          <NavLinkItem label="공감 게시판" href={PATH.GONGGAM} />
          <NavChallengeMenu />
        </ul>
        {isLogin ? <UserOptionMenu /> : <GuestOptionMenu />}
      </PathnameProvider>
    </nav>
  );
};

export default HeaderNav;
