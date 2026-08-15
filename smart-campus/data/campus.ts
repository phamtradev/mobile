import type { Announcement, Course, Student } from '@/types/campus';

export const student: Student = {
    fullName: 'Phạm Văn Trà',
    studentId: '23633471',
    major: 'Kỹ thuật phần mềm',
    cohort: '2023 - 2027',
};

export const courses: Course[] = [
    {
        id: 'c-mobile',
        title: 'Lập trình Mobile',
        lecturer: 'TS. Nguyễn Minh Quang',
        cover: {
            source: require('@/assets/images/react-logo.png'),
            alt: 'Logo React Native',
        },
    },
    {
        id: 'c-db',
        title: 'Cơ sở dữ liệu',
        lecturer: 'ThS. Trần Thu Hà',
        cover: {
            source: 'https://picsum.photos/seed/database/600/400',
            alt: 'Phòng máy chủ của trung tâm dữ liệu',
        },
    },
    {
        id: 'c-ui',
        title: 'Phát triển giao diện',
        lecturer: 'ThS. Lê Hoàng Nam',
        cover: { source: 'https://picsum.photos/seed/interface/600/400' },
    },
    {
        id: 'c-network',
        title: 'Mạng máy tính',
        lecturer: 'TS. Vũ Đình Phong',
        cover: {
            source: 'https://smart-campus.invalid/khong-ton-tai.jpg',
            alt: 'Sơ đồ hạ tầng mạng của trường',
        },
    },
    {
        id: 'c-ethics',
        title: 'Đạo đức nghề nghiệp CNTT',
        lecturer: 'ThS. Đỗ Thanh Mai',
    },
];

export const announcements: Announcement[] = [
    { id: 'a-01', title: 'Thông báo học phí học kỳ mới', publishedAt: '2026-08-15T08:30:00+07:00' },
    { id: 'a-02', title: 'Lịch thi cuối kỳ', publishedAt: '2026-08-15T07:00:00+07:00' },
    { id: 'a-03', title: 'Đăng ký học phần học kỳ I năm học 2026-2027', publishedAt: '2026-08-12T14:00:00+07:00' },
    { id: 'a-04', title: 'Bảo trì hệ thống cổng thông tin sinh viên', publishedAt: '2026-08-11T09:15:00+07:00' },
    { id: 'a-05', title: 'Kết quả xét học bổng khuyến khích học tập', publishedAt: '2026-07-28T16:45:00+07:00' },
];
