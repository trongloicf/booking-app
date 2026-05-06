import { commonStyles } from "@/src/style/common";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Booking() {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.extendScreen}>
        <View style={[commonStyles.column, commonStyles.gap5]}>
          <Text variant="titleLarge">Tất cả cơ sở</Text>
        </View>
      </View>
    </View>
  );
}
