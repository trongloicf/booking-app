import React, { useCallback, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TouchableOpacity,
  View,
} from "react-native";

export const DescriptionSection = ({
  text,
  title,
}: {
  text: string;
  title?: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isMeasured, setIsMeasured] = useState(false);

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (!isMeasured) {
        if (e.nativeEvent.lines.length > 3) {
          setIsTruncated(true);
        }
        setIsMeasured(true);
      }
    },
    [isMeasured],
  );

  return (
    <View>
      <Text style={stylesDesc.title}>{title}</Text>
      {!isMeasured && (
        <Text
          style={[stylesDesc.description, stylesDesc.hiddenMeasurer]}
          onTextLayout={onTextLayout}
        >
          {text}
        </Text>
      )}

      <Text
        numberOfLines={expanded ? undefined : 3}
        style={stylesDesc.description}
      >
        {text}
      </Text>

      {isTruncated && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={stylesDesc.readMore}>
            {expanded ? "Thu gọn" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const stylesDesc = StyleSheet.create({
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 14, color: "#444", lineHeight: 20 },
  readMore: { color: "#2b4785", fontWeight: "bold" },
  hiddenMeasurer: {
    position: "absolute",
    opacity: 0,
    zIndex: -1,
    left: 0,
    right: 0,
  },
});
