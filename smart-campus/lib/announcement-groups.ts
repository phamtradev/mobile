import type { Announcement } from '@/types/campus';

export interface AnnouncementSection {
    title: string;
    data: Announcement[];
}

function startOfDay(date: Date) {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

export function groupAnnouncements(
    items: Announcement[],
    now: Date = new Date(),
): AnnouncementSection[] {
    const today = startOfDay(now);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const buckets: Record<string, Announcement[]> = {
        'Hôm nay': [],
        'Tuần này': [],
        'Trước đó': [],
    };

    for (const item of items) {
        const published = new Date(item.publishedAt);

        if (published >= today) buckets['Hôm nay'].push(item);
        else if (published >= weekAgo) buckets['Tuần này'].push(item);
        else buckets['Trước đó'].push(item);
    }

    return Object.entries(buckets)
        .filter(([, data]) => data.length > 0)
        .map(([title, data]) => ({ title, data }));
}
