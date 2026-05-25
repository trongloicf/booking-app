export const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  PENDING: {
    label: "Chờ xác nhận",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    color: "#16a34a",
    bg: "#dcfce7",
  },
  CHECKED_IN: {
    label: "Đã nhận phòng",
    color: "#2563eb",
    bg: "#dbeafe",
  },
  CHECKED_OUT: {
    label: "Đã trả phòng",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  CANCELLED: {
    label: "Đã huỷ",
    color: "#dc2626",
    bg: "#fee2e2",
  },
  NO_SHOW: {
    label: "Không đến",
    color: "#6b7280",
    bg: "#f3f4f6",
  },
};

export const getStatusInfo = (status: string) => {
  return (
    STATUS_CONFIG[status] || {
      label: status,
      color: "#000",
      bg: "#eee",
    }
  );
};
