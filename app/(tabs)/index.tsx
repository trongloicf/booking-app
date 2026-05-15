import { cities } from "@/api/mock/city";
import { FacilityCard } from "@/components/card/card";
import SearchBox from "@/components/search/SearchBox";
import { useSearchForm } from "@/hooks/custom/useSearchForm";
import { useGetFacilities } from "@/hooks/queries/useGetFacilities";
import { commonStyles } from "@/src/style/common";
import { trendingStyles } from "@/src/style/trending";
import { SearchForm } from "@/type/interfaces/params";
import { getQueryParams } from "@/utils/getQueryParams";
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
    city_id: cities[0]?.cityId,
    dateRange: {
      checkin: today.toISOString().split("T")[0],
      checkout: tomorrow.toISOString().split("T")[0],
    },
    quantityPerson: { adults: 2, children: 0, room: 1 },
  });
  const { data } = useGetFacilities({});
  const facilities = data?.data || [];
  console.log("cơ sở", facilities);
  const handleSearch = (form: SearchForm) => {
    router.push({
      pathname: "/search/SearchResult",
      params: {
        keyword: form.keyword,
        city_id: form.city_id,
        ...getQueryParams(form),
      },
    });
    console.log("params", {
      keyword: form.keyword,
      city_id: form.city_id,
      ...getQueryParams(form),
    });
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
          data={facilities}
          renderItem={({ item }) => (
            <FacilityCard
              item={item}
              onPress={() => {
                router.push({
                  pathname: "/detail/FacilityDetail",
                  params: {
                    id: item.facilityId,
                    checkin: form.dateRange.checkin,
                    checkout: form.dateRange.checkout,
                    room: form.quantityPerson.room,
                    adult: form.quantityPerson.adults,
                    children: form.quantityPerson.children,
                  },
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
