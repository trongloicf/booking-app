import { BookingHorizontal } from "@/components/card/BookingHorizontal";
import { useAuthUser } from "@/hooks/custom/useAuthUser";
import { useInfiniteBooking } from "@/hooks/queries/useGetAllBooking";
import { commonStyles } from "@/src/style/common";
import { getStatusInfo } from "@/utils/renderStatusEngtoVN";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";

const STATUS_TABS = [
  { label: "Tất cả", value: "" },
  { label: "Đã xác nhận", value: "CONFIRMED" },
  { label: "Đã huỷ", value: "CANCELLED" },
  { label: "Check-in", value: "CHECKED_IN" },
  { label: "Check-out", value: "CHECKED_OUT" },
];

export default function Booking() {
  const { user, isAuthenticated } = useAuthUser();
  const [status, setStatus] = useState<string>("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteBooking(status, {
      enabled: isAuthenticated,
    });

  const bookingList = data?.pages.flatMap((p) => p.data) || [];
  console.log(bookingList);
  if (!isAuthenticated || !user)
    return (
      <View style={commonStyles.extendScreen}>
        <View style={[commonStyles.column, commonStyles.gap5]}>
          <Text style={{ textAlign: "center" }}>
            Bạn cần đăng nhập để xem lịch sử đặt phòng
          </Text>
          <Button
            mode="text"
            onPress={() => {
              router.push({
                pathname: "/(auth)/Login",
              });
            }}
          >
            <Text style={commonStyles.colorPrimary}>Đăng nhập</Text>
          </Button>
        </View>
      </View>
    );
  return (
    <View style={commonStyles.container}>
      <View style={[commonStyles.extendScreen, { flex: 1 }]}>
        <View style={[commonStyles.column, commonStyles.gap5, { flex: 1 }]}>
          <Text variant="titleLarge">Tất cả đơn đặt phòng</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10, maxHeight: 25 }}
          >
            {STATUS_TABS.map((tab) => {
              const isActive = tab.value === status;

              return (
                <TouchableOpacity
                  key={tab.label}
                  onPress={() => setStatus(tab.value)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    marginRight: 8,
                    backgroundColor: isActive ? "#2563eb" : "#eee",
                  }}
                >
                  <Text style={{ color: isActive ? "#fff" : "#000" }}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={{ flex: 1 }}>
            <FlatList
              data={bookingList}
              keyExtractor={(item) => item.booking_id.toString()}
              renderItem={({ item }) => (
                <BookingHorizontal
                  onPress={() => {
                    router.push({
                      pathname: "/booking/BookingDetail",
                      params: {
                        bookingId: item.booking_id,
                      },
                    });
                  }}
                  item={item}
                />
              )}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                isFetchingNextPage ? <Text>Đang tải...</Text> : null
              }
              ListEmptyComponent={
                <Text>
                  Bạn không có đơn hàng nào {getStatusInfo(status).label}
                </Text>
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}
