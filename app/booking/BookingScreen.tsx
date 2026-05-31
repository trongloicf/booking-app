import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
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
import { commonStyles } from "@/src/style/common";
import { DateRange } from "@/type/interfaces/params";
import { calculateNights } from "@/utils/calculateNights";
import { formatVND } from "@/utils/format";
import { router } from "expo-router";
import { roomDetailStyles } from "../detail/RoomDetail";

export default function BookingScreen() {
  const { roomId, roomDetailData, rooms } = useRoomDetailParams();
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

  const constraints = useMemo(() => {
    const totalMaxAdults = rooms.reduce(
      (sum, r) => sum + r.maxAdults * r.quantity,
      0,
    );

    const totalMaxChildren = rooms.reduce(
      (sum, r) => sum + r.maxChildren * r.quantity,
      0,
    );

    const totalMaxPeople = rooms.reduce(
      (sum, r) => sum + (r.maxAdults + r.maxChildren) * r.quantity,
      0,
    );

    return {
      maxAdults: totalMaxAdults,
      maxChildren: totalMaxChildren,
      maxOccupancy: totalMaxPeople,
    };
  }, [rooms]);

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
    if (isBooking || !rooms.length) return;
    mutate(
      {
        customerId: user ? user.user_id : 1,
        contactName: contactInfo.name,
        contactPhone: contactInfo.phone,
        checkin: roomDetailData.checkin,
        checkout: roomDetailData.checkout,
        paymentMethod: "CASH",
        adults: roomDetailData.adults,
        children: roomDetailData.children,
        note: "",
        rooms: rooms.map((r) => ({
          roomId: r.roomId,
          quantity: r.quantity,
          // adults: Math.ceil(roomDetailData.adults / rooms.length),
          // children: Math.ceil(roomDetailData.children / rooms.length),
        })),
      },
      {
        onSuccess: () =>
          setTimeout(() => {
            router.push({
              pathname: "/Booking",
            });
          }, 300),
      },
    );
  };
  console.log("rooms: ", rooms);
  if (!rooms.length)
    return (
      <View
        style={[
          commonStyles.flex1,
          commonStyles.bgWhite,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={bookingStyles.centerText}>
          Không tìm thấy thông tin phòng
        </Text>
      </View>
    );
  const nights = calculateNights(
    roomDetailData.checkin,
    roomDetailData.checkout,
  );
  const totalPrice = rooms.reduce((sum, r) => {
    return sum + Number(r.price) * r.quantity * nights;
  }, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Card style={styles.card}>
          <View style={[styles.containerInner, commonStyles.column]}>
            <BookingRoomSection rooms={rooms} />
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
                    {nights} đêm x {formatVND(Number(totalPrice))}
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
            constraints={constraints}
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
            onPress={handleBooking}
            disabled={isBooking}
          >
            {isBooking ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={roomDetailStyles.buttonText}>Đặt ngay</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
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
