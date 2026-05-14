import { Amenity } from "@/type/interfaces/amenity";
import { ApiReponse } from "@/type/interfaces/base";
import {
  FacilityDetail,
  ImageFacility,
  Policy,
} from "@/type/interfaces/facility";
import {
  DateRange,
  RequestDetail,
  SearchParams,
} from "@/type/interfaces/params";
import { ReviewForFacility } from "@/type/interfaces/review";
import { RoomFacility } from "@/type/interfaces/room";
import { instance } from "../instance";

export interface FacilityDetailReponse {
  facility: FacilityDetail;
  rooms: RoomFacility[];
  amenities: Amenity[];
  images: ImageFacility[];
  policies: Policy;
  reviews: ReviewForFacility[];
  dateRange: DateRange;
}

const facilities = "facilities";
export const facilityService = {
  getFacilities: async (params: SearchParams) => {
    const res = await instance.get(`/${facilities}/search`, { params });
    return {
      data: res.data.data,
      pagination: res.data.pagination,
    };
  },
  getFacilityDetail: async (
    req: RequestDetail,
  ): Promise<FacilityDetailReponse> => {
    const res = await instance.get<ApiReponse<FacilityDetailReponse>>(
      `/${facilities}/public/${req.facilityId}`,
      {
        params: req.params,
      },
    );
    return res.data.data;
  },
};
