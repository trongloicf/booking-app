import { instance } from "../instance";

const facilities = "facilities";
export const facilityService = {
  getFacilities: (params = {}) => {
    return instance.get(`${facilities}/search`, params);
  },
};
