import type { Enums, Tables } from '@/types/supabase';

// table type 상수화
export type TableUsers = Tables<'users'>;
export type TableComments = Tables<'comments'>;
export type TableGonggamPostImagePath = Tables<'gonggam_post_image_path'>;
export type TableGonggamPosts = Tables<'gonggam_posts'>;
export type TableGonggamPostWithCounts = Tables<'gonggam_posts_with_counts'>;
export type TableLifePostImagePath = Tables<'life_post_image_path'>;
export type TableLifePosts = Tables<'life_posts'>;
export type TableLikes = Tables<'likes'>;
export type TableMissionList = Tables<'mission_list'>;
export type TableUserLevel = Tables<'user_level'>;
export type TableUserMission = Tables<'user_mission'>;

// enum 타입 상수화
export type EnumCategories = Enums<'categories'>;
export type EnumChecklist = Enums<'checklist'>;
export type EnumLevel = Enums<'level'>;
