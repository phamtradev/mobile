import { useCallback, useMemo } from 'react';

import { books } from '@/data/books';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addItem, clearCart, removeItem, setQuantity } from '@/store/slices/cart-slice';
import type { CartItem } from '@/types/book';

export interface CartAdapter {
    items: CartItem[];
    /** Tổng số quyển, dùng cho badge trên nút giỏ hàng và trên tab. */
    totalCount: number;
    totalPrice: number;
    add: (bookId: string, quantity?: number) => void;
    remove: (bookId: string) => void;
    changeQuantity: (bookId: string, quantity: number) => void;
    clear: () => void;
    quantityOf: (bookId: string) => number;
}

/**
 * Adapter cho store giỏ hàng.
 *
 * Đây là lớp duy nhất trong ứng dụng biết Redux Toolkit đang được dùng.
 * Component gọi useCart() và nhận về dữ liệu cùng vài hàm thường — chúng
 * không import useSelector, useDispatch hay bất kỳ action creator nào.
 *
 * Đổi sang Recoil chỉ cần viết lại đúng file này cho khớp kiểu CartAdapter.
 * Không màn hình nào phải sửa, vì hợp đồng giữa chúng và store là kiểu
 * CartAdapter chứ không phải thư viện bên dưới.
 *
 * Store chỉ giữ bookId và số lượng, nên việc ghép với dữ liệu sách để ra
 * tên, giá và tổng tiền nằm ở đây.
 */
export function useCart(): CartAdapter {
    const lines = useAppSelector((state) => state.cart.lines);
    const dispatch = useAppDispatch();

    const items = useMemo<CartItem[]>(() => {
        return lines
            .map((line) => {
                const book = books.find((candidate) => candidate.id === line.bookId);
                return book ? { book, quantity: line.quantity } : null;
            })
            .filter((item): item is CartItem => item !== null);
    }, [lines]);

    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items],
    );

    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.book.price * item.quantity, 0),
        [items],
    );

    const add = useCallback(
        (bookId: string, quantity = 1) => {
            dispatch(addItem({ bookId, quantity }));
        },
        [dispatch],
    );

    const remove = useCallback((bookId: string) => dispatch(removeItem(bookId)), [dispatch]);

    const changeQuantity = useCallback(
        (bookId: string, quantity: number) => {
            dispatch(setQuantity({ bookId, quantity }));
        },
        [dispatch],
    );

    const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

    const quantityOf = useCallback(
        (bookId: string) => lines.find((line) => line.bookId === bookId)?.quantity ?? 0,
        [lines],
    );

    return { items, totalCount, totalPrice, add, remove, changeQuantity, clear, quantityOf };
}
