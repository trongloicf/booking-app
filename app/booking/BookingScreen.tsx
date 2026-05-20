import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";

import { BookingContactSection } from "@/components/booking/BookingContactSection";
import { BookingDateSection } from "@/components/booking/BookingDateSection";
import {
  BookingGuestValue,
  BookingRGuestModal,
} from "@/components/booking/BookingGuestModal";
import { BookingGuestSection } from "@/components/booking/BookingGuestSection";
import { BookingMethodSection } from "@/components/booking/BookingMethodSection";
import { BookingRoomSection } from "@/components/booking/BookingRoomSection";
import { styles } from "@/components/card/CardHorizontal";
import { DateRangeModal } from "@/components/card/DateRangeModal";
import { useAuthUser } from "@/hooks/custom/useAuthUser";
import { useRoomDetailParams } from "@/hooks/custom/useRoomDetailParams";
import { usePostBooking } from "@/hooks/mutations/post/usePostBooking";
import { useGetDetailRoom } from "@/hooks/queries/useGetDetailRoom";
import { commonStyles } from "@/src/style/common";
import { DateRange } from "@/type/interfaces/params";
import { calculateNights } from "@/utils/calculateNights";
import { formatVND } from "@/utils/format";
import { router } from "expo-router";
import { roomDetailStyles } from "../detail/RoomDetail";

export default function BookingScreen() {
  const { roomId, roomDetailData } = useRoomDetailParams();
  const { data: result, isLoading } = useGetDetailRoom({
    roomId: roomId,
    params: roomDetailData,
  });
  const { mutate, isPending: isBooking } = usePostBooking();
  const [openModal, setOpenModal] = useState(false);
  const [openRoomGuestModal, setOpenRoomGuestModal] = useState(false);
  const { user } = useAuthUser();
  const [contactInfo, setContactInfo] = useState({
    name: user?.user_name ?? "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setContactInfo((prev) => ({
        ...prev,
        name: user.user_name ?? "",
      }));
    }
  }, [user]);

  const handleSaveDate = (newRange: DateRange) => {
    router.setParams({
      checkin: newRange.checkin,
      checkout: newRange.checkout,
    });
    setOpenModal(false);
  };

  const handleSaveGuest = (newGuest: BookingGuestValue) => {
    router.setParams({
      adults: newGuest.adults,
      children: newGuest.children,
    });
    setOpenRoomGuestModal(false);
  };

  const handleBooking = () => {
    mutate({
      customerId: user ? user.user_id : 1,
      contactName: user ? user.user_name : contactInfo.name,
      contactPhone: contactInfo.phone,
      checkin: roomDetailData.checkin,
      checkout: roomDetailData.checkout,
      paymentMethod: "CASH",
      note: "",
      room: {
        roomId: roomId,
        adults: roomDetailData.adults,
        children: roomDetailData.children,
        quantity: roomDetailData.room,
        pricePerNight: totalPrice,
      },
    });
  };

  const room = result?.room;
  if (!roomId)
    return <Text style={bookingStyles.centerText}>Mã phòng không hợp lệ</Text>;
  if (isLoading) return <ActivityIndicator style={bookingStyles.loader} />;
  if (!room)
    return (
      <Text style={bookingStyles.centerText}>
        Không tìm thấy thông tin phòng
      </Text>
    );
  const nights = calculateNights(
    roomDetailData.checkin,
    roomDetailData.checkout,
  );
  const totalPrice = nights * Number(room.price);

  return (
    <View style={[commonStyles.flex1, commonStyles.bgWhite]}>
      <Card style={styles.card}>
        <View style={[styles.containerInner, commonStyles.column]}>
          <BookingRoomSection room={room} roomQuantity={roomDetailData.room} />
          <View style={bookingStyles.dateSection}>
            <BookingDateSection
              nights={nights}
              checkin={roomDetailData.checkin}
              checkout={roomDetailData.checkout}
              onChange={() => setOpenModal(true)}
            />
            <BookingGuestSection
              adults={roomDetailData.adults}
              childrens={roomDetailData.children}
              onChange={() => setOpenRoomGuestModal(true)}
            />
            <View style={[bookingStyles.dateRow, bookingStyles.spaceBlock]}>
              <View style={commonStyles.column}>
                <Text variant="bodyMedium">Chi tiết giá cả</Text>
                <Text variant="bodySmall" style={bookingStyles.dateText}>
                  {nights} đêm x {formatVND(Number(room.price))}
                </Text>
              </View>
              <Text variant="bodyMedium">{formatVND(totalPrice)}</Text>
            </View>
            <View style={[bookingStyles.dateRow, bookingStyles.spaceBlock]}>
              <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                Tổng tiền
              </Text>
              <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                {formatVND(totalPrice)}
              </Text>
            </View>
          </View>
        </View>
        <BookingRGuestModal
          visible={openRoomGuestModal}
          value={{
            adults: roomDetailData.adults,
            children: roomDetailData.children,
          }}
          constraints={{
            maxAdults: room.maxAdults,
            maxChildren: room.maxChildren,
            maxOccupancy: room.maxOccupancy,
          }}
          onClose={() => setOpenRoomGuestModal(false)}
          onSave={handleSaveGuest}
        />
        <DateRangeModal
          visible={openModal}
          value={{
            checkin: roomDetailData.checkin,
            checkout: roomDetailData.checkout,
          }}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveDate}
        />
      </Card>
      <BookingContactSection value={contactInfo} onChange={setContactInfo} />
      <BookingMethodSection />
      <View style={roomDetailStyles.footerContainer}>
        <TouchableOpacity
          style={roomDetailStyles.bookingButton}
          onPress={() => {
            router.push({
              pathname: "/booking/BookingScreen",
              params: {
                id: roomId,
                ...roomDetailData,
              },
            });
          }}
        >
          <Text style={roomDetailStyles.buttonText} onPress={handleBooking}>
            Đặt ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const bookingStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    padding: 5,
  },
  infoContainer: {
    flex: 3,
    justifyContent: "center",
  },
  cover: {
    borderRadius: 12,
  },
  dateSection: {
    ...commonStyles.column,
    padding: 5,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  dateText: {
    color: "#222",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  centerText: {
    textAlign: "center",
    marginTop: 20,
  },
  spaceBlock: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});
