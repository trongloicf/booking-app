import { RoomHorizontal } from "@/components/card/RoomHorizontal";
import { FacilityDetailHeader } from "@/components/detail/FacilityDetailHeader";
import { PolicySection } from "@/components/detail/PolicySection";
import { ReviewSection } from "@/components/detail/ReviewSection";
import { useGetDetailFacility } from "@/hooks/queries/useGetDetailFacility";
import { commonStyles } from "@/src/style/common";
import { parseDateRangeParams } from "@/utils/parseSearchParams";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function FacilityDetail() {
  const rawParams = useLocalSearchParams();
  const id = rawParams.id;
  const parseParams = parseDateRangeParams(rawParams);
  const { data: result, isLoading: isLoadingDetailFacility } =
    useGetDetailFacility({
      facilityId: Number(id),
      params: parseParams,
    });
  console.log("hm", parseParams);
  if (!result) return <Text>Không tìm thấy dữ liệu</Text>;
  if (isLoadingDetailFacility) {
    return <ActivityIndicator animating={true} color="#ccc" />;
  }

  return (
    <View style={[commonStyles.container]}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          ListHeaderComponent={() => (
            <FacilityDetailHeader
              facility={result.facility}
              amenities={result.amenities}
              images={result.images}
            />
          )}
          data={result.rooms}
          renderItem={({ item }) => (
            <RoomHorizontal
              dateRange={result.dateRange}
              item={item}
              onPress={() => {
                router.push({
                  pathname: "/detail/RoomDetail",
                  params: {
                    id: item.roomId,
                    checkin: parseParams.checkin,
                    checkout: parseParams.checkout,
                  },
                });
              }}
            />
          )}
          ListFooterComponent={() => (
            <View>
              {result?.reviews && <ReviewSection reviews={result.reviews} />}
              {result?.policies && <PolicySection policy={result.policies} />}
            </View>
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
