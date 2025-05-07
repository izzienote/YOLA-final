import Image from 'next/image';
import { useEffect, useState } from 'react';
import ConfirmModal from '@/components/features/modals/confirm-modal';
import useIsMobile from '@/lib/hooks/use-is-mobile';
import dropdown from '@images/images/post-dropdown.svg';

/**
 * 수정/삭제를 할 수 있는 드롭다운입니다
 * 삭제 시 '삭제하시겠습니까?' 모달까지 연결되어 있습니다
 * 수정 로직을 담은 함수와 삭제 로직을 담은 함수를 Props로 넣어주면 사용이 가능합니다
 */
interface EditDeleteDropDownProps {
  handleEdit: () => void;
  handleDelete: () => void;
  isMission?: boolean;
}
const EditDeleteDropdown = ({ handleEdit, handleDelete, isMission = false }: EditDeleteDropDownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (showModal) {
      setShowDropdown(false);
    }
  }, [showModal]);

  const handleClickToggle = () => {
    if (isMobile) setShowDropdown((prev) => !prev);
  };

  const handlePointerEnter = () => {
    if (showModal) return; // 화면 밖을 나갔다가 들어와도 드롭다운 생기지 않게 함
    if (!isMobile) setShowDropdown(true);
  };

  const handlePointerLeave = () => {
    if (showModal) return;
    if (!isMobile) setShowDropdown(false);
  };

  useEffect(() => {
    if (showModal) {
      setShowDropdown(false); // 모달 열릴 때 드롭다운 닫기
    }
  }, [showModal]);

  return (
    <div className="relative w-fit" onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave}>
      <button
        onClick={handleClickToggle}
        className="mr-[10px] flex w-[24px] cursor-pointer items-center justify-end md:mr-0 md:w-[88px]"
      >
        <Image src={dropdown} alt="수정/삭제 드롭다운 아이콘" />
      </button>

      {/* hover 유지용 투명 영역 (PC용) */}
      {!isMobile && <div className="h-[14px] w-[24px] cursor-pointer md:w-[88px]" />}

      {showDropdown && (
        <div className="absolute left-0 top-full z-20 flex w-[80px] translate-x-[-70%] flex-col items-center justify-center overflow-hidden rounded-xl bg-white p-0 shadow-[0_0_3px_0_rgba(0,0,0,0.12)] outline outline-1 outline-offset-[-1px] outline-secondary-grey-300 md:w-[88px] md:translate-x-0">
          <button
            onClick={handleEdit}
            className="flex w-full cursor-pointer justify-center px-[16px] py-[12px] text-center text-base"
          >
            수정
          </button>
          {!isMission && (
            <>
              <hr className="border-spacing-4 border-gray-300 px-[35px]" />
              <button
                onClick={() => setShowModal(true)}
                className="flex w-full cursor-pointer justify-center px-[16px] py-[12px] text-center text-base"
              >
                삭제
              </button>
            </>
          )}
        </div>
      )}

      {showModal && <ConfirmModal clickModal={() => setShowModal(false)} handleDelete={handleDelete} isItPost={true} />}
    </div>
  );
};

export default EditDeleteDropdown;
