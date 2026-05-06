export const formatDateVN = (date?: string) => {
  if (!date) return;
  return new Date(date).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
};

export const formatVND = (value: number) => {
  return Number(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
