'use client';

import ErrorBlock from '@/components/common/error-block';
import ERROR from '@images/images/error-image.svg';

const ErrorPage = () => {
  return <ErrorBlock image={ERROR} errorMessage="이런!! 오류가 발생했어요." />;
};

export default ErrorPage;
