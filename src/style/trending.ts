import { StyleSheet } from "react-native";

export const trendingStyles = StyleSheet.create({
  inputSearch: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderRadius: 8,
    height: 45,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchButton: {
    margin: 0,
    width: 50,
    height: 45,
    backgroundColor: "#264C86",
    borderRadius: 8,
  },
  listContainer: {
    flexDirection: "column",
    gap: 15,
    paddingBottom: 5,
  },
});
