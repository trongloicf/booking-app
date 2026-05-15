import { Amenity } from "@/type/interfaces/amenity";
import { ApiReponse } from "@/type/interfaces/base";
import { DateRange } from "@/type/interfaces/params";
import { ReviewForRoom } from "@/type/interfaces/review";
import { RoomDetail, RoomDetailRequest } from "@/type/interfaces/room";
import { instance } from "../instance";

const rooms = "rooms";

export interface RoomDetailReponse {
  room: RoomDetail;
  amenities: Amenity[];
  available?: number;
  reviews?: ReviewForRoom[];
  dateRange?: DateRange;
}

export const roomService = {
  getRoomDetail: async (req: RoomDetailRequest): Promise<RoomDetailReponse> => {
    const res = await instance.get<ApiReponse<RoomDetailReponse>>(
      `/${rooms}/public/${req.roomId}`,
      {
        params: req.params,
      },
    );
    return res.data.data;
  },
};
