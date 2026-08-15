import type { ImageSourcePropType } from 'react-native';

export interface Student {
    fullName: string;
    studentId: string;
    major: string;
    cohort: string;
}

export interface CourseCover {
    source: ImageSourcePropType | string;
    alt?: string;
}

export interface Course {
    id: string;
    title: string;
    lecturer: string;
    cover?: CourseCover;
}

export interface ProfileDraft {
    fullName: string;
    studentId: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    summary: string;
}

export type ProfileField = keyof ProfileDraft;

export interface Announcement {
    id: string;
    title: string;
    body: string;
    publishedAt: string;
}
