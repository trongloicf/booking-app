import { SearchParams } from "@/type/interfaces/search";
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
};
