import { commonStyles } from "@/src/style/common";
import { Policy } from "@/type/interfaces/facility";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export const PolicySection = ({ policy }: { policy: Policy }) => {
  if (!policy) {
    return (
      <View style={styles.sectionWrapper}>
        <ActivityIndicator animating={true} color="#ccc" />
      </View>
    );
  }
  return (
    <View style={styles.sectionWrapper}>
      <Text style={styles.sectionTitle}>Chính sách cơ sở</Text>
      <View style={[commonStyles.column]}>
        <Text>Chính sách hủy: {policy.cancelPolicy}</Text>
        <Text>
          Nhận phòng trước {policy.checkinTime} - Trả phòng trước{" "}
          {policy.checkoutTime}
        </Text>
        <Text>
          {policy.smokingAllowed
            ? "Cho phép hút thuốc"
            : "Không cho phép hút thuốc"}
        </Text>
        <Text>
          {policy.petAllowed ? "Cho phép thú cưng" : "Không cho phép thú cưng"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 5,
    borderTopColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 5,
  },
});
