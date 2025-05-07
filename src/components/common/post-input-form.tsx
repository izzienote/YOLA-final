'use client';

// 외부 라이브러리
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

// 컴포넌트
import DatePicker from '@/components/common/date-picker';
import ImageUploader from '@/components/common/image-uploader';
import TagInput from '@/components/common/tag-input';
import ChecklistPostDropdown from '@/components/features/checklist/checklist-post-dropdown';
import ConfirmModal from '@/components/features/modals/confirm-modal';
import { CustomButton } from '@/components/ui/custom-button';

// 상수 및 타입
import { PATH } from '@/constants/page-path';
import { QUERY_KEY } from '@/constants/query-keys';

// 유틸
import { useLifePost } from '@/lib/hooks/mutations/use-life-posts';
import { useUpdateLifePost } from '@/lib/hooks/mutations/use-update-life-post';
import { getToday } from '@/lib/utils/get-date';
import { supabase } from '@/lib/utils/supabase/supabase-client';
import { toastAlert } from '@/lib/utils/toast';

// 타입
import type { TableMissionList } from '@/types/supabase-const';

interface LifeInputFormProps {
  missionId: string | null;
  dropdownMissions?: TableMissionList[];
  completedIds?: number[];
  isEditMode?: boolean;
  defaultValues?: {
    id: number;
    title: string;
    content: string;
    tags: string[];
    date: string;
    imageUrls: string[];
    missionId?: number;
  };
}

const lifeRecordSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, '내용은 필수입니다')
});

type FormData = z.infer<typeof lifeRecordSchema>;
type UploadedImage = { publicUrl: string; storagePath: string };

const IMAGE_STORAGE_BUCKET = 'life-post-images';

const PostInputForm = ({
  missionId,
  dropdownMissions,
  completedIds,
  isEditMode = false,
  defaultValues
}: LifeInputFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate, isPending } = useLifePost();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateLifePost();
  const queryClient = useQueryClient();

  const isLoading = isPending || isUpdatePending;
  const action = isEditMode ? '수정' : '등록';
  const buttonLabel = `${action}${isLoading ? '중...' : '하기'}`;

  const [tags, setTags] = useState(defaultValues?.tags || []);
  const [selectedDate, setSelectedDate] = useState(defaultValues?.date || getToday());
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
    defaultValues?.imageUrls?.map((url) => ({ publicUrl: url, storagePath: '' })) || []
  );
  const [selectedMissionId, setSelectedMissionId] = useState<number | null>(
    defaultValues?.missionId ?? (missionId ? +missionId : null)
  );
  const [showModal, setShowModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isMission = !!missionId;
  const selectedMission = dropdownMissions?.find((m) => m.id === selectedMissionId);
  const DEFAULT_TITLE = isMission ? (selectedMission?.content ?? '미션 인증') : `${selectedDate}의 혼자 라이프 기록`;
  const placeHolder = isMission
    ? `미션 관련 내용과 사진을 필수로 올려주세요.
ex) 저는 오늘 맥도날드 고구마 후라이를 먹었어요!`
    : `혼자 보내는 일상에 대해 자유롭게 기록해주세요.
ex) 오늘은 혼자 코인노래방에 가서 3시간을 부르고 나왔다. 스트레스가 왕창 풀리는 날이었다.`;

  // URL에서 카테고리 정보 추출 및 디코딩
  const category = searchParams.get('category') ? decodeURIComponent(searchParams.get('category')!) : null;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(lifeRecordSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      content: defaultValues?.content ?? ''
    }
  });

  const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
    const uploaded: UploadedImage[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `diary/${fileName}`;

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
    const title = data.title?.trim() || DEFAULT_TITLE;
    const content = data.content.trim();

    if (isMission && images.length + uploadedImages.length === 0) {
      toastAlert('이미지는 최소 1장 이상 등록해주세요.', 'warning');
      return;
    }
    setIsClicked(true);
    try {
      const newUploads = await uploadImages(images);
      const imageUrls = [...uploadedImages.map((img) => img.publicUrl), ...newUploads.map((img) => img.publicUrl)];

      const payload = {
        title,
        content,
        rawTags: tags.join(','),
        imageUrls,
        missionId: selectedMissionId?.toString() ?? null,
        date: selectedDate
      };

      const onSuccess = () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.LIFE_POSTS]
        });
        toastAlert(`${action}되었습니다!`, 'success');
        if (missionId) {
          router.push(`${PATH.CHECKLIST}${category ? `/${encodeURIComponent(category)}` : ''}`);
        } else {
          router.push(PATH.LIFE);
        }
      };

      const onError = (err: unknown) => {
        toastAlert(err instanceof Error ? err.message : `${action} 중 알 수 없는 오류가 발생했습니다.`, 'destructive');
      };

      const mutationFn =
        isEditMode && defaultValues
          ? () => updateMutate({ id: defaultValues.id, ...payload }, { onSuccess, onError })
          : () => mutate(payload, { onSuccess, onError });

      mutationFn();
    } catch (err) {
      setIsClicked(false);
      toastAlert(err instanceof Error ? err.message : '알 수 없는 오류', 'destructive');
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
      toastAlert('이미지 삭제 실패: ' + (err instanceof Error ? err.message : ''));
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[1200px] bg-white px-4 py-10 text-secondary-grey-900">
      <button
        type="button"
        onClick={handleCancel}
        className="mb-[32px] flex items-center text-sm text-secondary-grey-600 hover:text-secondary-grey-800"
      >
        <ChevronLeft className="mr-1 h-5 w-5" />
        뒤로가기
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1200px]">
        <div
          className={clsx('mb-[20px] flex w-full items-center', isMission ? 'justify-start gap-4' : 'justify-between')}
        >
          <h1 className="text-xl font-bold">
            {isEditMode
              ? '기록 수정'
              : isMission
                ? dropdownMissions && (
                    <ChecklistPostDropdown
                      missions={dropdownMissions}
                      completedIds={completedIds}
                      selectedId={selectedMissionId}
                      onSelect={setSelectedMissionId}
                    />
                  )
                : '혼자 라이프 기록'}
          </h1>
          <div className="ml-4 shrink-0">
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>
        </div>

        <div className="mb-6 h-[450px] w-full rounded-lg border border-secondary-grey-200 bg-white p-8">
          {!isMission && (
            <input
              type="text"
              {...register('title')}
              placeholder={DEFAULT_TITLE}
              className="mb-[20px] w-full border-b border-secondary-grey-300 pb-2 text-xl font-semibold outline-none placeholder:text-secondary-grey-400 focus:border-blue-500"
            />
          )}

          <textarea
            {...register('content')}
            placeholder={placeHolder}
            className="h-[90%] w-full resize-none text-sm placeholder:text-secondary-grey-500 focus:outline-none focus:ring-2 focus:ring-primary-orange-400"
          />
          {errors.content && <p className="mt-2 text-sm text-red-500">{errors.content.message}</p>}
        </div>

        <div className="mb-6">
          <TagInput value={tags} onChange={setTags} />
        </div>

        <div className="mb-6">
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
        </div>

        <div className="mx-auto mt-6 flex w-full items-center justify-center gap-5">
          <CustomButton type="submit" disabled={isClicked}>
            {buttonLabel}
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

export default PostInputForm;
