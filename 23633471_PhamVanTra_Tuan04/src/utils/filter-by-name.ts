/**
 * Bài 13 — bộ lọc dùng chung cho nhiều loại dữ liệu.
 *
 * Ràng buộc T extends HasName nói với TypeScript: chấp nhận mọi object,
 * miễn là có trường name kiểu string. Nhờ vậy hàm chạy được với User,
 * Category, Brand... mà giá trị trả về vẫn giữ đúng kiểu đầu vào —
 * lọc User[] thì nhận lại User[], không bị mất kiểu thành object[].
 */

export interface HasName {
    name: string;
}

/** Bỏ dấu tiếng Việt để gõ "dien thoai" vẫn tìm ra "điện thoại". */
function normalize(value: string): string {
    return value
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim();
}

export function filterByName<T extends HasName>(items: T[], keyword: string): T[] {
    const needle = normalize(keyword);
    if (needle.length === 0) return items;

    return items.filter((item) => normalize(item.name).includes(needle));
}

/**
 * Biến thể khi trường cần lọc không tên là name.
 * selector trả về string nên truyền nhầm trường số sẽ bị chặn lúc biên dịch.
 */
export function filterBy<T>(items: T[], keyword: string, selector: (item: T) => string): T[] {
    const needle = normalize(keyword);
    if (needle.length === 0) return items;

    return items.filter((item) => normalize(selector(item)).includes(needle));
}
