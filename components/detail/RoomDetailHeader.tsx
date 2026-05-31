import { commonStyles } from "@/src/style/common";
import { Amenity } from "@/type/interfaces/amenity";
import { DateRange } from "@/type/interfaces/params";
import { RoomDetail } from "@/type/interfaces/room";
import { formatVND } from "@/utils/format";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";
import { AmenityRadius } from "../card/AmenityRadius";
import { DescriptionSection } from "./DescriptSection";
import { SubDesc } from "./SubDesc";

export const RoomDetailHeader = ({
  room,
  amenities,
  available,
  dateRange,
}: {
  room: RoomDetail;
  amenities: Amenity[];
  available?: number;
  dateRange?: DateRange;
}) => {
  return (
    <ScrollView style={{ position: "relative" }}>
      <Image
        source={{ uri: room.roomThumbnail }}
        style={{
          width: "100%",
          height: 220,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {room.roomName}
        </Text>
        <Text variant="bodySmall">{room.facilityName}</Text>
        <Text variant="bodySmall">{room.facilityAddress}</Text>
      </View>
      {/* {room.images && (
            <FlatList
            horizontal
            data={room.images}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 10,
                marginTop: 10,
            }}
            renderItem={({ item }) => (
                <Image
                source={{ uri: item }}
                style={roomDetailStyles.imageMain}
                />
            )}
            />
        )} */}
      <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
        <View style={[commonStyles.column, { gap: 5 }]}>
          <View style={[commonStyles.row, { alignItems: "center", gap: 5 }]}>
            <Text>Giá cho 1 đêm</Text>
            <Text
              style={[
                commonStyles.priceColor,
                { fontSize: 20, fontWeight: "bold" },
              ]}
            >
              {formatVND(Number(room.price))}
            </Text>
          </View>
          <View style={[commonStyles.row, { alignItems: "center", gap: 5 }]}>
            <Icon source="account" size={16} />
            <Text variant="bodyMedium" numberOfLines={1}>
              {room.maxAdults} người lớn
              {room.maxChildren > 0 && (
                <Text variant="bodyMedium">, {room.maxChildren} trẻ em</Text>
              )}
            </Text>
            <Icon source="bed-empty" size={16} />
            <Text variant="bodyMedium" numberOfLines={1}>
              {room.bedName}
            </Text>
            <Icon source="home-switch" size={16} />
            <Text variant="bodyMedium" numberOfLines={1}>
              {room.roomArea} m²
            </Text>
          </View>
        </View>
      </View>
      <AmenityRadius amenities={amenities || []} />
      <View style={[roomDetailStyles.spaceBlock, roomDetailStyles.p10]}>
        <DescriptionSection
          title="Mô tả phòng"
          text={room.roomDesc || "Không có mô tả"}
        />
        <SubDesc title="Diện tích phòng" text={room.roomArea} subText="m²" />
      </View>
    </ScrollView>
  );
};

export const roomDetailStyles = StyleSheet.create({
  imageMain: {
    width: 100,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  spaceBlock: {
    borderColor: "#eee",
    borderTopWidth: 5,
  },
  p10: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
