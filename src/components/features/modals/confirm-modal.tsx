import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { CustomButton } from '@/components/ui/custom-button';

/**
 * Step 1. 모달을 호출할 파일에 이 코드를 추가해주세요
 * const [showModal, setShowModal] = useState(false);
 *
 * Step 2. 삭제(뒤로가기)버튼이 있는 부분에 이 코드를 넣어주세요
 *  onClick={() => setShowModal(!showModal)}
 *
 * Step 3(삭제) 버튼이 있는 코드 바깥에(맵을 돌리고 있다면 맵 바깥에) 이 코드를 추가해주세요
 * 삭제 대상이 댓글이라면 isItPost={false}를 넣어주세요
 * {showModal && ConfirmModal clickModal={() => setShowModal(false)} handleDelete={handleDelete} isItPost={true} />}
 *
 * Step 3(뒤로가기) return 문 가장 하위에 이 코드를 추가해주세요
 * {showModal && <ConfirmModal clickModal={() => setShowModal(false)} handleDelete={handleDelete} isItPost={true} isItBack={true} />}
 */
const ConfirmModal = ({
  clickModal,
  handleDelete,
  isItPost,
  isItBack = false
}: {
  clickModal: () => void;
  handleDelete: () => void;
  isItPost: boolean;
  isItBack?: boolean;
}) => {
  const modal = (
    <div
      onClick={clickModal}
      className="fixed inset-0 z-[60] flex min-h-screen items-center justify-center bg-gray-500/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[343px] rounded-2xl bg-white px-[32px] py-[32px] shadow-2xl md:h-[268px] md:w-[508px] md:px-[140px] md:py-[44px] md:pt-[60px]"
      >
        <X
          onClick={clickModal}
          className="absolute right-6 top-6 hidden cursor-pointer text-secondary-grey-900 md:block"
        />

        <div className="mb-[40px] flex flex-col items-center text-center leading-relaxed text-secondary-grey-900 md:mb-[63px]">
          {isItBack ? (
            <>
              <strong className="text-xl font-semibold">글 작성을 취소합니다.</strong>
              <p className="mt-2 h-[22px] w-[280px] text-md font-normal">작성 중인 내용은 저장되지 않습니다.</p>
            </>
          ) : (
            <>
              <strong className="text-xl font-semibold">{isItPost ? `글` : `댓글`}을 삭제합니다.</strong>
              <p className="mt-2 h-[22px] text-md font-normal">정말 삭제하시겠습니까?</p>
            </>
          )}
        </div>

        {/* 모바일: 취소 + 삭제 버튼 */}
        <div className="flex justify-center gap-4 md:hidden">
          <CustomButton variant={'outline'} onClick={clickModal} type="button" className="w-[135px]">
            {isItBack ? '뒤로가기' : '취소하기'}
          </CustomButton>
          <CustomButton onClick={handleDelete} type="button" className="w-[135px]">
            {isItBack ? '작성 취소' : '삭제하기'}
          </CustomButton>
        </div>

        {/* 데스크탑: 삭제 버튼만 */}
        <div className="hidden justify-center md:flex">
          <CustomButton onClick={handleDelete} type="button" className="w-[230px]">
            {isItBack ? '작성 취소' : '삭제하기'}
          </CustomButton>
        </div>
      </div>
    </div>
  );

  // 부모 모달에 영향 받지 않고 최상위에 띄워줌
  return createPortal(modal, document.body);
};

export default ConfirmModal;
