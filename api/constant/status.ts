export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CHECKED_IN: "CHECKED_IN",
  CHECKED_OUT: "CHECKED_OUT",
  CANCELLED: "CANCELLED",
} as const;

export const PAYMENT_METHOD = {
  CASH: "CASH",
  ONLINE: "ONLINE",
} as const;

export const PAYMENT_STATUS = {
  PAID: "PAID",
  UNPAID: "UNPAID",
} as const;
