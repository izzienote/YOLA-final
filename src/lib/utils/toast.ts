import { toast } from '@/lib/hooks/use-toast';

type Variant = 'default' | 'destructive' | 'success' | 'warning' | 'info' | null | undefined;

/**
 * 토스트 알림창을 util 함수로 정의해보았습니다.
 * @example toastAlert('안녕하세요!', 'default')
 * @param { string } message - 토스트 알람에 띄울 메시지를 넣어주세요.
 * @param { Variant } variant - variant 타입입니다.
 * default - 기본 알림 / destructive - 경고, 오류(빨강) / success - 성공(초록) / warning - 경고(노랑) / info - 정보(파랑)
 * @returns 토스트 알림창이 생성될 거예요!
 */
export const toastAlert = (message: string, variant: Variant = 'default') => {
  return toast({
    description: message,
    variant: variant
  });
};
