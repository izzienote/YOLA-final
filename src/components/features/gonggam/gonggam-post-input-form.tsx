'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import ImageUploader from '@/components/common/image-uploader';
import TagInput from '@/components/common/tag-input';
import GonggamSelectBox from '@/components/features/gonggam/gonggam-select-box';
import ConfirmModal from '@/components/features/modals/confirm-modal';
import { CustomButton } from '@/components/ui/custom-button';

import { categoryMap, reverseCategoryMap } from '@/constants/gonggam-category';
import { PATH } from '@/constants/page-path';
import { QUERY_KEY } from '@/constants/query-keys';

import { useGonggamPost } from '@/lib/hooks/mutations/use-gonggam-post';
import { useUpdateGonggamPost } from '@/lib/hooks/mutations/use-update-gonggam-post';

import { supabase } from '@/lib/utils/supabase/supabase-client';
import { toastAlert } from '@/lib/utils/toast';

import type { EnumCategories } from '@/types/supabase-const';

import backIcon from '@images/images/go-back-icon.svg';

interface GonggamPostInputFormProps {
  isEditMode?: boolean;
  defaultValues?: {
    id: number;
    title: string;
    content: string;
    tags: string[];
    imageUrls: string[];
    category: EnumCategories;
  };
}

const categoryKeys = Object.keys(categoryMap) as [keyof typeof categoryMap];

const postSchema = z.object({
  title: z.string().min(1, '내용은 필수입니다').max(50, '제목은 50자 이하여야 합니다'),
  content: z.string().min(1, '내용은 필수입니다'),
  category: z.enum(categoryKeys)
});

type FormData = z.infer<typeof postSchema>;
type UploadedImage = { publicUrl: string; storagePath: string };

const IMAGE_STORAGE_BUCKET = 'gonggam-post-images';

const GonggamPostInputForm = ({ isEditMode = false, defaultValues }: GonggamPostInputFormProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const categoryName = pathName.split('/').filter(Boolean).pop();

  const { mutate, isPending } = useGonggamPost();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateGonggamPost();
  const queryClient = useQueryClient();

  const isLoading = isPending || isUpdatePending;
  const action = isEditMode ? '수정' : '등록';

  const [category, setCategory] = useState<EnumCategories>(
    categoryName && !isEditMode ? (reverseCategoryMap[categoryName] as EnumCategories) : defaultValues!.category
  );
  const [tags, setTags] = useState(defaultValues?.tags || []);
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
    defaultValues?.imageUrls?.map((url) => ({ publicUrl: url, storagePath: '' })) || []
  );

  const [showModal, setShowModal] = useState(false);

  const placeholder = {
    일상공유: `혼자 보내는 일상에 대한 내용을 회원들과 자유롭게 공유해주세요.
ex) 오늘 한강가서 치맥했어요. 날 풀리니까 혼자 나가도 좋네요!`,
    꿀팁공유: `이럴 땐 이렇게! 혼자 라이프 꿀팁을 들려주세요. 
ex) 자취생 냉장고 청소 꿀팁 공유합니다!`,
    여기추천: `혼자 가기 좋은 장소나 자주 찾는 공간이 있다면 소개해주세요. 
ex) 자취생에게 꼭 필요한 프린트 카페 추천해요.`,
    밋업: `관심사 기반의 소모임을 제안하거나 참여해보세요. 
ex) 사이드 프로젝트 팀원 모집합니다!`
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: {
      title: defaultValues?.title ?? '',
      content: defaultValues?.content ?? '',
      category
    }
  });

  const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
    const uploaded: UploadedImage[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `gonggam/${fileName}`;

      const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).upload(filePath, file);
      if (error) throw new Error('이미지 업로드 실패: ' + error.message);

      const {
        data: { publicUrl }
      } = supabase.storage.from(IMAGE_STORAGE_BUCKET).getPublicUrl(filePath);
      uploaded.push({ publicUrl, storagePath: filePath });
    }

    return uploaded;
  };

  const deleteImages = async (paths: string[]) => {
    const { error } = await supabase.storage.from(IMAGE_STORAGE_BUCKET).remove(paths);
    if (error) throw new Error('이미지 삭제 실패: ' + error.message);
  };

  const onSubmit = async (data: FormData) => {
    const title = data.title?.trim() || '제목 없음';
    const content = data.content.trim();

    try {
      const newUploads = await uploadImages(images);
      const imageUrls = [...uploadedImages.map((img) => img.publicUrl), ...newUploads.map((img) => img.publicUrl)];

      const payload = {
        title,
        content,
        category,
        rawTags: tags.join(','),
        imageUrls
      };

      const onSuccess = () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GONGGAM_POSTS]
        });
        toastAlert(`${action}되었습니다!`, 'success');
        router.push(`${PATH.GONGGAM}/${categoryMap[category]}`); //작성한 글의 카테고리 게시판으로 이동
      };

      const onError = (err: unknown) => {
        toastAlert(err instanceof Error ? err.message : `${action} 중 오류가 발생했습니다.`, 'destructive');
      };

      const mutationFn =
        isEditMode && defaultValues
          ? () => updateMutate({ id: defaultValues.id, ...payload }, { onSuccess: onSuccess, onError: onError })
          : () => mutate(payload, { onSuccess: onSuccess, onError: onError });

      mutationFn();
    } catch (err) {
      toastAlert(err instanceof Error ? err.message : '알 수 없는 오류 발생', 'destructive');
    }
  };

  const handleCancel = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async () => {
    try {
      const pathsToDelete = uploadedImages.map((img) => img.storagePath).filter(Boolean);
      if (pathsToDelete.length > 0) await deleteImages(pathsToDelete);
      router.back();
    } catch (err) {
      alert('이미지 삭제 실패: ' + (err instanceof Error ? err.message : ''));
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-4 py-10 text-black">
      <button
        type="button"
        onClick={handleCancel}
        className="mb-[32px] inline-flex h-auto w-auto items-center justify-center gap-[12px] py-[4px] text-sm font-normal text-secondary-grey-700"
      >
        <Image src={backIcon} alt="뒤로가기 아이콘" />
        뒤로가기
      </button>
      <GonggamSelectBox value={category} onChange={(value) => setCategory(value as typeof category)} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-8">
          <input
            type="text"
            {...register('title')}
            placeholder="제목을 입력하세요"
            className="mb-4 w-full border-b border-gray-300 pb-2 text-xl font-semibold outline-none placeholder:text-gray-400 focus:border-blue-500"
            required
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}

          <textarea
            {...register('content')}
            placeholder={placeholder[category]}
            className="h-[300px] w-full resize-none bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
        </div>

        <TagInput value={tags} onChange={setTags} />
        <ImageUploader
          images={images}
          onChange={setImages}
          defaultImageUrls={uploadedImages.map((img) => img.publicUrl)}
          onRemoveDefaultImage={(idx) => {
            const updated = [...uploadedImages];
            updated.splice(idx, 1);
            setUploadedImages(updated);
          }}
        />

        <div className="mx-auto mt-4 flex w-full items-center justify-center gap-5">
          <CustomButton type="submit" disabled={!isValid || isLoading} className="w-[344px] md:w-[230px]">
            등록하기
          </CustomButton>
        </div>
      </form>
      {showModal && (
        <ConfirmModal
          clickModal={() => setShowModal(false)}
          handleDelete={handleDelete}
          isItPost={true}
          isItBack={true}
        />
      )}
    </div>
  );
};

export default GonggamPostInputForm;
