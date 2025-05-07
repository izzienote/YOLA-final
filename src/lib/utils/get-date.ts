export const getToday = (): string => {
  const kst = new Date();
  const yyyy = kst.getFullYear();
  const mm = String(kst.getMonth() + 1).padStart(2, '0');
  const dd = String(kst.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const getPrevMonth = (monthStr: string): string => {
  const [year, month] = monthStr.split('-').map(Number);
  const prevDate = new Date(year, month - 2, 1); // 0-index
  const yyyy = prevDate.getFullYear();
  const mm = String(prevDate.getMonth() + 1).padStart(2, '0');
  return `${yyyy}-${mm}`;
};
export const getNextMonth = (monthStr: string): string => {
  const [year, month] = monthStr.split('-').map(Number);
  const nextDate = new Date(year, month, 1);
  const yyyy = nextDate.getFullYear();
  const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
  return `${yyyy}-${mm}`;
};
