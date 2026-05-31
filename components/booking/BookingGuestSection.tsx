import { commonStyles } from "@/src/style/common";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export interface BookingGuestProps {
  adults: number;
  childrens: number;
  onChange: () => void;
}

export const BookingGuestSection = ({
  adults,
  childrens,
  onChange,
}: BookingGuestProps) => (
  <View style={[bookingStyles.dateRow, bookingStyles.spaceBlock]}>
    <View style={commonStyles.column}>
      <Text variant="bodyMedium">Số lượng khách</Text>
      <Text variant="bodySmall" style={bookingStyles.dateText}>
        {adults} người lớn
        {childrens > 0 && <Text variant="bodySmall">, {childrens} trẻ em</Text>}
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
