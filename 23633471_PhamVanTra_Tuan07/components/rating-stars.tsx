import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand } from '@/constants/theme';

interface RatingStarsProps {
    value: number;
    size?: number;
    onChange?: (value: number) => void;
}

const STARS = [1, 2, 3, 4, 5];

export default function RatingStars({ value, size = 18, onChange }: RatingStarsProps) {
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
                    hitSlop={8}
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
    filled: { color: Brand.star },
    empty: { color: Brand.starEmpty },
});
