import { roomService } from "@/api/services/room.service";
import { RoomDetailRequest } from "@/type/interfaces/room";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailRoom = (req: RoomDetailRequest) => {
  return useQuery({
    queryKey: ["get-detail-room", req],
    queryFn: () => roomService.getRoomDetail(req),
    enabled: !!req.roomId,
  });
};
