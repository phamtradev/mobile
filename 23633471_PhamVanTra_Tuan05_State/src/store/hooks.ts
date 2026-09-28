import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from '@/store';

/**
 * Hai hook này chỉ dùng bên trong thư mục adapters.
 *
 * Component không được gọi thẳng vào đây — đó là ranh giới của adapter
 * pattern. Xem src/store/adapters để biết lý do.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
