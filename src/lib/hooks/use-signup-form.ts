import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignupFormData, signupSchema } from '@/lib/utils/validation/auth-schema';

export const useSignupForm = () => {
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      checkPassword: '',
      nickname: ''
    },
    mode: 'onChange'
  });

  const { isValid, isSubmitting } = signupForm.formState;

  return { signupForm, isValid, isSubmitting };
};
