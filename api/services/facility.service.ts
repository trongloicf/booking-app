import { SearchParams } from "@/type/search";
import { instance } from "../instance";

const facilities = "facilities";
export const facilityService = {
  getFacilities: (params: SearchParams) => {
    return instance.get(`/${facilities}/search`, { params });
  },
};
