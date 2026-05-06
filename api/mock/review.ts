import { ReviewItem } from "@/type/facility";

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    reviewId: 1,
    facilityId: 1,
    userName: "Nguyễn Văn A",
    avatar:
      "https://tse2.mm.bing.net/th/id/OIP.lFH7zrXSCJu6sbOHmomWbAHaHa?pid=Api&P=0&h=180",
    rating: 5,
    date: "20/10/2023",
    comment:
      "Phòng cực kỳ sạch sẽ, nhân viên hỗ trợ nhiệt tình. Vị trí ngay trung tâm nên đi lại rất tiện lợi. Chắc chắn sẽ quay lại!",
  },
  {
    reviewId: 2,
    facilityId: 1,
    userName: "Trần Thị B",
    avatar:
      "https://tse2.mm.bing.net/th/id/OIP.lFH7zrXSCJu6sbOHmomWbAHaHa?pid=Api&P=0&h=180",
    rating: 4,
    date: "15/10/2023",
    comment: "Gối hơi cao so với mình nhưng tổng thể phòng rất ổn, view đẹp.",
  },
];
