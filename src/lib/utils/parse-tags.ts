export const parseTags = (raw: string): string[] => {
  return raw
    .split(/[#,]/) // 쉼표 또는 '#'로 구분
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};
