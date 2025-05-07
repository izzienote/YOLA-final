import Image from 'next/image';

interface BannerImageProps {
  imageUrl: string;
  index: number;
  isMobile?: boolean;
}

const MainBannerImage = ({ imageUrl, index, isMobile = false }: BannerImageProps) => {
  return (
    <Image
      src={imageUrl}
      alt={`메인 배너 이미지 ${index}`}
      fill
      style={{ objectFit: 'cover' }}
      sizes={isMobile ? '100vw' : '1280px'} // 모바일: 뷰포트 너비, 데스크톱: 1280px
      priority={index === 0}
      loading={index > 0 ? 'lazy' : undefined}
    />
  );
};

export default MainBannerImage;
