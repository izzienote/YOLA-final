import AuthContent from '@/components/features/auth-form/auth-content';
import LoginForm from '@/components/features/auth-form/login-form';

const LoginPage = async () => {
  return <AuthContent title="로그인" form={<LoginForm />} />;
};

export default LoginPage;
