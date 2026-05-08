import { FormError } from "@/components/auth/FormError";
import Input from "@/components/auth/Input";
import { useBackHome } from "@/hooks/custom/useBackHome";
import { usePostRegister } from "@/hooks/mutations/post/usePostRegister";
import { commonStyles } from "@/src/style/common";
import { RegisterForm, RegisterPayload } from "@/type/interfaces/auth";
import { registerSchema } from "@/type/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Register() {
  const insets = useSafeAreaInsets();
  const handleBack = useBackHome();
  const { mutate: register, isPending: isRegister } = usePostRegister();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = (data: RegisterForm) => {
    const payloadRegister: RegisterPayload = {
      user_name: data.name,
      user_email: data.email,
      user_pass: data.password,
    };
    register(payloadRegister);
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
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Tên hiển thị"
                  leftIcon="account"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.name && <FormError error={errors.name} />}
              </>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Email"
                  leftIcon="email-outline"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email && <FormError error={errors.email} />}
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Mật khẩu"
                  leftIcon="lock-outline"
                  isPassword
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && <FormError error={errors.password} />}
              </>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  placeholder="Xác chận mật khẩu"
                  leftIcon="lock-outline"
                  isPassword
                  value={value}
                  onChangeText={onChange}
                />
                {errors.confirmPassword && (
                  <FormError error={errors.confirmPassword} />
                )}
              </>
            )}
          />
          <Button
            mode="contained"
            contentStyle={[commonStyles.bgPrimary, { paddingVertical: 3 }]}
            onPress={handleSubmit(handleRegister)}
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
