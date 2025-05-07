import Image from 'next/image';
import CHARACTER from '@images/images/cat-in-question-box-original.svg';

const ImageSection = () => {
  return (
    <div className="h-[142px] w-[125px] p-[18px] lg:h-[249px] lg:w-[218px] lg:p-[40px]">
      <Image draggable="false" priority src={CHARACTER} alt="랜덤미션 뽑기 이미지" width={139} height={164} />
    </div>
  );
};

export default ImageSection;
