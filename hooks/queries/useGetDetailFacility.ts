import { facilityService } from "@/api/services/facility.service";
import { RequestDetail } from "@/type/interfaces/params";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailFacility = (req: RequestDetail) => {
  return useQuery({
    queryKey: ["get-detail-facility", req.facilityId, req.params],
    queryFn: () => facilityService.getFacilityDetail(req),
    enabled: !!req.facilityId,
  });
};
