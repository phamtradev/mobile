export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Session {
    token: string;
    user: User;
    expiresAt: string;
}

export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    price: number;
    description: string;
    reviews: Review[];
}
