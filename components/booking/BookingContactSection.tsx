import { commonStyles } from "@/src/style/common";
import { View } from "react-native";
import { Text, TextInput, TextInputProps } from "react-native-paper";

interface BookingInfo {
  name: string;
  phone: string;
}

interface BookingContactProps {
  value: BookingInfo;
  onChange: (value: BookingInfo) => void;
}

export const BookingContactSection = ({
  value,
  onChange,
}: BookingContactProps) => {
  const handleChange = (field: keyof BookingInfo, text: string) => {
    onChange({
      ...value,
      [field]: text,
    });
  };
  return (
    <View style={[commonStyles.column, { gap: 5, padding: 8 }]}>
      <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
        Thông tin cơ bản
      </Text>
      <InputContact
        title="Tên người liên hệ"
        placeholder="Tên người liên hệ"
        value={value.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <InputContact
        title="Số điện thoại"
        placeholder="Số điện thoại"
        value={value.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />
    </View>
  );
};

type InputProps = TextInputProps & {
  title: string;
  leftIcon?: string;
};

export const InputContact = ({ title, leftIcon, ...props }: InputProps) => {
  return (
    <View style={[commonStyles.column, { gap: 2 }]}>
      <Text variant="bodyMedium">
        {title}
        <Text style={{ color: "red" }}>*</Text>
      </Text>
      <TextInput
        mode="outlined"
        style={{ fontSize: 15, borderRadius: 10, height: 40 }}
        theme={{
          colors: {
            primary: "#333",
            text: "#333",
            placeholder: "#999",
          },
        }}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
        {...props}
      />
    </View>
  );
};
