import type { Children } from '@/types/children';

const GonggamPreviewContainer = ({ children }: Children) => {
  return (
    <div className="mt-[83px] flex w-full flex-col items-center justify-start gap-1 lg:mt-0 lg:w-[578px] lg:gap-4">
      {children}
    </div>
  );
};

export default GonggamPreviewContainer;
