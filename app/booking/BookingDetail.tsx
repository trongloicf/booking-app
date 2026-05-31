import { BOOKING_STATUS } from "@/api/constant/status";
import { BookingDetailHorizontal } from "@/components/card/BookingDetailHorizontal";
import { Loading } from "@/components/loading/Loading";
import { usePutCancelBooking } from "@/hooks/mutations/put/usePutCancelBooking";
import { useGetDetailBooking } from "@/hooks/queries/useGetDetailBooking";
import { commonStyles } from "@/src/style/common";
import { BookingDetailItem } from "@/type/interfaces/booking";
import { formatDateVN, formatVND } from "@/utils/format";
import { getStatusInfo } from "@/utils/renderStatusEngtoVN";
import { showSuccess } from "@/utils/toast";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function BookingDetail() {
  const { bookingId } = useLocalSearchParams();
  const numericBookingId = Number(bookingId);
  const { data, isLoading, error } = useGetDetailBooking(numericBookingId);
  const { mutate: cancelBooking, isPending: isCanceling } =
    usePutCancelBooking();
  if (isLoading) return <Loading />;

  if (error || !numericBookingId) {
    return (
      <View style={styles.center}>
        <Text>Đã có lỗi xảy ra khi tải thông tin đơn phòng</Text>
      </View>
    );
  }
  if (!data) return null;
  const booking = data.data.booking;
  const bookingDetail = data.data.details;
  const status = getStatusInfo(booking.status);
  const now = new Date();
  const checkinDate = new Date(booking.checkinDate);
  const canCancel =
    booking.status === BOOKING_STATUS.PENDING ||
    (booking.status === BOOKING_STATUS.CONFIRMED && checkinDate > now);
  const handleCancel = () => {
    if (!bookingId) return;
    cancelBooking(numericBookingId);
  };
  return (
    <ScrollView style={{ flex: 1, padding: 8, backgroundColor: "#fff" }}>
      <View
        style={[
          commonStyles.row,
          {
            justifyContent: "space-between",
            alignContent: "center",
            marginBottom: 8,
          },
        ]}
      >
        <Text variant="titleMedium">Mã đơn: {booking.bookingCode}</Text>
        <Text
          style={{
            padding: 3,
            backgroundColor: status.bg,
            color: status.color,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          }}
        >
          {status.label}
        </Text>
      </View>
      {/* <View style={{ marginBottom: 8 }}>
        <Text variant="titleMedium">{booking.facilityName}</Text>
      </View> */}
      <View
        style={[
          commonStyles.row,
          {
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          },
        ]}
      >
        <View>
          <Text>Tên người ở: {booking.contactName}</Text>
          <Text>SĐT: {booking.contactPhone}</Text>
        </View>
        <View>
          <Text>Check-in: {formatDateVN(booking.checkinDate)}</Text>
          <Text>Check-out: {formatDateVN(booking.checkoutDate)}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text>Thanh toán: Trả tại khách sạn</Text>
        <Text variant="titleMedium">
          Tổng tiền:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {formatVND(booking.totalPrice)}
          </Text>
        </Text>
      </View>
      <View style={[commonStyles.column, { marginBottom: 8, gap: 8 }]}>
        {bookingDetail.map((room: BookingDetailItem) => (
          <BookingDetailHorizontal item={room} key={room.bookingDetailId} />
        ))}
      </View>
      <View
        style={{ flexDirection: "row", gap: 10, justifyContent: "flex-end" }}
      >
        {booking.status === BOOKING_STATUS.PENDING && (
          <>
            <Button
              mode="contained"
              style={[commonStyles.bgPrimary]}
              disabled={isCanceling}
              onPress={handleCancel}
            >
              Huỷ
            </Button>
          </>
        )}
        {booking.status === BOOKING_STATUS.CANCELLED && (
          <Button
            mode="contained"
            style={[commonStyles.bgPrimary]}
            disabled={isCanceling}
            onPress={() => {
              showSuccess("Chức năng đặt lại đang được phát triển");
            }}
          >
            Đặt lại
          </Button>
        )}
        {booking.status === BOOKING_STATUS.CONFIRMED && (
          <Button
            mode={canCancel ? "contained" : "text"}
            style={canCancel ? [commonStyles.bgPrimary] : []}
            disabled={isCanceling || !canCancel}
            onPress={handleCancel}
          >
            <Text style={[{ color: canCancel ? "#fff" : "#ccc" }]}>
              {canCancel ? "Hủy đơn" : ""}
            </Text>
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRow: { justifyContent: "space-between", alignItems: "center" },
  infoRow: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  mb8: { marginBottom: 8 },
  listGap: { marginBottom: 8, gap: 8 },
  boldText: { fontWeight: "bold" },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    marginTop: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
});
