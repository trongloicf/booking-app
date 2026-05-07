import { MOCK_REVIEWS } from "@/api/mock/review";
import { ROOM_MOCK } from "@/api/mock/room";
import { TRENDING_MOCK } from "@/api/mock/trending";
import { RoomHorizontal } from "@/components/card/RoomHorizontal";
import { FacilityDetailHeader } from "@/components/detail/FacilityDeatilHeader";
import { ReviewSection } from "@/components/detail/ReviewSection";
import { commonStyles } from "@/src/style/common";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function FacilityDetail() {
  const { id } = useLocalSearchParams();
  const facility = TRENDING_MOCK.find((f) => f.facilityId.toString() === id);
  const roomsForThisFacility = ROOM_MOCK.filter(
    (room) => room.facilityId.toString() === id,
  );
  const reviewsForThisFacility = MOCK_REVIEWS.filter(
    (review) => review.facilityId.toString() === id,
  );
  if (!facility) return <Text>Không tìm thấy dữ liệu</Text>;

  return (
    <View style={[commonStyles.container]}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          ListHeaderComponent={() => (
            <FacilityDetailHeader facility={facility} />
          )}
          data={roomsForThisFacility}
          renderItem={({ item }) => (
            <RoomHorizontal
              item={item}
              onPress={() => {
                router.push({
                  pathname: "/detail/RoomDetail",
                  params: { id: item.roomId },
                });
              }}
            />
          )}
          ListFooterComponent={() => (
            <ReviewSection reviews={reviewsForThisFacility} />
          )}
          ListEmptyComponent={
            <Text style={{ paddingHorizontal: 10 }}>
              Đang cập nhật danh sách phòng...
            </Text>
          }
        />
      </View>
    </View>
  );
}
