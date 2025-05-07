import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '@/lib/utils/validation/auth-schema';

export const useLoginForm = () => {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const { isValid, isSubmitting } = loginForm.formState;

  return { loginForm, isValid, isSubmitting };
};
