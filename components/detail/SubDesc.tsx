import { commonStyles } from "@/src/style/common";
import { View } from "react-native";
import { Text } from "react-native-paper";

export const SubDesc = ({
  title,
  text,
  subText,
}: {
  title: string;
  text: string | number;
  subText?: string;
}) => {
  return (
    <View style={[commonStyles.row, { gap: 5 }]}>
      <Text variant="bodyMedium">{title}</Text>
      <Text variant="bodyMedium">
        {text} {subText}
      </Text>
    </View>
  );
};
