import { Book } from '@/types';

export const books: Book[] = [
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self development',
    description: 'Small, practical changes that compound into remarkable results.',
    reviews: [
      { id: 'r1', userName: 'Maya', rating: 5, comment: 'Clear, useful, and easy to put into practice.' },
      { id: 'r2', userName: 'Noah', rating: 4, comment: 'A great framework for building better routines.' },
    ],
  },
  {
    id: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Self development',
    description: 'Rules for focused success in a distracted world.',
    reviews: [{ id: 'r3', userName: 'Linh', rating: 5, comment: 'Motivating and especially relevant today.' }],
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Fiction',
    description: 'A fable about following your dream and finding your purpose.',
    reviews: [{ id: 'r4', userName: 'Alex', rating: 4, comment: 'A thoughtful, quick read.' }],
  },
];
