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
  onSelectRoom,
  dateRange,
}: {
  dateRange?: DateRange;
  item: RoomFacility;
  onSelectRoom: (room: RoomFacility) => void;
  onPress: () => void;
}) => {
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

          <View style={[styles.content]}>
            <Card.Content style={{ paddingLeft: 8, paddingRight: 0 }}>
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
              <View style={[styles.infoRow]}>
                <Icon source="bed-empty" size={16} />
                <Text variant="bodyMedium" numberOfLines={1}>
                  {item.bedName}
                </Text>
                <Icon source="home-switch" size={16} />
                <Text variant="bodyMedium" numberOfLines={1}>
                  {item.roomArea} m²
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
            <Card.Actions style={{ paddingHorizontal: 0, paddingRight: 8 }}>
              <Button
                style={[commonStyles.bgPrimary]}
                onPress={() => onSelectRoom(item)}
              >
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
