import type { MissionMapType } from '@/types/checklist';

export const missionTypeMap: MissionMapType = {
  혼밥: 'meal',
  혼놀: 'play',
  혼자여행: 'travel',
  청소: 'clean',
  갓생: 'goat'
};

export const validMissionTags = Object.keys(missionTypeMap) as (keyof typeof missionTypeMap)[];
