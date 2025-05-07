import { clsx } from 'clsx';

const NavLabel = ({ isBold, label, isMobile = false }: { isBold?: boolean; label: string; isMobile?: boolean }) => {
  return (
    <p
      style={{ userSelect: 'none' }}
      className={clsx(
        'flex justify-between text-center text-secondary-grey-900',
        isBold && 'font-semibold',
        isMobile ? 'h-[22px] text-base' : 'h-[25px] text-lg'
      )}
    >
      {label}
    </p>
  );
};

export default NavLabel;
