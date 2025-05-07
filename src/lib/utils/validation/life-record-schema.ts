import { z } from 'zod';

export const lifeRecordSchema = z.object({
  title: z.string().optional(), // 비워도 되고, 입력하면 사용
  content: z.string().min(1, '내용은 필수입니다')
});
