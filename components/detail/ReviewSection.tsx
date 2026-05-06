import { ReviewSectionProps } from "@/type/facility";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Đánh giá khách hàng</Text>

      {reviews.map((item) => (
        <View key={item.reviewId} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View style={styles.userInfo}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.nameContainer}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
              </View>
            </View>

            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={12}
                  color={i < item.rating ? "#FFB800" : "#E5E7EB"}
                />
              ))}
            </View>
          </View>

          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>Xem tất cả đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 5,
    borderTopColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  reviewCard: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eee",
  },
  nameContainer: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  reviewDate: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  ratingStars: {
    flexDirection: "row",
    marginTop: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#4a4a4a",
    lineHeight: 22,
    textAlign: "justify",
  },
  moreButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  moreButtonText: {
    color: "#2b4785",
    fontWeight: "600",
    fontSize: 14,
  },
});
