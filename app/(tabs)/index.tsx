import { cities } from "@/api/mock/city";
import { TRENDING_MOCK } from "@/api/mock/trending";
import { FacilityCard } from "@/components/card/card";
import SearchBox from "@/components/feature/search/components/SearchBox";
import { useSearchForm } from "@/hooks/custom/useSearchForm";
import { commonStyles } from "@/src/style/common";
import { trendingStyles } from "@/src/style/trending";
import { SearchForm } from "@/type/search";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function Home() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { form, updateField } = useSearchForm({
    keyword: "",
    city: cities[0]?.cityId,
    dateRange: {
      checkin: today.toISOString().split("T")[0],
      checkout: tomorrow.toISOString().split("T")[0],
    },
    quantityPerson: { adults: 2, children: 0, room: 1 },
  });
  const handleSearch = (data: SearchForm) => {
    console.log("DATA:", data);
  };
  return (
    <View style={[commonStyles.container, { paddingTop: insets.top }]}>
      <View style={[commonStyles.extendScreen, commonStyles.flex1]}>
        <SearchBox
          form={form}
          onChange={updateField}
          cities={cities}
          onSearch={handleSearch}
        />
        <FlatList
          // numColumns={2}
          // columnWrapperStyle={{
          //   justifyContent: "space-between",
          // }}
          data={TRENDING_MOCK}
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
