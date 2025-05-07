import { redirect } from 'next/navigation';
import { PATH } from '@/constants/page-path';

const GonggamPage = () => {
  redirect(PATH.GONGGAM_DAILY);
};

export default GonggamPage;
