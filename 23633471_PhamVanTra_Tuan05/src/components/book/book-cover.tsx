import { Image } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import DiscountBadge from '@/components/book/discount-badge';
import { Brand, Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

interface BookCoverProps {
    book: Book;
    /** Kích thước do nơi dùng quyết định: 80x110 ở dạng hàng, 100% + aspectRatio ở dạng lưới. */
    style?: StyleProp<ViewStyle>;
    showBadge?: boolean;
}

/**
 * Ảnh bìa sách kèm nhãn ở góc.
 *
 * Đây là containing block của badge. Trong React Native, position mặc định
 * đã là 'relative' nên khai báo ở đây chỉ để ghi rõ ý định.
 *
 * Điều thật sự quan trọng là badge nằm bên trong đúng View này chứ không phải
 * View bọc cả thẻ sách. Gom ảnh và badge vào cùng một component nên nơi dùng
 * không thể đặt nhầm chỗ.
 */
export default function BookCover({ book, style, showBadge = true }: BookCoverProps) {
    return (
        <View style={[styles.frame, style]}>
            <Image source={{ uri: book.cover }} style={styles.image} contentFit="cover" transition={150} />

            {showBadge ? <DiscountBadge book={book} /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    frame: {
        position: 'relative',
        borderRadius: Spacing.two,
        overflow: 'hidden',
        backgroundColor: Brand.indigoLight,
    },

    image: {
        width: '100%',
        height: '100%',
    },
});
