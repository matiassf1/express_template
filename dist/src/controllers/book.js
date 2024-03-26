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
class BookController {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookModel.getAll();
                return res.json(books);
            }
            catch (error) {
                console.error("Error getting all books:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const book = yield this.bookModel.getById(id);
                if (!book) {
                    return res.status(404).json({ message: `Book with ${id} ID not found.` });
                }
                return res.json(book);
            }
            catch (error) {
                console.error("Error getting book by id:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bookModel.create(req.body);
                return res.status(201).json(result);
            }
            catch (error) {
                console.error("Error creating book:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.bookModel.update(id, req.body);
                if (!result) {
                    return res.status(404).json({ message: 'Book not found' });
                }
                return res.json(result);
            }
            catch (error) {
                console.error("Error updating book:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.bookModel.delete(id);
                return res.json({ message: "Book deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting book:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.BookController = BookController;
