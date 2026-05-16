import { bookingStyles } from "@/app/booking/BookingScreen";
import { commonStyles } from "@/src/style/common";
import { RoomDetail } from "@/type/interfaces/room";
import { formatVND } from "@/utils/format";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { styles } from "../card/CardHorizontal";

export const BookingRoomSection = ({
  room,
  roomQuantity,
}: {
  room: RoomDetail;
  roomQuantity: number;
}) => {
  return (
    <View style={bookingStyles.headerRow}>
      <View style={styles.imageContainer}>
        <Card.Cover
          source={{ uri: room.roomThumbnail }}
          style={[styles.cover, { height: 100, borderRadius: 12 }]}
        />
      </View>
      <View style={bookingStyles.infoContainer}>
        <Card.Content>
          <Text variant="bodyMedium" style={styles.name}>
            x{roomQuantity} {room.roomName}
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
};
