'use client';

import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import AuthFormField from '@/components/features/auth-form/auth-form-field';
import SignupFormButton from '@/components/features/auth-form/signup-form-button';
import { Form as FormProvider, FormField } from '@/components/ui/form';
import { AUTH, PLACEHOLDER } from '@/constants/auth-form';
import { AUTH_ERROR, SUCCESS } from '@/constants/messages';
import { useSignupForm } from '@/lib/hooks/use-signup-form';
import { signup } from '@/lib/utils/api/auth/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import { SignupFormData } from '@/lib/utils/validation/auth-schema';

interface SignupField {
  fieldName: 'email' | 'password' | 'checkPassword' | 'nickname';
  placeholder: string;
  form: UseFormReturn<{
    email: string;
    password: string;
    checkPassword: string;
    nickname: string;
  }>;
  inputType: string;
  isCheckButton?: boolean;
  isValid?: boolean;
}

const SignupForm = () => {
  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState<boolean>(false);
  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState<boolean>(false);

  const { signupForm, isValid, isSubmitting } = useSignupForm();

  const signupFieldData: SignupField[] = [
    {
      fieldName: AUTH.EMAIL,
      placeholder: PLACEHOLDER.EMAIL,
      isCheckButton: true,
      form: signupForm,
      inputType: 'email',
      isValid: signupForm.formState.dirtyFields.email && !signupForm.formState.errors.email
    },
    {
      fieldName: AUTH.NICKNAME,
      placeholder: PLACEHOLDER.NICKNAME,
      isCheckButton: true,
      form: signupForm,
      inputType: 'text',
      isValid: signupForm.formState.dirtyFields.nickname && !signupForm.formState.errors.nickname
    },
    { fieldName: AUTH.PASSWORD, placeholder: PLACEHOLDER.PASSWORD, form: signupForm, inputType: 'password' },
    {
      fieldName: AUTH.CHECK_PASSWORD,
      placeholder: '비밀번호를 한번 더 입력하세요.',
      form: signupForm,
      inputType: 'password',
      isValid: signupForm.formState.dirtyFields.checkPassword && !signupForm.formState.errors.checkPassword
    }
  ];

  const handleFormAction = async (formData: SignupFormData) => {
    if (!emailDuplicateCheck) {
      toastAlert(AUTH_ERROR.EMAIL_CHECK, 'destructive');
      return;
    }
    if (!nicknameDuplicateCheck) {
      toastAlert(AUTH_ERROR.NICKNAME_CHECK, 'destructive');
      return;
    }

    await signup(formData);
    toastAlert(SUCCESS.SIGNUP, 'success');
  };

  return (
    <FormProvider {...signupForm}>
      <form
        className="mt-[42px] flex w-full max-w-[365px] flex-col gap-[29px] md:mt-[35px] md:gap-[27px]"
        onSubmit={signupForm.handleSubmit(handleFormAction)}
      >
        {signupFieldData.map((data, index) => (
          <FormField
            key={index}
            control={signupForm.control}
            name={data.fieldName}
            render={({ field }) => (
              <AuthFormField
                fieldName={data.fieldName}
                placeholder={data.placeholder}
                inputType={data.inputType}
                isValid={data.isValid}
                field={field}
                isCheckButton={data.isCheckButton}
                setEmailDuplicateCheck={setEmailDuplicateCheck}
                setNicknameDuplicateCheck={setNicknameDuplicateCheck}
              />
            )}
          />
        ))}
        <SignupFormButton isValid={isValid} isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
};

export default SignupForm;
