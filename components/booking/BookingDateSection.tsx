import { bookingStyles } from "@/app/booking/BookingScreen";
import { commonStyles } from "@/src/style/common";
import { formatDateVN } from "@/utils/format";
import { View } from "react-native";
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
