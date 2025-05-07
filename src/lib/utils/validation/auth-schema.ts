import { z } from 'zod';

/**
 * zod를 이용한 유효성 검사 스키마입니다.
 * email, password, check password, nickname의 유효값을 정의합니다.
 * check password와 password가 일치하지 않을 때의 오류 메시지가 별도로 지정되어 있습니다.
 * z.infer로 스키마에서 타입을 자동 추론합니다.
 */
const nicknameSchema = z
  .string({ required_error: '닉네임을 입력해주세요.' })
  .min(2, '최소 2자 이상이어야 합니다.')
  .max(8, '최소 8자 이하여야 합니다.')
  .regex(/^[가-힣A-Za-z0-9]+$/, '공백, 초성을 제외한 한글, 영어, 숫자만 사용 가능합니다.')
  .refine((val) => !/^\d+$/.test(val), '문자와 숫자 조합으로 사용 가능합니다.');

const emailSchema = z.string({ required_error: '이메일을 입력해주세요.' }).email('유효한 이메일을 입력하세요.');

const passwordSchema = z
  .string({ required_error: '비밀번호를 입력해주세요.' })
  .min(8, '최소 8자 이상이어야 합니다.')
  .regex(/^[A-Za-z\d!@#$%^&*]+$/, '특수문자는 !, @, #, $, %, ^, &, *만 사용 가능합니다.')
  .refine((val) => /[a-z]/.test(val), '소문자를 포함해야 합니다.')
  .refine((val) => /[A-Z]/.test(val), '대문자를 포함해야 합니다.')
  .refine((val) => /[!@#$%^&*]/.test(val), '특수문자를 포함해야 합니다.');

export const editProfileSchema = z.object({
  nickname: nicknameSchema
});

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    checkPassword: z.string({ required_error: '비밀번호를 한번 더 입력해주세요.' }),
    nickname: nicknameSchema
  })
  .refine((data) => data.password === data.checkPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['checkPassword']
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
