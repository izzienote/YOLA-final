'use client';

import { clsx } from 'clsx';
import { CirclePlusIcon, X } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { toastAlert } from '@/lib/utils/toast';

interface ImageUploaderProps {
  images: File[];
  onChange: (files: File[]) => void;
  defaultImageUrls?: string[];
  onRemoveDefaultImage?: (index: number) => void;
  maxCount?: number;
}

const ImageUploader = ({
  images,
  onChange,
  defaultImageUrls = [],
  onRemoveDefaultImage,
  maxCount = 3
}: ImageUploaderProps) => {
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const total = images.length + defaultImageUrls.length + newFiles.length;

    if (total > maxCount) {
      toastAlert(`이미지는 최대 ${maxCount}장까지 등록할 수 있습니다.`, 'warning');
      return;
    }

    onChange([...images, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const isMax = images.length + defaultImageUrls.length >= maxCount;

  return (
    <div className="flex flex-col items-center rounded-md bg-secondary-grey-100 px-[16px] py-[20px] md:flex-row md:gap-40 md:px-6">
      <div className="mb-[10px] flex w-full flex-row items-center justify-between md:w-[180px] md:flex-col md:items-start md:justify-center">
        <p className="mt-[2px] text-base font-semibold text-secondary-grey-800 md:text-xl">이미지등록</p>
        <p className="ml-auto mt-[1px] text-xs text-secondary-grey-700 md:ml-0 md:mt-0 md:w-[180px]">
          최대 {maxCount}개까지 등록됩니다.
        </p>
      </div>

      <div className="flex w-full items-center justify-start gap-[6px] md:gap-[8px]">
        {/* 업로드 버튼 */}
        <label
          className={clsx(
            'flex h-[69px] w-[77px] flex-col items-center justify-center rounded-md border border-dashed px-[16px] py-[10px] text-sm md:h-[85px] md:w-[94px]',
            isMax
              ? 'cursor-not-allowed border-secondary-grey-500 bg-secondary-grey-150 text-secondary-grey-500'
              : 'cursor-pointer border-secondary-grey-500 bg-white text-secondary-grey-800 hover:bg-secondary-grey-150'
          )}
        >
          <span className="text-4xl">
            <CirclePlusIcon />
          </span>
          <span className="text-xs">추가하기</span>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            className="hidden"
            disabled={isMax}
            onChange={handleUpload}
          />
        </label>

        {/* 기본 이미지 목록 */}
        {defaultImageUrls.map((url, idx) => (
          <div
            key={`default-${idx}`}
            className="relative h-[69px] w-[69px] overflow-hidden rounded-md border md:h-[85px] md:w-[85px]"
          >
            <Image src={url} alt={`uploaded-${idx}`} width={96} height={96} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveDefaultImage?.(idx)}
              className="absolute right-1 top-1 flex h-[12px] w-[12px] items-center justify-center rounded-full border-[1px] border-secondary-grey-400 bg-white text-secondary-grey-700 md:border-[2px]"
            >
              <X className="h-[12px] w-[12px] text-secondary-grey-700 md:h-[15px] md:w-[15px]" />
            </button>
          </div>
        ))}

        {/* 새로 선택된 이미지 목록 */}
        {images.map((img, idx) => (
          <div
            key={`new-${idx}`}
            className="relative h-[69px] w-[69px] overflow-hidden rounded-md border md:h-[85px] md:w-[85px]"
          >
            <Image
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute right-1 top-1 flex h-[12px] w-[12px] items-center justify-center rounded-full border-[1px] border-secondary-grey-400 bg-white text-secondary-grey-700 md:border-[2px]"
            >
              <X className="h-[12px] w-[12px] text-secondary-grey-700 md:h-[15px] md:w-[15px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
