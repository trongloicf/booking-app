import { cardStyles } from "@/src/style/card";
import { commonStyles } from "@/src/style/common";
import { FacilityCardItem } from "@/type/facility";
import { View } from "react-native";
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
      <Card.Content style={{ paddingTop: 8 }}>
        <Text style={cardStyles.name}>{item.facilityName}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="star"
            iconColor="#FFC107"
            size={14}
            style={{ margin: 0, padding: 0, width: 18 }}
          />
          <Text style={{ fontWeight: "600" }}>{item.star}</Text>
          <Text style={{ color: "gray", marginLeft: 4 }}>
            ({item.reviewCount} đánh giá)
          </Text>
        </View>
        <View style={[commonStyles.row, { alignItems: "center" }]}>
          <IconButton
            icon="map-marker"
            size={12}
            style={{ width: "auto", height: 11 }}
          />
          <Text style={cardStyles.city}>{item.cityName}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button style={[commonStyles.bgPrimary]} onPress={onPress}>
          <Text style={commonStyles.textWhite}>Xem chi tiết</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};
