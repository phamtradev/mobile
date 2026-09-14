import { useCallback, useEffect, useRef, useState } from 'react';

import { toCustomError, toUserMessage } from '@/api/api-error';
import type { AsyncState } from '@/types/api';

export interface UseAsyncResult<T> extends AsyncState<T> {
    /** Tải lần đầu hoặc thử lại sau lỗi — bật cờ loading. */
    run: () => Promise<void>;
    /** Kéo xuống làm mới — bật cờ refreshing, giữ nguyên dữ liệu đang hiện. */
    refresh: () => Promise<void>;
}

export interface UseAsyncOptions {
    /** false khi màn hình chỉ gọi API sau một hành động của người dùng. */
    immediate?: boolean;
}

/**
 * Quản lý vòng đời của một tiến trình bất đồng bộ, viết bằng Generic <T>.
 *
 * Bảy màn hình trong bài dùng chung hook này. Nếu mỗi màn hình tự khai báo
 * bốn useState rồi tự viết try/catch thì phần lặp lại chiếm phần lớn code,
 * và mỗi lần sửa cách xử lý lỗi phải sửa bảy chỗ.
 */
export function useAsync<T>(
    task: () => Promise<T>,
    options: UseAsyncOptions = {},
): UseAsyncResult<T> {
    const { immediate = true } = options;

    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: immediate,
        refreshing: false,
        error: null,
    });

    // Chặn phản hồi đến muộn ghi đè phản hồi mới hơn. Người dùng gõ "phone"
    // rồi sửa thành "laptop": nếu request "phone" về sau, không có bộ đếm này
    // thì màn hình hiện kết quả của từ khoá đã bị xoá.
    const requestId = useRef(0);

    const execute = useCallback(
        async (mode: 'load' | 'refresh') => {
            const id = ++requestId.current;

            setState((current) => ({
                ...current,
                loading: mode === 'load',
                refreshing: mode === 'refresh',
                error: null,
            }));

            try {
                const data = await task();
                if (id !== requestId.current) return;

                setState({ data, loading: false, refreshing: false, error: null });
            } catch (caught) {
                if (id !== requestId.current) return;

                // Giữ lại data cũ: lỗi làm mới không nên xoá trắng thứ
                // người dùng đang đọc.
                setState((current) => ({
                    data: current.data,
                    loading: false,
                    refreshing: false,
                    error: toUserMessage(toCustomError(caught)),
                }));
            }
        },
        [task],
    );

    useEffect(() => {
        if (immediate) void execute('load');
    }, [execute, immediate]);

    const run = useCallback(() => execute('load'), [execute]);
    const refresh = useCallback(() => execute('refresh'), [execute]);

    return { ...state, run, refresh };
}
