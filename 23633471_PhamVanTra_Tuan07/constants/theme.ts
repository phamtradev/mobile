import { Platform } from 'react-native';

export const Spacing = {
    one: 4,
    two: 8,
    three: 16,
    four: 24,
    five: 32,
} as const;

export const Brand = {
    navy: '#1A237E',
    indigo: '#3F51B5',
    indigoLight: '#E8EAF6',
    onNavy: '#FFFFFF',
    surface: '#FFFFFF',
    page: '#F5F6FA',
    border: '#DDE0E6',
    text: '#11181C',
    textMuted: '#60646C',
    star: '#F9A825',
    starEmpty: '#CFD2D8',
    danger: '#D32F2F',
    dangerLight: '#FDECEA',
    success: '#2E7D32',
    disabled: '#B0B4BA',
} as const;

export const MinTouchTarget = 48;

export const KeyboardBehavior = Platform.select({ ios: 'padding' as const, default: undefined });
