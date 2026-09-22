export interface Book {
    id: string;
    title: string;
    author: string;
    /** Giá hiện tại, đơn vị đồng. */
    price: number;
    /** Giá gốc khi sách đang giảm. Không có nghĩa là sách không giảm giá. */
    originalPrice?: number;
    /** Phần trăm giảm, dùng cho badge ở góc ảnh bìa. */
    discountPercent?: number;
    /** true thì hiện nhãn Mới thay cho nhãn giảm giá. */
    isNew?: boolean;
    cover: string;
    category: string;
    description: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface CartItem {
    book: Book;
    quantity: number;
}
