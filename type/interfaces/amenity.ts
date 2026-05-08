export interface Amenity {
  amenityId: number;
  amenityName: string;
  category: number; // 1: Facility, 2: Room
  status: number;
  created_at?: string;
  updated_at?: string;
}
