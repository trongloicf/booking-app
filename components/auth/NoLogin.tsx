import { commonStyles } from "@/src/style/common";
import { router } from "expo-router";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export interface NoLoginProps {
  title?: string;
}

export const NoLogin = ({ title }: NoLoginProps) => {
  return (
    <SafeAreaView style={[commonStyles.container, { padding: 8 }]}>
      <Text variant="titleMedium" style={{ textAlign: "center" }}>
        {title || "Vui lòng đăng nhập để xem nội dung này"}
      </Text>
      <Button
        mode="contained"
        style={[commonStyles.bgPrimary, { alignSelf: "center", marginTop: 10 }]}
        onPress={() => {
          router.push({
            pathname: "/(auth)/Login",
          });
        }}
      >
        <Text style={commonStyles.textWhite}>Đăng nhập</Text>
      </Button>
    </SafeAreaView>
  );
};
