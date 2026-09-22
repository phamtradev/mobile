import BookGrid from '@/components/book/book-grid';
import DemoPage from '@/components/common/demo-page';
import { books } from '@/data/books';

export default function Gio2Bai2Grid() {
    return (
        <DemoPage note="row + wrap + justifyContent space-between · mỗi ô width 48% · ảnh width 100% với aspectRatio 3/4">
            <BookGrid books={books} columns={2} mode="percent" />
        </DemoPage>
    );
}
