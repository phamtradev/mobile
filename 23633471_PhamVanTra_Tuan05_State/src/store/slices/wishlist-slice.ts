import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Thử thách — store danh sách yêu thích.
 *
 * Chỉ giữ mảng bookId. Giống cart, việc ghép ra đối tượng sách là của adapter.
 */

export interface WishlistState {
    bookIds: string[];
}

const initialState: WishlistState = {
    bookIds: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggle(state, action: PayloadAction<string>) {
            const bookId = action.payload;
            const index = state.bookIds.indexOf(bookId);

            if (index >= 0) {
                state.bookIds.splice(index, 1);
            } else {
                state.bookIds.push(bookId);
            }
        },

        remove(state, action: PayloadAction<string>) {
            state.bookIds = state.bookIds.filter((id) => id !== action.payload);
        },

        clearWishlist(state) {
            state.bookIds = [];
        },
    },
});

export const { toggle, remove, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
