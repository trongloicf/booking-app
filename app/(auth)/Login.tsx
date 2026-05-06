import { commonStyles } from "@/src/style/common";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();
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
          <Text variant="titleLarge" style={{ marginBottom: 10 }}>
            Đăng nhập
          </Text>
          <TextInput
            mode="outlined"
            label="Email"
            style={[commonStyles.inputPrimary, { fontSize: 15 }]}
            theme={{
              colors: {
                primary: "#333",
                text: "#333",
                placeholder: "#999",
              },
            }}
          ></TextInput>
          <TextInput
            mode="outlined"
            label="Mật khẩu"
            secureTextEntry
            style={[commonStyles.inputPrimary, { fontSize: 15 }]}
            theme={{
              colors: {
                primary: "#333",
                text: "#333",
                placeholder: "#999",
              },
            }}
            right={<TextInput.Icon icon="eye" />}
          ></TextInput>
        </View>
      </View>
    </View>
  );
}
