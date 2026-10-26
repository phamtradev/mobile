import { axiosInstance } from '@/libs/axios';
import { Comment } from '@/types';

export const commentService = {
    async getByBookId(bookId: string): Promise<Comment[]> {
        const response = await axiosInstance.get<Comment[]>('/comments', {
            params: { bookId },
        });
        return response.data;
    },

    async create(bookId: string, comment: Omit<Comment, 'id' | 'bookId'>): Promise<Comment> {
        const response = await axiosInstance.post<Comment>('/comments', { bookId, ...comment });
        return response.data;
    },
};
