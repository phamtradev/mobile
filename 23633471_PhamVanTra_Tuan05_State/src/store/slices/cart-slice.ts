import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Bài 3 — store giỏ hàng.
 *
 * Slice chỉ giữ bookId và số lượng, không giữ cả đối tượng sách.
 * Hai lý do: state luôn tuần tự hoá được, và giá sách đổi thì giỏ hàng
 * không giữ lại giá cũ. Việc ghép bookId với dữ liệu sách để ra tên và giá
 * là việc của adapter, không phải của store.
 */

export interface CartLine {
    bookId: string;
    quantity: number;
}

export interface CartState {
    lines: CartLine[];
}

const initialState: CartState = {
    lines: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<{ bookId: string; quantity?: number }>) {
            const { bookId, quantity = 1 } = action.payload;
            const existing = state.lines.find((line) => line.bookId === bookId);

            if (existing) {
                existing.quantity += quantity;
            } else {
                state.lines.push({ bookId, quantity });
            }
        },

        removeItem(state, action: PayloadAction<string>) {
            state.lines = state.lines.filter((line) => line.bookId !== action.payload);
        },

        setQuantity(state, action: PayloadAction<{ bookId: string; quantity: number }>) {
            const { bookId, quantity } = action.payload;

            // Giảm về 0 nghĩa là bỏ khỏi giỏ. Xử lý ngay trong reducer để
            // không nơi nào phải nhớ gọi removeItem thay cho setQuantity(0).
            if (quantity <= 0) {
                state.lines = state.lines.filter((line) => line.bookId !== bookId);
                return;
            }

            const existing = state.lines.find((line) => line.bookId === bookId);
            if (existing) existing.quantity = quantity;
        },

        clearCart(state) {
            state.lines = [];
        },
    },
});

export const { addItem, removeItem, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
