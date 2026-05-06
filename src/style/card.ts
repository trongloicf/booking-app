import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  name: {
    color: "#333",
    fontSize: 17,
    fontWeight: "bold",
  },
  city: {
    display: "flex",
    justifyContent: "center",
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  heart: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    padding: 6,
  },
});
