import { showMessage } from "react-native-flash-message";

export const showSuccess = (msg: string) => {
  showMessage({
    message: "Thành công",
    description: msg,
    type: "success",
  });
};

export const showError = (msg: string) => {
  showMessage({
    message: "Lỗi",
    description: msg,
    type: "danger",
  });
};
