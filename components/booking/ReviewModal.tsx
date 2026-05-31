import { commonStyles } from "@/src/style/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

interface ReviewModalProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (data: { rating: number; comment: string }) => void;
  isSubmitting?: boolean;
}

export const ReviewModal = ({
  visible,
  onClose,
  onSubmit,
  isSubmitting,
}: ReviewModalProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit?.({ rating, comment });
    setRating(5);
    setComment("");
    onClose?.();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Đánh giá của bạn</Text>

        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <MaterialCommunityIcons
              key={star}
              name={star <= rating ? "star" : "star-outline"}
              size={30}
              color="#f4b400"
              onPress={() => setRating(star)}
            />
          ))}
        </View>

        <TextInput
          mode="outlined"
          placeholder="Nhập đánh giá của bạn..."
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={3}
          style={styles.input}
        />

        <Button
          mode="contained"
          disabled={isSubmitting || !comment.trim()}
          onPress={handleSubmit}
          style={
            isSubmitting || !comment.trim()
              ? [styles.button, { backgroundColor: "#ccc" }]
              : [styles.button, commonStyles.bgPrimary]
          }
        >
          <Text style={{ color: "#fff" }}>Gửi đánh giá</Text>
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    gap: 5,
  },

  input: {
    marginTop: 10,
    padding: 4,
  },

  button: {
    marginTop: 10,
    borderRadius: 10,
  },
});
