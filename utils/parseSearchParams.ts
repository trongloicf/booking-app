import { SearchParams } from "@/type/interfaces/params";

export const parseSearchParams = (params: any): SearchParams => ({
  keyword: params.keyword?.trim() || undefined,
  city_id: Number(params.city_id),
  adults: Number(params.adults ?? 2),
  children: Number(params.children ?? 0),
  room: Number(params.room ?? 1),
  checkin: params.checkin,
  checkout: params.checkout,
});

export const parseDetailParams = (params: any): SearchParams => ({
  adults: Number(params.adults ?? 2),
  children: Number(params.children ?? 0),
  room: Number(params.room ?? 1),
  checkin: params.checkin,
  checkout: params.checkout,
});

export const parseDateRangeParams = (params: any): SearchParams => ({
  checkin: params.checkin,
  checkout: params.checkout,
});
