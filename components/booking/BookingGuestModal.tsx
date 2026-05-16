import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
} from "react-native-paper";

export interface BookingGuestValue {
  adults: number;
  children: number;
}

export interface BookingGuestConstraints {
  maxAdults: number;
  maxChildren: number;
  maxOccupancy: number;
}

export interface BookingGuestModalProps {
  visible: boolean;
  value: BookingGuestValue;
  constraints: BookingGuestConstraints;
  onClose: () => void;
  onSave: (guest: BookingGuestValue) => void;
}

export const BookingRGuestModal = ({
  visible,
  value,
  constraints,
  onClose,
  onSave,
}: BookingGuestModalProps) => {
  const [tempValue, setTempValue] = useState<BookingGuestValue>(value);
  const { maxAdults, maxChildren, maxOccupancy } = constraints;

  useEffect(() => {
    setTempValue(value);
  }, [value, visible]);

  const renderPickerRow = (
    label: string,
    subLabel: string,
    field: "adults" | "children",
  ) => {
    const isPlusDisabled =
      tempValue.adults + tempValue.children >= maxOccupancy ||
      (field === "adults" && tempValue.adults >= maxAdults) ||
      (field === "children" && tempValue.children >= maxChildren);
    const isMinusDisabled =
      (field === "adults" && tempValue.adults <= 1) ||
      (field === "children" && tempValue.children <= 0);
    return (
      <View style={styles.rowItem}>
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={{ fontWeight: "600" }}>
            {label}
          </Text>
          {subLabel ? (
            <Text variant="bodySmall" style={{ color: "#666" }}>
              {subLabel}
            </Text>
          ) : null}
        </View>
        <View style={styles.counterContainer}>
          <IconButton
            disabled={isMinusDisabled}
            icon="minus-circle-outline"
            size={28}
            iconColor="#2b4785"
            onPress={() =>
              setTempValue((prev) => ({
                ...prev,
                [field]: Math.max(field === "adults" ? 1 : 0, prev[field] - 1),
              }))
            }
          />
          <Text style={styles.countText}>{tempValue[field]}</Text>
          <IconButton
            disabled={isPlusDisabled}
            icon="plus-circle-outline"
            size={28}
            iconColor="#2b4785"
            onPress={() =>
              setTempValue((prev) => {
                const total = prev.adults + prev.children;
                if (total >= maxOccupancy) return prev;
                if (field === "adults" && prev.adults >= maxAdults) return prev;
                if (field === "children" && prev.children >= maxChildren)
                  return prev;

                return {
                  ...prev,
                  [field]: prev[field] + 1,
                };
              })
            }
          />
        </View>
      </View>
    );
  };
  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={onClose}
          contentContainerStyle={styles.modalContainer}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Số lượng khách
          </Text>
          {renderPickerRow("Người lớn", "Từ 13 tuổi trở lên", "adults")}
          <Divider style={styles.divider} />
          {renderPickerRow("Trẻ em", "0 - 12 tuổi", "children")}
          <Button
            mode="contained"
            style={styles.applyButton}
            onPress={() => {
              onSave(tempValue);
              onClose();
            }}
          >
            Áp dụng
          </Button>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    padding: 24,
    borderRadius: 16,
  },
  modalTitle: {
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 18,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
  },
  divider: {
    marginVertical: 8,
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  applyButton: {
    marginTop: 24,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#2b4785",
  },
});
