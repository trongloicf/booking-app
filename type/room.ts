export interface Room {
  roomId: number;
  facilityId: number;
  roomName: string;
  roomDescription?: string;
  price: number;
  roomThumbnail: string;
  amenities: number[];
  maxAdults: number;
  maxChildren: number;
}
