import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { SecondaryButton } from '@/components/ui/button';
import { Campus } from '@/constants/theme';

interface FeedStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    busy?: boolean;
}

export default function FeedState({
    title,
    description,
    actionLabel,
    onAction,
    busy = false,
}: FeedStateProps) {
    return (
        <View style={styles.container} accessibilityLiveRegion="polite">
            {busy ? <ActivityIndicator size="large" color={Campus.primary} /> : null}

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            {actionLabel && onAction ? (
                <SecondaryButton label={actionLabel} onPress={onAction} style={styles.action} />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 48,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 8,
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        color: Campus.text,
        textAlign: 'center',
    },

    description: {
        fontSize: 14,
        lineHeight: 20,
        color: Campus.textMuted,
        textAlign: 'center',
    },

    action: {
        marginTop: 8,
        alignSelf: 'stretch',
    },
});
