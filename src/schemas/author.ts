import { z } from "zod";

export type filterParamsAuthorType = {
    limit: number;
    skip: number;
    sort: string | null;
    searchQuery: string;
}

export const AuthorSchema = z.object({
    name: z.string(),
    birth_date: z.string(),
    nationality: z.string(),
    famous_works: z.array(
        z.object({
            title: z.string(),
            year: z.number(),
        })
    ),
});

export type Author = {
    id: string,
    name: string,
    birth_date: string,
    nationality: string,
    famous_works: {
        title: string,
        year: number
    }[]
};

export function validateAuthor(input: unknown) {
    return AuthorSchema.safeParse(input)
}

export function validatePartialAuthor(input: unknown) {
    return AuthorSchema.partial().safeParse(input)
}