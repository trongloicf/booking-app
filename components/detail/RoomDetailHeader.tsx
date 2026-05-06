import { commonStyles } from "@/src/style/common";
import { Room } from "@/type/room";
import { formatVND } from "@/utils/format";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { AmenityRadius } from "../card/AmenityRadius";
import { DescriptionSection } from "./DescriptSection";

export const RoomDetailHeader = ({ room }: { room: Room }) => {
  return (
    <View style={{ position: "relative" }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {room.roomName}
        </Text>
      </View>
      <Image
        source={{ uri: room.roomThumbnail }}
        style={{ width: "100%", height: 250 }}
      />
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
      <AmenityRadius amenityIds={room.amenities || []} />
      <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
        <View style={commonStyles.column}>
          <Text>Giá cho 1 đêm</Text>
          <Text
            style={[
              commonStyles.priceColor,
              { fontSize: 16, fontWeight: "bold" },
            ]}
          >
            {formatVND(room.price)}
          </Text>
        </View>
      </View>
      <View style={[roomDetailStyles.spaceBlock, roomDetailStyles.p10]}>
        <DescriptionSection
          title="Mô tả phòng"
          text={room.roomDescription || "Không có mô tả"}
        />
      </View>
    </View>
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
    borderTopWidth: 8,
  },
  p10: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
