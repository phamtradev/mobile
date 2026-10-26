export type User = {
    id: string;
    name: string;
    email: string;
};

export type Comment = {
    id: string;
    bookId: string;
    userName: string;
    rating: number;
    text: string;
};

export type BookResponse = {
    id: string;
    title: string;
    author: string;
    views: number;
    image: string;
    avatar: string;
};
