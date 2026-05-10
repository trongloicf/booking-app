export const parseNumberId = (
  id: string | number | undefined | null,
): number | null => {
  if (!id) return null;
  const num = Number(id);
  return Number.isInteger(num) && num > 0 ? num : null;
};
