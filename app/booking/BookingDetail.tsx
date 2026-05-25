import { BookingDetailHorizontal } from "@/components/card/BookingDetailHorizontal";
import { useGetDetailBooking } from "@/hooks/queries/useGetDetailBooking";
import { commonStyles } from "@/src/style/common";
import { BookingDetailItem } from "@/type/interfaces/booking";
import { formatDateVN, formatVND } from "@/utils/format";
import { getStatusInfo } from "@/utils/renderStatusEngtoVN";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export default function BookingDetail() {
  const { bookingId } = useLocalSearchParams();
  const { data, isLoading, error } = useGetDetailBooking(Number(bookingId));
  if (isLoading) return <ActivityIndicator animating={true} color="#ccc" />;
  if (error) return <Text>Đã có lỗi xảy ra khi load đơn</Text>;
  if (!data) return null;
  const booking = data.data.booking;
  const bookingDetail = data.data.details;
  const status = getStatusInfo(booking.status);
  const canCancel = () => {
    if (booking.status === "PENDING") return true;
    if (booking.status === "CONFIRMED") {
      const now = new Date();
      const checkin = new Date(booking.checkin_date);
      return now < checkin;
    }
    return false;
  };
  return (
    <ScrollView style={{ flex: 1, padding: 8, backgroundColor: "#fff" }}>
      <View
        style={[
          commonStyles.row,
          { justifyContent: "space-between", alignContent: "center" },
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
      <View style={{ marginBottom: 8 }}>
        <Text variant="titleMedium">{booking.facilityName}</Text>
      </View>
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
      <View style={{ flexDirection: "row", gap: 10 }}>
        {booking.status === "PENDING" && (
          <>
            <Button
              mode="outlined"
              //   onPress={() => {
              //     router.push({
              //       pathname: "/booking/edit",
              //       params: { booking: JSON.stringify(data) },
              //     });
              //   }}
            >
              Sửa
            </Button>

            <Button
              mode="contained"
              onPress={() => {
                console.log("Cancel booking");
              }}
            >
              Huỷ
            </Button>
          </>
        )}

        {canCancel() && (
          <Button
            mode="contained"
            onPress={() => {
              console.log("Cancel booking");
            }}
          >
            Huỷ
          </Button>
        )}
      </View>
    </ScrollView>
  );
}
