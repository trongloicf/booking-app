import { facilityService } from "@/api/services/facility.service";
import { SearchParams } from "@/type/search";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFacilities = (params: SearchParams) => {
  return useQuery({
    queryKey: ["facilities", params],
    queryFn: async () => {
      const res = await facilityService.getFacilities(params);
      return {
        data: res.data.data,
        pagination: res.data.pagination,
      };
    },
    placeholderData: keepPreviousData,
  });
};
