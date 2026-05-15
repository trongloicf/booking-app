import { commonStyles } from "@/src/style/common";
import { DateRange } from "@/type/interfaces/params";
import { formatDateVN } from "@/utils/format";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

export const DateRangePicker = ({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (dateRange: DateRange) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const getMarkedDates = () => {
    const marked: any = {};
    if (value.checkin) {
      marked[value.checkin] = {
        startingDay: true,
        color: "#2b4785",
        textColor: "white",
      };
    }
    if (value.checkout) {
      marked[value.checkout] = {
        endingDay: true,
        color: "#2b4785",
        textColor: "white",
      };

      let start = new Date(value.checkin);
      let end = new Date(value.checkout);
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

  const handleSave = () => {
    onChange(value);
    setVisible(false);
  };
  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <TextInput
          label="Ngày nhận phòng - trả phòng"
          mode="outlined"
          value={
            value.checkin
              ? `${formatDateVN(value.checkin)} → ${
                  value.checkout ? formatDateVN(value.checkout) : "..."
                }`
              : ""
          }
          editable={false}
          pointerEvents="none"
          left={<TextInput.Icon icon="calendar" />}
        />
      </TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            margin: 20,
            padding: 20,
            borderRadius: 12,
          }}
        >
          <View style={[commonStyles.row, commonStyles.gap5]}>
            <Text>
              Nhận phòng: {formatDateVN(value.checkin) || "Chưa chọn"}
            </Text>
            <Text>-</Text>
            <Text>
              Trả phòng: {formatDateVN(value.checkout) || "Chưa chọn"}
            </Text>
          </View>

          <Calendar
            minDate={today}
            markingType={"period"}
            markedDates={getMarkedDates()}
            monthFormat={"MM/yyyy"}
            enableSwipeMonths
            hideExtraDays={false}
            onDayPress={(day) => {
              if (!value.checkin || value.checkout) {
                onChange({
                  checkin: day.dateString,
                  checkout: "",
                });
              } else {
                if (day.dateString < value.checkin) {
                  onChange({
                    checkin: day.dateString,
                    checkout: "",
                  });
                } else {
                  onChange({
                    ...value,
                    checkout: day.dateString,
                  });
                }
              }
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button onPress={() => setVisible(false)}>Hủy</Button>
            <Button
              mode="contained"
              disabled={!value.checkout}
              onPress={handleSave}
              style={{ marginLeft: 10, backgroundColor: "#2b4785" }}
            >
              Cập nhật
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
};
