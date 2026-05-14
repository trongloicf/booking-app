import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { styles } from "@/components/card/CardHorizontal";
import { useGetDetailRoom } from "@/hooks/queries/useGetDetailRoom";
import { commonStyles } from "@/src/style/common";
import { formatVND } from "@/utils/format";

export default function BookingScreen() {
  const rawParams = useLocalSearchParams();
  const roomId = Number(rawParams.room_id);
  const checkin = rawParams.checkin as string;
  const checkout = rawParams.checkout as string;
  const { data: result, isLoading } = useGetDetailRoom({
    roomId: roomId,
    params: {
      checkin: checkin,
      checkout: checkout,
    },
  });
  const room = result?.room;
  if (!roomId)
    return <Text style={localStyles.centerText}>Mã phòng không hợp lệ</Text>;
  if (isLoading) return <ActivityIndicator style={localStyles.loader} />;
  if (!room)
    return (
      <Text style={localStyles.centerText}>Không tìm thấy thông tin phòng</Text>
    );

  return (
    <Card style={styles.card}>
      <View style={[styles.containerInner, commonStyles.column]}>
        <View style={localStyles.headerRow}>
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: room.roomThumbnail }}
              style={[styles.cover, { height: 100, borderRadius: 12 }]}
            />
          </View>
          <View style={localStyles.infoContainer}>
            <Card.Content style={{ paddingHorizontal: 8 }}>
              <Text variant="bodyMedium" style={styles.name}>
                {room.roomName}
              </Text>
              <Text variant="bodySmall">{room.facilityAddress}</Text>
              <Text variant="bodyMedium" numberOfLines={1}>
                Giá:{" "}
                <Text style={commonStyles.priceColor}>
                  {formatVND(Number(room.price))}
                </Text>
                <Text style={commonStyles.textColorPrimary}>/ đêm</Text>
              </Text>
            </Card.Content>
          </View>
        </View>
        <View style={localStyles.dateSection}>
          <View style={localStyles.dateRow}>
            <View style={commonStyles.column}>
              <Text variant="titleMedium">Ngày nhận phòng - trả phòng</Text>
              <Text variant="titleSmall" style={localStyles.dateText}>
                Tháng 5 Ngày 13-15, 2026
              </Text>
            </View>
            <Card.Actions>
              <Button
                mode="contained"
                style={commonStyles.bgPrimary}
                labelStyle={commonStyles.textWhite}
              >
                Thay đổi
              </Button>
            </Card.Actions>
          </View>
        </View>
      </View>
    </Card>
  );
}

const localStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    padding: 5,
  },
  infoContainer: {
    flex: 3,
    justifyContent: "flex-start",
  },
  cover: {
    borderRadius: 12,
  },
  dateSection: {
    ...commonStyles.column,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
