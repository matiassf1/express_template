import { z } from 'zod';

export type filterParamsBookType = {
    limit: number;
    skip: number;
    sort: string | null;
    searchQuery: string;
    genres?: BookGenre[];
}

export enum BookGenre {
    Fiction = "Fiction",
    Mystery = "Mystery",
    Thriller = "Thriller",
    Romance = "Romance",
    ScienceFiction = "Science Fiction",
    Fantasy = "Fantasy",
    NonFiction = "Non-Fiction",
    Biography = "Biography",
    History = "History",
    SelfHelp = "Self-Help",
}


export const BookSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.nativeEnum(BookGenre),
    year: z.number(),
    isbn: z.string(),
    publisher: z.string(),
});

const BookQueryParamsSchema = z.object({
    genres: z.nativeEnum(BookGenre).array().optional(),
});


export type Book = {
    id?: string,
    title: string,
    author: string,
    genre: BookGenre,
    year: number,
    isbn: string,
    publisher: string,
}

export function validateBook(input: unknown) {
    return BookSchema.safeParse(input)
}

export function validatePartialBook(input: unknown) {
    return BookSchema.partial().safeParse(input)
}


export function validateQueryParamsBook(input: unknown) {
    return BookQueryParamsSchema.parse(input)
}