import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

type PaymentMethod = "MOMO" | "CASH";

export const BookingMethodSection = () => {
  const [checked, setChecked] = useState<PaymentMethod>("CASH");

  return (
    <Card style={styles.card}>
      <Card.Content style={{ padding: 5 }}>
        <Text variant="titleMedium" style={styles.title}>
          Chọn phương thức thanh toán
        </Text>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => setChecked("CASH")}
        >
          <View>
            <Text variant="bodyLarge" style={styles.methodLabel}>
              Thanh toán tại cơ sở
            </Text>
          </View>
          <IconButton
            icon={checked === "CASH" ? "radiobox-marked" : "radiobox-blank"}
            size={20}
            iconColor={checked === "CASH" ? "#000" : "#999"}
            style={{ margin: 0 }}
            onPress={() => setChecked("CASH")}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => setChecked("MOMO")}
        >
          <View>
            <Text variant="bodyLarge" style={styles.methodLabel}>
              Thanh toán bằng ví điện tử MoMo
            </Text>
          </View>
          <IconButton
            icon={checked === "MOMO" ? "radiobox-marked" : "radiobox-blank"}
            size={20}
            iconColor={checked === "MOMO" ? "#000" : "#ccc"}
            style={{ margin: 0 }}
            onPress={() => setChecked("MOMO")}
          />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 12,
  },
  title: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMock: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  methodLabel: {
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: "#1a1a1a",
    alignSelf: "flex-end",
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  nextButtonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 4,
  },
});
