import { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";

type Props = TextInputProps & {
  leftIcon?: string;
  isPassword?: boolean;
};

export default function Input({
  leftIcon,
  isPassword,
  secureTextEntry,
  ...props
}: Props) {
  const [show, setShow] = useState(false);

  const isSecure = isPassword ? !show : secureTextEntry;

  return (
    <TextInput
      mode="outlined"
      style={{ fontSize: 15, borderRadius: 10 }}
      theme={{
        colors: {
          primary: "#333",
          text: "#333",
          placeholder: "#999",
        },
      }}
      secureTextEntry={isSecure}
      left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
      right={
        isPassword ? (
          <TextInput.Icon
            icon={show ? "eye-off" : "eye"}
            onPress={() => setShow(!show)}
          />
        ) : undefined
      }
      {...props}
    />
  );
}
