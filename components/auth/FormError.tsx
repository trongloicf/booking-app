import { Text } from "react-native-paper";

export const FormError = ({ error }: { error?: any }) => {
  if (!error) return null;

  return <Text style={{ color: "red" }}>{error.message}</Text>;
};
