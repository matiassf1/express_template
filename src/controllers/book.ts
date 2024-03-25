import { Request, Response } from "express";
import { Book, validateBook, validatePartialBook } from "../schemas/book";
import { readJson } from "../utils";

const books = readJson('../book.json')

export class BookController {

    static async getAll(req: Request, res: Response) {
        return res.json(books);
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.query;
        const book = books.find((book: Book) => book.id === id);

        if (!book) return res.status(404).json({ message: `Book with ${id} ID not found.` })

        return res.json(book);

    }

    static async create(req: Request, res: Response) {
        const result = validateBook(req.body);

        if (!result.success) {
            return res.status(402).json({ error: JSON.parse(result.error.message) });
        }

        const newBook = books.push(result.data);

        res.status(201).json(newBook);
    }

    static async updateById(req: Request, res: Response) {
        const { id } = req.query;
        const result = validatePartialBook(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const bookIndex = books.findIndex((book: Book) => book.id === id);
        if (bookIndex === -1) {
            return res.status(401).json({ message: 'Book not found' });
        }

        const updateBook: Book = {
            ...books[bookIndex],
            ...result.data
        };

        books[bookIndex] = updateBook;

        return res.json(updateBook);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.query;

        const bookIndex = books.findIndex((book: Book) => book.id === id);

        if (bookIndex === -1) {
            return res.status(401).json({ message: 'Book not found' });
        }

        books.splice(bookIndex, 1);

        return res.json(books[bookIndex]);
    }
}