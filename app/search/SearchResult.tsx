import { FacilityCard } from "@/components/card/card";
import { useSearchParams } from "@/hooks/custom/useSearchParams";
import { usePostWishlist } from "@/hooks/mutations/post/usePostWishlist";
import { useGetFacilities } from "@/hooks/queries/useGetFacilities";
import { commonStyles } from "@/src/style/common";
import { trendingStyles } from "@/src/style/trending";
import { router } from "expo-router";
import { FlatList, View } from "react-native";

export default function SearchResult() {
  const { searchData } = useSearchParams();
  const { data } = useGetFacilities(searchData);
  const { mutate: toggleWishlist } = usePostWishlist();
  console.log("params gửi API:", searchData);
  const facilities = data?.data;
  return (
    <View style={[commonStyles.container]}>
      <View style={[commonStyles.extendScreen, commonStyles.flex1]}>
        <FlatList
          // numColumns={2}
          // columnWrapperStyle={{
          //   justifyContent: "space-between",
          // }}
          data={facilities}
          renderItem={({ item }) => (
            <FacilityCard
              item={item}
              onPress={() => {
                const { keyword, city_id, ...rest } = searchData;
                router.push({
                  pathname: "/detail/FacilityDetail",
                  params: { id: item.facilityId, ...rest },
                });
              }}
              onLike={() => toggleWishlist(item.facilityId)}
            />
          )}
          keyExtractor={(item) => item.facilityId.toString()}
          contentContainerStyle={[
            trendingStyles.listContainer,
            commonStyles.bgWhite,
          ]}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    </View>
  );
}
