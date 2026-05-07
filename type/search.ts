export type DateRange = {
  checkin: string;
  checkout: string;
};

export interface RoomGuestSearch {
  adults: number;
  children: number;
  room: number;
}

export type SearchForm = {
  keyword?: string;
  city_id: number;
  dateRange: DateRange;
  quantityPerson: RoomGuestSearch;
};

export type SearchParams = Partial<{
  keyword?: string;
  city_id: number;
  adults: number;
  children: number;
  room: number;
  checkin: string;
  checkout: string;
}>;
