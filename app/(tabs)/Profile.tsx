import { InputContact } from "@/components/booking/BookingContactSection";
import { useAuthUser } from "@/hooks/custom/useAuthUser";
import { commonStyles } from "@/src/style/common";
import { storage } from "@/utils/authWrapper";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated } = useAuthUser();
  const handleLogout = async () => {
    await storage.clear();
    router.push({
      pathname: "/(auth)/Login",
    });
  };
  return (
    <View style={[commonStyles.container, { paddingTop: insets.top }]}>
      <View style={commonStyles.extendScreen}>
        {isAuthenticated && user ? (
          <>
            <Text variant="titleLarge" style={{ textAlign: "center" }}>
              Thông tin cá nhân
            </Text>
            <View style={[commonStyles.column, { gap: 5 }]}>
              <InputContact title="Tên hiển thị" value={user.user_name} />
              <InputContact title="Email" value="email@example.com" />
              <Button
                style={commonStyles.bgPrimary}
                mode="contained"
                onPress={() => {}}
              >
                Cập nhật thông tin
              </Button>
              <Button
                style={commonStyles.bgPrimary}
                mode="contained"
                onPress={handleLogout}
              >
                Đăng xuất
              </Button>
            </View>
          </>
        ) : (
          <View style={[{ alignItems: "center" }]}>
            <Text>Bạn cần đăng nhập để xem thông tin cá nhân</Text>
            <Button
              mode="text"
              onPress={() => {
                router.push({
                  pathname: "/(auth)/Login",
                });
              }}
            >
              <Text style={commonStyles.colorPrimary}>Đăng nhập</Text>
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}
