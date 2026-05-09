import { RequestDetail, SearchParams } from "@/type/interfaces/params";
import { instance } from "../instance";

const facilities = "facilities";
export const facilityService = {
  getFacilities: async (params: SearchParams) => {
    const res = await instance.get(`/${facilities}/search`, { params });
    return {
      data: res.data.data,
      pagination: res.data.pagination,
    };
  },
  getFacilityDetail: async (req: RequestDetail) => {
    const res = await instance.get(`/${facilities}/public/${req.facilityId}`, {
      params: req.params,
    });
    return res.data.data;
  },
};
