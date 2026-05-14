import { RoomDetailHeader } from "@/components/detail/RoomDetailHeader";
import { useGetDetailRoom } from "@/hooks/queries/useGetDetailRoom";
import { commonStyles } from "@/src/style/common";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RoomDetail() {
  const rawParams = useLocalSearchParams();
  const roomId = Number(rawParams.id);
  const checkin = rawParams.checkin as string;
  const checkout = rawParams.checkout as string;
  const { data: result } = useGetDetailRoom({
    roomId: roomId,
    params: {
      checkin: checkin,
      checkout: checkout,
    },
  });
  if (!roomId) return <Text>Mã phòng không hợp lệ</Text>;
  if (!result) return <Text>Đang tải...</Text>;

  return (
    <View style={[commonStyles.container]}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <RoomDetailHeader
          room={result.room}
          amenities={result.amenities}
          available={result.available}
          reviews={result.reviews}
          dateRange={{
            checkin,
            checkout,
          }}
        />
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() => {
              router.push({
                pathname: "/booking/BookingScreen",
                params: {
                  room_id: result.room.roomId,
                  checkin: rawParams?.checkin ?? "",
                  checkout: rawParams?.checkout ?? "",
                },
              });
            }}
          >
            <Text style={styles.buttonText}>Đặt ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bookingButton: {
    backgroundColor: "#2b4785",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
