import { API, NEXT_SERVER_BASE_URL } from '@/constants/api-path';
import { FAIL } from '@/constants/messages';

const BASE_URL: string = `${NEXT_SERVER_BASE_URL}${API.VIEW_COUNT}`;

/**
 * view-count 라우트 핸들러에 post 요청을 보내는 api 함수입니다.
 * 게시글 상세보기 클라이언트 컴포넌트에서 선언하면 게시물 조회시 조회수가 1씩 증가되어 테이블에 저장됩니다.
 * @param { string } postId - 조회한 게시글의 post_id
 */
export const incrementViewCount = async (postId: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, { method: 'POST' });
    if (!res.ok) {
      throw new Error(FAIL.INCREMENT_VIEW_COUNT);
    }
  } catch {
    throw new Error(FAIL.INCREMENT_VIEW_COUNT);
  }
};

/**
 * view-count 라우트 핸들러에 get 요청을 보내 값을 fetching 해오는 api 함수입니다.
 * 게시글 상세보기 클라이언트 컴포넌트에서 선언하면 조회한 게시글의 조회수를 받아옵니다.
 * @param { string } postId - 조회한 게시글의 post_id
 * @returns { number } - 조회한 게시글의 조회수
 */
export const fetchViewCount = async (postId: string): Promise<number> => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, { method: 'GET' });
    const { count }: { count: number } = await res.json();

    return count;
  } catch {
    throw new Error(FAIL.GET_VIEW_COUNT);
  }
};
