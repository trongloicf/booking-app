import { commonStyles } from "@/src/style/common";
import { FacilityCardItem } from "@/type/facility";
import { StyleSheet, View } from "react-native";
import { Card, Icon, IconButton, Text } from "react-native-paper";

export const FacilityHorizontalCard = ({
  item,
  onPress,
}: {
  item: FacilityCardItem;
  onPress?: () => void;
}) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.containerInner}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Card.Cover
              source={{ uri: item.facilityThumbnail }}
              style={styles.cover}
            />
            <IconButton
              icon="heart"
              size={18}
              containerColor="rgba(255, 255, 255, 0.5)"
              style={styles.wishlistBtn}
              onPress={() => console.log("Not liked")}
            />
          </View>

          <View style={styles.content}>
            <Card.Content style={styles.cardContent}>
              <View style={commonStyles.column}>
                <Text style={styles.name}>{item.facilityName}</Text>
                <View style={styles.infoRow}>
                  <Icon source="star" color="#FFC107" size={14} />
                  <Text variant="bodySmall" numberOfLines={1}>
                    {item.star} ({item.reviewCount})
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Icon source="map-marker-radius" size={14} />
                  <Text variant="bodySmall" numberOfLines={1}>
                    {item.cityName}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </View>
        </View>
      </View>
    </Card>
  );
};

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginVertical: 8,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 12,
  },
  containerInner: {
    overflow: "hidden",
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    height: 140,
  },
  imageContainer: {
    flex: 1.2,
    position: "relative",
  },
  cover: {
    height: "100%",
    borderRadius: 0,
  },
  content: {
    flex: 2,
    justifyContent: "center",
  },
  cardContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  wishlistBtn: {
    position: "absolute",
    top: 4,
    left: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    fontWeight: "bold",
  },
});
