export interface Student {
    fullName: string;
    studentId: string;
    major: string;
    cohort: string;
}

export interface Course {
    id: string;
    title: string;
    lecturer: string;
}

export interface Announcement {
    id: string;
    title: string;
    /** ISO 8601, used to group into Today / This Week / Earlier. */
    publishedAt: string;
}
