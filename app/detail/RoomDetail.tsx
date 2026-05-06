import { ROOM_MOCK } from "@/api/mock/room";
import { RoomDetailHeader } from "@/components/detail/RoomDetailHeader";
import { commonStyles } from "@/src/style/common";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RoomDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const room = ROOM_MOCK.find((r) => r.roomId.toString() === id);
  if (!room) return <Text>Không tìm thấy dữ liệu</Text>;

  return (
    <View style={[commonStyles.container]}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <RoomDetailHeader room={room} />
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() => {
              router.push({
                pathname: "/booking/BookingScreen",
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
