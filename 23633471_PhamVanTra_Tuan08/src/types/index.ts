export type User = {
  id: string;
  name: string;
  email: string;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  reviews: Review[];
};
