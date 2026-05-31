import { SelectedRoom } from "@/app/detail/FacilityDetail";
import { commonStyles } from "@/src/style/common";
import { formatVND } from "@/utils/format";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { styles } from "../card/CardHorizontal";

export const BookingRoomSection = ({ rooms }: { rooms: SelectedRoom[] }) => {
  return (
    <View style={bookingStyles.headerRow}>
      <View style={[commonStyles.column, { gap: 5, flex: 1 }]}>
        {rooms.map((room) => {
          return (
            <View style={commonStyles.row} key={room.roomId}>
              <View style={styles.imageContainer}>
                <Card.Cover
                  source={{ uri: room.roomThumbnail }}
                  style={[styles.cover, { height: 100, borderRadius: 12 }]}
                />
              </View>
              <View style={bookingStyles.infoContainer}>
                <Card.Content>
                  <Text variant="bodyMedium" style={styles.name}>
                    x{room.quantity} {room.roomName}
                  </Text>
                  <Text variant="bodySmall">
                    {room.facilityName} - {room.facilityAddress}
                  </Text>
                  <Text variant="bodyMedium" numberOfLines={1}>
                    Giá:{" "}
                    <Text style={commonStyles.priceColor}>
                      {formatVND(Number(room.price))}
                    </Text>
                    <Text style={commonStyles.textColorPrimary}>/ đêm</Text>
                  </Text>
                </Card.Content>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const bookingStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "column",
    padding: 5,
  },
  infoContainer: {
    flex: 3,
    justifyContent: "center",
  },
  cover: {
    borderRadius: 12,
  },
  dateSection: {
    ...commonStyles.column,
    padding: 5,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  dateText: {
    color: "#222",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  centerText: {
    textAlign: "center",
    marginTop: 20,
  },
  spaceBlock: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});
