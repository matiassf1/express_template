import { z } from "zod";

export const AuthorSchema = z.object({
    id: z.string(),
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

export type Author = z.infer<typeof AuthorSchema>;

export function validateAuthor(input: unknown) {
    return AuthorSchema.safeParse(input)
}

export function validatePartialAuthor(input: unknown) {
    return AuthorSchema.partial().safeParse(input)
}