import { showMessage } from "react-native-flash-message";

export const showSuccess = (msg: string) => {
  showMessage({
    message: "Thành công",
    description: msg,
    type: "success",
    icon: "success",
    floating: true,
    position: "top",
    style: {
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
    },
    titleStyle: {
      fontSize: 16,
      fontWeight: "600",
    },
    textStyle: {
      fontSize: 14,
    },
  });
};

export const showError = (msg: string) => {
  showMessage({
    message: "Lỗi",
    description: msg,
    type: "danger",
    icon: "danger",
    floating: true,
    position: "top",
    style: {
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
    },
    titleStyle: {
      fontSize: 16,
      fontWeight: "600",
    },
    textStyle: {
      fontSize: 14,
    },
  });
};
