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
exports.AuthorController = void 0;
const author_1 = require("../schemas/author");
const authors = [
    {
        "id": "1",
        "name": "Gabriel García Márquez",
        "birth_date": "1927-03-06",
        "nationality": "Colombiano",
        "famous_works": [
            {
                "title": "Cien años de soledad",
                "year": 1967
            },
            {
                "title": "El amor en los tiempos del cólera",
                "year": 1985
            }
        ]
    },
    {
        "id": "2",
        "name": "George Orwell",
        "birth_date": "1903-06-25",
        "nationality": "Británico",
        "famous_works": [
            {
                "title": "1984",
                "year": 1949
            },
            {
                "title": "Rebelión en la granja",
                "year": 1945
            }
        ]
    },
    {
        "id": "3",
        "name": "J.R.R. Tolkien",
        "birth_date": "1892-01-03",
        "nationality": "Británico",
        "famous_works": [
            {
                "title": "El Señor de los Anillos: La Comunidad del Anillo",
                "year": 1954
            },
            {
                "title": "El Hobbit",
                "year": 1937
            }
        ]
    }
];
class AuthorController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json(authors);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const author = authors.find((author) => author.id === id);
                if (!author)
                    return res.status(404).json({ message: `Author with ${id} ID not found.` });
                return res.json(author);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (0, author_1.validateAuthor)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result });
                }
                const newAuthor = result.data;
                authors.push(newAuthor);
                res.status(201).json(newAuthor);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = (0, author_1.validatePartialAuthor)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result });
                }
                const authorIndex = authors.findIndex((author) => author.id === id);
                if (authorIndex === -1) {
                    return res.status(404).json({ message: 'Author not found' });
                }
                const updatedAuthor = Object.assign(Object.assign({}, authors[authorIndex]), result.data);
                authors[authorIndex] = updatedAuthor;
                return res.json(updatedAuthor);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const authorIndex = authors.findIndex((author) => author.id === id);
                if (authorIndex === -1) {
                    return res.status(404).json({ message: 'Author not found' });
                }
                const deletedAuthor = authors.splice(authorIndex, 1)[0];
                return res.json(deletedAuthor);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.AuthorController = AuthorController;
