import { SearchParams } from "@/type/interfaces/search";

export const parseSearchParams = (params: any): SearchParams => ({
  keyword: params.keyword?.trim() || undefined,
  city_id: Number(params.city_id),
  adults: Number(params.adults ?? 0),
  children: Number(params.children ?? 0),
  room: Number(params.room ?? 1),
  checkin: params.checkin,
  checkout: params.checkout,
});
