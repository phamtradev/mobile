import MessageView from '@/components/common/message-view';

interface AsyncStateViewProps {
    loading: boolean;
    error: string | null;
    onRetry: () => void;
    /** Chữ hiện khi gọi API thành công nhưng không có phần tử nào. */
    emptyTitle: string;
    emptyDescription?: string;
    /** Hành động kèm theo trạng thái rỗng, ví dụ xoá bộ lọc. */
    actionLabel?: string;
    onAction?: () => void;
    loadingTitle?: string;
}

/**
 * Quyết định hiển thị gì khi danh sách chưa có nội dung.
 *
 * Ba trạng thái này luôn đi cùng nhau ở mọi màn hình gọi API, và thứ tự ưu tiên
 * luôn giống nhau: đang tải trước, lỗi sau, rỗng cuối. Gom vào một chỗ để bảy
 * màn hình không phải lặp lại cùng một chuỗi if.
 *
 * Dùng được cả khi đứng riêng lẫn khi truyền vào ListEmptyComponent.
 */
export default function AsyncStateView({
    loading,
    error,
    onRetry,
    emptyTitle,
    emptyDescription,
    actionLabel,
    onAction,
    loadingTitle = 'Đang tải dữ liệu',
}: AsyncStateViewProps) {
    if (loading) {
        return <MessageView busy title={loadingTitle} description="Vui lòng đợi trong giây lát." />;
    }

    if (error) {
        return (
            <MessageView
                tone="error"
                title="Không tải được dữ liệu"
                description={error}
                actionLabel="Thử lại"
                onAction={onRetry}
            />
        );
    }

    return (
        <MessageView
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={actionLabel}
            onAction={onAction}
        />
    );
}
