import { clsx } from 'clsx';

const NavUnderBar = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={clsx(
        'absolute top-[25px] h-[2px] w-full self-stretch rounded-[1px] bg-primary-orange-500',
        isVisible ? 'visible' : 'invisible'
      )}
    />
  );
};

export default NavUnderBar;
