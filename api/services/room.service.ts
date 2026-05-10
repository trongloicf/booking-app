import { RoomDetailRequest } from "@/type/interfaces/room";
import { instance } from "../instance";

const rooms = "rooms";

export const roomService = {
  getRoomDetail: async (req: RoomDetailRequest) => {
    const res = await instance.get(`/${rooms}/public/${req.roomId}`);
    return res.data.data;
  },
};
