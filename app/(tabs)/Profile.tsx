import { NoLogin } from "@/components/auth/NoLogin";
import { InputContact } from "@/components/booking/BookingContactSection";
import { useAuthUser } from "@/hooks/custom/useAuthUser";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { commonStyles } from "@/src/style/common";
import { storage } from "@/utils/authWrapper";
import { showSuccess } from "@/utils/toast";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, isAuthenticated } = useAuthUser();
  const userId = user?.user_id ? Number(user.user_id) : null;
  const { data: profile } = useGetProfile(userId);

  const handleLogout = async () => {
    await storage.clear();
    router.push({
      pathname: "/(auth)/Login",
    });
  };

  if (!isAuthenticated || !user) {
    return (
      <NoLogin title="Vui lòng đăng nhập để xem thông tin cá nhân của bạn" />
    );
  }

  return (
    <View style={[commonStyles.container, { paddingTop: insets.top }]}>
      <View style={commonStyles.extendScreen}>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          Thông tin cá nhân
        </Text>
        <View style={[commonStyles.column, { gap: 5 }]}>
          <InputContact
            title="Tên hiển thị"
            value={profile?.user_name || user?.user_name || "Tên người dùng"}
          />
          <InputContact
            title="Email"
            value={profile?.user_email || "email@example.com"}
          />
        </View>
        <View style={[commonStyles.column, { gap: 10, marginTop: 20 }]}>
          <Button
            style={commonStyles.bgPrimary}
            mode="contained"
            onPress={() => {
              showSuccess("Tính năng đang được phát triển");
            }}
          >
            Cập nhật thông tin
          </Button>
          <Button
            style={commonStyles.bgPrimary}
            mode="contained"
            onPress={() => {
              router.push({
                pathname: "/subScreen/RegisterHost",
                params: { userId: user?.user_id },
              });
            }}
          >
            Đăng ký làm chủ cơ sở
          </Button>
          <Button
            style={commonStyles.bgPrimary}
            mode="contained"
            onPress={handleLogout}
          >
            Đăng xuất
          </Button>
        </View>
      </View>
    </View>
  );
}
