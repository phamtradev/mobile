import { Pressable, StyleSheet, Text, View } from "react-native";

type RatingStarsProps = {
  value: number;
  size?: number;
  onChange?: (value: number) => void;
};

export function RatingStars({ value, size = 20, onChange }: RatingStarsProps) {
  return (
    <View accessibilityLabel={`${value} out of 5 stars`} style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(value);
        return (
          <Pressable
            key={star}
            disabled={!onChange}
            onPress={() => onChange?.(star)}
            hitSlop={6}>
            <Text
              style={[
                styles.star,
                { fontSize: size },
                filled ? styles.filled : styles.empty,
              ]}>
              ★
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  star: { marginRight: 2 },
  filled: { color: "orange" },
  empty: { color: "#ccc" },
});
