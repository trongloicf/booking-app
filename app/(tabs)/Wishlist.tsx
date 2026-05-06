import { TRENDING_MOCK } from "@/api/mock/trending";
import { FacilityHorizontalCard } from "@/components/card/CardHorizontal";
import { commonStyles } from "@/src/style/common";
import { trendingStyles } from "@/src/style/trending";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const router = useRouter();
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.extendScreen}>
        <FlatList
          // numColumns={2}
          // columnWrapperStyle={{
          //   justifyContent: "space-between",
          // }}
          ListHeaderComponent={<Text variant="titleLarge">Wishlist</Text>}
          data={TRENDING_MOCK}
          renderItem={({ item }) => (
            <FacilityHorizontalCard
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
    </SafeAreaView>
  );
}
