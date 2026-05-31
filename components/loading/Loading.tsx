import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-paper";

export const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} color="#ccc" size="large" />
      <Text style={{ marginTop: 10, color: "#666" }}>Đang tải...</Text>
    </View>
  );
};
