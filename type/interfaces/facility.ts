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
  star: string;
  reviewCount: number;
  images?: string[];
  description?: string;
  rooms: number[];
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
