import { Request, Response } from "express";
import { readJson } from "../utils";
import { Author, validateAuthor, validatePartialAuthor } from "../schemas/author";

const authors = readJson('../author.json');


export class AuthorController {

    static async getAll(req: Request, res: Response) {
        try {
            return res.json(authors);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const author = authors.find((author: Author) => author.id === id);

            if (!author) return res.status(404).json({ message: `Author with ${id} ID not found.` })

            return res.json(author);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const result = validateAuthor(req.body);

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            const newAuthor: Author = result.data;
            authors.push(newAuthor);

            res.status(201).json(newAuthor);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = validatePartialAuthor(req.body);

            if (!result.success) {
                return res.status(400).json({ error: JSON.parse(result.error.message) });
            }

            const authorIndex = authors.findIndex((author: Author) => author.id === id);
            if (authorIndex === -1) {
                return res.status(404).json({ message: 'Author not found' });
            }

            const updatedAuthor: Author = {
                ...authors[authorIndex],
                ...result.data
            };

            authors[authorIndex] = updatedAuthor;

            return res.json(updatedAuthor);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const authorIndex = authors.findIndex((author: Author) => author.id === id);

            if (authorIndex === -1) {
                return res.status(404).json({ message: 'Author not found' });
            }

            const deletedAuthor = authors.splice(authorIndex, 1)[0];

            return res.json(deletedAuthor);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
