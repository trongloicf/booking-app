import { FacilityCard } from "@/components/card/card";
import { useGetFacilities } from "@/hooks/queries/useGetFacilities";
import { commonStyles } from "@/src/style/common";
import { trendingStyles } from "@/src/style/trending";
import { parseSearchParams } from "@/utils/parseSearchParams";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, View } from "react-native";

export default function SearchResult() {
  const params = useLocalSearchParams();
  const parseParams = parseSearchParams(params);
  const { data } = useGetFacilities(parseParams);
  console.log("params gửi API:", parseParams);
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
                router.push({
                  pathname: "/detail/FacilityDetail",
                  params: { id: item.facilityId },
                });
              }}
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
