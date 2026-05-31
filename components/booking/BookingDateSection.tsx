import { commonStyles } from "@/src/style/common";
import { formatDateVN } from "@/utils/format";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export const BookingDateSection = ({
  nights,
  checkin,
  checkout,
  onChange,
}: {
  nights: number;
  checkin: string;
  checkout: string;
  onChange: () => void;
}) => (
  <View style={[bookingStyles.dateRow, bookingStyles.spaceBlock]}>
    <View style={commonStyles.column}>
      <Text variant="bodyMedium">Ngày nhận phòng - trả phòng</Text>
      <Text variant="bodySmall" style={bookingStyles.dateText}>
        {formatDateVN(checkin)} → {formatDateVN(checkout)} ({nights} đêm)
      </Text>
    </View>
    <Card.Actions style={{ padding: 0 }}>
      <Button
        mode="contained"
        style={[commonStyles.bgPrimary, { margin: 0 }]}
        onPress={onChange}
      >
        <Text variant="bodySmall" style={[commonStyles.textWhite]}>
          Thay đổi
        </Text>
      </Button>
    </Card.Actions>
  </View>
);

export const bookingStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
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
