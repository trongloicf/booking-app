import { SelectRoomModal } from "@/components/booking/SelectRoomModal";
import { RoomHorizontal } from "@/components/card/RoomHorizontal";
import { FacilityDetailHeader } from "@/components/detail/FacilityDetailHeader";
import { PolicySection } from "@/components/detail/PolicySection";
import { ReviewSection } from "@/components/detail/ReviewSection";
import { useGetDetailFacility } from "@/hooks/queries/useGetDetailFacility";
import { commonStyles } from "@/src/style/common";
import { RoomFacility } from "@/type/interfaces/room";
import { parseDetailParams } from "@/utils/parseSearchParams";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export type SelectedRoom = {
  roomId: number;
  price: string;
  roomName: string;
  quantity: number;
  roomThumbnail: string;
  facilityName: string;
  facilityAddress: string;
  maxAdults: number;
  maxChildren: number;
};

export default function FacilityDetail() {
  const rawParams = useLocalSearchParams();
  const id = rawParams.id;
  const parseParams = parseDetailParams(rawParams);
  const { data: result, isLoading: isLoadingDetailFacility } =
    useGetDetailFacility({
      facilityId: Number(id),
      params: parseParams,
    });

  const [openModalSelect, setOpenModalSelect] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);

  const handleSelectRoom = (room: RoomFacility) => {
    setSelectedRooms((prev) => {
      const exist = prev.find((r) => r.roomId === room.roomId);
      if (exist)
        return prev.map((r) =>
          r.roomId === room.roomId ? { ...r, quantity: r.quantity + 1 } : r,
        );
      return [
        ...prev,
        {
          roomId: room.roomId,
          roomName: room.roomName,
          facilityName: room.facilityName,
          facilityAddress: room.facilityAddress,
          quantity: 1,
          roomThumbnail: room.roomThumbnail,
          price: room.price,
          maxAdults: room.maxAdults,
          maxChildren: room.maxChildren,
        },
      ];
    });
    setOpenModalSelect(true);
  };

  const handleBoooking = () => {
    router.push({
      pathname: "/booking/BookingScreen",
      params: {
        rooms: JSON.stringify(
          selectedRooms.map((r) => ({
            roomId: r.roomId,
            roomName: r.roomName,
            quantity: r.quantity,
            roomThumbnail: r.roomThumbnail,
            price: r.price,
            facilityName: r.facilityName,
            facilityAddress: r.facilityAddress,
            maxAdults: r.maxAdults,
            maxChildren: r.maxChildren,
          })),
        ),
        ...parseParams,
      },
    });
  };

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
              onSelectRoom={handleSelectRoom}
              onPress={() => {
                router.push({
                  pathname: "/detail/RoomDetail",
                  params: {
                    id: item.roomId,
                    ...parseParams,
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
        {openModalSelect && (
          <SelectRoomModal
            rooms={selectedRooms}
            onClose={() => {
              setSelectedRooms([]);
              setOpenModalSelect(false);
            }}
            onBooking={handleBoooking}
          />
        )}
      </View>
    </View>
  );
}
