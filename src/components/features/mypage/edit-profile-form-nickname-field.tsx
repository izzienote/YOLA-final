'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import DuplicateCheckMessage from '@/components/features/auth-form/duplicate-check-message';
import { CustomButton } from '@/components/ui/custom-button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AUTH, PLACEHOLDER } from '@/constants/auth-form';
import { AUTH_ERROR, FAIL, SUCCESS } from '@/constants/messages';
import { fetchDuplicateCheck } from '@/lib/utils/api/auth/auth-client.api';
import type { EditFormData } from '@/types/auth-form';

interface FieldProps {
  form: UseFormReturn<EditFormData>;
  setDuplicateCheck: Dispatch<SetStateAction<boolean>>;
  initNickname: string;
}

const NicknameField = ({ form, setDuplicateCheck, initNickname }: FieldProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 중복 확인 실패 메시지
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 중복 확인 성공 메시지
  const { isValid } = form.formState;
  const { watch, getValues } = useFormContext(); // 필드 값 변경 감지
  const nicknameValue = watch(AUTH.NICKNAME);

  // -------------------------------------------------
  useEffect(() => {
    setDuplicateCheck(false); // 값 변경 시 중복확인 상태 초기화
    setSuccessMessage(null);
    setErrorMessage(null);

    if (initNickname === getValues(AUTH.NICKNAME)) setDuplicateCheck(true); // 기존 닉네임과 같으면 중복검사 pass
  }, [getValues, initNickname, nicknameValue, setDuplicateCheck]);

  // -------------------------------------------------
  const handleDuplicateCheck = async () => {
    const nowValue: string = getValues(AUTH.NICKNAME);

    if (!isValid) return;

    try {
      const isDuplication = await fetchDuplicateCheck(AUTH.NICKNAME, nowValue);

      // 중복 있으면 리턴
      if (isDuplication) {
        setErrorMessage(AUTH_ERROR.CHECK_NICKNAME_FAIL);
        return;
      }
      setSuccessMessage(SUCCESS.NICKNAME_CHECK);
      setDuplicateCheck(true);
      return;
    } catch {
      setErrorMessage(FAIL.DUPLICATE);
    }
  };

  // -------------------------------------------------
  return (
    <FormField
      control={form.control}
      name={AUTH.NICKNAME}
      render={({ field }) => (
        <FormItem className="flex h-10 w-full items-center justify-start self-stretch">
          <FormLabel className="justify-start text-lg font-normal text-secondary-grey-900">닉네임</FormLabel>
          <div className="relative ml-[21px] mr-[12px] md:ml-[42px] md:mr-[8px]">
            <FormControl>
              <Input
                className="h-[37px] w-[198px] rounded border-secondary-grey-400 p-2.5 md:w-[269px]"
                placeholder={PLACEHOLDER.NICKNAME}
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage className="w-[300px]" />
            <DuplicateCheckMessage errorMessage={errorMessage} successMessage={successMessage} />
          </div>
          <CustomButton
            type="button"
            variant="grey"
            size="check"
            className="h-[36px] w-[65px] text-sm md:h-[38px] md:w-[72px] md:text-base"
            onClick={handleDuplicateCheck}
          >
            중복확인
          </CustomButton>
        </FormItem>
      )}
    />
  );
};

export default NicknameField;
