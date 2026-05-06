import { MOCK_AMENITIES } from "@/api/mock/amenity";
import { getAmenityConfig } from "@/utils/helperIconAmenity";
import { Amenity } from "@/type/amenity";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

export const AmenityRadius = ({ amenityIds }: { amenityIds: number[] }) => {
  const displayData = MOCK_AMENITIES.filter((item) =>
    amenityIds.includes(item.amenityId),
  );

  const renderItem = ({ item }: { item: Amenity }) => {
    const config = getAmenityConfig(item.amenityName);

    return (
      <View style={styles.itemWrapper}>
        <Surface
          style={[styles.circle, { backgroundColor: "#f0f0f0" }]}
          elevation={0}
        >
          <MaterialCommunityIcons name={config.icon as any} size={24} />
        </Surface>
        <Text variant="labelSmall" style={styles.text} numberOfLines={2}>
          {item.amenityName}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={(item) => item.amenityId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, backgroundColor: "#fff" },
  itemWrapper: { alignItems: "center", width: 75, marginRight: 10 },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  text: { textAlign: "center", color: "#555" },
});
