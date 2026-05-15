import { useLocalSearchParams } from "expo-router";

export interface SearchParams {
  keyword?: string | undefined;
  city_id?: number;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  room?: number;
}

export interface UseSearchParamsReturn {
  searchData: SearchParams;
}

export const useSearchParams = (): UseSearchParamsReturn => {
  const params = useLocalSearchParams();
  return {
    searchData: {
      keyword: params.keyword ? String(params.keyword) : undefined,
      city_id: params.city_id ? Number(params.city_id) : undefined,
      checkin: (params.checkin as string) || "",
      checkout: (params.checkout as string) || "",
      adults: Number(params.adult || 2),
      children: Number(params.children || 0),
      room: Number(params.room || 1),
    },
  };
};
