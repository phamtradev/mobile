import type { Book, CartItem, Category } from '@/types/book';

/**
 * Dữ liệu tĩnh dùng chung cho toàn bộ bài tập tuần 5.
 * Tuần này chỉ luyện layout nên không gọi API, không dùng state toàn cục.
 */

const cover = (seed: string) => `https://picsum.photos/seed/${seed}/300/400`;

export const categories: Category[] = [
    { id: 'c-vanhoc', name: 'Văn học' },
    { id: 'c-kinhte', name: 'Kinh tế' },
    { id: 'c-thieunhi', name: 'Thiếu nhi' },
    { id: 'c-kynang', name: 'Kỹ năng sống' },
    { id: 'c-truyentranh', name: 'Truyện tranh' },
    { id: 'c-ngoaingu', name: 'Ngoại ngữ' },
    { id: 'c-lichsu', name: 'Lịch sử' },
    { id: 'c-congnghe', name: 'Công nghệ thông tin' },
];

export const books: Book[] = [
    {
        id: 'b-01',
        title: 'Nhà Giả Kim',
        author: 'Paulo Coelho',
        price: 79000,
        originalPrice: 99000,
        discountPercent: 20,
        cover: cover('nhagiakim'),
        category: 'Văn học',
        description:
            'Câu chuyện về cậu bé chăn cừu Santiago đi tìm kho báu của đời mình. Trên hành trình băng qua sa mạc, cậu học được rằng kho báu thật sự không nằm ở đích đến mà nằm trong chính những gì mình trở thành khi đi tìm nó. Tác phẩm đã được dịch ra hơn tám mươi ngôn ngữ và trở thành một trong những cuốn sách bán chạy nhất mọi thời đại.',
    },
    {
        id: 'b-02',
        title: 'Đắc Nhân Tâm',
        author: 'Dale Carnegie',
        price: 86000,
        originalPrice: 120000,
        discountPercent: 28,
        cover: cover('dacnhantam'),
        category: 'Kỹ năng sống',
        description:
            'Cuốn sách về nghệ thuật đối nhân xử thế, hướng dẫn cách lắng nghe, cách đặt mình vào vị trí người khác và cách khiến người khác cảm thấy họ quan trọng. Những nguyên tắc trong sách được đúc kết từ hàng nghìn buổi nói chuyện và vẫn còn nguyên giá trị sau gần một thế kỷ.',
    },
    {
        id: 'b-03',
        title: 'Tư Duy Nhanh Và Chậm',
        author: 'Daniel Kahneman',
        price: 169000,
        isNew: true,
        cover: cover('tuduy'),
        category: 'Kinh tế',
        description:
            'Tác giả đoạt giải Nobel Kinh tế trình bày hai hệ thống tư duy của con người: hệ thống một nhanh, tự động và cảm tính; hệ thống hai chậm, có chủ đích và logic. Hiểu được khi nào mỗi hệ thống dẫn dắt quyết định giúp ta nhận ra những sai lệch trong phán đoán hằng ngày.',
    },
    {
        id: 'b-04',
        title: 'Dế Mèn Phiêu Lưu Ký',
        author: 'Tô Hoài',
        price: 45000,
        originalPrice: 60000,
        discountPercent: 25,
        cover: cover('demen'),
        category: 'Thiếu nhi',
        description:
            'Hành trình của chú Dế Mèn từ một kẻ kiêu căng trở thành người bạn biết nghĩ cho người khác. Tác phẩm kinh điển của văn học thiếu nhi Việt Nam, gắn với tuổi thơ của nhiều thế hệ.',
    },
    {
        id: 'b-05',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        price: 320000,
        isNew: true,
        cover: cover('cleancode'),
        category: 'Công nghệ thông tin',
        description:
            'Sách viết về cách đặt tên, cách chia hàm, cách xử lý lỗi và cách viết kiểm thử sao cho người đọc sau hiểu được ý định của người viết trước. Quan điểm xuyên suốt là code được đọc nhiều lần hơn được viết, nên tối ưu cho người đọc mới là tối ưu đúng.',
    },
    {
        id: 'b-06',
        title: 'Doraemon Tập 1',
        author: 'Fujiko F. Fujio',
        price: 22000,
        originalPrice: 25000,
        discountPercent: 12,
        cover: cover('doraemon'),
        category: 'Truyện tranh',
        description:
            'Tập truyện đầu tiên giới thiệu chú mèo máy đến từ thế kỷ 22 và cậu bé Nobita. Mỗi câu chuyện ngắn là một bảo bối và một bài học nhỏ về lòng tốt, sự chăm chỉ và tình bạn.',
    },
    {
        id: 'b-07',
        title: 'Sapiens: Lược Sử Loài Người',
        author: 'Yuval Noah Harari',
        price: 189000,
        originalPrice: 220000,
        discountPercent: 14,
        cover: cover('sapiens'),
        category: 'Lịch sử',
        description:
            'Từ một loài vượn không có gì đặc biệt ở châu Phi, loài người đã trở thành loài thống trị hành tinh. Sách lần theo ba cuộc cách mạng lớn là nhận thức, nông nghiệp và khoa học để giải thích điều đó đã xảy ra như thế nào.',
    },
    {
        id: 'b-08',
        title: 'English Grammar In Use',
        author: 'Raymond Murphy',
        price: 145000,
        cover: cover('grammar'),
        category: 'Ngoại ngữ',
        description:
            'Giáo trình ngữ pháp tiếng Anh được dùng phổ biến nhất thế giới. Mỗi đơn vị bài học gồm một trang lý thuyết và một trang bài tập, phù hợp để tự học theo tiến độ riêng.',
    },
    {
        id: 'b-09',
        title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
        author: 'Nguyễn Nhật Ánh',
        price: 98000,
        originalPrice: 125000,
        discountPercent: 22,
        cover: cover('hoavang'),
        category: 'Văn học',
        description:
            'Câu chuyện tuổi thơ ở một làng quê miền Trung, kể qua giọng của cậu bé Thiều. Những ganh tị, ân hận và tình anh em được viết bằng giọng văn trong trẻo nhưng không né tránh phần khắc nghiệt của đời sống.',
    },
];

/** Giỏ hàng mẫu cho bài tập màn hình giỏ hàng ở giờ 5. */
export const cartItems: CartItem[] = [
    { book: books[0], quantity: 2 },
    { book: books[2], quantity: 1 },
    { book: books[4], quantity: 1 },
    { book: books[5], quantity: 3 },
];

export function formatPrice(amount: number): string {
    return `${amount.toLocaleString('vi-VN')}đ`;
}

export function cartTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
}
