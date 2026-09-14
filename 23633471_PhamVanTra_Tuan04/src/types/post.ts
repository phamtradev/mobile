/**
 * Kiểu dữ liệu suy ra từ JSON của https://jsonplaceholder.typicode.com/todos
 *
 * Mỗi phần tử trả về có dạng:
 *   { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }
 *
 * Đề bài gọi đây là Post nên giữ nguyên tên để khớp yêu cầu,
 * dù endpoint thực tế là /todos.
 */
export interface Post {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
