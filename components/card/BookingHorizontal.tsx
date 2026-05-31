import { commonStyles } from "@/src/style/common";
import { Booking } from "@/type/interfaces/booking";
import { formatDateVN, formatVND } from "@/utils/format";
import { getStatusInfo } from "@/utils/renderStatusEngtoVN";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { styles } from "./CardHorizontal";

export const BookingHorizontal = ({
  item,
  onPress,
}: {
  item: Booking;
  onPress?: () => void;
}) => {
  const status = getStatusInfo(item.status);
  return (
    <Card style={[styles.card, { height: 125 }]} onPress={onPress}>
      <View style={styles.containerInner}>
        <View style={styles.row}>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Card.Content style={styles.cardContent}>
              <View
                style={[styles.infoRow, { justifyContent: "space-between" }]}
              >
                <Text variant="bodyLarge" style={styles.name}>
                  {`Đơn ${item.booking_code}`}
                </Text>
                <Text
                  style={{
                    padding: 3,
                    backgroundColor: status.bg,
                    color: status.color,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                  }}
                >
                  {status.label}
                </Text>
              </View>
              <View style={[commonStyles.column]}>
                <Text variant="bodyMedium">
                  {`Ngày đặt: ${formatDateVN(item.created_at)}`}
                </Text>
                <Text variant="bodyMedium">
                  {`Ngày nhận phòng: ${formatDateVN(item.checkin_date)}`}
                </Text>
                <Text variant="bodyMedium">
                  {`Ngày trả phòng: ${formatDateVN(item.checkout_date)}`}
                </Text>
              </View>
              <View
                style={[commonStyles.row, { justifyContent: "space-between" }]}
              >
                <Text variant="bodyMedium">Tổng tiền:</Text>
                <Text
                  variant="bodyLarge"
                  style={[
                    commonStyles.priceColor,
                    { textDecorationLine: "none", color: "#333" },
                  ]}
                >
                  {formatVND(Number(item.total_price))}
                </Text>
              </View>
            </Card.Content>
            {/* <Card.Actions>
                <Button
                  style={[commonStyles.bgPrimary]}
                  onPress={() => onSelectRoom(item)}
                >
                  <Text style={commonStyles.textWhite}>Chọn phòng</Text>
                </Button>
              </Card.Actions> */}
          </View>
        </View>
      </View>
    </Card>
  );
};

const roomHorizontal = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
});
