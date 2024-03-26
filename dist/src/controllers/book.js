"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = require("../schemas/book");
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
];
class BookController {
    constructor(db) {
        this.db = db;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json(books);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const book = books.find((book) => book.id === id);
                if (!book)
                    return res.status(404).json({ message: `Book with ${id} ID not found.` });
                return res.json(book);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, book_1.validateBook)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result });
                }
                const newBook = result.data;
                books.push(newBook);
                res.status(201).json(newBook);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = (0, book_1.validatePartialBook)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result });
                }
                const bookIndex = books.findIndex((book) => book.id === id);
                if (bookIndex === -1) {
                    return res.status(404).json({ message: 'Book not found' });
                }
                const updateBook = Object.assign(Object.assign({}, books[bookIndex]), result.data);
                books[bookIndex] = updateBook;
                return res.json(updateBook);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const bookIndex = books.findIndex((book) => book.id === id);
                if (bookIndex === -1) {
                    return res.status(404).json({ message: 'Book not found' });
                }
                const deletedBook = books.splice(bookIndex, 1)[0];
                return res.json(deletedBook);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.BookController = BookController;
