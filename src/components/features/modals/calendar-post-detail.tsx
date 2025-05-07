import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EditDeleteDropdown from '@/components/common/edit-delete-dropdown';
import { ImageSwiper } from '@/components/ui/card-detail-image-swiper';
import { PATH } from '@/constants/page-path';
import { useDeleteLifePost } from '@/lib/hooks/mutations/use-delete-life-post';
import { toastAlert } from '@/lib/utils/toast';
import type { LifePostWithImageUrls } from '@/types/life-post';
import divider from '@images/images/post-detail-divider.svg';
import diaryIcon from '@images/images/post-diary.svg';
import missionIcon from '@images/images/post-mission.svg';

/**
  step 1. 모달을 호출할 파일에 이 코드를 추가해주세요
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<LifePostWithImageUrls | null>(null);

  const handleClickCard = (id: string) => {
    const post = posts.find((post) => post.id === +id);
    if (!post) {
      return;
    }
    setSelectedPost(post);
    setShowModal(true);
  };

  step 2. map안에 카드 컴포넌트를 호출하는 부분에 이 코드를 추가해주세요
  onClick={() => handleClickCard(data.id)}

  step 3. map 바깥에 이 코드를 추가해주세요
  {showModal && (
    <PostDetailModal clickModal={() => setShowModal(false)} showModal={showModal} post={selectedPost} />
  )}
 */

const SET_TIME_OUT_CLOSE = 300;
const SET_TIME_OUT_SHOW_MODAL = 10;

export const PostDetailModal = ({
  clickModal,
  showModal,
  post
}: {
  clickModal: (value: boolean) => void;
  showModal: boolean;
  post: LifePostWithImageUrls | null;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const deleteLifePost = useDeleteLifePost();
  const router = useRouter();

  const createdDate = post?.created_at.slice(0, 10);
  const date = createdDate?.split('-').join('.');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout; // ID 저장 변수
    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (showModal) {
      // 스크롤을 막기 전 브라우저의 스크롤 크기를 확인합니다.
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      timeoutId = setTimeout(() => setIsVisible(true), SET_TIME_OUT_SHOW_MODAL);
      document.body.style.overflow = 'hidden'; //모달이 클릭되면 배경에 스크롤 막음
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventScroll, { passive: false }); //모바일에서도 막음

      // paddingRight를 추가합니다. 단 현재 스크롤바가 없을 때는 그대로 유지합니다.(역 레이아웃 시프트 방지입니다.)
      document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '0';
    }
    return () => {
      clearTimeout(timeoutId); // 클린업 시 타이머 제거
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('touchmove', preventScroll);

      document.body.style.paddingRight = '0'; // 모든 값을 정상으로 되돌릴 때 패딩값도 0으로 넣어주면 됩니다!
    };
  }, [showModal]);

  if (!post) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      clickModal(false);
    }, SET_TIME_OUT_CLOSE);
  };

  // 미션id 유무로 미션인증 작성 페이지로 보낼지, 하루일기 작성 페이지로 보낼지 결정
  const handleEdit = () => {
    {
      router.push(`${PATH.LIFE_POST}/edit/${post.id}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLifePost.mutateAsync(post);
      handleClose();
      toastAlert('삭제되었습니다!', 'success');
    } catch {
      toastAlert('삭제에 실패했습니다.', 'destructive');
    }
  };

  return (
    /** 모달 배경, 배경 터치시 나가짐 */
    <div
      onClick={() => handleClose()}
      className={`fixed inset-0 z-[51] bg-black/50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/** 모달 */}
      <div
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
        className={`fixed right-0 top-0 h-screen w-full transform overflow-auto bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-[650px] ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="ml-[16px] h-full overflow-y-auto md:ml-[40px]">
          <ChevronsRight onClick={() => handleClose()} className="mb-[34px] mt-[42px] cursor-pointer" />
          {/** 사진 슬라이드 */}
          <ImageSwiper image_urls={post.image_urls} />
          <div className="mb-[2px] flex gap-[12px] text-center md:mb-[10px]">
            <p className="font-(family-name:Comfortaa) text-sm font-normal text-secondary-grey-900 md:text-md">
              {date}
            </p>
            <Image
              src={divider}
              alt="날짜와 미션인증/하루일기 사이의 영역을 나누는 막대"
              className="h-auto w-auto"
              width={100}
              height={10}
            />
            {post.mission_id ? (
              <Image src={missionIcon} alt="미션인증" width={100} height={10} className="h-auto w-auto" />
            ) : (
              <Image src={diaryIcon} alt="하루일기" width={100} height={10} className="h-auto w-auto" />
            )}
          </div>
          <div className="flex min-h-[28px] w-full justify-between md:mb-[8px] md:w-[542px]">
            <h1 className="text-lg">{post.title}</h1>
            {post.mission_id ? (
              <EditDeleteDropdown handleEdit={handleEdit} handleDelete={handleDelete} isMission={true} />
            ) : (
              <EditDeleteDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </div>
          <div className="flex gap-[8px] pb-[20px]">
            {post.tags?.map((tag, idx) => (
              <span
                key={`detail_${idx}`}
                className="h-auto w-auto gap-[10px] rounded-[8px] bg-secondary-grey-150 px-[8px] text-secondary-grey-900 md:py-[4px]"
              >
                # {tag}
              </span>
            ))}
          </div>
          <hr className="mr-[10px] w-[calc(100%-10px)] border-t border-secondary-grey-300 px-[10px] py-[10px] md:w-[542px]" />
          <p className="whitespace-pre-wrap text-md font-normal text-secondary-grey-900">{post.content}</p>
        </div>
      </div>
    </div>
  );
};
