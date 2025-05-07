import type { EnumCategories } from '@/types/supabase-const';

type CategoryMapType = Record<EnumCategories, string>;
type SlugToCategoryType = Record<string, EnumCategories>;

/** categoryMap: 단일 source of truth
 * Supabase 'categorys' Enum (한글 카테고리명) → URL에서 사용하는 slug 값 매핑
 * 예: '일상공유' → 'daily'
 */
export const categoryMap: CategoryMapType = {
  일상공유: 'daily',
  꿀팁공유: 'tip',
  여기추천: 'place',
  밋업: 'meetup'
};

/** categoryMap의 reaverse 버전
 * 예: 'daily' -> '일상공유'
 */
export const reverseCategoryMap = Object.fromEntries(Object.entries(categoryMap).map(([key, value]) => [value, key]));

/** slugToCategory: 클라이언트 URL param을 기반으로 Supabase에서 사용할 수 있는 Enum 값을 추출할 때 사용
 * URL slug → Supabase 'categorys' Enum (한글 카테고리명) 변환
 * 예: 'daily' → '일상공유'
 */
export const slugToCategory = Object.fromEntries(
  Object.entries(categoryMap).map(([k, v]) => [v, k])
) as SlugToCategoryType;

/**  tabs: TabsNav 컴포넌트 등에서 반복 렌더링에 사용
 * 공감 게시판 카테고리 탭 네비게이션 구성용 데이터 배열
 * 예: { label: '밋업', slug: 'meetup' }
 */
export const tabs = Object.entries(categoryMap).map(([label, slug]) => ({
  label: label as EnumCategories,
  slug
}));
