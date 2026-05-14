import { commonStyles } from "@/src/style/common";
import { DateRange } from "@/type/interfaces/params";
import { RoomFacility } from "@/type/interfaces/room";
import { formatVND } from "@/utils/format";
import { StyleSheet, View } from "react-native";
import { Button, Card, Icon, Text } from "react-native-paper";
import { styles } from "./CardHorizontal";

export const RoomHorizontal = ({
  item,
  onPress,
  dateRange,
}: {
  dateRange?: DateRange;
  item: RoomFacility;
  onPress: () => void;
}) => {
  console.log("daterange from fa -> rom hor", dateRange);
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.containerInner}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: item.roomThumbnail }}
              style={styles.cover}
            />
          </View>

          <View style={styles.content}>
            <Card.Content style={styles.cardContent}>
              <Text variant="bodyLarge" style={styles.name}>
                {item.roomName}
              </Text>
              <View style={[styles.infoRow]}>
                <Icon source="account" size={14} />
                <Text variant="bodyMedium" numberOfLines={1}>
                  {item.maxAdults} người lớn
                  {item.maxChildren > 0 && (
                    <Text variant="bodyMedium">
                      , {item.maxChildren} trẻ em
                    </Text>
                  )}
                </Text>
              </View>
              <View>
                <Text variant="bodyMedium" numberOfLines={1}>
                  Giá:{" "}
                  <Text style={[commonStyles.priceColor]}>
                    {formatVND(Number(item.price))}
                  </Text>
                  <Text style={[commonStyles.textColorPrimary]}>/ đêm</Text>
                </Text>
              </View>
              {item.availableQuantity && (
                <Text style={{ color: "red" }}>
                  Còn {item.availableQuantity} phòng trống
                </Text>
              )}
            </Card.Content>
            <Card.Actions>
              <Button style={[commonStyles.bgPrimary]} onPress={onPress}>
                <Text style={commonStyles.textWhite}>Chọn phòng</Text>
              </Button>
            </Card.Actions>
          </View>
        </View>
      </View>
    </Card>
  );
};

const roomHorizontal = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
});
