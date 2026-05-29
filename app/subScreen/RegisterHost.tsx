import Input from "@/components/auth/Input";
import { useAuthUser } from "@/hooks/custom/useAuthUser";
import { usePostRegisterHost } from "@/hooks/mutations/post/usePostRegisterHost";
import { commonStyles } from "@/src/style/common";
import { showError } from "@/utils/toast";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function RegisterHost() {
  const { user } = useAuthUser();
  const { mutate: registerHost, isPending } = usePostRegisterHost();
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    address: "",
    taxCode: "",
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting form with data:", formData);
    if (!user) {
      showError("Bạn cần đăng nhập trước");
      return;
    }
    if (Object.values(formData).some((val) => val.trim() === "")) {
      showError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    registerHost(formData, {
      onSuccess: () => {
        if (router.canGoBack()) {
          router.back();
        }
      },
    });
  };

  return (
    <View style={[commonStyles.container, { padding: 8 }]}>
      <Text variant="titleLarge" style={{ textAlign: "center" }}>
        Thông tin xin làm chủ cơ sở
      </Text>
      <View style={[commonStyles.column, { gap: 10, marginTop: 20 }]}>
        <Input
          label="Tên hộ kinh doanh"
          value={formData.companyName}
          onChangeText={(value) => handleChange("companyName", value)}
        />
        <Input
          label="Số điện thoại liên hệ"
          value={formData.phone}
          onChangeText={(value) => handleChange("phone", value)}
        />
        <Input
          label="Địa chỉ văn phòng đại diện"
          value={formData.address}
          onChangeText={(value) => handleChange("address", value)}
        />
        <Input
          label="MST"
          value={formData.taxCode}
          onChangeText={(value) => handleChange("taxCode", value)}
        />
      </View>
      <Button
        mode="contained"
        style={[commonStyles.bgPrimary, { marginTop: 20 }]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        Gửi yêu cầu
      </Button>
    </View>
  );
}
