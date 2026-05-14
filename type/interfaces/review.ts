export interface ReviewForFacility {
  reviewId: number;
  rating: number;
  comment: string;
  createdAt: string;
  userName: string;
  roomName: string;
  roomTypeName: string;
  reviewRank: number;
  totalUserReviews: number;
}

export interface ReviewForRoom {
  reviewId: number;
  userName: string;
  roomName: string;
  roomTypeName: string;
  rating: number;
  comment: string;
  ownerReply: string;
  isVisible: boolean;
  createdAt: string;
}
