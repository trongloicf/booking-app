import { Room } from "./room";

export interface FacilityCardItem {
  facilityId: number;
  facilityName: string;
  cityName: string;
  facilityThumbnail: string;
  avgRating: string;
  minPrice?: number;
  totalReviews: number;
  address?: string;
  images?: string[];
  description?: string;
  facilityAmenity?: number[];
  rooms: number[];
}

export interface FacilityDetail {
  facilityId: number;
  facilityName: string;
  cityName: string;
  facilityThumbnail: string;
  facilityAddress: string;
  facilityDesc: string;
  avgRating: string;
  minPrice?: number;
  totalReviews: number;
  images?: string[];
  rooms: Room[];
}

export interface Amenity {
  amenityId: number;
  amenityName: string;
}

export interface ReviewItem {
  reviewId: number;
  facilityId: number;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ReviewSectionProps {
  reviews: ReviewItem[];
}

export interface Policy {
  policyId: 1;
  cancelPolicy: string;
  checkinTime: string;
  checkoutTime: string;
  petAllowed: boolean;
  smokingAllowed: boolean;
}

export interface ImageFacility {
  facilityImagesId: number;
  imageUrl: string;
}
