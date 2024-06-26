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
const pagination_1 = require("../common/pagination");
class BookController {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paginationDTO = new pagination_1.PaginationDTO();
                const { limit, skip, sort } = paginationDTO.paginate(req.query);
                const searchQuery = paginationDTO.search(req.query);
                const queryParams = (0, book_1.validateQueryParamsBook)(req.query);
                let genres = queryParams.genres;
                const filterParams = { limit, skip, searchQuery, sort, genres };
                const books = yield this.bookModel.get(filterParams);
                const result = paginationDTO.paginate(req.query);
                result.data = books;
                return res.json(result);
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
                const result = (0, book_1.validateBook)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result.error });
                }
                const newBook = Object.assign({}, result.data);
                const createdBook = yield this.bookModel.create(newBook);
                return res.status(201).json(createdBook);
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
                const result = (0, book_1.validatePartialBook)(req.body);
                if (!result.success) {
                    return res.status(400).json({ error: result.error });
                }
                const updatedData = result.data;
                const updatedBook = yield this.bookModel.update(id, updatedData);
                if (!updatedBook) {
                    return res.status(404).json({ message: 'Book not found' });
                }
                return res.json(updatedBook);
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
