import BookDetailScreen from '@/components/screens/book-detail-screen';
import { books } from '@/data/books';

/** Giờ 4 — Bài tập 2: màn hình Chi tiết sách. */
export default function Gio4Bai2Detail() {
    return <BookDetailScreen book={books[0]} />;
}
