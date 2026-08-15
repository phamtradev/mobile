import { Image } from 'expo-image';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Campus } from '@/constants/theme';
import type { Course } from '@/types/campus';

const PLACEHOLDER_BLURHASH = 'L4ADlN~q00%M00xu%MRj00Rj~qxu';

function initials(title: string) {
    return title
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase() ?? '')
        .join('');
}

export default function CourseCard({ course }: { course: Course }) {
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(false);

    const { cover } = course;
    const decorative = cover?.alt === undefined;
    const showImage = cover && !failed;

    return (
        <View style={styles.card}>
            <View style={styles.media}>
                {showImage ? (
                    <>
                        <Image
                            source={typeof cover.source === 'string' ? { uri: cover.source } : cover.source}
                            style={styles.image}
                            contentFit="cover"
                            transition={200}
                            placeholder={{ blurhash: PLACEHOLDER_BLURHASH }}
                            onLoadStart={() => setLoading(true)}
                            onLoadEnd={() => setLoading(false)}
                            onError={() => {
                                setLoading(false);
                                setFailed(true);
                            }}
                            accessible={!decorative}
                            accessibilityLabel={cover.alt}
                            accessibilityRole={decorative ? undefined : 'image'}
                            accessibilityElementsHidden={decorative}
                            importantForAccessibility={decorative ? 'no-hide-descendants' : 'auto'}
                        />

                        {loading ? (
                            <View style={styles.overlay} pointerEvents="none">
                                <ActivityIndicator color={Campus.primary} />
                            </View>
                        ) : null}
                    </>
                ) : (
                    <View
                        style={styles.fallback}
                        accessibilityElementsHidden
                        importantForAccessibility="no-hide-descendants"
                    >
                        <Text style={styles.fallbackText}>{initials(course.title)}</Text>
                    </View>
                )}
            </View>

            <View
                style={styles.body}
                accessible
                accessibilityLabel={`Khóa học ${course.title}, giảng viên ${course.lecturer}`}
            >
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.lecturer}>{course.lecturer}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Campus.surface,
        borderWidth: 1,
        borderColor: Campus.border,
        borderRadius: 12,
        overflow: 'hidden',
    },

    media: {
        height: 120,
        backgroundColor: '#e3e8ea',
    },

    image: {
        width: '100%',
        height: '100%',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fallback: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fallbackText: {
        fontSize: 28,
        fontWeight: '700',
        color: Campus.textMuted,
    },

    body: {
        padding: 12,
        gap: 4,
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Campus.text,
    },

    lecturer: {
        fontSize: 14,
        color: Campus.textMuted,
    },
});
