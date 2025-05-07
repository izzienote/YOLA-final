import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils/utils';

const buttonVariants = cva(
  'text-base font-normal text-center leading-snug gap-2.5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary-orange-400 text-secondary-900 hover:bg-primary-orange-200 active:bg-primary-orange-500 disabled:bg-secondary-grey-300 disabled:text-secondary-grey-600',
        outline:
          'bg-white text-primary-orange-700 hover:bg-primary-orange-50 active:bg-primary-orange-200 border-[1px] border-primary-orange-700 disabled:bg-secondary-grey-200 disabled:text-secondary-grey-500 disabled:border-secondary-grey-600',
        grey: 'bg-white text-secondary-grey-900 hover:bg-secondary-grey-150 active:bg-secondary-grey-200 border-[1px] border-secondary-grey-700 disabled:bg-secondary-grey-200 disabled:text-secondary-grey-400 disabled:border-secondary-grey-400'
      },
      size: {
        default: 'w-[230px] py-[10px] rounded-xl font-semibold',
        'error-page': 'w-[240px] py-[10px] rounded-xl font-semibold',
        'comment-submit': 'min-w-[80px] h-[46px] p-[12px] rounded-[8px]',
        'gonggam-write': 'w-[100px] h-[38px]  rounded-lg',
        'auth-submit': 'w-[360px] py-[10px] rounded-lg',
        login: 'px-[12px] py-[8px] min-w-[66px] rounded-lg',
        check: 'py-[8px] w-[72px] rounded-lg',
        'edit-profile': 'py-[8px] w-[172px] rounded-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

/**
 * @example
 * 커스텀 버튼 사용법: <CustomButton variant={'default'} size={'default'}>디폴트 버튼</CustomButton>
 * 아무 속성을 내리지 않으면 default 테마의 default 크기로 지정 돼요.
 *
 * 테마 속성: hover, active, disabled까지 모두 적용되어있어요. 테마만 설정하면 돼요!
 * default - 우리 프로젝트에서 가장 많이 쓰이는 오렌지색 버튼이에요.
 * outline - 오렌지색의 테두리가 있는 버튼이에요.
 * grey - 회색 버튼이에요.(disabled 아니에요! 아예 회색 테마예요.)
 *
 * 사이즈 속성: 여러분의 페이지에서 사용할 크기를 미리 지정해놓았어요.
 * default - 우리 프로젝트에서 가장 많이 쓰이는 기본 크기예요.
 * error-page - 에러페이지의 홈으로 돌아가기 크기예요.
 * comment-submit - 댓글 달기 버튼 크기예요.
 * gonggam-write - 공감게시판 글 작성하기 버튼 크기예요.
 * auth-submit - 로그인 / 회원가입 폼에 사용하는 버튼 크기예요.
 * login - 비회원에게 노출되는 헤더의 로그인 버튼 크기예요.
 * check - 회원가입 폼과 프로필 수정 폼에 사용되는 중복체크 버튼 크기예요.
 * edit-profile - 마이페이지 사이드 메뉴의 프로필 수정 버튼 크기예요.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
CustomButton.displayName = 'Button';

export { CustomButton, buttonVariants };
