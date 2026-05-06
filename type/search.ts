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
  city: number;
  dateRange: DateRange;
  quantityPerson: RoomGuestSearch;
};
