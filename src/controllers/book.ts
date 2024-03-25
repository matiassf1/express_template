import { Request, Response } from "express";
import { Book, validateBook, validatePartialBook } from "../schemas/book";
import { readJson } from "../utils";

const books = readJson('../book.json')

interface IBookController {
    getAll(req: Request, res: Response): any;
    getById(req: Request, res: Response): any;
    create(req: Request, res: Response): any;
    updateById(req: Request, res: Response): any;
    delete(req: Request, res: Response): any;
    
}

export class BookController {

    static async getAll(req: Request, res: Response) {
        return res.json(books);
    }

    static async getById(req: Request, res: Response) {
        const id = req.params.id;
        const book = books.find((book: Book) => book.id === id);

        if (!book) return res.status(404).json({ message: `Book with ${id} ID not found.` })

        return res.json(book);

    }

    static async create(req: Request, res: Response) {
        const result = validateBook(req.body);
    
        if (!result.success) {
            return res.status(402).json({ error: JSON.parse(result.error.message) });
        }
    
        const newBook: Book = result.data;
        books.push(newBook);
    
        res.status(201).json(newBook);
    }
    

    static async updateById(req: Request, res: Response) {
        const id = req.params.id;
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
        const id = req.params.id;

        const bookIndex = books.findIndex((book: Book) => book.id === id);
    
        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' });
        }
    
        const deletedBook = books.splice(bookIndex, 1)[0];
    
        return res.json(deletedBook);
    }
    
}