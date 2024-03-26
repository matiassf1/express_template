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
exports.BookMongoModel = void 0;
const mongodb_1 = require("mongodb");
class BookMongoModel {
    constructor(booksDb) {
        this.booksCollection = booksDb.collection('books');
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booksWithIds = yield this.booksCollection.find().toArray();
                const books = booksWithIds.map((bookWithId) => this.mapBookFromDatabase(bookWithId));
                return books;
            }
            catch (error) {
                console.error("Error getting all books:", error);
                throw new Error("Failed to retrieve books");
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.booksCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
                return book ? this.mapBookFromDatabase(book) : null;
            }
            catch (error) {
                console.error("Error getting book by id:", error);
                throw new Error("Failed to retrieve book");
            }
        });
    }
    create(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.booksCollection.insertOne(book);
                return book;
            }
            catch (error) {
                console.error("Error creating book:", error);
                throw new Error("Failed to create book");
            }
        });
    }
    update(id, updatedBook) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.getById(id);
                if (!book) {
                    throw new Error("Book not found");
                }
                const mergedBook = Object.assign(Object.assign({}, book), updatedBook);
                yield this.booksCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: mergedBook });
                return mergedBook;
            }
            catch (error) {
                console.error("Error updating book:", error);
                throw new Error("Failed to update book");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.booksCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            }
            catch (error) {
                console.error("Error deleting book:", error);
                throw new Error("Failed to delete book");
            }
        });
    }
    mapBookFromDatabase(book) {
        return {
            id: book._id.toHexString(),
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
            isbn: book.isbn,
            publisher: book.publisher,
        };
    }
}
exports.BookMongoModel = BookMongoModel;
