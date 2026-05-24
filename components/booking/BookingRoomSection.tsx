import { bookingStyles } from "@/app/booking/BookingScreen";
import { SelectedRoom } from "@/app/detail/FacilityDetail";
import { commonStyles } from "@/src/style/common";
import { formatVND } from "@/utils/format";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { styles } from "../card/CardHorizontal";

export const BookingRoomSection = ({ rooms }: { rooms: SelectedRoom[] }) => {
  if (!rooms.length) return;
  return (
    <View style={bookingStyles.headerRow}>
      <View style={[commonStyles.column, { gap: 5 }]}>
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
