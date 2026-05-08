import Input from "@/components/auth/Input";
import { useBackHome } from "@/hooks/custom/useBackHome";
import { usePostLogin } from "@/hooks/mutations/post/usePostLogin";
import { commonStyles } from "@/src/style/common";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
  const handleBack = useBackHome();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate: login, isPending: isLogin } = usePostLogin();

  const handleLogin = () => {
    login({
      user_email: email,
      user_pass: password,
    });
  };

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
          <Input
            placeholder="Email"
            leftIcon="email-outline"
            value={email}
            onChangeText={setEmail}
            disabled={isLogin}
          ></Input>
          <Input
            placeholder="Mật khẩu"
            leftIcon="lock-outline"
            isPassword
            value={password}
            onChangeText={setPassword}
            disabled={isLogin}
          ></Input>
          <Button
            mode="contained"
            contentStyle={[commonStyles.bgPrimary, { paddingVertical: 3 }]}
            disabled={isLogin}
            onPress={handleLogin}
          >
            Đăng nhập
          </Button>
          <Text style={{ textAlign: "center" }}>
            Bạn chưa có tài khoản?
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => router.push("/(auth)/Register")}
            >
              {" "}
              Đăng ký
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
