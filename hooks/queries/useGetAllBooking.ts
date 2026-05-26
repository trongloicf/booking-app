import { bookingService } from "@/api/services/booking.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteBooking = (
  status?: string,
  options?: { enabled?: boolean },
) => {
  return useInfiniteQuery({
    queryKey: ["get-all-booking", status],
    queryFn: ({ pageParam = 1 }) =>
      bookingService.getAllBooking({
        page: pageParam,
        limit: 5,
        status,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;

      if (page < totalPages) {
        return page + 1;
      }

      return undefined;
    },
    enabled: options?.enabled,
  });
};
