import { StyleSheet, TextInput, View } from 'react-native';

import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

interface SearchFieldProps {
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    label: string;
    onSubmitEditing?: () => void;
}

/** Ô nhập controlled: giá trị hiển thị luôn đến từ state của màn hình cha. */
export default function SearchField({
    value,
    onChangeText,
    placeholder,
    label,
    onSubmitEditing,
}: SearchFieldProps) {
    return (
        <View style={styles.wrapper}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                placeholder={placeholder}
                placeholderTextColor={Brand.muted}
                accessibilityLabel={label}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { width: '100%' },

    input: {
        minHeight: MinTouchTarget,
        paddingHorizontal: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.two,
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        color: '#000000',
    },
});
