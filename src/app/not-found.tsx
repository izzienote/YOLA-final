'use client';

import ErrorBlock from '@/components/common/error-block';
import NOT_FOUND from '@images/images/not-found-image.svg';

const ErrorPage = () => {
  return <ErrorBlock image={NOT_FOUND} errorMessage="이런!! 오류가 발생했어요." />;
};

export default ErrorPage;
