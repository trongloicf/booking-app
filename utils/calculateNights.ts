export const calculateNights = (checkin: string, checkout: string) => {
  if (!checkin || !checkout) return 0;
  const startDate = new Date(checkin);
  const endDate = new Date(checkout);
  const diffInMs = endDate.getTime() - startDate.getTime();
  const nights = diffInMs / (1000 * 60 * 60 * 24);
  return nights > 0 ? Math.floor(nights) : 0;
};
