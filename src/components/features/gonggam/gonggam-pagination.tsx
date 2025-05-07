'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis
} from '@/components/ui/pagination';

interface GonggamPaginationProps {
  currentPage: number;
  totalPages: number;
  baseHref: string; // e.g. /gonggam/daily
}

const MAX_PAGE_LINKS = 5; // 화면에 표시할 페이지 버튼 수

const GonggamPagination = ({ currentPage, totalPages, baseHref }: GonggamPaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(page));
    router.push(`${baseHref}?${newParams.toString()}`);
  };

  const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, MAX_PAGE_LINKS);

  return (
    <Pagination className="py-[38px]">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            className="cursor-pointer text-secondary-grey-500 hover:text-secondary-grey-900"
            size="pagination"
          >
            &lt;
          </PaginationLink>
        </PaginationItem>

        {pagesToShow.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === currentPage} onClick={() => goToPage(page)} size="pagination">
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 생략 기호 */}
        {totalPages > 5 && <PaginationEllipsis />}

        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
            className="cursor-pointer text-secondary-grey-500 hover:text-secondary-grey-900"
            size="pagination"
          >
            &gt;
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default GonggamPagination;
