import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { City } from "@/type/interfaces/city";
import { SearchForm } from "@/type/interfaces/search";
import { CityPicker } from "./CityPicker";
import { DateRangePicker } from "./DateRangePicker";
import { RoomGuestPicker } from "./RoomGuestPicker";

export default function SearchBox({
  onSearch,
  cities,
  form,
  onChange,
}: {
  form: SearchForm;
  onChange: <K extends keyof SearchForm>(key: K, value: SearchForm[K]) => void;
  onSearch?: (data: SearchForm) => void;
  cities: City[];
}) {
  return (
    <View style={{ gap: 5, backgroundColor: "#fff", paddingBottom: 15 }}>
      <TextInput
        label="Tìm cơ sở"
        mode="outlined"
        value={form.keyword}
        onChangeText={(text) => onChange("keyword", text)}
        left={<TextInput.Icon icon="magnify" />}
      />

      <CityPicker
        value={form.city_id}
        onChange={(city) => onChange("city_id", city)}
        cities={cities}
      />

      <DateRangePicker
        value={form.dateRange}
        onChange={(dateRange) => onChange("dateRange", dateRange)}
      />

      <RoomGuestPicker
        value={form.quantityPerson}
        onChange={(quantityPerson) =>
          onChange("quantityPerson", quantityPerson)
        }
      />
      <View style={{ marginBottom: 5 }}></View>
      <Button
        mode="contained"
        contentStyle={{ backgroundColor: "#264C86" }}
        onPress={() => onSearch && onSearch(form)}
      >
        Tìm kiếm
      </Button>
    </View>
  );
}
