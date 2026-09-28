import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import BookGridCard from '@/components/book/book-grid-card';
import { Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

/**
 * percent: mỗi ô đặt width theo phần trăm, khoảng trống do
 *          justifyContent space-between tạo ra. Không cần đo gì.
 * gap:     container đặt gap, bề rộng ô tính bằng pixel từ bề rộng
 *          container đo được. Cần đo nhưng khoảng cách đều tuyệt đối.
 */
export type GridMode = 'percent' | 'gap';

interface BookGridProps {
    books: Book[];
    columns?: 2 | 3;
    mode?: GridMode;
    onPressBook?: (book: Book) => void;
    showBadge?: boolean;
}

const GAP = Spacing.three;

/** Bề rộng phần trăm chừa sẵn khoảng hở cho space-between. */
const PERCENT_WIDTH: Record<number, `${number}%`> = {
    2: '48%',
    3: '31.5%',
};

/**
 * Giờ 2 — Bài tập 2 và Thử thách: lưới sách 2 hoặc 3 cột bằng flexbox thuần,
 * chưa dùng FlatList numColumns.
 *
 * So sánh hai cách chia cột:
 *
 * Cách phần trăm đơn giản hơn, không phụ thuộc kích thước thật của container,
 * nhưng khoảng hở giữa các cột là phần dư của phép chia nên chỉ đều khi mọi
 * hàng đều đầy. Hàng cuối thiếu ô sẽ dồn về trái, và khoảng hở dọc phải tự lo
 * bằng marginBottom vì space-between chỉ tác động theo trục ngang.
 *
 * Cách gap cho khoảng cách ngang và dọc bằng nhau tuyệt đối và hàng cuối
 * không bị dàn ra, nhưng phải đo container trước vì trong React Native,
 * width phần trăm tính trên toàn bộ bề rộng cha và không tự trừ đi phần gap.
 * Đặt cùng lúc width 33.33% và gap sẽ tràn hàng.
 */
export default function BookGrid({
    books,
    columns = 2,
    mode = 'percent',
    onPressBook,
    showBadge = true,
}: BookGridProps) {
    const [containerWidth, setContainerWidth] = useState(0);

    function measure(event: LayoutChangeEvent) {
        if (mode === 'gap') setContainerWidth(event.nativeEvent.layout.width);
    }

    // Công thức của thử thách: (bề rộng container − tổng gap) / số cột
    const itemWidth =
        containerWidth > 0 ? (containerWidth - GAP * (columns - 1)) / columns : undefined;

    const isGap = mode === 'gap';

    return (
        <View
            onLayout={measure}
            style={[styles.grid, isGap ? styles.gridGap : styles.gridPercent]}
        >
            {books.map((book) => (
                <View
                    key={book.id}
                    style={
                        isGap
                            ? { width: itemWidth }
                            : { width: PERCENT_WIDTH[columns], marginBottom: GAP }
                    }
                >
                    <BookGridCard
                        book={book}
                        showBadge={showBadge}
                        compact={columns === 3}
                        onPress={onPressBook ? () => onPressBook(book) : undefined}
                    />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    gridPercent: {
        justifyContent: 'space-between',
    },

    gridGap: {
        gap: GAP,
    },
});
