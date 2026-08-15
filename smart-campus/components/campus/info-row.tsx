import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface InfoRowProps {
    label: string;
    value: string;
    emphasized?: boolean;
}

const STACK_ABOVE_FONT_SCALE = 1.3;

export default function InfoRow({ label, value, emphasized = false }: InfoRowProps) {
    const { fontScale } = useWindowDimensions();
    const stacked = fontScale > STACK_ABOVE_FONT_SCALE;

    return (
        <View style={[styles.container, stacked ? styles.stacked : styles.row]}>
            <Text style={[styles.label, !stacked && styles.rowLabel]}>{label}</Text>

            <Text style={[!stacked && styles.rowValue, emphasized && styles.emphasized]}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },

    stacked: {
        gap: 2,
    },

    label: {
        fontWeight: 'bold',
    },

    rowLabel: {
        flexShrink: 1,
    },

    rowValue: {
        flex: 1,
    },

    emphasized: {
        fontWeight: 'bold',
    },
});
