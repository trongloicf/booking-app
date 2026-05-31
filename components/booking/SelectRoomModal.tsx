import { SelectedRoom } from "@/app/detail/FacilityDetail";
import { roomDetailStyles } from "@/app/detail/RoomDetail";
import { commonStyles } from "@/src/style/common";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export interface SelectRoomModalProps {
  rooms: SelectedRoom[];
  onClose: () => void;
  onBooking: () => void;
}

export const SelectRoomModal = ({
  rooms,
  onClose,
  onBooking,
}: SelectRoomModalProps) => {
  if (!rooms.length) return null;
  return (
    <View style={[roomDetailStyles.footerContainer, { flex: 1 }]}>
      {rooms.map((room) => (
        <View key={room.roomId} style={[commonStyles.row, styles.setRow]}>
          <Text>
            (x{room.quantity}) {room.roomName}
          </Text>
          <TouchableOpacity style={styles.btnClose}>
            <Text style={{ color: "333" }}>x</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={[commonStyles.row, { gap: 5 }]}>
        <TouchableOpacity
          style={[
            roomDetailStyles.bookingButton,
            { flex: 1 / 2, backgroundColor: "#ddd" },
          ]}
          onPress={onClose}
        >
          <Text style={[roomDetailStyles.buttonText, { color: "#333" }]}>
            Hủy chọn
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[roomDetailStyles.bookingButton, { flex: 1 }]}
          onPress={onBooking}
        >
          <Text style={roomDetailStyles.buttonText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnClose: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    maxWidth: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  setRow: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
