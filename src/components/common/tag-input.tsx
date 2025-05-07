'use client';

import { motion } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useIsMobile from '@/lib/hooks/use-is-mobile';

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  maxTags?: number;
}

const TagInput = ({ value = [], onChange, maxTags = 6 }: TagInputProps) => {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  const isMobile = useIsMobile();

  const triggerShake = () => {
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 300); // 애니메이션 끝난 뒤 해제
  };

  const MAX_TAG_LENGTH = 8;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTags(value);
  }, [value]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const addTag = (tag: string): boolean => {
    const cleaned = tag.trim().replace(/^#/, '');
    if (!cleaned || tags.includes(cleaned) || tags.length >= maxTags || cleaned.length > MAX_TAG_LENGTH) {
      triggerShake();
      return false;
    }

    const newTags = [...tags, cleaned];
    setTags(newTags);
    onChange?.(newTags);
    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing === false && e.key === 'Enter') {
      e.preventDefault();
      const success = addTag(inputValue);
      if (success) setInputValue('');
    }
  };

  const handleRemove = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_TAG_LENGTH) {
      setInputValue(value);
    } else {
      triggerShake();
    }
  };

  const shakeAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.3 }
    }
  };
  return (
    <>
      {/* 모바일: 버튼 + 인풋 (태그박스 밖 위에 따로 표시) */}
      <div className="mb-2 flex flex-col gap-2 md:hidden">
        {!inputVisible && (
          <button
            type="button"
            onClick={() => setInputVisible(true)}
            className="w-full rounded-[8px] border border-secondary-grey-800 px-[12px] py-[8px] text-sm text-secondary-grey-800 hover:bg-secondary-grey-100"
          >
            +태그추가
          </button>
        )}

        {inputVisible && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="입력 후 Enter"
            className="w-full min-w-[80px] rounded-[8px] border border-gray-300 px-[12px] py-[8px] text-sm outline-none focus:ring-1 focus:ring-primary-orange-500"
          />
        )}
        <motion.div
          key={shouldShake ? 'shake' : 'stable'} // key 변경으로 애니메이션 재실행 유도
          {...(shouldShake ? shakeAnimation : {})}
          className="flex w-full items-center justify-end text-xs text-secondary-grey-700 md:mt-2 md:gap-1"
        >
          <Info className="h-[12px]" />
          <p className="mt-[2px] md:hidden">최대 8글자, 6개 이내</p>
        </motion.div>
      </div>

      {/* 공통 태그 박스 (데스크탑에서는 버튼/인풋도 여기에 포함됨) */}
      {isMobile !== null && (tags.length > 0 || !isMobile) && (
        <div className="mb-[12px] flex flex-wrap items-center rounded-md border border-secondary-grey-300 px-[16px] py-[12px] md:mb-[17px]">
          <div className="hidden gap-2 md:flex">
            {!inputVisible && (
              <button
                type="button"
                onClick={() => setInputVisible(true)}
                className="flex items-center justify-center rounded-[8px] border border-secondary-grey-800 px-[12px] py-[8px] text-sm text-secondary-grey-800 hover:bg-secondary-grey-100"
              >
                +태그추가
              </button>
            )}

            {inputVisible && (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="입력 후 Enter"
                className="min-w-[80px] rounded-[8px] border border-gray-300 px-[12px] py-[8px] text-sm outline-none focus:ring-1 focus:ring-primary-orange-500 md:mr-[16px]"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-[12px]">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center justify-center gap-1 rounded-[8px] border border-secondary-grey-600 px-[10px] py-[8px] text-sm text-secondary-grey-700"
              >
                <span className="relative top-[1px]">#{tag}</span>
                <button type="button" onClick={() => handleRemove(tag)}>
                  <X className="h-[16px] w-[16px]" />
                </button>
              </div>
            ))}
          </div>

          <motion.div
            key={shouldShake ? 'shake' : 'stable'} // key 변경으로 애니메이션 재실행 유도
            {...(shouldShake ? shakeAnimation : {})}
            className="flex w-full items-center text-xs text-secondary-grey-700 md:mt-2 md:gap-1"
          >
            <Info className="hidden h-[12px] md:block" />
            <p className="mt-[2px] hidden md:block">최대 8글자, 6개 이내</p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default TagInput;
