import { RoomDetailHeader } from "@/components/detail/RoomDetailHeader";
import { useRoomDetailParams } from "@/hooks/custom/useRoomDetailParams";
import { useGetDetailRoom } from "@/hooks/queries/useGetDetailRoom";
import { commonStyles } from "@/src/style/common";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RoomDetail() {
  const { roomId, roomDetailData } = useRoomDetailParams();
  const { data: result } = useGetDetailRoom({
    roomId: roomId,
    params: roomDetailData,
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
            checkin: roomDetailData.checkin,
            checkout: roomDetailData.checkout,
          }}
        />
        <View style={roomDetailStyles.footerContainer}>
          <TouchableOpacity
            style={roomDetailStyles.bookingButton}
            onPress={() => {
              router.push({
                pathname: "/booking/BookingScreen",
                params: {
                  ...roomDetailData,
                  rooms: JSON.stringify([
                    {
                      roomId: result.room.roomId,
                      roomName: result.room.roomName,
                      quantity: 1,
                      roomThumbnail: result.room.roomThumbnail,
                      price: result.room.price,
                      maxAdults: result.room.maxAdults,
                      maxChildren: result.room.maxChildren,
                      facilityName: result.room.facilityName,
                      facilityAddress: result.room.facilityAddress,
                    },
                  ]),
                },
              });
            }}
          >
            <Text style={roomDetailStyles.buttonText}>Đặt ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export const roomDetailStyles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
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
