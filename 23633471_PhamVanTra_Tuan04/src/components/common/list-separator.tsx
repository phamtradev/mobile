import { StyleSheet, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

/** Vạch kẻ giữa hai dòng. Không vẽ sau dòng cuối vì đây là separator. */
export default function ListSeparator() {
    return <View style={styles.line} />;
}

const styles = StyleSheet.create({
    line: {
        height: StyleSheet.hairlineWidth,
        marginHorizontal: Spacing.three,
        backgroundColor: Brand.border,
    },
});
