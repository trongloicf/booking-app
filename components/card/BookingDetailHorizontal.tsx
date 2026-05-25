import { commonStyles } from "@/src/style/common";
import { BookingDetailItem } from "@/type/interfaces/booking";
import { formatVND } from "@/utils/format";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { styles } from "./CardHorizontal";

export const BookingDetailHorizontal = ({
  item,
  onPress,
}: {
  item: BookingDetailItem;
  onPress?: () => void;
}) => {
  return (
    <Card style={[styles.card, { margin: 0 }]} onPress={onPress}>
      <View style={styles.containerInner}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: item.roomThumbnail }}
              style={styles.cover}
            />
          </View>

          <View style={[styles.content, { justifyContent: "flex-start" }]}>
            <Card.Content style={styles.cardContent}>
              <Text variant="bodyLarge" style={styles.name}>
                (x{item.quantity}) {item.roomName}
              </Text>
              <View>
                <Text>Loại phòng: {item.roomTypeName}</Text>
                <Text>Loại giường: {item.bedName}</Text>
              </View>
              <View>
                <Text variant="bodyMedium" numberOfLines={1}>
                  Giá:{" "}
                  <Text style={[commonStyles.priceColor]}>
                    {formatVND(Number(item.pricePerNight))}
                  </Text>
                  <Text style={[commonStyles.textColorPrimary]}>/ đêm</Text>
                </Text>
              </View>
            </Card.Content>
          </View>
        </View>
      </View>
    </Card>
  );
};

const roomHorizontal = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
});
