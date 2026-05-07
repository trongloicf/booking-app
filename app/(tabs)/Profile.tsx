import { commonStyles } from "@/src/style/common";
import { router, useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[commonStyles.container, { paddingTop: insets.top }]}>
      <View style={commonStyles.extendScreen}>
        {/* <Text variant="titleLarge">Thông tin cá nhân</Text>
        <Avatar.Text
          size={64}
          label="HT"
          color="#fff"
          style={[
            commonStyles.mt20,
            commonStyles.bgPrimary,
            commonStyles.avatar,
          ]}
        /> */}
        {/* <Card style={commonStyles.mt20}>
        <Card.Title title="Phòng Deluxe" />
        <Card.Content>
          <Text>Giá: 500k / đêm</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained">Đặt ngay</Button>
        </Card.Actions>
      </Card> */}
        <View
          style={[
            commonStyles.column,
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Button
            mode="contained"
            onPress={() => {
              router.push({
                pathname: "/(auth)/Login",
              });
            }}
          >
            Đăng nhập
          </Button>
        </View>
      </View>
    </View>
  );
}
