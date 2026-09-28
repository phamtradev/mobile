import { useCallback, useMemo } from 'react';

import { books } from '@/data/books';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearWishlist, remove, toggle } from '@/store/slices/wishlist-slice';
import type { Book } from '@/types/book';

export interface WishlistAdapter {
    items: Book[];
    count: number;
    isSaved: (bookId: string) => boolean;
    toggleBook: (bookId: string) => void;
    removeBook: (bookId: string) => void;
    clear: () => void;
}

/**
 * Adapter cho danh sách yêu thích.
 *
 * Cùng khuôn với useCart: store giữ mảng id, adapter ghép ra đối tượng sách.
 * Viết chung một khuôn nên đọc file này không cần học lại cách dùng.
 */
export function useWishlist(): WishlistAdapter {
    const bookIds = useAppSelector((state) => state.wishlist.bookIds);
    const dispatch = useAppDispatch();

    const items = useMemo<Book[]>(
        () =>
            bookIds
                .map((id) => books.find((book) => book.id === id))
                .filter((book): book is Book => book !== undefined),
        [bookIds],
    );

    const isSaved = useCallback((bookId: string) => bookIds.includes(bookId), [bookIds]);

    const toggleBook = useCallback((bookId: string) => dispatch(toggle(bookId)), [dispatch]);
    const removeBook = useCallback((bookId: string) => dispatch(remove(bookId)), [dispatch]);
    const clear = useCallback(() => dispatch(clearWishlist()), [dispatch]);

    return { items, count: bookIds.length, isSaved, toggleBook, removeBook, clear };
}
