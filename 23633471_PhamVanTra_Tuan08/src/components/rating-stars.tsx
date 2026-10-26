import { Pressable, StyleSheet, Text, View } from 'react-native';

type RatingStarsProps = {
    value: number;
    size?: number;
    onChange?: (value: number) => void;
};

const STARS = [1, 2, 3, 4, 5];

export function RatingStars({ value, size = 20, onChange }: RatingStarsProps) {
    const readOnly = !onChange;

    return (
        <View
            style={styles.row}
            accessibilityRole={readOnly ? 'image' : 'adjustable'}
            accessibilityLabel={`${value} trên 5 sao`}>
            {STARS.map((star) => (
                <Pressable
                    key={star}
                    disabled={readOnly}
                    hitSlop={6}
                    onPress={() => onChange?.(star)}
                    accessibilityRole={readOnly ? undefined : 'button'}
                    accessibilityLabel={readOnly ? undefined : `Chấm ${star} sao`}>
                    <Text
                        style={[
                            styles.star,
                            { fontSize: size },
                            star <= Math.round(value) ? styles.filled : styles.empty,
                        ]}>
                        ★
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center' },
    star: { marginRight: 2 },
    filled: { color: '#f59e0b' },
    empty: { color: '#cbd5e1' },
});
