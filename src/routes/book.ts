import { Router } from "express";
import { readJson } from "../utils";
import { validateBook, validatePartialBook, Book } from "../schemas/book";

const books = readJson('../book.json')

export const bookRouter = Router();

bookRouter.get('/', (req, res) => {
    return res.json(books);
})

bookRouter.get('/:id', (req, res) => {
    const { id } = req.query;
    const book = books.find((book: Book) => book.id === id);

    if (!book) return res.status(404).json({ message: `Book with ${id} ID not found.` })

    return res.json(book);

})

bookRouter.post('/', (req, res) => {
    const result = validateBook(req.body);

    if (!result.success) {
        return res.status(402).json({ error: JSON.parse(result.error.message) });
    }

    const newBook = books.push(result.data);

    res.status(201).json(newBook);
})

bookRouter.patch('/:id', (req, res) => {
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
})

bookRouter.delete('/:id', (req, res) => {
    const { id } = req.query;

    const bookIndex = books.findIndex((book: Book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(401).json({ message: 'Book not found' });
    }

    books.splice(bookIndex, 1);

    return res.json(books[bookIndex]);
})