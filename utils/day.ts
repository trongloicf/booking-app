import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const formatReviewDate = (date: string) => {
  const now = dayjs();
  const reviewDate = dayjs(date);
  if (now.diff(reviewDate, "day") === 0) return reviewDate.fromNow();
  if (now.diff(reviewDate, "day") === 1) return "Hôm qua";
  if (now.diff(reviewDate, "day") < 7)
    return `${now.diff(reviewDate, "day")} ngày trước`;

  return reviewDate.format("DD/MM/YYYY");
};
