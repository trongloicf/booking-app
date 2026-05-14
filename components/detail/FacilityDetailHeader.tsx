import { commonStyles } from "@/src/style/common";
import { Amenity } from "@/type/interfaces/amenity";
import { FacilityDetail, ImageFacility } from "@/type/interfaces/facility";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { AmenityRadius } from "../card/AmenityRadius";
import { DescriptionSection, stylesDesc } from "./DescriptSection";

export const FacilityDetailHeader = ({
  facility,
  amenities,
  images,
}: {
  facility: FacilityDetail;
  amenities: Amenity[];
  images: ImageFacility[];
}) => {
  console.log(facility);
  return (
    <View style={{ position: "relative" }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <View style={[facilityDetailStyles.betweenRow]}>
          <Text style={{ fontSize: 18, fontWeight: "bold", flex: 1 }}>
            {facility.facilityName}
          </Text>
          <View style={[facilityDetailStyles.wrapStar, commonStyles.bgPrimary]}>
            <IconButton
              icon="star"
              iconColor="#FFC107"
              size={14}
              style={{ margin: 0, padding: 0, width: 18 }}
            />
            <Text style={[{ fontWeight: "600" }, commonStyles.textWhite]}>
              {facility.avgRating}
            </Text>
            <Text
              style={[{ color: "gray", marginLeft: 4 }, commonStyles.textWhite]}
            >
              ({facility.totalReviews} đánh giá)
            </Text>
          </View>
        </View>
        <Text>
          <IconButton
            icon="map-marker"
            size={12}
            style={{ width: "auto", height: 11 }}
          />
          {facility.facilityAddress || "Địa chỉ không xác định"}
        </Text>
      </View>
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: facility.facilityThumbnail }}
          style={{ width: "100%", height: 250 }}
        />
        <IconButton
          icon="heart-outline"
          size={20}
          containerColor="rgba(255, 255, 255, 0.7)"
          style={{ position: "absolute", top: 8, right: 8 }}
          onPress={() => console.log("Liked")}
        />
      </View>
      {images && (
        <FlatList
          horizontal
          data={images}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            marginTop: 10,
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.imageUrl }}
              style={facilityDetailStyles.imageMain}
            />
          )}
        />
      )}
      <AmenityRadius amenities={amenities || []} />

      <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
        <DescriptionSection
          title="Mô tả cơ sở"
          text={facility.facilityDesc || "Không có mô tả"}
        />
      </View>
      <Text
        style={[
          stylesDesc.title,
          {
            borderTopWidth: 5,
            borderTopColor: "#f5f5f5",
            paddingHorizontal: 10,
            paddingTop: 8,
          },
        ]}
      >
        Phòng có sẵn
      </Text>
    </View>
  );
};

export const facilityDetailStyles = StyleSheet.create({
  imageMain: {
    width: 100,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  wrapStar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  betweenRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
