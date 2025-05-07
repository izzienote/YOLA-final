import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathnameContext } from '@/contexts/pathname-context';

interface MenuItem {
  label: string;
  href: string;
  isLine?: boolean;
  className?: string;
}

const HeaderDropdownMenuItem = ({ label, href, isLine = true, className }: MenuItem) => {
  const { pathname } = usePathnameContext();

  const isSelect: boolean = decodeURIComponent(pathname).includes(href);

  return (
    <>
      <Link
        aria-label={`${label} 페이지 이동 메뉴`}
        href={href}
        className={clsx(
          `flex h-[47px] items-center justify-center bg-white hover:text-primary-orange-600 ${className}`,
          isSelect ? 'text-primary-orange-600' : 'text-secondary-grey-900'
        )}
      >
        {label}
      </Link>
      {isLine && <div className="m-0 h-[1px] w-[60px] bg-secondary-grey-300" />}
    </>
  );
};

export default HeaderDropdownMenuItem;
