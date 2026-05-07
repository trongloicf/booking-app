import { City } from "@/type/city";
import { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Menu, TextInput } from "react-native-paper";

export const CityPicker = ({
  value,
  onChange,
  cities,
}: {
  value?: number;
  onChange: (cityId: number) => void;
  cities: City[];
}) => {
  const [visible, setVisible] = useState(false);
  const cityMap = useMemo(() => {
    const map: Record<number, string> = {};
    cities.forEach((c) => {
      map[c.cityId] = c.cityName;
    });
    return map;
  }, [cities]);
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)}>
          <TextInput
            label="Thành phố"
            mode="outlined"
            value={value ? cityMap[value] : ""}
            editable={false}
            pointerEvents="none"
            left={<TextInput.Icon icon="map-marker" />}
            right={<TextInput.Icon icon="menu-down" />}
          />
        </TouchableOpacity>
      }
    >
      <ScrollView style={{ maxHeight: 250 }}>
        {cities.map((item, index) => (
          <Menu.Item
            key={index}
            title={item.cityName}
            onPress={() => {
              onChange(item.cityId);
              setVisible(false);
            }}
          />
        ))}
      </ScrollView>
    </Menu>
  );
};
