import { commonStyles } from "@/src/style/common";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function Profile() {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.extendScreen}>
        <Text variant="titleLarge">Thông tin cá nhân</Text>
        <Avatar.Text
          size={64}
          label="HT"
          color="#fff"
          style={[
            commonStyles.mt20,
            commonStyles.bgPrimary,
            commonStyles.avatar,
          ]}
        />
        {/* <Card style={commonStyles.mt20}>
        <Card.Title title="Phòng Deluxe" />
        <Card.Content>
          <Text>Giá: 500k / đêm</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Đặt ngay</Button>
        </Card.Actions>
      </Card> */}
      </View>
    </View>
  );
}
