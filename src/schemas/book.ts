import { z } from 'zod';

export const BookSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    year: z.number(),
    isbn: z.string(),
    publisher: z.string(),
});

export type Book = z.infer<typeof BookSchema>;

export function validateBook(input: unknown) {
    return BookSchema.safeParse(input)
}

export function validatePartialBook(input: unknown) {
    return BookSchema.partial().safeParse(input)
}