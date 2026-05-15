import { DateRange } from "@/type/interfaces/params";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, Modal, Portal, Text } from "react-native-paper";

export interface DateRangeProps {
  visible: boolean;
  value: DateRange;
  onClose: () => void;
  onSave: (dateRange: DateRange) => void;
}

export const DateRangeModal = ({
  visible,
  value,
  onClose,
  onSave,
}: DateRangeProps) => {
  const [range, setRange] = useState<DateRange>(value);
  useEffect(() => {
    if (visible) setRange(value);
  }, [visible, value]);

  const onDayPress = (day: any) => {
    const dateString = day.dateString;

    if (!range.checkin || (range.checkin && range.checkout)) {
      setRange({ checkin: dateString, checkout: "" });
    } else if (dateString > range.checkin) {
      setRange({ ...range, checkout: dateString });
    } else {
      setRange({ checkin: dateString, checkout: "" });
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};
    if (range.checkin) {
      marked[range.checkin] = {
        startingDay: true,
        color: "#2b4785",
        textColor: "white",
      };
    }
    if (range.checkout) {
      marked[range.checkout] = {
        endingDay: true,
        color: "#2b4785",
        textColor: "white",
      };

      let start = new Date(range.checkin);
      let end = new Date(range.checkout);
      let curr = new Date(start);
      curr.setDate(curr.getDate() + 1);

      while (curr < end) {
        const dateStr = curr.toISOString().split("T")[0];
        marked[dateStr] = { color: "#e8edf6", textColor: "#2b4785" };
        curr.setDate(curr.getDate() + 1);
      }
    }
    return marked;
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <Portal>
      <Modal
        visible={visible}
        contentContainerStyle={{
          backgroundColor: "white",
          margin: 20,
          padding: 20,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Chọn ngày
        </Text>

        <Calendar
          minDate={today}
          markingType={"period"}
          current={range.checkin || undefined}
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          monthFormat="MM/yyyy"
          theme={{
            textDisabledColor: "#d9e1e8",
            todayTextColor: "#2b4785",
            arrowColor: "#2b4785",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button onPress={onClose}>Hủy</Button>
          <Button
            mode="contained"
            disabled={!range.checkout}
            onPress={() => onSave(range)}
            style={{ marginLeft: 10, backgroundColor: "#2b4785" }}
          >
            Cập nhật
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
