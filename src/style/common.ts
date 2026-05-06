import { Dimensions, StyleSheet } from "react-native";

export const { width, height } = Dimensions.get("window");

export const commonStyles = StyleSheet.create({
  mt20: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  extendScreen: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bgPrimary: {
    backgroundColor: "#264C86",
  },
  textWhite: {
    color: "white",
  },
  colorPrimary: {
    color: "#264C86",
  },
  bgWhite: {
    backgroundColor: "white",
  },
  avatar: {
    borderRadius: 32,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  gap5: {
    gap: 5,
  },
  flex1: {
    flex: 1,
  },
  priceColor: {
    color: "#FE6730",
  },
  textColorPrimary: {
    color: "#333",
  },
});
