import { SelectedRoom } from "@/app/detail/FacilityDetail";
import { useLocalSearchParams } from "expo-router";

export interface RoomDetailParams {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  room: number;
}

export interface UseRoomDetailParamsReturn {
  roomId: number;
  roomDetailData: RoomDetailParams;
  rooms: SelectedRoom[];
}

export const useRoomDetailParams = () => {
  const params = useLocalSearchParams();
  let rooms: SelectedRoom[] = [];

  try {
    rooms = params.rooms ? JSON.parse(params.rooms as string) : [];
  } catch (e) {
    console.warn("Parse rooms error:", e);
  }
  return {
    roomId: Number(params.id),
    roomDetailData: {
      checkin: (params.checkin as string) || "",
      checkout: (params.checkout as string) || "",
      adults: Number(params.adults),
      children: Number(params.children),
      room: Number(params.room),
    },
    rooms,
  };
};
