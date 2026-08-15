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

export interface Announcement {
    id: string;
    title: string;
    publishedAt: string;
}
