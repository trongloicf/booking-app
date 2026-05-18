import { InputContact } from "@/components/booking/BookingContactSection";
import { useAuthUser } from "@/hooks/custom/useAuthUser";
import { commonStyles } from "@/src/style/common";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated } = useAuthUser();
  return (
    <View style={[commonStyles.container, { paddingTop: insets.top }]}>
      <View style={commonStyles.extendScreen}>
        {isAuthenticated && user ? (
          <>
            <Text variant="titleLarge">Thông tin cá nhân</Text>
            <View>
              <InputContact title="Tên hiển thị" value={user.user_name} />
              <InputContact title="Email" value="email@example.com" />
            </View>
          </>
        ) : (
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
        )}
      </View>
    </View>
  );
}
