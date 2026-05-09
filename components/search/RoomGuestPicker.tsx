import { RoomGuestSearch } from "@/type/interfaces/params";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
    Button,
    Divider,
    IconButton,
    Modal,
    Portal,
    Text,
    TextInput,
} from "react-native-paper";

export const RoomGuestPicker = ({
  value,
  onChange,
}: {
  value: RoomGuestSearch;
  onChange: (form: RoomGuestSearch) => void;
}) => {
  const [visible, setVisible] = useState(false);

  const [tempValue, setTempValue] = useState<RoomGuestSearch>(value);

  useEffect(() => {
    if (visible) setTempValue(value);
  }, [visible, value]);

  const updateCount = (key: keyof RoomGuestSearch, step: number) => {
    setTempValue((prev) => {
      const newValue = prev[key] + step;
      if (key === "children" && newValue < 0) return prev;
      if ((key === "room" || key === "adults") && newValue < 1) return prev;
      return { ...prev, [key]: newValue };
    });
  };

  const renderPickerRow = (
    label: string,
    subLabel: string,
    key: keyof RoomGuestSearch,
  ) => (
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
          icon="minus-circle-outline"
          size={28}
          iconColor="#2b4785"
          onPress={() => updateCount(key, -1)}
        />
        <Text style={styles.countText}>{tempValue[key]}</Text>
        <IconButton
          icon="plus-circle-outline"
          size={28}
          iconColor="#2b4785"
          onPress={() => updateCount(key, 1)}
        />
      </View>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <TextInput
          label="Số lượng phòng & khách"
          mode="outlined"
          value={`${value.room} phòng • ${value.adults} người lớn • ${value.children} trẻ em`}
          editable={false}
          pointerEvents="none"
          left={<TextInput.Icon icon="account-group" />}
        />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Số lượng khách
          </Text>

          {renderPickerRow("Số phòng", "", "room")}
          <Divider style={styles.divider} />

          {renderPickerRow("Người lớn", "Từ 13 tuổi trở lên", "adults")}
          <Divider style={styles.divider} />

          {renderPickerRow("Trẻ em", "0 - 12 tuổi", "children")}

          <Button
            mode="contained"
            style={styles.applyButton}
            onPress={() => {
              onChange(tempValue);
              setVisible(false);
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
