// src/app/(life)/life/page.tsx
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import LifePageClient from '@/components/features/life/life-page-client';
import { QUERY_KEY } from '@/constants/query-keys';
import { getServerLifePostsByMonth } from '@/lib/utils/api/life/life-server-api';
import { getToday, getPrevMonth, getNextMonth } from '@/lib/utils/get-date';

const LifePage = async () => {
  const today = getToday().slice(0, 7);
  const months = [getPrevMonth(today), today, getNextMonth(today)];
  const queryClient = new QueryClient();

  await Promise.all(
    months.map((month) =>
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.LIFE_POSTS, month],
        queryFn: () => getServerLifePostsByMonth(month),
        staleTime: Infinity
      })
    )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LifePageClient />
    </HydrationBoundary>
  );
};

export default LifePage;
