import MypageSideBarDesktop from '@/components/features/mypage/mypage-sidebar-desktop';
import MypageSidebarMobile from '@/components/features/mypage/mypage-sidebar-mobile';
import type { Children } from '@/types/children';

const Layout = ({ children }: Children) => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      {/* 데스크탑 전용 사이드바 (md 이상) */}
      <div className="hidden md:block">
        <MypageSideBarDesktop />
      </div>

      {/* 모바일 전용 사이드바 (md 미만) */}
      <div className="block w-full md:hidden">
        <MypageSidebarMobile />
      </div>

      {/* 메인 컨텐츠 */}
      <section className="flex-1">{children}</section>
    </div>
  );
};

export default Layout;
