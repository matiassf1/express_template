"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryParamsBook = exports.validatePartialBook = exports.validateBook = exports.BookSchema = exports.BookGenre = void 0;
const zod_1 = require("zod");
var BookGenre;
(function (BookGenre) {
    BookGenre["Fiction"] = "Fiction";
    BookGenre["Mystery"] = "Mystery";
    BookGenre["Thriller"] = "Thriller";
    BookGenre["Romance"] = "Romance";
    BookGenre["ScienceFiction"] = "Science Fiction";
    BookGenre["Fantasy"] = "Fantasy";
    BookGenre["NonFiction"] = "Non-Fiction";
    BookGenre["Biography"] = "Biography";
    BookGenre["History"] = "History";
    BookGenre["SelfHelp"] = "Self-Help";
})(BookGenre || (exports.BookGenre = BookGenre = {}));
exports.BookSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.nativeEnum(BookGenre),
    year: zod_1.z.number(),
    isbn: zod_1.z.string(),
    publisher: zod_1.z.string(),
});
const BookQueryParamsSchema = zod_1.z.object({
    genres: zod_1.z.nativeEnum(BookGenre).array().optional(),
});
function validateBook(input) {
    return exports.BookSchema.safeParse(input);
}
exports.validateBook = validateBook;
function validatePartialBook(input) {
    return exports.BookSchema.partial().safeParse(input);
}
exports.validatePartialBook = validatePartialBook;
function validateQueryParamsBook(input) {
    return BookQueryParamsSchema.parse(input);
}
exports.validateQueryParamsBook = validateQueryParamsBook;
