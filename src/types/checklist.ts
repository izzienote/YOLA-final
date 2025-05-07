import type { TableMissionList, TableUserLevel } from '@/types/supabase-const';

export interface UserLevelByMissionType {
  userId: TableUserLevel['user_id'];
  decodedMission: string;
}

export type MissionMapType = Record<string, keyof TableUserLevel>;
export type MissionWithStatus = TableMissionList & { completed: boolean };
