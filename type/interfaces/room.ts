import { DateRange } from "./params";

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

export interface RoomDetail {
  roomId: number;
  roomName: string;
  roomDesc: string;
  roomTypeName: string;
  bedName: string;
  facilityName: string;
  facilityAddress: string;
  roomThumbnail: string;
  price: string;
  roomArea: number;
  maxAdults: number;
  maxChildren: number;
  maxOccupancy: number;
}

// params
export interface RoomDetailRequest {
  roomId: number;
  params: DateRange;
}
