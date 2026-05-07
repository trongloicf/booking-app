import { facilityService } from "@/api/services/facility.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFacilities = (params: any) => {
  return useQuery({
    queryKey: ["facilities", params],
    queryFn: async () => {
      const res = await facilityService.getFacilities(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
