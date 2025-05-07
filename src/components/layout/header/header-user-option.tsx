'use client';

import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { User } from 'lucide-react';
import HeaderDropdownMenuItem from '@/components/layout/header/header-dropdown-menu-item';
import { FAIL } from '@/constants/messages';
import { PATH } from '@/constants/page-path';
import { usePathnameContext } from '@/contexts/pathname-context';
import { logout } from '@/lib/utils/api/auth/auth-action';
import { toastAlert } from '@/lib/utils/toast';

const UserOptionMenu = () => {
  const queryClient = useQueryClient();
  const { pathname } = usePathnameContext();

  const isSelect: boolean = pathname.includes(PATH.MYPAGE);

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.clear();
    } catch {
      toastAlert(FAIL.LOGOUT, 'default');
      return;
    }
  };
  return (
    <div className="group relative flex size-11 items-center justify-center">
      <button
        aria-label="회원 전용 드롭 다운 메뉴"
        className={clsx(
          'flex size-[36px] items-center justify-center rounded-full group-hover:bg-primary-orange-400 group-hover:text-white',
          isSelect ? 'bg-primary-orange-400 text-white' : 'bg-none text-secondary-grey-900'
        )}
      >
        <User size={24} />
      </button>
      <div className="invisible absolute right-0 top-11 flex w-[100px] transform flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-0 opacity-0 shadow-[0px_0px_3px_0px_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-secondary-grey-300 transition-all duration-150 ease-in-out group-hover:visible group-hover:opacity-100">
        <HeaderDropdownMenuItem label="마이페이지" href={PATH.MYPAGE} className="hidden md:flex" />
        <HeaderDropdownMenuItem label="마이페이지" href={PATH.MY_ACHIEVEMENT} className="flex md:hidden" />
        <button
          aria-label="로그아웃 버튼"
          className="h-[47px] bg-white text-secondary-grey-900 hover:text-primary-orange-600"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserOptionMenu;
