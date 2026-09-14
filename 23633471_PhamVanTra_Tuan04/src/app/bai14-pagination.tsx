import PaginationScreen from '@/components/products/pagination-screen';

/** Route mỏng: expo-router chỉ cần một default export ở đây.
 *  Toàn bộ logic nằm trong component dưới src/components để màn hình
 *  test được độc lập với hệ thống định tuyến. */
export default function Bai14PaginationRoute() {
    return <PaginationScreen />;
}
