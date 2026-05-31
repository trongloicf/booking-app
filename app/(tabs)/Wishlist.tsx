import { NoLogin } from "@/components/auth/NoLogin";
import { WishlistFacilityCard } from "@/components/card/WishlistFacilityCard";
import { Loading } from "@/components/loading/Loading";
import { useAuthUser } from "@/hooks/custom/useAuthUser";
import { usePostWishlist } from "@/hooks/mutations/post/usePostWishlist";
import { useGetWishlist } from "@/hooks/queries/useGetWishlist";
import { commonStyles } from "@/src/style/common";
import { trendingStyles } from "@/src/style/trending";
import { router } from "expo-router";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const { user, isAuthenticated } = useAuthUser();
  const { data: wishlist, isLoading: isWishlistLoading } = useGetWishlist();
  const { mutate: toggleWishlist } = usePostWishlist();

  if (!isAuthenticated || !user) {
    return (
      <NoLogin title="Vui lòng đăng nhập để xem danh sách yêu thích của bạn" />
    );
  }
  if (isWishlistLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.extendScreen}>
        <FlatList
          // numColumns={2}
          // columnWrapperStyle={{
          //   justifyContent: "space-between",
          // }}
          ListHeaderComponent={
            <Text variant="titleLarge">Danh sách yêu thích</Text>
          }
          data={wishlist}
          renderItem={({ item }) => (
            <WishlistFacilityCard
              item={item}
              onToggleWishlist={() => toggleWishlist(item.facilityId)}
              onPress={() => {
                router.push({
                  pathname: "/detail/FacilityDetail",
                  params: { id: item.facilityId },
                });
              }}
            />
          )}
          ListEmptyComponent={
            <Text
              variant="titleMedium"
              style={{ textAlign: "center", marginTop: 20 }}
            >
              Bạn chưa có cơ sở yêu thích nào
            </Text>
          }
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
