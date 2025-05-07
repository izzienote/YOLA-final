import { clsx } from 'clsx';
import { cn } from '@/lib/utils/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <Skeleton className="h-[125px] w-[379px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

function SkeletonFlatten() {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-3">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
      <Skeleton className="ml-4 mr-[100px] h-[80px] w-[80px] rounded-xl" />
    </div>
  );
}

function GonggamSkeletonSection() {
  return (
    <section className="flex min-h-[800px] max-w-[1200px] flex-col divide-y divide-secondary-grey-200 px-[10px]">
      {[...Array(5)].map((_, index) => (
        <article key={index} className="flex items-start justify-between gap-[10px] py-[12px]">
          {/* 왼쪽 텍스트 영역 */}
          <div className="flex flex-1 flex-col items-start gap-1 self-stretch">
            {/* 작성자 영역 */}
            <div className="mt-[11px] flex h-[17px] items-center gap-[4px]">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-1 w-1 rounded-full" />
              <Skeleton className="h-4 w-12" />
            </div>

            {/* 텍스트 영역 */}
            <div className="mb-[13px] mt-[4px] flex flex-col items-start gap-1 self-stretch">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* 좋아요/댓글/조회수 영역 */}
            <Skeleton className="h-[10px] w-[120px] rounded-md bg-primary/10" />
          </div>

          {/* 오른쪽 이미지 영역 */}
          <div className="relative h-[110px] w-[110px] overflow-hidden rounded-[16px]">
            <Skeleton className="h-full w-full" />
          </div>
        </article>
      ))}
    </section>
  );
}

function GonggamSkeletonDetailContent() {
  return (
    <section className="my-[50px] w-full animate-pulse">
      {/* 게시글 헤더 */}
      <header className="mt-[64px]">
        <div className="mb-[12px] h-8 w-2/3 rounded-md bg-primary/10" />
        <div className="flex items-center justify-between border-b pb-[20px]">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-[6px]">
            <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full bg-primary/10" />
            <div className="h-4 w-16 rounded-md bg-primary/10" />
            <div className="h-1 w-1 rounded-full bg-primary/10" />
            <div className="h-4 w-20 rounded-md bg-primary/10" />
            <div className="h-1 w-1 rounded-full bg-primary/10" />
            <div className="h-4 w-10 rounded-md bg-primary/10" />
          </div>

          {/* 내 글 수정 드롭다운 자리 */}
          <div className="h-5 w-5 rounded-md bg-primary/10" />
        </div>
      </header>

      {/* 이미지 영역 */}
      <figure className="mb-[40px] mt-[46px] flex w-full gap-[8px] overflow-hidden">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="relative aspect-square w-full max-w-[379px] rounded-[12px] bg-primary/10" />
        ))}
      </figure>

      {/* 본문 영역 */}
      <section className="mb-[46px] mt-[40px] flex flex-col gap-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="h-4 w-full rounded-md bg-primary/10" />
        ))}
      </section>

      {/* 태그 영역 */}
      <ul className="flex flex-wrap gap-[8px] border-b pb-[38px]">
        {[...Array(4)].map((_, idx) => (
          <li key={idx} className="h-6 w-14 rounded-[4px] bg-primary/10" />
        ))}
      </ul>
    </section>
  );
}

function GonggamSkeletonMiniSection() {
  return (
    <article className="mt-[20px] px-[16px] md:mt-[72px]">
      <section className="mb-[12px] flex flex-row items-center justify-between md:mb-[35px]">
        {/* 데스크탑에서만 보이는 텍스트 */}
        <Skeleton className="hidden h-[44px] w-[40%] justify-start md:block" />
        {/* SelectBox 자리 */}
        <Skeleton className="ml-auto h-[44px] w-[120px]" />
      </section>
      {/* 공간 게시글 컴포넌트 위치 */}

      <section className="mb-[30px] grid gap-5 md:mb-[272px] md:grid-cols-1 lg:grid-cols-2">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start rounded-[8px] border border-secondary-grey-300 px-[20px] py-[20px]"
          >
            {/* 제목 */}
            <Skeleton className="mb-[8px] h-[14px] w-[70%]" />

            {/* 본문 */}
            <Skeleton className="mb-[26px] h-[12px] w-[80%]" />

            {/* 작성자 + 작성일 */}
            <Skeleton className="mb-[16px] h-[12px] w-[15%] md:mb-[12px]" />

            {/* 좋아요 + 댓글 (두 개로 분리) */}
            <div className="mb-[2px] flex items-center justify-start gap-3 md:mb-0">
              <Skeleton className="h-[16px] w-[30px]" />
              <Skeleton className="h-[16px] w-[30px]" />
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}

function SoloLifeCardSkeletonSection({ mode }: { mode: 'mypage' | 'calendar' }) {
  const cards = [...Array(4)].map((_, idx) => <SoloLifeCardSkeleton key={idx} mode={mode} />);

  // calendar 모드: 카드들만 렌더링
  if (mode === 'calendar') {
    return <section className="flex flex-wrap gap-4">{cards}</section>;
  }

  // mypage 모드: 제목 + 셀렉트박스 + 카드들 렌더링
  return (
    <article className="mt-[20px] px-[16px] md:mt-[72px]">
      <section className="mb-[12px] flex flex-row items-center justify-between md:mb-[35px]">
        {/* 데스크탑에서만 보이는 텍스트 */}
        <Skeleton className="hidden h-[44px] w-[200px] justify-start md:block" />
        {/* SelectBox 자리 */}
        <Skeleton className="ml-auto h-[44px] w-[120px]" />
      </section>

      <section className="flex flex-wrap gap-[18px]">{cards}</section>
    </article>
  );
}

function SoloLifeCardSkeleton({ mode }: { mode: 'mypage' | 'calendar' }) {
  return (
    <article
      className={clsx(
        'flex w-full cursor-pointer items-start gap-3 rounded-2xl bg-white outline outline-1 outline-offset-[-1px] outline-secondary-grey-300',
        mode === 'mypage' && 'p-3 sm:h-[322px] sm:w-[222px] sm:flex-col',
        mode === 'calendar' && 'p-4 sm:h-[337px] sm:w-[237px] sm:flex-col'
      )}
    >
      {/* 이미지 (좌측 or 상단) */}
      <figure>
        <Skeleton
          className={clsx(
            'relative h-[66px] w-[66px] overflow-hidden',
            mode === 'mypage' && 'sm:h-[198px] sm:w-[198px]',
            mode === 'calendar' && 'sm:h-[205px] sm:w-[205px]',
            // 기본 사이즈 (모바일)
            'rounded-xl'
          )}
        ></Skeleton>
      </figure>

      {/* 본문 영역 */}
      <section className="flex h-full flex-1 flex-col justify-between sm:items-start">
        {/* 미리보기 텍스트 */}
        <Skeleton className="h-[14px] w-[80%]" />

        {/* 태그 */}
        <div className="mt-1 flex flex-wrap gap-1">
          <Skeleton className="h-[24px] w-[40px]" />
          <Skeleton className="h-[24px] w-[60px]" />
        </div>

        {/* Footer */}
        <footer className="mt-1 flex items-center gap-[6px]">
          <Skeleton className="h-[16px] w-[60px]" />
          <div className="mt-[1.7px] h-0 w-[9px] rotate-90 outline outline-[0.5px] outline-secondary-grey-400" />
          <Skeleton className="h-[16px] w-[60px]" />
        </footer>
      </section>
    </article>
  );
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonFlatten,
  GonggamSkeletonSection,
  GonggamSkeletonDetailContent,
  GonggamSkeletonMiniSection,
  SoloLifeCardSkeletonSection,
  SoloLifeCardSkeleton
};
