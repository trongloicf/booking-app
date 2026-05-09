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
            markedDates={{
              [value.checkin]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
              },
              [value.checkout]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: "orange",
              },
            }}
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
                  setVisible(false);
                }
              }
            }}
          />

          <Button onPress={() => onChange({ checkin: "", checkout: "" })}>
            Đặt lại
          </Button>
        </Modal>
      </Portal>
    </>
  );
};
