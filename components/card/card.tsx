import { cardStyles } from "@/src/style/card";
import { commonStyles } from "@/src/style/common";
import { FacilityCardItem } from "@/type/facility";
import { formatVND } from "@/utils/format";
import { StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";

export const FacilityCard = ({
  item,
  onPress,
}: {
  item: FacilityCardItem;
  onPress: () => void;
}) => {
  return (
    <Card
      style={[
        commonStyles.bgWhite,
        { borderWidth: 1, borderColor: "lightgray" },
      ]}
      onPress={onPress}
    >
      <View style={{ position: "relative" }}>
        <Card.Cover source={{ uri: item.facilityThumbnail }} />
        <IconButton
          icon="heart-outline"
          size={20}
          containerColor="rgba(255, 255, 255, 0.7)"
          style={{ position: "absolute", top: 8, right: 8 }}
          onPress={() => console.log("Liked")}
        />
      </View>
      <Card.Content style={{ padding: 6 }}>
        <Text style={cardStyles.name}>{item.facilityName}</Text>
        <View style={styles.row}>
          <IconButton
            icon="star"
            iconColor="#FFC107"
            size={14}
            style={{ margin: 0, padding: 0, width: "auto" }}
          />
          <Text style={{ fontWeight: "600" }}>{item.avgRating}</Text>
          <Text style={{ color: "gray" }}>({item.totalReviews} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <IconButton
            icon="map-marker-radius"
            size={12}
            style={{ margin: 0, padding: 0, width: "auto" }}
          />
          <Text style={cardStyles.city}>{item.cityName}</Text>
        </View>
        <Text>
          Giá chỉ từ{" "}
          <Text style={[commonStyles.priceColor, { fontSize: 16 }]}>
            {formatVND(Number(item.minPrice) || 0)}
          </Text>
          /đêm
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button style={[commonStyles.bgPrimary]} onPress={onPress}>
          <Text style={commonStyles.textWhite}>Xem chi tiết</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 5 },
});
