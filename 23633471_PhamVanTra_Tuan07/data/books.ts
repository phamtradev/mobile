import type { Book } from '@/types';

export const books: Book[] = [
    {
        id: 'nha-gia-kim',
        title: 'Nhà giả kim',
        author: 'Paulo Coelho',
        category: 'Văn học',
        price: 79000,
        description:
            'Hành trình của cậu bé chăn cừu Santiago đi tìm kho báu, và nhận ra điều quý giá nhất nằm ở chính con đường đã đi qua.',
        reviews: [
            { id: 'r1', userName: 'Minh Anh', rating: 5, comment: 'Đọc một mạch hết trong buổi tối, câu chuyện rất dễ thấm.' },
            { id: 'r2', userName: 'Quốc Bảo', rating: 4, comment: 'Giọng văn nhẹ nhàng, hợp đọc lúc cần động lực.' },
        ],
    },
    {
        id: 'dac-nhan-tam',
        title: 'Đắc nhân tâm',
        author: 'Dale Carnegie',
        category: 'Kỹ năng',
        price: 96000,
        description:
            'Những nguyên tắc ứng xử giúp xây dựng thiện cảm và giữ được mối quan hệ lâu dài trong công việc lẫn đời sống.',
        reviews: [
            { id: 'r3', userName: 'Thu Hà', rating: 5, comment: 'Ví dụ cụ thể, áp dụng được ngay vào chỗ làm.' },
        ],
    },
    {
        id: 'tuoi-tre-dang-gia-bao-nhieu',
        title: 'Tuổi trẻ đáng giá bao nhiêu',
        author: 'Rosie Nguyễn',
        category: 'Kỹ năng',
        price: 68000,
        description:
            'Góc nhìn về việc học, làm và đi của người trẻ, kèm những gợi ý rất thật cho giai đoạn còn ngồi trên ghế nhà trường.',
        reviews: [
            { id: 'r4', userName: 'Gia Huy', rating: 4, comment: 'Gần gũi, đọc xong muốn lập kế hoạch lại cho bản thân.' },
        ],
    },
    {
        id: 'mat-biec',
        title: 'Mắt biếc',
        author: 'Nguyễn Nhật Ánh',
        category: 'Văn học',
        price: 88000,
        description:
            'Chuyện tình thầm lặng của Ngạn với Hà Lan, kéo dài từ làng Đo Đo cho tới tận thành phố.',
        reviews: [
            { id: 'r5', userName: 'Lan Chi', rating: 5, comment: 'Buồn nhưng đẹp, đọc lại lần nào cũng thấy tiếc cho Ngạn.' },
        ],
    },
];

export const findBook = (id?: string) => books.find((book) => book.id === id);

export const formatPrice = (value: number) => `${value.toLocaleString('vi-VN')} đ`;
