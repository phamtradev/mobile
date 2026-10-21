import type { Review } from '@/types';

const LATENCY_MS = 600;

export const reviewService = {
    async create(bookId: string, review: Omit<Review, 'id'>): Promise<Review> {
        await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
        return { ...review, id: `${bookId}-${Date.now()}` };
    },
};
