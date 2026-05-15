import { SearchForm } from "@/type/interfaces/params";

export const getQueryParams = (form: SearchForm) => ({
  checkin: form.dateRange.checkin,
  checkout: form.dateRange.checkout,
  adults: form.quantityPerson.adults,
  children: form.quantityPerson.children,
  room: form.quantityPerson.room,
});
