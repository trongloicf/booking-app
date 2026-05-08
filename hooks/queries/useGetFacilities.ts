import { facilityService } from "@/api/services/facility.service";
import { SearchParams } from "@/type/interfaces/search";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetFacilities = (params: SearchParams) =>
  useQuery({
    queryKey: ["facilities", params],
    queryFn: () => facilityService.getFacilities(params),
    placeholderData: keepPreviousData,
  });
