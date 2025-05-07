'use client';

import { UseFormReturn } from 'react-hook-form';
import AuthFormField from '@/components/features/auth-form/auth-form-field';
import LoginFormButton from '@/components/features/auth-form/login-form-button';
import { CustomButton } from '@/components/ui/custom-button';
import { Form as FormProvider, FormField } from '@/components/ui/form';
import { AUTH, PLACEHOLDER } from '@/constants/auth-form';
import { SUCCESS } from '@/constants/messages';
import { useLoginForm } from '@/lib/hooks/use-login-form';
import { login } from '@/lib/utils/api/auth/auth-action';
import { toastAlert } from '@/lib/utils/toast';
import { LoginFormData } from '@/lib/utils/validation/auth-schema';

interface LoginField {
  fieldName: 'email' | 'password';
  placeholder: string;
  form: UseFormReturn<{
    password: string;
    email: string;
  }>;
  inputType: string;
  isLoginForm: boolean;
}

const LoginForm = () => {
  const { loginForm, isValid, isSubmitting } = useLoginForm();

  const loginFieldData: LoginField[] = [
    { fieldName: AUTH.EMAIL, placeholder: PLACEHOLDER.EMAIL, form: loginForm, inputType: 'email', isLoginForm: true },
    {
      fieldName: AUTH.PASSWORD,
      placeholder: PLACEHOLDER.PASSWORD,
      form: loginForm,
      inputType: 'password',
      isLoginForm: true
    }
  ];

  const handleFormAction = async (formData: LoginFormData) => {
    try {
      await login(formData);
      toastAlert(SUCCESS.LOGIN, 'success');
    } catch (error) {
      if (error instanceof Error) toastAlert(error.message, 'destructive');
    }
  };

  return (
    <FormProvider {...loginForm}>
      <form className="mt-[28px] w-full max-w-[360px] md:mt-[37px]" onSubmit={loginForm.handleSubmit(handleFormAction)}>
        <div className="mb-[28px] flex flex-col gap-[29px]">
          {loginFieldData.map((data, index) => (
            <FormField
              key={index}
              control={loginForm.control}
              name={data.fieldName}
              render={({ field }) => (
                <AuthFormField
                  fieldName={data.fieldName}
                  placeholder={data.placeholder}
                  inputType={data.inputType}
                  field={field}
                />
              )}
            />
          ))}
        </div>
        <CustomButton
          disabled={!isValid || isSubmitting}
          type="submit"
          size="auth-submit"
          className="mt-[20px] h-[42px] w-full"
        >
          {isSubmitting ? '로그인 중...' : '이메일로 로그인'}
        </CustomButton>
      </form>
      <LoginFormButton />
    </FormProvider>
  );
};

export default LoginForm;
