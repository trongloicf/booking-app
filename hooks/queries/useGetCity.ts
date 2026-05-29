import { cityService } from "@/api/services/city.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCity = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: cityService.getCities,
  });
};
