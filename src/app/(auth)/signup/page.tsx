import AuthContent from '@/components/features/auth-form/auth-content';
import SignupForm from '@/components/features/auth-form/signup-form';

const SignUpPage = () => {
  return <AuthContent title="회원가입" form={<SignupForm />} />;
};

export default SignUpPage;
