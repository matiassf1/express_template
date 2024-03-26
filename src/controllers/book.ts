import { Request, Response } from "express";
import { Book, validateBook, validatePartialBook } from "../schemas/book";

const books = [
    {
      "id": "1",
      "title": "Cien años de soledad",
      "author": "Gabriel García Márquez",
      "genre": "Realismo mágico",
      "year": 1967,
      "isbn": "978-84-376-0494-7",
      "publisher": "Editorial Sudamericana"
    },
    {
      "id": "2",
      "title": "1984",
      "author": "George Orwell",
      "genre": "Distopía",
      "year": 1949,
      "isbn": "978-0-452-28423-4",
      "publisher": "Secker & Warburg"
    },
    {
      "id": "3",
      "title": "El Señor de los Anillos: La Comunidad del Anillo",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasía épica",
      "year": 1954,
      "isbn": "978-84-450-7050-1",
      "publisher": "Ediciones Minotauro"
    }
  ]

export class BookController {

    static async getAll(req: Request, res: Response) {
        try {
            return res.json(books);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const book = books.find((book: Book) => book.id === id);

            if (!book) return res.status(404).json({ message: `Book with ${id} ID not found.` })

            return res.json(book);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const result = validateBook(req.body);

            if (!result.success) {
                return res.status(400).json({ error: result });
            }

            const newBook: Book = result.data;
            books.push(newBook);

            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const result = validatePartialBook(req.body);

            if (!result.success) {
                return res.status(400).json({ error: result });
            }

            const bookIndex = books.findIndex((book: Book) => book.id === id);
            if (bookIndex === -1) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const updateBook: Book = {
                ...books[bookIndex],
                ...result.data
            };

            books[bookIndex] = updateBook;

            return res.json(updateBook);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const bookIndex = books.findIndex((book: Book) => book.id === id);

            if (bookIndex === -1) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const deletedBook = books.splice(bookIndex, 1)[0];

            return res.json(deletedBook);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}