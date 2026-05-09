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

export interface RoomFacility {
  availableQuantity: number;
  bedName: string;
  maxAdults: number;
  maxChildren: number;
  price: string;
  roomArea: number;
  roomId: number;
  roomName: string;
  roomThumbnail: string;
  roomTypeName: string;
}
