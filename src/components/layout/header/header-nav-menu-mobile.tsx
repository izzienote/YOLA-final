import { DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';
import NavMobileChallengeMenu from '@/components/layout/header/header-nav-challenge-menu-mobile';
import NavMobileLinkItem from '@/components/layout/header/header-nav-link-item-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PATH } from '@/constants/page-path';
import MENU from '@images/images/header-mobile-menu-icon.svg';

const HeaderMobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <div className="flex h-11 w-11 items-center justify-center">
          <Image src={MENU} alt="헤더 메뉴 리스트 표시 아이콘" width={24} height={24} />
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-primary-orange-50 text-secondary-grey-900"
        aria-label="모바일 헤더 메뉴: 혼자라이프 기록, 공감 게시판, 5개의 챌린지 아코디언 메뉴를 포함"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">모바일 헤더 메뉴</DialogTitle>
        <nav>
          <ul>
            <NavMobileLinkItem href={PATH.LIFE} label="혼자라이프 기록" />
            <NavMobileLinkItem href={PATH.GONGGAM} label="공감 게시판" />
            <NavMobileChallengeMenu />
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobileMenu;
