import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

interface InfoRowProps {
    label: string;
    value: string;
    emphasized?: boolean;
}

export default function InfoRow({ label, value, emphasized = false }: InfoRowProps) {
    const { fontScale } = useWindowDimensions();

    // Breakpoint comes from where the layout actually breaks, not from a device
    // name: past 1.3 the label column eats more than half the width and the
    // two-column reading order stops working at any label length.
    const stacked = fontScale > 1.3;

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
        // flex-start, not center: a value that wraps to two lines would otherwise
        // drift away from the label it belongs to.
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
        // No fixed width: the label sizes to its own text, so a longer translation
        // never gets chopped at an arbitrary point.
        flexShrink: 1,
    },

    rowValue: {
        flex: 1,
    },

    emphasized: {
        fontWeight: 'bold',
    },
});
