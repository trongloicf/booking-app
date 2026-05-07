import Input from "@/components/auth/Input";
import { useBackHome } from "@/hooks/custom/useBackHome";
import { commonStyles } from "@/src/style/common";
import { router } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Register() {
  const insets = useSafeAreaInsets();
  const handleBack = useBackHome();
  return (
    <View
      style={[
        commonStyles.container,
        commonStyles.bgWhite,
        { paddingTop: insets.top },
      ]}
    >
      <View
        style={[
          commonStyles.extendScreen,
          commonStyles.flex1,
          { justifyContent: "center" },
        ]}
      >
        <View style={[commonStyles.column, { gap: 10 }]}>
          <Text
            variant="titleLarge"
            style={{ marginBottom: 5, textAlign: "center" }}
          >
            Chào mừng trở lại!
          </Text>
          <Input placeholder="Tên hiển thị" leftIcon="account"></Input>
          <Input placeholder="Email" leftIcon="email-outline"></Input>
          <Input
            placeholder="Mật khẩu"
            leftIcon="lock-outline"
            isPassword
          ></Input>
          <Input
            placeholder="Mật khẩu"
            leftIcon="lock-outline"
            isPassword
          ></Input>
          <Button
            mode="contained"
            contentStyle={[commonStyles.bgPrimary, { paddingVertical: 3 }]}
          >
            Đăng ký
          </Button>
          <Text style={{ textAlign: "center" }}>
            Bạn đã có tài khoản?
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => router.push("/(auth)/Login")}
            >
              {" "}
              Đăng nhập
            </Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#666",
              marginTop: 10,
            }}
            onPress={handleBack}
          >
            Tiếp tục xem mà không đăng nhập
          </Text>
        </View>
      </View>
    </View>
  );
}
