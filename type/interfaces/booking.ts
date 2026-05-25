export interface BookingDetailItem {
  bookingDetailId: number;
  roomName: string;
  customerId: number;
  hostId: number;
  totalPrice: number;
  pricePerNight: number;
  quantity: number;
  nights: number;
  facilityName: string;
  facilityAddress: string;
  roomThumbnail: string;
  roomTypeName: string;
  bedName: string;
}

export interface Booking {
  booking_id: number;
  booking_code: string;
  facility_id: number;
  facility_name: string;
  checkin_date: string;
  checkout_date: string;
  customer_id: number;
  user_name: string;
  contact_name: string;
  contact_phone: string;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "CHECKED_IN"
    | "CHECKED_OUT"
    | "COMPLETED"
    | "CANCELLED";
  total_price: number;
  created_at: string;
}

export interface ParamsGetBooking {
  page: number;
  limit: number;
  status?: string;
}
