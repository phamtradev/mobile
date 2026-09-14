import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaxContentWidth, Spacing } from '@/constants/theme';

interface ScreenProps {
    children: ReactNode;
    /** false khi con là FlatList và tự lo padding của mình. */
    padded?: boolean;
}

/** Khung ngoài dùng chung: safe area, nền trắng, giới hạn bề rộng trên tablet. */
export default function Screen({ children, padded = true }: ScreenProps) {
    return (
        <SafeAreaView style={styles.safe} edges={['bottom', 'left', 'right']}>
            <View style={[styles.content, padded && styles.padding]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        flex: 1,
        width: '100%',
        maxWidth: MaxContentWidth,
        alignSelf: 'center',
    },

    padding: {
        padding: Spacing.three,
    },
});
