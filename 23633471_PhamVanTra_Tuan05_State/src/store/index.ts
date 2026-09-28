import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/slices/auth-slice';
import cartReducer from '@/store/slices/cart-slice';
import wishlistReducer from '@/store/slices/wishlist-slice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        wishlist: wishlistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
