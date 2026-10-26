import { Review } from '@/types';

export const reviewService = {
  async create(bookId: string, review: Omit<Review, 'id'>): Promise<Review> {
    return { ...review, id: `${bookId}-${Date.now()}` };
  },
};
